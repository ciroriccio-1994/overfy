"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ANIMATION_CSS = `
@keyframes overfy-stagger-in {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes overfy-expand-in {
  0% { opacity: 0; transform: translateY(-8px); max-height: 0; }
  100% { opacity: 1; transform: translateY(0); max-height: 500px; }
}
.overfy-anim-item {
  opacity: 0;
  animation: overfy-stagger-in 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  will-change: opacity, transform;
}
.overfy-expand-item {
  animation: overfy-expand-in 450ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  overflow: hidden;
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
.overfy-contact-toggle {
  transition: all 250ms cubic-bezier(0.22, 1, 0.36, 1);
}
.overfy-contact-toggle:hover { border-color: var(--color-ink); }
.overfy-time-option {
  transition: all 200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.overfy-time-option:hover { border-color: var(--color-ink); }
@media (prefers-reduced-motion: reduce) {
  .overfy-anim-item, .overfy-expand-item { animation: none !important; opacity: 1 !important; transform: none !important; max-height: none !important; }
  .overfy-btn-primary:hover { transform: none !important; }
}
`;

type ContactPreference = 'email' | 'callback';
type PreferredTime = 'today_2h' | 'tomorrow_am' | 'tomorrow_pm' | 'within_3_days';

const TIME_OPTIONS: { value: PreferredTime; label: string; hint: string }[] = [
  { value: 'today_2h', label: 'Oggi, entro 2 ore', hint: 'Priorità massima' },
  { value: 'tomorrow_am', label: 'Domani mattina', hint: '9:00 — 12:00' },
  { value: 'tomorrow_pm', label: 'Domani pomeriggio', hint: '14:00 — 18:00' },
  { value: 'within_3_days', label: 'Entro 3 giorni', hint: 'Quando ti comoda' },
];

export function ContattiForm() {
  const sp = useSearchParams();
  const source = sp.get('source') || 'contatti';

  const [contactPref, setContactPref] = useState<ContactPreference>('email');
  const [preferredTime, setPreferredTime] = useState<PreferredTime>('today_2h');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCallback = contactPref === 'callback';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (isCallback && !phone.trim()) {
      setError('Per richiedere una chiamata serve il numero di telefono.');
      return;
    }

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
          request_callback: isCallback,
          preferred_time: isCallback ? preferredTime : null,
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
      <>
        <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />
        <div
          className="overfy-anim-item bg-[var(--color-paper)] border-2 rounded-2xl p-10 text-center"
          style={{ borderColor: 'var(--color-mint)', animationDelay: '0ms' }}
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
            {isCallback ? 'Richiesta ricevuta.' : 'Ricevuta.'}
          </h2>
          <p className="text-[var(--color-ink-soft)]">
            {isCallback ? (
              <>
                Ti chiamiamo al <strong className="text-[var(--color-ink)]">{phone}</strong>{' '}
                {preferredTime === 'today_2h' && 'entro 2 ore.'}
                {preferredTime === 'tomorrow_am' && 'domani mattina.'}
                {preferredTime === 'tomorrow_pm' && 'domani pomeriggio.'}
                {preferredTime === 'within_3_days' && 'entro 3 giorni lavorativi.'}
              </>
            ) : (
              <>
                Ti rispondiamo entro 24 ore lavorative all&apos;indirizzo{' '}
                <strong className="text-[var(--color-ink)]">{email}</strong>.
              </>
            )}
          </p>
        </div>
      </>
    );
  }

  const d = (idx: number) => ({ animationDelay: `${200 + idx * 70}ms` });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10 overfy-anim-item"
        style={{ animationDelay: '120ms' }}
      >
        {source === 'su-misura' && (
          <div
            className="overfy-anim-item p-4 rounded-xl text-sm"
            style={{ ...d(0), background: 'var(--color-sky-soft)', color: 'var(--color-sky-ink)' }}
          >
            Hai selezionato il piano <strong>Su Misura</strong>. Raccontaci cosa hai in mente, poi ti ricontattiamo per la call discovery.
          </div>
        )}

        {/* Contact preference toggle */}
        <div className="overfy-anim-item" style={d(0)}>
          <div className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
            Come vuoi essere contattato?
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setContactPref('email')}
              className="overfy-contact-toggle flex items-center gap-3 px-4 py-4 rounded-xl border text-left"
              style={{
                borderColor: contactPref === 'email' ? 'var(--color-ink)' : 'var(--color-line)',
                background: contactPref === 'email' ? 'var(--color-bg-soft)' : 'var(--color-paper)',
                borderWidth: contactPref === 'email' ? '2px' : '1px',
                padding: contactPref === 'email' ? 'calc(1rem - 1px)' : '1rem',
              }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{
                  background: contactPref === 'email' ? 'var(--color-ink)' : 'var(--color-bg-soft)',
                  color: contactPref === 'email' ? 'var(--color-paper)' : 'var(--color-ink-soft)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[var(--color-ink)]">Via email</div>
                <div className="text-xs text-[var(--color-muted)] mt-0.5">Risposta in 24h</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setContactPref('callback')}
              className="overfy-contact-toggle flex items-center gap-3 px-4 py-4 rounded-xl border text-left"
              style={{
                borderColor: contactPref === 'callback' ? 'var(--color-mint-ink)' : 'var(--color-line)',
                background: contactPref === 'callback' ? 'var(--color-mint-soft)' : 'var(--color-paper)',
                borderWidth: contactPref === 'callback' ? '2px' : '1px',
                padding: contactPref === 'callback' ? 'calc(1rem - 1px)' : '1rem',
              }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{
                  background: contactPref === 'callback' ? 'var(--color-mint-ink)' : 'var(--color-bg-soft)',
                  color: contactPref === 'callback' ? 'var(--color-paper)' : 'var(--color-ink-soft)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[var(--color-ink)]">Chiamami</div>
                <div className="text-xs text-[var(--color-muted)] mt-0.5">Parliamo oggi</div>
              </div>
            </button>
          </div>
        </div>

        <div className="overfy-anim-item grid md:grid-cols-2 gap-5" style={d(1)}>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Nome *
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
          <div>
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
        </div>

        <div className="overfy-anim-item grid md:grid-cols-2 gap-5" style={d(2)}>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Attività / Azienda
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
              placeholder="Studio Rossi"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Telefono {isCallback && <span style={{ color: 'var(--color-mint-ink)' }}>*</span>}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={isCallback}
              className="overfy-field w-full px-4 py-3 rounded-xl border bg-[var(--color-bg)] text-[var(--color-ink)]"
              style={{ borderColor: isCallback ? 'var(--color-mint-ink)' : 'var(--color-line)' }}
              placeholder="+39 333 1234567"
            />
          </div>
        </div>

        {/* Preferred time — visibile solo se callback */}
        {isCallback && (
          <div className="overfy-expand-item" key="preferred-time-block">
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
              Quando ti chiamiamo?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPreferredTime(opt.value)}
                  className="overfy-time-option flex items-center gap-3 px-4 py-3 rounded-xl border text-left"
                  style={{
                    borderColor: preferredTime === opt.value ? 'var(--color-mint-ink)' : 'var(--color-line)',
                    background: preferredTime === opt.value ? 'var(--color-mint-soft)' : 'var(--color-paper)',
                    borderWidth: preferredTime === opt.value ? '2px' : '1px',
                    padding: preferredTime === opt.value ? 'calc(0.75rem - 1px) calc(1rem - 1px)' : '0.75rem 1rem',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center"
                    style={{
                      borderColor: preferredTime === opt.value ? 'var(--color-mint-ink)' : 'var(--color-muted)',
                      background: preferredTime === opt.value ? 'var(--color-mint-ink)' : 'transparent',
                    }}
                  >
                    {preferredTime === opt.value && (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-paper)' }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--color-ink)]">{opt.label}</div>
                    <div className="text-xs text-[var(--color-muted)] mt-0.5">{opt.hint}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="overfy-anim-item" style={d(3)}>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Tipo di progetto
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
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

        <div className="overfy-anim-item" style={d(4)}>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Raccontaci cosa ti serve *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            className="overfy-field w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] resize-none"
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
          className="overfy-btn-primary overfy-anim-item w-full text-[var(--color-paper)] py-4 rounded-full text-sm font-medium disabled:opacity-60"
          style={{
            ...d(5),
            background: isCallback ? 'var(--color-mint-ink)' : 'var(--color-ink)',
          }}
        >
          {loading
            ? 'Invio in corso…'
            : isCallback
              ? 'Richiedi chiamata →'
              : 'Invia richiesta →'}
        </button>

        <p className="overfy-anim-item text-xs text-[var(--color-muted)] italic text-center" style={d(6)}>
          Inviando accetti che i tuoi dati vengano usati solo per risponderti. Nessuna newsletter, nessun contatto indesiderato.
        </p>
      </form>
    </>
  );
}
