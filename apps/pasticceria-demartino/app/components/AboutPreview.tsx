export function AboutPreview() {
  return (
    <section className="py-20 px-6 bg-[var(--color-ivory)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Chi siamo
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-coffee)] leading-tight">
            Una pasticceria di <em className="text-[var(--color-wine)]">famiglia</em>,
            <br />
            nel cuore di Napoli.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {/* Foto principale più grande a sinistra */}
          <div className="md:col-span-2 aspect-[16/10] bg-gradient-to-br from-[var(--color-caramel)] to-[var(--color-wine)] rounded-3xl overflow-hidden relative shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-cream)]/30 text-sm">
              [Foto esterno/interno pasticceria]
            </div>
          </div>
          {/* Stack di due foto piccole a destra */}
          <div className="grid grid-rows-2 gap-4">
            <div className="bg-gradient-to-br from-[var(--color-gold)]/60 to-[var(--color-caramel)] rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-cream)]/30 text-xs">
                [Mani che impastano]
              </div>
            </div>
            <div className="bg-gradient-to-br from-[var(--color-wine)] to-[var(--color-coffee)] rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-cream)]/30 text-xs">
                [Dolci nel forno]
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-5 text-[var(--color-muted)] leading-relaxed">
          <p className="text-lg">
            Siamo Antonio e Ciro, terza generazione di pasticcieri a Materdei.
            Abbiamo imparato tutto da nostro padre Vincenzo, che a sua volta ha
            imparato dalla nonna Carmela, fondatrice del forno nel 1952.
          </p>
          <p>
            Le ricette sono rimaste identiche per 70 anni. La ricotta di bufala
            è ancora quella dell&apos;azienda Conforto, lo strutto viene dalle
            stesse campagne di Caserta, i canditi li facciamo in casa con le
            arance siciliane. L&apos;unica cosa che è cambiata è che ora i nostri
            dolci arrivano anche a Milano, Torino, Bolzano. Sempre freschi,
            sempre come li faceva Carmela.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-12 border-t border-[var(--color-border)] max-w-4xl mx-auto">
          <div className="text-center">
            <div className="font-serif text-4xl text-[var(--color-coffee)] mb-1">
              73
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Anni di tradizione
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl text-[var(--color-coffee)] mb-1">
              3
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Generazioni
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl text-[var(--color-coffee)] mb-1">
              +12k
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Spedizioni/anno
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl text-[var(--color-coffee)] mb-1">
              4.9
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Valutazione
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
