import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-40 pb-20 md:pt-48 md:pb-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-[var(--color-sage-dark)]"></span>
            Studio di odontoiatria
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[var(--color-ink)] mb-8">
            Un sorriso sano,
            <br />
            <em className="font-display-italic text-[var(--color-sage-dark)]">
              senza ansia.
            </em>
          </h1>

          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-xl mb-10">
            A Posillipo, uno studio dove la tecnologia più avanzata incontra la
            cura umana. Prima visita gratuita, preventivo trasparente, percorsi
            su misura.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/prenota"
              className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-sage-dark)] transition text-center"
            >
              Prenota la prima visita
            </Link>
            <a
              href="tel:+390812345678"
              className="border border-[var(--color-ink)] text-[var(--color-ink)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition text-center"
            >
              Chiama · 081 234 5678
            </a>
          </div>

          <div className="flex items-center gap-8 mt-14 pt-8 border-t border-[var(--color-line)]">
            <div>
              <div className="font-display text-3xl text-[var(--color-sage-dark)] leading-none">
                20
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-1">
                Anni di esperienza
              </div>
            </div>
            <div className="w-px h-12 bg-[var(--color-line)]"></div>
            <div>
              <div className="font-display text-3xl text-[var(--color-sage-dark)] leading-none">
                4.9
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-1">
                Google · 230 recensioni
              </div>
            </div>
            <div className="w-px h-12 bg-[var(--color-line)]"></div>
            <div>
              <div className="font-display text-3xl text-[var(--color-sage-dark)] leading-none">
                800+
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-1">
                Impianti eseguiti
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] rounded-sm overflow-hidden relative bg-gradient-to-br from-[var(--color-sage)]/30 via-[var(--color-bg)] to-[var(--color-bg-soft)]">
            {/* Pattern decorativo */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, rgba(168, 184, 160, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(184, 149, 106, 0.3) 0%, transparent 50%)`,
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-muted)]/40 text-xs uppercase tracking-[0.3em]">
              [ Foto studio / dottoressa ]
            </div>
            {/* Badge elegante */}
            <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-paper)]/95 backdrop-blur-sm p-5 rounded-sm border border-[var(--color-line)]">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-sage-dark)] mb-2">
                La prima visita
              </div>
              <div className="font-display text-xl text-[var(--color-ink)] leading-tight">
                Gratuita e <em className="font-display-italic">senza impegno.</em>
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-2">
                Include radiografia panoramica e preventivo personalizzato.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
