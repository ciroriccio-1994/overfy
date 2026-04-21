// apps/catalogo/lib/supabase/server.ts
//
// Client Supabase per uso SERVER (Server Components, Route Handlers, Server Actions).
// Next.js 16: cookies() è async, per questo la funzione è async.

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Chiamato da un Server Component: ignora. Il middleware
            // aggiornerà comunque i cookie alla prossima richiesta.
          }
        },
      },
    },
  );
}
