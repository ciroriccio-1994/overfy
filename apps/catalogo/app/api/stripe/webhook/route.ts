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
import {
  resolvePriceId,
  resolveSocialAddonPriceId,
  SOCIAL_ADDONS,
  PLANS,
} from '@/lib/plans';
import { getCommissionEur } from '@/lib/commissions';
import { processReferralQueue, voidCreditsFromRefund, handleInvoicePaidForReferral } from '@/lib/referral';
import { getResend, getFromEmail, getNotifyEmail } from '@/lib/email/resend';
import {
  welcomeEmailHtml,
  referralFirstPaymentEmailHtml,
  referralUnlockedEmailHtml,
  referralAppliedEmailHtml,
  socialAddonInternalNotificationHtml,
} from '@/lib/email/templates';
import type { SubscriptionStatus, BillingInterval, PlanTier, SocialAddonTier } from '@/types/database';

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
        await syncSocialAddons(admin, sub, event.type);
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await admin
          .from('subscriptions')
          .update({ status: 'canceled', canceled_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id);
        // Cascade: tutti gli addon social di questa sub vanno a canceled.
        await admin
          .from('social_addons')
          .update({ status: 'canceled', canceled_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id)
          .in('status', ['active', 'pending_cancellation']);
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
        await handleInvoicePaidForSocialAddonCancellation(admin, invoice);
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

/* ------------------------------------------------------------------ */
/* SOCIAL ADD-ON                                                      */
/* ------------------------------------------------------------------ */

/**
 * Sincronizza lo stato social_addons con i line items della Stripe Subscription.
 *
 * Chiamata su customer.subscription.created/updated. Se trova un line item
 * con un price_id che corrisponde a un social addon (basic/pro):
 *   - se non c'è già un record in DB, lo crea in 'active' + invia email
 *     interna a info@overfydigital.com
 *   - se c'è già un record 'active'/'pending_cancellation', aggiorna solo
 *     il subscription_item_id (in caso di ricreazione)
 *
 * Se NON trova più alcun line item social ma in DB c'era un addon attivo,
 * lo marca 'canceled' (succede dopo la rimozione del line item).
 */
async function syncSocialAddons(
  admin: ReturnType<typeof createAdminClient>,
  sub: Stripe.Subscription,
  eventType: string,
): Promise<void> {
  const userId = sub.metadata?.supabase_user_id;
  if (!userId) return;

  // Trova il nostro record subscription in DB (per FK subscription_id)
  const { data: dbSubRaw } = await admin
    .from('subscriptions')
    .select('id')
    .eq('stripe_subscription_id', sub.id)
    .maybeSingle();

  const dbSub = dbSubRaw as { id: string } | null;
  if (!dbSub) return;

  // Scansiona items per trovare il line item social (se presente)
  let socialItem: Stripe.SubscriptionItem | null = null;
  let socialTier: SocialAddonTier | null = null;
  for (const item of sub.items.data) {
    const tier = resolveSocialAddonPriceId(item.price.id);
    if (tier) {
      socialItem = item;
      socialTier = tier;
      break; // max 1 addon per sub
    }
  }

  // CASO A: c'è un line item social nella sub
  if (socialItem && socialTier) {
    // Verifica se abbiamo già un record 'active' o 'pending_cancellation'
    const { data: existingRaw } = await admin
      .from('social_addons')
      .select('id, status, stripe_subscription_item_id, tier')
      .eq('stripe_subscription_id', sub.id)
      .in('status', ['active', 'pending_cancellation'])
      .maybeSingle();

    const existing = existingRaw as {
      id: string;
      status: string;
      stripe_subscription_item_id: string;
      tier: string;
    } | null;

    if (!existing) {
      // Nuovo addon — inserisci + manda email interna (solo su subscription.updated,
      // non su created per evitare doppi). Evento subscription.created non include
      // mai un addon visto che la attivazione sposta via subscriptionItems.create
      // che genera customer.subscription.updated.
      const { error: insertErr } = await admin.from('social_addons').insert({
        user_id: userId,
        subscription_id: dbSub.id,
        stripe_subscription_id: sub.id,
        stripe_subscription_item_id: socialItem.id,
        stripe_price_id: socialItem.price.id,
        tier: socialTier,
        amount_eur: SOCIAL_ADDONS[socialTier].amountEur,
        status: 'active' as const,
        added_at: new Date().toISOString(),
      });

      if (insertErr && !insertErr.message.includes('duplicate')) {
        console.error('[webhook] social_addons insert error:', insertErr);
      }

      // Email interna — solo se siamo su subscription.updated (prima volta
      // che vediamo il line item)
      if (eventType === 'customer.subscription.updated') {
        await sendSocialAddonNotificationEmail(admin, {
          action: 'activated',
          userId,
          sub,
          tier: socialTier,
        });
      }
    } else if (existing.stripe_subscription_item_id !== socialItem.id) {
      // Item ricreato (edge case): aggiorna l'id
      await admin
        .from('social_addons')
        .update({ stripe_subscription_item_id: socialItem.id })
        .eq('id', existing.id);
    }
    return;
  }

  // CASO B: NESSUN line item social nella sub, ma in DB c'è un addon attivo
  // → significa che è stato rimosso (cleanup dopo pending_cancellation)
  const { data: staleAddonRaw } = await admin
    .from('social_addons')
    .select('id, tier, status')
    .eq('stripe_subscription_id', sub.id)
    .in('status', ['active', 'pending_cancellation'])
    .maybeSingle();

  const staleAddon = staleAddonRaw as { id: string; tier: SocialAddonTier; status: string } | null;

  if (staleAddon) {
    await admin
      .from('social_addons')
      .update({
        status: 'canceled',
        canceled_at: new Date().toISOString(),
      })
      .eq('id', staleAddon.id);

    // Email interna di disattivazione (solo se era active, non se era già in
    // pending_cancellation — lì l'abbiamo già notificata dalla pagina)
    if (staleAddon.status === 'active') {
      await sendSocialAddonNotificationEmail(admin, {
        action: 'canceled',
        userId,
        sub,
        tier: staleAddon.tier,
      });
    }
  }
}

/**
 * Al pagamento di una invoice (rinnovo), se la subscription ha il flag
 * `overfy_social_addon_cancel_at_period_end`, rimuove il subscription item
 * social e pulisce il flag. Questo è chiamato DOPO che l'invoice corrente
 * (ancora con l'addon) è stata pagata.
 */
async function handleInvoicePaidForSocialAddonCancellation(
  admin: ReturnType<typeof createAdminClient>,
  invoice: Stripe.Invoice,
): Promise<void> {
  const subscriptionRef = invoice.parent?.subscription_details?.subscription;
  const subscriptionId =
    typeof subscriptionRef === 'string'
      ? subscriptionRef
      : subscriptionRef?.id ?? null;

  if (!subscriptionId) return;

  let sub: Stripe.Subscription;
  try {
    sub = await stripe.subscriptions.retrieve(subscriptionId);
  } catch (err) {
    console.error('[webhook] cannot retrieve sub for addon cancel:', err);
    return;
  }

  const metadata = (sub.metadata as Record<string, string>) || {};
  if (metadata.overfy_social_addon_cancel_at_period_end !== 'true') return;

  const itemToRemove = metadata.overfy_social_addon_item_to_remove;
  if (!itemToRemove) return;

  // Verifica che l'item esista ancora nella sub (altrimenti: già rimosso)
  const stillThere = sub.items.data.some((i) => i.id === itemToRemove);
  if (!stillThere) {
    // Pulisci i flag comunque
    await stripe.subscriptions.update(subscriptionId, {
      metadata: {
        ...metadata,
        overfy_social_addon_cancel_at_period_end: '',
        overfy_social_addon_item_to_remove: '',
      },
    });
    return;
  }

  try {
    // Rimuovi il subscription item, senza proration (il cliente ha già pagato
    // il mese che è appena stato fatturato)
    await stripe.subscriptionItems.del(itemToRemove, {
      proration_behavior: 'none',
    });

    // Pulisci i flag di metadata
    await stripe.subscriptions.update(subscriptionId, {
      metadata: {
        ...metadata,
        overfy_social_addon_cancel_at_period_end: '',
        overfy_social_addon_item_to_remove: '',
      },
    });

    // Il successivo customer.subscription.updated triggerrà syncSocialAddons
    // che marcherà il DB come canceled (caso B).
  } catch (err) {
    console.error('[webhook] subscriptionItems.del error:', err);
  }
}

/**
 * Invia email interna a info@overfydigital.com con dettagli dell'attivazione
 * o disattivazione dell'addon social. Best-effort.
 */
async function sendSocialAddonNotificationEmail(
  admin: ReturnType<typeof createAdminClient>,
  params: {
    action: 'activated' | 'canceled';
    userId: string;
    sub: Stripe.Subscription;
    tier: SocialAddonTier;
  },
): Promise<void> {
  try {
    const { data: profile } = await admin
      .from('profiles')
      .select('email, full_name, phone, company_name')
      .eq('id', params.userId)
      .single();

    const p = profile as {
      email: string;
      full_name: string | null;
      phone: string | null;
      company_name: string | null;
    } | null;

    if (!p) return;

    // Recupera il piano base dall'item Stripe
    const baseItem = params.sub.items.data.find(
      (i) => !resolveSocialAddonPriceId(i.price.id),
    );
    const basePriceId = baseItem?.price.id;
    const baseResolved = basePriceId ? resolvePriceId(basePriceId) : null;
    const planName = baseResolved
      ? PLANS[baseResolved.tier].name
      : 'Overfy';
    const planTier = baseResolved?.tier ?? 'overfy';

    const cfg = SOCIAL_ADDONS[params.tier];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';

    const resend = getResend();
    await resend.emails.send({
      from: getFromEmail(),
      to: getNotifyEmail(),
      subject:
        params.action === 'activated'
          ? `[Overfy] Nuovo add-on Social ${cfg.name} — ${p.full_name || p.email}`
          : `[Overfy] Disattivato add-on Social ${cfg.name} — ${p.full_name || p.email}`,
      html: socialAddonInternalNotificationHtml({
        action: params.action,
        tier: params.tier,
        tierName: cfg.name,
        amountEur: cfg.amountEur,
        customerName: p.full_name,
        customerEmail: p.email,
        customerPhone: p.phone,
        customerCompany: p.company_name,
        planTier,
        planName,
        adminUrl: `${siteUrl}/admin`,
      }),
    });
  } catch (err) {
    console.error('[webhook] social addon notification email error:', err);
  }
}

// Export marker usato da referral.ts per evitare circular imports
export {};
