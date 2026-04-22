// apps/catalogo/app/api/stripe/social-addon/activate/route.ts
//
// Attiva un add-on "Gestione social" (basic | pro) sopra la subscription base
// attiva dell'utente. Aggiunge una line item alla Stripe Subscription esistente.
//
// - Richiede: subscription base attiva ('active' | 'trialing').
// - Proration: 'create_prorations' — Stripe fattura il proporzionale immediato.
// - 1 addon max per sub: se esiste già un addon active/pending_cancellation,
//   ritorna errore.
//
// Webhook customer.subscription.updated gestirà la riga social_addons DB +
// notifica email.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { stripe } from '@/lib/stripe';
import {
  isSocialAddonTier,
  getSocialAddonPriceId,
  SOCIAL_ADDONS,
  type SocialAddonTier,
} from '@/lib/plans';
import type { SubscriptionRow } from '@/types/database';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const tier = body?.tier as string | undefined;

    if (!tier || !isSocialAddonTier(tier)) {
      return NextResponse.json(
        { error: 'Tier social non valido. Usa "basic" o "pro".' },
        { status: 400 },
      );
    }

    const priceId = getSocialAddonPriceId(tier);
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID non configurato per questo tier social.' },
        { status: 500 },
      );
    }

    // Auth
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
    }

    const admin = createAdminClient();

    // Trova la subscription base attiva dell'utente
    const { data: subsRaw } = await admin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing'])
      .order('created_at', { ascending: false });

    const subs = (subsRaw as SubscriptionRow[] | null) ?? [];
    const activeSub = subs.find((s) => !!s.stripe_subscription_id) ?? null;

    if (!activeSub || !activeSub.stripe_subscription_id) {
      return NextResponse.json(
        {
          error:
            'Devi avere una subscription Overfy attiva per acquistare l\'add-on social.',
        },
        { status: 400 },
      );
    }

    // Verifica che non esista già un addon attivo
    const { data: existingAddon } = await admin
      .from('social_addons')
      .select('id, status, tier')
      .eq('subscription_id', activeSub.id)
      .in('status', ['active', 'pending_cancellation'])
      .maybeSingle();

    if (existingAddon) {
      return NextResponse.json(
        {
          error: `Hai già un add-on social ${(existingAddon as { tier: string }).tier} attivo. Gestiscilo dalla dashboard.`,
        },
        { status: 400 },
      );
    }

    // Aggiungi line item alla subscription Stripe esistente.
    // NOTE: per aggiungere un item SENZA cancellare i precedenti, uso
    // subscriptionItems.create (non subscriptions.update).
    const newItem = await stripe.subscriptionItems.create({
      subscription: activeSub.stripe_subscription_id,
      price: priceId,
      quantity: 1,
      proration_behavior: 'create_prorations',
    });

    // Aggiorna metadata della subscription (best-effort, non blocca)
    try {
      const currentSub = await stripe.subscriptions.retrieve(
        activeSub.stripe_subscription_id,
      );
      await stripe.subscriptions.update(activeSub.stripe_subscription_id, {
        metadata: {
          ...((currentSub.metadata as Record<string, string>) || {}),
          overfy_social_addon_tier: tier,
        },
      });
    } catch (err) {
      console.warn('[social-addon/activate] metadata update failed:', err);
    }

    // Crea riga social_addons (il webhook la creerebbe comunque, ma la creo qui
    // sincrono per dare feedback immediato all'utente. Idempotente via unique index).
    await admin.from('social_addons').upsert(
      {
        user_id: user.id,
        subscription_id: activeSub.id,
        stripe_subscription_id: activeSub.stripe_subscription_id,
        stripe_subscription_item_id: newItem.id,
        stripe_price_id: priceId,
        tier: tier as SocialAddonTier,
        amount_eur: SOCIAL_ADDONS[tier as SocialAddonTier].amountEur,
        status: 'active' as const,
        added_at: new Date().toISOString(),
      },
      { onConflict: 'stripe_subscription_item_id', ignoreDuplicates: false },
    );

    return NextResponse.json({ success: true, tier });
  } catch (err) {
    console.error('[social-addon/activate] error:', err);
    const msg = err instanceof Error ? err.message : 'Errore interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
