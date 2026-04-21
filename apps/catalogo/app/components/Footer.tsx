import Link from "next/link";

export function FinalCta() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--color-ink)" }}></div>
      <div className="absolute top-10 left-10 w-[400px] h-[400px] blob opacity-20" style={{ background: "var(--color-mint)" }}></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] blob opacity-15" style={{ background: "var(--color-coral)", animationDelay: "-8s" }}></div>

      <div className="max-w-5xl mx-auto relative text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-8 text-xs font-mono text-white/80">
          <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse"></span>
          <span>Pronti a partire · Disponibili oggi</span>
        </div>

        <h2 className="font-display text-5xl md:text-8xl leading-[0.95] text-white tracking-tight mb-8">
          Non aspettare
          <br />
          <em className="font-display-italic" style={{ color: "var(--color-mint)" }}>
            altri 6 mesi.
          </em>
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          Ogni giorno senza il tuo business online è un giorno in cui i tuoi
          clienti si rivolgono a chi è già presente. Partiamo subito.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contatti"
            className="bg-white text-[var(--color-ink)] px-10 py-5 rounded-full text-base font-medium hover:bg-[var(--color-mint)] transition"
          >
            Parliamo oggi →
          </Link>
          <a
            href="mailto:info@overfydigital.com"
            className="border border-white/30 text-white px-10 py-5 rounded-full text-base font-medium hover:bg-white/10 transition"
          >
            info@overfydigital.com
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-soft)] border-t border-[var(--color-line)] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <OverfyMark />
              <span className="font-display text-2xl text-[var(--color-ink)] tracking-tight">
                Overfy
              </span>
            </Link>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed max-w-sm mb-4">
              Il tuo business online in 48 ore. Un abbonamento, tutto incluso.
              Digitalizzazione su misura per attività italiane.
            </p>
            <p className="text-xs font-mono text-[var(--color-muted)]">
              Napoli, Italia · 2026
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Home
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
              <li><Link href="/#demo" className="hover:text-[var(--color-ink)] transition">Esempi</Link></li>
              <li><Link href="/#come-funziona" className="hover:text-[var(--color-ink)] transition">Come funziona</Link></li>
              <li><Link href="/#pacchetti" className="hover:text-[var(--color-ink)] transition">Pacchetti</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Approfondisci
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
              <li><Link href="/esempi" className="hover:text-[var(--color-ink)] transition">Tutti gli esempi</Link></li>
              <li><Link href="/per-aziende" className="hover:text-[var(--color-ink)] transition">Per aziende</Link></li>
              <li><Link href="/chatbot" className="hover:text-[var(--color-ink)] transition">Il chatbot AI</Link></li>
              <li><Link href="/modello" className="hover:text-[var(--color-ink)] transition">Il modello</Link></li>
              <li><Link href="/dettagli" className="hover:text-[var(--color-ink)] transition">Dettagli e regole</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Contatti
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
              <li><a href="mailto:info@overfydigital.com" className="hover:text-[var(--color-ink)] transition">info@overfydigital.com</a></li>
              <li><Link href="/contatti" className="hover:text-[var(--color-ink)] transition">Form contatti</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-line)] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-xs text-[var(--color-muted)]">
            © 2026 Overfy. Tutti i diritti riservati.
          </p>
          <p className="text-xs font-mono text-[var(--color-muted)] italic">
            Il tuo business, un livello sopra.
          </p>
        </div>
      </div>
    </footer>
  );
}

function OverfyMark() {
  return (
    <span
      className="relative inline-flex items-center"
      aria-hidden="true"
      style={{ width: 40, height: 18 }}
    >
      <span className="flex gap-0.5 absolute left-0 top-1/2 -translate-y-1/2">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-coral)]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-mint)] -ml-1"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sky)] -ml-1"></span>
      </span>
      <svg
        viewBox="0 0 40 18"
        width="40"
        height="18"
        className="absolute left-0 top-0 pointer-events-none overflow-visible"
      >
        <defs>
          <linearGradient id="overfy-mark-arrow-footer" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-mint)" />
            <stop offset="100%" stopColor="var(--color-sky)" />
          </linearGradient>
        </defs>
        <path
          d="M 17 13 Q 26 13 32 6"
          fill="none"
          stroke="url(#overfy-mark-arrow-footer)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 32 6 L 28.5 5 M 32 6 L 31.5 9.5"
          fill="none"
          stroke="url(#overfy-mark-arrow-footer)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
