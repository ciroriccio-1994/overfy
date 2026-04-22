"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { SubscriptionRow, SocialAddonRow } from '@/types/database';
import type { ProfileRowWithAdmin } from '@/lib/auth-helpers';
import type { InvoiceLite, PlanInfo } from './page';

interface Props {
  profile: ProfileRowWithAdmin;
  subscription: SubscriptionRow | null;
  planInfo: PlanInfo | null;
  invoices: InvoiceLite[];
  authEmail: string;
  socialAddon: SocialAddonRow | null;
}

export function DashboardClient({ profile, subscription, planInfo, invoices, authEmail, socialAddon }: Props) {
  const router = useRouter();
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  async function openPortal() {
    setPortalError(null);
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setPortalError(data?.error || 'Impossibile aprire il portale.');
    } catch (err) {
      setPortalError(err instanceof Error ? err.message : 'Errore di rete.');
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  const greetingName =
    (profile.full_name && profile.full_name.split(' ')[0]) || 'ciao';

  return (
    <>
      {/* HERO */}
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
          Dashboard
        </div>
        <h1 className="font-display text-5xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight">
          Ciao, {greetingName}.
        </h1>
        <p className="text-[var(--color-ink-soft)] mt-3">{authEmail}</p>

        {profile.is_admin && (
          <div className="mt-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[var(--color-mint-ink)] transition"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)]"></span>
              Area Admin →
            </Link>
          </div>
        )}
      </div>

      {/* SEZIONE 1 — IL TUO PIANO */}
      <SectionCard label="Il tuo piano">
        {subscription && planInfo ? (
          <PlanBlock
            sub={subscription}
            plan={planInfo}
            onPortal={openPortal}
            portalLoading={portalLoading}
            portalError={portalError}
          />
        ) : (
          <NoPlanBlock />
        )}
      </SectionCard>

      {/* SEZIONE 1-bis — SERVIZI EXTRA (solo se ha sub attiva) */}
      {subscription && ['active', 'trialing'].includes(subscription.status) && (
        <SectionCard label="Servizi extra">
          <SocialAddonBlock addon={socialAddon} />
        </SectionCard>
      )}

      {/* SEZIONE 2 — ULTIME FATTURE */}
      <SectionCard label="Ultime fatture">
        {invoices.length === 0 ? (
          <p className="text-sm text-[var(--color-ink-soft)]">
            Nessuna fattura ancora. Le fatture appariranno qui dopo il primo pagamento.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-line)]">
            {invoices.map((inv) => (
              <InvoiceRow key={inv.id} inv={inv} />
            ))}
          </ul>
        )}
      </SectionCard>

      {/* SEZIONE 3 — PROFILO */}
      <SectionCard label="Profilo">
        <ProfileForm profile={profile} />
      </SectionCard>

      {/* SEZIONE 4 — INVITA UN AMICO (patch 2026-04-21) */}
      <SectionCard label="Invita un amico">
        <ReferralBlock hasSub={!!subscription && subscription.status === 'active'} />
      </SectionCard>

      {/* SEZIONE 5 — SUPPORTO + LOGOUT */}
      <SectionCard label="Supporto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Domande, modifiche, richieste? Scrivi a{' '}
              <a
                href="mailto:info@overfydigital.com"
                className="text-[var(--color-ink)] underline"
              >
                info@overfydigital.com
              </a>{' '}
              — rispondiamo entro 24 ore.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-full text-xs font-medium border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition self-start md:self-auto"
          >
            Esci
          </button>
        </div>
      </SectionCard>
    </>
  );
}

/* =============================================================== */
/* SUB-COMPONENTS                                                  */
/* =============================================================== */

function SectionCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-8">
      <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
        {label}
      </div>
      {children}
    </section>
  );
}

