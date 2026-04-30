"use client";

import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  services,
  categoryLabels,
  categoryDescriptions,
  categoryIconKeys,
  ServiceCategory,
} from "@/lib/services";
import {
  Scissors,
  Sparkle,
  Diamond,
  Leaf,
  Clock,
  ArrowRight,
  Ornament,
} from "../components/Icon";

const categoryOrder: ServiceCategory[] = [
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

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Hero pagina servizi */}
      <section className="pt-36 md:pt-44 pb-16 px-6 lg:px-10 bg-[var(--color-white)] border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow eyebrow-line mb-5">
            <span>Listino · Aggiornato 2026</span>
          </div>
          <h1 className="font-display-light text-5xl md:text-7xl text-[var(--color-ink)] leading-[1] mb-6">
            Tutti i nostri
            <br />
            <span className="italic font-medium text-[var(--color-gold-dark)]">
              servizi.
            </span>
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] max-w-2xl leading-relaxed">
            Prezzi trasparenti, durata precisa, prenotazione online diretta.
            Nessun upselling, nessuna sorpresa.
          </p>

          {/* TOC categorie */}
          <div className="flex flex-wrap gap-2 mt-10">
            {categoryOrder.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="text-xs uppercase tracking-[0.22em] border border-[var(--color-border)] px-4 py-2 hover:border-[var(--color-gold)] hover:text-[var(--color-gold-dark)] transition"
              >
                {categoryLabels[cat]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Lista per categoria */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto space-y-24">
          {categoryOrder.map((cat) => {
            const catServices = services.filter((s) => s.category === cat);
            const Icon = iconMap[categoryIconKeys[cat]];
            return (
              <div key={cat} id={cat} className="scroll-mt-24">
                {/* Heading categoria */}
                <div className="grid md:grid-cols-12 gap-6 mb-10 items-end pb-6 border-b border-[var(--color-ink)]/15">
                  <div className="md:col-span-1 text-[var(--color-gold-dark)]">
                    <Icon size={36} />
                  </div>
                  <div className="md:col-span-7">
                    <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)] mb-2">
                      {catServices.length} servizi
                    </div>
                    <h2 className="font-display-light text-5xl md:text-6xl text-[var(--color-ink)] leading-none">
                      <span className="italic font-medium">
                        {categoryLabels[cat]}
                      </span>
                    </h2>
                  </div>
                  <div className="md:col-span-4 text-sm text-[var(--color-ink-soft)] md:text-right">
                    {categoryDescriptions[cat]}
                  </div>
                </div>

                {/* Lista servizi — formato menu di ristorante elegante */}
                <ul className="divide-y divide-[var(--color-border)]">
                  {catServices.map((s) => (
                    <li key={s.slug} className="py-7">
                      <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-start">
                        <div className="md:col-span-7">
                          <div className="flex items-baseline gap-3 mb-2">
                            <h3 className="font-display text-2xl md:text-3xl text-[var(--color-ink)]">
                              {s.name}
                            </h3>
                            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                              <Clock size={12} />
                              {s.duration} min
                            </span>
                          </div>
                          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed max-w-lg">
                            {s.description}
                          </p>
                        </div>
                        <div className="md:col-span-3 flex items-baseline">
                          <span className="font-display-light text-4xl md:text-5xl text-[var(--color-gold-dark)] leading-none">
                            €{s.price}
                          </span>
                        </div>
                        <div className="md:col-span-2 flex md:justify-end">
                          <Link
                            href="/prenota"
                            className="group inline-flex items-center gap-2 border border-[var(--color-ink)] px-5 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition"
                          >
                            Prenota
                            <ArrowRight
                              size={12}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <Ornament className="text-[var(--color-gold)] mx-auto mt-20" />

          {/* CTA finale */}
          <div className="text-center pt-10">
            <p className="text-[var(--color-ink-soft)] mb-5">
              Pronta a prenotare il tuo prossimo appuntamento?
            </p>
            <Link
              href="/prenota"
              className="group inline-flex items-center gap-2 bg-[var(--color-ink)] text-[var(--color-bg)] px-8 py-4 text-sm tracking-wide hover:bg-[var(--color-gold-dark)] transition"
            >
              Inizia la prenotazione
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
