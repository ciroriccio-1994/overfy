import Link from "next/link";
import {
  services,
  categoryLabels,
  categoryDescriptions,
  categoryIconKeys,
  ServiceCategory,
} from "@/lib/services";
import { Scissors, Sparkle, Diamond, Leaf, ArrowRight, Ornament } from "./Icon";

const categories: ServiceCategory[] = [
  "parrucchiere",
  "estetica",
  "manicure",
  "trattamenti",
];

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  scissors: Scissors,
  sparkle: Sparkle,
  diamond: Diamond,
  leaf: Leaf,
};

export function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10 bg-[var(--color-white)] border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="eyebrow mb-5">Servizi</div>
          <h2 className="font-display-light text-4xl md:text-6xl text-[var(--color-ink)] leading-[1.05] mb-6">
            Tutto quello che ti serve,
            <br />
            <span className="italic font-medium text-[var(--color-gold-dark)]">
              in un solo posto.
            </span>
          </h2>
          <Ornament className="text-[var(--color-gold)] mx-auto mt-8" />
        </div>

        {/* Grid magazine: una larga + tre più piccole */}
        <div className="grid lg:grid-cols-12 gap-6">
          {categories.map((cat, idx) => {
            const catServices = services.filter((s) => s.category === cat);
            const Icon = iconMap[categoryIconKeys[cat]];
            const minPrice = Math.min(...catServices.map((s) => s.price));
            const isLarge = idx === 0;
            return (
              <Link
                key={cat}
                href={`/servizi#${cat}`}
                className={`lift group relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-warm)]/40 hover:bg-[var(--color-bg-warm)] hover:border-[var(--color-gold)]/40 transition flex flex-col ${
                  isLarge
                    ? "lg:col-span-6 lg:row-span-2 p-10 min-h-[420px]"
                    : "lg:col-span-3 p-7 min-h-[260px]"
                }`}
              >
                {/* Decorazione SVG di fondo */}
                <div className="absolute -right-6 -top-6 text-[var(--color-gold)] opacity-[0.08] pointer-events-none">
                  <Icon size={isLarge ? 280 : 160} />
                </div>

                {/* Icona piccola in alto */}
                <div className="relative w-12 h-12 border border-[var(--color-gold)]/40 flex items-center justify-center text-[var(--color-gold-dark)] mb-6">
                  <Icon size={20} />
                </div>

                <div className="relative flex-1">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)] mb-2">
                    {catServices.length} servizi · da €{minPrice}
                  </div>
                  <h3
                    className={`font-display ${
                      isLarge ? "text-5xl md:text-6xl" : "text-3xl"
                    } text-[var(--color-ink)] leading-[1] mb-5`}
                  >
                    {categoryLabels[cat]}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-6 max-w-md">
                    {categoryDescriptions[cat]}
                  </p>

                  {isLarge && (
                    <ul className="space-y-2 text-[var(--color-ink-soft)]">
                      {catServices.slice(0, 4).map((s) => (
                        <li
                          key={s.slug}
                          className="flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--color-border)] py-2"
                        >
                          <span className="font-display text-xl">{s.name}</span>
                          <span className="text-sm text-[var(--color-gold-dark)]">
                            €{s.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="relative inline-flex items-center gap-2 text-[var(--color-gold-dark)] text-sm tracking-wide mt-6 group-hover:text-[var(--color-ink)] transition">
                  <span>Vedi tutti</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/prenota"
            className="group inline-flex items-center gap-2 bg-[var(--color-ink)] text-[var(--color-bg)] px-8 py-4 text-sm tracking-wide hover:bg-[var(--color-gold-dark)] transition"
          >
            Prenota un appuntamento
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
