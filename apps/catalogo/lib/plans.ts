// apps/catalogo/lib/plans.ts
//
// Mapping centrale tra piani Overfy e price IDs Stripe.
// Single source of truth: pricing UI, checkout API e webhook
// leggono da qui per evitare stringhe hardcodate sparse.

import type { PlanTier, BillingInterval } from '@/types/database';

export type PaidPlanTier = Exclude<PlanTier, 'su_misura'>;

export interface PlanConfig {
  tier: PlanTier;
  name: string;                 // nome UI
  monthly: {
    priceId: string | null;
    amountEur: number;
  } | null;
  yearly: {
    priceId: string | null;
    amountEur: number;
  } | null;
  color: 'coral' | 'mint' | 'sky' | 'ink';
  chatbot: 'preimpostato' | 'custom';
  highlight?: boolean;          // per il piano "⭐ Professionale"
  isQuoteOnly?: boolean;        // true per Su Misura
}

export const PLANS: Record<PlanTier, PlanConfig> = {
  essenziale: {
    tier: 'essenziale',
    name: 'Essenziale',
    monthly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_MONTHLY ?? null,
      amountEur: 49.99,
    },
    yearly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_YEARLY ?? null,
      amountEur: 489.99,
    },
    color: 'coral',
    chatbot: 'preimpostato',
  },
  professionale: {
    tier: 'professionale',
    name: 'Professionale',
    monthly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_MONTHLY ?? null,
      amountEur: 129.99,
    },
    yearly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_YEARLY ?? null,
      amountEur: 1289.99,
    },
    color: 'mint',
    chatbot: 'custom',
    highlight: true,
  },
  business: {
    tier: 'business',
    name: 'Business',
    monthly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY ?? null,
      amountEur: 249.99,
    },
    yearly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_YEARLY ?? null,
      amountEur: 2489.99,
    },
    color: 'sky',
    chatbot: 'custom',
  },
  su_misura: {
    tier: 'su_misura',
    name: 'Su Misura',
    monthly: null,
    yearly: null,
    color: 'ink',
    chatbot: 'custom',
    isQuoteOnly: true,
  },
};

/**
 * Dato un priceId Stripe restituisce il tier + intervallo di fatturazione.
 * Usato dal webhook per mappare subscription Stripe → riga DB.
 */
export function resolvePriceId(priceId: string): {
  tier: PaidPlanTier;
  interval: BillingInterval;
} | null {
  for (const plan of Object.values(PLANS)) {
    if (plan.monthly?.priceId === priceId) {
      return { tier: plan.tier as PaidPlanTier, interval: 'month' };
    }
    if (plan.yearly?.priceId === priceId) {
      return { tier: plan.tier as PaidPlanTier, interval: 'year' };
    }
  }
  return null;
}

/**
 * Dato un tier + intervallo restituisce il priceId Stripe.
 * Usato dall'API checkout per costruire la sessione.
 */
export function getPriceId(
  tier: PaidPlanTier,
  interval: BillingInterval,
): string | null {
  const plan = PLANS[tier];
  if (!plan) return null;
  return interval === 'month' ? plan.monthly?.priceId ?? null : plan.yearly?.priceId ?? null;
}

/**
 * Piani acquistabili (esclude Su Misura).
 */
export const PAID_PLANS: PaidPlanTier[] = ['essenziale', 'professionale', 'business'];

export function isPaidPlan(tier: string): tier is PaidPlanTier {
  return PAID_PLANS.includes(tier as PaidPlanTier);
}
