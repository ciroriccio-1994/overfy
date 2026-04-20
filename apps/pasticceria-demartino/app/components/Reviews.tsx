const reviews = [
  {
    name: "Marco G.",
    city: "Milano",
    rating: 5,
    date: "2 settimane fa",
    text: "Arrivate perfette in 24h. Le sfogliatelle sembravano appena uscite dal forno. Mia moglie napoletana si è commossa.",
    product: "Sfogliatella Riccia",
  },
  {
    name: "Giulia R.",
    city: "Torino",
    rating: 5,
    date: "1 settimana fa",
    text: "Ho ordinato la pastiera per Pasqua. Fantastica, profumo di fiori d'arancio autentico. La famiglia è rimasta a bocca aperta.",
    product: "Pastiera Napoletana",
  },
  {
    name: "Andrea P.",
    city: "Firenze",
    rating: 5,
    date: "3 settimane fa",
    text: "Ho regalato il box degustazione alla mia compagna napoletana che vive lontano. Ha pianto. Cosa volete di più?",
    product: "Box Degustazione",
  },
];

export function Reviews() {
  return (
    <section className="py-20 px-6 bg-[var(--color-ivory)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex text-[var(--color-gold)] text-xl">★★★★★</div>
            <span className="font-serif text-xl text-[var(--color-coffee)]">
              4.9/5
            </span>
            <span className="text-sm text-[var(--color-muted)]">
              su +2.000 recensioni
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-coffee)]">
            Le parole dei nostri{" "}
            <em className="text-[var(--color-wine)]">clienti</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-[var(--color-cream)] rounded-3xl p-8 border border-[var(--color-border)]"
            >
              <div className="flex text-[var(--color-gold)] mb-4 text-lg">
                {"★".repeat(r.rating)}
              </div>
              <p className="font-serif text-lg text-[var(--color-coffee)] leading-relaxed mb-6">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-sm">
                <div>
                  <div className="font-semibold text-[var(--color-coffee)]">
                    {r.name}
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">
                    {r.city} • {r.date}
                  </div>
                </div>
                <div className="text-xs bg-[var(--color-gold)]/20 text-[var(--color-coffee)] px-3 py-1 rounded-full">
                  {r.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
