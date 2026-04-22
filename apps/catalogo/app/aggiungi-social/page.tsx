// apps/catalogo/app/aggiungi-social/page.tsx
//
// Pagina dove l'utente aggiunge o gestisce l'add-on "Gestione social"
// sulla sua subscription base attiva.
//
// Require: login + subscription base attiva. Se non ha sub attiva,
// redirige alla homepage con anchor pacchetti.

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AggiungiSocialClient } from './AggiungiSocialClient';
import type { SubscriptionRow, SocialAddonRow } from '@/types/database';

export const metadata: Metadata = {
  title: 'Aggiungi gestione social — Overfy',
  description:
    'Aggiungi la gestione professionale dei tuoi canali social al tuo abbonamento Overfy. Piani Basic €100/mese e Pro €200/mese.',
};

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function AggiungiSocialPage() {
  const { userId, profile } = await requireUser('/aggiungi-social');

  if (profile.is_admin) {
    redirect('/admin');
  }

  const admin = createAdminClient();

  // Subscription base attiva
  const { data: subsRaw } = await admin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .order('created_at', { ascending: false });

  const subs = (subsRaw as SubscriptionRow[] | null) ?? [];
  const activeSub = subs.find((s) => !!s.stripe_subscription_id) ?? null;

  if (!activeSub) {
    redirect('/#pacchetti');
  }

  // Addon attuale (se presente)
  const { data: addonRaw } = await admin
    .from('social_addons')
    .select('*')
    .eq('subscription_id', activeSub.id)
    .in('status', ['active', 'pending_cancellation'])
    .maybeSingle();

  const currentAddon = addonRaw as SocialAddonRow | null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-5xl mx-auto">
          <AggiungiSocialClient currentAddon={currentAddon} />
        </div>
      </main>
      <Footer />
    </>
  );
}
