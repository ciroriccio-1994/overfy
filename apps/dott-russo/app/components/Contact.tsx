export function Contact() {
  return (
    <section
      id="contatti"
      className="bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra)] mb-6">
              Dove mi trovi
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-10">
              Lo studio è
              <br />
              <em className="font-display-italic text-[var(--color-terra)]">
                a Chiaia.
              </em>
            </h2>

            <div className="space-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-terra)] mb-2">
                  Indirizzo
                </div>
                <div className="text-lg mb-1">Via Filangieri 22</div>
                <div className="text-sm text-[var(--color-paper)]/60 mb-3">
                  80121 Napoli
                </div>
                <a
                  href="https://maps.google.com/?q=Via+Filangieri+22+Napoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs uppercase tracking-[0.15em] text-[var(--color-terra)] border-b border-[var(--color-terra)]/40 pb-1 hover:text-[var(--color-paper)] hover:border-[var(--color-paper)] transition"
                >
                  Google Maps →
                </a>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-terra)] mb-2">
                  Email
                </div>
                <a
                  href="mailto:chiara@chiararussopsicologa.it"
                  className="text-sm hover:text-[var(--color-terra)] transition"
                >
                  chiara@chiararussopsicologa.it
                </a>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-terra)] mb-2">
                  Telefono
                </div>
                <a
                  href="tel:+393331234567"
                  className="text-sm hover:text-[var(--color-terra)] transition"
                >
                  333 123 4567
                </a>
                <p className="text-xs text-[var(--color-paper)]/50 italic mt-1">
                  Rispondo solo in orario di lavoro. Per richieste scrivere
                  all&apos;email.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-paper)]/5 rounded-sm p-8 border border-[var(--color-paper)]/10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-terra)] mb-4">
              Quando ricevo
            </div>
            <div className="space-y-3 text-sm mb-8">
              {[
                { day: "Lunedì", time: "14:00 — 20:00" },
                { day: "Mercoledì", time: "09:00 — 19:00" },
                { day: "Giovedì", time: "14:00 — 20:00" },
                { day: "Venerdì", time: "09:00 — 14:00" },
                { day: "Martedì · Sabato · Domenica", time: "Chiuso", closed: true },
              ].map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between gap-4 pb-3 border-b border-[var(--color-paper)]/10 last:border-b-0"
                >
                  <span className="text-[var(--color-paper)]/60">{h.day}</span>
                  <span
                    className={
                      h.closed
                        ? "text-[var(--color-paper)]/40 italic text-right"
                        : "text-right"
                    }
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[var(--color-paper)]/60 italic leading-relaxed mb-6">
              Gli appuntamenti online sono possibili anche negli orari non
              indicati, su accordo.
            </p>

            <a
              href="/prenota"
              className="block bg-[var(--color-terra)] text-[var(--color-paper)] text-center py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition"
            >
              Prima chiamata gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
