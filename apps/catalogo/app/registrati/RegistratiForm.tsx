"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function RegistratiForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const interval = searchParams.get('interval');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('La password deve avere almeno 8 caratteri.');
      return;
    }
    if (!accepted) {
      setError('Devi accettare i termini per continuare.');
      return;
    }

    setLoading(true);
    const supabase = createClient();

    // Costruisco redirect URL per conferma email
    const siteUrl =
      typeof window !== 'undefined' ? window.location.origin : 'https://overfydigital.com';

    const nextParams = new URLSearchParams();
    if (plan) nextParams.set('plan', plan);
    if (interval) nextParams.set('interval', interval);
    const nextQs = nextParams.toString();
    const emailRedirectTo = `${siteUrl}/auth/callback${nextQs ? `?${nextQs}` : ''}`;

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { full_name: fullName.trim() || null },
        emailRedirectTo,
      },
    });

    setLoading(false);

    if (signUpError) {
      const msg = signUpError.message || 'Errore durante la registrazione.';
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('user already')) {
        setError('Hai già un account con questa email. Vai al login.');
      } else {
        setError(msg);
      }
      return;
    }

    const verifyQs = new URLSearchParams({ email });
    if (plan) verifyQs.set('plan', plan);
    if (interval) verifyQs.set('interval', interval);
    router.push(`/verifica-email?${verifyQs.toString()}`);
  }

  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10">
      {plan && (
        <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)' }}>
          Stai attivando il piano <strong>{plan.charAt(0).toUpperCase() + plan.slice(1)}</strong>
          {interval === 'year' ? ' (annuale)' : ' (mensile)'}. Dopo la conferma email procederai al pagamento.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Nome e cognome
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
            placeholder="Marco Rossi"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
            placeholder="marco@esempio.it"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Password *
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
            placeholder="Almeno 8 caratteri"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[var(--color-mint-ink)]"
          />
          <span className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
            Accetto i termini di servizio e l&apos;informativa privacy di Overfy.
          </span>
        </label>

        {error && (
          <div className="p-3 rounded-lg text-sm" style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition disabled:opacity-60"
        >
          {loading ? 'Creo account…' : 'Crea account →'}
        </button>

        <p className="text-center text-xs text-[var(--color-ink-soft)]">
          Hai già un account?{' '}
          <Link href="/login" className="text-[var(--color-ink)] underline">
            Accedi
          </Link>
        </p>
      </form>
    </div>
  );
}
