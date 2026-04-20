import Link from "next/link";

export function Hero() {
  return (
    <section className="relative px-6 py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-6">
            <span className="w-8 h-px bg-[var(--color-gold)]"></span>
            Dal 1952 a Materdei
          </div>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-[var(--color-coffee)] mb-6">
            Le sfogliatelle
            <br />
            <em className="text-[var(--color-wine)]">arrivano a casa tua</em>
            <br />
            come appena sfornate.
          </h1>
          <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed max-w-lg">
            Tre generazioni di pasticceria napoletana. Spedizione refrigerata in
            24h in tutta Italia. La tradizione del forno di famiglia, a casa tua.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/negozio"
              className="bg-[var(--color-coffee)] text-[var(--color-cream)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-wine)] transition text-center"
            >
              Vai al negozio →
            </Link>
            <Link
              href="/storia"
              className="border border-[var(--color-coffee)] text-[var(--color-coffee)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-ivory)] transition text-center"
            >
              La nostra storia
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <span className="text-xl">🌡️</span>
              <div>
                <div className="font-semibold text-[var(--color-coffee)]">
                  Refrigerato
                </div>
                <div className="text-xs">Arriva fresco</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <span className="text-xl">⚡</span>
              <div>
                <div className="font-semibold text-[var(--color-coffee)]">
                  24h
                </div>
                <div className="text-xs">In tutta Italia</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <span className="text-xl">⭐</span>
              <div>
                <div className="font-semibold text-[var(--color-coffee)]">
                  4.9/5
                </div>
                <div className="text-xs">+2.000 recensioni</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] bg-gradient-to-br from-[var(--color-caramel)] to-[var(--color-coffee)] rounded-3xl overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-cream)]/30 text-sm">
              [Foto vetrina pasticceria]
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-ivory)] rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-2xl">
                  🎂
                </div>
                <div className="flex-1">
                  <div className="font-serif text-lg text-[var(--color-coffee)]">
                    Box Degustazione
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">
                    7 dolci assortiti, spedizione inclusa
                  </div>
                </div>
                <div className="font-serif text-xl text-[var(--color-wine)]">
                  €48
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 bg-[var(--color-wine)] text-[var(--color-cream)] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            ✨ Premio 2019
          </div>
        </div>
      </div>
    </section>
  );
}
