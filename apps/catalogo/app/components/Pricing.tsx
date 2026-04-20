"use client";

import Link from "next/link";
import { useState } from "react";

type BillingCycle = "monthly" | "annual";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  features: string[];
  delivery: string;
  color: "coral" | "mint" | "sky" | "custom";
  highlight?: boolean;
  cta: string;
  note?: string;
};

const plans: Plan[] = [
  {
    id: "essenziale",
    name: "Essenziale",
    tagline: "Esisti online, professionalmente",
    monthlyPrice: 49.99,
    annualPrice: 489.99,
    description:
      "Per professionisti singoli, piccoli studi, chi non ha mai avuto un sito.",
    features: [
      "Sito web fino a 3 pagine",
      "Sottodominio gratuito",
      "Mobile responsive + SEO base",
      "Form contatti con notifica",
      "Google Business ottimizzato",
      "Chatbot base (FAQ template)",
      "Hosting, SSL, backup inclusi",
      "Modifiche testi/foto illimitate",
      "Supporto WhatsApp",
    ],
    delivery: "Consegna in 48/72h",
    color: "coral",
    cta: "Inizia con Essenziale",
  },
  {
    id: "professionale",
    name: "Professionale",
    tagline: "Il sito + gli strumenti che ti liberano tempo",
    monthlyPrice: 129.99,
    annualPrice: 1289.99,
    description:
      "Per chi riceve clienti, ha appuntamenti, vuole automatizzare.",
    features: [
      "Tutto dell'Essenziale, più:",
      "Sito fino a 7 pagine",
      "Dominio .it personalizzato",
      "Email professionale",
      "Sistema prenotazioni online",
      "Menu digitale QR (ristorazione)",
      "Promemoria WhatsApp/SMS automatici",
      "Chatbot AI avanzato personalizzato",
      "Google Analytics + report mensile",
      "2 modifiche design/anno",
      "Supporto prioritario (2h)",
    ],
    delivery: "Consegna in 5-7 giorni",
    color: "mint",
    highlight: true,
    cta: "Scegli Professionale",
  },
  {
    id: "business",
    name: "Business",
    tagline: "Quando vendi, gestisci, o scali",
    monthlyPrice: 249.99,
    annualPrice: 2489.99,
    description:
      "Per chi vende online o gestisce processi complessi.",
    features: [
      "Tutto del Professionale, più:",
      "E-commerce completo (Stripe)",
      "Gestione ordini e spedizioni",
      "Gestione inventario",
      "Dashboard amministratore",
      "Email marketing integrato",
      "Tool AI leggeri (OCR, classificatori)",
      "Integrazione con 1 gestionale",
      "Report avanzati",
      "Personalizzazioni design",
      "Account manager dedicato",
    ],
    delivery: "Consegna in 10-14 giorni",
    color: "sky",
    cta: "Scegli Business",
  },
  {
    id: "su-misura",
    name: "Su Misura",
    tagline: "Quando serve qualcosa di unico",
    monthlyPrice: null,
    annualPrice: null,
    description:
      "App native, web app, tool AI dedicati per aziende strutturate.",
    features: [
      "Tutto quello che immagini, più:",
      "App native iOS e Android",
      "Web app e gestionali su misura",
      "CRM dedicati",
      "Tool AI custom integrati",
      "Workflow automation avanzati",
      "Integrazioni API complesse",
      "Portali clienti con login",
      "Marketplace multi-vendor",
      "Sistemi e-learning",
    ],
    delivery: "Call discovery gratuita · Preventivo personalizzato",
    color: "custom",
    cta: "Richiedi preventivo",
    note: "È prevista una fee iniziale di progetto, concordata dopo la call di discovery in base alla complessità.",
  },
];

const colorMap: Record<
  string,
  { bg: string; accent: string; ink: string }
> = {
  coral: {
    bg: "var(--color-coral-soft)",
    accent: "var(--color-coral)",
    ink: "var(--color-coral-ink)",
  },
  mint: {
    bg: "var(--color-mint-soft)",
    accent: "var(--color-mint)",
    ink: "var(--color-mint-ink)",
  },
  sky: {
    bg: "var(--color-sky-soft)",
    accent: "var(--color-sky)",
    ink: "var(--color-sky-ink)",
  },
  custom: {
    bg: "var(--color-bg-soft)",
    accent: "var(--color-ink)",
    ink: "var(--color-ink)",
  },
};

