-- ============================================================
-- 003_cron_schedule.sql
-- Overfy — pg_cron: consolidation giornaliera di referral + agent
--
-- OPZIONALE. Se non esegui questo file, il sistema funziona comunque:
-- la consolidation avviene in modo "lazy" nel webhook Stripe (ogni
-- evento processato controlla se ci sono crediti da consolidare).
-- Questo cron garantisce consolidation anche in assenza di attività
-- (es. weekend, bassa stagione) così i payout agent mensili sono puntuali.
--
-- Prerequisiti:
--   - Supabase Pro (pg_cron abilitato di default)
--   - Eseguire come superuser/postgres role dal SQL Editor
--
-- Eseguire su: Supabase SQL Editor, progetto ukespvqmqrglsexcmrzt
-- ============================================================

-- Verifica se pg_cron è disponibile (alcuni progetti Supabase lo hanno
-- già abilitato, altri richiedono attivazione da Dashboard -> Extensions)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
  ) THEN
    RAISE NOTICE 'pg_cron non abilitato. Vai su Supabase Dashboard -> Database -> Extensions e abilita "pg_cron", poi riesegui questo file.';
    RETURN;
  END IF;
END $$;

-- Rimuove job precedenti con lo stesso nome (idempotente)
SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'overfy-consolidate-daily';

-- Schedula: ogni giorno alle 03:00 UTC
SELECT cron.schedule(
  'overfy-consolidate-daily',
  '0 3 * * *',
  $cron$ SELECT public.consolidate_matured_credits(); $cron$
);

-- ============================================================
-- VERIFICA:
--   SELECT jobname, schedule, active, command
--   FROM cron.job
--   WHERE jobname LIKE 'overfy-%';
--
-- Per disabilitare temporaneamente:
--   UPDATE cron.job SET active = false WHERE jobname = 'overfy-consolidate-daily';
--
-- Per eseguire manualmente il job:
--   SELECT public.consolidate_matured_credits();
-- ============================================================
