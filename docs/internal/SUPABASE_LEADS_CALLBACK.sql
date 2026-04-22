-- OVERFY · Aggiunta colonne callback su leads
-- -------------------------------------------------------------
-- Aggiunge 2 campi alla tabella leads per supportare richieste di
-- callback diretto dal form contatti.
-- Esegui in Supabase SQL Editor (progetto ukespvqmqrglsexcmrzt).
-- Idempotente: rilanciabile senza errori.

alter table public.leads
  add column if not exists request_callback boolean not null default false,
  add column if not exists preferred_time text;

-- Indice per filtrare velocemente le callback richieste in dashboard admin
create index if not exists leads_request_callback_idx
  on public.leads (request_callback, created_at desc)
  where request_callback = true;

-- Verifica
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'leads'
  and column_name in ('request_callback', 'preferred_time');
