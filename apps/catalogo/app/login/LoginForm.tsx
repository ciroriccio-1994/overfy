"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';
  const plan = searchParams.get('plan');
  const interval = searchParams.get('interval');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (loginError) {
      setError(
        loginError.message.toLowerCase().includes('invalid')
          ? 'Email o password non corretti.'
          : loginError.message,
      );
      return;
    }

    // Se l'utente arriva con ?plan=xxx&interval=yyy, avviamo il checkout subito
    if (plan && interval) {
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
      } catch {
        // Fallback al redirect normale
      }
    }

    router.push(next);
    router.refresh();
  }

  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Email
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
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
            placeholder="••••••••"
          />
        </div>

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
          {loading ? 'Accesso in corso…' : 'Accedi →'}
        </button>

        <p className="text-center text-xs text-[var(--color-ink-soft)]">
          Non hai un account?{' '}
          <Link href="/registrati" className="text-[var(--color-ink)] underline">
            Registrati
          </Link>
        </p>
      </form>
    </div>
  );
}
