"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const ANIMATION_CSS = `
@keyframes overfy-stagger-in {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
.overfy-anim-item {
  opacity: 0;
  animation: overfy-stagger-in 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  will-change: opacity, transform;
}
.overfy-field {
  transition: border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
}
.overfy-field:focus {
  border-color: var(--color-ink) !important;
  box-shadow: 0 0 0 4px rgba(0, 200, 150, 0.12);
  outline: none;
}
.overfy-btn-primary {
  transition: background 220ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease;
}
.overfy-btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.18);
}
.overfy-btn-primary:active:not(:disabled) { transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .overfy-anim-item { animation: none !important; opacity: 1 !important; transform: none !important; }
  .overfy-btn-primary:hover { transform: none !important; }
}
`;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';
  const plan = searchParams.get('plan');
  const interval = searchParams.get('interval');
  const prefilledEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledEmail) setEmail(prefilledEmail);
  }, [prefilledEmail]);

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

  const d = (idx: number) => ({ animationDelay: `${260 + idx * 80}ms` });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />
      <div
        className="overfy-anim-item bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10"
        style={{ animationDelay: '160ms' }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="overfy-anim-item" style={d(0)}>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="marco@esempio.it"
            />
          </div>

          <div className="overfy-anim-item" style={d(1)}>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="overfy-btn-primary overfy-anim-item w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium disabled:opacity-60"
            style={d(2)}
          >
            {loading ? 'Accesso in corso…' : 'Accedi →'}
          </button>

          <p className="overfy-anim-item text-center text-xs text-[var(--color-ink-soft)]" style={d(3)}>
            Non hai un account?{' '}
            <Link href="/registrati" className="text-[var(--color-ink)] underline">
              Registrati
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
