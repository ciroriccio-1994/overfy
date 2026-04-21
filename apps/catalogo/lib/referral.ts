// apps/catalogo/lib/referral.ts
//
// Utility per applicare referral credits alla subscription del referrer.
//
// Strategia Stripe:
//   - Creiamo un coupon `duration: 'once'` 50% OFF.
//   - Lo applichiamo alla subscription del referrer via `subscription.discounts`.
//   - Stripe userà il coupon sulla PROSSIMA invoice generata e poi lo rimuoverà
//     automaticamente (perché duration=once). Le invoice successive torneranno
//     a prezzo pieno.
//   - Prima di applicare, controlliamo che la subscription NON abbia già uno
//     sconto attivo — altrimenti attendiamo il rinnovo successivo.

import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import type { createAdminClient } from '@/lib/supabase/admin';

type AdminClient = ReturnType<typeof createAdminClient>;

export const REFERRAL_CAP_OPEN_CREDITS = 6;
export const REFERRAL_DISCOUNT_PERCENT = 50;

/**
 * Rappresentazione minimale di una riga referral_credits.
 */
interface ReferralCreditRow {
  id: string;
  referrer_user_id: string;
  referred_user_id: string;
  status: string;
  application_attempts: number;
  consolidated_at: string;
}

/**
 * Prova a consolidare i referral_credits maturi (pending -> consolidated)
 * e poi ad applicare quelli consolidated alla sub del referrer.
 *
 * Sicuro da chiamare più volte (idempotente). Viene invocato:
 *   - dopo ogni evento webhook Stripe (lazy consolidation)
 *   - dal cron giornaliero pg_cron
 */
export async function processReferralQueue(admin: AdminClient): Promise<{
  consolidated: number;
  applied: number;
  errors: number;
}> {
  let consolidated = 0;
  let applied = 0;
  let errors = 0;

  // 1. Consolidation: pending -> consolidated (lazy, oltre al cron)
  try {
    const { data: maturing } = await admin
      .from('referral_credits')
      .select('id')
      .eq('status', 'pending')
      .is('voided_at', null)
      .lte('consolidated_at', new Date().toISOString());

    if (maturing && maturing.length > 0) {
      const ids = (maturing as { id: string }[]).map((r) => r.id);
      await admin
        .from('referral_credits')
        .update({ status: 'consolidated' })
        .in('id', ids);
      consolidated = ids.length;
    }
  } catch (err) {
    console.error('[referral] consolidation error:', err);
    errors++;
  }

  // 2. Applicazione: consolidated -> applied
  const { data: toApply } = await admin
    .from('referral_credits')
    .select('id, referrer_user_id, referred_user_id, status, application_attempts, consolidated_at')
    .eq('status', 'consolidated')
    .is('voided_at', null)
    .lt('application_attempts', 5)
    .order('consolidated_at', { ascending: true });

  const credits = (toApply as ReferralCreditRow[] | null) ?? [];

  // Applichiamo MAX 1 credito per referrer a ogni round (evitando di saturare più
  // coupon sulla stessa subscription)
  const seenReferrers = new Set<string>();

  for (const credit of credits) {
    if (seenReferrers.has(credit.referrer_user_id)) continue;
    seenReferrers.add(credit.referrer_user_id);

    try {
      const ok = await applyReferralCreditToSubscription(admin, credit);
      if (ok) applied++;
    } catch (err) {
      console.error('[referral] apply error for credit', credit.id, err);
      errors++;
      await admin
        .from('referral_credits')
        .update({
          application_attempts: credit.application_attempts + 1,
          application_error: err instanceof Error ? err.message : 'unknown',
        })
        .eq('id', credit.id);
    }
  }

  return { consolidated, applied, errors };
}

/**
 * Applica UN singolo credito alla subscription attiva del referrer.
 * Ritorna true se applicato con successo, false se il referrer non ha una
 * sub attiva (il credito resta consolidated in attesa di una sub futura).
 */
