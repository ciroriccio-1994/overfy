const steps = [
  {
    number: "01",
    title: "Ci conosciamo",
    description:
      "Una call gratuita di 20 minuti. Capiamo il tuo settore, i tuoi obiettivi, le tue esigenze. Ti consigliamo la soluzione giusta.",
    color: "coral",
  },
  {
    number: "02",
    title: "Costruiamo",
    description:
      "In 48-72 ore (o pochi giorni per progetti più complessi) costruiamo il tuo sito a partire da un template del nostro catalogo, adattato al tuo brand.",
    color: "mint",
  },
  {
    number: "03",
    title: "Pubblicazione",
    description:
      "Ti mostriamo tutto, revisioni incluse, e quando sei soddisfatto pubblichiamo online. Ti inviamo le credenziali.",
    color: "sky",
  },
  {
    number: "04",
    title: "Gestione continua",
    description:
      "Ogni mese ci occupiamo di hosting, aggiornamenti, modifiche contenuti, assistenza. Tu ti concentri sul tuo lavoro.",
    color: "ink",
  },
];

const colorMap: Record<string, string> = {
  coral: "var(--color-coral)",
  mint: "var(--color-mint-ink)",
  sky: "var(--color-sky-ink)",
  ink: "var(--color-ink)",
};

export function Process() {
  return (
    <section id="processo" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
            <span className="text-[var(--color-ink-soft)]">
              03 / Come lavoriamo
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight">
            Quattro passi.
            <br />
            <em className="font-display-italic text-[var(--color-sky-ink)]">
              Zero complicazioni.
            </em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="font-display text-7xl leading-none mb-6"
                style={{ color: colorMap[step.color] }}
              >
                {step.number}
              </div>
              <h3 className="font-display text-3xl text-[var(--color-ink)] mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
