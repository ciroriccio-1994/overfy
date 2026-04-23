"use client";

import Link from 'next/link';
import { useState } from 'react';
import { SOCIAL_ADDONS, type SocialAddonTier, type PaidPlanTier } from '@/lib/plans';
import type { BillingInterval } from '@/types/database';

interface Props {
  tier: PaidPlanTier;
  interval: BillingInterval;
  planName: string;
  planPriceEur: number;
}

const INTERVAL_LABEL: Record<BillingInterval, string> = {
  month: 'al mese',
  quarter: 'ogni 3 mesi',
  year: "all'anno",
};

const INTERVAL_SHORT: Record<BillingInterval, string> = {
  month: '/mese',
  quarter: '/trim',
  year: '/anno',
};

export function CheckoutStepClient({
  tier,
  interval,
  planName,
  planPriceEur,
}: Props) {
  const [selectedSocial, setSelectedSocial] =
    useState<SocialAddonTier | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalFirstPayment =
    planPriceEur +
    (selectedSocial ? SOCIAL_ADDONS[selectedSocial].amountEur : 0);

  async function handleProceed() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          interval,
          social_tier: selectedSocial,
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      if (data?.redirectTo) {
        window.location.href = data.redirectTo;
        return;
      }
      setError(data?.error || 'Impossibile avviare il pagamento.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di rete.');
    } finally {
      setLoading(false);
    }
  }

  const fmt = (n: number) =>
    n.toFixed(2).replace('.', ',').replace(/,00$/, '');

  return (
    <>
      {/* HEADER */}
      <div className="mb-10">
        <Link
          href="/#pacchetti"
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition mb-6 inline-block"
        >
          ← Cambia piano
        </Link>
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
          Checkout — Step 1 di 2
        </div>
        <h1 className="font-display text-4xl md:text-6xl leading-[1] text-[var(--color-ink)] tracking-tight mb-4">
          Hai scelto <em className="font-display-italic text-[var(--color-mint-ink)]">{planName}</em>.
        </h1>
        <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
          Prima di andare al pagamento, vuoi aggiungere anche la gestione dei tuoi canali social?
          È un servizio opzionale, disattivabile in qualsiasi momento.
        </p>
      </div>

      {/* CARDS SOCIAL */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {/* Opzione NO */}
        <button
          type="button"
          onClick={() => setSelectedSocial(null)}
          className="text-left rounded-2xl p-6 bg-[var(--color-paper)] border-2 transition"
          style={{
            borderColor:
              selectedSocial === null
                ? 'var(--color-ink)'
                : 'var(--color-line)',
            boxShadow:
              selectedSocial === null
                ? '0 10px 30px -12px rgba(0,0,0,0.15)'
                : 'none',
          }}
        >
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
            — Solo piano base —
          </div>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="font-display text-4xl leading-none text-[var(--color-ink)]">
              €0
            </span>
            <span className="text-[var(--color-muted)] text-xs">aggiuntivi</span>
          </div>
          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Solo <strong className="text-[var(--color-ink)]">{planName}</strong>. Potrai aggiungere la gestione social in un secondo momento dalla dashboard.
          </p>
        </button>

        {/* Opzione Basic */}
        <SocialCard
          selected={selectedSocial === 'basic'}
          onClick={() => setSelectedSocial('basic')}
          tier="basic"
        />

        {/* Opzione Pro */}
        <SocialCard
          selected={selectedSocial === 'pro'}
          onClick={() => setSelectedSocial('pro')}
          tier="pro"
          highlight
        />
      </div>

      {/* RIEPILOGO + CTA */}
      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-8">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
          Riepilogo ordine
        </div>

        <div className="space-y-3 mb-5">
          <Row
            label={`${planName} — fatturazione ${INTERVAL_LABEL[interval]}`}
            value={`€${fmt(planPriceEur)}${INTERVAL_SHORT[interval]}`}
          />
          {selectedSocial && (
            <Row
              label={`+ ${SOCIAL_ADDONS[selectedSocial].name} (mensile)`}
              value={`€${fmt(SOCIAL_ADDONS[selectedSocial].amountEur)}/mese`}
              accent
            />
          )}
        </div>

        <div className="pt-4 border-t border-[var(--color-line)] mb-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-[var(--color-ink)]">
              Primo pagamento
            </span>
            <span className="font-display text-3xl text-[var(--color-ink)]">
              €{fmt(totalFirstPayment)}
            </span>
          </div>
          {selectedSocial && interval !== 'month' && (
            <p className="text-xs text-[var(--color-muted)] mt-2 leading-relaxed">
              Il piano base e l&apos;add-on social hanno cicli di fatturazione diversi
              ({INTERVAL_LABEL[interval]} vs mensile). Verranno fatturati insieme alla
              prima invoice proporzionali e poi separatamente al rinnovo.
            </p>
          )}
        </div>

        {error && (
          <div
            className="mb-4 p-3 rounded-lg text-sm"
            style={{
              background: 'var(--color-coral-soft)',
              color: 'var(--color-coral-ink)',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleProceed}
          disabled={loading}
          className="block w-full text-center py-4 rounded-full text-sm font-medium transition disabled:opacity-60 shadow-lg hover:shadow-xl"
          style={{
            background: 'var(--color-ink)',
            color: 'white',
          }}
        >
          {loading ? 'Apro il pagamento…' : 'Vai al pagamento sicuro →'}
        </button>

        <p className="text-center text-xs text-[var(--color-muted)] mt-3">
          Pagamento processato da Stripe · Carta di credito, bonifico, Apple Pay
        </p>
      </div>

      <p className="text-xs text-[var(--color-muted)] text-center mt-6 max-w-2xl mx-auto leading-relaxed">
        Cambiando idea dopo il pagamento puoi attivare o rimuovere l&apos;add-on social in qualsiasi momento dalla tua dashboard. L&apos;abbonamento base prosegue normalmente.
      </p>
    </>
  );
}

/* ============================================================== */

function SocialCard({
  selected,
  onClick,
  tier,
  highlight,
}: {
  selected: boolean;
  onClick: () => void;
  tier: SocialAddonTier;
  highlight?: boolean;
}) {
  const cfg = SOCIAL_ADDONS[tier];
  const accent = tier === 'basic' ? 'var(--color-sky)' : 'var(--color-mint)';
  const accentInk =
    tier === 'basic' ? 'var(--color-sky-ink)' : 'var(--color-mint-ink)';

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left rounded-2xl p-6 bg-[var(--color-paper)] border-2 transition relative"
      style={{
        borderColor: selected ? 'var(--color-ink)' : 'var(--color-line)',
        boxShadow: selected ? '0 10px 30px -12px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      {highlight && (
        <div
          className="absolute -top-3 right-4 text-[10px] font-mono uppercase tracking-[0.15em] px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ background: accent, color: 'white' }}
        >
          Consigliato
        </div>
      )}
      <div
        className="text-xs font-mono uppercase tracking-[0.2em] mb-4"
        style={{ color: accentInk }}
      >
        — {cfg.name} —
      </div>
      <div className="flex items-baseline gap-1.5 mb-3">
        <span
          className="font-display text-4xl leading-none"
          style={{ color: accentInk }}
        >
          +€{cfg.amountEur.toFixed(0)}
        </span>
        <span className="text-[var(--color-muted)] text-xs">/mese</span>
      </div>
      <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-3">
        {cfg.tagline}
      </p>
      <ul className="text-xs text-[var(--color-ink-soft)] space-y-1.5">
        {cfg.features
          .filter((f) => !f.endsWith(':'))
          .slice(0, 3)
          .map((f, i) => (
            <li key={i} className="flex gap-1.5 leading-snug">
              <span style={{ color: accent }}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        {cfg.features.filter((f) => !f.endsWith(':')).length > 3 && (
          <li className="text-[var(--color-muted)] italic">
            +{cfg.features.filter((f) => !f.endsWith(':')).length - 3} altri benefici
          </li>
        )}
      </ul>
    </button>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span
        className="text-sm leading-snug"
        style={{
          color: accent ? 'var(--color-mint-ink)' : 'var(--color-ink-soft)',
          fontWeight: accent ? 500 : 400,
        }}
      >
        {label}
      </span>
      <span
        className="text-sm font-medium whitespace-nowrap"
        style={{ color: 'var(--color-ink)' }}
      >
        {value}
      </span>
    </div>
  );
}
