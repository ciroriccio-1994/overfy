// apps/catalogo/app/api/stripe/portal/route.ts
//
// Stripe Customer Portal. Crea una sessione di portale per l'utente
// corrente e restituisce l'URL per redirigerlo.
//
// Prerequisito: in Stripe Dashboard (TEST mode) → Settings → Billing →
// Customer portal, deve essere configurato e salvato almeno una volta
// (basta aprire e cliccare "Save"). Altrimenti Stripe restituisce un
// errore che questa route propaga al client.

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const auth = await getCurrentUser();
    if (!auth) {
      return NextResponse.json({ error: 'Devi essere loggato.' }, { status: 401 });
    }

    if (!auth.profile.stripe_customer_id) {
      return NextResponse.json(
        { error: 'Nessun cliente Stripe collegato a questo account.' },
        { status: 400 },
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';

    const session = await stripe.billingPortal.sessions.create({
      customer: auth.profile.stripe_customer_id,
      return_url: `${siteUrl}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[portal] error:', err);
    const msg = err instanceof Error ? err.message : 'Errore interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
