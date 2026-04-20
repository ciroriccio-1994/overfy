export function StorySnippet() {
  return (
    <section className="py-20 px-6 bg-[var(--color-coffee)] text-[var(--color-cream)]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-gradient-to-br from-[var(--color-wine)] to-[var(--color-coffee)] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-cream)]/30 text-sm">
              [Foto famiglia De Martino]
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-[var(--color-gold)] text-[var(--color-coffee)] px-6 py-3 rounded-2xl font-serif shadow-xl">
            <div className="text-xs uppercase tracking-widest">Dal</div>
            <div className="text-3xl leading-none">1952</div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-6">
            La nostra storia
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
            Tre generazioni,
            <br />
            <em className="text-[var(--color-gold)]">una ricetta.</em>
          </h2>
          <div className="space-y-4 text-[var(--color-cream)]/80 leading-relaxed">
            <p>
              Carmela apriva il forno a Materdei ogni mattina alle 4, nel 1952.
              Suo figlio Vincenzo ha imparato da lei, senza cambiare nulla.
            </p>
            <p>
              Oggi siamo io e mio fratello Antonio, terza generazione. Stesse
              mani, stessa ricotta di bufala, stesso strutto. Solo che ora
              spediamo in tutta Italia.
            </p>
          </div>
          <a
            href="/storia"
            className="inline-block mt-8 text-[var(--color-gold)] font-medium border-b-2 border-[var(--color-gold)] pb-1 hover:text-[var(--color-cream)] hover:border-[var(--color-cream)] transition"
          >
            Leggi la storia completa →
          </a>
        </div>
      </div>
    </section>
  );
}
