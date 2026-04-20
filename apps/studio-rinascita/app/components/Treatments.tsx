import Link from "next/link";
import { treatments, categoryLabels } from "@/lib/data";

const categories = ["prevenzione", "estetica", "implantologia", "ortodonzia"] as const;

const categoryDescriptions = {
  prevenzione: "La prima cura è la prevenzione.",
  estetica: "Un sorriso che racconta la tua sicurezza.",
  implantologia: "Sostituire un dente, ritrovare la quotidianità.",
  ortodonzia: "Allineare i denti, oggi, senza farlo vedere.",
};

export function Treatments() {
  return (
    <section id="trattamenti" className="py-24 md:py-32 px-6 bg-[var(--color-paper)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-6">
            — I nostri trattamenti —
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight max-w-2xl mx-auto">
            Quattro aree di eccellenza,
            <br />
            <em className="font-display-italic">una sola filosofia.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-1 md:gap-0 md:border-t md:border-l md:border-[var(--color-line)]">
          {categories.map((cat) => {
            const catTreatments = treatments.filter((t) => t.category === cat);
            return (
              <div
                key={cat}
                className="md:border-r md:border-b border-[var(--color-line)] p-8 md:p-12 hover:bg-[var(--color-bg-soft)]/50 transition group"
              >
                <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">
                  {categoryLabels[cat]}
                </div>
                <h3 className="font-display text-3xl text-[var(--color-ink)] mb-4 leading-tight">
                  <em className="font-display-italic">
                    {categoryDescriptions[cat]}
                  </em>
                </h3>
                <ul className="space-y-4 mt-8">
                  {catTreatments.map((t) => (
                    <li
                      key={t.slug}
                      className="border-b border-[var(--color-line)]/50 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-baseline justify-between gap-4 mb-1">
                        <div className="font-medium text-[var(--color-ink)]">
                          {t.name}
                        </div>
                        <div className="text-sm text-[var(--color-sage-dark)] whitespace-nowrap">
                          {t.priceFrom
                            ? `da € ${t.priceFrom}`
                            : t.priceRange
                            ? t.priceRange
                            : "Gratuita"}
                        </div>
                      </div>
                      <div className="text-sm text-[var(--color-muted)] leading-relaxed">
                        {t.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/prenota"
            className="inline-block bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-sage-dark)] transition"
          >
            Prenota un consulto gratuito
          </Link>
        </div>
      </div>
    </section>
  );
}
