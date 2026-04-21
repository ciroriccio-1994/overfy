// apps/catalogo/lib/supabase/middleware.ts
//
// Helper per il middleware: refresh automatico della sessione Supabase
// ad ogni richiesta. Richiesto da @supabase/ssr per mantenere i cookie
// di auth sincronizzati tra client e server.

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANTE: non mettere logica tra `createServerClient` e `getUser`.
  // Un bug sottile potrebbe far scadere la sessione.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protezione rotte: /dashboard e tutte le sue sottorotte richiedono auth.
  // Se arrivano rotte protette aggiuntive in futuro, aggiungile qui.
  const isProtected = pathname.startsWith('/dashboard');

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
