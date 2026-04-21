// apps/catalogo/app/api/admin/agents/route.ts
//
// GET  : lista tutti gli agent con statistiche aggregate
// POST : crea un nuovo agent (genera code + view_token, invia email onboarding)
//
// Riservato ad admin (is_admin=true).

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import { getResend, getFromEmail } from '@/lib/email/resend';
import { agentOnboardingEmailHtml } from '@/lib/email/templates';
import type { AgentRow, AgentCommissionRow } from '@/types/database';

export const runtime = 'nodejs';

export async function GET() {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
  if (!auth.profile.is_admin) return NextResponse.json({ error: 'Non autorizzato.' }, { status: 403 });

  const admin = createAdminClient();

  const [{ data: agentsData }, { data: commissionsData }] = await Promise.all([
    admin
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false }),
    admin
      .from('agent_commissions')
      .select('agent_id, status, amount_eur'),
  ]);

  const agents = (agentsData as AgentRow[] | null) ?? [];
  const commissions = (commissionsData as Pick<
    AgentCommissionRow,
    'agent_id' | 'status' | 'amount_eur'
  >[] | null) ?? [];

  // Aggrega per agent
  const statsByAgent = new Map<
    string,
    { pending: number; payable: number; paid: number; voided: number; total: number }
  >();
  for (const c of commissions) {
    const entry = statsByAgent.get(c.agent_id) || {
      pending: 0,
      payable: 0,
      paid: 0,
      voided: 0,
      total: 0,
    };
    const amount = Number(c.amount_eur);
    if (c.status === 'pending') entry.pending += amount;
    else if (c.status === 'payable') entry.payable += amount;
    else if (c.status === 'paid') entry.paid += amount;
    else if (c.status === 'voided') entry.voided += amount;
    entry.total += 1;
    statsByAgent.set(c.agent_id, entry);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';

  const rows = agents.map((a) => ({
    ...a,
    signup_link: `${siteUrl}/registrati?agent=${encodeURIComponent(a.code)}`,
    dashboard_link: `${siteUrl}/agent/view/${a.view_token}`,
    stats: statsByAgent.get(a.id) || {
      pending: 0,
      payable: 0,
      paid: 0,
      voided: 0,
      total: 0,
    },
  }));

  return NextResponse.json({ agents: rows });
}

export async function POST(request: Request) {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
  if (!auth.profile.is_admin) return NextResponse.json({ error: 'Non autorizzato.' }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const fullName = (body?.full_name as string | undefined)?.trim();
  const email = (body?.email as string | undefined)?.trim().toLowerCase();
  const phone = (body?.phone as string | undefined)?.trim() || null;
  const vatNumber = (body?.vat_number as string | undefined)?.trim() || null;
  const iban = (body?.iban as string | undefined)?.trim() || null;
  const notes = (body?.notes as string | undefined)?.trim() || null;
  const sendEmail = body?.send_email !== false; // default true

  if (!fullName || !email) {
    return NextResponse.json(
      { error: 'full_name e email sono obbligatori.' },
      { status: 400 },
    );
  }

  const admin = createAdminClient();

  // Genera codice
  const { data: codeData, error: codeError } = await admin.rpc('generate_agent_code', {
    p_full_name: fullName,
  });
  if (codeError || !codeData) {
    console.error('[api/admin/agents POST] codeError:', codeError);
    return NextResponse.json({ error: 'Errore nella generazione del codice.' }, { status: 500 });
  }
  const code = String(codeData);

  // Genera view_token (64 char hex)
  const viewToken = await generateHexToken(32);

  const { data: insertedRaw, error: insertError } = await admin
    .from('agents')
    .insert({
      code,
      view_token: viewToken,
      full_name: fullName,
      email,
      phone,
      vat_number: vatNumber,
      iban,
      notes,
      status: 'active',
    })
    .select()
    .single();

  if (insertError || !insertedRaw) {
    console.error('[api/admin/agents POST] insertError:', insertError);
    return NextResponse.json(
      { error: insertError?.message || 'Errore nella creazione agent.' },
      { status: 500 },
    );
  }

  const inserted = insertedRaw as AgentRow;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';
  const signupLink = `${siteUrl}/registrati?agent=${encodeURIComponent(code)}`;
  const dashboardLink = `${siteUrl}/agent/view/${viewToken}`;

  // Email onboarding (best-effort)
  if (sendEmail) {
    try {
      const resend = getResend();
      await resend.emails.send({
        from: getFromEmail(),
        to: email,
        subject: `Benvenuto nel programma Agent Overfy — il tuo codice ${code}`,
        html: agentOnboardingEmailHtml({
          agentFullName: fullName,
          agentCode: code,
          signupLink,
          dashboardLink,
        }),
      });
    } catch (err) {
      console.error('[api/admin/agents POST] email error:', err);
      // Non fallisce l'API: l'agent è stato creato, basta inviare manualmente il link.
    }
  }

  return NextResponse.json({
    agent: inserted,
    signup_link: signupLink,
    dashboard_link: dashboardLink,
  });
}

/**
 * Genera un token hex sicuro dal browser API-free (usa Web Crypto su Node).
 */
async function generateHexToken(byteLength: number): Promise<string> {
  const { randomBytes } = await import('crypto');
  return randomBytes(byteLength).toString('hex');
}
