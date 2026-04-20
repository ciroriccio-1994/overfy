import Link from "next/link";

export function Contact() {
  return (
    <section
      id="contatti"
      className="py-20 px-6 bg-[var(--color-ink)] text-[var(--color-bg)]"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Il salone
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
            Vieni a trovarci
            <br />
            <em className="text-[var(--color-gold)]">a Chiaia.</em>
          </h2>

          <div className="space-y-5 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-1">
                Indirizzo
              </div>
              <div className="text-lg">Via dei Mille 38, 80121 Napoli</div>
              <a
                href="https://maps.google.com/?q=Via+dei+Mille+38+Napoli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-gold)] underline mt-1 inline-block"
              >
                Apri in Google Maps →
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-1">
                Telefono
              </div>
              <a href="tel:+390811122334" className="text-lg">
                081 112 2334
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-1">
                Email
              </div>
              <a href="mailto:info@salonegloria.it" className="text-lg">
                info@salonegloria.it
              </a>
            </div>
          </div>

          <Link
            href="/prenota"
            className="inline-block bg-[var(--color-gold)] text-[var(--color-ink)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-gold-dark)] hover:text-[var(--color-bg)] transition"
          >
            Prenota online →
          </Link>
        </div>

        <div className="bg-[var(--color-bg)]/5 backdrop-blur rounded-3xl p-8 border border-[var(--color-bg)]/10">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Orari
          </div>

          <div className="space-y-3 text-sm">
            {[
              { day: "Lunedì", time: "Chiuso" },
              { day: "Martedì", time: "9:00 – 19:30" },
              { day: "Mercoledì", time: "9:00 – 19:30" },
              { day: "Giovedì", time: "9:00 – 20:30" },
              { day: "Venerdì", time: "9:00 – 20:30" },
              { day: "Sabato", time: "9:00 – 19:00" },
              { day: "Domenica", time: "Chiuso" },
            ].map((h, i) => (
              <div
                key={i}
                className={`flex justify-between items-center pb-3 ${
                  i < 6 ? "border-b border-[var(--color-bg)]/10" : ""
                }`}
              >
                <span className="text-[var(--color-bg)]/70">{h.day}</span>
                <span
                  className={`font-medium ${
                    h.time === "Chiuso"
                      ? "text-[var(--color-bg)]/40"
                      : "text-[var(--color-bg)]"
                  }`}
                >
                  {h.time}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[var(--color-success)]/20 border border-[var(--color-success)]/40 rounded-xl p-4 text-sm">
            <div className="flex items-center gap-2 text-[var(--color-success)] font-medium mb-1">
              <span className="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse"></span>
              Aperti ora
            </div>
            <div className="text-xs text-[var(--color-bg)]/70">
              Chiudiamo alle 19:30. Ultimo appuntamento alle 18:30.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
