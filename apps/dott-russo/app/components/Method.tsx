const steps = [
  {
    number: "01",
    title: "Ci conosciamo",
    description:
      "Una prima chiamata di 20 minuti, gratuita, per capire se posso esserti utile. Mi racconti a grandi linee cosa ti porta a cercare aiuto, io ti spiego come lavoro. Se sentiamo che può funzionare, fissiamo la prima seduta.",
  },
  {
    number: "02",
    title: "Costruiamo la direzione",
    description:
      "Nelle prime due o tre sedute esploriamo insieme cosa stai vivendo, cosa hai già provato, cosa vorresti raggiungere. Definiamo obiettivi concreti — non magici, ma realizzabili — e decidiamo frequenza e modalità degli incontri.",
  },
  {
    number: "03",
    title: "Lavoriamo",
    description:
      "Cominciamo il percorso vero e proprio. Uso un approccio cognitivo-comportamentale integrato con tecniche EMDR e mindfulness quando utile. Ogni seduta è un pezzo del puzzle. Facciamo il punto ogni tre mesi.",
  },
];

export function Method() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--color-moss)] text-[var(--color-paper)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra)] mb-6">
            — Come lavoriamo insieme —
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Tre fasi,
            <br />
            <em className="font-display-italic text-[var(--color-terra)]">
              un percorso su misura.
            </em>
          </h2>
        </div>

        <div className="space-y-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid md:grid-cols-12 gap-6 md:gap-12 pb-12 border-b border-[var(--color-paper)]/15 last:border-b-0"
            >
              <div className="md:col-span-2">
                <div className="font-display text-6xl md:text-7xl text-[var(--color-terra)] leading-none">
                  {step.number}
                </div>
              </div>
              <div className="md:col-span-10">
                <h3 className="font-display text-3xl mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[var(--color-paper)]/80 leading-[1.8]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
