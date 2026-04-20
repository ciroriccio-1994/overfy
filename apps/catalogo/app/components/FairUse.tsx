export function FairUse() {
  return (
    <section
      id="gioco-pulito"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] blob opacity-15 translate-x-1/3 -translate-y-1/3"
        style={{ background: "var(--color-coral)" }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
            <span className="text-[var(--color-ink-soft)]">
              07 / Gioco pulito
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Le regole,
            <br />
            <em className="font-display-italic text-[var(--color-coral-ink)]">
              nere su bianco.
            </em>
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Preferiamo dire tutto subito, non dopo. Nessuna clausola scritta in
            piccolo, nessuna sorpresa al terzo mese. Questi sono i limiti —
            generosi per chi usa il servizio normalmente, chiari per chi vuole
            sapere dove ci muoviamo.
          </p>
        </div>

        {/* 6 box dei limiti */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {/* 1. Traffico */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-7 hover:border-[var(--color-coral)] transition">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display text-xl"
                style={{
                  background: "var(--color-coral-soft)",
                  color: "var(--color-coral-ink)",
                }}
              >
                1
              </div>
              <div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight mb-1">
                  Traffico del tuo sito
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
                  Quanti visitatori può gestire ogni piano
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4">
              <div className="flex justify-between gap-4">
                <span>Essenziale</span>
                <span className="font-mono text-[var(--color-ink)]">
                  fino a 50 GB/mese
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Professionale</span>
                <span className="font-mono text-[var(--color-ink)]">
                  fino a 150 GB/mese
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Business</span>
                <span className="font-mono text-[var(--color-ink)]">
                  fino a 500 GB/mese
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Su Misura</span>
                <span className="font-mono text-[var(--color-ink)]">
                  concordato
                </span>
              </div>
            </div>
            <p className="text-xs text-[var(--color-muted)] italic leading-relaxed border-t border-[var(--color-line)] pt-3">
              Sono soglie molto ampie: un&apos;attività locale media usa tra i 5
              e i 30 GB/mese. Se ti avvicini al limite, ti avvisiamo a 80% e
              proponiamo un upgrade — niente addebiti a sorpresa.
            </p>
          </div>

          {/* 2. Chatbot AI */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-7 hover:border-[var(--color-mint)] transition">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display text-xl"
                style={{
                  background: "var(--color-mint-soft)",
                  color: "var(--color-mint-ink)",
                }}
              >
                2
              </div>
              <div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight mb-1">
                  Conversazioni chatbot AI
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
                  Quante chat AI può gestire ogni piano
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4">
              <div className="flex justify-between gap-4">
                <span>Essenziale (preimpostato)</span>
                <span className="font-mono text-[var(--color-ink)]">
                  illimitato
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Professionale</span>
                <span className="font-mono text-[var(--color-ink)]">
                  500 chat/mese
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Business</span>
                <span className="font-mono text-[var(--color-ink)]">
                  1.500 chat/mese
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Su Misura</span>
                <span className="font-mono text-[var(--color-ink)]">
                  concordato
                </span>
              </div>
            </div>
            <p className="text-xs text-[var(--color-muted)] italic leading-relaxed border-t border-[var(--color-line)] pt-3">
              Il chatbot Essenziale usa risposte preimpostate e non ha limiti.
              Il chatbot AI avanzato (Pro+) usa intelligenza artificiale ed è
              contato per conversazione. Pacchetti aggiuntivi disponibili se
              serve di più.
            </p>
          </div>

          {/* 3. Modifiche */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-7 hover:border-[var(--color-sky)] transition">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display text-xl"
                style={{
                  background: "var(--color-sky-soft)",
                  color: "var(--color-sky-ink)",
                }}
              >
                3
              </div>
              <div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight mb-1">
                  Cosa significa &quot;illimitate&quot;
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
                  Fair use per le modifiche contenuti
                </p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4">
              <div className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  <strong>Modifiche testi, foto, prezzi, orari:</strong>{" "}
                  davvero illimitate, con risposta entro SLA del piano
                </span>
              </div>
              <div className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  <strong>Modifiche strutturali</strong> (nuove sezioni/pagine):
                  fino a 2 al mese
                </span>
              </div>
              <div className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  <strong>Modifiche design</strong> (colori, font, layout): 2
                  all&apos;anno incluse (Pro+)
                </span>
              </div>
            </div>
            <p className="text-xs text-[var(--color-muted)] italic leading-relaxed border-t border-[var(--color-line)] pt-3">
              Le richieste vanno inviate via email o sistema di ticketing — non
              via WhatsApp random alle 23. Tutto ciò che eccede il fair use si
              valuta caso per caso, con un preventivo chiaro prima di fare
              qualunque cosa.
            </p>
          </div>

          {/* 4. SLA risposta */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-7 hover:border-[var(--color-coral)] transition">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display text-xl"
                style={{
                  background: "var(--color-coral-soft)",
                  color: "var(--color-coral-ink)",
                }}
              >
                4
              </div>
              <div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight mb-1">
                  Tempi di risposta
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
                  Quanto impieghiamo a risponderti
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4">
              <div className="flex justify-between gap-4">
                <span>Essenziale</span>
                <span className="font-mono text-[var(--color-ink)]">
                  entro 48h lavorative
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Professionale</span>
                <span className="font-mono text-[var(--color-ink)]">
                  entro 2h lavorative
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Business</span>
                <span className="font-mono text-[var(--color-ink)]">
                  entro 1h lavorativa
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Su Misura</span>
                <span className="font-mono text-[var(--color-ink)]">
                  account dedicato
                </span>
              </div>
            </div>
            <p className="text-xs text-[var(--color-muted)] italic leading-relaxed border-t border-[var(--color-line)] pt-3">
              Orario lavorativo: Lun-Ven 9-19. Per emergenze reali (sito
              offline) i piani Business e Su Misura hanno canale di urgenza.
            </p>
          </div>

          {/* 5. Cosa NON è incluso */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-7 hover:border-[var(--color-muted)] transition">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display text-xl"
                style={{
                  background: "var(--color-bg-soft)",
                  color: "var(--color-ink)",
                  border: "1px solid var(--color-line)",
                }}
              >
                5
              </div>
              <div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight mb-1">
                  Cosa non è incluso
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
                  Servizi extra, preventivabili a parte
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4">
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  —
                </span>
                <span>Fotografia professionale (foto prodotti, attività)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  —
                </span>
                <span>Copywriting di testi da zero</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  —
                </span>
                <span>Traduzioni multilingua professionali</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  —
                </span>
                <span>
                  SEO avanzato e campagne Google Ads / Meta Ads
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  —
                </span>
                <span>Gestione social media e content strategy</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">
                  —
                </span>
                <span>
                  Integrazioni con gestionali non standard (oltre 1 sul
                  Business)
                </span>
              </li>
            </ul>
            <p className="text-xs text-[var(--color-muted)] italic leading-relaxed border-t border-[var(--color-line)] pt-3">
              Se serve uno di questi servizi, te lo preventiviamo a parte. Il
              sito te lo facciamo noi, i contenuti li fornisci tu — salvo
              accordi specifici.
            </p>
          </div>

          {/* 6. Proprietà */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-6 md:p-7 hover:border-[var(--color-sky)] transition">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display text-xl"
                style={{
                  background: "var(--color-sky-soft)",
                  color: "var(--color-sky-ink)",
                }}
              >
                6
              </div>
              <div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight mb-1">
                  Chi possiede cosa
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
                  Proprietà intellettuale, chiara
                </p>
              </div>
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4">
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-mint-ink)" }}
                >
                  ✓
                </span>
                <span>
                  <strong>Contenuti tuoi</strong> (foto, testi, logo): sempre
                  di tua proprietà
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
                  <strong>Dati dei tuoi clienti</strong> (prenotazioni, ordini,
                  contatti): tuoi, esportabili in CSV gratis
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-sky-ink)" }}
                >
                  ⓘ
                </span>
                <span>
                  <strong>Design e codice del sito</strong>: di nostra
                  proprietà, in licenza d&apos;uso durante l&apos;abbonamento
                  (come su Shopify o Wix)
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: "var(--color-sky-ink)" }}
                >
                  ⓘ
                </span>
                <span>
                  <strong>Dominio .it</strong>: intestato a noi se incluso
                  nell&apos;abbonamento. Se vuoi intestarlo a te, te lo
                  trasferiamo pagando il costo del dominio (€15/anno)
                </span>
              </li>
            </ul>
            <p className="text-xs text-[var(--color-muted)] italic leading-relaxed border-t border-[var(--color-line)] pt-3">
              Vuoi migrare altrove? Ti esportiamo dati clienti e contenuti.
              Design e codice restano nostri — ma sono comunque cose
              riproducibili ovunque.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
              Domande che ci fanno tutti
            </div>
            <h3 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
              <em className="font-display-italic">FAQ</em> senza giri di parole
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "Cosa succede se supero il limite di traffico?",
                a: "Ti avvisiamo via email quando arrivi all'80% del limite del tuo piano. Se lo superi, non addebitiamo sorprese: ti proponiamo l'upgrade al piano successivo oppure un pacchetto extra una tantum se è un picco temporaneo. Nessun costo invisibile in bolletta.",
              },
              {
                q: "Posso cambiare piano in qualsiasi momento?",
                a: "Sì. Puoi fare upgrade o downgrade quando vuoi. L'upgrade ha effetto immediato con addebito pro-rata. Il downgrade diventa effettivo dal mese successivo per evitare perdite di funzionalità non previste.",
              },
              {
                q: "Cosa succede ai miei dati se smetto di pagare?",
                a: "Vengono conservati per 90 giorni — hai tempo per ripensarci o per esportarli in CSV. Trascorsi i 90 giorni, cancelliamo tutto definitivamente come prevede il GDPR e non rinnoviamo più il dominio .it (che viene rilasciato).",
              },
              {
                q: "Il dominio .it è mio o vostro?",
                a: "Se il dominio è incluso nell'abbonamento, è intestato a noi per motivi tecnici di gestione. Se vuoi intestarlo direttamente a te, te lo trasferiamo in qualsiasi momento: paghi solo il costo del dominio (circa €15/anno) e da quel momento è tuo.",
              },
              {
                q: "E se un cliente vi chiede 10 modifiche al giorno?",
                a: "Le modifiche di contenuto (testi, foto, prezzi, orari) sono davvero illimitate. Le rispondiamo secondo lo SLA del piano. Se diventano richieste strutturali (nuove pagine, nuove funzioni), valgono i limiti di 2/mese — oltre, preventiviamo.",
              },
              {
                q: "Siete il miglior prezzo sul mercato?",
                a: "No, non siamo i più economici. Ci sono servizi fai-da-te a €10-20/mese. Noi facciamo il lavoro al posto tuo — ogni richiesta è gestita da una persona vera, non da te che sbatti la testa sui tutorial. Paghi un servizio, non un software.",
              },
              {
                q: "Cosa succede se scoprite che perdete soldi con me?",
                a: "I prezzi possono essere aggiornati con preavviso di almeno 60 giorni. Se succede, ti avvisiamo chiaramente prima: tu puoi decidere se accettare il nuovo prezzo o disdire senza penalità. Niente aumenti nascosti.",
              },
              {
                q: "E se avete problemi voi e chiudete l'attività?",
                a: "Scenario da affrontare con onestà: ti esporteremmo tutti i dati in formato standard (CSV, HTML per contenuti) e ti daremmo 60 giorni di preavviso. Il codice e il design non sono portabili tali e quali altrove (come con Shopify) ma contenuti e dati clienti restano sempre tuoi.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-[var(--color-paper)] border border-[var(--color-line)] rounded-xl overflow-hidden hover:border-[var(--color-ink)] transition"
              >
                <summary className="cursor-pointer p-5 md:p-6 flex justify-between items-start gap-4 list-none">
                  <span className="font-medium text-[var(--color-ink)] text-base leading-tight">
                    {item.q}
                  </span>
                  <span
                    className="font-display text-2xl text-[var(--color-muted)] group-open:rotate-45 transition-transform flex-shrink-0 leading-none"
                    style={{ transformOrigin: "center" }}
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Footer trasparenza */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-10 border-2 text-center max-w-3xl mx-auto"
          style={{
            background: "var(--color-bg-soft)",
            borderColor: "var(--color-line)",
          }}
        >
          <div className="font-display text-2xl md:text-3xl text-[var(--color-ink)] leading-tight mb-3">
            Ti sembra troppo? O troppo poco?
          </div>
          <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
            Se qualcosa non ti torna, parliamone prima di iniziare. Non
            vogliamo clienti &quot;tirati dentro&quot; con promesse sbagliate.
            Vogliamo clienti che sanno esattamente cosa prendono — e che per
            questo restano anni con noi.
          </p>
          <p className="text-xs font-mono text-[var(--color-muted)] italic">
            I termini di servizio completi saranno disponibili in dettaglio
            prima dell&apos;attivazione dell&apos;abbonamento.
          </p>
        </div>
      </div>
    </section>
  );
}
