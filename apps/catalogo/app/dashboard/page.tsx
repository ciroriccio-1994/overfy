// apps/catalogo/app/dashboard/page.tsx
//
// Dashboard utente. Single page, no sottorotte.
// Sezioni: piano, fatture, profilo editabile, invita (placeholder), supporto.
//
// NOTE (Apr 22 2026): se l'utente è admin, redirige a /admin. L'area admin
// ha la sua UI dedicata e non deve esporre la dashboard cliente.

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import { stripe } from '@/lib/stripe';
import { PLANS, resolvePriceId } from '@/lib/plans';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DashboardClient } from './DashboardClient';
import type { SubscriptionRow } from '@/types/database';

export const metadata: Metadata = {
  title: 'Dashboard — Overfy',
  description: 'Il tuo account Overfy.',
};

// Server Component — fetch dati lato server.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export interface InvoiceLite {
  id: string;
  number: string | null;
  created: number;
  amount_paid: number;
  currency: string;
  status: string | null;
  hosted_invoice_url: string | null;
  invoice_pdf: string | null;
}

export interface PlanInfo {
  tier: string;
  name: string;
  amountEur: number | null;
  interval: 'month' | 'quarter' | 'year' | null;
}

export default async function DashboardPage() {
  const { userId, email, profile } = await requireUser('/dashboard');

  // Admin non vede la dashboard cliente. Vai direttamente all'area admin.
  if (profile.is_admin) {
    redirect('/admin');
  }

  const admin = createAdminClient();
  const { data: subsRaw } = await admin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const subs = (subsRaw as SubscriptionRow[] | null) ?? [];

  // Trova la subscription "corrente" (active/trialing/past_due, preferendo non cancellate)
  const activeSub: SubscriptionRow | null =
    subs.find((s) => ['active', 'trialing', 'past_due'].includes(s.status)) ??
    subs[0] ??
    null;

  // Risolvi info piano per la UI
  let planInfo: PlanInfo | null = null;
  if (activeSub && activeSub.stripe_price_id) {
    const resolved = resolvePriceId(activeSub.stripe_price_id);
    if (resolved) {
      const planCfg = PLANS[resolved.tier];
      const slot =
        resolved.interval === 'month'
          ? planCfg.monthly
          : resolved.interval === 'quarter'
            ? planCfg.quarterly
            : planCfg.yearly;
      planInfo = {
        tier: resolved.tier,
        name: planCfg.name,
        amountEur: slot?.amountEur ?? null,
        interval: resolved.interval,
      };
    } else {
      planInfo = {
        tier: activeSub.plan_tier,
        name: activeSub.plan_tier.charAt(0).toUpperCase() + activeSub.plan_tier.slice(1),
        amountEur: null,
        interval: activeSub.billing_interval,
      };
    }
  }

  // Fetch ultime 5 invoice Stripe
  let invoices: InvoiceLite[] = [];
  if (profile.stripe_customer_id) {
    try {
      const list = await stripe.invoices.list({
        customer: profile.stripe_customer_id,
        limit: 5,
      });
      invoices = list.data.map((inv) => ({
        id: inv.id ?? '',
        number: inv.number ?? null,
        created: inv.created,
        amount_paid: inv.amount_paid,
        currency: inv.currency,
        status: inv.status ?? null,
        hosted_invoice_url: inv.hosted_invoice_url ?? null,
        invoice_pdf: inv.invoice_pdf ?? null,
      }));
    } catch (err) {
      console.error('[dashboard] invoices fetch error:', err);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-4xl mx-auto">
          <DashboardClient
            profile={profile}
            subscription={activeSub}
            planInfo={planInfo}
            invoices={invoices}
            authEmail={email}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
