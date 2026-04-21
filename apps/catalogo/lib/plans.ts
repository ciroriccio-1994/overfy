// apps/catalogo/lib/plans.ts
//
// Mapping centrale tra piani Overfy e price IDs Stripe.
// Supporta 3 intervalli di fatturazione: month, quarter, year.

import type { PlanTier, BillingInterval } from '@/types/database';

export type PaidPlanTier = Exclude<PlanTier, 'su_misura'>;

interface PriceSlot {
  priceId: string | null;
  amountEur: number;
}

export interface PlanConfig {
  tier: PlanTier;
  name: string;
  monthly: PriceSlot | null;
  quarterly: PriceSlot | null;
  yearly: PriceSlot | null;
  color: 'coral' | 'mint' | 'sky' | 'ink';
  chatbot: 'preimpostato' | 'custom';
  highlight?: boolean;
  isQuoteOnly?: boolean;
}

export const PLANS: Record<PlanTier, PlanConfig> = {
  essenziale: {
    tier: 'essenziale',
    name: 'Essenziale',
    monthly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_MONTHLY ?? null,
      amountEur: 49.99,
    },
    quarterly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_QUARTERLY ?? null,
      amountEur: 134.99,
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
    quarterly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_QUARTERLY ?? null,
      amountEur: 350.99,
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
    quarterly: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_QUARTERLY ?? null,
      amountEur: 674.99,
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
    quarterly: null,
    yearly: null,
    color: 'ink',
    chatbot: 'custom',
    isQuoteOnly: true,
  },
};

/**
 * Dato un priceId Stripe restituisce il tier + intervallo di fatturazione.
 */
export function resolvePriceId(priceId: string): {
  tier: PaidPlanTier;
  interval: BillingInterval;
} | null {
  for (const plan of Object.values(PLANS)) {
    if (plan.monthly?.priceId === priceId) {
      return { tier: plan.tier as PaidPlanTier, interval: 'month' };
    }
    if (plan.quarterly?.priceId === priceId) {
      return { tier: plan.tier as PaidPlanTier, interval: 'quarter' };
    }
    if (plan.yearly?.priceId === priceId) {
      return { tier: plan.tier as PaidPlanTier, interval: 'year' };
    }
  }
  return null;
}

/**
 * Dato un tier + intervallo restituisce il priceId Stripe.
 */
export function getPriceId(
  tier: PaidPlanTier,
  interval: BillingInterval,
): string | null {
  const plan = PLANS[tier];
  if (!plan) return null;
  switch (interval) {
    case 'month':
      return plan.monthly?.priceId ?? null;
    case 'quarter':
      return plan.quarterly?.priceId ?? null;
    case 'year':
      return plan.yearly?.priceId ?? null;
    default:
      return null;
  }
}

/**
 * Dato un tier + intervallo restituisce lo slot con prezzo e ID.
 */
export function getPlanSlot(
  tier: PaidPlanTier,
  interval: BillingInterval,
): PriceSlot | null {
  const plan = PLANS[tier];
  if (!plan) return null;
  switch (interval) {
    case 'month':
      return plan.monthly;
    case 'quarter':
      return plan.quarterly;
    case 'year':
      return plan.yearly;
    default:
      return null;
  }
}

/**
 * Piani acquistabili (esclude Su Misura).
 */
export const PAID_PLANS: PaidPlanTier[] = ['essenziale', 'professionale', 'business'];

export function isPaidPlan(tier: string): tier is PaidPlanTier {
  return PAID_PLANS.includes(tier as PaidPlanTier);
}

/**
 * Divisori per normalizzare un prezzo a "equivalente mensile".
 * Usato per calcoli MRR e per mostrare "€X/mese" in UI.
 */
export const INTERVAL_MONTHS: Record<BillingInterval, number> = {
  month: 1,
  quarter: 3,
  year: 12,
};
