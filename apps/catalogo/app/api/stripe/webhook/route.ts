// apps/catalogo/app/api/stripe/webhook/route.ts
//
// Webhook Stripe. Verifica firma HMAC, idempotenza via webhook_events.
// Gestisce eventi che cambiano lo stato degli abbonamenti.
//
// Fix 2026-04-21 (prima patch): dalla versione API Stripe 2025-04-30 circa i
// campi current_period_start e current_period_end sono stati RIMOSSI dal
// top-level di Subscription e spostati su items.data[].current_period_end/
// start. Il codice ora legge da lì con fallback al vecchio top-level per
// compatibilità retroattiva.
//
// Patch 2026-04-21 (referral + agent):
//   - invoice.payment_succeeded: al primo pagamento del referred crea
//     referral_credit pending e/o agent_commission pending.
//   - invoice.paid: marca referral_credits 'applied' come 'consumed'.
//   - charge.refunded: void referral_credits e agent_commissions se il refund
//     cade entro la finestra di clawback (30gg).
//   - Ogni evento: trigger lazy processing della coda referral (consolidation
//     + applicazione coupon al referrer).

import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { resolvePriceId } from '@/lib/plans';
import { getCommissionEur } from '@/lib/commissions';
import { processReferralQueue, voidCreditsFromRefund, handleInvoicePaidForReferral } from '@/lib/referral';
import { getResend, getFromEmail } from '@/lib/email/resend';
import {
  welcomeEmailHtml,
  referralFirstPaymentEmailHtml,
  referralUnlockedEmailHtml,
  referralAppliedEmailHtml,
} from '@/lib/email/templates';
import type { SubscriptionStatus, BillingInterval, PlanTier } from '@/types/database';

export const runtime = 'nodejs';

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
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(admin, invoice);
        break;
      }
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaidForReferral(admin, invoice);
        break;
      }
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        await voidCreditsFromRefund(admin, charge);
        break;
      }
      default:
        // Eventi non gestiti: li registriamo comunque per idempotenza.
        break;
    }

    // Dopo ogni evento, processa la coda referral in modo lazy.
    // Questo è idempotente e resiliente: se il cron è down, il rinnovo
    // successivo comunque triggererà la consolidation.
    processReferralQueue(admin).catch((err) => {
      console.error('[webhook] referral queue processing error:', err);
    });

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

/**
 * Gestisce ogni invoice.payment_succeeded. Se è il PRIMO pagamento di una
 * subscription (billing_reason=subscription_create) E il cliente ha
 * referred_by_user_id o acquired_by_agent_id nel profilo, genera le row
 * corrispondenti in referral_credits e/o agent_commissions.
 *
 * Idempotente: se già esistono row per questa invoice, no-op.
 *
 * Stripe SDK 22: invoice.subscription / invoice.charge / invoice.payment_intent
 * sono stati rimossi. Ora:
 *   - subscription_id: invoice.parent.subscription_details.subscription
 *   - payment_intent_id: via stripe.invoicePayments.list()
 *   - charge_id: non più accessibile direttamente; lo omettiamo.
 */
