"use client";

import { useCallback, useEffect, useState } from 'react';
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

  const callbackLeads = leads
    .filter((l) => l.request_callback === true && l.status === 'new')
    .sort((a, b) => {
      const urgencyA = TIME_URGENCY[a.preferred_time || 'today_2h'] ?? 0;
      const urgencyB = TIME_URGENCY[b.preferred_time || 'today_2h'] ?? 0;
      if (urgencyA !== urgencyB) return urgencyB - urgencyA;
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

      {/* CALLBACK URGENTI */}
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

      {/* AGENTS — nuova sezione (patch 2026-04-21) */}
      <AgentsSection />

      {/* REFERRALS — nuova sezione (patch 2026-04-21) */}
      <ReferralsSection />

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
/* AGENTS SECTION (patch 2026-04-21)                               */
/* =============================================================== */

interface AgentListRow {
  id: string;
  code: string;
  view_token: string;
  full_name: string;
  email: string;
  phone: string | null;
  vat_number: string | null;
  iban: string | null;
  notes: string | null;
  status: 'active' | 'suspended' | 'terminated';
  signup_link: string;
  dashboard_link: string;
  stats: {
    pending: number;
    payable: number;
    paid: number;
    voided: number;
    total: number;
  };
  created_at: string;
}

function AgentsSection() {
  const [agents, setAgents] = useState<AgentListRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Payable totale per CTA payout
  const [payoutTotal, setPayoutTotal] = useState<{ count: number; amount: number } | null>(null);

  const loadAgents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/agents');
      const data = await res.json();
      if (res.ok) {
        setAgents(data.agents || []);
      } else {
        setError(data?.error || 'Errore nel caricamento agent.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di rete.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPayable = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/agents/payouts?status=payable');
      const data = await res.json();
      if (res.ok && data?.totals) {
        setPayoutTotal({ count: data.totals.count, amount: Number(data.totals.amount_eur) });
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    loadAgents();
    loadPayable();
  }, [loadAgents, loadPayable]);

  async function handleExportCsv() {
    window.location.href = '/api/admin/agents/payouts?format=csv&status=payable';
  }

  return (
    <Section title="Programma Agent" count={agents.length}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed max-w-xl">
          Agent commerciali che portano clienti Overfy. Commissione variabile per piano e intervallo
          (configurata in <code className="font-mono text-[11px]">lib/commissions.ts</code>). Clawback
          automatico 30gg su refund.
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {payoutTotal && payoutTotal.count > 0 && (
            <button
              onClick={handleExportCsv}
              className="text-xs font-medium px-4 py-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition whitespace-nowrap"
            >
              ⬇ CSV bonifici ({payoutTotal.count} · €{payoutTotal.amount.toFixed(0)})
            </button>
          )}
          <button
            onClick={() => setShowForm((s) => !s)}
            className="text-xs font-medium px-4 py-2 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-mint-ink)] transition whitespace-nowrap"
          >
            {showForm ? '− Chiudi' : '+ Nuovo agent'}
          </button>
        </div>
      </div>

      {showForm && (
        <AgentCreateForm
          onCreated={() => {
            setShowForm(false);
            loadAgents();
          }}
        />
      )}

      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-xs"
          style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <EmptyRow text="Caricamento…" />
      ) : agents.length === 0 ? (
        <EmptyRow text="Nessun agent. Clicca “Nuovo agent” per aggiungerne uno." />
      ) : (
        <div className="overflow-x-auto -mx-6 md:mx-0">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-left text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-line)]">
                <Th>Agent</Th>
                <Th>Codice</Th>
                <Th>Maturazione</Th>
                <Th>Bonificabile</Th>
                <Th>Bonificato</Th>
                <Th>Link</Th>
                <Th>Stato</Th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <AgentRow key={a.id} agent={a} onChanged={loadAgents} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

function AgentRow({ agent, onChanged }: { agent: AgentListRow; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);

  async function changeStatus(newStatus: 'active' | 'suspended' | 'terminated') {
    if (newStatus === 'terminated' && !confirm(`Terminare ${agent.full_name}? Le commissioni già generate restano intatte.`)) {
      return;
    }
    setBusy(true);
    try {
      await fetch(`/api/admin/agents/${agent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // silent
    }
  }

  return (
    <tr className="border-b border-[var(--color-line)]">
      <Td>
        <div className="text-[var(--color-ink)]">{agent.full_name}</div>
        <div className="text-xs font-mono text-[var(--color-muted)]">{agent.email}</div>
        {agent.iban && (
          <div className="text-[10px] font-mono text-[var(--color-ink-soft)] mt-0.5">
            IBAN: {agent.iban.slice(0, 4)}…{agent.iban.slice(-4)}
          </div>
        )}
      </Td>
      <Td>
        <span className="text-xs font-mono font-semibold">{agent.code}</span>
      </Td>
      <Td>
        <span className="text-xs font-mono text-[var(--color-ink-soft)]">
          €{agent.stats.pending.toFixed(0)}
        </span>
      </Td>
      <Td>
        <span
          className="text-xs font-mono font-semibold"
          style={{ color: agent.stats.payable > 0 ? 'var(--color-mint-ink)' : 'var(--color-muted)' }}
        >
          €{agent.stats.payable.toFixed(0)}
        </span>
      </Td>
      <Td>
        <span className="text-xs font-mono text-[var(--color-sky-ink)]">
          €{agent.stats.paid.toFixed(0)}
        </span>
      </Td>
      <Td>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => copy(agent.signup_link)}
            className="text-[10px] font-mono px-2 py-1 rounded border border-[var(--color-line)] hover:bg-[var(--color-bg)] transition"
            title="Copia link signup"
          >
            ref
          </button>
          <a
            href={agent.dashboard_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono px-2 py-1 rounded border border-[var(--color-line)] hover:bg-[var(--color-bg)] transition"
            title="Apri dashboard agent"
          >
            dash ↗
          </a>
        </div>
      </Td>
      <Td>
        <select
          value={agent.status}
          onChange={(e) => changeStatus(e.target.value as 'active' | 'suspended' | 'terminated')}
          disabled={busy}
          className="text-xs font-mono px-2 py-1 rounded border border-[var(--color-line)] bg-[var(--color-bg)] focus:outline-none disabled:opacity-60"
        >
          <option value="active">active</option>
          <option value="suspended">suspended</option>
          <option value="terminated">terminated</option>
        </select>
      </Td>
    </tr>
  );
}

function AgentCreateForm({ onCreated }: { onCreated: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [iban, setIban] = useState('');
  const [notes, setNotes] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone: phone || null,
          vat_number: vatNumber || null,
          iban: iban || null,
          notes: notes || null,
          send_email: sendEmail,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || 'Errore nella creazione.');
      } else {
        onCreated();
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Errore di rete.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mb-5 p-5 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)]"
    >
      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <AdminField label="Nome e cognome *" value={fullName} onChange={setFullName} required />
        <AdminField label="Email *" value={email} onChange={setEmail} type="email" required />
        <AdminField label="Telefono" value={phone} onChange={setPhone} />
        <AdminField label="Partita IVA" value={vatNumber} onChange={setVatNumber} />
        <div className="md:col-span-2">
          <AdminField label="IBAN" value={iban} onChange={setIban} placeholder="IT60X0542811101000000123456" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Note interne
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] text-sm focus:outline-none focus:border-[var(--color-ink)]"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 mb-3 cursor-pointer">
        <input
          type="checkbox"
          checked={sendEmail}
          onChange={(e) => setSendEmail(e.target.checked)}
          className="h-4 w-4 accent-[var(--color-mint-ink)]"
        />
        <span className="text-xs text-[var(--color-ink-soft)]">
          Invia email onboarding (con codice + link dashboard)
        </span>
      </label>

      {err && (
        <div
          className="mb-3 p-2 rounded text-xs"
          style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}
        >
          {err}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="text-xs font-medium px-4 py-2 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-mint-ink)] transition disabled:opacity-60"
        >
          {submitting ? 'Creazione…' : 'Crea agent'}
        </button>
      </div>
    </form>
  );
}

function AdminField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 rounded border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] text-sm focus:outline-none focus:border-[var(--color-ink)]"
      />
    </div>
  );
}

/* =============================================================== */
/* REFERRALS SECTION (patch 2026-04-21)                            */
/* =============================================================== */

interface ReferralAdminRow {
  id: string;
  status: string;
  created_at: string;
  consolidated_at: string;
  applied_at: string | null;
  consumed_at: string | null;
  voided_at: string | null;
  voided_reason: string | null;
  referrer: { id: string; email: string; full_name: string | null } | null;
  referred: { id: string; email: string; full_name: string | null } | null;
}

interface ReferralAggregates {
  total: number;
  pending: number;
  consolidated: number;
  applied: number;
  consumed: number;
  voided: number;
}

function ReferralsSection() {
  const [credits, setCredits] = useState<ReferralAdminRow[]>([]);
  const [agg, setAgg] = useState<ReferralAggregates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch('/api/admin/referrals');
        const data = await res.json();
        if (!alive) return;
        if (res.ok) {
          setCredits(data.credits || []);
          setAgg(data.aggregates || null);
        }
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Section title="Referral Amico" count={credits.length}>
      {agg && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5">
          <MiniStat label="Pending" value={agg.pending} />
          <MiniStat label="Consolidated" value={agg.consolidated} accent="mint" />
          <MiniStat label="Applied" value={agg.applied} accent="sky" />
          <MiniStat label="Consumed" value={agg.consumed} />
          <MiniStat label="Voided" value={agg.voided} accent="coral" />
        </div>
      )}

      {loading ? (
        <EmptyRow text="Caricamento…" />
      ) : credits.length === 0 ? (
        <EmptyRow text="Nessun referral credit ancora." />
      ) : (
        <div className="overflow-x-auto -mx-6 md:mx-0">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="text-left text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-line)]">
                <Th>Referrer</Th>
                <Th>Referred</Th>
                <Th>Status</Th>
                <Th>Consolidato</Th>
                <Th>Applicato</Th>
                <Th>Note</Th>
              </tr>
            </thead>
            <tbody>
              {credits.map((c) => (
                <tr key={c.id} className="border-b border-[var(--color-line)]">
                  <Td>
                    <div className="text-[var(--color-ink)]">
                      {c.referrer?.full_name || c.referrer?.email || '—'}
                    </div>
                    <div className="text-xs font-mono text-[var(--color-muted)]">
                      {c.referrer?.email || '—'}
                    </div>
                  </Td>
                  <Td>
                    <div className="text-[var(--color-ink)]">
                      {c.referred?.full_name || c.referred?.email || '—'}
                    </div>
                    <div className="text-xs font-mono text-[var(--color-muted)]">
                      {c.referred?.email || '—'}
                    </div>
                  </Td>
                  <Td>
                    <ReferralStatusPill status={c.status} />
                  </Td>
                  <Td>
                    <span className="text-xs font-mono text-[var(--color-muted)] whitespace-nowrap">
                      {formatDate(c.consolidated_at)}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs font-mono text-[var(--color-muted)] whitespace-nowrap">
                      {c.applied_at ? formatDate(c.applied_at) : '—'}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[10px] font-mono text-[var(--color-ink-soft)]">
                      {c.voided_reason || '—'}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

function MiniStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: 'mint' | 'sky' | 'coral';
}) {
  const color =
    accent === 'mint'
      ? 'var(--color-mint-ink)'
      : accent === 'sky'
      ? 'var(--color-sky-ink)'
      : accent === 'coral'
      ? 'var(--color-coral-ink)'
      : 'var(--color-ink)';
  return (
    <div className="rounded-xl px-3 py-2 border border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </div>
      <div className="text-xl font-display leading-none mt-1" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function ReferralStatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: 'pending', bg: 'var(--color-bg-soft)', color: 'var(--color-muted)' },
    consolidated: { label: 'consolidated', bg: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)' },
    applied: { label: 'applied', bg: 'var(--color-sky-soft)', color: 'var(--color-sky-ink)' },
    consumed: { label: 'consumed', bg: 'var(--color-bg-soft)', color: 'var(--color-muted)' },
    voided: { label: 'voided', bg: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' },
  };
  const cfg = map[status] || { label: status, bg: 'var(--color-bg-soft)', color: 'var(--color-muted)' };
  return (
    <span
      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
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
