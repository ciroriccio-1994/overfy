// apps/catalogo/lib/supabase/client.ts
//
// Client Supabase per uso nel BROWSER (Client Components, event handlers).
// Usa solo la anon key: RLS protegge tutto.

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
