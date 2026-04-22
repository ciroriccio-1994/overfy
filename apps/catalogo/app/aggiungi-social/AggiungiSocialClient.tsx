"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SOCIAL_ADDONS, type SocialAddonTier } from '@/lib/plans';
import type { SocialAddonRow } from '@/types/database';

interface Props {
  currentAddon: SocialAddonRow | null;
}

export function AggiungiSocialClient({ currentAddon }: Props) {
  const router = useRouter();
  const [loadingTier, setLoadingTier] = useState<SocialAddonTier | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleActivate(tier: SocialAddonTier) {
    setError(null);
    setLoadingTier(tier);
    try {
      const res = await fetch('/api/stripe/social-addon/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data?.success) {
        router.refresh();
        // Scroll top per vedere lo stato aggiornato
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setError(data?.error || 'Errore durante l\'attivazione.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di rete.');
    } finally {
      setLoadingTier(null);
    }
  }

  async function handleCancel() {
    if (!confirm(
      'Sei sicuro di voler disattivare il piano social? Resterà attivo fino a fine mese, poi non verrà più rinnovato.',
    )) return;

    setError(null);
    setCancelLoading(true);
    try {
      const res = await fetch('/api/stripe/social-addon/cancel', {
        method: 'POST',
      });
      const data = await res.json();
      if (data?.success) {
        router.refresh();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setError(data?.error || 'Errore durante la disattivazione.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di rete.');
    } finally {
      setCancelLoading(false);
    }
  }

  return (
    <>
      {/* HERO */}
      <div className="mb-10">
        <Link
          href="/dashboard"
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition mb-6 inline-block"
        >
          ← Torna alla dashboard
        </Link>
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
          Servizio extra
        </div>
        <h1 className="font-display text-5xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-4">
          Gestione social.
          <br />
          <em className="font-display-italic text-[var(--color-mint-ink)]">
            Senza pensieri.
          </em>
        </h1>
        <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
          Aggiungi la gestione professionale dei tuoi canali social al tuo abbonamento Overfy. Contenuti, piano editoriale, community e, con il piano Pro, reel e gestione ADS.
        </p>
      </div>

      {/* STATO CORRENTE */}
      {currentAddon && (
        <CurrentAddonCard
          addon={currentAddon}
          onCancel={handleCancel}
          cancelLoading={cancelLoading}
        />
      )}

      {error && (
        <div
          className="mb-6 p-4 rounded-xl text-sm"
          style={{
            background: 'var(--color-coral-soft)',
            color: 'var(--color-coral-ink)',
          }}
        >
          {error}
        </div>
      )}

      {/* CARDS PIANI */}
      {!currentAddon && (
        <>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <PlanCard
              tier="basic"
              loading={loadingTier === 'basic'}
              onActivate={() => handleActivate('basic')}
              disabled={loadingTier !== null}
            />
            <PlanCard
              tier="pro"
              loading={loadingTier === 'pro'}
              onActivate={() => handleActivate('pro')}
              disabled={loadingTier !== null}
              highlight
            />
          </div>

          <div
            className="text-xs text-[var(--color-muted)] leading-relaxed p-5 rounded-xl"
            style={{ background: 'var(--color-bg)' }}
          >
            <strong className="text-[var(--color-ink)]">Note importanti.</strong> I costi di gestione non includono il budget pubblicitario per le inserzioni (ADS), che resta a carico del cliente. I materiali video/foto grezzi sono a carico del cliente, salvo accordi differenti. L&apos;add-on viene fatturato insieme al tuo abbonamento Overfy (stessa invoice) e fatturato proporzionalmente dal giorno di attivazione. Puoi disattivarlo in qualsiasi momento — resta attivo fino a fine periodo.
          </div>
        </>
      )}
    </>
  );
}

/* =============================================================== */

function CurrentAddonCard({
  addon,
  onCancel,
  cancelLoading,
}: {
  addon: SocialAddonRow;
  onCancel: () => void;
  cancelLoading: boolean;
}) {
  const cfg = SOCIAL_ADDONS[addon.tier];
  const isPendingCancel = addon.status === 'pending_cancellation';

  return (
    <section className="mb-10 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-8">
      <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
        Il tuo add-on social
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-display text-4xl leading-none text-[var(--color-ink)]">
              {cfg.name}
            </h2>
            <span
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full"
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
          <div className="text-sm text-[var(--color-ink-soft)] mb-3">
            €{cfg.amountEur.toFixed(2).replace('.', ',')} / mese
          </div>
          {isPendingCancel ? (
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed max-w-lg">
              Il tuo piano social resta attivo fino a fine periodo. Al prossimo rinnovo dell&apos;abbonamento Overfy, l&apos;add-on non verrà più fatturato.
            </p>
          ) : (
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed max-w-lg">
              Fatturato insieme al tuo abbonamento Overfy. Per modifiche o domande operative sulla gestione social, scrivi a{' '}
              <a
                href="mailto:info@overfydigital.com"
                className="text-[var(--color-ink)] underline"
              >
                info@overfydigital.com
              </a>
              .
            </p>
          )}
        </div>

        {!isPendingCancel && (
          <button
            onClick={onCancel}
            disabled={cancelLoading}
            className="px-5 py-2.5 rounded-full text-xs font-medium border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition disabled:opacity-60 self-start md:self-auto whitespace-nowrap"
          >
            {cancelLoading ? 'Attendi…' : 'Disattiva add-on'}
          </button>
        )}
      </div>
    </section>
  );
}

function PlanCard({
  tier,
  loading,
  onActivate,
  disabled,
  highlight,
}: {
  tier: SocialAddonTier;
  loading: boolean;
  onActivate: () => void;
  disabled: boolean;
  highlight?: boolean;
}) {
  const cfg = SOCIAL_ADDONS[tier];
  const accent = tier === 'basic' ? 'var(--color-sky)' : 'var(--color-mint)';
  const accentSoft =
    tier === 'basic' ? 'var(--color-sky-soft)' : 'var(--color-mint-soft)';
  const accentInk =
    tier === 'basic' ? 'var(--color-sky-ink)' : 'var(--color-mint-ink)';

  return (
    <div
      className="relative rounded-2xl p-6 md:p-8 flex flex-col border-2 transition bg-[var(--color-paper)]"
      style={{
        borderColor: highlight ? accent : 'var(--color-line)',
        boxShadow: highlight ? '0 20px 40px -15px rgba(0,0,0,0.12)' : 'none',
      }}
    >
      {highlight && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full whitespace-nowrap"
          style={{ background: accent, color: 'white' }}
        >
          Consigliato
        </div>
      )}

      <div className="mb-5">
        <div
          className="text-xs font-mono uppercase tracking-[0.25em] mb-3"
          style={{ color: accentInk }}
        >
          — {cfg.name} —
        </div>

        <div className="flex items-baseline gap-1.5 mb-3">
          <span
            className="font-display text-5xl md:text-6xl leading-none"
            style={{ color: accentInk }}
          >
            €{cfg.amountEur.toFixed(0)}
          </span>
          <span className="text-[var(--color-muted)] text-xs">/mese</span>
        </div>

        <p className="italic text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {cfg.tagline}
        </p>
      </div>

      <ul className="space-y-2.5 mb-6 flex-1 text-sm">
        {cfg.features.map((f, i) => {
          const isHeader = f.endsWith(':');
          return (
            <li
              key={i}
              className={`flex gap-2 leading-relaxed ${
                isHeader
                  ? 'font-semibold pt-2 pb-1'
                  : 'text-[var(--color-ink-soft)]'
              }`}
              style={isHeader ? { color: accentInk } : {}}
            >
              {!isHeader && (
                <span
                  className="mt-0.5 flex-shrink-0 text-base leading-none"
                  style={{ color: accent }}
                >
                  ✓
                </span>
              )}
              <span>{f}</span>
            </li>
          );
        })}
      </ul>

      <button
        onClick={onActivate}
        disabled={disabled}
        className="block text-center py-3 rounded-full text-sm font-medium transition disabled:opacity-60"
        style={{
          background: highlight ? 'var(--color-ink)' : accent,
          color: 'white',
        }}
      >
        {loading ? 'Attivazione…' : `Attiva ${cfg.name} →`}
      </button>
    </div>
  );
}
