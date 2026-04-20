import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";

export const metadata = {
  title: "Lo Studio — Studio Dentistico Rinascita",
  description:
    "La storia, la filosofia e i valori dello Studio Dentistico Rinascita a Posillipo.",
};

export default function StudioPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-40 md:pt-48 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-sage-dark)] mb-8">
            — Lo studio —
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1] text-[var(--color-ink)] mb-8">
            Vent'anni dedicati
            <br />
            <em className="font-display-italic text-[var(--color-sage-dark)]">
              a un sorriso alla volta.
            </em>
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl mx-auto">
            Nato a Posillipo nel 2005, lo Studio Rinascita è oggi un punto di
            riferimento per chi cerca odontoiatria di eccellenza in un ambiente
            accogliente, tecnologico, umano.
          </p>
        </div>
      </section>

      <div className="w-20 h-px bg-[var(--color-line)] mx-auto"></div>

      {/* Immagine statement */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/10] bg-gradient-to-br from-[var(--color-sage)]/40 to-[var(--color-bg-soft)] rounded-sm relative overflow-hidden flex items-center justify-center">
            <div className="text-[var(--color-muted)]/40 text-xs uppercase tracking-[0.3em]">
              [ Foto dello studio ]
            </div>
          </div>
        </div>
      </section>

      {/* Storia */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4">
            La nostra storia
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-10">
            Un&apos;idea semplice:
            <br />
            <em className="font-display-italic">mettere il paziente al centro.</em>
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-ink-soft)] leading-[1.8]">
            <p>
              Quando la dott.ssa Alessandra Romano ha aperto lo Studio
              Rinascita nel 2005, aveva una sola idea in testa: offrire
              un&apos;odontoiatria che non facesse più paura. La sua formazione
              a Bologna, i due anni passati come visiting al New York
              University, la passione per l&apos;implantologia digitale le
              avevano insegnato una cosa sopra tutte: la tecnologia migliore è
              inutile se il paziente non si fida.
            </p>
            <p>
              Da quel primo studio di due riuniti siamo cresciuti negli anni
              fino a diventare un team di quattro professionisti. Abbiamo
              aggiunto un&apos;ortodonzia, un&apos;estetica dentale, un reparto
              di igiene dedicato. Ma la filosofia è rimasta invariata: il tempo
              dedicato all&apos;ascolto, prima della cura.
            </p>
            <p>
              Oggi, dopo vent&apos;anni, continuiamo a pensare che la cosa più
              importante in uno studio dentistico non sia lo strumento — anche
              se investiamo senza sosta in tecnologia. La cosa più importante è
              come ci si sente quando si entra, quando ci si siede, quando si
              torna a casa.
            </p>
          </div>
        </div>
      </section>

      <div className="w-20 h-px bg-[var(--color-line)] mx-auto my-8"></div>

      {/* Valori / Filosofia */}
      <section className="py-24 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-sage-dark)] mb-6">
              — I nostri valori —
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)]">
              Tre principi,
              <br />
              <em className="font-display-italic">nessun compromesso.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <Pillar
              number="01"
              title="Trasparenza"
              text="Preventivo scritto prima di ogni trattamento. Nessun costo nascosto, nessuna sorpresa. Se ci sono più opzioni terapeutiche, le confrontiamo con lei apertamente."
            />
            <Pillar
              number="02"
              title="Tecnologia"
              text="Investiamo ogni anno in strumentazione di ultima generazione. Scanner intraorale, chirurgia computer-guidata, radiografia 3D. Non per moda: per offrire trattamenti meno invasivi e più precisi."
            />
            <Pillar
              number="03"
              title="Umanità"
              text="Il tempo di ascolto che dedichiamo al paziente è parte del trattamento. Prima di ogni procedura chiediamo, spieghiamo, aspettiamo. La fretta non è mai un nostro obiettivo."
            />
          </div>
        </div>
      </section>

      {/* Certificazioni */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-sage-dark)] mb-6">
              — Certificazioni —
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight text-[var(--color-ink)]">
              Riconoscimenti che garantiscono
              <br />
              <em className="font-display-italic">la nostra qualità.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Iscrizione Ordine Medici di Napoli",
                detail: "N. 12345, dal 2005",
              },
              {
                title: "Certificazione ISO 9001:2015",
                detail: "Sistema di gestione qualità",
              },
              {
                title: "Invisalign Platinum Provider",
                detail: "Oltre 150 casi completati",
              },
              {
                title: "Straumann Partner Clinic",
                detail: "Implantologia certificata",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="p-6 border border-[var(--color-line)] rounded-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 border border-[var(--color-gold)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-gold)] text-xs">✓</span>
                </div>
                <div>
                  <div className="font-medium text-[var(--color-ink)]">
                    {c.title}
                  </div>
                  <div className="text-sm text-[var(--color-muted)] mt-1">
                    {c.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiusura */}
      <section className="py-24 px-6 bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display-italic text-2xl md:text-3xl leading-relaxed mb-10">
            &laquo;Un buon dentista non è quello che ti fa tornare prima.
            È quello da cui non hai paura di tornare.&raquo;
          </p>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-sage)]">
            — Dott.ssa Alessandra Romano
          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/prenota"
              className="bg-[var(--color-sage)] text-[var(--color-ink)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)] transition"
            >
              Prima visita gratuita
            </Link>
            <a
              href="tel:+390812345678"
              className="border border-[var(--color-paper)]/40 text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)]/10 transition"
            >
              Chiama lo studio
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
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
      <div className="font-display text-6xl text-[var(--color-sage-dark)] leading-none mb-4">
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
