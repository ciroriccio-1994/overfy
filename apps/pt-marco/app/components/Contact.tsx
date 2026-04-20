"use client";

import { useState } from "react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      id="contatti"
      className="py-24 px-6 bg-[var(--color-ink)] text-[var(--color-bg)]"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4">
              Consulenza gratuita
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
              Parliamo del tuo
              <br />
              <span className="italic font-light text-[var(--color-accent)]">
                obiettivo.
              </span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              30 minuti, senza impegno. Capiamo dove sei, dove vuoi arrivare, se
              posso esserti utile. Rispondo entro 24 ore.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  📍
                </span>
                <div>
                  <div className="font-semibold">Vomero, Napoli</div>
                  <div className="text-white/60">+ online in tutta Italia</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  💬
                </span>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-white/60">+39 333 123 4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  ✉
                </span>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-white/60">marco@marcoespositopt.it</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold mb-3">Richiesta inviata</h3>
                <p className="text-white/70">
                  Ti contatto entro 24 ore per fissare la consulenza gratuita.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                    Nome e cognome
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition"
                      placeholder="mario@email.it"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition"
                      placeholder="333 1234567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                    Obiettivo principale
                  </label>
                  <select
                    required
                    defaultValue=""
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition"
                  >
                    <option value="" disabled className="bg-[var(--color-ink)]">
                      Seleziona...
                    </option>
                    <option value="dimagrimento" className="bg-[var(--color-ink)]">
                      Dimagrimento
                    </option>
                    <option value="muscolo" className="bg-[var(--color-ink)]">
                      Aumento massa muscolare
                    </option>
                    <option value="ricomp" className="bg-[var(--color-ink)]">
                      Ricomposizione corporea
                    </option>
                    <option value="sport" className="bg-[var(--color-ink)]">
                      Preparazione sportiva
                    </option>
                    <option value="salute" className="bg-[var(--color-ink)]">
                      Salute e benessere
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                    Messaggio (opzionale)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition resize-none"
                    placeholder="Raccontami un po' di te..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--color-accent)] text-[var(--color-ink)] py-4 rounded-full font-semibold hover:bg-[var(--color-accent-dark)] transition disabled:opacity-50"
                >
                  {loading ? "Invio..." : "Prenota consulenza gratuita →"}
                </button>
                <p className="text-xs text-white/40 text-center">
                  Rispondo entro 24 ore. Nessuna vendita aggressiva, promesso.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
