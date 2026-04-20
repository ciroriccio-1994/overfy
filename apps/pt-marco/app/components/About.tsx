export function About() {
  return (
    <section id="chi-sono" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="aspect-square bg-gradient-to-br from-[var(--color-border)] to-[var(--color-muted)] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-bg)] opacity-30 text-sm">
              [Foto Marco ritratto]
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
            Chi sono
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 tracking-tight">
            Il tuo corpo è un
            <br />
            <span className="italic font-light">progetto a lungo termine.</span>
          </h2>
          <div className="space-y-5 text-[var(--color-muted)] leading-relaxed">
            <p>
              Ciao, sono Marco. Da 8 anni aiuto persone a Napoli a rimettersi in
              forma senza stravolgere la loro vita.
            </p>
            <p>
              Non credo nelle diete estreme né nei programmi copia-incolla. Credo
              nel lavoro costante, nei piccoli obiettivi settimanali, nel costruire
              abitudini che restano.
            </p>
            <p>
              Ogni percorso parte da un&apos;analisi completa: composizione corporea,
              stile di vita, obiettivi reali. Da lì costruiamo insieme un piano che
              si adatta ai tuoi tempi. Lavoro in presenza al Vomero e online con
              clienti in tutta Italia.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-[var(--color-border)]">
            <div>
              <div className="text-xs text-[var(--color-muted)] mb-1">Formazione</div>
              <div className="text-sm font-semibold">Scienze Motorie</div>
            </div>
            <div>
              <div className="text-xs text-[var(--color-muted)] mb-1">Certificato</div>
              <div className="text-sm font-semibold">NASM-CPT, FIF</div>
            </div>
            <div>
              <div className="text-xs text-[var(--color-muted)] mb-1">Sede</div>
              <div className="text-sm font-semibold">Vomero, Napoli</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
