-- ============================================================================
-- OVERFY — PATCH 2 · AGGIORNAMENTI SCHEMA
-- Esegui nel SQL Editor di Supabase (progetto Overfy).
-- Idempotente: puoi rilanciarlo senza rompere nulla.
-- ============================================================================

-- Aggiunge colonna stripe_customer_id su profiles per mapping veloce
alter table public.profiles
  add column if not exists stripe_customer_id text unique;

create index if not exists profiles_stripe_customer_idx
  on public.profiles(stripe_customer_id);

-- Colonna accettazione termini (per compliance GDPR futura)
alter table public.profiles
  add column if not exists terms_accepted_at timestamptz;

-- ============================================================================
-- Verifica rapida:
--   select column_name from information_schema.columns
--   where table_schema='public' and table_name='profiles';
-- ============================================================================
