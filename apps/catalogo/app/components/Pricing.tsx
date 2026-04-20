import Link from "next/link";
import { plans, tierColors } from "@/lib/demos";

export function Pricing() {
  return (
    <section
      id="pacchetti"
      className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
            <span className="text-[var(--color-ink-soft)]">03 / Pacchetti</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Tre livelli.
            <br />
            <em className="font-display-italic text-[var(--color-coral)]">
              Zero sorprese.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Ogni pacchetto è un abbonamento mensile. Nessun costo di setup,
            nessun vincolo di durata, disdetta libera.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const tc = tierColors[plan.tier];
            return (
              <div
                key={plan.tier}
                className={`relative rounded-2xl p-7 flex flex-col border-2 transition ${
                  plan.highlight
                    ? "shadow-2xl scale-[1.03]"
                    : "bg-[var(--color-paper)] hover:-translate-y-1"
                }`}
                style={{
                  background: plan.highlight ? tc.bg : "var(--color-paper)",
                  borderColor: plan.highlight ? tc.accent : "var(--color-line)",
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full whitespace-nowrap"
                    style={{
                      background: tc.accent,
                      color: "white",
                    }}
                  >
                    Il più scelto
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className="text-xs font-mono uppercase tracking-[0.25em] mb-4"
                    style={{ color: tc.ink }}
                  >
                    — {plan.name} —
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span
                      className="font-display text-7xl leading-none"
                      style={{ color: tc.ink }}
                    >
                      €{plan.price}
                    </span>
                    <span className="text-[var(--color-muted)] text-sm">
                      /mese
                    </span>
                  </div>
                  {plan.setupFee && (
                    <div className="text-xs font-mono text-[var(--color-muted)] mb-3">
                      + €{plan.setupFee} setup
                    </div>
                  )}
                  <p className="italic text-sm text-[var(--color-ink-soft)] leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, i) => {
                    const isHeader = f.endsWith(":");
                    return (
                      <li
                        key={i}
                        className={`flex gap-2.5 text-sm leading-relaxed ${
                          isHeader
                            ? "font-semibold pt-3 pb-1"
                            : "text-[var(--color-ink-soft)]"
                        }`}
                        style={isHeader ? { color: tc.ink } : {}}
                      >
                        {!isHeader && (
                          <span
                            className="mt-0.5 flex-shrink-0 text-base leading-none"
                            style={{ color: tc.accent }}
                          >
                            ✓
                          </span>
                        )}
                        <span>{f}</span>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href="/contatti"
                  className="block text-center py-3.5 rounded-full text-sm font-medium transition"
                  style={{
                    background: plan.highlight
                      ? "var(--color-ink)"
                      : tc.accent,
                    color: plan.highlight
                      ? "var(--color-paper)"
                      : plan.tier === "essenziale" || plan.tier === "enterprise"
                      ? "white"
                      : "var(--color-ink)",
                  }}
                >
                  Scegli {plan.name} →
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 text-sm text-[var(--color-muted)] italic">
          Tutti i prezzi sono IVA esclusa. Fatturazione mensile. Disdetta libera
          in qualsiasi momento.
        </div>
      </div>
    </section>
  );
}
