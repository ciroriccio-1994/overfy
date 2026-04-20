export function Model() {
  return (
    <section id="modello" className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
            <span className="text-[var(--color-ink-soft)]">
              06 / Come funziona
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Come Netflix,
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              come Spotify.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Paghi solo quando usi il servizio. Senza costi iniziali da
            migliaia di euro, senza vincoli, senza sorprese. Un modello semplice
            che tutti conosciamo — finalmente applicato anche ai siti web.
          </p>
        </div>

        {/* Comparazione 2 modelli */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {/* Modello tradizionale */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-7 md:p-8 opacity-70">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Il modello tradizionale
            </div>
            <h3 className="font-display text-3xl text-[var(--color-ink)] mb-6 leading-tight">
              Paghi tanto,
              <br />
              <em className="font-display-italic">poi paghi ancora.</em>
            </h3>
            <ul className="space-y-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  ✗
                </span>
                <span>
                  Da €2.000 a €8.000 iniziali per lo sviluppo del sito
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  ✗
                </span>
                <span>
                  Hosting, SSL, manutenzione: altri €300-600 all&apos;anno
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  ✗
                </span>
                <span>
                  Ogni modifica è un preventivo a parte
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  ✗
                </span>
                <span>
                  Se l&apos;agenzia smette di rispondere, il tuo sito muore
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  ✗
                </span>
                <span>
                  Aggiornamenti tecnologici a carico tuo
                </span>
              </li>
            </ul>
          </div>

          {/* Nostro modello */}
          <div
            className="rounded-2xl p-7 md:p-8 border-2 relative"
            style={{
              background: "var(--color-mint-soft)",
              borderColor: "var(--color-mint)",
            }}
          >
            <div
              className="absolute -top-3 left-6 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
              style={{
                background: "var(--color-mint)",
                color: "var(--color-ink)",
              }}
            >
              Il nostro modello
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-mint-ink)] mb-4 pt-2">
              Pensato per i tempi moderni
            </div>
            <h3 className="font-display text-3xl text-[var(--color-ink)] mb-6 leading-tight">
              Paghi solo
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">
                quando lo usi.
              </em>
            </h3>
            <ul className="space-y-3 text-sm text-[var(--color-ink)] leading-relaxed">
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  <strong>Zero costi iniziali.</strong> Niente esborso da
                  migliaia di euro
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  Hosting, <strong>dominio .it</strong>, SSL, backup,
                  aggiornamenti: <strong>tutto incluso</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  Modifiche contenuti <strong>illimitate</strong>, gestite da noi
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  <strong>Supporto continuo</strong>: siamo qui tutti i giorni
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  Disdetta libera, <strong>nessun vincolo</strong> di durata
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sezione trasparenza "Se smetti di pagare" */}
        <div
          className="rounded-2xl p-8 md:p-12 border-2"
          style={{
            background: "var(--color-sky-soft)",
            borderColor: "var(--color-sky)",
          }}
        >
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-sky-ink)] mb-4">
                Onestà totale
              </div>
              <h3 className="font-display text-4xl md:text-5xl leading-[1] text-[var(--color-ink)] mb-4">
                Se smetti
                <br />
                <em className="font-display-italic text-[var(--color-sky-ink)]">
                  di pagare?
                </em>
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                Te lo diciamo subito, senza giri di parole. È giusto che tu
                sappia esattamente come funziona prima di iniziare.
              </p>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-[var(--color-paper)] rounded-xl p-5 border border-[var(--color-line)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-sky-soft)] flex items-center justify-center flex-shrink-0 font-mono text-sm text-[var(--color-sky-ink)] font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-display text-xl text-[var(--color-ink)] mb-1 leading-tight">
                      Il servizio si sospende
                    </div>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      Il sito va offline, le prenotazioni si disattivano, il
                      chatbot si spegne. Come quando non rinnovi Netflix.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-paper)] rounded-xl p-5 border border-[var(--color-line)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-sky-soft)] flex items-center justify-center flex-shrink-0 font-mono text-sm text-[var(--color-sky-ink)] font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-display text-xl text-[var(--color-ink)] mb-1 leading-tight">
                      I tuoi dati restano conservati per 90 giorni
                    </div>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      Lista clienti, prenotazioni, ordini, contenuti — tutto
                      resta al sicuro per tre mesi. Hai tempo per ripensarci.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-paper)] rounded-xl p-5 border border-[var(--color-line)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-sky-soft)] flex items-center justify-center flex-shrink-0 font-mono text-sm text-[var(--color-sky-ink)] font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-display text-xl text-[var(--color-ink)] mb-1 leading-tight">
                      Riattivare è semplice
                    </div>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      Basta riprendere l&apos;abbonamento e tutto torna online
                      come prima, senza dover ricostruire nulla.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-paper)] rounded-xl p-5 border border-[var(--color-line)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-sky-soft)] flex items-center justify-center flex-shrink-0 font-mono text-sm text-[var(--color-sky-ink)] font-bold">
                    4
                  </div>
                  <div>
                    <div className="font-display text-xl text-[var(--color-ink)] mb-1 leading-tight">
                      Dopo 90 giorni, chiusura completa
                    </div>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      Trascorsi i 90 giorni, cancelliamo definitivamente i dati
                      (come prevede il GDPR) e non rinnoviamo più il dominio
                      .it, che viene rilasciato. Niente dati conservati per
                      sempre, niente sorprese.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nota finale trasparenza */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-sm font-mono text-[var(--color-muted)] italic leading-relaxed">
            Preferiamo essere chiari da subito. La fiducia si costruisce sulla
            trasparenza, non sulle sorprese al momento della fattura.
          </p>
        </div>
      </div>
    </section>
  );
}