async function applyReferralCreditToSubscription(
  admin: AdminClient,
  credit: ReferralCreditRow,
): Promise<boolean> {
  // 1. Cerca la subscription attiva del referrer.
  const { data: subs } = await admin
    .from('subscriptions')
    .select('stripe_subscription_id, status')
    .eq('user_id', credit.referrer_user_id)
    .in('status', ['active', 'trialing']);

  const activeSub = (subs as { stripe_subscription_id: string | null; status: string }[] | null)
    ?.find((s) => s.stripe_subscription_id);

  if (!activeSub || !activeSub.stripe_subscription_id) {
    // Nessuna sub attiva: il credito resta consolidated. Al prossimo round o
    // quando il referrer sottoscriverà di nuovo, verrà applicato.
    return false;
  }

  // 2. Verifica su Stripe che la sub non abbia già un discount attivo.
  const stripeSub = await stripe.subscriptions.retrieve(activeSub.stripe_subscription_id, {
    expand: ['discounts'],
  });

  const hasExistingDiscount =
    Array.isArray(stripeSub.discounts) && stripeSub.discounts.length > 0;

  if (hasExistingDiscount) {
    // C'è già un discount (probabilmente un credito precedente). Aspettiamo
    // che venga consumato al prossimo rinnovo. Non incrementiamo attempts:
    // questa non è una failure, è solo "non è il momento".
    return false;
  }

  // 3. Crea coupon Stripe one-time 50% OFF
  const coupon = await stripe.coupons.create({
    percent_off: REFERRAL_DISCOUNT_PERCENT,
    duration: 'once',
    name: `Referral Amico Overfy (${credit.id.slice(0, 8)})`,
    metadata: {
      overfy_referral_credit_id: credit.id,
      overfy_referrer_user_id: credit.referrer_user_id,
      overfy_referred_user_id: credit.referred_user_id,
    },
  });

  // 4. Applica coupon alla subscription
  await stripe.subscriptions.update(activeSub.stripe_subscription_id, {
    discounts: [{ coupon: coupon.id }],
    metadata: {
      ...((stripeSub.metadata as Record<string, string>) || {}),
      overfy_last_applied_referral: credit.id,
    },
  });

  // 5. Marca credito come 'applied'
  await admin
    .from('referral_credits')
    .update({
      status: 'applied',
      applied_at: new Date().toISOString(),
      applied_to_subscription_id: activeSub.stripe_subscription_id,
      stripe_coupon_id: coupon.id,
      application_attempts: credit.application_attempts + 1,
      application_error: null,
    })
    .eq('id', credit.id);

  // 6. Email "sconto sbloccato" (best-effort, non blocca)
  try {
    await sendReferralUnlockedEmail(admin, credit.referrer_user_id, credit.referred_user_id);
  } catch (err) {
    console.error('[referral] unlocked email error:', err);
  }

  return true;
}

async function sendReferralUnlockedEmail(
  admin: AdminClient,
  referrerUserId: string,
  referredUserId: string,
): Promise<void> {
  const { getResend, getFromEmail } = await import('@/lib/email/resend');
  const { referralUnlockedEmailHtml } = await import('@/lib/email/templates');

  const { data: refData } = await admin
    .from('profiles')
    .select('email, full_name')
    .eq('id', referrerUserId)
    .single();

  const { data: referredData } = await admin
    .from('profiles')
    .select('full_name')
    .eq('id', referredUserId)
    .single();

  const referrer = refData as { email: string; full_name: string | null } | null;
  const referred = referredData as { full_name: string | null } | null;

  if (!referrer?.email) return;

  const resend = getResend();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';

  await resend.emails.send({
    from: getFromEmail(),
    to: referrer.email,
    subject: 'Il tuo sconto del 50% è pronto — lo applichiamo al prossimo rinnovo',
    html: referralUnlockedEmailHtml({
      referrerName: referrer.full_name,
      referredName: referred?.full_name ?? null,
      dashboardUrl: `${siteUrl}/dashboard`,
    }),
  });
}

/**
 * Quando un'invoice viene pagata, se conteneva un coupon referral, marca il
 * credito corrispondente come 'consumed'.
 *
 * Stripe SDK 22:
 *   - subscription: invoice.parent.subscription_details.subscription
 *   - coupon su Discount: discount.source.coupon (non più discount.coupon)
 *
 * Logica match:
 *   1. Invoice deve avere una subscription associata.
 *   2. Invoice deve avere uno sconto applicato (total_discount_amounts > 0).
 *   3. Cerca referral_credits con status='applied' per quella subscription.
 *   4. Preferisce match per stripe_coupon_id se presente in invoice.discounts.
 */
