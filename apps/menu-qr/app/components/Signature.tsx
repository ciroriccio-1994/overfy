export function Signature() {
  return (
    <section className="relative">
      {/* Full-bleed image */}
      <div className="relative aspect-[3/2] md:aspect-[21/9] w-full overflow-hidden bg-[var(--color-ink)]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at center, rgba(168, 74, 42, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 30% 40%, rgba(250, 246, 237, 0.08) 0%, transparent 40%)
            `,
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60%] md:w-[38%] aspect-square rounded-full bg-gradient-radial from-[var(--color-accent-soft)]/50 via-[var(--color-accent)]/30 to-transparent flex items-center justify-center">
            <div className="w-[75%] aspect-square rounded-full bg-gradient-to-br from-[var(--color-accent)]/40 via-[var(--color-ink-soft)]/60 to-[var(--color-ink)]/80 shadow-2xl border border-[var(--color-line)]/10"></div>
          </div>
        </div>
        {/* Overlay label */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[var(--color-paper)]/80">
          <div className="text-[10px] uppercase tracking-[0.4em] mb-1">
            [ foto pizza signature in alta risoluzione ]
          </div>
        </div>
      </div>

      {/* Testo sotto */}
      <div className="px-6 py-20 md:py-28 bg-[var(--color-paper)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-6">
            La nostra signature
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight mb-6">
            &ldquo;<em className="font-display-italic">'A Figlia</em>&rdquo;
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed mb-2">
            Fiordilatte di Agerola, provola affumicata di bufalo campano,
            prosciutto crudo di Parma stagionato ventiquattro mesi, rucola del
            Vesuvio, scaglie di Grana Padano.
          </p>
          <p className="text-sm text-[var(--color-muted)] italic mt-4">
            La ricetta che porta il nome del locale. Invariata dal 1989.
          </p>
        </div>
      </div>
    </section>
  );
}
