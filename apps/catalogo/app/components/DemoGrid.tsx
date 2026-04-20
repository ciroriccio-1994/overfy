"use client";

import Link from "next/link";
import { demos, tierLabels, tierColors } from "@/lib/demos";

export function DemoGrid() {
  return (
    <section id="demo" className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
            <span className="text-[var(--color-ink-soft)]">01 / Alcuni esempi</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Sei esempi reali,
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              infinite possibilità.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl mb-4">
            Questi sono <strong>solo esempi</strong> di quello che possiamo
            realizzare. Puoi aprirli dal vivo, esplorarli, prendere ispirazione —
            ma sappi che la tua soluzione sarà costruita su misura per te.
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
            style={{
              background: "var(--color-coral-soft)",
              color: "var(--color-coral-ink)",
            }}
          >
            <span>→</span>
            <span>Non ti ritrovi in nessuno di questi? Scorri in fondo.</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((demo) => {
            const tc = tierColors[demo.tier];
            return (
              <Link
                key={demo.slug}
                href={`/demo/${demo.slug}`}
                className="group bg-[var(--color-paper)] rounded-2xl border border-[var(--color-line)] overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col"
                style={{ borderColor: "var(--color-line)" }}
              >
                <div
                  className="aspect-[16/10] relative overflow-hidden flex items-center justify-center"
                  style={{ background: tc.bg }}
                >
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                    {demo.preview}
                  </div>

                  <div
                    className="absolute top-4 left-4 bg-[var(--color-paper)] text-xs font-mono px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: tc.accent,
                      color: tc.ink,
                    }}
                  >
                    {tierLabels[demo.tier]}
                  </div>

                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: tc.accent, color: "white" }}
                  >
                    →
                  </div>
                </div>

                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                    {demo.category}
                  </div>
                  <h3 className="font-display text-3xl text-[var(--color-ink)] mb-1 leading-tight">
                    {demo.title}
                  </h3>
                  <div className="text-sm italic text-[var(--color-muted)] mb-4">
                    {demo.subtitle}
                  </div>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-5 flex-1">
                    {demo.description}
                  </p>

                  {demo.addons && demo.addons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {demo.addons.map((a) => (
                        <span
                          key={a}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-mono"
                          style={{
                            background: "var(--color-mint-soft)",
                            color: "var(--color-mint-ink)",
                          }}
                        >
                          + {a}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-line)]">
                    <span className="text-xs font-mono text-[var(--color-muted)]">
                      Scopri di più
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: tc.ink }}
                    >
                      Apri →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sezione "Molto altro" sotto la griglia demo */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-12 border-2 relative overflow-hidden"
            style={{
              background: "var(--color-paper)",
              borderColor: "var(--color-coral)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-[300px] h-[300px] blob opacity-15 -translate-y-1/3 translate-x-1/3"
              style={{ background: "var(--color-coral)" }}
            ></div>

            <div className="relative grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-6 text-xs font-mono"
                  style={{
                    background: "var(--color-coral-soft)",
                    color: "var(--color-coral-ink)",
                  }}
                >
                  <span>Molto di più</span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl leading-[1] text-[var(--color-ink)] mb-4">
                  Cerchi
                  <br />
                  <em
                    className="font-display-italic"
                    style={{ color: "var(--color-coral-ink)" }}
                  >
                    qualcosa di diverso?
                  </em>
                </h3>
                <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
                  I demo che vedi sono solo la punta dell&apos;iceberg.
                  Realizziamo praticamente qualsiasi soluzione digitale tu
                  possa immaginare per la tua attività.
                </p>
                <Link
                  href="/contatti"
                  className="inline-block bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--color-coral-ink)] transition"
                >
                  Raccontaci la tua idea →
                </Link>
              </div>

              <div className="md:col-span-7">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: "App native", sub: "iOS + Android" },
                    { title: "Web app", sub: "gestionali, dashboard" },
                    { title: "CRM su misura", sub: "clienti, lead, pipeline" },
                    { title: "Sistemi di fatturazione", sub: "integrati" },
                    { title: "Chatbot AI", sub: "addestrati sul tuo business" },
                    { title: "Automazioni", sub: "Zapier, Make, custom" },
                    { title: "Integrazioni API", sub: "connetti i tuoi tool" },
                    { title: "Portali clienti", sub: "aree riservate, login" },
                    { title: "Booking complessi", sub: "multi-location, multi-staff" },
                    { title: "Marketplace", sub: "multi-vendor" },
                    { title: "Sistemi gestionali", sub: "magazzino, ordini" },
                    { title: "E-learning", sub: "corsi, video, progressi" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-[var(--color-bg-soft)] border border-[var(--color-line)] rounded-xl p-4 hover:border-[var(--color-coral)] transition"
                    >
                      <div className="text-sm font-medium text-[var(--color-ink)] mb-0.5">
                        {item.title}
                      </div>
                      <div className="text-xs font-mono text-[var(--color-muted)]">
                        {item.sub}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-mono text-[var(--color-muted)] italic mt-4 text-center">
                  ...e tutto quello che ancora non abbiamo elencato.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
