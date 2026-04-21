// apps/catalogo/types/database.ts
//
// Tipi TypeScript per lo schema Supabase Overfy.
// Tenuti sincronizzati a mano con SUPABASE_SCHEMA.sql + SUPABASE_PATCH_2.sql +
// SUPABASE_PATCH_3.sql.
//
// Se in futuro vuoi generarli automaticamente:
//   npx supabase gen types typescript --project-id ukespvqmqrglsexcmrzt > types/database.ts

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

export type BillingInterval = 'month' | 'year';

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
  stripe_customer_id: string | null;      // Patch 2
  terms_accepted_at: string | null;        // Patch 2
  is_admin: boolean;                        // Patch 3
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

// ---------------------------------------------------------------------------
// Insert / Update types (per operazioni di scrittura)
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

// ---------------------------------------------------------------------------
// Database type (compatibile con @supabase/supabase-js generics)
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
    };
    Enums: {
      plan_tier: PlanTier;
      subscription_status: SubscriptionStatus;
      lead_status: LeadStatus;
    };
  };
}
