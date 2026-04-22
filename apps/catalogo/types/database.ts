// apps/catalogo/types/database.ts
//
// Tipi TypeScript per lo schema Supabase Overfy.
//
// Patch 2026-04-21: aggiunti tipi per referral_credits, agents, agent_commissions.

export type PlanTier = 'essenziale' | 'professionale' | 'business' | 'su_misura';

export type SubscriptionStatus =
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'paused';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

/**
 * Intervalli di fatturazione supportati.
 * - month: mensile (pieno prezzo)
 * - quarter: trimestrale (~10% sconto)
 * - year: annuale (~17% sconto)
 */
export type BillingInterval = 'month' | 'quarter' | 'year';

export type ReferralCreditStatus =
  | 'pending'
  | 'consolidated'
  | 'applied'
  | 'consumed'
  | 'voided';

export type AgentStatus = 'active' | 'suspended' | 'terminated';

export type AgentCommissionStatus = 'pending' | 'payable' | 'paid' | 'voided';

export type SocialAddonTier = 'basic' | 'pro';

export type SocialAddonStatus = 'active' | 'pending_cancellation' | 'canceled';

// ---------------------------------------------------------------------------
// Row types
// ---------------------------------------------------------------------------

export interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  vat_number: string | null;
  fiscal_code: string | null;
  country: string | null;
  stripe_customer_id: string | null;
  terms_accepted_at: string | null;
  is_admin: boolean;
  referral_code: string | null;
  referred_by_user_id: string | null;
  acquired_by_agent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionRow {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  plan_tier: PlanTier;
  billing_interval: BillingInterval | null;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface WebhookEventRow {
  id: string;
  type: string;
  processed_at: string;
  payload: unknown;
}

export interface LeadRow {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  interest_tier: PlanTier | null;
  status: LeadStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ReferralCreditRow {
  id: string;
  referrer_user_id: string;
  referred_user_id: string;
  stripe_charge_id: string | null;
  stripe_invoice_id: string | null;
  stripe_payment_intent_id: string | null;
  referred_first_payment_at: string;
  consolidated_at: string;
  applied_at: string | null;
  applied_to_subscription_id: string | null;
  stripe_coupon_id: string | null;
  application_attempts: number;
  application_error: string | null;
  consumed_at: string | null;
  applied_to_invoice_id: string | null;
  voided_at: string | null;
  voided_reason: string | null;
  status: ReferralCreditStatus;
  created_at: string;
  updated_at: string;
}

export interface AgentRow {
  id: string;
  code: string;
  view_token: string;
  full_name: string;
  email: string;
  phone: string | null;
  vat_number: string | null;
  iban: string | null;
  notes: string | null;
  status: AgentStatus;
  created_at: string;
  updated_at: string;
}

export interface AgentCommissionRow {
  id: string;
  agent_id: string;
  customer_user_id: string;
  stripe_subscription_id: string;
  stripe_invoice_id: string;
  stripe_charge_id: string | null;
  stripe_payment_intent_id: string | null;
  plan_tier: PlanTier;
  billing_interval: BillingInterval;
  amount_eur: number;
  customer_paid_at: string;
  consolidated_at: string;
  paid_at: string | null;
  payout_reference: string | null;
  payout_notes: string | null;
  voided_at: string | null;
  voided_reason: string | null;
  status: AgentCommissionStatus;
  created_at: string;
  updated_at: string;
}

export interface SocialAddonRow {
  id: string;
  user_id: string;
  subscription_id: string;
  stripe_subscription_id: string;
  stripe_subscription_item_id: string;
  stripe_price_id: string;
  tier: SocialAddonTier;
  amount_eur: number;
  status: SocialAddonStatus;
  added_at: string;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Insert / Update types
// ---------------------------------------------------------------------------

export type ProfileInsert = Omit<ProfileRow, 'created_at' | 'updated_at' | 'is_admin'> & {
  is_admin?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ProfileUpdate = Partial<Omit<ProfileRow, 'id' | 'created_at'>>;

export type SubscriptionInsert = Omit<SubscriptionRow, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type SubscriptionUpdate = Partial<Omit<SubscriptionRow, 'id' | 'user_id' | 'created_at'>>;

export type LeadInsert = Omit<LeadRow, 'id' | 'status' | 'metadata' | 'created_at' | 'updated_at'> & {
  id?: string;
  status?: LeadStatus;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type AgentInsert = Omit<AgentRow, 'id' | 'created_at' | 'updated_at' | 'status'> & {
  id?: string;
  status?: AgentStatus;
  created_at?: string;
  updated_at?: string;
};

export type AgentUpdate = Partial<Omit<AgentRow, 'id' | 'created_at'>>;

// ---------------------------------------------------------------------------
// Database type
// ---------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      subscriptions: {
        Row: SubscriptionRow;
        Insert: SubscriptionInsert;
        Update: SubscriptionUpdate;
      };
      webhook_events: {
        Row: WebhookEventRow;
        Insert: Omit<WebhookEventRow, 'processed_at'> & { processed_at?: string };
        Update: Partial<WebhookEventRow>;
      };
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: Partial<LeadRow>;
      };
      referral_credits: {
        Row: ReferralCreditRow;
        Insert: Partial<ReferralCreditRow> & {
          referrer_user_id: string;
          referred_user_id: string;
          referred_first_payment_at: string;
          consolidated_at: string;
        };
        Update: Partial<ReferralCreditRow>;
      };
      agents: {
        Row: AgentRow;
        Insert: AgentInsert;
        Update: AgentUpdate;
      };
      agent_commissions: {
        Row: AgentCommissionRow;
        Insert: Partial<AgentCommissionRow> & {
          agent_id: string;
          customer_user_id: string;
          stripe_subscription_id: string;
          stripe_invoice_id: string;
          plan_tier: PlanTier;
          billing_interval: BillingInterval;
          amount_eur: number;
          customer_paid_at: string;
          consolidated_at: string;
        };
        Update: Partial<AgentCommissionRow>;
      };
      social_addons: {
        Row: SocialAddonRow;
        Insert: Partial<SocialAddonRow> & {
          user_id: string;
          subscription_id: string;
          stripe_subscription_id: string;
          stripe_subscription_item_id: string;
          stripe_price_id: string;
          tier: SocialAddonTier;
          amount_eur: number;
        };
        Update: Partial<SocialAddonRow>;
      };
    };
    Enums: {
      plan_tier: PlanTier;
      subscription_status: SubscriptionStatus;
      lead_status: LeadStatus;
    };
  };
}
