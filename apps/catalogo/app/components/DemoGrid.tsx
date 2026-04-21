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
            const { icon, bg, fg } = resolveDemoVisual(demo);
            return (
              <Link
                key={demo.slug}
                href={`/demo/${demo.slug}`}
                className="group bg-[var(--color-paper)] rounded-2xl border border-[var(--color-line)] overflow-hidden hover:-translate-y-1 hover:border-[var(--color-ink)] transition-all duration-300 flex flex-col"
              >
                <div
                  className="aspect-[4/3] relative overflow-hidden flex items-center justify-center bg-[var(--color-bg-soft)]"
                >
                  <span
                    className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full group-hover:scale-110 transition-transform duration-500"
                    style={{ background: bg, color: fg }}
                  >
                    {icon}
                  </span>
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

        {/* "Cerchi qualcosa di diverso?" solo in home */}
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
/* ICONE DEMO — line SVG, coerenti col brand                              */
/* ====================================================================== */

type DemoLike = {
  title?: string;
  category?: string;
  slug?: string;
};

type Visual = {
  icon: React.ReactNode;
  bg: string;
  fg: string;
};

function resolveDemoVisual(demo: DemoLike): Visual {
  const match = [demo.title, demo.category, demo.slug]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    match.includes("marco") ||
    match.includes("trainer") ||
    match.includes("benessere") ||
    match.includes("wellness") ||
    match.includes("pt")
  ) {
    return {
      icon: <IconDumbbell />,
      bg: "var(--color-coral-soft)",
      fg: "var(--color-coral-ink)",
    };
  }

  if (
    match.includes("pasticceria") ||
    match.includes("martino") ||
    match.includes("alimentar") ||
    match.includes("bakery") ||
    match.includes("e-commerce")
  ) {
    return {
      icon: <IconBag />,
      bg: "var(--color-mint-soft)",
      fg: "var(--color-mint-ink)",
    };
  }

  if (
    match.includes("figlia") ||
    match.includes("presidente") ||
    match.includes("pizzer") ||
    match.includes("ristora") ||
    match.includes("menu")
  ) {
    return {
      icon: <IconUtensils />,
      bg: "var(--color-sky-soft)",
      fg: "var(--color-sky-ink)",
    };
  }

  if (
    match.includes("gloria") ||
    match.includes("salone") ||
    match.includes("parrucchier") ||
    match.includes("estetica") ||
    match.includes("beauty")
  ) {
    return {
      icon: <IconScissors />,
      bg: "var(--color-coral-soft)",
      fg: "var(--color-coral-ink)",
    };
  }

  if (
    match.includes("rinascita") ||
    match.includes("dentist") ||
    match.includes("clinich") ||
    match.includes("sanit") ||
    match.includes("medic")
  ) {
    return {
      icon: <IconCross />,
      bg: "var(--color-sky-soft)",
      fg: "var(--color-sky-ink)",
    };
  }

  if (
    match.includes("russo") ||
    match.includes("chiara") ||
    match.includes("psico") ||
    match.includes("counsel") ||
    match.includes("aiuto")
  ) {
    return {
      icon: <IconHeart />,
      bg: "var(--color-mint-soft)",
      fg: "var(--color-mint-ink)",
    };
  }

  return {
    icon: <IconSparkle />,
    bg: "var(--color-bg-soft)",
    fg: "var(--color-ink)",
  };
}

/* ---- SVG icons ---------------------------------------------------------- */

function IconDumbbell() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 6.5l11 11M4 10l2-2M10 4l-2 2M14 20l2-2M20 14l-2 2M3 11l1-1 2 2-1 1-2-2zM11 3l1-1 2 2-1 1-2-2zM13 21l-1 1-2-2 1-1 2 2zM21 13l-1 1-2-2 1-1 2 2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 2l-3 4v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUtensils() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 2v7a2 2 0 002 2h1m0 0v11m0-11a2 2 0 002-2V2M15 2v20M15 14c2-1 4-3 4-7V2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconScissors() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCross() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 2h4a2 2 0 012 2v4h4a2 2 0 012 2v4a2 2 0 01-2 2h-4v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4H4a2 2 0 01-2-2v-4a2 2 0 012-2h4V4a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
