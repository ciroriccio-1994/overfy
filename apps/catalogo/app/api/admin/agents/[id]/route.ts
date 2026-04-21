// apps/catalogo/app/api/admin/agents/[id]/route.ts
//
// PATCH  : aggiorna un agent (iban, phone, vat, notes, status)
// DELETE : terminate agent (soft: status='terminated'). Hard delete bloccato
//          se esistono commissioni pagate (FK constraint).

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import type { AgentStatus } from '@/types/database';

export const runtime = 'nodejs';

const VALID_STATUSES: AgentStatus[] = ['active', 'suspended', 'terminated'];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
  if (!auth.profile.is_admin) return NextResponse.json({ error: 'Non autorizzato.' }, { status: 403 });

  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));

  const updates: Record<string, unknown> = {};

  if (typeof body.full_name === 'string') updates.full_name = body.full_name.trim();
  if (typeof body.email === 'string') updates.email = body.email.trim().toLowerCase();
  if ('phone' in body) updates.phone = body.phone ? String(body.phone).trim() : null;
  if ('vat_number' in body) updates.vat_number = body.vat_number ? String(body.vat_number).trim() : null;
  if ('iban' in body) updates.iban = body.iban ? String(body.iban).trim() : null;
  if ('notes' in body) updates.notes = body.notes ? String(body.notes).trim() : null;
  if (typeof body.status === 'string' && VALID_STATUSES.includes(body.status as AgentStatus)) {
    updates.status = body.status;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Nessun campo da aggiornare.' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('agents')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[api/admin/agents PATCH] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ agent: data });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
  if (!auth.profile.is_admin) return NextResponse.json({ error: 'Non autorizzato.' }, { status: 403 });

  const { id } = await context.params;
  const admin = createAdminClient();

  // Soft delete: status=terminated (le commissioni restano intatte per audit/bonifici pendenti).
  const { error } = await admin
    .from('agents')
    .update({ status: 'terminated' })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
