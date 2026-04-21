-- ============================================================
-- 001_referral_schema.sql
-- Overfy — Referral Amico (cliente → cliente)
--
-- Modello:
--   1. Ogni profile ha un referral_code univoco (generato on-demand).
--   2. Al signup, se ?ref=CODE è presente, risolviamo a referred_by_user_id.
--   3. Al PRIMO pagamento del referred, creiamo un referral_credit pending.
--   4. +30 giorni senza refund -> credito consolidated (lazy o via cron).
--   5. Al consolidamento, applichiamo un coupon one-time 50% alla sub del referrer.
--   6. Cap anti-gaming: max 6 crediti non-terminali per referrer. Oltre, voided.
--   7. Refund entro 30 giorni -> credito voided (clawback automatico).
--
-- Eseguire su: Supabase SQL Editor, progetto ukespvqmqrglsexcmrzt
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Colonne nuove su profiles
-- ------------------------------------------------------------

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS referral_code TEXT,
  ADD COLUMN IF NOT EXISTS referred_by_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- referral_code unico (nullable: generato on-demand)
CREATE UNIQUE INDEX IF NOT EXISTS profiles_referral_code_key
  ON public.profiles (referral_code)
  WHERE referral_code IS NOT NULL;

CREATE INDEX IF NOT EXISTS profiles_referred_by_user_id_idx
  ON public.profiles (referred_by_user_id)
  WHERE referred_by_user_id IS NOT NULL;

-- ------------------------------------------------------------
-- 2. Tabella referral_credits
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.referral_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  referrer_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Tracking primo pagamento del referred
  stripe_charge_id TEXT,
  stripe_invoice_id TEXT,
  stripe_payment_intent_id TEXT,
  referred_first_payment_at TIMESTAMPTZ NOT NULL,
  consolidated_at TIMESTAMPTZ NOT NULL,  -- +30 giorni dal pagamento

  -- Applicazione coupon al referrer
  applied_at TIMESTAMPTZ,
  applied_to_subscription_id TEXT,
  stripe_coupon_id TEXT,
  application_attempts INT NOT NULL DEFAULT 0,
  application_error TEXT,

  -- Consumo (invoice con coupon è stata emessa/pagata)
  consumed_at TIMESTAMPTZ,
  applied_to_invoice_id TEXT,

  -- Void (refund del referred entro 30gg, o cap raggiunto)
  voided_at TIMESTAMPTZ,
  voided_reason TEXT,

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','consolidated','applied','consumed','voided')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Un referred genera al massimo 1 credito in vita
  UNIQUE (referred_user_id)
);

CREATE INDEX IF NOT EXISTS referral_credits_referrer_status_idx
  ON public.referral_credits (referrer_user_id, status);

CREATE INDEX IF NOT EXISTS referral_credits_status_consolidated_idx
  ON public.referral_credits (status, consolidated_at)
  WHERE status IN ('pending','consolidated');

CREATE INDEX IF NOT EXISTS referral_credits_invoice_idx
  ON public.referral_credits (stripe_invoice_id)
  WHERE stripe_invoice_id IS NOT NULL;

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_referral_credits_updated_at ON public.referral_credits;
CREATE TRIGGER trg_referral_credits_updated_at
BEFORE UPDATE ON public.referral_credits
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ------------------------------------------------------------
-- 3. RPC get_or_create_referral_code
--    Chiamata on-demand dalla dashboard per ottenere il codice
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.get_or_create_referral_code(p_user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_existing TEXT;
  v_code TEXT;
  v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- 32 caratteri, no O, I, 0, 1
  v_attempt INT;
BEGIN
  -- Solo il proprietario (o un admin/service) può generare il proprio codice
  IF auth.uid() IS NOT NULL AND auth.uid() <> p_user_id THEN
    -- permessi: verifica is_admin
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true) THEN
      RAISE EXCEPTION 'Permesso negato.' USING ERRCODE = '42501';
    END IF;
  END IF;

  SELECT referral_code INTO v_existing FROM public.profiles WHERE id = p_user_id;
  IF v_existing IS NOT NULL THEN
    RETURN v_existing;
  END IF;

  FOR v_attempt IN 1..12 LOOP
    v_code := 'REF-' || (
      SELECT string_agg(substr(v_chars, (1 + floor(random() * length(v_chars)))::int, 1), '')
      FROM generate_series(1, 6)
    );
    BEGIN
      UPDATE public.profiles
        SET referral_code = v_code, updated_at = NOW()
        WHERE id = p_user_id AND referral_code IS NULL;
      IF FOUND THEN
        RETURN v_code;
      ELSE
        -- qualcuno ha creato il codice in parallelo, rileggi
        SELECT referral_code INTO v_existing FROM public.profiles WHERE id = p_user_id;
        IF v_existing IS NOT NULL THEN
          RETURN v_existing;
        END IF;
      END IF;
    EXCEPTION WHEN unique_violation THEN
      -- collisione, retry
      CONTINUE;
    END;
  END LOOP;

  RAISE EXCEPTION 'impossibile generare codice referral univoco dopo 12 tentativi';