async function handleInvoicePaymentSucceeded(
  admin: ReturnType<typeof createAdminClient>,
  invoice: Stripe.Invoice,
) {
  // Solo il primo pagamento (non i rinnovi) genera attribution.
  if (invoice.billing_reason !== 'subscription_create') {
    return;
  }

  // Estrai subscription_id dal nuovo path invoice.parent.subscription_details.subscription
  const subscriptionRef = invoice.parent?.subscription_details?.subscription;
  const subscriptionId =
    typeof subscriptionRef === 'string'
      ? subscriptionRef
      : subscriptionRef?.id ?? null;

  if (!subscriptionId) return;

  // Estrai payment_intent_id dalle InvoicePayments (API list separata)
  let paymentIntentId: string | null = null;
  if (invoice.id) {
    try {
      const payments = await stripe.invoicePayments.list({
        invoice: invoice.id,
        limit: 1,
      });
      const firstPayment = payments.data[0];
      if (firstPayment?.payment?.type === 'payment_intent') {
        const pi = firstPayment.payment.payment_intent;
        paymentIntentId = typeof pi === 'string' ? pi : pi?.id ?? null;
      }
    } catch (err) {
      console.error('[webhook] invoicePayments.list error:', err);
    }
  }

  // Risali all'utente dal customer_id
  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
  if (!customerId) return;

  const { data: profile } = await admin
    .from('profiles')
    .select('id, full_name, email, referred_by_user_id, acquired_by_agent_id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();

  const p = profile as
    | {
        id: string;
        full_name: string | null;
        email: string;
        referred_by_user_id: string | null;
        acquired_by_agent_id: string | null;
      }
    | null;

  if (!p) return;

  // Recupera plan_tier + billing_interval dalla subscription
  const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = stripeSub.items.data[0]?.price.id;
  const resolved = priceId ? resolvePriceId(priceId) : null;
  if (!resolved) return;

  const planTier: PlanTier = resolved.tier;
  const billingInterval: BillingInterval = resolved.interval;
  const paidAt = new Date(invoice.created * 1000).toISOString();
  const consolidatedAt = new Date(invoice.created * 1000 + 30 * 24 * 60 * 60 * 1000).toISOString();
  const invoiceId = invoice.id ?? null;
  if (!invoiceId) return;

  /* --- REFERRAL ------------------------------------------------- */
  if (p.referred_by_user_id) {
    await createReferralCreditIfNeeded({
      admin,
      referrerUserId: p.referred_by_user_id,
      referredUserId: p.id,
      referredFullName: p.full_name,
      chargeId: null,
      invoiceId,
      paymentIntentId,
      paidAt,
      consolidatedAt,
    });
  }

  /* --- AGENT ---------------------------------------------------- */
  if (p.acquired_by_agent_id) {
    const commissionEur = getCommissionEur(planTier, billingInterval);
    if (commissionEur > 0) {
      await admin
        .from('agent_commissions')
        .upsert(
          {
            agent_id: p.acquired_by_agent_id,
            customer_user_id: p.id,
            stripe_subscription_id: subscriptionId,
            stripe_invoice_id: invoiceId,
            stripe_charge_id: null,
            stripe_payment_intent_id: paymentIntentId,
            plan_tier: planTier,
            billing_interval: billingInterval,
            amount_eur: commissionEur,
            customer_paid_at: paidAt,
            consolidated_at: consolidatedAt,
            status: 'pending' as const,
          },
          { onConflict: 'stripe_invoice_id', ignoreDuplicates: true },
        );
    }
  }
}

/**
 * Crea il referral credit per il referred. Applica il cap di 6 crediti aperti
 * per referrer: oltre il cap, il credito viene creato in status 'voided'
 * per trasparenza (niente reward).
 */
async function createReferralCreditIfNeeded(params: {
  admin: ReturnType<typeof createAdminClient>;
  referrerUserId: string;
  referredUserId: string;
  referredFullName: string | null;
  chargeId: string | null;
  invoiceId: string;
  paymentIntentId: string | null;
  paidAt: string;
  consolidatedAt: string;
}) {
  const { admin, referrerUserId, referredUserId } = params;

  // Count open credits per capare
  const { data: openCountData } = await admin.rpc('count_referrer_open_credits', {
    p_user_id: referrerUserId,
  });
  const openCount = typeof openCountData === 'number' ? openCountData : 0;

  const CAP = 6;
  const hitCap = openCount >= CAP;

  const insertPayload = {
    referrer_user_id: referrerUserId,
    referred_user_id: referredUserId,
    stripe_charge_id: params.chargeId,
    stripe_invoice_id: params.invoiceId,
    stripe_payment_intent_id: params.paymentIntentId,
    referred_first_payment_at: params.paidAt,
    consolidated_at: params.consolidatedAt,
    status: (hitCap ? 'voided' : 'pending') as 'voided' | 'pending',
    voided_at: hitCap ? new Date().toISOString() : null,
    voided_reason: hitCap ? `cap_reached (${CAP})` : null,
  };

  const { error } = await admin
    .from('referral_credits')
    .insert(insertPayload);

  if (error && !error.message.includes('duplicate')) {
    console.error('[webhook] createReferralCredit error:', error);
    return;
  }

  if (hitCap) return; // nessuna email se oltre cap

  // Email al referrer: "Tizio si è registrato con il tuo codice"
  try {
    const { data: referrer } = await admin
      .from('profiles')
      .select('email, full_name')
      .eq('id', referrerUserId)
      .single();

    const r = referrer as { email: string; full_name: string | null } | null;
    if (r?.email) {
      const resend = getResend();
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';
      await resend.emails.send({
        from: getFromEmail(),
        to: r.email,
        subject: `Il tuo amico si è abbonato — sconto 50% in arrivo tra 30 giorni`,
        html: referralFirstPaymentEmailHtml({
          referrerName: r.full_name,
          referredName: params.referredFullName,
          consolidationDate: new Date(params.consolidatedAt).toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          dashboardUrl: `${siteUrl}/dashboard`,
        }),
      });
    }
  } catch (err) {
    console.error('[webhook] referral first-payment email error:', err);
  }
}

async function upsertSubscription(
  admin: ReturnType<typeof createAdminClient>,
  sub: Stripe.Subscription,
) {
  const userId = sub.metadata?.supabase_user_id;
  if (!userId) return;

  const firstItem = sub.items.data[0];
  const priceId = firstItem?.price.id;
  const resolved = priceId ? resolvePriceId(priceId) : null;

  // API Stripe recente (2025+): current_period_*/ sono su items.data[*].
  // Vecchia API: sul top-level di Subscription. Leggo con fallback.
  const itemAny = firstItem as unknown as {
    current_period_start?: number;
    current_period_end?: number;
  } | undefined;
  const subAny = sub as unknown as {
    current_period_start?: number;
    current_period_end?: number;
    canceled_at?: number | null;
  };

  const periodStart = itemAny?.current_period_start ?? subAny.current_period_start;
  const periodEnd = itemAny?.current_period_end ?? subAny.current_period_end;

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
    current_period_start: toISO(periodStart),
    current_period_end: toISO(periodEnd),
    cancel_at_period_end: sub.cancel_at_period_end,
    canceled_at: toISO(subAny.canceled_at ?? null),
  };

  await admin
    .from('subscriptions')
    .upsert(payload, { onConflict: 'stripe_subscription_id' });
}

// Export marker usato da referral.ts per evitare circular imports
export {};
