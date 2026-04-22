"use client";

import { useState } from 'react';

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

type Network = 'commercianti' | 'ristorazione' | 'professionisti' | 'consulenti' | 'altro';

const NETWORK_OPTIONS: { value: Network; label: string }[] = [
  { value: 'commercianti', label: 'Commercianti / negozi' },
  { value: 'ristorazione', label: 'Ristorazione / bar / pasticcerie' },
  { value: 'professionisti', label: 'Professionisti (avvocati, architetti, medici)' },
  { value: 'consulenti', label: 'Consulenti / commercialisti' },
  { value: 'altro', label: 'Altro (racconta nel messaggio)' },
];

export function AgentCandidaturaForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [network, setNetwork] = useState<Network>('commercianti');
  const [estimatedContacts, setEstimatedContacts] = useState('');
  const [message, setMessage] = useState('');
  const [hasVatNumber, setHasVatNumber] = useState(false);

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setError('Nome, email e messaggio sono obbligatori.');
      return;
    }

    setLoading(true);
    try {
      // Usiamo /api/leads con source="agent_application" — così le candidature
      // appaiono nella sezione Lead dell'admin, marchiate chiaramente.
      const structuredMessage = [
        `[CANDIDATURA AGENT]`,
        `Rete: ${NETWORK_OPTIONS.find((o) => o.value === network)?.label || network}`,
        city ? `Città: ${city}` : null,
        estimatedContacts ? `Contatti stimati: ${estimatedContacts}` : null,
        `P.IVA: ${hasVatNumber ? 'Sì' : 'No / Non ancora'}`,
        ``,
        message.trim(),
      ]
        .filter(Boolean)
        .join('\n');

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone: phone || null,
          company_name: null,
          message: structuredMessage,
          source: 'agent_application',
          interest_tier: null,
          request_callback: false,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Errore durante l\'invio. Riprova.');
        return;
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di rete.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div
        className="bg-[var(--color-paper)] border rounded-2xl p-8 md:p-10 text-center"
        style={{ borderColor: 'var(--color-mint-ink)' }}
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
          style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-3xl text-[var(--color-ink)] mb-3">
          Candidatura ricevuta.
        </h3>
        <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-md mx-auto">
          Ti rispondiamo entro 48 ore lavorative all'indirizzo <strong>{email}</strong>. Se sei un buon fit, il messaggio successivo conterrà il tuo codice agent e l'accesso alla tua dashboard.
        </p>
      </div>
    );
  }

  const d = (idx: number) => ({ animationDelay: `${120 + idx * 60}ms` });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="overfy-anim-item" style={d(0)}>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Nome e cognome *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="Marco Rossi"
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
              required
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="marco@esempio.it"
            />
          </div>

          <div className="overfy-anim-item" style={d(2)}>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Telefono
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="+39 333 1234567"
            />
          </div>

          <div className="overfy-anim-item" style={d(3)}>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Città
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="Napoli"
            />
          </div>
        </div>

        <div className="overfy-anim-item" style={d(4)}>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            La tua rete è principalmente di… *
          </label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value as Network)}
            className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
          >
            {NETWORK_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="overfy-anim-item" style={d(5)}>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            A quanti imprenditori pensi di poter presentare Overfy?
          </label>
          <input
            type="text"
            value={estimatedContacts}
            onChange={(e) => setEstimatedContacts(e.target.value)}
            className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
            placeholder="5-10 nel primo mese"
          />
        </div>

        <div className="overfy-anim-item" style={d(6)}>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Raccontaci brevemente chi sei *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] resize-none"
            placeholder="Che lavoro fai, che tipo di clienti incontri ogni settimana, perché secondo te Overfy sarebbe utile alla tua rete…"
          />
        </div>

        <div className="overfy-anim-item" style={d(7)}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasVatNumber}
              onChange={(e) => setHasVatNumber(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--color-mint-ink)] shrink-0"
            />
            <span className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Ho già una partita IVA attiva (se no nessun problema, valutiamo insieme la forma fiscale migliore)
            </span>
          </label>
        </div>

        {error && (
          <div
            className="p-3 rounded-lg text-sm"
            style={{ background: 'var(--color-coral-soft)', color: 'var(--color-coral-ink)' }}
          >
            {error}
          </div>
        )}

        <div className="overfy-anim-item pt-2" style={d(8)}>
          <button
            type="submit"
            disabled={loading}
            className="overfy-btn-primary w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium disabled:opacity-60"
          >
            {loading ? 'Invio in corso…' : 'Invia candidatura →'}
          </button>
          <p className="text-xs text-[var(--color-muted)] text-center mt-3">
            Ti risponderemo entro 48 ore lavorative
          </p>
        </div>
      </form>
    </>
  );
}
