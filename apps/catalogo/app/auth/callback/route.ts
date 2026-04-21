// apps/catalogo/app/auth/callback/route.ts
//
// Handler del link di conferma email Supabase.
// Scambia il code per una sessione poi redirige all'utente.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const plan = searchParams.get('plan');
  const interval = searchParams.get('interval');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=conferma_fallita`);
    }
  }

  // Se ha un piano selezionato, mandiamolo al checkout tramite /login (che sa
  // aprire lo checkout direttamente se l'utente è già autenticato).
  if (plan && interval) {
    const qs = new URLSearchParams({ plan, interval, next: '/dashboard' });
    return NextResponse.redirect(`${origin}/dopo-registrazione?${qs.toString()}`);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
