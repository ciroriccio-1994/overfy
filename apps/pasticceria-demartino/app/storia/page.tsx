import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";

const generations = [
  {
    year: "1952",
    name: "Carmela",
    role: "La fondatrice",
    story:
      "Carmela apre il forno di via Materdei all'età di 34 anni, con la ricetta della sfogliatella tramandata dalla madre. Al mattino prepara l'impasto alle 4, al pomeriggio cuce a casa per mantenere la famiglia. Il forno resta aperto 7 giorni su 7 per 40 anni.",
  },
  {
    year: "1978",
    name: "Vincenzo",
    role: "Seconda generazione",
    story:
      "Vincenzo, figlio di Carmela, entra in pasticceria a 16 anni. Impara ogni ricetta dalla madre senza cambiare nulla. Negli anni '80 introduce la pastiera tra i prodotti stabili, che diventa uno dei cavalli di battaglia. Nel 2019 vince il Premio Pasticceria Campana con la pastiera di famiglia.",
  },
  {
    year: "2015",
    name: "Antonio e Ciro",
    role: "Terza generazione",
    story:
      "I fratelli Antonio e Ciro, figli di Vincenzo, riprendono il forno con una promessa: non cambiare nessuna ricetta. Aggiungono però la spedizione in tutta Italia con imballaggio refrigerato. Oggi serviamo clienti da Bolzano a Palermo, mantenendo la stessa qualità del bancone di via Materdei.",
  },
];

export default function StoryPage() {
  return (
    <main>
      <Navbar />

      <section className="py-20 px-6 bg-[var(--color-ivory)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-6">
            La nostra storia
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-coffee)] mb-6 leading-tight">
            Tre generazioni,
            <br />
            <em className="text-[var(--color-wine)]">una ricetta che non cambia.</em>
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
            Dal 1952 nello stesso forno di via Materdei, con le stesse mani che
            impastano, la stessa ricotta di bufala, lo stesso strutto del
            territorio.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          {generations.map((g, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-[var(--color-caramel)] to-[var(--color-coffee)] rounded-3xl overflow-hidden relative shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-cream)]/30 text-sm">
                  [Foto {g.name}]
                </div>
                <div className="absolute top-4 left-4 bg-[var(--color-gold)] text-[var(--color-coffee)] px-4 py-2 rounded-full font-serif text-sm">
                  {g.year}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-3">
                  {g.role}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-coffee)] mb-6">
                  {g.name}
                </h2>
                <p className="text-[var(--color-muted)] leading-relaxed text-lg">
                  {g.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--color-coffee)] text-[var(--color-cream)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
            Cosa <em className="text-[var(--color-gold)]">non</em> cambia,
            <br />e cosa cambia.
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
            <div className="bg-[var(--color-cream)]/5 backdrop-blur rounded-3xl p-8">
              <div className="text-3xl mb-4">🌾</div>
              <h3 className="font-serif text-2xl text-[var(--color-gold)] mb-4">
                Non cambia
              </h3>
              <ul className="space-y-3 text-[var(--color-cream)]/80 text-sm">
                <li>• La ricetta del 1952, invariata</li>
                <li>• La ricotta di bufala campana DOP</li>
                <li>• Lo strutto locale</li>
                <li>• Il forno a legna al mattino</li>
                <li>• Le mani che impastano</li>
              </ul>
            </div>
            <div className="bg-[var(--color-cream)]/5 backdrop-blur rounded-3xl p-8">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-serif text-2xl text-[var(--color-gold)] mb-4">
                Cambia
              </h3>
              <ul className="space-y-3 text-[var(--color-cream)]/80 text-sm">
                <li>• Ora spediamo in tutta Italia in 24h</li>
                <li>• Imballaggio refrigerato con ghiaccio secco</li>
                <li>• E-commerce con tracking in tempo reale</li>
                <li>• Confezioni regalo personalizzabili</li>
                <li>• Clienti da Bolzano a Palermo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  );
}
