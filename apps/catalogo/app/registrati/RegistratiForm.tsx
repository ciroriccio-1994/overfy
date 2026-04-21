"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * CSS animazioni + focus states.
 * Definito una sola volta — iniettato tramite <style> nel componente root.
 */
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
.overfy-btn-primary:active:not(:disabled) {
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .overfy-anim-item { animation: none !important; opacity: 1 !important; transform: none !important; }
  .overfy-btn-primary:hover { transform: none !important; }
}
`;

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
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  // Reset errore "già registrato" se l'utente cambia email
  useEffect(() => {
    if (alreadyRegistered) setAlreadyRegistered(false);
  }, [email]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setAlreadyRegistered(false);

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

    const siteUrl =
      typeof window !== 'undefined' ? window.location.origin : 'https://overfydigital.com';

    const nextParams = new URLSearchParams();
    if (plan) nextParams.set('plan', plan);
    if (interval) nextParams.set('interval', interval);
    const nextQs = nextParams.toString();
    const emailRedirectTo = `${siteUrl}/auth/callback${nextQs ? `?${nextQs}` : ''}`;

    const normalizedEmail = email.trim().toLowerCase();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: { full_name: fullName.trim() || null },
        emailRedirectTo,
      },
    });

    setLoading(false);

    if (signUpError) {
      const msg = signUpError.message || 'Errore durante la registrazione.';
      if (
        msg.toLowerCase().includes('already registered') ||
        msg.toLowerCase().includes('user already')
      ) {
        setAlreadyRegistered(true);
      } else {
        setError(msg);
      }
      return;
    }

    // Supabase con "Prevent email enumeration" ON non restituisce errore quando
    // l'email è già registrata — ma la risposta ha `data.user.identities = []`.
    if (
      data?.user &&
      Array.isArray(data.user.identities) &&
      data.user.identities.length === 0
    ) {
      setAlreadyRegistered(true);
      return;
    }

    const verifyQs = new URLSearchParams({ email: normalizedEmail });
    if (plan) verifyQs.set('plan', plan);
    if (interval) verifyQs.set('interval', interval);
    router.push(`/verifica-email?${verifyQs.toString()}`);
  }

  // Delay sequence per stagger animation
  const d = (idx: number) => ({ animationDelay: `${260 + idx * 80}ms` });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />
      <div
        className="overfy-anim-item bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10"
        style={{ animationDelay: '160ms' }}
      >
        {plan && (
          <div
            className="overfy-anim-item mb-6 p-4 rounded-xl text-sm"
            style={{ ...d(0), background: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)' }}
          >
            Stai attivando il piano <strong>{plan.charAt(0).toUpperCase() + plan.slice(1)}</strong>
            {interval === 'year' ? ' (annuale)' : ' (mensile)'}. Dopo la conferma email procederai al pagamento.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="overfy-anim-item" style={d(0)}>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Nome e cognome
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="Marco Rossi"
              required
            />
          </div>

          <div className="overfy-anim-item" style={d(1)}>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Email *
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

          <div className="overfy-anim-item" style={d(2)}>
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
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="Almeno 8 caratteri"
            />
          </div>

          <label className="overfy-anim-item flex items-start gap-3 cursor-pointer" style={d(3)}>
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

          {alreadyRegistered && (
            <div
              className="p-5 rounded-xl border"
              style={{ background: 'var(--color-mint-soft)', borderColor: 'var(--color-mint-ink)' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 mt-0.5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ background: 'var(--color-mint-ink)', color: 'var(--color-paper)' }}
                >
                  i
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1" style={{ color: 'var(--color-ink)' }}>
                    Hai già un account con questa email
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
                    Questa email è già registrata su Overfy. Accedi con la tua password, oppure usa &ldquo;Password dimenticata?&rdquo; nella pagina di login.
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/login?email=${encodeURIComponent(email.trim().toLowerCase())}`}
                      className="overfy-btn-primary inline-block px-5 py-2.5 rounded-full text-xs font-medium"
                      style={{ background: 'var(--color-ink)', color: 'var(--color-paper)' }}
                    >
                      Vai al login →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && !alreadyRegistered && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || alreadyRegistered}
            className="overfy-btn-primary overfy-anim-item w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium disabled:opacity-60"
            style={d(4)}
          >
            {loading ? 'Creo account…' : 'Crea account →'}
          </button>

          <p className="overfy-anim-item text-center text-xs text-[var(--color-ink-soft)]" style={d(5)}>
            Hai già un account?{' '}
            <Link href="/login" className="text-[var(--color-ink)] underline">
              Accedi
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
