import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pagamento completato — Overfy',
};

export default function DopoPagamentoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-lg mx-auto">
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-10 text-center">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-6"
              style={{ background: 'var(--color-mint-soft)' }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="var(--color-mint-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="font-display text-5xl md:text-6xl leading-[1] text-[var(--color-ink)] tracking-tight mb-4">
              <em className="font-display-italic text-[var(--color-mint-ink)]">Ci siamo.</em>
            </h1>
            <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
              Pagamento ricevuto. Ti abbiamo mandato un&apos;email di benvenuto. Nei prossimi giorni ti contatteremo per raccogliere contenuti e materiali.
              <br />
              <br />
              <strong className="text-[var(--color-ink)]">Il tuo business sarà online in 48 ore.</strong>
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
              >
                Vai alla dashboard →
              </Link>
              <Link
                href="/"
                className="text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
              >
                Torna alla home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
