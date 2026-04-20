"use client";

import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { services, categoryLabels, categoryEmojis } from "@/lib/services";

const categoryOrder = ["parrucchiere", "estetica", "manicure", "trattamenti"] as const;

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-12 px-6 bg-[var(--color-white)] border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Servizi
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--color-ink)] mb-4 leading-tight">
            Tutti i nostri
            <br />
            <em className="text-[var(--color-gold-dark)]">servizi.</em>
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl">
            Prezzi trasparenti, durata precisa, prenotazione online diretta.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {categoryOrder.map((cat) => {
            const catServices = services.filter((s) => s.category === cat);
            return (
              <div key={cat} id={cat} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-[var(--color-rose)] rounded-2xl flex items-center justify-center text-3xl">
                    {categoryEmojis[cat]}
                  </div>
                  <h2 className="font-display text-4xl text-[var(--color-ink)]">
                    {categoryLabels[cat]}
                  </h2>
                </div>

                <div className="space-y-3">
                  {catServices.map((s) => (
                    <div
                      key={s.slug}
                      className="bg-[var(--color-white)] rounded-2xl p-6 border border-[var(--color-border)] flex flex-col md:flex-row md:items-center gap-4"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-[var(--color-sand)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                          {s.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="font-display text-2xl text-[var(--color-ink)]">
                              {s.name}
                            </h3>
                            <span className="text-xs text-[var(--color-muted)] bg-[var(--color-sand)] px-2.5 py-0.5 rounded-full">
                              ⏱ {s.duration} min
                            </span>
                          </div>
                          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 md:gap-6 md:flex-col md:items-end">
                        <div className="font-display text-3xl text-[var(--color-gold-dark)]">
                          €{s.price}
                        </div>
                        <Link
                          href="/prenota"
                          className="bg-[var(--color-ink)] text-[var(--color-bg)] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-gold-dark)] transition whitespace-nowrap"
                        >
                          Prenota →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
