"use client";

import Link from "next/link";
import { demos, tierLabels, tierColors } from "@/lib/demos";

export function DemoGrid() {
  return (
    <section id="demo" className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
            <span className="text-[var(--color-ink-soft)]">01 / I lavori</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Sei demo.
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              Sei mondi diversi.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Ogni demo è pensato per una categoria specifica. Puoi aprirlo dal
            vivo, esplorarlo, capire esattamente cosa puoi avere anche tu.
          </p>
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
                {/* Preview colorato per tier */}
                <div
                  className="aspect-[16/10] relative overflow-hidden flex items-center justify-center"
                  style={{ background: tc.bg }}
                >
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                    {demo.preview}
                  </div>

                  {/* Tier badge */}
                  <div
                    className="absolute top-4 left-4 bg-[var(--color-paper)] text-xs font-mono px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: tc.accent,
                      color: tc.ink,
                    }}
                  >
                    {tierLabels[demo.tier]}
                  </div>

                  {/* Arrow hover */}
                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: tc.accent, color: "white" }}
                  >
                    →
                  </div>
                </div>

                {/* Content */}
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
      </div>
    </section>
  );
}
