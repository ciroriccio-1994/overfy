-- ============================================================================
-- OVERFY — PATCH 1 · SCHEMA INIZIALE
-- Esegui TUTTO questo file nel SQL Editor di Supabase (progetto Overfy).
-- Idempotente: puoi rilanciarlo senza rompere nulla.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------

do $$ begin
  create type public.plan_tier as enum ('essenziale', 'professionale', 'business', 'su_misura');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.subscription_status as enum (
    'incomplete', 'incomplete_expired', 'trialing', 'active',
    'past_due', 'canceled', 'unpaid', 'paused'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lead_status as enum ('new', 'contacted', 'qualified', 'converted', 'lost');
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- 1. PROFILES — estensione di auth.users
-- ----------------------------------------------------------------------------

create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text unique not null,
  full_name     text,
  company_name  text,
  phone         text,
  vat_number    text,
  fiscal_code   text,
  country       text default 'IT',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 2. SUBSCRIPTIONS — sincronizzate dai webhook Stripe
-- ----------------------------------------------------------------------------

create table if not exists public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id      text,
  stripe_subscription_id  text unique,
  stripe_price_id         text,
  plan_tier               plan_tier not null,
  billing_interval        text check (billing_interval in ('month', 'year')),
  status                  subscription_status not null,
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  cancel_at_period_end    boolean not null default false,
  canceled_at             timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx    on public.subscriptions(user_id);
create index if not exists subscriptions_customer_idx   on public.subscriptions(stripe_customer_id);
create index if not exists subscriptions_status_idx     on public.subscriptions(status);

-- ----------------------------------------------------------------------------
-- 3. WEBHOOK_EVENTS — idempotenza degli eventi Stripe
-- ----------------------------------------------------------------------------

create table if not exists public.webhook_events (
  id            text primary key,             -- Stripe event id (evt_...)
  type          text not null,
  processed_at  timestamptz not null default now(),
  payload       jsonb
);

create index if not exists webhook_events_type_idx on public.webhook_events(type);

-- ----------------------------------------------------------------------------
-- 4. LEADS — richieste "Su Misura" / form contatti
-- ----------------------------------------------------------------------------

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  full_name     text,
  company_name  text,
  phone         text,
  message       text,
  source        text,                         -- es: 'su-misura', 'contatti', 'pricing'
  interest_tier plan_tier,
  status        lead_status not null default 'new',
  metadata      jsonb default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists leads_status_idx  on public.leads(status);
create index if not exists leads_email_idx   on public.leads(email);
create index if not exists leads_created_idx on public.leads(created_at desc);

-- ----------------------------------------------------------------------------
-- TRIGGER: updated_at automatico
-- ----------------------------------------------------------------------------

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at      on public.profiles;
drop trigger if exists subscriptions_updated_at on public.subscriptions;
drop trigger if exists leads_updated_at         on public.leads;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.handle_updated_at();

create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- TRIGGER: crea profilo automatico alla registrazione
-- Legge full_name / company_name / phone da raw_user_meta_data se presenti
-- ----------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, company_name, phone)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company_name',
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ----------------------------------------------------------------------------

alter table public.profiles       enable row level security;
alter table public.subscriptions  enable row level security;
alter table public.webhook_events enable row level security;
alter table public.leads          enable row level security;

-- -- PROFILES --
drop policy if exists "profiles_select_own"  on public.profiles;
drop policy if exists "profiles_update_own"  on public.profiles;
drop policy if exists "profiles_insert_own"  on public.profiles;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- -- SUBSCRIPTIONS -- (solo lettura lato client; scrittura via service_role nel webhook)
drop policy if exists "subscriptions_select_own" on public.subscriptions;

create policy "subscriptions_select_own"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

-- -- WEBHOOK_EVENTS -- (solo service_role, nessuna policy per anon/authenticated)
-- Nessuna policy = tabella invisibile ai client normali (con RLS attiva). Il
-- service_role bypassa RLS, quindi il webhook può comunque scrivere.

-- -- LEADS -- (INSERT libero anche per anon = form pubblico; niente SELECT per nessuno)
drop policy if exists "leads_insert_anyone" on public.leads;

create policy "leads_insert_anyone"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- ----------------------------------------------------------------------------
-- GRANTS
-- ----------------------------------------------------------------------------

grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update on public.profiles      to authenticated;
grant select                  on public.subscriptions to authenticated;
grant insert                  on public.leads         to anon, authenticated;

-- service_role ha già tutti i permessi di default, non serve grant esplicito.

-- ----------------------------------------------------------------------------
-- FINE SCHEMA
-- ----------------------------------------------------------------------------
-- Verifica rapida:
--   select table_name from information_schema.tables where table_schema='public';
-- Dovresti vedere: profiles, subscriptions, webhook_events, leads
-- ----------------------------------------------------------------------------
