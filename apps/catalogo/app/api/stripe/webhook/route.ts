// apps/catalogo/app/api/stripe/webhook/route.ts
//
// Webhook Stripe. Verifica firma HMAC, idempotenza via webhook_events.
// Gestisce eventi che cambiano lo stato degli abbonamenti.

import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { resolvePriceId } from '@/lib/plans';
import { getResend, getFromEmail } from '@/lib/email/resend';
import { welcomeEmailHtml } from '@/lib/email/templates';
import type { SubscriptionStatus, BillingInterval } from '@/types/database';

export const runtime = 'nodejs';

// I webhook Stripe richiedono il body grezzo per verificare la firma.
export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret || webhookSecret === 'whsec_PLACEHOLDER') {
    return NextResponse.json(
      { error: 'Webhook non configurato o firma mancante.' },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const admin = createAdminClient();

  // Idempotenza — se abbiamo già processato questo evento, saltiamo.
  const { data: existing } = await admin
    .from('webhook_events')
    .select('id')
    .eq('id', event.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ received: true, alreadyProcessed: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(admin, session);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscription(admin, sub);
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await admin
          .from('subscriptions')
          .update({ status: 'canceled', canceled_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id);
        break;
      }
      default:
        // Eventi non gestiti: li registriamo comunque per idempotenza.
        break;
    }

    // Registra evento come processato.
    await admin.from('webhook_events').insert({
      id: event.id,
      type: event.type,
      payload: event as unknown as Record<string, unknown>,
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[webhook] handler error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Handler error' },
      { status: 500 },
    );
  }
}

/* ------------------------------------------------------------------ */

async function handleCheckoutCompleted(
  admin: ReturnType<typeof createAdminClient>,
  session: Stripe.Checkout.Session,
) {
  const userId = session.metadata?.supabase_user_id;
  if (!userId) return;

  // Linka customer a profilo (se non ancora fatto dal checkout)
  if (session.customer && typeof session.customer === 'string') {
    await admin
      .from('profiles')
      .update({ stripe_customer_id: session.customer })
      .eq('id', userId);
  }

  // Recupera la subscription per avere dati freschi
  if (session.subscription && typeof session.subscription === 'string') {
    const sub = await stripe.subscriptions.retrieve(session.subscription);
    await upsertSubscription(admin, sub);

    // Invia email di benvenuto
    try {
      const { data: profile } = await admin
        .from('profiles')
        .select('full_name, email')
        .eq('id', userId)
        .single();

      const priceId = sub.items.data[0]?.price.id;
      const resolved = priceId ? resolvePriceId(priceId) : null;
      const planName = resolved
        ? resolved.tier.charAt(0).toUpperCase() + resolved.tier.slice(1)
        : 'Overfy';

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';

      if (profile?.email) {
        const resend = getResend();
        await resend.emails.send({
          from: getFromEmail(),
          to: profile.email,
          subject: `Benvenuto in Overfy — il tuo ${planName} è attivo`,
          html: welcomeEmailHtml({
            name: profile.full_name ?? null,
            planName,
            dashboardUrl: `${siteUrl}/dashboard`,
          }),
        });
      }
    } catch (err) {
      console.error('[webhook] welcome email error:', err);
      // Non blocca il flusso — l'email è best-effort
    }
  }
}

async function upsertSubscription(
  admin: ReturnType<typeof createAdminClient>,
  sub: Stripe.Subscription,
) {
  const userId = sub.metadata?.supabase_user_id;
  if (!userId) return;

  const priceId = sub.items.data[0]?.price.id;
  const resolved = priceId ? resolvePriceId(priceId) : null;

  // Type Stripe.Subscription API recent: current_period_start/end possono
  // non essere tipati direttamente in tutte le versioni del SDK.
  const subAny = sub as unknown as {
    current_period_start?: number;
    current_period_end?: number;
    canceled_at?: number | null;
  };

  const toISO = (ts: number | null | undefined) =>
    ts ? new Date(ts * 1000).toISOString() : null;

  const payload = {
    user_id: userId,
    stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    stripe_subscription_id: sub.id,
    stripe_price_id: priceId ?? null,
    plan_tier: resolved?.tier ?? 'essenziale',
    billing_interval: (resolved?.interval ?? 'month') as BillingInterval,
    status: sub.status as SubscriptionStatus,
    current_period_start: toISO(subAny.current_period_start),
    current_period_end: toISO(subAny.current_period_end),
    cancel_at_period_end: sub.cancel_at_period_end,
    canceled_at: toISO(subAny.canceled_at ?? null),
  };

  await admin
    .from('subscriptions')
    .upsert(payload, { onConflict: 'stripe_subscription_id' });
}