function PlanBlock({
  sub,
  plan,
  onPortal,
  portalLoading,
  portalError,
}: {
  sub: SubscriptionRow;
  plan: PlanInfo;
  onPortal: () => void;
  portalLoading: boolean;
  portalError: string | null;
}) {
  const intervalLabel = plan.interval === 'year' ? '/ anno' : '/ mese';
  const nextRenewal = sub.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-display text-4xl leading-none text-[var(--color-ink)]">
              {plan.name}
            </h2>
            <StatusBadge status={sub.status} cancelAtPeriodEnd={sub.cancel_at_period_end} />
          </div>
          {plan.amountEur !== null && (
            <div className="text-sm text-[var(--color-ink-soft)] mb-4">
              €{plan.amountEur.toFixed(2).replace('.', ',')} {intervalLabel}
            </div>
          )}
          <div className="text-xs font-mono text-[var(--color-muted)]">
            {sub.cancel_at_period_end ? 'Si chiude il' : 'Prossimo rinnovo'}: {nextRenewal}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <button
            onClick={onPortal}
            disabled={portalLoading}
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 rounded-full text-xs font-medium hover:bg-[var(--color-mint-ink)] transition disabled:opacity-60 whitespace-nowrap"
          >
            {portalLoading ? 'Apertura…' : 'Gestisci abbonamento →'}
          </button>
          {portalError && (
            <div
              className="text-xs p-2 rounded max-w-xs"
              style={{
                background: 'var(--color-coral-soft)',
                color: 'var(--color-coral-ink)',
              }}
            >
              {portalError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NoPlanBlock() {
  return (
    <div className="text-center py-6">
      <p className="text-[var(--color-ink-soft)] mb-5">
        Non hai ancora un abbonamento attivo.
      </p>
      <Link
        href="/#pacchetti"
        className="inline-block bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 rounded-full text-xs font-medium hover:bg-[var(--color-mint-ink)] transition"
      >
        Scegli un piano →
      </Link>
    </div>
  );
}

function SocialAddonBlock({ addon }: { addon: SocialAddonRow | null }) {
  if (!addon) {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-display text-2xl leading-tight text-[var(--color-ink)]">
              Gestione social
            </h3>
            <span
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: 'var(--color-bg)', color: 'var(--color-muted)' }}
            >
              Non attivo
            </span>
          </div>
          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed max-w-lg">
            Aggiungi la gestione professionale dei tuoi canali social al tuo abbonamento. Da €100/mese — basic o pro.
          </p>
        </div>
        <Link
          href="/aggiungi-social"
          className="bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 rounded-full text-xs font-medium hover:bg-[var(--color-mint-ink)] transition self-start md:self-auto whitespace-nowrap"
        >
          Scopri di più →
        </Link>
      </div>
    );
  }

  const tierName = addon.tier === 'pro' ? 'Social Pro' : 'Social Basic';
  const isPendingCancel = addon.status === 'pending_cancellation';

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-display text-2xl leading-tight text-[var(--color-ink)]">
            {tierName}
          </h3>
          <span
            className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: isPendingCancel
                ? 'var(--color-coral-soft)'
                : 'var(--color-mint-soft)',
              color: isPendingCancel
                ? 'var(--color-coral-ink)'
                : 'var(--color-mint-ink)',
            }}
          >
            {isPendingCancel ? 'In disattivazione' : 'Attivo'}
          </span>
        </div>
        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
          €{addon.amount_eur.toFixed(2).replace('.', ',')} / mese · fatturato insieme al tuo abbonamento
        </p>
      </div>
      <Link
        href="/aggiungi-social"
        className="px-5 py-2.5 rounded-full text-xs font-medium border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition self-start md:self-auto whitespace-nowrap"
      >
        Gestisci →
      </Link>
    </div>
  );
}

