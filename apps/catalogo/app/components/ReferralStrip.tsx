import Link from "next/link";

export function ReferralStrip() {
  return (
    <section
      id="referral"
      className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)] relative overflow-hidden"
    >
      <div
        className="absolute top-20 right-10 w-[300px] h-[300px] blob opacity-15"
        style={{ background: "var(--color-mint)" }}
      ></div>
      <div
        className="absolute bottom-20 left-10 w-[200px] h-[200px] blob opacity-10"
        style={{ background: "var(--color-sky)", animationDelay: "-6s" }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
            04 / Programma referral
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Porti un amico.
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              Paghi metà.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed">
            Conosci altri imprenditori che devono digitalizzare? Condividi il tuo codice. Per ogni amico che diventa cliente, il tuo prossimo rinnovo è al -50%.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10 hover:border-[var(--color-ink)] transition"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-5xl leading-none text-[var(--color-ink)]">
                  0{i + 1}
                </span>
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-full"
                  style={{
                    background: step.accentSoft,
                    color: step.accentInk,
                  }}
                >
                  {step.icon}
                </span>
              </div>
              <h3 className="font-display text-3xl text-[var(--color-ink)] leading-tight mb-3">
                {step.title}
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                {step.description}
              </p>
              <div className="mt-6 pt-4 border-t border-[var(--color-line)]">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/invita"
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
          >
            Scopri di più →
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-mono text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition px-6 py-4"
          >
            <span>Sei già cliente? Trova il tuo codice</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

type Step = {
  title: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
  accentSoft: string;
  accentInk: string;
};

const steps: Step[] = [
  {
    title: "Condividi",
    description:
      "Dalla tua dashboard copi il codice personale o il link diretto. Lo mandi a un amico imprenditore via WhatsApp, email, LinkedIn.",
    tag: "30 secondi",
    accentSoft: "var(--color-mint-soft)",
    accentInk: "var(--color-mint-ink)",
    icon: <IconShare />,
  },
  {
    title: "Si iscrive",
    description:
      "Il tuo amico si registra con il tuo codice e sceglie un piano. Vede tutto il valore di Overfy senza impegni iniziali.",
    tag: "Automatico",
    accentSoft: "var(--color-sky-soft)",
    accentInk: "var(--color-sky-ink)",
    icon: <IconUser />,
  },
  {
    title: "Tu risparmi",
    description:
      "Dopo 30 giorni dal suo primo pagamento, applichiamo lo sconto del 50% al tuo prossimo rinnovo. Automatico, nessuna scadenza.",
    tag: "-50% rinnovo",
    accentSoft: "var(--color-coral-soft)",
    accentInk: "var(--color-coral-ink)",
    icon: <IconGift />,
  },
];

/* ------------------------------------------------------------------ */

function IconShare() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconGift() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v13M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5c1.87 0 3 1.5 4.5 5 1.5-3.5 2.63-5 4.5-5a2.5 2.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
