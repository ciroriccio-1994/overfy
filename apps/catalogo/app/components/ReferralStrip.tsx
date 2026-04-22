import Link from "next/link";

export function ReferralStrip() {
  return (
    <section
      id="programmi"
      className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)] relative overflow-hidden"
    >
      <div
        className="absolute top-20 right-10 w-[280px] h-[280px] blob opacity-15"
        style={{ background: "var(--color-mint)" }}
      ></div>
      <div
        className="absolute bottom-20 left-10 w-[200px] h-[200px] blob opacity-10"
        style={{ background: "var(--color-coral)", animationDelay: "-6s" }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
            04 / Guadagna con Overfy
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Due modi.
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              Per guadagnare insieme a noi.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed">
            Sei già cliente o hai una rete di imprenditori. In entrambi i casi, c&apos;è un programma per te.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {programs.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10 hover:border-[var(--color-ink)] transition block"
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: p.accentSoft, color: p.accentInk }}
                >
                  {p.audience}
                </span>
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ background: p.accentSoft, color: p.accentInk }}
                >
                  {p.icon}
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl text-[var(--color-ink)] leading-tight mb-2">
                {p.title}
              </h3>

              <div
                className="font-display-italic text-2xl md:text-3xl mb-4"
                style={{ color: p.accentInk }}
              >
                {p.reward}
              </div>

              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
                {p.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-mono text-[var(--color-ink)] group-hover:gap-3 transition-all">
                <span>{p.cta}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

type Program = {
  audience: string;
  title: string;
  reward: string;
  description: string;
  cta: string;
  href: string;
  accentSoft: string;
  accentInk: string;
  icon: React.ReactNode;
};

const programs: Program[] = [
  {
    audience: "Per i clienti",
    title: "Invita un amico",
    reward: "-50% sul prossimo rinnovo",
    description:
      "Sei già cliente Overfy? Porta un altro imprenditore e ricevi il 50% di sconto sul tuo prossimo rinnovo. Automatico, nessuna scadenza.",
    cta: "Scopri il referral",
    href: "/invita",
    accentSoft: "var(--color-mint-soft)",
    accentInk: "var(--color-mint-ink)",
    icon: <IconGift />,
  },
  {
    audience: "Per chi ha una rete",
    title: "Diventa agent",
    reward: "Fino a €300 per cliente",
    description:
      "Conosci commercianti, ristoratori, professionisti? Porta nuovi clienti su Overfy e ricevi commissioni in euro, pagate via bonifico.",
    cta: "Scopri il programma agent",
    href: "/agenti",
    accentSoft: "var(--color-coral-soft)",
    accentInk: "var(--color-coral-ink)",
    icon: <IconHandshake />,
  },
];

/* ------------------------------------------------------------------ */

function IconGift() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8v13M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 8a2.5 2.5 0 0 1 0-5c1.87 0 3 1.5 4.5 5 1.5-3.5 2.63-5 4.5-5a2.5 2.5 0 0 1 0 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m11 17 2 2a1 1 0 0 0 3-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 0 1-1.41-1.41l2.62-2.62a2.41 2.41 0 0 1 3.4 0l.88.88a2 2 0 0 0 2.83 0l.88-.88"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m21 3-3 3M3 21l3-3M10 7l-1 1-3-3 1-1a2.83 2.83 0 0 1 4 0z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
