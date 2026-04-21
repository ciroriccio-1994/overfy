// apps/catalogo/lib/commissions.ts
//
// Tabella commissioni Agent per piano + intervallo di fatturazione.
// Dato un primo pagamento del cliente, questo modulo risolve l'importo
// di commissione spettante all'agent.
//
// Tabella definita con Ciro (sessione 2026-04-21):
//   Essenziale:    mensile €0  / trimestrale €40 / annuale €80
//   Professionale: mensile €0  / trimestrale €60 / annuale €130
//   Business:      mensile €40 / trimestrale €90 / annuale €300
//
// Clawback 30gg automatico via webhook refund.

import type { PlanTier, BillingInterval } from '@/types/database';
import type { PaidPlanTier } from '@/lib/plans';

export const COMMISSION_RATES_EUR: Record<
  PaidPlanTier,
  Record<BillingInterval, number>
> = {
  essenziale: {
    month: 0,
    quarter: 40,
    year: 80,
  },
  professionale: {
    month: 0,
    quarter: 60,
    year: 130,
  },
  business: {
    month: 40,
    quarter: 90,
    year: 300,
  },
};

/**
 * Ritorna la commissione in euro per il piano+intervallo specificato.
 * Ritorna 0 per tier non supportati (es. su_misura).
 */
export function getCommissionEur(
  tier: PlanTier,
  interval: BillingInterval,
): number {
  if (tier === 'su_misura') return 0;
  const rates = COMMISSION_RATES_EUR[tier as PaidPlanTier];
  if (!rates) return 0;
  return rates[interval] ?? 0;
}

/**
 * Finestra di clawback in millisecondi (30 giorni).
 * Dopo questo periodo senza refund, la commissione diventa "payable".
 */
export const CLAWBACK_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Finestra di consolidamento referral credit in millisecondi (30 giorni).
 * Identico all'agent per coerenza.
 */
export const REFERRAL_CONSOLIDATION_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
