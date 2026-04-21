// apps/catalogo/app/api/dashboard/profile/route.ts
//
// PATCH update del profilo dell'utente loggato.
// Usa admin client per evitare i conflitti di typing tra il generic Database
// di @supabase/ssr e Partial<ProfileUpdate>. L'autorizzazione è in-code:
// l'update passa per getCurrentUser() e filtra sempre per l'id dell'utente
// loggato — nessun utente può toccare il profilo di un altro.

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/lib/auth-helpers';

export const runtime = 'nodejs';

const ALLOWED_FIELDS = [
  'full_name',
  'company_name',
  'phone',
  'vat_number',
  'fiscal_code',
] as const;

export async function PATCH(request: Request) {
  try {
    const auth = await getCurrentUser();
    if (!auth) {
      return NextResponse.json({ error: 'Devi essere loggato.' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const payload: Record<string, string | null> = {};

    for (const key of ALLOWED_FIELDS) {
      if (key in body) {
        const value = body[key];
        if (value === null) {
          payload[key] = null;
        } else if (typeof value === 'string') {
          const trimmed = value.trim();
          payload[key] = trimmed.length === 0 ? null : trimmed.slice(0, 200);
        }
      }
    }

    if (Object.keys(payload).length === 0) {
      return NextResponse.json({ error: 'Nessun campo da aggiornare.' }, { status: 400 });
    }

    // Validazioni leggere
    if (typeof payload.vat_number === 'string' && payload.vat_number.length < 2) {
      return NextResponse.json({ error: 'Partita IVA non valida.' }, { status: 400 });
    }
    if (typeof payload.fiscal_code === 'string' && payload.fiscal_code.length < 5) {
      return NextResponse.json({ error: 'Codice fiscale non valido.' }, { status: 400 });
    }

    // Admin client bypassa RLS — ma auth.userId viene da getCurrentUser(),
    // quindi l'utente può aggiornare solo il proprio profilo.
    const admin = createAdminClient();
    const { error } = await admin
      .from('profiles')
      .update(payload)
      .eq('id', auth.userId);

    if (error) {
      console.error('[profile] update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[profile] error:', err);
    const msg = err instanceof Error ? err.message : 'Errore interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
