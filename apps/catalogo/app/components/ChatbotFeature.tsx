export function ChatbotFeature() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Blob sky background */}
      <div
        className="absolute top-1/2 -left-40 w-[500px] h-[500px] blob opacity-20 -translate-y-1/2"
        style={{ background: "var(--color-sky)" }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="md:col-span-6">
            <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
              <span className="text-[var(--color-ink-soft)]">
                02 / Il nostro chatbot
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-8">
              Un assistente AI
              <br />
              <em className="font-display-italic text-[var(--color-sky-ink)]">
                che lavora 24/7
              </em>
              <br />
              per te.
            </h2>
            <div className="space-y-5 text-lg text-[var(--color-ink-soft)] leading-relaxed mb-10">
              <p>
                Il nostro chatbot AI proprietario è integrato in tutti i siti
                che realizziamo. Risponde alle domande dei tuoi clienti —
                orari, prezzi, prenotazioni, informazioni — 24 ore su 24.
              </p>
              <p className="text-[var(--color-muted)]">
                Lo addestriamo sul tuo business. Parla come te. Conosce i tuoi
                prodotti. Fissa appuntamenti nella tua agenda.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="p-5 rounded-xl border"
                style={{
                  background: "var(--color-mint-soft)",
                  borderColor: "var(--color-mint)",
                }}
              >
                <div className="font-display text-4xl text-[var(--color-mint-ink)] leading-none mb-2">
                  24/7
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-soft)]">
                  Sempre attivo
                </div>
              </div>
              <div
                className="p-5 rounded-xl border"
                style={{
                  background: "var(--color-coral-soft)",
                  borderColor: "var(--color-coral)",
                }}
              >
                <div className="font-display text-4xl text-[var(--color-coral-ink)] leading-none mb-2">
                  70%
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-soft)]">
                  Richieste auto-risolte
                </div>
              </div>
              <div
                className="p-5 rounded-xl border"
                style={{
                  background: "var(--color-sky-soft)",
                  borderColor: "var(--color-sky)",
                }}
              >
                <div className="font-display text-4xl text-[var(--color-sky-ink)] leading-none mb-2">
                  IT
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-soft)]">
                  Italiano nativo
                </div>
              </div>
              <div className="p-5 rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)]">
                <div className="font-display text-4xl text-[var(--color-ink)] leading-none mb-2">
                  AI
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-soft)]">
                  Powered by Claude
                </div>
              </div>
            </div>
          </div>

          {/* Mockup chatbot con stile colorato */}
          <div className="md:col-span-6">
            <div className="bg-[var(--color-paper)] rounded-2xl border border-[var(--color-line)] overflow-hidden shadow-xl max-w-md mx-auto">
              {/* Header */}
              <div className="bg-[var(--color-ink)] border-b border-[var(--color-line)] p-5 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[var(--color-ink)]"
                  style={{ background: "var(--color-mint)" }}
                >
                  AI
                </div>
                <div>
                  <div className="font-display text-base text-[var(--color-paper)] leading-none">
                    Assistente Virtuale
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-mint)] mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)] animate-pulse"></span>
                    Online ora
                  </div>
                </div>
              </div>

              {/* Messaggi */}
              <div className="p-5 space-y-3 bg-[var(--color-bg)] min-h-[320px]">
                <div className="flex">
                  <div className="max-w-[85%] bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] px-4 py-3 rounded-xl rounded-bl-sm text-sm leading-relaxed">
                    Buongiorno! Come posso aiutarla?
                  </div>
                </div>

                <div className="flex justify-end">
                  <div
                    className="max-w-[85%] text-[var(--color-ink)] px-4 py-3 rounded-xl rounded-br-sm text-sm leading-relaxed"
                    style={{ background: "var(--color-mint)" }}
                  >
                    Vorrei sapere gli orari di sabato
                  </div>
                </div>

                <div className="flex">
                  <div className="max-w-[85%] bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] px-4 py-3 rounded-xl rounded-bl-sm text-sm leading-relaxed">
                    Sabato siamo aperti dalle 9:00 alle 19:00. Vuole che le
                    fissi un appuntamento? Ho disponibilità alle 10:30 e alle
                    15:00.
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pl-1 pt-1">
                  <button
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{
                      border: "1px solid var(--color-mint)",
                      color: "var(--color-mint-ink)",
                    }}
                  >
                    10:30 va bene
                  </button>
                  <button
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{
                      border: "1px solid var(--color-mint)",
                      color: "var(--color-mint-ink)",
                    }}
                  >
                    15:00 va bene
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[var(--color-ink)] px-5 py-3 text-[10px] font-mono text-[var(--color-muted)] text-center">
                Powered by il nostro chatbot AI
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
