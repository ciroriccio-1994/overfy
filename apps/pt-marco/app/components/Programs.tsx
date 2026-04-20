const programs = [
  {
    id: "start",
    name: "Start Fitness",
    duration: "8 settimane",
    price: "120",
    badge: null,
    description:
      "Per chi riparte da zero o torna ad allenarsi dopo anni di pausa.",
    features: [
      "2 allenamenti personalizzati a settimana",
      "Linee guida alimentari",
      "Check bisettimanali con Marco",
      "Accesso all'app di tracking",
    ],
  },
  {
    id: "recomp",
    name: "Ricomposizione Corporea",
    duration: "12 settimane",
    price: "180",
    badge: "Il più scelto",
    description:
      "Perdi grasso, costruisci muscolo. Il metodo completo per cambiare davvero.",
    features: [
      "3 allenamenti personalizzati a settimana",
      "Piano nutrizionale dedicato",
      "Check settimanali con Marco",
      "App tracking + analisi composizione",
      "Supporto WhatsApp dedicato",
    ],
  },
  {
    id: "athletic",
    name: "Preparazione Atletica",
    duration: "Flessibile",
    price: "240",
    badge: null,
    description:
      "Per amatori agonistici, runner, sportivi che cercano performance reali.",
    features: [
      "4 allenamenti a settimana periodizzati",
      "Protocollo nutrizione sportiva",
      "Piano gare e peaking",
      "Recovery protocol avanzato",
      "Analisi video movimento",
    ],
  },
];

export function Programs() {
  return (
    <section id="programmi" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
            Programmi
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            Scegli il percorso che
            <br />
            <span className="italic font-light">fa per te.</span>
          </h2>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto">
            Tre programmi costruiti per momenti diversi della tua vita. Tutti
            includono consulenza iniziale gratuita e una settimana di prova.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-3xl p-8 border transition hover:scale-[1.02] ${
                p.badge
                  ? "bg-[var(--color-ink)] text-[var(--color-bg)] border-[var(--color-ink)] shadow-2xl"
                  : "bg-white border-[var(--color-border)]"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-8 bg-[var(--color-accent)] text-[var(--color-ink)] px-3 py-1 rounded-full text-xs font-bold">
                  {p.badge}
                </div>
              )}
              <div className="mb-6">
                <div
                  className={`text-xs uppercase tracking-wider mb-2 ${
                    p.badge ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
                  }`}
                >
                  {p.duration}
                </div>
                <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    p.badge ? "text-white/70" : "text-[var(--color-muted)]"
                  }`}
                >
                  {p.description}
                </p>
              </div>

              <div className="mb-6 pb-6 border-b border-current/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">€{p.price}</span>
                  <span
                    className={`text-sm ${
                      p.badge ? "text-white/60" : "text-[var(--color-muted)]"
                    }`}
                  >
                    /mese
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 ${
                        p.badge ? "text-[var(--color-accent)]" : "text-[var(--color-ink)]"
                      }`}
                    >
                      ✓
                    </span>
                    <span className={p.badge ? "text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contatti"
                className={`block text-center py-3 rounded-full font-medium transition ${
                  p.badge
                    ? "bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent-dark)]"
                    : "bg-[var(--color-ink)] text-[var(--color-bg)] hover:opacity-80"
                }`}
              >
                Inizia ora
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