export async function handleInvoicePaidForReferral(
  admin: AdminClient,
  invoice: Stripe.Invoice,
): Promise<void> {
  const subscriptionRef = invoice.parent?.subscription_details?.subscription;
  const subscriptionId =
    typeof subscriptionRef === 'string'
      ? subscriptionRef
      : subscriptionRef?.id ?? null;

  if (!subscriptionId) return;

  // Se l'invoice non ha avuto sconti applicati, niente da fare.
  const hadDiscount =
    (invoice.total_discount_amounts?.length ?? 0) > 0 ||
    (invoice.total_discount_amounts?.some((d) => d.amount > 0) ?? false);

  if (!hadDiscount) return;

  // Raccogli coupon IDs usati in questa invoice (se gli oggetti Discount sono
  // espansi nel payload). In Stripe 22 il coupon sta in discount.source.coupon.
  const couponIds = new Set<string>();
  const discounts = invoice.discounts;
  if (Array.isArray(discounts)) {
    for (const d of discounts) {
      if (typeof d === 'string') continue; // è un ID non espanso, skip
      const source = (d as unknown as { source?: { coupon?: string | { id: string } | null } })
        .source;
      const coupon = source?.coupon;
      if (typeof coupon === 'string') couponIds.add(coupon);
      else if (coupon && typeof coupon === 'object' && 'id' in coupon) couponIds.add(coupon.id);
    }
  }

  // Cerca referral_credits applied alla stessa subscription
  const { data: credits } = await admin
    .from('referral_credits')
    .select('id, stripe_coupon_id')
    .eq('status', 'applied')
    .eq('applied_to_subscription_id', subscriptionId);

  const applied = (credits as { id: string; stripe_coupon_id: string | null }[] | null) ?? [];

  // Preferisci match per coupon_id, altrimenti marca tutti gli applied di questa sub.
  const toConsume = applied.filter((c) => {
    if (couponIds.size === 0) return true; // fallback: match per sub
    return c.stripe_coupon_id && couponIds.has(c.stripe_coupon_id);
  });

  for (const credit of toConsume) {
    await admin
      .from('referral_credits')
      .update({
        status: 'consumed',
        consumed_at: new Date().toISOString(),
        applied_to_invoice_id: invoice.id,
      })
      .eq('id', credit.id);
  }
}

/**
 * Quando un charge viene rimborsato, se era il primo pagamento che ha
 * generato un referral credit o una agent commission, void them.
 *
 * Stripe SDK 22: charge.invoice non esiste più. Matchiamo via
 * charge.payment_intent contro stripe_payment_intent_id (salvato al momento
 * di invoice.payment_succeeded via stripe.invoicePayments.list).
 */
export async function voidCreditsFromRefund(
  admin: AdminClient,
  charge: Stripe.Charge,
): Promise<{ referralVoided: number; agentVoided: number }> {
  let referralVoided = 0;
  let agentVoided = 0;

  const pi = charge.payment_intent;
  const paymentIntentId = typeof pi === 'string' ? pi : pi?.id ?? null;

  if (!paymentIntentId) {
    return { referralVoided: 0, agentVoided: 0 };
  }

  // Referral
  const { data: refs } = await admin
    .from('referral_credits')
    .select('id')
    .eq('stripe_payment_intent_id', paymentIntentId)
    .in('status', ['pending', 'consolidated']); // non tocchiamo applied/consumed

  const refIds = ((refs as { id: string }[] | null) ?? []).map((r) => r.id);
  if (refIds.length > 0) {
    await admin
      .from('referral_credits')
      .update({
        status: 'voided',
        voided_at: new Date().toISOString(),
        voided_reason: `refund: ${charge.id}`,
      })
      .in('id', refIds);
    referralVoided = refIds.length;
  }

  // Agent commissions
  const { data: coms } = await admin
    .from('agent_commissions')
    .select('id')
    .eq('stripe_payment_intent_id', paymentIntentId)
    .in('status', ['pending', 'payable']);

  const comIds = ((coms as { id: string }[] | null) ?? []).map((c) => c.id);
  if (comIds.length > 0) {
    await admin
      .from('agent_commissions')
      .update({
        status: 'voided',
        voided_at: new Date().toISOString(),
        voided_reason: `refund: ${charge.id}`,
      })
      .in('id', comIds);
    agentVoided = comIds.length;
  }

  return { referralVoided, agentVoided };
}
