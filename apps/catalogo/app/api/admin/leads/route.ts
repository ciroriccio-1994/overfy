// apps/catalogo/app/api/admin/leads/route.ts
//
// PATCH update dello status di un lead. Solo admin.
// Usa admin client per bypassare RLS (validazione is_admin in-code).

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import type { LeadStatus } from '@/types/database';

export const runtime = 'nodejs';

const VALID_STATUSES: LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'converted',
  'lost',
];

export async function PATCH(request: Request) {
  try {
    const auth = await getCurrentUser();
    if (!auth) {
      return NextResponse.json({ error: 'Devi essere loggato.' }, { status: 401 });
    }
    if (!auth.profile.is_admin) {
      return NextResponse.json({ error: 'Non autorizzato.' }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const id = typeof body?.id === 'string' ? body.id : null;
    const status = typeof body?.status === 'string' ? body.status : null;

    if (!id) {
      return NextResponse.json({ error: 'ID lead mancante.' }, { status: 400 });
    }
    if (!status || !VALID_STATUSES.includes(status as LeadStatus)) {
      return NextResponse.json(
        { error: `Status non valido. Validi: ${VALID_STATUSES.join(', ')}.` },
        { status: 400 },
      );
    }

    const admin = createAdminClient();
    const { error } = await admin
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('[admin/leads] update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/leads] error:', err);
    const msg = err instanceof Error ? err.message : 'Errore interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
