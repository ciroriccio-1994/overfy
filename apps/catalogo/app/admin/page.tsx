// apps/catalogo/app/admin/page.tsx
//
// Admin dashboard unica. Accessibile solo con is_admin=true.
// KPI: total users, active subs, MRR €, lead aperti, callback aperte.
// Sezioni: callback urgenti (solo se >0), utenti recenti, lead, subscription attive.

import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import { PLANS, resolvePriceId } from '@/lib/plans';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AdminClient } from './AdminClient';
import type { LeadRow, ProfileRow, SubscriptionRow } from '@/types/database';

export const metadata: Metadata = {
  title: 'Admin — Overfy',
  description: 'Area amministrazione Overfy.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Lead esteso con i campi callback (non ancora presenti nel tipo DB) */
export type ExtendedLeadRow = LeadRow & {
  request_callback?: boolean | null;
  preferred_time?: string | null;
};

export interface AdminKPI {
  totalUsers: number;
  activeSubs: number;
  mrrCents: number; // MRR in centesimi € per precisione
  openLeads: number;
  openCallbacks: number;
}

export interface AdminUserRow {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  is_admin: boolean;
  created_at: string;
  plan_tier: string | null;
  status: string | null;
}

export interface AdminSubRow {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  plan_tier: string;
  billing_interval: string | null;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export default async function AdminPage() {
  await requireAdmin('/admin');

  const admin = createAdminClient();

  // ============================================================
  // PROFILES (ordinati desc per data)
  // ============================================================
  const { data: profilesRaw } = await admin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  const profiles = (profilesRaw as ProfileRow[] | null) ?? [];

  // ============================================================
  // SUBSCRIPTIONS
  // ============================================================
  const { data: subsRaw } = await admin
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false });
  const subs = (subsRaw as SubscriptionRow[] | null) ?? [];

  // ============================================================
  // LEADS (con campi callback estesi)
  // ============================================================
  const { data: leadsRaw } = await admin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  const leads = (leadsRaw as ExtendedLeadRow[] | null) ?? [];

  // ============================================================
  // KPI
  // ============================================================
  const totalUsers = profiles.length;

  const activeSubsList = subs.filter((s) =>
    ['active', 'trialing'].includes(s.status),
  );
  const activeSubs = activeSubsList.length;

  let mrrCents = 0;
  for (const sub of activeSubsList) {
    if (!sub.stripe_price_id) continue;
    const resolved = resolvePriceId(sub.stripe_price_id);
    if (!resolved) continue;
    const plan = PLANS[resolved.tier];
    const slot = resolved.interval === 'month' ? plan.monthly : plan.yearly;
    if (!slot) continue;
    const cents = Math.round(slot.amountEur * 100);
    mrrCents += resolved.interval === 'month' ? cents : Math.round(cents / 12);
  }

  const openLeads = leads.filter((l) =>
    ['new', 'contacted', 'qualified'].includes(l.status),
  ).length;

  const openCallbacks = leads.filter(
    (l) => l.request_callback === true && l.status === 'new',
  ).length;

  const kpi: AdminKPI = {
    totalUsers,
    activeSubs,
    mrrCents,
    openLeads,
    openCallbacks,
  };

  // ============================================================
  // USERS TABLE (con piano se c'è)
  // ============================================================
  const subByUser = new Map<string, SubscriptionRow>();
  for (const sub of subs) {
    const existing = subByUser.get(sub.user_id);
    if (!existing) {
      subByUser.set(sub.user_id, sub);
    } else if (
      ['active', 'trialing'].includes(sub.status) &&
      !['active', 'trialing'].includes(existing.status)
    ) {
      subByUser.set(sub.user_id, sub);
    }
  }

  const userRows: AdminUserRow[] = profiles.slice(0, 30).map((p) => {
    const sub = subByUser.get(p.id);
    return {
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      company_name: p.company_name,
      is_admin: p.is_admin ?? false,
      created_at: p.created_at,
      plan_tier: sub?.plan_tier ?? null,
      status: sub?.status ?? null,
    };
  });

  // ============================================================
  // ACTIVE SUBS TABLE
  // ============================================================
  const profilesById = new Map(profiles.map((p) => [p.id, p]));
  const subRows: AdminSubRow[] = activeSubsList.map((s) => {
    const p = profilesById.get(s.user_id);
    return {
      id: s.id,
      user_id: s.user_id,
      email: p?.email ?? null,
      full_name: p?.full_name ?? null,
      plan_tier: s.plan_tier,
      billing_interval: s.billing_interval,
      status: s.status,
      current_period_end: s.current_period_end,
      cancel_at_period_end: s.cancel_at_period_end,
    };
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-6xl mx-auto">
          <AdminClient
            kpi={kpi}
            users={userRows}
            subs={subRows}
            leads={leads}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
