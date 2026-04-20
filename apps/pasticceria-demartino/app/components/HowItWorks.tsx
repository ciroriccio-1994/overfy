const steps = [
  {
    emoji: "🌅",
    title: "Preparazione all'alba",
    desc: "I dolci vengono preparati la mattina stessa della spedizione, tra le 4 e le 8.",
  },
  {
    emoji: "📦",
    title: "Imballaggio refrigerato",
    desc: "Ogni box viene sigillato con ghiaccio secco e materiale isolante termico.",
  },
  {
    emoji: "🚚",
    title: "Spedizione in 24h",
    desc: "Corriere espresso refrigerato. Traccia il pacco dal momento della partenza.",
  },
  {
    emoji: "🏡",
    title: "A casa tua, fresco",
    desc: "Arriva come appena sfornato. Istruzioni per conservare e scaldare incluse.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Come arriva a casa tua
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-coffee)]">
            Dal forno alla tua <em className="text-[var(--color-wine)]">tavola</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-[var(--color-ivory)] rounded-3xl p-8 border border-[var(--color-border)] text-center relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-[var(--color-coffee)] text-[var(--color-cream)] rounded-full flex items-center justify-center font-serif text-lg">
                {i + 1}
              </div>
              <div className="text-5xl mb-4 mt-2">{s.emoji}</div>
              <h3 className="font-serif text-xl text-[var(--color-coffee)] mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
