const technologies = [
  {
    name: "Radiografia 3D Cone Beam",
    description:
      "Immagini tridimensionali ad alta definizione con una dose di radiazioni molto inferiore alla TAC tradizionale.",
  },
  {
    name: "Scanner Intraorale iTero",
    description:
      "Impronte digitali in pochi minuti, senza paste. Comfort totale per il paziente.",
  },
  {
    name: "Chirurgia Computer-Guidata",
    description:
      "Impianti posizionati con precisione millimetrica grazie alle dime chirurgiche stampate in 3D.",
  },
  {
    name: "Sedazione Cosciente",
    description:
      "Per i pazienti con ansia dentale, per vivere ogni trattamento nel massimo rilassamento.",
  },
];

export function Technologies() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-6">
            — Tecnologia —
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight max-w-3xl">
            La tecnologia al servizio
            <br />
            <em className="font-display-italic">della tua serenità.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {technologies.map((tech, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="font-display text-4xl text-[var(--color-sage-dark)] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl text-[var(--color-ink)] mb-3 leading-tight">
                  {tech.name}
                </h3>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
