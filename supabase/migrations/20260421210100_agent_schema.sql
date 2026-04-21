-- ============================================================
-- 002_agent_schema.sql
-- Overfy — Programma Agent (B2B procacciatori)
--
-- Modello:
--   1. Admin (Ciro) crea un agent via /admin. Sistema genera code (AGT-XXXX)
--      + view_token (magic link unguessable per dashboard agent).
--   2. Agent invita clienti con link overfydigital.com/registrati?agent=AGT-XXXX.
--   3. Cliente signup -> profiles.acquired_by_agent_id = agent.id
--   4. Cliente paga prima invoice -> agent_commission pending con amount_eur
--      dalla tabella COMMISSION_RATES (lib/commissions.ts lato app).
--   5. +30 giorni senza refund -> commission payable (via cron o lazy).
--   6. Refund entro 30gg -> commission voided (clawback automatico).
--   7. Ciro bonifica manualmente, poi marca 'paid' con payout_reference.
--
-- NOTA: non c'è login agent. L'agent accede alla propria dashboard via
-- magic link /agent/view/{view_token}, che Ciro gli invia manualmente.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Tabella agents
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,                      -- es. AGT-MARCO-9K2P
  view_token TEXT NOT NULL UNIQUE,                -- magic link

  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  vat_number TEXT,
  iban TEXT,
  notes TEXT,

  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','suspended','terminated')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agents_status_idx ON public.agents (status);
CREATE INDEX IF NOT EXISTS agents_email_idx ON public.agents (email);

-- ------------------------------------------------------------
-- 2. Colonna nuova su profiles
-- ------------------------------------------------------------

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS acquired_by_agent_id UUID
    REFERENCES public.agents(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS profiles_acquired_by_agent_id_idx
  ON public.profiles (acquired_by_agent_id)
  WHERE acquired_by_agent_id IS NOT NULL;

-- ------------------------------------------------------------
-- 3. Tabella agent_commissions
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.agent_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE RESTRICT,
  customer_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  stripe_subscription_id TEXT NOT NULL,
  stripe_invoice_id TEXT NOT NULL,
  stripe_charge_id TEXT,
  stripe_payment_intent_id TEXT,

  plan_tier TEXT NOT NULL,
  billing_interval TEXT NOT NULL CHECK (billing_interval IN ('month','quarter','year')),
  amount_eur NUMERIC(10, 2) NOT NULL CHECK (amount_eur >= 0),

  customer_paid_at TIMESTAMPTZ NOT NULL,
  consolidated_at TIMESTAMPTZ NOT NULL,  -- +30gg dal pagamento

  paid_at TIMESTAMPTZ,
  payout_reference TEXT,  -- es. "Bonifico 2026-05-01 #42"
  payout_notes TEXT,

  voided_at TIMESTAMPTZ,
  voided_reason TEXT,

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','payable','paid','voided')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Una invoice genera 1 sola commissione
  UNIQUE (stripe_invoice_id)
);

CREATE INDEX IF NOT EXISTS agent_commissions_agent_status_idx
  ON public.agent_commissions (agent_id, status);

CREATE INDEX IF NOT EXISTS agent_commissions_status_consolidated_idx
  ON public.agent_commissions (status, consolidated_at)
  WHERE status IN ('pending','payable');

CREATE INDEX IF NOT EXISTS agent_commissions_customer_idx
  ON public.agent_commissions (customer_user_id);

-- Trigger updated_at (riuso funzione touch_updated_at da 001)
DROP TRIGGER IF EXISTS trg_agents_updated_at ON public.agents;
CREATE TRIGGER trg_agents_updated_at
BEFORE UPDATE ON public.agents
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_agent_commissions_updated_at ON public.agent_commissions;
CREATE TRIGGER trg_agent_commissions_updated_at
BEFORE UPDATE ON public.agent_commissions
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ------------------------------------------------------------
-- 4. Helper: generate_agent_code(full_name)
--    Genera code del tipo AGT-MARCO-9K2P univoco
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.generate_agent_code(p_full_name TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stem TEXT;
  v_suffix TEXT;
  v_code TEXT;
  v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  v_attempt INT;
BEGIN
  -- stem = primo nome in uppercase, solo A-Z, max 6 caratteri
  v_stem := upper(regexp_replace(split_part(p_full_name, ' ', 1), '[^A-Za-z]', '', 'g'));
  IF v_stem IS NULL OR length(v_stem) = 0 THEN
    v_stem := 'AG';
  END IF;
  v_stem := substring(v_stem FROM 1 FOR 6);

  FOR v_attempt IN 1..12 LOOP
    v_suffix := (
      SELECT string_agg(substr(v_chars, (1 + floor(random() * length(v_chars)))::int, 1), '')
      FROM generate_series(1, 4)
    );
    v_code := 'AGT-' || v_stem || '-' || v_suffix;
    IF NOT EXISTS (SELECT 1 FROM public.agents WHERE code = v_code) THEN
      RETURN v_code;
    END IF;
  END LOOP;

  RAISE EXCEPTION 'impossibile generare codice agent univoco dopo 12 tentativi';
END $$;

GRANT EXECUTE ON FUNCTION public.generate_agent_code(TEXT) TO service_role;

-- ------------------------------------------------------------
-- 5. RLS
-- ------------------------------------------------------------

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_commissions ENABLE ROW LEVEL SECURITY;

-- agents: solo admin legge/scrive lato app (service_role bypassa RLS)
DROP POLICY IF EXISTS agents_admin_all ON public.agents;
CREATE POLICY agents_admin_all ON public.agents
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- L'agent non ha sessione Supabase: accede via view_token su route pubblica
-- (la route userà service_role per leggere). Quindi nessuna policy "agent reads own".

-- agent_commissions: solo admin lato authenticated
DROP POLICY IF EXISTS agent_commissions_admin_all ON public.agent_commissions;
CREATE POLICY agent_commissions_admin_all ON public.agent_commissions
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

COMMIT;

-- ============================================================
-- VERIFICA:
--
--   SELECT tablename FROM pg_tables
--   WHERE schemaname='public' AND tablename IN ('agents','agent_commissions');
--
--   -- Genera un codice di test
--   SELECT public.generate_agent_code('Marco Rossi');
--
--   -- Crea un agent di test
--   INSERT INTO public.agents (code, view_token, full_name, email)
--   VALUES (
--     public.generate_agent_code('Marco Test'),
--     encode(gen_random_bytes(24), 'hex'),
--     'Marco Test',
--     'marco@test.it'
--   ) RETURNING code, view_token;
-- ============================================================
