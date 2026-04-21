// apps/catalogo/app/api/stripe/checkout/route.ts
//
// Crea una Stripe Checkout Session per l'utente autenticato.
// Chiamato da Pricing al click su "Scegli Essenziale/Pro/Business".
//
// Fix 2026-04-21: aggiunto customer_update: { name: 'auto', address: 'auto' }
// perché tax_id_collection richiede che Stripe possa aggiornare il customer
// esistente con i dati che il cliente inserisce in fase di checkout.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { stripe } from '@/lib/stripe';
import { getPriceId, isPaidPlan, PAID_PLANS, type PaidPlanTier } from '@/lib/plans';
import type { BillingInterval } from '@/types/database';

export const runtime = 'nodejs';

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
    if (interval !== 'month' && interval !== 'year') {
      return NextResponse.json(
        { error: 'Intervallo non valido. Deve essere "month" o "year".' },
        { status: 400 },
      );
    }

    const priceId = getPriceId(tier as PaidPlanTier, interval as BillingInterval);
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID non configurato per questo piano.' },
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
      // Richiesto quando si passa un customer esistente + tax_id_collection.
      // Permette a Stripe di aggiornare name e address del customer con i
      // valori inseriti nel form di checkout.
      customer_update: {
        name: 'auto',
        address: 'auto',
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
