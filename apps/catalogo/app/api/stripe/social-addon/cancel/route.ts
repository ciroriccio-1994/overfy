// apps/catalogo/app/api/stripe/social-addon/cancel/route.ts
//
// Cancella un add-on social attivo. L'add-on resta attivo fino a fine periodo
// di fatturazione della subscription base (coerente col modello "non rimborso
// parziale del mese già iniziato"), poi viene rimosso al prossimo rinnovo.
//
// Strategia: NON rimuoviamo subito il subscription_item da Stripe (perderebbe
// proration). Invece:
//   - marchiamo l'addon come 'pending_cancellation' in DB
//   - salviamo metadata sulla subscription per ricordare "rimuovi addon al
//     prossimo invoice.paid"
//
// Il webhook, alla prossima invoice.paid, rimuoverà il subscription_item e
// marcherà l'addon come 'canceled'.
//
// Questo fa sì che il cliente paghi il mese già iniziato del social (giusto,
// il lavoro è già stato fatto) e non venga ri-fatturato il mese successivo.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { stripe } from '@/lib/stripe';
import type { SocialAddonRow } from '@/types/database';

export const runtime = 'nodejs';

export async function POST() {
  try {
    // Auth
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
    }

    const admin = createAdminClient();

    // Trova addon attivo dell'utente
    const { data: addonRaw } = await admin
      .from('social_addons')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();

    const addon = addonRaw as SocialAddonRow | null;

    if (!addon) {
      return NextResponse.json(
        { error: 'Nessun add-on social attivo da cancellare.' },
        { status: 400 },
      );
    }

    // Marca come pending_cancellation
    await admin
      .from('social_addons')
      .update({ status: 'pending_cancellation' })
      .eq('id', addon.id);

    // Metadata sulla subscription Stripe: indicatore da leggere al prossimo
    // invoice.paid per rimuovere l'item.
    try {
      const currentSub = await stripe.subscriptions.retrieve(
        addon.stripe_subscription_id,
      );
      await stripe.subscriptions.update(addon.stripe_subscription_id, {
        metadata: {
          ...((currentSub.metadata as Record<string, string>) || {}),
          overfy_social_addon_cancel_at_period_end: 'true',
          overfy_social_addon_item_to_remove: addon.stripe_subscription_item_id,
        },
      });
    } catch (err) {
      console.error('[social-addon/cancel] metadata set failed:', err);
      // Non blocca — il DB è già in pending_cancellation, il cron/webhook
      // può comunque fare la cleanup leggendo il DB.
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[social-addon/cancel] error:', err);
    const msg = err instanceof Error ? err.message : 'Errore interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
