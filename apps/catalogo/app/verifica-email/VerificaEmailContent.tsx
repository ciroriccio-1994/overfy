"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function VerificaEmailContent() {
  const sp = useSearchParams();
  const email = sp.get('email') || 'la tua casella';

  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-10 md:p-12 text-center">
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6"
        style={{ background: 'var(--color-mint-soft)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"
            stroke="var(--color-mint-ink)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="font-display text-4xl md:text-5xl leading-[1] text-[var(--color-ink)] mb-4">
        Controlla la tua email.
      </h1>
      <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
        Ti abbiamo mandato un link di conferma a <strong className="text-[var(--color-ink)]">{email}</strong>.
        Cliccalo per attivare il tuo account.
      </p>

      <div className="bg-[var(--color-bg-soft)] border border-[var(--color-line)] rounded-xl p-5 text-sm text-[var(--color-ink-soft)] text-left mb-6">
        <p className="mb-2"><strong>Non vedi l&apos;email?</strong></p>
        <ul className="space-y-1.5 list-disc list-inside text-xs">
          <li>Controlla la cartella spam / promozioni</li>
          <li>Aspetta 1-2 minuti (a volte arriva in ritardo)</li>
          <li>Verifica di aver scritto bene l&apos;email</li>
        </ul>
      </div>

      <Link
        href="/login"
        className="text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
      >
        Hai già confermato? Accedi →
      </Link>
    </div>
  );
}
