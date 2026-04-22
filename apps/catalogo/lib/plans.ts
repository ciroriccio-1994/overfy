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

// ---------------------------------------------------------------------------
// SOCIAL ADD-ON (Apr 22 2026)
// ---------------------------------------------------------------------------
//
// Add-on opzionale "Gestione social", acquistabile SOLO sopra una subscription
// base attiva. Fatturazione mensile ricorrente aggiunta come line item alla
// stessa Stripe Subscription della base (stessa invoice).
//
// - basic: €100/mese  — post + storie + community management base
// - pro:   €200/mese  — tutto basic + reel + design custom + ADS tecnica

export type SocialAddonTier = 'basic' | 'pro';

export interface SocialAddonConfig {
  tier: SocialAddonTier;
  name: string;
  tagline: string;
  amountEur: number;
  priceId: string | null;
  features: string[];
}

export const SOCIAL_ADDONS: Record<SocialAddonTier, SocialAddonConfig> = {
  basic: {
    tier: 'basic',
    name: 'Social Basic',
    tagline: 'Presenza social costante, senza pensieri.',
    amountEur: 100,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_BASIC ?? null,
    features: [
      'Piano editoriale mensile mirato (traffico / vendite / community)',
      'Calendario editoriale con programmazione',
      '3 post a settimana + 1 storia al giorno',
      'Grafiche di base e copy professionale',
      'Moderazione commenti e messaggi (1h/giorno)',
    ],
  },
  pro: {
    tier: 'pro',
    name: 'Social Pro',
    tagline: 'Crescita attiva: contenuti custom, reel, ADS e analisi.',
    amountEur: 200,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_PRO ?? null,
    features: [
      'Tutto il piano Basic, più:',
      'Custom Graphic Design — elementi grafici esclusivi sul brand',
      'Content Strategy personalizzata sul cliente',
      'Video Editing: 3 Reel/video professionali al mese',
      'Community management avanzato (3h/giorno)',
      'Report mensile con analisi risultati e consigli strategici',
      'Configurazione e monitoraggio tecnico campagne ADS',
    ],
  },
};

export const SOCIAL_ADDON_TIERS: SocialAddonTier[] = ['basic', 'pro'];

export function isSocialAddonTier(v: string): v is SocialAddonTier {
  return (SOCIAL_ADDON_TIERS as string[]).includes(v);
}

export function getSocialAddonPriceId(tier: SocialAddonTier): string | null {
  return SOCIAL_ADDONS[tier].priceId;
}

/**
 * Dato un priceId Stripe, restituisce il tier social se è un addon, altrimenti null.
 */
export function resolveSocialAddonPriceId(priceId: string): SocialAddonTier | null {
  for (const tier of SOCIAL_ADDON_TIERS) {
    if (SOCIAL_ADDONS[tier].priceId === priceId) return tier;
  }
  return null;
}
