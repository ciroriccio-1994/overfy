import { Suspense } from 'react';
import { ContattiForm } from './ContattiForm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parliamo del tuo progetto — Overfy',
};

export default function ContattiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link
              href="/"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition mb-6 inline-block"
            >
              ← Torna alla home
            </Link>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Parliamo
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">
                del tuo progetto.
              </em>
            </h1>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
              Compila il form o scrivici a{" "}
              <a
                href="mailto:info@overfydigital.com"
                className="text-[var(--color-ink)] underline decoration-[var(--color-mint)] decoration-2 underline-offset-4 hover:text-[var(--color-mint-ink)] transition"
              >
                info@overfydigital.com
              </a>
              . Rispondiamo entro 24 ore lavorative.
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
