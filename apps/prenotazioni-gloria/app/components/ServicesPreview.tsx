import Link from "next/link";
import { services, categoryLabels, categoryEmojis } from "@/lib/services";

const categories = ["parrucchiere", "estetica", "manicure", "trattamenti"] as const;

export function ServicesPreview() {
  return (
    <section className="py-20 px-6 bg-[var(--color-white)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Servizi
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
            Tutto quello che ti serve,
            <br />
            <em className="text-[var(--color-gold-dark)]">in un solo posto.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const count = services.filter((s) => s.category === cat).length;
            const catServices = services
              .filter((s) => s.category === cat)
              .slice(0, 3);
            const minPrice = Math.min(
              ...services.filter((s) => s.category === cat).map((s) => s.price)
            );
            return (
              <Link
                key={cat}
                href={`/servizi#${cat}`}
                className="group bg-[var(--color-sand)]/40 rounded-3xl p-6 border border-[var(--color-border)] hover:shadow-xl hover:border-[var(--color-gold)] transition"
              >
                <div className="w-14 h-14 bg-[var(--color-rose)] rounded-2xl flex items-center justify-center text-3xl mb-5">
                  {categoryEmojis[cat]}
                </div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] mb-2">
                  {categoryLabels[cat]}
                </h3>
                <div className="text-xs text-[var(--color-muted)] mb-4">
                  {count} servizi · da €{minPrice}
                </div>
                <ul className="space-y-1.5 text-sm text-[var(--color-muted)] mb-6">
                  {catServices.map((s) => (
                    <li key={s.slug}>• {s.name}</li>
                  ))}
                </ul>
                <div className="text-sm font-medium text-[var(--color-gold-dark)] group-hover:text-[var(--color-ink)] transition">
                  Vedi tutti →
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/prenota"
            className="inline-block bg-[var(--color-ink)] text-[var(--color-bg)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-gold-dark)] transition"
          >
            Prenota ora →
          </Link>
        </div>
      </div>
    </section>
  );
}