END $$;

GRANT EXECUTE ON FUNCTION public.get_or_create_referral_code(UUID) TO authenticated, service_role;

-- ------------------------------------------------------------
-- 4. RPC count_referrer_open_credits
--    Conta crediti non-terminali per applicare il cap
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.count_referrer_open_credits(p_user_id UUID)
RETURNS INT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::INT
  FROM public.referral_credits
  WHERE referrer_user_id = p_user_id
    AND status IN ('pending','consolidated','applied');
$$;

GRANT EXECUTE ON FUNCTION public.count_referrer_open_credits(UUID) TO authenticated, service_role;

-- ------------------------------------------------------------
-- 5. RPC consolidate_matured_credits
--    Da chiamare via cron giornaliero o lazy dal webhook
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.consolidate_matured_credits()
RETURNS TABLE(referral_consolidated INT, agent_consolidated INT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ref INT := 0;
  v_agent INT := 0;
BEGIN
  -- Referral: pending -> consolidated
  WITH upd AS (
    UPDATE public.referral_credits
    SET status = 'consolidated', updated_at = NOW()
    WHERE status = 'pending'
      AND consolidated_at <= NOW()
      AND voided_at IS NULL
    RETURNING 1
  )
  SELECT count(*) INTO v_ref FROM upd;

  -- Agent commissions: pending -> payable (se la tabella esiste già da script 002)
  IF to_regclass('public.agent_commissions') IS NOT NULL THEN
    EXECUTE $exec$
      WITH upd AS (
        UPDATE public.agent_commissions
        SET status = 'payable', updated_at = NOW()
        WHERE status = 'pending'
          AND consolidated_at <= NOW()
          AND voided_at IS NULL
        RETURNING 1
      )
      SELECT count(*) FROM upd
    $exec$ INTO v_agent;
  END IF;

  RETURN QUERY SELECT v_ref, v_agent;
END $$;

GRANT EXECUTE ON FUNCTION public.consolidate_matured_credits() TO service_role;

-- ------------------------------------------------------------
-- 6. RLS
-- ------------------------------------------------------------

ALTER TABLE public.referral_credits ENABLE ROW LEVEL SECURITY;

-- L'utente vede i propri crediti (come referrer o referred)
DROP POLICY IF EXISTS referral_credits_select_own ON public.referral_credits;
CREATE POLICY referral_credits_select_own ON public.referral_credits
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = referrer_user_id
    OR auth.uid() = referred_user_id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Nessun INSERT/UPDATE da anon/authenticated: solo service_role via webhook/API admin
DROP POLICY IF EXISTS referral_credits_admin_all ON public.referral_credits;
CREATE POLICY referral_credits_admin_all ON public.referral_credits
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

COMMIT;

-- ============================================================
-- VERIFICA post-deploy (eseguire separatamente):
--
--   SELECT column_name FROM information_schema.columns
--   WHERE table_schema='public' AND table_name='profiles'
--     AND column_name IN ('referral_code','referred_by_user_id');
--
--   SELECT * FROM public.referral_credits LIMIT 1;
--
--   -- Test generazione codice
--   SELECT public.get_or_create_referral_code(
--     (SELECT id FROM public.profiles LIMIT 1)
--   );
-- ============================================================
