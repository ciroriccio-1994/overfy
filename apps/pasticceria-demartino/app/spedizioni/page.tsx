import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";

const faqs = [
  {
    q: "Quanto tempo ci mette ad arrivare?",
    a: "Entro 24 ore dalla spedizione in tutta Italia. Campania, Lazio, Toscana, Umbria e Abruzzo ricevono entro il giorno successivo. Nord Italia e isole entro 24-48h.",
  },
  {
    q: "Come viene mantenuta la freschezza?",
    a: "Imballaggio refrigerato con ghiaccio secco alimentare e materiale isolante termico certificato. I dolci arrivano alla stessa temperatura con cui sono stati imballati.",
  },
  {
    q: "In quali giorni spedite?",
    a: "Dal martedì al venerdì. Evitiamo spedizioni nel weekend per garantire che i dolci non restino fermi in magazzino. Ordini del sabato/domenica partono il martedì successivo.",
  },
  {
    q: "Quanto costa la spedizione?",
    a: "Campania €5, Centro e Nord Italia €8, Sicilia e Sardegna €12. Per ordini superiori a €60 la spedizione è sempre gratuita in tutta Italia.",
  },
  {
    q: "Cosa succede se il pacco arriva danneggiato?",
    a: "Se il pacco arriva danneggiato o il contenuto non è integro, inviaci una foto entro 24 ore: rispediamo l'ordine a nostre spese o rimborsiamo tutto.",
  },
  {
    q: "Posso ritirare in negozio?",
    a: "Certo. Ordina online e ritira gratis in via Materdei 45, Napoli. Ti avvisiamo via SMS quando l'ordine è pronto (solitamente in giornata).",
  },
  {
    q: "Spedite anche all'estero?",
    a: "Attualmente spediamo solo in Italia. Stiamo lavorando per attivare Francia, Germania e Austria entro l'anno. Iscriviti alla newsletter per essere avvisato.",
  },
  {
    q: "Come conservo i dolci una volta arrivati?",
    a: "Ogni prodotto ha istruzioni specifiche nella confezione. In generale: sfogliatelle a temperatura ambiente 48h, babà 3 giorni, pastiera 5 giorni in frigo, caprese 5 giorni a temperatura ambiente.",
  },
];

const zones = [
  { name: "Campania", time: "Entro 24h", price: "€5", color: "var(--color-success)" },
  { name: "Centro Italia", time: "Entro 24h", price: "€8", color: "var(--color-gold)" },
  { name: "Nord Italia", time: "24–48h", price: "€8", color: "var(--color-gold)" },
  { name: "Sud Italia", time: "Entro 24h", price: "€8", color: "var(--color-gold)" },
  { name: "Sicilia e Sardegna", time: "24–48h", price: "€12", color: "var(--color-wine)" },
];

export default function ShippingPage() {
  return (
    <main>
      <Navbar />

      <section className="py-20 px-6 bg-[var(--color-ivory)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-6">
            Spedizioni
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-coffee)] mb-6 leading-tight">
            Dal forno alla tua casa,
            <br />
            <em className="text-[var(--color-wine)]">in 24 ore.</em>
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
            Imballaggio refrigerato, corriere espresso, tracking in tempo reale.
            Ogni dolce arriva come appena sfornato.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl text-[var(--color-coffee)] mb-12 text-center">
            Zone e tempi di consegna
          </h2>

          <div className="space-y-3">
            {zones.map((z, i) => (
              <div
                key={i}
                className="bg-[var(--color-ivory)] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[var(--color-border)]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-3 h-12 rounded-full"
                    style={{ background: z.color }}
                  ></div>
                  <div>
                    <div className="font-serif text-xl text-[var(--color-coffee)]">
                      {z.name}
                    </div>
                    <div className="text-sm text-[var(--color-muted)]">
                      {z.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="font-serif text-2xl text-[var(--color-coffee)]">
                    {z.price}
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">
                    <div>Gratis oltre</div>
                    <div className="font-semibold text-[var(--color-coffee)]">
                      €60
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--color-ivory)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-[var(--color-coffee)] mb-12 text-center">
            Domande frequenti
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="bg-[var(--color-cream)] rounded-2xl border border-[var(--color-border)] overflow-hidden group"
              >
                <summary className="px-6 py-5 cursor-pointer flex items-center justify-between hover:bg-[var(--color-ivory)] transition">
                  <span className="font-semibold text-[var(--color-coffee)]">
                    {f.q}
                  </span>
                  <span className="text-2xl text-[var(--color-gold)] group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-[var(--color-muted)] leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  );
}
