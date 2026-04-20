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
  text: "Ciao, sono un assistente virtuale dello studio. Posso aiutarti con alcune informazioni generali. Di cosa vuoi sapere di più?",
  quickReplies: [
    "Come funziona la prima chiamata",
    "Costi e tariffe",
    "Fai anche sedute online?",
    "Ricevute detraibili",
  ],
};

const responses: Record<string, Message> = {
  "Come funziona la prima chiamata": {
    id: "prima-chiamata",
    role: "bot",
    text: "La prima chiamata dura circa 20 minuti ed è completamente gratuita. Serve per conoscervi, capire cosa ti porta a cercare supporto, vedere se potete lavorare bene insieme. È una chiamata telefonica senza video, puoi scegliere l'orario che ti è più comodo.",
    cta: { label: "Prenota la chiamata", href: "/prenota" },
    quickReplies: [
      "Cosa dovrei dire nella chiamata?",
      "Costi e tariffe",
      "Altre domande",
    ],
  },
  "Costi e tariffe": {
    id: "costi",
    role: "bot",
    text: "La prima chiamata conoscitiva è gratuita. La prima seduta costa €80 (60 minuti), le sedute successive €70 (50 minuti). Le sedute di coppia €100 (75 minuti). Tutti gli importi sono comprensivi di fatturazione sanitaria detraibile al 19%.",
    quickReplies: [
      "Ricevute detraibili",
      "Ogni quanto ci si vede",
      "Altre domande",
    ],
  },
  "Fai anche sedute online?": {
    id: "online",
    role: "bot",
    text: "Sì, lavoro molto online. Uso piattaforme sicure e crittografate (Google Meet e Zoom con impostazioni GDPR). L'efficacia della terapia online è dimostrata da moltissimi studi. Molte delle persone che seguo alternano sedute online e in presenza.",
    quickReplies: [
      "Come funziona la prima chiamata",
      "Costi e tariffe",
      "Altre domande",
    ],
  },
  "Ricevute detraibili": {
    id: "ricevute",
    role: "bot",
    text: "Sì, ogni seduta viene fatturata come prestazione sanitaria detraibile al 19% nella dichiarazione dei redditi. Ricevi la fattura elettronica via email dopo ogni pagamento, senza bisogno di richiederla.",
    quickReplies: [
      "Costi e tariffe",
      "Come si paga",
      "Altre domande",
    ],
  },
  "Cosa dovrei dire nella chiamata?": {
    id: "cosa-dire",
    role: "bot",
    text: "Non serve prepararsi. Chiara ti porrà qualche domanda generale — cosa ti sta succedendo, da quanto tempo, cosa ti ha spinto a cercare aiuto ora. Non devi raccontare tutto nei dettagli. Se non sai cosa dire, va benissimo dirlo.",
    quickReplies: ["Prenota la chiamata", "Altre domande"],
    cta: { label: "Prenota la chiamata", href: "/prenota" },
  },
  "Ogni quanto ci si vede": {
    id: "frequenza",
    role: "bot",
    text: "Nella maggior parte dei percorsi le sedute sono settimanali, soprattutto all'inizio. Con il tempo, se utile, si passa a una volta ogni due settimane. La frequenza viene concordata insieme, non è rigida.",
    quickReplies: ["Quanto dura un percorso", "Costi e tariffe", "Altre domande"],
  },
  "Quanto dura un percorso": {
    id: "durata",
    role: "bot",
    text: "Non c'è una durata standard. Alcuni percorsi durano pochi mesi (per esempio, focus su un problema specifico). Altri, più articolati, possono durare uno o due anni. Faremo il punto insieme ogni tre mesi per valutare come procedere.",
    quickReplies: ["Costi e tariffe", "Come funziona la prima chiamata", "Altre domande"],
  },
  "Come si paga": {
    id: "pagamenti",
    role: "bot",
    text: "Il pagamento avviene al termine di ogni seduta, con bonifico, carta, o contanti. Per chi preferisce, è possibile pagare in anticipo blocchi di 4 sedute.",
    quickReplies: ["Ricevute detraibili", "Altre domande"],
  },
  "Prenota la chiamata": {
    id: "cta-prenota",
    role: "bot",
    text: "Perfetto. Ti porto alla pagina di prenotazione, dove puoi scegliere il giorno e l'orario che preferisci.",
    cta: { label: "Vai alla prenotazione", href: "/prenota" },
  },
  "Altre domande": {
    id: "altre",
    role: "bot",
    text: "Per qualsiasi altra domanda, la via più semplice è la prima chiamata conoscitiva gratuita. In alternativa puoi scrivere a chiara@chiararussopsicologa.it e riceverai risposta entro 24-48h.",
    cta: { label: "Prenota la chiamata gratuita", href: "/prenota" },
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
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: reply,
    };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);

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
            text: "Non sono sicura di aver capito. Per una risposta accurata, ti consiglio la prima chiamata gratuita o di scrivere a chiara@chiararussopsicologa.it",
            cta: { label: "Prenota la chiamata", href: "/prenota" },
          },
        ]);
      }
      setTyping(false);
    }, 1100);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-[var(--color-terra-dark)] text-[var(--color-paper)] px-5 py-4 rounded-full shadow-2xl hover:bg-[var(--color-ink)] transition flex items-center gap-3 ${
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
            d="M20 13.5V17a2 2 0 01-2 2H7l-4 4V7a2 2 0 012-2h7"
          />
        </svg>
        <span className="text-xs uppercase tracking-[0.15em]">
          Informazioni
        </span>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[420px] bg-[var(--color-paper)] rounded-sm shadow-2xl border border-[var(--color-line)] chat-enter flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-[var(--color-ink)] text-[var(--color-paper)] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-terra)]/20 border border-[var(--color-terra)] flex items-center justify-center">
                <span className="font-display text-lg text-[var(--color-terra)]">
                  C
                </span>
              </div>
              <div>
                <div className="font-display text-base leading-none">
                  Dott.ssa Chiara Russo
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-terra)] mt-1">
                  Informazioni generali
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

          {/* Disclaimer */}
          <div className="bg-[var(--color-bg-alt)] px-5 py-3 text-[11px] text-[var(--color-muted)] italic border-b border-[var(--color-line)] leading-relaxed">
            Questo è un assistente automatico per informazioni generali.
            Non sostituisce in alcun modo il confronto diretto con la dottoressa.
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-[var(--color-bg)]"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] ${
                    m.role === "user"
                      ? "bg-[var(--color-terra-dark)] text-[var(--color-paper)]"
                      : "bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)]"
                  } px-4 py-3 rounded-sm text-sm leading-relaxed`}
                >
                  {m.text}
                  {m.cta && (
                    <a
                      href={m.cta.href}
                      className="block mt-3 text-xs uppercase tracking-[0.15em] text-[var(--color-terra-dark)] border-b border-[var(--color-terra-dark)] pb-0.5 hover:text-[var(--color-ink)] w-fit"
                    >
                      {m.cta.label} →
                    </a>
                  )}
                  {m.quickReplies &&
                    m.id === messages[messages.length - 1].id &&
                    !typing && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.quickReplies.map((r) => (
                          <button
                            key={r}
                            onClick={() => sendReply(r)}
                            className="text-xs px-3 py-1.5 border border-[var(--color-terra)] text-[var(--color-terra-dark)] rounded-full hover:bg-[var(--color-terra)] hover:text-[var(--color-paper)] transition"
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
        </div>
      )}
    </>
  );
}
