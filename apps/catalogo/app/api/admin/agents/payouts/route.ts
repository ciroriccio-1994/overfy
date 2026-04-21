// apps/catalogo/app/api/admin/agents/payouts/route.ts
//
// GET  ?format=csv : esporta CSV di tutte le commissioni 'payable'
//                   (pronte per bonifico, clawback 30gg scaduto)
// POST : marca una lista di commission_ids come 'paid' con payout_reference
//
// Riservato admin.

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import type { AgentCommissionRow, AgentRow } from '@/types/database';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
  if (!auth.profile.is_admin) return NextResponse.json({ error: 'Non autorizzato.' }, { status: 403 });

  const url = new URL(request.url);
  const format = url.searchParams.get('format') || 'json';
  const status = url.searchParams.get('status') || 'payable';

  const admin = createAdminClient();

  const { data: commissionsRaw } = await admin
    .from('agent_commissions')
    .select('*')
    .eq('status', status)
    .order('customer_paid_at', { ascending: true });

  const commissions = (commissionsRaw as AgentCommissionRow[] | null) ?? [];

  if (commissions.length === 0) {
    if (format === 'csv') {
      return new NextResponse('Nessuna commissione disponibile.\n', {
        status: 200,
        headers: { 'Content-Type': 'text/csv; charset=utf-8' },
      });
    }
    return NextResponse.json({ commissions: [], agents: [], totals: { count: 0, amount_eur: 0 } });
  }

  // Fetch agents in batch
  const agentIds = Array.from(new Set(commissions.map((c) => c.agent_id)));
  const { data: agentsRaw } = await admin
    .from('agents')
    .select('*')
    .in('id', agentIds);

  const agents = (agentsRaw as AgentRow[] | null) ?? [];
  const agentsById = new Map(agents.map((a) => [a.id, a]));

  if (format === 'csv') {
    const rows: string[] = [];
    rows.push(
      [
        'commission_id',
        'agent_code',
        'agent_full_name',
        'agent_email',
        'agent_iban',
        'agent_vat_number',
        'customer_user_id',
        'plan_tier',
        'billing_interval',
        'amount_eur',
        'customer_paid_at',
        'consolidated_at',
        'stripe_invoice_id',
      ].join(';'),
    );
    for (const c of commissions) {
      const a = agentsById.get(c.agent_id);
      rows.push(
        [
          c.id,
          a?.code || '',
          csvEscape(a?.full_name || ''),
          a?.email || '',
          a?.iban || '',
          a?.vat_number || '',
          c.customer_user_id,
          c.plan_tier,
          c.billing_interval,
          c.amount_eur,
          c.customer_paid_at,
          c.consolidated_at,
          c.stripe_invoice_id,
        ].join(';'),
      );
    }
    const csv = rows.join('\n') + '\n';
    const filename = `overfy-payouts-${new Date().toISOString().slice(0, 10)}.csv`;
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  }

  const totalAmount = commissions.reduce((sum, c) => sum + Number(c.amount_eur), 0);

  return NextResponse.json({
    commissions,
    agents,
    totals: {
      count: commissions.length,
      amount_eur: totalAmount,
    },
  });
}

export async function POST(request: Request) {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
  if (!auth.profile.is_admin) return NextResponse.json({ error: 'Non autorizzato.' }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const ids = Array.isArray(body?.commission_ids) ? (body.commission_ids as string[]) : [];
  const payoutReference = typeof body?.payout_reference === 'string' ? body.payout_reference : null;
  const payoutNotes = typeof body?.payout_notes === 'string' ? body.payout_notes : null;

  if (ids.length === 0) {
    return NextResponse.json({ error: 'commission_ids richiesto.' }, { status: 400 });
  }
  if (!payoutReference) {
    return NextResponse.json({ error: 'payout_reference richiesto.' }, { status: 400 });
  }

  const admin = createAdminClient();

  const { error, data } = await admin
    .from('agent_commissions')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
      payout_reference: payoutReference,
      payout_notes: payoutNotes,
    })
    .in('id', ids)
    .eq('status', 'payable') // solo le 'payable' possono passare a 'paid'
    .select('id');

  if (error) {
    console.error('[api/admin/agents/payouts POST] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    updated: (data as { id: string }[] | null)?.length ?? 0,
  });
}

function csvEscape(value: string): string {
  if (value.includes(';') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
