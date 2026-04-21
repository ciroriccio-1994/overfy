"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { LeadStatus } from '@/types/database';
import type {
  AdminKPI,
  AdminUserRow,
  AdminSubRow,
  ExtendedLeadRow,
} from './page';

interface Props {
  kpi: AdminKPI;
  users: AdminUserRow[];
  subs: AdminSubRow[];
  leads: ExtendedLeadRow[];
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

const PREFERRED_TIME_LABELS: Record<string, string> = {
  today_2h: 'Oggi entro 2h',
  tomorrow_am: 'Domani mattina',
  tomorrow_pm: 'Domani pomeriggio',
  within_3_days: 'Entro 3 giorni',
};

// Priorità per ordinamento callback (più urgente → più alto)
const TIME_URGENCY: Record<string, number> = {
  today_2h: 4,
  tomorrow_am: 3,
  tomorrow_pm: 2,
  within_3_days: 1,
};

export function AdminClient({ kpi, users, subs, leads: initialLeads }: Props) {
  const [leads, setLeads] = useState<ExtendedLeadRow[]>(initialLeads);
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

  // Callback aperti: request_callback=true e status='new'
  const callbackLeads = leads
    .filter((l) => l.request_callback === true && l.status === 'new')
    .sort((a, b) => {
      const urgencyA = TIME_URGENCY[a.preferred_time || 'today_2h'] ?? 0;
      const urgencyB = TIME_URGENCY[b.preferred_time || 'today_2h'] ?? 0;
      if (urgencyA !== urgencyB) return urgencyB - urgencyA; // urgenza desc
      // Stessa urgenza → più recente prima
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        <KpiCard label="Utenti totali" value={kpi.totalUsers.toString()} accent="ink" />
        <KpiCard label="Abbonamenti attivi" value={kpi.activeSubs.toString()} accent="mint" />
        <KpiCard label="MRR" value={mrrEur} accent="sky" />
        <KpiCard label="Lead aperti" value={kpi.openLeads.toString()} accent="ink" />
        <KpiCard
          label="Callback aperte"
          value={kpi.openCallbacks.toString()}
          accent="coral"
          pulse={kpi.openCallbacks > 0}
        />
      </div>

      {globalErr && (
        <div
          className="mb-6 p-3 rounded-lg text-sm"
          style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}
        >
          {globalErr}
        </div>
      )}

      {/* CALLBACK URGENTI — visibile solo se ce ne sono */}
      {callbackLeads.length > 0 && (
        <>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes overfy-urgent-pulse {
                  0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
                  50% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); }
                }
                .overfy-urgent-dot {
                  animation: overfy-urgent-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
              `,
            }}
          />
          <section
            className="mb-8 rounded-2xl p-6 border-2"
            style={{
              borderColor: '#dc2626',
              background:
                'linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, var(--color-paper) 60%)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block w-2 h-2 rounded-full overfy-urgent-dot" style={{ background: '#dc2626' }}></span>
              <div className="text-sm font-semibold" style={{ color: '#dc2626' }}>
                🔥 Callback richieste — da chiamare
              </div>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: '#dc2626', color: '#ffffff' }}
              >
                {callbackLeads.length}
              </span>
            </div>
            <div className="space-y-3">
              {callbackLeads.map((lead) => (
                <CallbackCard
                  key={lead.id}
                  lead={lead}
                  updating={updating === lead.id}
                  onMarkContacted={() => changeLeadStatus(lead.id, 'contacted')}
                />
              ))}
            </div>
          </section>
        </>
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
                        <span className="text-xs font-mono">{u.plan_tier}</span>
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

      {/* LEAD */}
      <Section title="Lead" count={leads.length}>
        {leads.length === 0 ? (
          <EmptyRow text="Nessun lead ancora." />
        ) : (
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <table className="w-full text-sm min-w-[820px]">
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[var(--color-ink)]">{l.full_name || '—'}</span>
                        {l.request_callback && (
                          <span
                            className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded whitespace-nowrap"
                            style={{ background: '#dc2626', color: '#ffffff' }}
                            title={l.preferred_time ? PREFERRED_TIME_LABELS[l.preferred_time] || '' : ''}
                          >
                            🔥 Call
                          </span>
                        )}
                      </div>
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
                          {l.request_callback ? (
                            <a
                              href={`tel:${l.phone.replace(/\s/g, '')}`}
                              className="hover:text-[var(--color-ink)] underline"
                            >
                              {l.phone}
                            </a>
                          ) : (
                            l.phone
                          )}
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
                      {l.request_callback && l.preferred_time && (
                        <div className="text-[10px] font-mono mt-0.5" style={{ color: '#dc2626' }}>
                          ⏰ {PREFERRED_TIME_LABELS[l.preferred_time] || l.preferred_time}
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
/* CALLBACK CARD                                                   */
/* =============================================================== */

function CallbackCard({
  lead,
  updating,
  onMarkContacted,
}: {
  lead: ExtendedLeadRow;
  updating: boolean;
  onMarkContacted: () => void;
}) {
  const timeLabel = lead.preferred_time
    ? PREFERRED_TIME_LABELS[lead.preferred_time] || lead.preferred_time
    : 'Subito';

  const isTopUrgent = lead.preferred_time === 'today_2h';

  return (
    <div
      className="bg-[var(--color-paper)] border rounded-xl p-4 flex items-start gap-4 flex-col sm:flex-row"
      style={{
        borderColor: isTopUrgent ? '#dc2626' : 'var(--color-line)',
        borderWidth: isTopUrgent ? '2px' : '1px',
      }}
    >
      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-medium text-[var(--color-ink)]">
            {lead.full_name || lead.email}
          </span>
          <span
            className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{ background: '#dc2626', color: '#ffffff' }}
          >
            ⏰ {timeLabel}
          </span>
          {lead.company_name && (
            <span className="text-xs text-[var(--color-ink-soft)]">
              · {lead.company_name}
            </span>
          )}
        </div>
        <div className="text-xs font-mono text-[var(--color-ink-soft)]">
          <a
            href={`mailto:${lead.email}`}
            className="hover:text-[var(--color-ink)] underline"
          >
            {lead.email}
          </a>
          {lead.phone && (
            <>
              {' · '}
              <a
                href={`tel:${lead.phone.replace(/\s/g, '')}`}
                className="hover:text-[var(--color-ink)] underline"
              >
                {lead.phone}
              </a>
            </>
          )}
        </div>
        {lead.message && (
          <div
            className="mt-2 text-xs text-[var(--color-ink-soft)] leading-relaxed italic"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            &ldquo;{lead.message}&rdquo;
          </div>
        )}
        <div className="text-[10px] font-mono text-[var(--color-muted)] mt-2">
          ricevuto {timeAgo(lead.created_at)}
        </div>
      </div>

      <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
        {lead.phone && (
          <a
            href={`tel:${lead.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition hover:opacity-90 flex-1 sm:flex-initial"
            style={{ background: '#dc2626', color: '#ffffff' }}
          >
            📞 Chiama
          </a>
        )}
        <button
          type="button"
          onClick={onMarkContacted}
          disabled={updating}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition disabled:opacity-60 whitespace-nowrap flex-1 sm:flex-initial"
        >
          {updating ? '...' : '✓ Contattato'}
        </button>
      </div>
    </div>
  );
}

/* =============================================================== */
/* PRIMITIVES                                                      */
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
  pulse = false,
}: {
  label: string;
  value: string;
  accent: 'ink' | 'mint' | 'sky' | 'coral';
  pulse?: boolean;
}) {
  const accentMap = {
    ink: 'var(--color-ink)',
    mint: 'var(--color-mint-ink)',
    sky: 'var(--color-sky-ink)',
    coral: '#dc2626',
  };
  return (
    <div
      className="bg-[var(--color-paper)] border rounded-2xl p-5"
      style={{
        borderColor: pulse ? '#dc2626' : 'var(--color-line)',
        borderWidth: pulse ? '2px' : '1px',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
          {label}
        </div>
        {pulse && (
          <span
            className="inline-block w-1.5 h-1.5 rounded-full overfy-urgent-dot"
            style={{ background: '#dc2626' }}
          ></span>
        )}
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

function timeAgo(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) return 'ora';
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'ora';
  if (diffMin < 60) return `${diffMin} min fa`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h fa`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}g fa`;
}
