import Link from "next/link";

export function Contact() {
  return (
    <section
      id="contatti"
      className="bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage)] mb-6">
              Vieni a trovarci
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8">
              Studio Rinascita,
              <br />
              <em className="font-display-italic text-[var(--color-sage)]">
                a Posillipo.
              </em>
            </h2>
            <p className="text-[var(--color-paper)]/70 leading-relaxed mb-10">
              Parcheggio convenzionato a 50 metri. Accesso disabili garantito.
              Aria condizionata, sala d&apos;attesa con WiFi.
            </p>

            <div className="space-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-sage)] mb-2">
                  Indirizzo
                </div>
                <div className="text-lg mb-1">Via Posillipo 142</div>
                <div className="text-sm text-[var(--color-paper)]/60">
                  80123 Napoli
                </div>
                <a
                  href="https://maps.google.com/?q=Via+Posillipo+142+Napoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs uppercase tracking-[0.15em] text-[var(--color-sage)] border-b border-[var(--color-sage)]/40 pb-1 hover:text-[var(--color-paper)] hover:border-[var(--color-paper)] transition"
                >
                  Indicazioni →
                </a>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-sage)] mb-2">
                  Contatti
                </div>
                <div className="space-y-1 text-sm">
                  <a
                    href="tel:+390812345678"
                    className="block hover:text-[var(--color-sage)] transition"
                  >
                    081 234 5678
                  </a>
                  <a
                    href="mailto:info@studiorinascita.it"
                    className="block hover:text-[var(--color-sage)] transition"
                  >
                    info@studiorinascita.it
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-paper)]/5 backdrop-blur-sm rounded-sm p-8 border border-[var(--color-paper)]/10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-sage)] mb-4">
              Orari
            </div>
            <div className="space-y-3 text-sm mb-8">
              {[
                { day: "Lunedì — Giovedì", time: "9:00 — 13:00 · 15:00 — 20:00" },
                { day: "Venerdì", time: "9:00 — 14:00" },
                { day: "Sabato", time: "Su appuntamento" },
                { day: "Domenica", time: "Chiuso", closed: true },
              ].map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between pb-3 border-b border-[var(--color-paper)]/10 last:border-b-0"
                >
                  <span className="text-[var(--color-paper)]/60">{h.day}</span>
                  <span
                    className={
                      h.closed ? "text-[var(--color-paper)]/40 italic" : ""
                    }
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/prenota"
              className="block bg-[var(--color-sage)] text-[var(--color-ink)] text-center py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)] transition"
            >
              Prima visita gratuita
            </Link>
            <a
              href="tel:+390812345678"
              className="block border border-[var(--color-paper)]/40 text-[var(--color-paper)] text-center py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)]/10 transition mt-3"
            >
              Chiama ora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
