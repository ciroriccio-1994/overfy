"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Dove ci alleniamo?",
    a: "In presenza al Vomero (McFit o outdoor a Villa Floridiana) oppure online con videochiamate settimanali. Tu scegli cosa funziona meglio per te.",
  },
  {
    q: "Quanto costa la consulenza iniziale?",
    a: "Gratuita. 30 minuti in cui capiamo se siamo la persona giusta l'uno per l'altro. Nessun impegno, nessuna vendita aggressiva.",
  },
  {
    q: "Posso provare prima di impegnarmi?",
    a: "Sì, offro una settimana di prova su tutti i programmi. Se non fa per te, non paghi nulla. Voglio clienti convinti, non forzati.",
  },
  {
    q: "Cosa succede se salto una settimana?",
    a: "Recuperiamo insieme. I programmi sono flessibili, la vita ha imprevisti. Non perdi nulla, riprogrammiamo.",
  },
  {
    q: "Serve attrezzatura a casa?",
    a: "No. Costruiamo il programma intorno a quello che hai. Palestra, casa, parco: l'importante è la costanza, non l'attrezzatura.",
  },
  {
    q: "Come si paga?",
    a: "Bonifico o carta, mensilmente. Niente anticipi annuali, niente vincoli. Se vuoi fermarti, ti fermi.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Domande <span className="italic font-light">frequenti.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--color-bg)] transition"
              >
                <span className="font-semibold pr-4">{f.q}</span>
                <span
                  className={`text-2xl transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-[var(--color-muted)] leading-relaxed">
                  {f.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
