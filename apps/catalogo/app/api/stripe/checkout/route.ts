// apps/catalogo/app/api/stripe/checkout/route.ts
//
// Crea una Stripe Checkout Session per l'utente autenticato.
// Supporta intervalli: month, quarter, year.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { stripe } from '@/lib/stripe';
import { getPriceId, isPaidPlan, PAID_PLANS, type PaidPlanTier } from '@/lib/plans';
import type { BillingInterval } from '@/types/database';

export const runtime = 'nodejs';

const VALID_INTERVALS: BillingInterval[] = ['month', 'quarter', 'year'];

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const tier = body?.tier as string | undefined;
    const interval = body?.interval as string | undefined;

    if (!tier || !isPaidPlan(tier)) {
      return NextResponse.json(
        { error: 'Piano non valido. I piani disponibili sono: ' + PAID_PLANS.join(', ') },
        { status: 400 },
      );
    }
    if (!interval || !VALID_INTERVALS.includes(interval as BillingInterval)) {
      return NextResponse.json(
        { error: 'Intervallo non valido. Deve essere "month", "quarter" o "year".' },
        { status: 400 },
      );
    }

    const priceId = getPriceId(tier as PaidPlanTier, interval as BillingInterval);
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID non configurato per questo piano/intervallo.' },
        { status: 500 },
      );
    }

    // L'utente deve essere loggato.
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Devi essere loggato per procedere al pagamento.', redirectTo: '/registrati' },
        { status: 401 },
      );
    }

    // Recupera / crea customer Stripe.
    const admin = createAdminClient();
    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id, email, full_name')
      .eq('id', user.id)
      .single();

    let customerId: string | null =
      (profile as { stripe_customer_id?: string | null } | null)?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? (profile as { email?: string } | null)?.email ?? undefined,
        name: (profile as { full_name?: string | null } | null)?.full_name ?? undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await admin
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/dopo-pagamento?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pacchetti`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      tax_id_collection: { enabled: true },
      customer_update: {
        name: 'auto',
        address: 'auto',
      },
      // Consent al checkout: ai sensi dell'art. 59 lett. o) Cod. Cons., Stripe
      // mostra un testo di conferma che sarà richiesto prima del pagamento.
      // Protegge da richieste di rimborso post-erogazione.
      consent_collection: {
        terms_of_service: 'required',
      },
      custom_text: {
        terms_of_service_acceptance: {
          message:
            'Accettando i [Termini di servizio](https://overfydigital.com/termini) chiedo l\'avvio immediato del servizio di digitalizzazione e riconosco, ai sensi dell\'art. 59 lett. o) del Codice del Consumo, di perdere il diritto di recesso di 14 giorni una volta completata l\'erogazione. Vedi [policy rimborsi](https://overfydigital.com/rimborsi).',
        },
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          plan_tier: tier,
          billing_interval: interval,
        },
      },
      metadata: {
        supabase_user_id: user.id,
        plan_tier: tier,
        billing_interval: interval,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout] error:', err);
    const msg = err instanceof Error ? err.message : 'Errore interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
