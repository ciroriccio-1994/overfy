import { Suspense } from 'react';
import { LoginForm } from './LoginForm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accedi — Overfy',
  description: 'Accedi al tuo account Overfy.',
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-md mx-auto">
          <div className="mb-10 text-center">
            <h1 className="font-display text-5xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-4">
              Bentornato.
            </h1>
            <p className="text-[var(--color-ink-soft)] leading-relaxed">
              Accedi al tuo account.
            </p>
          </div>
          <Suspense fallback={<div className="text-center text-sm text-[var(--color-muted)]">Caricamento…</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
