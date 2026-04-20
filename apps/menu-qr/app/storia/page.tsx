import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "La nostra storia — 'A Figlia d'o Presidente",
  description:
    "Tre generazioni nel cuore del centro storico di Napoli. La storia di una pizzeria dal 1989 ad oggi.",
};

export default function StoryPage() {
  return (
    <main>
      <Navbar />

      {/* Intro */}
      <section className="pt-40 md:pt-48 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-8">
            — La nostra storia —
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1] text-[var(--color-ink)] mb-8">
            Tre generazioni,
            <br />
            <em className="font-display-italic text-[var(--color-accent)]">
              un solo forno.
            </em>
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl mx-auto">
            Dal 1989, al numero quarantasette di via dei Tribunali, non è
            cambiato molto. E forse è proprio questo il segreto.
          </p>
        </div>
      </section>

      <div className="w-20 h-px bg-[var(--color-line)] mx-auto"></div>

      {/* Photo statement */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/10] bg-[var(--color-ink)] rounded-sm relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(168, 74, 42, 0.3) 0%, transparent 70%)",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-paper)]/30 text-sm uppercase tracking-[0.3em]">
              [ Foto forno a legna storica ]
            </div>
          </div>
          <p className="text-center text-xs text-[var(--color-muted)] italic mt-4">
            Il forno originale, 1991. Foto dell&apos;archivio di famiglia.
          </p>
        </div>
      </section>

      {/* Giuseppe */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-4">
            Capitolo primo · 1989
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-10">
            Giuseppe, a mani nude
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-ink-soft)] leading-[1.75]">
            <p>
              Giuseppe aveva trentadue anni e una sola cosa che sapeva fare
              bene: la pizza. L&apos;aveva imparata da ragazzo, aiutando suo
              padre al forno del quartiere. Quando decise di aprire un suo
              locale, scelse il centro antico — perché lì la pizza, diceva, ha
              un&apos;altra anima.
            </p>
            <p>
              Il fondo al numero quarantasette di via dei Tribunali era una
              ex-bottega di cartoleria. Piccolo, umido, con un muro di tufo
              grezzo che nessuno aveva mai pensato di intonacare. Giuseppe ci
              vide un forno. Lo fece costruire su misura da un fornaio di Avella
              — in pietra refrattaria, a cupola, capace di raggiungere
              quattrocentoottantacinque gradi.
            </p>
            <p>
              Impastava a mano, di notte, con l&apos;acqua tiepida del
              rubinetto. Le pizze le sfornava dalle diciannove a mezzanotte. Poi
              chiudeva, dormiva tre ore, tornava per impastare il giorno dopo.
              Ha fatto così per ventidue anni.
            </p>
          </div>
        </div>
      </section>

      {/* Divisore */}
      <div className="w-20 h-px bg-[var(--color-line)] mx-auto my-8"></div>

      {/* Salvatore */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-4">
            Capitolo secondo · 2011
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-10">
            Salvatore, fra tradizione e respiro
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-ink-soft)] leading-[1.75]">
            <p>
              Salvatore, figlio di Giuseppe, entrò nel forno a quindici anni,
              durante le estati. Non voleva fare il pizzaiolo. Voleva fare
              l&apos;ingegnere. Poi, una domenica di ottobre del duemilaundici,
              suo padre ebbe un infarto mentre stava chiudendo il locale.
            </p>
            <p>
              Salvatore lasciò l&apos;università, prese in mano il forno e non
              lo ha più lasciato. Ha mantenuto tutto — impasto, ingredienti,
              ritmi — ma ha introdotto una cosa soltanto: la lievitazione di
              trentasei ore. &laquo;È l&apos;unica modifica che mio padre mi ha
              dato il permesso di fare&raquo;, racconta sorridendo. &laquo;Ha
              detto: se funziona meglio, cambia. Altrimenti no&raquo;.
            </p>
          </div>
        </div>
      </section>

      <div className="w-20 h-px bg-[var(--color-line)] mx-auto my-8"></div>

      {/* Maria */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-4">
            Capitolo terzo · 2023
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-10">
            Maria, di ritorno da Parigi
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-ink-soft)] leading-[1.75]">
            <p>
              Maria, nipote di Giuseppe e figlia di Salvatore, è cresciuta tra
              il forno e la scuola. A ventidue anni è partita per Parigi, dove
              ha studiato pasticceria al Ferrandi. Doveva restare in Francia.
              Aveva già un&apos;offerta al Plaza Athénée.
            </p>
            <p>
              Poi suo nonno Giuseppe si è ammalato. Maria è tornata per un
              mese. È rimasta. &laquo;Pensavo — racconta — che avrei imparato
              dal nonno. Invece lui mi ha detto: impara da tuo padre, ormai lui
              sa tutto. Io ho solo da guardare&raquo;.
            </p>
            <p>
              Oggi Maria gestisce il locale insieme a Salvatore. Ha introdotto
              le pizze signature — poche, ragionate, con ingredienti d&apos;
              autore. Ma la Margherita è quella del 1989. Lo sarà sempre.
            </p>
          </div>
        </div>
      </section>

      {/* Filosofia / Ingredienti */}
      <section className="py-24 px-6 bg-[var(--color-bg-alt)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-6">
              — La nostra filosofia —
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)]">
              Una cosa sola,
              <br />
              <em className="font-display-italic">fatta bene.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <Pillar
              number="01"
              title="Il territorio"
              text="Mozzarella di bufala di Agerola, pomodoro del piennolo del Vesuvio DOP, olio extravergine delle colline di Sorrento. Tutti gli ingredienti provengono da produttori campani selezionati personalmente."
            />
            <Pillar
              number="02"
              title="Il tempo"
              text="L'impasto lievita trentasei ore in cella a temperatura controllata. Non si possono fare pizze buone di fretta. Chi ha fretta, non può fare la pizza."
            />
            <Pillar
              number="03"
              title="Il fuoco"
              text="Forno a legna in pietra refrattaria. Temperatura di cottura: quattrocentoottantacinque gradi. Tempo di cottura: sessanta secondi esatti. È così dal 1989."
            />
          </div>
        </div>
      </section>

      {/* Chiusura */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display-italic text-2xl md:text-3xl text-[var(--color-ink-soft)] leading-relaxed mb-10">
            &laquo;La pizza migliore è quella che si ricorda. E si ricorda
            quella fatta con pazienza.&raquo;
          </p>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
            — Giuseppe, 1992
          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition"
            >
              Scopri il menu
            </Link>
            <a
              href="tel:+390811234567"
              className="border border-[var(--color-ink)] text-[var(--color-ink)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition"
            >
              Prenota un tavolo
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Pillar({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="font-display text-6xl text-[var(--color-accent)] leading-none mb-4">
        {number}
      </div>
      <h3 className="font-display text-2xl text-[var(--color-ink)] mb-4">
        {title}
      </h3>
      <p className="text-[var(--color-ink-soft)] leading-relaxed text-[15px]">
        {text}
      </p>
    </div>
  );
}