// Formatta il prezzo con virgola italiana e separatore migliaia
function formatPrice(price: number): string {
  return price.toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  return (
    <section
      id="pacchetti"
      className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)] relative overflow-hidden"
    >
      <div
        className="absolute top-40 left-0 w-[400px] h-[400px] blob opacity-10 -translate-x-1/2"
        style={{ background: "var(--color-mint)" }}
      ></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
            <span className="text-[var(--color-ink-soft)]">05 / Pacchetti</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Prezzi chiari,
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              zero sorprese.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Scegli il pacchetto giusto per te. Paghi solo quando usi il
            servizio. Disdetta libera in qualsiasi momento.
          </p>
        </div>

        {/* Toggle + Prova gratuita */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div className="inline-flex items-center gap-1 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full p-1.5 self-start">
            <button
              onClick={() => setCycle("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                cycle === "monthly"
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              }`}
            >
              Mensile
            </button>
            <button
              onClick={() => setCycle("annual")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                cycle === "annual"
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              }`}
            >
              Annuale
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{
                  background:
                    cycle === "annual"
                      ? "var(--color-mint)"
                      : "var(--color-mint-soft)",
                  color:
                    cycle === "annual"
                      ? "var(--color-ink)"
                      : "var(--color-mint-ink)",
                }}
              >
                Risparmi
              </span>
            </button>
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm border-2"
            style={{
              background: "var(--color-sky-soft)",
              borderColor: "var(--color-sky)",
            }}
          >
            <span className="text-lg">🎁</span>
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-[var(--color-ink)]">
                7 giorni di prova gratuita
              </span>
              <span className="text-xs text-[var(--color-sky-ink)] font-mono">
                Nessuna carta richiesta
              </span>
            </div>
          </div>
        </div>

        {/* 4 colonne pricing */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => {
            const c = colorMap[plan.color];
            const isCustom = plan.monthlyPrice === null;
            const displayPrice =
              cycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            const savings =
              !isCustom && plan.monthlyPrice && plan.annualPrice
                ? plan.monthlyPrice * 12 - plan.annualPrice
                : 0;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col border-2 transition ${
                  plan.highlight
                    ? "shadow-2xl scale-[1.02] lg:scale-[1.03]"
                    : "bg-[var(--color-paper)] hover:-translate-y-1"
                }`}
                style={{
                  background: plan.highlight
                    ? c.bg
                    : "var(--color-paper)",
                  borderColor: plan.highlight
                    ? c.accent
                    : "var(--color-line)",
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full whitespace-nowrap"
                    style={{
                      background: c.accent,
                      color: "white",
                    }}
                  >
                    Il più scelto
                  </div>
                )}

                <div className="mb-5">
                  <div
                    className="text-xs font-mono uppercase tracking-[0.25em] mb-3"
                    style={{ color: c.ink }}
                  >
                    — {plan.name} —
                  </div>

                  {/* Prezzo */}
                  <div className="mb-3 min-h-[88px]">
                    {isCustom ? (
                      <div>
                        <div
                          className="font-display text-3xl leading-tight"
                          style={{ color: c.ink }}
                        >
                          Su preventivo
                        </div>
                        <div className="text-xs font-mono text-[var(--color-muted)] mt-2">
                          Call gratuita + preventivo
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className="font-display text-5xl md:text-6xl leading-none"
                            style={{ color: c.ink }}
                          >
                            €{formatPrice(displayPrice as number)}
                          </span>
                          <span className="text-[var(--color-muted)] text-xs">
                            {cycle === "monthly" ? "/mese" : "/anno"}
                          </span>
                        </div>
                        {cycle === "annual" && savings > 0 ? (
                          <div
                            className="text-xs font-mono mt-2"
                            style={{ color: c.ink }}
                          >
                            Risparmi €{formatPrice(savings)}/anno
                          </div>
                        ) : cycle === "monthly" && plan.annualPrice ? (
                          <div className="text-xs font-mono text-[var(--color-muted)] mt-2">
                            Oppure €{formatPrice(plan.annualPrice)}/anno
                          </div>
                        ) : (
                          <div className="text-xs font-mono text-[var(--color-muted)] mt-2">
                            &nbsp;
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <p
                    className="italic text-sm leading-relaxed"
                    style={{
                      color: plan.highlight
                        ? "var(--color-ink-soft)"
                        : "var(--color-ink-soft)",
                    }}
                  >
                    {plan.tagline}
                  </p>
                </div>

                {/* Delivery badge */}
                <div
                  className="text-[10px] font-mono uppercase tracking-wider mb-5 px-3 py-2 rounded-lg"
                  style={{
                    background: plan.highlight
                      ? "var(--color-paper)"
                      : c.bg,
                    color: c.ink,
                  }}
                >
                  ⚡ {plan.delivery}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1 text-sm">
                  {plan.features.map((f, i) => {
                    const isHeader = f.endsWith(":");
                    return (
                      <li
                        key={i}
                        className={`flex gap-2 leading-relaxed ${
                          isHeader
                            ? "font-semibold pt-2 pb-1"
                            : "text-[var(--color-ink-soft)]"
                        }`}
                        style={isHeader ? { color: c.ink } : {}}
                      >
                        {!isHeader && (
                          <span
                            className="mt-0.5 flex-shrink-0 text-base leading-none"
                            style={{ color: c.accent }}
                          >
                            ✓
                          </span>
                        )}
                        <span>{f}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Nota fee iniziale Su Misura */}
                {plan.note && (
                  <div
                    className="text-xs italic mb-4 p-3 rounded-lg"
                    style={{
                      background: "var(--color-bg)",
                      color: "var(--color-muted)",
                    }}
                  >
                    {plan.note}
                  </div>
                )}

                <Link
                  href="/contatti"
                  className="block text-center py-3 rounded-full text-sm font-medium transition"
                  style={{
                    background: plan.highlight
                      ? "var(--color-ink)"
                      : isCustom
                      ? "var(--color-ink)"
                      : c.accent,
                    color: "white",
                  }}
                >
                  {plan.cta} →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Note legali */}
        <div className="text-center mt-12 max-w-3xl mx-auto space-y-2">
          <p className="text-sm text-[var(--color-muted)]">
            Tutti i prezzi sono <strong>IVA esclusa</strong>. Fatturazione{" "}
            {cycle === "annual" ? "annuale" : "mensile"}. Disdetta libera in
            qualsiasi momento.
          </p>
          <p className="text-xs font-mono text-[var(--color-muted)] italic">
            La prova di 7 giorni è completamente gratuita e non richiede carta
            di credito. Se al termine non fa per te, nessun pagamento sarà
            addebitato.
          </p>
        </div>
      </div>
    </section>
  );
}
