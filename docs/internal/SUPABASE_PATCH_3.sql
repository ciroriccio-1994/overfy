-- ============================================================================
-- OVERFY — PATCH 3 · ADMIN & DASHBOARD
-- Esegui TUTTO nel SQL Editor di Supabase (progetto Overfy `ukespvqmqrglsexcmrzt`).
-- Idempotente: puoi rilanciarlo senza rompere nulla.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Colonna is_admin su profiles
-- ----------------------------------------------------------------------------

alter table public.profiles
  add column if not exists is_admin boolean not null default false;

create index if not exists profiles_is_admin_idx
  on public.profiles(is_admin) where is_admin = true;

-- ----------------------------------------------------------------------------
-- 2. Helper function: is_admin(uid)
-- Security definer per evitare ricorsione sulle policy di profiles
-- (senza security definer la policy "è admin?" interrogherebbe profiles
-- che a sua volta applica la policy "è admin?" → loop).
-- ----------------------------------------------------------------------------

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = uid), false);
$$;

grant execute on function public.is_admin(uuid) to authenticated;

-- ----------------------------------------------------------------------------
-- 3. RLS policies: admin legge tutto + admin aggiorna leads
-- ----------------------------------------------------------------------------

-- Profiles: admin legge tutti i profili (oltre al proprio, policy già esistente)
drop policy if exists "profiles_admin_select_all" on public.profiles;
create policy "profiles_admin_select_all"
  on public.profiles for select
  to authenticated
  using (public.is_admin(auth.uid()));

-- Subscriptions: admin legge tutte le subscription
drop policy if exists "subscriptions_admin_select_all" on public.subscriptions;
create policy "subscriptions_admin_select_all"
  on public.subscriptions for select
  to authenticated
  using (public.is_admin(auth.uid()));

-- Leads: admin legge tutto + aggiorna status
drop policy if exists "leads_admin_select_all" on public.leads;
create policy "leads_admin_select_all"
  on public.leads for select
  to authenticated
  using (public.is_admin(auth.uid()));

drop policy if exists "leads_admin_update" on public.leads;
create policy "leads_admin_update"
  on public.leads for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- ----------------------------------------------------------------------------
-- 4. Grants (authenticated deve poter usare select/update su leads
-- per rispettare le policy appena create)
-- ----------------------------------------------------------------------------

grant select, update on public.leads to authenticated;

-- ============================================================================
-- VERIFICA
-- ============================================================================
-- Dopo l'esecuzione, controlla:
--   select column_name from information_schema.columns
--     where table_schema='public' and table_name='profiles' and column_name='is_admin';
-- Deve restituire una riga.
--
--   select policyname from pg_policies where schemaname='public'
--     and policyname like '%admin%';
-- Devi vedere: profiles_admin_select_all, subscriptions_admin_select_all,
-- leads_admin_select_all, leads_admin_update.
-- ============================================================================

-- ============================================================================
-- POST-DEPLOY: PROMUOVI ADMIN
-- ============================================================================
-- Esegui le righe qui sotto DOPO aver deployato Patch 3 su Vercel e DOPO
-- esserti registrato almeno una volta (così il profilo esiste).
-- Sostituisci le email con le TUE reali. Aggiungi una riga per ogni admin.
-- ----------------------------------------------------------------------------
-- update public.profiles set is_admin = true where email = 'TUA_EMAIL@esempio.it';
-- update public.profiles set is_admin = true where email = 'SOCIO_EMAIL@esempio.it';
--
-- Verifica risultato:
-- select email, is_admin, created_at from public.profiles where is_admin = true;
-- ============================================================================
