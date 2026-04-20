const testimonials = [
  {
    name: "Laura",
    age: 34,
    role: "Impiegata",
    result: "-12kg in 4 mesi",
    quote:
      "Con Marco ho perso 12kg in 4 mesi senza mai sentirmi a dieta. Il metodo funziona perché è sostenibile, non estremo. Ora mi alleno con piacere.",
  },
  {
    name: "Giuseppe",
    age: 41,
    role: "Avvocato",
    result: "Energia ritrovata",
    quote:
      "Dopo 10 anni di sedentarietà ero scettico. In 6 mesi ho ritrovato energia che non avevo da ragazzo. Marco ti segue davvero, non è un trainer qualsiasi.",
  },
  {
    name: "Simona",
    age: 28,
    role: "Mamma di due",
    result: "-8kg e più forza",
    quote:
      "Avevo provato di tutto dopo la seconda gravidanza. Marco ha costruito un programma che si incastrava con i miei orari impossibili. Risultati veri.",
  },
];

export function Testimonials() {
  return (
    <section id="storie" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
            Storie
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Le loro trasformazioni,
            <br />
            <span className="italic font-light">raccontate da loro.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[var(--color-bg)] rounded-3xl p-8 border border-[var(--color-border)] flex flex-col"
            >
              <div className="text-4xl text-[var(--color-accent)] leading-none mb-4">
                &ldquo;
              </div>
              <p className="text-[var(--color-ink)] leading-relaxed mb-8 flex-1">
                {t.quote}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-muted)] to-[var(--color-ink)] flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {t.name}, {t.age}
                    </div>
                    <div className="text-xs text-[var(--color-muted)]">
                      {t.role}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-bold bg-[var(--color-accent)] text-[var(--color-ink)] px-3 py-1.5 rounded-full">
                  {t.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
