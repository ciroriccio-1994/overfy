import Link from "next/link";

export function ComeFunziona() {
  return (
    <section
      id="come-funziona"
      className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)] relative overflow-hidden"
    >
      <div
        className="absolute top-20 left-10 w-[300px] h-[300px] blob opacity-15"
        style={{ background: "var(--color-mint)" }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
            02 / Come funziona
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Tre passaggi.
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              Nessuna complicazione.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed">
            Niente preventivi infiniti, niente mesi di attesa. Dal primo
            contatto al sito live passano 48 ore.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10 hover:border-[var(--color-ink)] transition"
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-display text-5xl leading-none text-[var(--color-ink)]"
                >
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
                  {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/dettagli"
            className="inline-flex items-center gap-2 text-sm font-mono text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            <span>
              Vuoi tutti i dettagli? Traffico, SLA, proprietà, regole
            </span>
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
  duration: string;
  icon: React.ReactNode;
  accentSoft: string;
  accentInk: string;
};

const steps: Step[] = [
  {
    title: "Parliamo",
    description:
      "Una call di 30 minuti. Capiamo cosa ti serve, ti mostriamo cosa possiamo fare, scegliamo insieme il piano.",
    duration: "30 minuti",
    accentSoft: "var(--color-coral-soft)",
    accentInk: "var(--color-coral-ink)",
    icon: <IconChat />,
  },
  {
    title: "Costruiamo",
    description:
      "Ci mandi foto, testi e dati della tua attività. Noi costruiamo il sito, l’e-commerce, le prenotazioni. Tu non tocchi nulla.",
    duration: "24-48 ore",
    accentSoft: "var(--color-mint-soft)",
    accentInk: "var(--color-mint-ink)",
    icon: <IconBuild />,
  },
  {
    title: "Sei online",
    description:
      "Il tuo business è operativo. Da lì ci pensiamo noi: aggiornamenti, modifiche, hosting, problemi. Tu fai il tuo lavoro.",
    duration: "Per sempre",
    accentSoft: "var(--color-sky-soft)",
    accentInk: "var(--color-sky-ink)",
    icon: <IconRocket />,
  },
];

/* ------------------------------------------------------------------ */

function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBuild() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
