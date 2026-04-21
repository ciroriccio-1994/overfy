import { Suspense } from 'react';
import { RegistratiForm } from './RegistratiForm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrati — Overfy',
  description: 'Crea il tuo account Overfy e attiva il piano che preferisci.',
};

export default function RegistratiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-md mx-auto">
          <div className="mb-10 text-center">
            <h1 className="font-display text-5xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-4">
              Crea il tuo
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">account.</em>
            </h1>
            <p className="text-[var(--color-ink-soft)] leading-relaxed">
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
