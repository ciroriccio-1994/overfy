import { Suspense } from 'react';
import { RegistratiForm } from './RegistratiForm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrati — Overfy',
  description: 'Crea il tuo account Overfy e attiva il piano che preferisci.',
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

export default function RegistratiPage() {
  return (
    <>
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: HEADING_ANIM_CSS }} />
      <main className="min-h-screen pt-32 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-md mx-auto">
          <div className="mb-10 text-center">
            <h1
              className="overfy-heading-item font-display text-5xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-4"
              style={{ animationDelay: '0ms' }}
            >
              Crea il tuo
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">account.</em>
            </h1>
            <p
              className="overfy-heading-item text-[var(--color-ink-soft)] leading-relaxed"
              style={{ animationDelay: '80ms' }}
            >
              Richiesta 30 secondi. Nessuna carta per registrarti.
            </p>
          </div>

          <Suspense fallback={<div className="text-center text-sm text-[var(--color-muted)]">Caricamento…</div>}>
            <RegistratiForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
