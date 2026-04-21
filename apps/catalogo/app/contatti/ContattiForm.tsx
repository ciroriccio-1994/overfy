"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function ContattiForm() {
  const sp = useSearchParams();
  const source = sp.get('source') || 'contatti';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          company_name: companyName,
          phone,
          message: projectType ? `[${projectType}] ${message}` : message,
          source,
          interest_tier: source === 'su-misura' ? 'su_misura' : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Errore');
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
        className="bg-[var(--color-paper)] border-2 rounded-2xl p-10 text-center"
        style={{ borderColor: 'var(--color-mint)' }}
      >
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6"
          style={{ background: 'var(--color-mint-soft)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="var(--color-mint-ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-display text-4xl text-[var(--color-ink)] mb-3">
          Ricevuta.
        </h2>
        <p className="text-[var(--color-ink-soft)]">
          Ti rispondiamo entro 24 ore lavorative all&apos;indirizzo{' '}
          <strong className="text-[var(--color-ink)]">{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10"
    >
      {source === 'su-misura' && (
        <div
          className="p-4 rounded-xl text-sm"
          style={{ background: 'var(--color-sky-soft)', color: 'var(--color-sky-ink)' }}
        >
          Hai selezionato il piano <strong>Su Misura</strong>. Raccontaci cosa hai in mente, poi ti ricontattiamo per la call discovery.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Nome *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
            placeholder="Marco Rossi"
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
            required
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
            placeholder="marco@esempio.it"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Attività / Azienda
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
            placeholder="Studio Rossi"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Telefono
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
            placeholder="+39 333 1234567"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
          Tipo di progetto
        </label>
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
        >
          <option value="">Seleziona una categoria</option>
          <option value="Sito vetrina/landing">Sito vetrina / landing</option>
          <option value="Prenotazioni">Sistema prenotazioni</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Chatbot AI">Chatbot AI</option>
          <option value="Menu QR">Menu digitale QR</option>
          <option value="App native">App native iOS/Android</option>
          <option value="Web app">Web app / gestionale</option>
          <option value="AI per aziende">Tool AI per azienda strutturata</option>
          <option value="Altro">Altro / non so ancora</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
          Raccontaci cosa ti serve *
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition resize-none"
          placeholder="Descrivi brevemente la tua attività, cosa vorresti ottenere e in quanto tempo…"
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
        className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition disabled:opacity-60"
      >
        {loading ? 'Invio in corso…' : 'Invia richiesta →'}
      </button>

      <p className="text-xs text-[var(--color-muted)] italic text-center">
        Inviando accetti che i tuoi dati vengano usati solo per risponderti. Nessuna newsletter, nessun contatto indesiderato.
      </p>
    </form>
  );
}
