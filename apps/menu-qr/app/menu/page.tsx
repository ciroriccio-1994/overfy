import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { menuSections } from "@/lib/menu";

export const metadata = {
  title: "Menu — 'A Figlia d'o Presidente",
  description:
    "Menu della pizzeria 'A Figlia d'o Presidente. Pizze classiche e signature, antipasti, fritti, dolci, vini.",
};

export default function MenuPage() {
  return (
    <main>
      <Navbar />

      {/* Intro */}
      <section className="pt-40 md:pt-48 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-8">
            — Menu —
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1] text-[var(--color-ink)] mb-6">
            La nostra
            <br />
            <em className="font-display-italic text-[var(--color-accent)]">
              carta.
            </em>
          </h1>
          <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-xl mx-auto">
            Tutti i prezzi sono in euro, comprensivi di servizio e coperto.
            Informarci di eventuali allergie o intolleranze prima
            dell&apos;ordine.
          </p>
        </div>
      </section>

      {/* Ancore sticky */}
      <div className="sticky top-[72px] z-30 bg-[var(--color-bg)]/90 backdrop-blur-md border-y border-[var(--color-line)]/40">
        <div className="max-w-5xl mx-auto px-6 py-4 overflow-x-auto">
          <div className="flex gap-6 md:gap-8 justify-start md:justify-center whitespace-nowrap">
            {menuSections.map((s) => (
              <a
                key={s.title}
                href={`#${slugify(s.title)}`}
                className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-soft)] hover:text-[var(--color-accent)] transition"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sezioni menu */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-24">
          {menuSections.map((section) => (
            <div
              key={section.title}
              id={slugify(section.title)}
              className="scroll-mt-36"
            >
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-3">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className="text-sm italic text-[var(--color-muted)]">
                    {section.subtitle}
                  </p>
                )}
                <div className="w-12 h-px bg-[var(--color-line)] mx-auto mt-6"></div>
              </div>

              <div className="space-y-8">
                {section.dishes.map((dish, i) => (
                  <div key={i} className="group">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="font-display text-xl md:text-2xl text-[var(--color-ink)] flex items-baseline gap-2">
                        {dish.name}
                        {dish.signature && (
                          <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-accent)] border border-[var(--color-accent)]/50 px-1.5 py-0.5 rounded-full ml-1">
                            Signature
                          </span>
                        )}
                      </h3>
                      <div className="flex-1 border-b border-dotted border-[var(--color-line)] translate-y-[-4px]"></div>
                      <div className="font-display text-xl text-[var(--color-ink)]">
                        {dish.price % 1 === 0
                          ? `€ ${dish.price}`
                          : `€ ${dish.price.toFixed(2)}`}
                      </div>
                    </div>
                    {dish.description && (
                      <p className="text-[15px] text-[var(--color-muted)] leading-relaxed italic">
                        {dish.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chiusura */}
      <section className="py-16 px-6 bg-[var(--color-bg-alt)] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-display-italic text-xl text-[var(--color-ink-soft)] mb-6">
            Per prenotazioni o informazioni
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+390811234567"
              className="bg-[var(--color-ink)] text-[var(--color-paper)] px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition"
            >
              Chiama · 081 123 4567
            </a>
            <a
              href="https://wa.me/393331234567"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--color-ink)] text-[var(--color-ink)] px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition"
            >
              WhatsApp
            </a>
          </div>
          <Link
            href="/"
            className="inline-block mt-10 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
          >
            ← Torna alla home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
