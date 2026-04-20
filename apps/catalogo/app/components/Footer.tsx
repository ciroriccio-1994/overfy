import Link from "next/link";

export function FinalCta() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Colored blobs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] blob opacity-30"
        style={{ background: "var(--color-mint)" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] blob opacity-25"
        style={{ background: "var(--color-coral)", animationDelay: "-8s" }}
      ></div>

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-8 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse"></span>
          <span className="text-[var(--color-ink-soft)]">
            Pronti a cominciare
          </span>
        </div>
        <h2 className="font-display text-6xl md:text-8xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-8">
          Parliamone.
          <br />
          <em className="font-display-italic text-[var(--color-coral)]">
            La prima call è gratuita.
          </em>
        </h2>
        <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-xl mx-auto mb-12">
          Raccontaci il tuo progetto, i tuoi obiettivi, il tuo settore. Ti
          proponiamo la soluzione più adatta senza impegno.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contatti"
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-10 py-5 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
          >
            Richiedi consulto gratuito →
          </Link>
          <a
            href="https://wa.me/393331234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] px-10 py-5 rounded-full text-sm font-medium hover:border-[var(--color-ink)] transition"
          >
            Scrivici su WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]/60 px-6 py-12 border-t border-[var(--color-line)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]"></span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] -ml-0.5"></span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-sky)] -ml-0.5"></span>
            </div>
            <span className="font-display text-lg text-[var(--color-paper)]">
              Catalogo Soluzioni
            </span>
          </div>
          <div className="flex gap-6 text-sm font-mono">
            <Link
              href="/#demo"
              className="hover:text-[var(--color-mint)] transition"
            >
              I lavori
            </Link>
            <Link
              href="/#processo"
              className="hover:text-[var(--color-mint)] transition"
            >
              Come lavoriamo
            </Link>
            <Link
              href="/contatti"
              className="hover:text-[var(--color-mint)] transition"
            >
              Contatti
            </Link>
          </div>
        </div>
        <div className="text-xs font-mono text-[var(--color-paper)]/40 text-center md:text-left mt-8 pt-8 border-t border-[var(--color-paper)]/10">
          © 2026 · P.IVA 06789012345 · Napoli, Italia · Catalogo Soluzioni
        </div>
      </div>
    </footer>
  );
}
