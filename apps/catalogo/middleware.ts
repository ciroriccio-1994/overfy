// apps/catalogo/middleware.ts
//
// Middleware root: refresh sessione Supabase + protezione rotte.
// La logica vive in `lib/supabase/middleware.ts`.

import { updateSession } from '@/lib/supabase/middleware';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match tutte le rotte TRANNE:
     * - _next/static (file statici)
     * - _next/image  (ottimizzazione immagini)
     * - favicon.ico, sitemap.xml, robots.txt
     * - file con estensione statica
     *
     * Il webhook Stripe (/api/stripe/webhook) passa dal middleware ma
     * NON viene protetto (la protezione è solo per /dashboard e /admin).
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
