export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-ink)] px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <span className="w-2 h-2 bg-[var(--color-ink)] rounded-full animate-pulse"></span>
            Accetto 3 nuovi clienti questo mese
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            Trasforma il tuo corpo in{" "}
            <span className="italic font-light">12 settimane.</span>
          </h1>
          <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed max-w-lg">
            Personal trainer certificato a Napoli. Allenamenti su misura, nutrizione
            integrata, risultati misurabili. Senza diete folli, senza palestre
            affollate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contatti"
              className="bg-[var(--color-ink)] text-[var(--color-bg)] px-7 py-4 rounded-full font-medium hover:opacity-80 transition text-center"
            >
              Prenota consulenza gratuita →
            </a>
            <a
              href="#programmi"
              className="border border-[var(--color-border)] px-7 py-4 rounded-full font-medium hover:bg-white transition text-center"
            >
              Vedi programmi
            </a>
          </div>
          <div className="flex items-center gap-6 mt-10 text-sm text-[var(--color-muted)]">
            <div>
              <div className="text-2xl font-bold text-[var(--color-ink)]">200+</div>
              <div>Clienti seguiti</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)]"></div>
            <div>
              <div className="text-2xl font-bold text-[var(--color-ink)]">8 anni</div>
              <div>Di esperienza</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)]"></div>
            <div>
              <div className="text-2xl font-bold text-[var(--color-ink)]">NASM</div>
              <div>Certificato</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-gradient-to-br from-[var(--color-ink)] to-[var(--color-muted)] rounded-3xl overflow-hidden relative">
            {/* Placeholder for AI-generated hero photo */}
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-bg)] opacity-30 text-sm">
              [Foto Marco in palestra]
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-bg)] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-xl">
                ⚡
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">
                  Consulenza gratuita, 30 min
                </div>
                <div className="text-xs text-[var(--color-muted)]">
                  Senza impegno, online o in presenza
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
