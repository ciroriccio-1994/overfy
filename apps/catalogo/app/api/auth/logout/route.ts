// apps/catalogo/app/api/auth/logout/route.ts
//
// POST logout. Cancella la sessione Supabase lato server (cookie).
// Il client poi fa router.push('/') per redirigere.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[logout] error:', err);
    const msg = err instanceof Error ? err.message : 'Errore interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
