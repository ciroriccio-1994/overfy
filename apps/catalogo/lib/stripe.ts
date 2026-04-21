// apps/catalogo/lib/stripe.ts
//
// Istanza Stripe server-side. Non importare in Client Components.

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Ometto apiVersion di proposito: Stripe userà il default pinnato
  // sul dashboard account CoinsFarm. Così non ci sono mismatch quando
  // migreremo all'account Overfy SRL (basterà cambiare le env var).
  typescript: true,
  appInfo: {
    name: 'Overfy',
    url: 'https://overfydigital.com',
  },
});
