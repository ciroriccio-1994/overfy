// apps/catalogo/lib/supabase/admin.ts
//
// Client Supabase con SERVICE_ROLE → bypassa RLS.
// Usare SOLO nel webhook Stripe e in operazioni amministrative server-side.
// MAI importare da un Client Component.
//
// NOTA: non usiamo il generic <Database> qui perché il client admin esegue
// scritture libere (insert/upsert/update) dove il typing stretto di Supabase
// introduce problemi di narrowing con i nullable. Le validazioni sui tipi
// avvengono nel codice chiamante.

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }

  return createSupabaseClient(
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
