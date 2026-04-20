import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-6">
            <span className="w-8 h-px bg-[var(--color-gold)]"></span>
            Dal 2008
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-[var(--color-ink)] mb-6">
            Il tuo momento,
            <br />
            <em className="text-[var(--color-gold-dark)]">
              in mani esperte.
            </em>
          </h1>
          <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed max-w-lg">
            Parrucchiere ed estetica nel cuore di Chiaia. Prenota online il tuo
            appuntamento in meno di un minuto, 24 ore su 24.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/prenota"
              className="bg-[var(--color-ink)] text-[var(--color-bg)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-gold-dark)] transition text-center"
            >
              Prenota ora →
            </Link>
            <Link
              href="/servizi"
              className="border border-[var(--color-border)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-white)] transition text-center"
            >
              Tutti i servizi
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[var(--color-border)]">
            <div>
              <div className="font-display text-3xl text-[var(--color-ink)] leading-none">
                17
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-1">
                Anni di esperienza
              </div>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)]"></div>
            <div>
              <div className="font-display text-3xl text-[var(--color-ink)] leading-none">
                4
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-1">
                Professioniste
              </div>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)]"></div>
            <div>
              <div className="font-display text-3xl text-[var(--color-ink)] leading-none">
                4.9★
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-1">
                Google Reviews
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] bg-gradient-to-br from-[var(--color-rose)] to-[var(--color-gold)] rounded-3xl overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-white)]/30 text-sm">
              [Foto interno salone]
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-white)] rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-2xl">
                  ⏱
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg text-[var(--color-ink)] leading-tight">
                    Prenota in 60 secondi
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">
                    Online, 24/7, senza telefonare
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
