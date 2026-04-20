import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-40 md:pt-48 pb-20 md:pb-28 px-6 relative overflow-hidden">
      {/* Cerchio terracotta decorativo che respira */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[var(--color-terra)]/25 via-[var(--color-terra)]/10 to-transparent blur-3xl breathe pointer-events-none"></div>
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gradient-radial from-[var(--color-moss)]/15 via-[var(--color-moss)]/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra-dark)] mb-10">
          — Psicoterapia · Napoli · Online —
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] text-[var(--color-ink)] max-w-4xl">
          Uno spazio
          <br />
          per
          <span className="font-display-italic text-[var(--color-terra-dark)]"> ritrovarti</span>,
          <br />
          quando ti
          <span className="font-display-italic"> senti persa</span>.
        </h1>

        <div className="w-16 h-px bg-[var(--color-line)] my-12"></div>

        <p className="text-lg md:text-xl text-[var(--color-ink-soft)] max-w-2xl leading-[1.8]">
          Sono Chiara, psicoterapeuta a Chiaia. Accompagno chi sta attraversando
          un momento difficile — ansia, attacchi di panico, relazioni, lutti,
          transizioni — ad ascoltarsi con più gentilezza.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Link
            href="/prenota"
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-terra-dark)] transition text-center"
          >
            Prima chiamata gratuita
          </Link>
          <Link
            href="/percorso"
            className="border border-[var(--color-ink)] text-[var(--color-ink)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)] transition text-center"
          >
            Conosci il percorso
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-line)] max-w-xl">
          <p className="text-sm italic text-[var(--color-muted)] leading-relaxed">
            &laquo;Non servono parole per cominciare. Serve solo il coraggio di
            iniziare a dirsele, finalmente.&raquo;
          </p>
        </div>
      </div>
    </section>
  );
}
