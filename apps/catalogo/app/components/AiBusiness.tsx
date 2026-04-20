export function AiBusiness() {
  return (
    <section
      id="ai-business"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Blob decorativo sky */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] blob opacity-15 translate-x-1/3"
        style={{ background: "var(--color-sky)" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] blob opacity-10 -translate-x-1/2"
        style={{ background: "var(--color-mint)" }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
            <span className="text-[var(--color-ink-soft)]">
              03 / Aziende strutturate
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Hai già un gestionale?
            <br />
            <em className="font-display-italic text-[var(--color-sky-ink)]">
              Non lo tocchiamo.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Il tuo software gestionale funziona, il team lo conosce, i
            processi sono consolidati. <strong>Non è lì che interveniamo.</strong>{" "}
            Costruiamo tool AI separati che si integrano accanto al tuo flusso
            esistente e ti fanno risparmiare ore ogni settimana.
          </p>
        </div>

        {/* Rassicurazione "Non tocchiamo" — 3 box */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          <div
            className="rounded-2xl p-6 border-2"
            style={{
              background: "var(--color-mint-soft)",
              borderColor: "var(--color-mint)",
            }}
          >
            <div className="font-display text-5xl text-[var(--color-mint-ink)] leading-none mb-4">
              ✓
            </div>
            <h3 className="font-display text-2xl text-[var(--color-ink)] mb-2 leading-tight">
              Zero interferenze
            </h3>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Il tuo gestionale resta intoccato. Nessuna migrazione, nessun
              rischio, nessun team che deve re-imparare da capo.
            </p>
          </div>
          <div
            className="rounded-2xl p-6 border-2"
            style={{
              background: "var(--color-sky-soft)",
              borderColor: "var(--color-sky)",
            }}
          >
            <div className="font-display text-5xl text-[var(--color-sky-ink)] leading-none mb-4">
              ✓
            </div>
            <h3 className="font-display text-2xl text-[var(--color-ink)] mb-2 leading-tight">
              Lavoriamo accanto
            </h3>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
              I nostri tool AI si affiancano al tuo workflow. Quando serve,
              dialogano via API — senza modificare nulla del sistema esistente.
            </p>
          </div>
          <div
            className="rounded-2xl p-6 border-2"
            style={{
              background: "var(--color-coral-soft)",
              borderColor: "var(--color-coral)",
            }}
          >
            <div className="font-display text-5xl text-[var(--color-coral-ink)] leading-none mb-4">
              ✓
            </div>
            <h3 className="font-display text-2xl text-[var(--color-ink)] mb-2 leading-tight">
              Ore risparmiate
            </h3>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Automatizziamo quella parte del lavoro che oggi ti mangia tempo:
              data entry, report, documenti ripetitivi, ricerche manuali.
            </p>
          </div>
        </div>

        {/* 3 esempi concreti per settore */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
              Qualche esempio concreto
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-[var(--color-ink)] leading-tight">
              Come potremmo aiutarti,
              <br />
              <em className="font-display-italic">a seconda del tuo settore.</em>
            </h3>
          </div>

          <div className="space-y-4">
            {/* Esempio 1 — Agenzia immobiliare */}
            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl overflow-hidden hover:border-[var(--color-sky)] transition">
              <div className="grid md:grid-cols-12 gap-0">
                <div
                  className="md:col-span-3 p-8 flex flex-col items-start justify-center"
                  style={{ background: "var(--color-sky-soft)" }}
                >
                  <div className="text-5xl mb-3">🏠</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-sky-ink)] mb-1">
                    Settore
                  </div>
                  <div className="font-display text-2xl text-[var(--color-ink)] leading-tight">
                    Agenzia immobiliare
                  </div>
                </div>
                <div className="md:col-span-9 p-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
                    Esempi di tool che possiamo costruirti
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → Schede immobile AI
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        Leggi il catasto, precompila schede, genera
                        descrizioni SEO a partire da foto e dati grezzi.
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → Lead qualifier 24/7
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        Chatbot che qualifica potenziali clienti online e
                        fissa visite direttamente in agenda.
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → Match cliente-immobile
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        AI che incrocia richieste acquirenti con gli immobili
                        disponibili e suggerisce match precisi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Esempio 2 — Commercialista */}
            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl overflow-hidden hover:border-[var(--color-mint)] transition">
              <div className="grid md:grid-cols-12 gap-0">
                <div
                  className="md:col-span-3 p-8 flex flex-col items-start justify-center"
                  style={{ background: "var(--color-mint-soft)" }}
                >
                  <div className="text-5xl mb-3">📊</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-mint-ink)] mb-1">
                    Settore
                  </div>
                  <div className="font-display text-2xl text-[var(--color-ink)] leading-tight">
                    Studio commercialista
                  </div>
                </div>
                <div className="md:col-span-9 p-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
                    Esempi di tool che possiamo costruirti
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → OCR fatture AI
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        Estrae dati da fatture PDF o cartacee automaticamente
                        e li passa al tuo gestionale.
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → Classificatore spese
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        Categorizza automaticamente spese per centro di costo
                        imparando dalle tue scelte passate.
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → Report AI mensili
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        Genera report con analisi trend per ogni cliente,
                        pronti da inviare o presentare.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Esempio 3 — Studio legale */}
            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl overflow-hidden hover:border-[var(--color-coral)] transition">
              <div className="grid md:grid-cols-12 gap-0">
                <div
                  className="md:col-span-3 p-8 flex flex-col items-start justify-center"
                  style={{ background: "var(--color-coral-soft)" }}
                >
                  <div className="text-5xl mb-3">⚖️</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-coral-ink)] mb-1">
                    Settore
                  </div>
                  <div className="font-display text-2xl text-[var(--color-ink)] leading-tight">
                    Studio legale / notarile
                  </div>
                </div>
                <div className="md:col-span-9 p-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
                    Esempi di tool che possiamo costruirti
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → Riassuntore sentenze
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        AI che legge sentenze e contratti lunghi e restituisce
                        sintesi strutturate in pochi secondi.
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → Ricerca semantica
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        Cerca nel tuo archivio con linguaggio naturale: &quot;trova
                        contratti simili al caso X&quot;.
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-ink)] mb-1 text-sm">
                        → Bozze documenti
                      </div>
                      <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                        Generatore di bozze per atti ripetitivi a partire dai
                        tuoi template e casi precedenti.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Box finale — altri settori */}
        <div
          className="rounded-2xl p-8 md:p-12 border-2 text-center"
          style={{
            background: "var(--color-bg-soft)",
            borderColor: "var(--color-line)",
          }}
        >
          <div className="font-display text-3xl md:text-4xl leading-tight text-[var(--color-ink)] mb-4">
            Il tuo settore non è tra questi?{" "}
            <em className="font-display-italic text-[var(--color-sky-ink)]">
              Normale.
            </em>
          </div>
          <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-2xl mx-auto mb-6">
            Ogni azienda ha il suo &quot;collo di bottiglia&quot; specifico. Raccontaci
            quale processo ti fa perdere più tempo oggi — e probabilmente
            abbiamo un modo di risolverlo con l&apos;AI, senza toccare il tuo
            gestionale.
          </p>
          <a
            href="/contatti"
            className="inline-block bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-sky-ink)] transition"
          >
            Raccontaci il tuo workflow →
          </a>
        </div>
      </div>
    </section>
  );
}
