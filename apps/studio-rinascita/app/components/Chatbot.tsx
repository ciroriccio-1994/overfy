"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  quickReplies?: string[];
  cta?: { label: string; href: string };
};

const welcomeMessage: Message = {
  id: "welcome",
  role: "bot",
  text: "Buongiorno, sono l'assistente virtuale dello Studio Rinascita. Come posso aiutarla?",
  quickReplies: [
    "Costi impianti",
    "Prima visita gratuita",
    "Convenzioni e mutua",
    "Dove vi trovate",
  ],
};

const responses: Record<string, Message> = {
  "Costi impianti": {
    id: "impianti",
    role: "bot",
    text: "I nostri impianti partono da € 1.500 e arrivano a € 2.500 a seconda della marca scelta (Straumann o Nobel Biocare). Il preventivo è sempre personalizzato dopo la prima visita gratuita, che include radiografia panoramica.",
    quickReplies: [
      "Pagamenti rateizzati?",
      "Prima visita gratuita",
      "Altro",
    ],
  },
  "Prima visita gratuita": {
    id: "prima-visita",
    role: "bot",
    text: "La prima visita è completamente gratuita e senza impegno. Dura circa 45 minuti e include anamnesi, esame clinico, radiografia panoramica digitale e preventivo personalizzato. Può prenotarla direttamente online.",
    cta: { label: "Prenota ora", href: "/prenota" },
    quickReplies: ["Devo portare qualcosa?", "Altro"],
  },
  "Convenzioni e mutua": {
    id: "convenzioni",
    role: "bot",
    text: "Non siamo convenzionati con il SSN ma siamo affiliati con i principali fondi sanitari integrativi: Fasi, Unisalute, MetaSalute, Previmedical. Le consigliamo di verificare direttamente con il suo fondo.",
    quickReplies: ["Pagamenti rateizzati?", "Altro"],
  },
  "Dove vi trovate": {
    id: "dove",
    role: "bot",
    text: "Siamo a Posillipo, in via Posillipo 142. C'è un parcheggio convenzionato a 50 metri dallo studio. Siamo raggiungibili anche con gli autobus R3 e 140.",
    cta: { label: "Indicazioni Google Maps", href: "https://maps.google.com/?q=Via+Posillipo+142+Napoli" },
    quickReplies: ["Orari di apertura", "Altro"],
  },
  "Pagamenti rateizzati?": {
    id: "rate",
    role: "bot",
    text: "Sì, offriamo finanziamenti a tasso zero fino a 24 mesi per trattamenti sopra € 1.000. Lo gestiamo con Compass, la pratica è online in 5 minuti durante la visita.",
    quickReplies: ["Prima visita gratuita", "Altro"],
  },
  "Devo portare qualcosa?": {
    id: "portare",
    role: "bot",
    text: "Se li ha, porti con sé radiografie o TAC recenti. Non è obbligatorio: in studio facciamo una radiografia panoramica digitale inclusa nella prima visita.",
    quickReplies: ["Prenota prima visita", "Altro"],
  },
  "Orari di apertura": {
    id: "orari",
    role: "bot",
    text: "Dal lunedì al giovedì: 9:00—13:00 e 15:00—20:00. Venerdì: 9:00—14:00. Sabato su appuntamento.",
    quickReplies: ["Prenota prima visita", "Altro"],
  },
  "Prenota prima visita": {
    id: "prenota",
    role: "bot",
    text: "Perfetto. La porto al sistema di prenotazione online, è disponibile 24 ore su 24.",
    cta: { label: "Vai alla prenotazione", href: "/prenota" },
  },
  Altro: {
    id: "altro",
    role: "bot",
    text: "Per domande specifiche la consiglio di chiamarci allo 081 234 5678 oppure di prenotare una prima visita gratuita. Il nostro staff sarà felice di rispondere a tutte le sue domande di persona.",
    cta: { label: "Prenota prima visita", href: "/prenota" },
  },
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendReply = (reply: string) => {
    // Aggiunge messaggio utente
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: reply,
    };
    setMessages((m) => [...m, userMsg]);

    // Mostra typing
    setTyping(true);

    // Risposta dopo 900ms
    setTimeout(() => {
      const response = responses[reply];
      if (response) {
        setMessages((m) => [...m, { ...response, id: `bot-${Date.now()}` }]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: `bot-${Date.now()}`,
            role: "bot",
            text: "Non sono sicuro di aver capito. La consiglio di prenotare una prima visita gratuita o chiamarci allo 081 234 5678.",
            cta: { label: "Prenota ora", href: "/prenota" },
          },
        ]);
      }
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-[var(--color-sage-dark)] text-[var(--color-paper)] px-5 py-4 rounded-full shadow-2xl hover:bg-[var(--color-ink)] transition flex items-center gap-3 ${
          open ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ transitionDuration: "300ms" }}
        aria-label="Apri chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span className="text-xs uppercase tracking-[0.15em]">
          Chiedi allo studio
        </span>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[400px] bg-[var(--color-paper)] rounded-sm shadow-2xl border border-[var(--color-line)] chat-enter flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-[var(--color-ink)] text-[var(--color-paper)] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[var(--color-sage)] rounded-full flex items-center justify-center">
                <span className="font-display text-lg text-[var(--color-sage)]">R</span>
              </div>
              <div>
                <div className="font-display text-base leading-none">
                  Studio Rinascita
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-sage)] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[var(--color-sage)] rounded-full animate-pulse"></span>
                  Assistente virtuale
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-[var(--color-paper)]/10 flex items-center justify-center text-xl"
              aria-label="Chiudi"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-[var(--color-bg)]"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] ${
                    m.role === "user"
                      ? "bg-[var(--color-sage-dark)] text-[var(--color-paper)]"
                      : "bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)]"
                  } px-4 py-3 rounded-sm text-sm leading-relaxed`}
                >
                  {m.text}
                  {m.cta && (
                    <a
                      href={m.cta.href}
                      className="block mt-3 text-xs uppercase tracking-[0.15em] text-[var(--color-sage-dark)] border-b border-[var(--color-sage-dark)] pb-0.5 hover:text-[var(--color-ink)] w-fit"
                    >
                      {m.cta.label} →
                    </a>
                  )}
                  {m.quickReplies && m.id === messages[messages.length - 1].id && !typing && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.quickReplies.map((r) => (
                        <button
                          key={r}
                          onClick={() => sendReply(r)}
                          className="text-xs px-3 py-1.5 border border-[var(--color-sage)] text-[var(--color-sage-dark)] rounded-full hover:bg-[var(--color-sage)] hover:text-[var(--color-paper)] transition"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-[var(--color-paper)] border border-[var(--color-line)] px-4 py-3 rounded-sm flex gap-1 items-end">
                  <span className="w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full typing-dot"></span>
                  <span className="w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full typing-dot"></span>
                  <span className="w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full typing-dot"></span>
                </div>
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="px-5 py-3 border-t border-[var(--color-line)] text-[10px] text-[var(--color-muted)] text-center italic">
            Risposte generate dall&apos;assistente virtuale · Per emergenze chiamare 081 234 5678
          </div>
        </div>
      )}
    </>
  );
}
