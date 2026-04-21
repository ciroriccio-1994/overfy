// apps/catalogo/lib/supabase/admin.ts
//
// Client Supabase con SERVICE_ROLE → bypassa RLS.
// Usare SOLO nel webhook Stripe e in operazioni amministrative server-side.
// MAI importare da un Client Component.

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

/**
 * Crea un client Supabase con permessi da amministratore (service_role).
 *
 * ⚠️ Bypassa completamente RLS.
 * ⚠️ MAI usare lato client — la chiave deve restare server-only.
 * ⚠️ Destinato a: webhook Stripe, job automatici, operazioni di sistema.
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
