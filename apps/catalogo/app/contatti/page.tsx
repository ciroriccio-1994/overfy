import { Suspense } from 'react';
import { ContattiForm } from './ContattiForm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parliamo del tuo progetto — Overfy',
};

const HEADING_ANIM_CSS = `
@keyframes overfy-heading-in {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
.overfy-heading-item {
  opacity: 0;
  animation: overfy-heading-in 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  will-change: opacity, transform;
}
@media (prefers-reduced-motion: reduce) {
  .overfy-heading-item { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

export default function ContattiPage() {
  return (
    <>
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: HEADING_ANIM_CSS }} />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link
              href="/"
              className="overfy-heading-item text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition mb-6 inline-block"
              style={{ animationDelay: '0ms' }}
            >
              ← Torna alla home
            </Link>
            <h1
              className="overfy-heading-item font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6"
              style={{ animationDelay: '60ms' }}
            >
              Parliamo
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">
                del tuo progetto.
              </em>
            </h1>
            <p
              className="overfy-heading-item text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl"
              style={{ animationDelay: '140ms' }}
            >
              Compila il form o scrivici a{" "}
              <a
                href="mailto:info@overfydigital.com"
                className="text-[var(--color-ink)] underline decoration-[var(--color-mint)] decoration-2 underline-offset-4 hover:text-[var(--color-mint-ink)] transition"
              >
                info@overfydigital.com
              </a>
              . Rispondiamo entro 24 ore lavorative, oppure ti chiamiamo direttamente se preferisci.
            </p>
          </div>

          <Suspense fallback={<div className="text-center text-sm text-[var(--color-muted)]">Caricamento…</div>}>
            <ContattiForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
