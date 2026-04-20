import Link from "next/link";

export function FirstCall() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra-dark)] mb-6">
          — La prima chiamata —
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight mb-8">
          Cominciamo con
          <br />
          <em className="font-display-italic">venti minuti.</em>
        </h2>
        <p className="text-lg text-[var(--color-ink-soft)] leading-[1.8] mb-4">
          Prima di cominciare un percorso, ci conosciamo con una telefonata
          gratuita di circa venti minuti.
        </p>
        <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-xl mx-auto">
          Serve a capire se possiamo lavorare bene insieme. Può darsi che io non
          sia la persona giusta per te, e in quel caso ti aiuterò a trovare
          qualcuno che lo sia.
        </p>
        <div className="mt-12">
          <Link
            href="/prenota"
            className="inline-block bg-[var(--color-ink)] text-[var(--color-paper)] px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-terra-dark)] transition"
          >
            Fissa la chiamata gratuita
          </Link>
        </div>
        <p className="text-xs text-[var(--color-muted)] italic mt-6">
          Chiamata telefonica, senza video, a tua scelta di orario.
        </p>
      </div>
    </section>
  );
}
