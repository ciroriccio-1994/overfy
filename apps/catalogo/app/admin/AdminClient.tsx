"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { LeadRow, LeadStatus } from '@/types/database';
import type { AdminKPI, AdminUserRow, AdminSubRow } from './page';

interface Props {
  kpi: AdminKPI;
  users: AdminUserRow[];
  subs: AdminSubRow[];
  leads: LeadRow[];
}

const LEAD_STATUSES: LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'converted',
  'lost',
];

const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Nuovo',
  contacted: 'Contattato',
  qualified: 'Qualificato',
  converted: 'Convertito',
  lost: 'Perso',
};

export function AdminClient({ kpi, users, subs, leads: initialLeads }: Props) {
  const [leads, setLeads] = useState<LeadRow[]>(initialLeads);
  const [updating, setUpdating] = useState<string | null>(null);
  const [globalErr, setGlobalErr] = useState<string | null>(null);

  async function changeLeadStatus(leadId: string, newStatus: LeadStatus) {
    setUpdating(leadId);
    setGlobalErr(null);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setGlobalErr(data?.error || 'Errore durante l\'aggiornamento del lead.');
        return;
      }
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)),
      );
    } catch (err) {
      setGlobalErr(err instanceof Error ? err.message : 'Errore di rete.');
    } finally {
      setUpdating(null);
    }
  }

  const mrrEur = (kpi.mrrCents / 100).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <>
      {/* HEADER */}
      <div className="mb-10 flex items-start justify-between gap-4 flex-col md:flex-row">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
            Admin
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight">
            Overfy control room.
          </h1>
        </div>
        <Link
          href="/dashboard"
          className="text-xs font-mono text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] underline whitespace-nowrap"
        >
          ← Dashboard utente
        </Link>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <KpiCard label="Utenti totali" value={kpi.totalUsers.toString()} accent="ink" />
        <KpiCard label="Abbonamenti attivi" value={kpi.activeSubs.toString()} accent="mint" />
        <KpiCard label="MRR" value={mrrEur} accent="sky" />
        <KpiCard label="Lead aperti" value={kpi.openLeads.toString()} accent="coral" />
      </div>

      {globalErr && (
        <div
          className="mb-6 p-3 rounded-lg text-sm"
          style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}
        >
          {globalErr}
        </div>
      )}

      {/* UTENTI RECENTI */}
      <Section title="Utenti recenti" count={users.length}>
        {users.length === 0 ? (
          <EmptyRow text="Nessun utente registrato." />
        ) : (
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-line)]">
                  <Th>Utente</Th>
                  <Th>Azienda</Th>
                  <Th>Piano</Th>
                  <Th>Stato</Th>
                  <Th>Registrato</Th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-[var(--color-line)]">
                    <Td>
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--color-ink)]">
                          {u.full_name || '—'}
                        </span>
                        {u.is_admin && (
                          <span
                            className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                            style={{
                              background: 'var(--color-ink)',
                              color: 'var(--color-paper)',
                            }}
                          >
                            Admin
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-[var(--color-muted)]">
                        {u.email}
                      </div>
                    </Td>
                    <Td>{u.company_name || '—'}</Td>
                    <Td>
                      {u.plan_tier ? (
                        <span className="text-xs font-mono">
                          {u.plan_tier}
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--color-muted)]">—</span>
                      )}
                    </Td>
                    <Td>
                      {u.status ? <StatusPill status={u.status} /> : <span className="text-xs text-[var(--color-muted)]">—</span>}
                    </Td>
                    <Td>
                      <span className="text-xs font-mono text-[var(--color-muted)]">
                        {formatDate(u.created_at)}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* LEAD SU MISURA */}
      <Section title="Lead" count={leads.length}>
        {leads.length === 0 ? (
          <EmptyRow text="Nessun lead ancora." />
        ) : (
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="text-left text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-line)]">
                  <Th>Contatto</Th>
                  <Th>Azienda</Th>
                  <Th>Messaggio</Th>
                  <Th>Fonte</Th>
                  <Th>Stato</Th>
                  <Th>Data</Th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-[var(--color-line)]">
                    <Td>
                      <div className="text-[var(--color-ink)]">{l.full_name || '—'}</div>
                      <div className="text-xs font-mono">
                        <a
                          href={`mailto:${l.email}`}
                          className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] underline"
                        >
                          {l.email}
                        </a>
                      </div>
                      {l.phone && (
                        <div className="text-xs font-mono text-[var(--color-muted)]">
                          {l.phone}
                        </div>
                      )}
                    </Td>
                    <Td>{l.company_name || '—'}</Td>
                    <Td>
                      {l.message ? (
                        <details className="max-w-xs">
                          <summary className="cursor-pointer text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                            Mostra
                          </summary>
                          <div className="mt-2 text-xs text-[var(--color-ink-soft)] whitespace-pre-wrap leading-relaxed">
                            {l.message}
                          </div>
                        </details>
                      ) : (
                        <span className="text-xs text-[var(--color-muted)]">—</span>
                      )}
                    </Td>
                    <Td>
                      <span className="text-xs font-mono text-[var(--color-muted)]">
                        {l.source || '—'}
                      </span>
                      {l.interest_tier && (
                        <div className="text-[10px] font-mono text-[var(--color-ink-soft)] mt-0.5">
                          → {l.interest_tier}
                        </div>
                      )}
                    </Td>
                    <Td>
                      <select
                        value={l.status}
                        onChange={(e) => changeLeadStatus(l.id, e.target.value as LeadStatus)}
                        disabled={updating === l.id}
                        className="text-xs font-mono px-2 py-1 rounded border border-[var(--color-line)] bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-ink)] disabled:opacity-60"
                      >
                        {LEAD_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {LEAD_STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </Td>
                    <Td>
                      <span className="text-xs font-mono text-[var(--color-muted)] whitespace-nowrap">
                        {formatDate(l.created_at)}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* SUBS ATTIVE */}
      <Section title="Abbonamenti attivi" count={subs.length}>
        {subs.length === 0 ? (
          <EmptyRow text="Nessun abbonamento attivo." />
        ) : (
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-line)]">
                  <Th>Cliente</Th>
                  <Th>Piano</Th>
                  <Th>Cadenza</Th>
                  <Th>Stato</Th>
                  <Th>Prossimo rinnovo</Th>
                </tr>
              </thead>
              <tbody>
                {subs.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--color-line)]">
                    <Td>
                      <div className="text-[var(--color-ink)]">
                        {s.full_name || s.email || s.user_id.slice(0, 8)}
                      </div>
                      {s.email && (
                        <div className="text-xs font-mono text-[var(--color-muted)]">
                          {s.email}
                        </div>
                      )}
                    </Td>
                    <Td>
                      <span className="text-xs font-mono">{s.plan_tier}</span>
                    </Td>
                    <Td>
                      <span className="text-xs font-mono text-[var(--color-ink-soft)]">
                        {s.billing_interval === 'year' ? 'annuale' : 'mensile'}
                      </span>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1.5">
                        <StatusPill status={s.status} />
                        {s.cancel_at_period_end && (
                          <span
                            className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                            style={{
                              background: 'var(--color-coral-soft)',
                              color: 'var(--color-coral-ink)',
                            }}
                          >
                            Cancel
                          </span>
                        )}
                      </div>
                    </Td>
                    <Td>
                      <span className="text-xs font-mono text-[var(--color-muted)] whitespace-nowrap">
                        {s.current_period_end ? formatDate(s.current_period_end) : '—'}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </>
  );
}

