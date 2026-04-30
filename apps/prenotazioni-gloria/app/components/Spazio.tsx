import { Ornament } from "./Icon";

/**
 * Galleria foto della sezione "Il salone".
 * Photo IDs Pexels verificati (URL pattern stabile).
 */
const photos = [
  {
    src: "https://images.pexels.com/photos/5069494/pexels-photo-5069494.jpeg?auto=compress&cs=tinysrgb&w=900",
    eyebrow: "Atmosfera",
    title: "Jazz, cipresso e luce calda",
    body: "Una colonna sonora che cambia con le ore. Diffusori al bergamotto e al cipresso. Lampade a luce ambrata, mai bianca.",
    alt: "Atmosfera del salone — luce calda e dettagli",
  },
  {
    src: "https://images.pexels.com/photos/7755223/pexels-photo-7755223.jpeg?auto=compress&cs=tinysrgb&w=900",
    eyebrow: "Lo spazio",
    title: "120m² nel cuore di Chiaia",
    body: "Sei postazioni ben distanziate, una saletta privata per i trattamenti viso, un angolo lettura per chi attende. Wi-Fi e caffè della Riviera.",
    alt: "Postazione di lavoro nel Salone Gloria",
  },
  {
    src: "https://images.pexels.com/photos/7446671/pexels-photo-7446671.jpeg?auto=compress&cs=tinysrgb&w=900",
    eyebrow: "Filosofia",
    title: "Slow beauty, mai rush.",
    body: "Mai due appuntamenti sovrapposti. Il tempo che ti diciamo è il tempo che dedichiamo a te, senza eccezioni. Niente upselling.",
    alt: "Trattamento viso curato",
  },
];

export function Spazio() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10 bg-[var(--color-ink)] text-[var(--color-bg)] relative overflow-hidden">
      {/* Texture decorativa di sfondo */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "8px 8px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-gold-soft)] mb-5">
            Il salone
          </div>
          <h2 className="font-display-light text-4xl md:text-6xl text-[var(--color-bg)] leading-[1.05]">
            Più di un appuntamento.
            <br />
            <span className="italic font-medium text-[var(--color-gold-soft)]">
              Un&apos;ora per te.
            </span>
          </h2>
          <Ornament className="text-[var(--color-gold-soft)] mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {photos.map((p, i) => (
            <article
              key={i}
              className="group relative overflow-hidden bg-[var(--color-ink-soft)] aspect-[3/4] flex flex-col justify-end"
            >
              {/* Foto fondo */}
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay scuro per leggibilità del testo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/50 to-transparent" />

              {/* Numero progressivo */}
              <div className="absolute top-6 left-6 font-display italic text-5xl text-[var(--color-gold-soft)] leading-none">
                .0{i + 1}
              </div>

              {/* Cornice decorativa */}
              <div className="absolute inset-3 border border-[var(--color-bg)]/15 pointer-events-none" />

              {/* Testo */}
              <div className="relative p-7 md:p-8">
                <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold-soft)] mb-3">
                  {p.eyebrow}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-[var(--color-bg)] leading-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--color-bg)]/80 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
