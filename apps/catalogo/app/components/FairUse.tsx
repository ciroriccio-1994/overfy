export function FairUse() {
  return (
    <section id="come-funziona" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] blob opacity-10 translate-x-1/3 -translate-y-1/3"
        style={{ background: "var(--color-sky)" }}
      ></div>

      <div className="max-w-6xl mx-auto relative">
        {/* HEADER */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              07 / Come funziona
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight">
              Tutto scritto.
              <br />
              <em className="font-display-italic text-[var(--color-sky-ink)]">
                Niente clausole.
              </em>
            </h2>
          </div>

          <div
            className="max-w-3xl mx-auto rounded-2xl border-2 p-6 md:p-8 text-center"
            style={{
              borderColor: "var(--color-sky)",
              background: "var(--color-paper)",
            }}
          >
            <p className="font-display text-xl md:text-2xl text-[var(--color-ink)] leading-snug mb-4">
              <em className="font-display-italic text-[var(--color-sky-ink)]">
                Quello che paghi
              </em>{" "}
              è quello che ricevi.
            </p>
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-muted)] leading-loose">
              TRAFFICO · CHATBOT AI · MODIFICHE · SLA · PROPRIETÀ · COSA RESTA FUORI
            </p>
          </div>
        </div>

        {/* 6 ACCORDION */}
        <div className="max-w-3xl mx-auto space-y-3 mb-20">
          {rules.map((rule, i) => (
            <details
              key={i}
              className="group bg-[var(--color-paper)] border border-[var(--color-line)] rounded-xl overflow-hidden hover:border-[var(--color-ink)] transition"
            >
              <summary className="cursor-pointer p-5 md:p-6 flex justify-between items-center gap-4 list-none">
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display text-sm"
                    style={{
                      background: rule.accentSoft,
                      color: rule.accentInk,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl md:text-2xl text-[var(--color-ink)] leading-tight truncate">
                    {rule.title}
                  </span>
                </div>
                <span
                  className="font-display text-2xl text-[var(--color-muted)] group-open:rotate-45 transition-transform flex-shrink-0 leading-none"
                  style={{ transformOrigin: "center" }}
                >
                  +
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-6 md:pb-7 pt-1">
                <div className="ml-0 md:ml-[52px]">
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
                    {rule.subtitle}
                  </p>
                  {rule.content}
                  {rule.footnote && (
                    <p className="text-xs text-[var(--color-muted)] italic leading-relaxed border-t border-[var(--color-line)] pt-4 mt-4">
                      {rule.footnote}
                    </p>
                  )}
                </div>
              </div>
            </details>
          ))}
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
            {faqs.map((item, i) => (
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

        {/* CTA finale */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-10 border text-center max-w-2xl mx-auto"
          style={{
            background: "var(--color-bg-soft)",
            borderColor: "var(--color-line)",
          }}
        >
          <p className="font-display text-2xl md:text-3xl text-[var(--color-ink)] leading-tight mb-3">
            <em className="font-display-italic">Qualcosa non torna?</em>
          </p>
          <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm md:text-base">
            Parliamone prima. Termini completi disponibili prima dell&apos;attivazione.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* DATA                                                                        */
/* ========================================================================== */

type Rule = {
  title: string;
  subtitle: string;
  accentSoft: string;
  accentInk: string;
  content: React.ReactNode;
  footnote?: string;
};

const rules: Rule[] = [
  {
    title: "Traffico del tuo sito",
    subtitle: "Quanti visitatori può gestire ogni piano",
    accentSoft: "var(--color-coral-soft)",
    accentInk: "var(--color-coral-ink)",
    content: (
      <div className="space-y-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <Row label="Essenziale" value="fino a 50 GB/mese" />
        <Row label="Professionale" value="fino a 150 GB/mese" />
        <Row label="Business" value="fino a 500 GB/mese" />
        <Row label="Su Misura" value="concordato" />
      </div>
    ),
    footnote:
      "Soglie ampie: un'attività locale media usa tra i 5 e i 30 GB/mese. Se arrivi all'80% ti avvisiamo e proponiamo un upgrade — niente addebiti a sorpresa.",
  },
  {
    title: "Chatbot AI",
    subtitle: "Due livelli di chatbot disponibili",
    accentSoft: "var(--color-mint-soft)",
    accentInk: "var(--color-mint-ink)",
    content: (
      <div className="space-y-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <Row label="Essenziale" value="preimpostato, illimitato" />
        <Row label="Professionale" value="AI custom" />
        <Row label="Business" value="AI custom" />
        <Row label="Su Misura" value="AI custom avanzato" />
      </div>
    ),
    footnote:
      "Il chatbot Essenziale usa risposte preimpostate e non ha limiti. Per i piani Pro+, il chatbot AI viene costruito su misura per il tuo business. La capacità di conversazioni si definisce insieme in call, sul traffico reale previsto.",
  },
  {
    title: "Cosa significa “illimitate”",
    subtitle: "Fair use per le modifiche contenuti",
    accentSoft: "var(--color-sky-soft)",
    accentInk: "var(--color-sky-ink)",
    content: (
      <div className="space-y-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <CheckRow>
          <strong>Modifiche testi, foto, prezzi, orari:</strong> davvero
          illimitate, con risposta entro SLA del piano
        </CheckRow>
        <CheckRow>
          <strong>Modifiche strutturali</strong> (nuove sezioni/pagine): fino a
          2 al mese
        </CheckRow>
        <CheckRow>
          <strong>Modifiche design</strong> (colori, font, layout): 2
          all&apos;anno incluse (Pro+)
        </CheckRow>
      </div>
    ),
    footnote:
      "Le richieste vanno inviate via email o sistema di ticketing — non via WhatsApp random alle 23. Tutto ciò che eccede il fair use si valuta caso per caso, con preventivo chiaro prima di fare qualunque cosa.",
  },
  {
    title: "Tempi di risposta",
    subtitle: "Quanto impieghiamo a risponderti",
    accentSoft: "var(--color-coral-soft)",
    accentInk: "var(--color-coral-ink)",
    content: (
      <div className="space-y-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <Row label="Essenziale" value="entro 48h lavorative" />
        <Row label="Professionale" value="entro 2h lavorative" />
        <Row label="Business" value="entro 1h lavorativa" />
        <Row label="Su Misura" value="account dedicato" />
      </div>
    ),
    footnote:
      "Orario lavorativo: Lun-Ven 9-19. Per emergenze reali (sito offline) i piani Business e Su Misura hanno canale di urgenza.",
  },
  {
    title: "Cosa non è incluso",
    subtitle: "Servizi extra, preventivabili a parte",
    accentSoft: "var(--color-bg-soft)",
    accentInk: "var(--color-ink)",
    content: (
      <ul className="space-y-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <DashRow>Fotografia professionale (foto prodotti, attività)</DashRow>
        <DashRow>Copywriting di testi da zero</DashRow>
        <DashRow>Traduzioni multilingua professionali</DashRow>
        <DashRow>SEO avanzato e campagne Google Ads / Meta Ads</DashRow>
        <DashRow>Gestione social media e content strategy</DashRow>
        <DashRow>
          Integrazioni con gestionali non standard (oltre 1 sul Business)
        </DashRow>
      </ul>
    ),
    footnote:
      "Se serve uno di questi servizi, te lo preventiviamo a parte. Il sito te lo facciamo noi, i contenuti li fornisci tu — salvo accordi specifici.",
  },
  {
    title: "Chi possiede cosa",
    subtitle: "Proprietà intellettuale, chiara",
    accentSoft: "var(--color-sky-soft)",
    accentInk: "var(--color-sky-ink)",
    content: (
      <ul className="space-y-2.5 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        <CheckRow as="li">
          <strong>Contenuti tuoi</strong> (foto, testi, logo): sempre di tua
          proprietà
        </CheckRow>
        <CheckRow as="li">
          <strong>Dati dei tuoi clienti</strong> (prenotazioni, ordini,
          contatti): tuoi, esportabili in CSV gratis
        </CheckRow>
        <InfoRow>
          <strong>Design e codice del sito</strong>: di nostra proprietà, in
          licenza d&apos;uso durante l&apos;abbonamento
        </InfoRow>
        <InfoRow>
          <strong>Dominio .it</strong>: intestato a noi se incluso
          nell&apos;abbonamento. Se vuoi intestarlo a te, te lo trasferiamo
          pagando il costo del dominio (€15/anno)
        </InfoRow>
      </ul>
    ),
    footnote:
      "Vuoi migrare altrove? Ti esportiamo dati clienti e contenuti. Design e codice restano nostri — ma sono comunque cose riproducibili ovunque.",
  },
];

const faqs = [
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
    q: "Quante conversazioni può gestire il chatbot AI?",
    a: "La capacità del chatbot AI viene definita insieme in call in base al traffico reale previsto per la tua attività. Costruiamo un chatbot custom dimensionato per il tuo business — non vendiamo pacchetti rigidi da 500 o 1000 conversazioni. Parlando insieme, capiamo cosa ti serve davvero.",
  },
  {
    q: "E se vi chiedo 10 modifiche al giorno?",
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
    a: "Scenario da affrontare con onestà: ti esporteremmo tutti i dati in formato standard (CSV, HTML per contenuti) e ti daremmo 60 giorni di preavviso. Il codice e il design non sono portabili tali e quali altrove, ma contenuti e dati clienti restano sempre tuoi.",
  },
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="font-mono text-[var(--color-ink)]">{value}</span>
    </div>
  );
}

function CheckRow({
  children,
  as = "div",
}: {
  children: React.ReactNode;
  as?: "div" | "li";
}) {
  const Tag = as;
  return (
    <Tag className="flex gap-3">
      <span
        className="mt-0.5 flex-shrink-0 font-bold"
        style={{ color: "var(--color-mint-ink)" }}
      >
        ✓
      </span>
      <span>{children}</span>
    </Tag>
  );
}

function InfoRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        className="mt-0.5 flex-shrink-0 font-bold"
        style={{ color: "var(--color-sky-ink)" }}
      >
        ⓘ
      </span>
      <span>{children}</span>
    </li>
  );
}

function DashRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">—</span>
      <span>{children}</span>
    </li>
  );
}
