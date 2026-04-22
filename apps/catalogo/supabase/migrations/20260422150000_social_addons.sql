-- apps/catalogo/supabase/migrations/20260422150000_social_addons.sql
--
-- Tabella social_addons: add-on "Gestione social" acquistato da un cliente
-- sopra la sua subscription base Overfy.
--
-- Modello:
--   - 1:1 con una subscription base (una sub può avere al massimo 1 addon attivo)
--   - Lo stesso Stripe Subscription ha più line items (base + addon) → stessa invoice
--   - status 'active'    : addon attivo, fattura ogni mese insieme alla base
--   - status 'pending_cancellation' : utente ha cliccato "annulla", resta attivo fino
--                                     a fine periodo della base
--   - status 'canceled'  : rimosso (per annullamento esplicito o per cancellazione
--                          della sub base)
--
-- RLS: ogni utente vede solo il proprio addon. Admin server-side bypassa.

CREATE TABLE IF NOT EXISTS public.social_addons (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id             uuid NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  stripe_subscription_id      text NOT NULL,
  stripe_subscription_item_id text NOT NULL,
  stripe_price_id             text NOT NULL,
  tier                        text NOT NULL CHECK (tier IN ('basic', 'pro')),
  amount_eur                  numeric(10, 2) NOT NULL,
  status                      text NOT NULL CHECK (status IN ('active', 'pending_cancellation', 'canceled')) DEFAULT 'active',
  added_at                    timestamptz NOT NULL DEFAULT now(),
  canceled_at                 timestamptz,
  created_at                  timestamptz NOT NULL DEFAULT now(),
  updated_at                  timestamptz NOT NULL DEFAULT now()
);

-- Un solo addon ATTIVO per subscription (basic o pro, non entrambi)
CREATE UNIQUE INDEX IF NOT EXISTS social_addons_active_unique
  ON public.social_addons (subscription_id)
  WHERE status = 'active' OR status = 'pending_cancellation';

-- Lookup veloci per webhook
CREATE INDEX IF NOT EXISTS social_addons_stripe_sub_idx
  ON public.social_addons (stripe_subscription_id);

CREATE INDEX IF NOT EXISTS social_addons_stripe_item_idx
  ON public.social_addons (stripe_subscription_item_id);

CREATE INDEX IF NOT EXISTS social_addons_user_idx
  ON public.social_addons (user_id);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.set_social_addons_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_social_addons_updated_at ON public.social_addons;
CREATE TRIGGER trg_social_addons_updated_at
  BEFORE UPDATE ON public.social_addons
  FOR EACH ROW
  EXECUTE FUNCTION public.set_social_addons_updated_at();

-- RLS
ALTER TABLE public.social_addons ENABLE ROW LEVEL SECURITY;

-- Utente vede solo i propri addon (read)
DROP POLICY IF EXISTS "social_addons_select_own" ON public.social_addons;
CREATE POLICY "social_addons_select_own"
  ON public.social_addons
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT/UPDATE/DELETE: SOLO lato server (service_role). Nessuna policy per
-- authenticated = bloccato di default. Il service_role bypassa RLS.

COMMENT ON TABLE public.social_addons IS
  'Add-on "Gestione social" acquistato sopra una subscription base. 1:1 con subscriptions.';
