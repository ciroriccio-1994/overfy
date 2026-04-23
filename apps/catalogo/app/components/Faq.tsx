"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: "Cosa succede esattamente quando cancello l'abbonamento?",
    a: "La disdetta blocca i rinnovi futuri. Il periodo che hai già pagato (mensile, trimestrale o annuale) prosegue fino a scadenza: continui a usare il servizio fino all'ultimo giorno. Allo scadere, il sito viene messo offline e tu smetti di pagare. Nessuna penale, nessun costo nascosto.",
  },
  {
    q: "Il sito è mio o è vostro?",
    a: "Il sito lo costruiamo e lo ospitiamo noi: è un servizio, non un prodotto che ti consegniamo. Se cancelli l'abbonamento, il sito va offline. Se vuoi un sito che resti tuo \"per sempre\" anche senza di noi, ti indirizziamo diversamente in call — Overfy è pensato per chi vuole delegare tutto senza pensieri.",
  },
  {
    q: "E se poi voglio cambiare piano?",
    a: "Puoi passare a un piano superiore in qualsiasi momento — ti fatturiamo solo la differenza proporzionale. Scendere di piano è possibile al rinnovo successivo. Tutto gestito direttamente dalla tua dashboard Overfy.",
  },
  {
    q: "In quanto tempo il sito è davvero online?",
    a: "Dipende dal piano. Essenziale: 48-72 ore dal momento in cui ci mandi foto e testi. Professionale: 5-7 giorni per configurare prenotazioni, integrazioni e automazioni. Business: 10-14 giorni per e-commerce e gestionale integrato. Su Misura: il tempo lo definiamo in call, in base al progetto.",
  },
  {
    q: "Dove siete e chi lavora dietro Overfy?",
    a: "Siamo a Napoli. Il team è piccolo per scelta: meno intermediari, più rapidità. Ti risponde sempre una persona vera via WhatsApp o email, non un ticket system che rimbalza tra dipartimenti.",
  },
  {
    q: "I materiali (foto, testi, video) li devo fornire io?",
    a: "Sì, i contenuti del tuo business li hai tu — noi li mettiamo in forma. Se ti servono foto professionali, copywriting o video, possiamo organizzare uno shooting o un copywriter dedicato: è un servizio a parte, concordato in call.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      <div
        className="absolute top-10 right-0 w-[320px] h-[320px] blob opacity-10"
        style={{ background: "var(--color-sky)" }}
      ></div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
            Domande frequenti
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Ci siamo fatti
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              le stesse domande.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed">
            Risposte dirette alle 6 cose che ci chiedono sempre per prime.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl overflow-hidden transition"
                style={{
                  borderColor: isOpen
                    ? "var(--color-mint-ink)"
                    : "var(--color-line)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 md:px-7 md:py-6 text-left hover:bg-[var(--color-bg-soft)] transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl leading-tight text-[var(--color-ink)]">
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-transform"
                    style={{
                      background: isOpen
                        ? "var(--color-mint)"
                        : "var(--color-bg-soft)",
                      color: isOpen
                        ? "var(--color-ink)"
                        : "var(--color-ink-soft)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 md:px-7 md:pb-7 text-[var(--color-ink-soft)] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Altre domande?
          </p>
          <a
            href="mailto:info@overfydigital.com"
            className="inline-flex items-center gap-2 text-sm font-mono text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            <span>Scrivici su info@overfydigital.com</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