/* =============================================================== */

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
          {title}
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-bg-soft)] text-[var(--color-ink-soft)]">
          {count}
        </span>
      </div>
      {children}
    </section>
  );
}

function KpiCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: 'ink' | 'mint' | 'sky' | 'coral';
}) {
  const accentMap = {
    ink: 'var(--color-ink)',
    mint: 'var(--color-mint-ink)',
    sky: 'var(--color-sky-ink)',
    coral: 'var(--color-coral-ink)',
  };
  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-5">
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
        {label}
      </div>
      <div
        className="font-display text-4xl leading-none tracking-tight"
        style={{ color: accentMap[accent] }}
      >
        {value}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="py-3 px-3 font-normal whitespace-nowrap">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="py-3 px-3 align-top">{children}</td>;
}
function EmptyRow({ text }: { text: string }) {
  return <p className="text-sm text-[var(--color-ink-soft)] py-2">{text}</p>;
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    active: { bg: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)', label: 'Attivo' },
    trialing: { bg: 'var(--color-sky-soft)', color: 'var(--color-sky-ink)', label: 'Trial' },
    past_due: { bg: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)', label: 'Insoluto' },
    canceled: { bg: 'var(--color-bg-soft)', color: 'var(--color-muted)', label: 'Cancellato' },
    incomplete: { bg: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)', label: 'Incompleto' },
    unpaid: { bg: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)', label: 'Non pagato' },
    paused: { bg: 'var(--color-bg-soft)', color: 'var(--color-muted)', label: 'In pausa' },
  };
  const cfg = map[status] || { bg: 'var(--color-bg-soft)', color: 'var(--color-muted)', label: status };
  return (
    <span
      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
