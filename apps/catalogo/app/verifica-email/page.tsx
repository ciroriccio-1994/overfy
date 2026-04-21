import { Suspense } from 'react';
import { VerificaEmailContent } from './VerificaEmailContent';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conferma la tua email — Overfy',
};

export default function VerificaEmailPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-lg mx-auto">
          <Suspense fallback={<div className="text-center text-sm text-[var(--color-muted)]">Caricamento…</div>}>
            <VerificaEmailContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
