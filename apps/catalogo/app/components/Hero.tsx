import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
      {/* Blob colorati in background */}
      <div
        className="absolute top-20 right-10 md:right-20 w-[380px] h-[380px] blob opacity-40"
        style={{ background: "var(--color-mint)" }}
      ></div>
      <div
        className="absolute top-40 left-10 md:left-20 w-[280px] h-[280px] blob opacity-30"
        style={{ background: "var(--color-sky)", animationDelay: "-5s" }}
      ></div>
      <div
        className="absolute bottom-0 right-1/3 w-[200px] h-[200px] blob opacity-25"
        style={{ background: "var(--color-coral)", animationDelay: "-10s" }}
      ></div>

      {/* Overlay noise */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-5xl mx-auto">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-4 py-2 mb-10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse"></span>
            <span className="text-[var(--color-ink-soft)]">
              Digitalizzazione su misura · Italia 2026
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.95] text-[var(--color-ink)] tracking-tight mb-10">
            Il tuo business{" "}
            <span className="inline-block bg-[var(--color-mint)] px-4 -rotate-1 rounded-sm">
              online
            </span>
            ,<br />
            <em className="font-display-italic">finalmente</em>{" "}
            <span className="inline-block text-[var(--color-coral)]">
              a portata di un click.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-[var(--color-ink-soft)] max-w-3xl mx-auto leading-relaxed mb-8">
            Siti web, e-commerce, prenotazioni, chatbot AI, app native e web app.
            Zero costi di setup. Ci occupiamo di tutto noi — tu continui a fare
            quello che sai fare meglio.
          </p>

          {/* Claim rinforzato */}
          <div
            className="inline-block bg-[var(--color-paper)] border-2 rounded-2xl px-6 py-5 md:px-8 md:py-6 mb-12 max-w-3xl"
            style={{ borderColor: "var(--color-sky)" }}
          >
            <p className="font-display text-2xl md:text-3xl leading-tight text-[var(--color-ink)]">
              <em
                className="font-display-italic"
                style={{ color: "var(--color-sky-ink)" }}
              >
                Qualsiasi cosa
              </em>{" "}
              tu voglia digitalizzare, la realizziamo.
            </p>
            <p className="text-sm font-mono text-[var(--color-muted)] mt-3 uppercase tracking-wider">
              Landing · E-commerce · Prenotazioni · Chatbot AI · Gestionali · CRM · App native iOS/Android · Web app · Automazioni · Integrazioni API
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-20">
            <Link
              href="#demo"
              className="group bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition flex items-center justify-center gap-2"
            >
              Esplora gli esempi
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <Link
              href="/contatti"
              className="bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] px-8 py-4 rounded-full text-sm font-medium hover:border-[var(--color-ink)] transition text-center"
            >
              Richiedi un consulto →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div
              className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-8 hover:border-[var(--color-coral)] transition"
              style={{ borderColor: "var(--color-coral-soft)" }}
            >
              <div className="font-display text-5xl md:text-7xl text-[var(--color-coral)] leading-none mb-3">
                ∞
              </div>
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-mono">
                Soluzioni possibili
              </div>
            </div>
            <div
              className="bg-[var(--color-paper)] border rounded-2xl p-6 md:p-8 hover:border-[var(--color-mint)] transition"
              style={{ borderColor: "var(--color-mint-soft)" }}
            >
              <div className="font-display text-5xl md:text-7xl text-[var(--color-mint-ink)] leading-none mb-3">
                €0
              </div>
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-mono">
                Costi di setup
              </div>
            </div>
            <div
              className="bg-[var(--color-paper)] border rounded-2xl p-6 md:p-8 hover:border-[var(--color-sky)] transition"
              style={{ borderColor: "var(--color-sky-soft)" }}
            >
              <div className="font-display text-4xl md:text-6xl text-[var(--color-sky-ink)] leading-none mb-3">
                48<span className="text-2xl md:text-4xl">/72h</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-mono">
                Consegna media
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
