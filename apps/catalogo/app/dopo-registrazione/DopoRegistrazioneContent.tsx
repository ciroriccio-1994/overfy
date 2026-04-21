"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function DopoRegistrazioneContent() {
  const sp = useSearchParams();
  const plan = sp.get('plan');
  const interval = sp.get('interval');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (!plan || !interval) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: plan, interval }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setError(data?.error || 'Impossibile avviare il pagamento.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di rete.');
    } finally {
      setLoading(false);
    }
  }

  if (!plan || !interval) {
    return (
      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-10 text-center">
        <h1 className="font-display text-4xl md:text-5xl leading-[1] text-[var(--color-ink)] mb-4">
          Account attivato.
        </h1>
        <p className="text-[var(--color-ink-soft)] mb-8">
          Benvenuto in Overfy. Quando sei pronto, scegli un piano.
        </p>
        <Link
          href="/#pacchetti"
          className="inline-block bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
        >
          Scegli il tuo piano →
        </Link>
      </div>
    );
  }

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-10 text-center">
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6"
        style={{ background: 'var(--color-mint-soft)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="var(--color-mint-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="font-display text-4xl md:text-5xl leading-[1] text-[var(--color-ink)] mb-3">
        Ci siamo quasi.
      </h1>
      <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
        Il tuo account è attivo. Un ultimo passo: attivare il piano <strong>{planLabel}</strong> {interval === 'year' ? 'annuale' : 'mensile'}.
      </p>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition disabled:opacity-60 mb-3"
      >
        {loading ? 'Preparazione…' : `Attiva ${planLabel} →`}
      </button>

      {error && (
        <div
          className="p-3 rounded-lg text-sm mb-3"
          style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}
        >
          {error}
        </div>
      )}

      <Link
        href="/dashboard"
        className="text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
      >
        Preferisco decidere dopo →
      </Link>
    </div>
  );
}
