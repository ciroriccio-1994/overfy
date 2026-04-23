// apps/catalogo/app/checkout/[tier]/page.tsx
//
// Step intermedio tra "scegli piano" e "vai a Stripe".
// Mostra il piano scelto + invito facoltativo ad aggiungere l'add-on Social
// (Basic €100 / Pro €200) nella stessa subscription.
//
// - Se non loggato → redirect a /registrati con return path
// - Se admin → redirect a /admin
// - Se ha già subscription attiva → redirect a /aggiungi-social (gestione add-on esistente)
// - Altrimenti mostra CheckoutStepClient

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CheckoutStepClient } from './CheckoutStepClient';
import { PLANS, isPaidPlan, type PaidPlanTier } from '@/lib/plans';
import type { SubscriptionRow, BillingInterval } from '@/types/database';

export const metadata: Metadata = {
  title: 'Checkout — Overfy',
  description: 'Conferma il tuo piano e scegli eventuali servizi aggiuntivi.',
};

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Params = Promise<{ tier: string }>;
type Search = Promise<{ interval?: string }>;

export default async function CheckoutTierPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { tier } = await params;
  const sp = await searchParams;

  // Validazione tier
  if (!isPaidPlan(tier)) {
    redirect('/#pacchetti');
  }

  // Validazione interval (default month)
  const intervalRaw = (sp.interval || 'month') as BillingInterval;
  const validIntervals: BillingInterval[] = ['month', 'quarter', 'year'];
  const interval = validIntervals.includes(intervalRaw) ? intervalRaw : 'month';

  // Auth + redirect se non loggato
  const returnPath = `/checkout/${tier}?interval=${interval}`;
  const { userId, profile } = await requireUser(returnPath);

  // Admin non compra
  if (profile.is_admin) {
    redirect('/admin');
  }

  // Se ha già una sub attiva → manda alla pagina add-on esistente
  const admin = createAdminClient();
  const { data: subsRaw } = await admin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .order('created_at', { ascending: false });

  const subs = (subsRaw as SubscriptionRow[] | null) ?? [];
  const activeSub = subs.find((s) => !!s.stripe_subscription_id) ?? null;

  if (activeSub) {
    redirect('/aggiungi-social');
  }

  const planConfig = PLANS[tier as PaidPlanTier];
  const planPriceEur =
    interval === 'month'
      ? planConfig.monthly.amountEur
      : interval === 'quarter'
        ? planConfig.quarterly.amountEur
        : planConfig.yearly.amountEur;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-4xl mx-auto">
          <CheckoutStepClient
            tier={tier as PaidPlanTier}
            interval={interval}
            planName={planConfig.name}
            planPriceEur={planPriceEur}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
