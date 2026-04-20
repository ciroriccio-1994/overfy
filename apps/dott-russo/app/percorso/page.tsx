import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";

export const metadata = {
  title: "Il percorso — Dott.ssa Chiara Russo",
  description:
    "La storia, la formazione, l'approccio terapeutico della Dott.ssa Chiara Russo. Psicoterapia cognitivo-comportamentale a Napoli.",
};

export default function PercorsoPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-40 md:pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[400px] h-[400px] rounded-full bg-gradient-radial from-[var(--color-terra)]/20 via-[var(--color-terra)]/8 to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra-dark)] mb-8">
            — Il percorso —
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] text-[var(--color-ink)] mb-8">
            Una psicoterapia
            <br />
            <em className="font-display-italic text-[var(--color-terra-dark)]">
              che ti ascolta prima
            </em>
            <br />
            di rispondere.
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] leading-[1.8] max-w-2xl">
            Chi sono, come sono arrivata a fare questo lavoro, in che modo lavoro
            con le persone che incontro.
          </p>
        </div>
      </section>

      <div className="w-20 h-px bg-[var(--color-line)] mx-auto"></div>

      {/* Bio lunga */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4">
            La mia storia
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-10">
            Non ho sempre pensato
            <br />
            <em className="font-display-italic">di fare la psicologa.</em>
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-ink-soft)] leading-[1.9]">
            <p>
              Da ragazzina volevo fare la scrittrice. Mi interessava come le
              persone raccontavano se stesse — cosa dicevano e cosa taceva, cosa
              ripetevano e cosa lasciava nelle pause. Ho studiato Lettere per
              un anno, poi mi sono resa conto che quella attenzione al racconto
              interiore era la stessa cosa che cercavo in un&apos;altra forma:
              la psicologia.
            </p>
            <p>
              Mi sono laureata alla Federico II nel 2012, poi ho fatto la
              Scuola di Specializzazione SITCC in Terapia Cognitivo-
              Comportamentale, quattro anni a Roma. Durante la specializzazione
              ho lavorato nei servizi pubblici di salute mentale: ASL, Centri
              di Salute Mentale, reparti ospedalieri. Ho incontrato persone
              giovanissime e adulte, storie semplici e altre molto complesse.
            </p>
            <p>
              Nel 2015 mi sono abilitata e ho aperto il mio studio. All&apos;
              inizio a San Giovanni, poi mi sono trasferita a Chiaia sei anni
              fa. Oggi ricevo sia di persona che online, in italiano e in
              inglese. La maggior parte delle persone che seguo ha tra i 25 e
              i 50 anni.
            </p>
          </div>
        </div>
      </section>

      <div className="w-20 h-px bg-[var(--color-line)] mx-auto my-8"></div>

      {/* Approccio */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4">
            Il mio approccio
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-10">
            Pragmatica e
            <br />
            <em className="font-display-italic">profondamente umana.</em>
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-ink-soft)] leading-[1.9]">
            <p>
              L&apos;approccio cognitivo-comportamentale parte da
              un&apos;osservazione semplice: i nostri pensieri, le nostre
              emozioni e i nostri comportamenti sono connessi. Quando cambiamo
              il modo in cui interpretiamo le situazioni, spesso cambia anche
              come le viviamo.
            </p>
            <p>
              Non è una terapia di sola parola. Usiamo strumenti pratici:
              esercizi tra una seduta e l&apos;altra, schede di
              auto-osservazione, tecniche di regolazione emotiva. Non perché
              dobbiamo seguire un protocollo a tutti i costi — ma perché
              funzionano, se costruiti su misura.
            </p>
            <p>
              Integro quando utile tecniche di <em>mindfulness</em> (per
              imparare a stare con le emozioni senza esserne travolti) e <em>EMDR
              </em> (particolarmente efficace per traumi e lutti complessi).
            </p>
            <p>
              La cosa in cui credo di più: la relazione terapeutica. Il legame
              di fiducia che si costruisce nel tempo è la metà del lavoro.
              L&apos;altra metà la fai tu — io ti accompagno.
            </p>
          </div>
        </div>
      </section>

      {/* Formazione + Albo */}
      <section className="py-24 px-6 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra-dark)] mb-6">
              — Formazione —
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)]">
              Un percorso di studi,
              <br />
              <em className="font-display-italic">un aggiornamento continuo.</em>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                year: "2012",
                title: "Laurea in Psicologia",
                detail: "Università Federico II, Napoli · 110 e lode",
              },
              {
                year: "2015",
                title:
                  "Specializzazione in Psicoterapia Cognitivo-Comportamentale",
                detail: "Scuola SITCC, Roma · Abilitazione alla psicoterapia",
              },
              {
                year: "2017",
                title: "Certificazione EMDR Practitioner",
                detail: "Associazione EMDR Italia",
              },
              {
                year: "2019",
                title: "Master in Mindfulness-Based Cognitive Therapy",
                detail: "University of Oxford, online",
              },
              {
                year: "Dal 2015",
                title: "Albo Ordine Psicologi Campania",
                detail: "Iscrizione N. 8432",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="grid md:grid-cols-12 gap-4 p-6 bg-[var(--color-paper)] rounded-sm border border-[var(--color-line)]"
              >
                <div className="md:col-span-2">
                  <div className="font-display text-xl text-[var(--color-terra-dark)]">
                    {item.year}
                  </div>
                </div>
                <div className="md:col-span-10">
                  <div className="font-medium text-[var(--color-ink)] mb-1">
                    {item.title}
                  </div>
                  <div className="text-sm text-[var(--color-muted)]">
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Riservatezza */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra-dark)] mb-6">
            — Riservatezza —
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-8">
            Quello che dici qui,
            <br />
            <em className="font-display-italic">resta qui.</em>
          </h2>
          <div className="space-y-5 text-[var(--color-ink-soft)] leading-[1.8]">
            <p>
              Sono tenuta al segreto professionale dal Codice Deontologico degli
              Psicologi (art. 11). Questo significa che tutto ciò che condividi
              durante le sedute è coperto dal segreto — non può essere rivelato
              a nessuno senza il tuo esplicito consenso scritto.
            </p>
            <p>
              Lo studio è a conduzione singola. Non ci sono segretarie, non ci
              sono cartelle cliniche cartacee accessibili ad altri. Le note
              delle sedute sono in un database crittografato, accessibile solo
              da me.
            </p>
            <p>
              Per le sedute online uso esclusivamente piattaforme conformi al
              GDPR (Google Meet e Zoom con impostazioni business). Nessuna
              registrazione, mai.
            </p>
          </div>
        </div>
      </section>

      {/* Chiusura */}
      <section className="py-24 md:py-32 px-6 bg-[var(--color-moss)] text-[var(--color-paper)]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display-italic text-2xl md:text-3xl leading-[1.6] mb-10">
            &laquo;Non devi essere in crisi per iniziare.
            <br />
            Puoi cominciare perché senti che ti farebbe bene.&raquo;
          </p>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-terra)]">
            — Chiara
          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/prenota"
              className="bg-[var(--color-terra)] text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition"
            >
              Prima chiamata gratuita
            </Link>
            <Link
              href="/#contatti"
              className="border border-[var(--color-paper)]/40 text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)]/10 transition"
            >
              Contatti
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}
