"use client";

import Link from "next/link";
import { demos } from "@/lib/demos";

type DemoGridProps = {
  showAll?: boolean;
};

export function DemoGrid({ showAll = false }: DemoGridProps) {
  const visibleDemos = showAll ? demos : demos.slice(0, 4);

  return (
    <section id="demo" className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)]">
      <div className="max-w-7xl mx-auto">
        {!showAll && (
          <div className="mb-16 md:mb-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
              <span className="text-[var(--color-ink-soft)]">01 / Esempi</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Quattro esempi reali.
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">
                Infinite possibilità.
              </em>
            </h2>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
              Aprili dal vivo, esplorali, prendi ispirazione. La tua soluzione
              la costruiamo su misura per te.
            </p>
          </div>
        )}

        {showAll && (
          <div className="mb-16 md:mb-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
              <span className="text-[var(--color-ink-soft)]">Tutti gli esempi</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              I nostri esempi
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">
                al completo.
              </em>
            </h2>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
              Aprili dal vivo, esplorali. Poi immagina il tuo — lo costruiamo
              in 48 ore.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleDemos.map((demo) => {
            const imgSrc = resolveDemoImage(demo);
            return (
              <Link
                key={demo.slug}
                href={`/demo/${demo.slug}`}
                className="group bg-[var(--color-paper)] rounded-2xl border border-[var(--color-line)] overflow-hidden hover:-translate-y-1 hover:border-[var(--color-ink)] transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={demo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                    {demo.category}
                  </div>
                  <h3 className="font-display text-2xl text-[var(--color-ink)] mb-1 leading-tight">
                    {demo.title}
                  </h3>
                  <div className="text-xs italic text-[var(--color-muted)] mb-4">
                    {demo.subtitle}
                  </div>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-5 flex-1">
                    {demo.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-line)]">
                    <span className="text-xs font-mono text-[var(--color-muted)]">
                      Apri demo
                    </span>
                    <span className="text-sm font-medium text-[var(--color-ink)] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {!showAll && (
          <div className="mt-12 text-center">
            <Link
              href="/esempi"
              className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] px-6 py-3 rounded-full text-sm font-medium hover:border-[var(--color-ink)] transition"
            >
              <span>Vedi tutti gli esempi</span>
              <span>→</span>
            </Link>
          </div>
        )}

        {!showAll && (
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
                    I demo sono solo la punta dell&apos;iceberg. Realizziamo
                    praticamente qualsiasi soluzione digitale tu possa
                    immaginare per la tua attività.
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
                      { title: "Fatturazione", sub: "integrata" },
                      { title: "Chatbot AI", sub: "addestrato sul tuo business" },
                      { title: "Automazioni", sub: "Zapier, Make, custom" },
                      { title: "Integrazioni API", sub: "connetti i tuoi tool" },
                      { title: "Portali clienti", sub: "aree riservate" },
                      { title: "Booking avanzato", sub: "multi-location" },
                      { title: "Marketplace", sub: "multi-vendor" },
                      { title: "Gestionali", sub: "magazzino, ordini" },
                      { title: "E-learning", sub: "corsi, video" },
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ====================================================================== */
/* MAPPING DEMO → ILLUSTRATION                                            */
/* ====================================================================== */

type DemoLike = {
  title?: string;
  category?: string;
  slug?: string;
};

function resolveDemoImage(demo: DemoLike): string {
  const match = [demo.title, demo.category, demo.slug]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    match.includes("marco") ||
    match.includes("trainer") ||
    match.includes("benessere") ||
    match.includes("wellness") ||
    match.includes("fitness")
  ) {
    return "/demos/pt.svg";
  }

  if (
    match.includes("pasticceria") ||
    match.includes("martino") ||
    match.includes("alimentar") ||
    match.includes("bakery") ||
    match.includes("e-commerce")
  ) {
    return "/demos/pasticceria.svg";
  }

  if (
    match.includes("figlia") ||
    match.includes("presidente") ||
    match.includes("pizzer") ||
    match.includes("ristora") ||
    match.includes("menu")
  ) {
    return "/demos/pizzeria.svg";
  }

  if (
    match.includes("gloria") ||
    match.includes("salone") ||
    match.includes("parrucchier") ||
    match.includes("estetica") ||
    match.includes("beauty")
  ) {
    return "/demos/salone.svg";
  }

  if (
    match.includes("rinascita") ||
    match.includes("dentist") ||
    match.includes("clinich") ||
    match.includes("sanit")
  ) {
    return "/demos/dentista.svg";
  }

  if (
    match.includes("russo") ||
    match.includes("chiara") ||
    match.includes("psico") ||
    match.includes("counsel") ||
    match.includes("aiuto")
  ) {
    return "/demos/psicologa.svg";
  }

  return "/demos/pt.svg";
}
