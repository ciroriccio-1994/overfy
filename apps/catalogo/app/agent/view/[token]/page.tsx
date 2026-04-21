// apps/catalogo/app/agent/view/[token]/page.tsx
//
// Dashboard Agent via magic link (accesso senza login).
//
// L'agent riceve un link /agent/view/{view_token} dopo l'onboarding.
// Il token è generato a 32 byte casuali (64 char hex) → unguessable.
// Chiunque possieda il link vede le statistiche. Non c'è autenticazione
// perché non è necessaria: il token stesso è il segreto.
//
// Contenuti:
//   - Codice agent + link signup da condividere
//   - Contatore clienti acquisiti
//   - Commissioni pending / payable / paid / voided
//   - Dettaglio ultime transazioni

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import type { AgentRow, AgentCommissionRow, ProfileRow } from '@/types/database';

export const metadata: Metadata = {
  title: 'Dashboard Agent — Overfy',
  description: 'Area riservata agent Overfy.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageParams {
  params: Promise<{ token: string }>;
}

export default async function AgentViewPage({ params }: PageParams) {
  const { token } = await params;

  if (!token || token.length < 32) {
    notFound();
  }

  const admin = createAdminClient();

  const { data: agentRaw } = await admin
    .from('agents')
    .select('*')
    .eq('view_token', token)
    .maybeSingle();

  const agent = agentRaw as AgentRow | null;
  if (!agent) notFound();

  // Fetch commissioni dell'agent
  const { data: commissionsRaw } = await admin
    .from('agent_commissions')
    .select('*')
    .eq('agent_id', agent.id)
    .order('customer_paid_at', { ascending: false })
    .limit(50);

  const commissions = (commissionsRaw as AgentCommissionRow[] | null) ?? [];

  // Clienti acquisiti (count distinti)
  const uniqueCustomers = new Set(commissions.map((c) => c.customer_user_id)).size;

  // Aggregati
  const sumByStatus = (status: string) =>
    commissions
      .filter((c) => c.status === status)
      .reduce((sum, c) => sum + Number(c.amount_eur), 0);

  const totals = {
    pending: sumByStatus('pending'),
    payable: sumByStatus('payable'),
    paid: sumByStatus('paid'),
    voided: sumByStatus('voided'),
  };

  // Resolve customer names (best-effort, potrebbero essere stati cancellati)
  const customerIds = Array.from(new Set(commissions.map((c) => c.customer_user_id)));
  const { data: profilesRaw } =
    customerIds.length > 0
      ? await admin
          .from('profiles')
          .select('id, full_name, company_name')
          .in('id', customerIds)
      : { data: [] };

  const profiles =
    (profilesRaw as Pick<ProfileRow, 'id' | 'full_name' | 'company_name'>[] | null) ?? [];
  const profilesById = new Map(profiles.map((p) => [p.id, p]));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';
  const signupLink = `${siteUrl}/registrati?agent=${encodeURIComponent(agent.code)}`;

  const isTerminated = agent.status === 'terminated';
  const isSuspended = agent.status === 'suspended';

  return (
    <main className="min-h-screen px-6 py-12 md:py-16 bg-[var(--color-bg-soft)]">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
            Dashboard Agent · Overfy
          </div>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.0] text-[var(--color-ink)] tracking-tight">
            Ciao, {agent.full_name.split(' ')[0]}.
          </h1>
          <p className="text-[var(--color-ink-soft)] mt-3 text-sm">
            Codice personale: <span className="font-mono font-semibold">{agent.code}</span>
          </p>
        </div>

        {isTerminated && (
          <div
            className="mb-6 p-4 rounded-xl border"
            style={{ background: 'var(--color-coral-soft)', borderColor: 'var(--color-coral-ink)' }}
          >
            <div className="text-sm text-[var(--color-coral-ink)]">
              Il tuo account agent è <strong>terminato</strong>. Le commissioni già consolidate verranno pagate secondo accordi. Per chiarimenti: info@overfydigital.com.
            </div>
          </div>
        )}
        {isSuspended && (
          <div
            className="mb-6 p-4 rounded-xl border"
            style={{ background: 'var(--color-coral-soft)', borderColor: 'var(--color-coral-ink)' }}
          >
            <div className="text-sm text-[var(--color-coral-ink)]">
              Account temporaneamente <strong>sospeso</strong>. Contatta info@overfydigital.com per maggiori dettagli.
            </div>
          </div>
        )}

        {/* LINK DA CONDIVIDERE */}
        <section className="mb-5 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-8">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
            Link da condividere con i clienti
          </div>
          <div className="bg-[var(--color-bg)] border border-[var(--color-line)] rounded-xl p-4 break-all text-sm text-[var(--color-ink)] font-mono">
            {signupLink}
          </div>
          <p className="text-xs text-[var(--color-ink-soft)] mt-3 leading-relaxed">
            Quando un cliente si iscrive da questo link e completa il primo pagamento, generi una commissione. Clawback di 30 giorni: passati i 30gg senza rimborsi, la commissione diventa bonificabile.
          </p>
        </section>

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <Kpi label="Clienti acquisiti" value={uniqueCustomers.toString()} />
          <Kpi label="In maturazione" value={fmtEur(totals.pending)} accent="ink" />
          <Kpi label="Bonificabili" value={fmtEur(totals.payable)} accent="mint" />
          <Kpi label="Bonificate" value={fmtEur(totals.paid)} accent="sky" />
        </div>

        {/* TABELLA COMMISSIONI */}
        <section className="mb-5 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-8">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
            Ultime commissioni ({commissions.length})
          </div>
          {commissions.length === 0 ? (
            <p className="text-sm text-[var(--color-ink-soft)]">
              Nessuna commissione ancora. Condividi il tuo link per acquisire clienti.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="text-left text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-line)]">
                    <th className="py-3 px-2">Cliente</th>
                    <th className="py-3 px-2">Piano</th>
                    <th className="py-3 px-2">Importo</th>
                    <th className="py-3 px-2">Data pagamento</th>
                    <th className="py-3 px-2">Stato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)]">
                  {commissions.map((c) => {
                    const customer = profilesById.get(c.customer_user_id);
                    const name =
                      customer?.company_name || customer?.full_name || c.customer_user_id.slice(0, 8);
                    return (
                      <tr key={c.id}>
                        <td className="py-3 px-2">
                          <div className="text-sm text-[var(--color-ink)]">{name}</div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-xs text-[var(--color-ink-soft)]">
                            {capitalize(c.plan_tier)} · {intervalIt(c.billing_interval)}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-sm font-medium text-[var(--color-ink)]">
                            {fmtEur(Number(c.amount_eur))}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-xs font-mono text-[var(--color-muted)]">
                            {new Date(c.customer_paid_at).toLocaleDateString('it-IT', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <CommissionStatusPill status={c.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-xs font-mono text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] underline"
          >
            ← overfydigital.com
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */

function Kpi({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: 'ink' | 'mint' | 'sky';
}) {
  const bg =
    accent === 'mint'
      ? 'var(--color-mint-soft)'
      : accent === 'sky'
      ? 'var(--color-sky-soft)'
      : 'var(--color-paper)';
  const color =
    accent === 'mint'
      ? 'var(--color-mint-ink)'
      : accent === 'sky'
      ? 'var(--color-sky-ink)'
      : 'var(--color-ink)';
  return (
    <div
      className="rounded-2xl p-4 md:p-5 border border-[var(--color-line)]"
      style={{ background: bg }}
    >
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
        {label}
      </div>
      <div className="font-display text-2xl md:text-3xl leading-none" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function CommissionStatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    pending: {
      label: 'In maturazione',
      bg: 'var(--color-bg-soft)',
      color: 'var(--color-muted)',
    },
    payable: {
      label: 'Bonificabile',
      bg: 'var(--color-mint-soft)',
      color: 'var(--color-mint-ink)',
    },
    paid: {
      label: 'Pagata',
      bg: 'var(--color-sky-soft)',
      color: 'var(--color-sky-ink)',
    },
    voided: {
      label: 'Annullata (refund)',
      bg: 'var(--color-coral-soft)',
      color: 'var(--color-coral-ink)',
    },
  };
  const cfg = map[status] || { label: status, bg: 'var(--color-bg-soft)', color: 'var(--color-muted)' };
  return (
    <span
      className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full inline-block"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

function fmtEur(n: number): string {
  return n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function intervalIt(i: string): string {
  if (i === 'month') return 'mensile';
  if (i === 'quarter') return 'trimestrale';
  if (i === 'year') return 'annuale';
  return i;
}
