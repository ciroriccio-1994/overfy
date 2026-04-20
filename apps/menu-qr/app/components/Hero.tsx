export function Hero() {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-6 relative">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-10">
          — Napoli · Dal 1989 —
        </div>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-[var(--color-ink)]">
          La pizza,
          <br />
          <em className="font-display-italic text-[var(--color-accent)]">
            come una volta.
          </em>
        </h1>

        <div className="w-16 h-px bg-[var(--color-line)] mx-auto my-12"></div>

        <p className="text-lg md:text-xl text-[var(--color-ink-soft)] max-w-2xl mx-auto leading-relaxed">
          Tre generazioni nel cuore del centro storico. Impasto lievitato
          trentasei ore, forno a legna a quattrocentoottantacinque gradi,
          ingredienti scelti dalle campagne del Vesuvio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-12">
          <a
            href="tel:+390811234567"
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition"
          >
            Prenota un tavolo
          </a>
          <a
            href="#menu-section"
            className="border border-[var(--color-ink)] text-[var(--color-ink)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition"
          >
            Scopri il menu
          </a>
        </div>
      </div>
    </section>
  );
}
