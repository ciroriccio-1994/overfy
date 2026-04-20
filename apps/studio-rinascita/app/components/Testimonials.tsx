const testimonials = [
  {
    text: "Avevo paura del dentista da 20 anni. Qui mi hanno messo a mio agio dalla prima visita. Ora faccio l'igiene ogni sei mesi, senza ansia.",
    author: "Paziente, 47 anni",
    treatment: "Igiene professionale",
  },
  {
    text: "La dott.ssa Conte ha fatto un lavoro straordinario con le faccette. Mi aveva mostrato il risultato al computer prima, e il risultato è identico alla simulazione.",
    author: "Paziente, 34 anni",
    treatment: "Faccette dentali",
  },
  {
    text: "Tre impianti in una sola seduta, senza dolore. Sono tornato a casa camminando e il giorno dopo ero in ufficio. Studio al top.",
    author: "Paziente, 58 anni",
    treatment: "Implantologia",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--color-paper)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-6">
            — I nostri pazienti —
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
            Parole che contano
            <br />
            <em className="font-display-italic">più delle nostre.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <figure key={i} className="p-8 border border-[var(--color-line)] rounded-sm">
              <div className="font-display text-4xl text-[var(--color-sage)] leading-none mb-6">
                &ldquo;
              </div>
              <blockquote className="text-[var(--color-ink-soft)] leading-relaxed mb-6 italic">
                {t.text}
              </blockquote>
              <figcaption className="border-t border-[var(--color-line)] pt-4">
                <div className="text-sm text-[var(--color-ink)]">{t.author}</div>
                <div className="text-xs text-[var(--color-muted)] mt-1">
                  {t.treatment}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-[var(--color-muted)] italic">
          In conformità alle linee guida deontologiche, non pubblichiamo
          fotografie dei nostri pazienti.
        </div>
      </div>
    </section>
  );
}