function StatusBadge({
  status,
  cancelAtPeriodEnd,
}: {
  status: string;
  cancelAtPeriodEnd: boolean;
}) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    active: {
      label: cancelAtPeriodEnd ? 'In chiusura' : 'Attivo',
      bg: cancelAtPeriodEnd ? 'var(--color-coral-soft)' : 'var(--color-mint-soft)',
      color: cancelAtPeriodEnd ? 'var(--color-coral-ink)' : 'var(--color-mint-ink)',
    },
    trialing: {
      label: 'In prova',
      bg: 'var(--color-sky-soft)',
      color: 'var(--color-sky-ink)',
    },
    past_due: {
      label: 'Pagamento in sospeso',
      bg: 'var(--color-coral-soft)',
      color: 'var(--color-coral-ink)',
    },
    canceled: {
      label: 'Cancellato',
      bg: 'var(--color-bg-soft)',
      color: 'var(--color-muted)',
    },
    incomplete: {
      label: 'Da completare',
      bg: 'var(--color-coral-soft)',
      color: 'var(--color-coral-ink)',
    },
  };
  const cfg = map[status] || {
    label: status,
    bg: 'var(--color-bg-soft)',
    color: 'var(--color-muted)',
  };
  return (
    <span
      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

function InvoiceRow({ inv }: { inv: InvoiceLite }) {
  const date = new Date(inv.created * 1000).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const amount = (inv.amount_paid / 100).toLocaleString('it-IT', {
    style: 'currency',
    currency: inv.currency.toUpperCase(),
  });
  return (
    <li className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div className="flex items-center gap-4">
        <div>
          <div className="text-sm font-medium text-[var(--color-ink)]">
            {inv.number || inv.id.slice(-10)}
          </div>
          <div className="text-xs font-mono text-[var(--color-muted)]">{date}</div>
        </div>
        <InvoiceStatusPill status={inv.status} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-[var(--color-ink)]">{amount}</span>
        {inv.invoice_pdf && (
          <a
            href={inv.invoice_pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] underline"
          >
            PDF ↗
          </a>
        )}
      </div>
    </li>
  );
}

function InvoiceStatusPill({ status }: { status: string | null }) {
  if (!status) return null;
  const map: Record<string, { label: string; bg: string; color: string }> = {
    paid: {
      label: 'Pagata',
      bg: 'var(--color-mint-soft)',
      color: 'var(--color-mint-ink)',
    },
    open: {
      label: 'Aperta',
      bg: 'var(--color-sky-soft)',
      color: 'var(--color-sky-ink)',
    },
    void: { label: 'Annullata', bg: 'var(--color-bg-soft)', color: 'var(--color-muted)' },
    uncollectible: {
      label: 'Non riscuotibile',
      bg: 'var(--color-coral-soft)',
      color: 'var(--color-coral-ink)',
    },
    draft: { label: 'Bozza', bg: 'var(--color-bg-soft)', color: 'var(--color-muted)' },
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
/* REFERRAL BLOCK                                                  */
/* =============================================================== */

interface ReferralData {
  code: string;
  signupLink: string;
  stats: {
    pending: number;
    consolidated: number;
    applied: number;
    consumed: number;
    voided: number;
    total: number;
  };
  cap: number;
  capReached: boolean;
  nextUnlock: { date: string; status: 'pending' | 'consolidated' } | null;
}

function ReferralBlock({ hasSub }: { hasSub: boolean }) {
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch('/api/dashboard/referral');
        const json = await res.json();
        if (!alive) return;
        if (!res.ok) {
          setError(json?.error || 'Errore nel caricamento.');
        } else {
          setData(json);
        }
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : 'Errore di rete.');
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  async function copyToClipboard(value: string, kind: 'code' | 'link') {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // fallback silenzioso
    }
  }

  if (loading) {
    return (
      <div className="text-sm text-[var(--color-ink-soft)]">Caricamento…</div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-sm" style={{ color: 'var(--color-coral-ink)' }}>
        {error || 'Dati non disponibili.'}
      </div>
    );
  }

  const openCount = data.stats.pending + data.stats.consolidated + data.stats.applied;

  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
        Invita amici imprenditori. Quando il loro primo pagamento è confermato (30 giorni
        senza rimborsi), ottieni <strong className="text-[var(--color-ink)]">-50% sul tuo
        prossimo rinnovo</strong>. Nessun limite di durata, nessuna scadenza.
      </p>

      {/* CODICE + LINK */}
      <div className="grid md:grid-cols-2 gap-3">
        <div
          className="rounded-xl p-4 border border-[var(--color-line)] bg-[var(--color-bg)]"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Il tuo codice
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-base font-semibold text-[var(--color-ink)] tracking-wide">
              {data.code}
            </div>
            <button
              onClick={() => copyToClipboard(data.code, 'code')}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--color-line)] hover:bg-[var(--color-paper)] transition text-[var(--color-ink)]"
            >
              {copied === 'code' ? '✓ Copiato' : 'Copia'}
            </button>
          </div>
        </div>

        <div
          className="rounded-xl p-4 border border-[var(--color-line)] bg-[var(--color-bg)]"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Link diretto da inviare
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-[var(--color-ink)] truncate" title={data.signupLink}>
              {data.signupLink.replace(/^https?:\/\//, '')}
            </div>
            <button
              onClick={() => copyToClipboard(data.signupLink, 'link')}
              className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-mint-ink)] transition"
            >
              {copied === 'link' ? '✓ Copiato' : 'Copia link'}
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3">
        <StatTile label="In arrivo" value={data.stats.pending} tooltip="Amici che hanno pagato. Sblocco tra max 30 giorni." />
        <StatTile
          label="Pronti"
          value={data.stats.consolidated + data.stats.applied}
          accent="mint"
          tooltip="Sconti confermati. Applicati al prossimo rinnovo."
        />
        <StatTile label="Usati" value={data.stats.consumed} tooltip="Sconti già scalati dalla tua fattura." />
      </div>

      {/* NEXT UNLOCK */}
      {data.nextUnlock && data.nextUnlock.status === 'pending' && (
        <div
          className="rounded-xl p-4 border"
          style={{ background: 'var(--color-sky-soft)', borderColor: 'var(--color-sky-ink)' }}
        >
          <div className="text-xs text-[var(--color-sky-ink)] leading-relaxed">
            Prossimo sblocco il{' '}
            <strong>
              {new Date(data.nextUnlock.date).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </strong>
            .
          </div>
        </div>
      )}

      {/* CAP INDICATOR */}
      {data.capReached && (
        <div
          className="rounded-xl p-4 border"
          style={{ background: 'var(--color-coral-soft)', borderColor: 'var(--color-coral-ink)' }}
        >
          <div className="text-xs text-[var(--color-coral-ink)] leading-relaxed">
            Hai raggiunto il limite di {data.cap} sconti in coda. Ti stiamo applicando
            gli sconti ai rinnovi — quando ne avrai consumati alcuni, potrai invitare altri amici.
          </div>
        </div>
      )}

      {/* WARNING se non ha sub */}
      {!hasSub && (
        <div
          className="rounded-xl p-4 border"
          style={{ background: 'var(--color-bg-soft)', borderColor: 'var(--color-line)' }}
        >
          <div className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
            Nota: gli sconti si applicano sui rinnovi. Servirà un abbonamento attivo per
            usare gli sconti accumulati.
          </div>
        </div>
      )}

      <div className="text-xs text-[var(--color-muted)] leading-relaxed">
        {openCount}/{data.cap} sconti in coda · Credito di {data.stats.consumed}
        {' '}sconto{data.stats.consumed === 1 ? '' : 'i'} già usato{data.stats.consumed === 1 ? '' : 'i'}.
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  accent,
  tooltip,
}: {
  label: string;
  value: number;
  accent?: 'mint' | 'sky';
  tooltip?: string;
}) {
  const bg =
    accent === 'mint'
      ? 'var(--color-mint-soft)'
      : accent === 'sky'
      ? 'var(--color-sky-soft)'
      : 'var(--color-bg)';
  const color =
    accent === 'mint'
      ? 'var(--color-mint-ink)'
      : accent === 'sky'
      ? 'var(--color-sky-ink)'
      : 'var(--color-ink)';
  return (
    <div
      className="rounded-xl p-4 border border-[var(--color-line)]"
      style={{ background: bg }}
      title={tooltip}
    >
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
        {label}
      </div>
      <div className="font-display text-3xl leading-none" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

/* -- Profile form -- */

function ProfileForm({ profile }: { profile: ProfileRowWithAdmin }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(profile.full_name ?? '');
  const [companyName, setCompanyName] = useState(profile.company_name ?? '');
  const [phone, setPhone] = useState(profile.phone ?? '');
  const [vatNumber, setVatNumber] = useState(profile.vat_number ?? '');
  const [fiscalCode, setFiscalCode] = useState(profile.fiscal_code ?? '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch('/api/dashboard/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim() || null,
          company_name: companyName.trim() || null,
          phone: phone.trim() || null,
          vat_number: vatNumber.trim() || null,
          fiscal_code: fiscalCode.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg({ type: 'err', text: data?.error || 'Errore durante il salvataggio.' });
      } else {
        setMsg({ type: 'ok', text: 'Profilo aggiornato.' });
        router.refresh();
      }
    } catch (err) {
      setMsg({
        type: 'err',
        text: err instanceof Error ? err.message : 'Errore di rete.',
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-4">
      <Field label="Nome e cognome" value={fullName} onChange={setFullName} placeholder="Marco Rossi" />
      <Field label="Azienda" value={companyName} onChange={setCompanyName} placeholder="Rossi SRL" />
      <Field label="Telefono" value={phone} onChange={setPhone} placeholder="+39 333 1234567" />
      <Field label="Partita IVA" value={vatNumber} onChange={setVatNumber} placeholder="IT01234567890" />
      <div className="md:col-span-2">
        <Field
          label="Codice Fiscale"
          value={fiscalCode}
          onChange={setFiscalCode}
          placeholder="RSSMRC80A01H501Z"
        />
      </div>

      <div className="md:col-span-2 flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 rounded-full text-xs font-medium hover:bg-[var(--color-mint-ink)] transition disabled:opacity-60"
        >
          {saving ? 'Salvataggio…' : 'Salva modifiche'}
        </button>
        {msg && (
          <span
            className="text-xs px-3 py-1.5 rounded-full"
            style={{
              background: msg.type === 'ok' ? 'var(--color-mint-soft)' : 'var(--color-coral-soft)',
              color: msg.type === 'ok' ? 'var(--color-mint-ink)' : 'var(--color-coral-ink)',
            }}
          >
            {msg.text}
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition text-sm"
      />
    </div>
  );
}
