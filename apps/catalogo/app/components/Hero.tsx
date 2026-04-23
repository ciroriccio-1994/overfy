import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
      {/* Blob colorati — mantenuti, sono l'identità visiva */}
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

      {/* Texture rumore */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge: claim diretti, non descrizione generica */}
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-4 py-2 mb-10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse"></span>
            <span className="text-[var(--color-ink-soft)]">
              <span className="font-semibold text-[var(--color-ink)]">
                Overfy
              </span>
              {" "}· Consegna 48h · Tutto incluso
            </span>
          </div>

          {/* TITOLO — messaggio chiaro, diretto, in 2 atti */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] text-[var(--color-ink)] tracking-tight mb-10">
            La tua attività online
            <br />
            in{" "}
            <span className="inline-block bg-[var(--color-mint)] px-4 -rotate-1 rounded-sm">
              48 ore
            </span>
            .<br />
            <em
              className="font-display-italic"
              style={{ color: "var(--color-coral)" }}
            >
              Da lì, ci pensiamo noi.
            </em>
          </h1>

          {/* SOTTOTITOLO — asciutto, concreto */}
          <p className="text-lg md:text-2xl text-[var(--color-ink-soft)] max-w-3xl mx-auto leading-relaxed mb-14">
            Siti, e-commerce, chatbot AI, automazioni. Canone mensile, installazione gratuita, disdici quando vuoi.
            <br className="hidden md:block" />
            <span className="font-display-italic text-[var(--color-ink)]">
              {" "}Zero contratti capestro.
            </span>
          </p>

          {/* CTA — primary "Prenota call" (azione concreta), secondary "Vedi esempi" */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href="/contatti"
              className="group bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition flex items-center justify-center gap-2 shadow-lg"
            >
              Prenota una call gratuita
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <Link
              href="#demo"
              className="bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] px-8 py-4 rounded-full text-sm font-medium hover:border-[var(--color-ink)] transition text-center"
            >
              Vedi gli esempi
            </Link>
          </div>

          {/* Micro-trust sotto CTA */}
          <p className="text-xs font-mono text-[var(--color-muted)] mb-20">
            30 minuti · nessun impegno · via Google Meet o in persona (Napoli)
          </p>

          {/* PILASTRI — 3 voci in riga, minimal, niente maxi-card */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-mono">
            <Pillar
              icon={<IconBolt />}
              label="Consegna in 48h"
              accent="var(--color-coral-ink)"
            />
            <span className="text-[var(--color-muted)] hidden sm:inline">·</span>
            <Pillar
              icon={<IconWallet />}
              label="Zero costi di setup"
              accent="var(--color-mint-ink)"
            />
            <span className="text-[var(--color-muted)] hidden sm:inline">·</span>
            <Pillar
              icon={<IconHand />}
              label="Gestito interamente da noi"
              accent="var(--color-sky-ink)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* SUPPORTO                                                                    */
/* ========================================================================== */

function Pillar({
  icon,
  label,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  accent: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[var(--color-ink)]">
      <span style={{ color: accent }} className="flex-shrink-0">
        {icon}
      </span>
      <span className="uppercase tracking-wider text-xs">{label}</span>
    </span>
  );
}

function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 7H5a2 2 0 00-2 2v10a2 2 0 002 2h15a2 2 0 002-2V9a2 2 0 00-2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M19 7V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2M16 14h2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHand() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 11V6a1.5 1.5 0 013 0v5M12 11V4.5a1.5 1.5 0 013 0V11M15 11V6.5a1.5 1.5 0 013 0v7.5a6 6 0 01-6 6 6 6 0 01-6-6v-3a1.5 1.5 0 013 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
