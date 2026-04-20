import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";
import { ShopCatalog } from "./ShopCatalog";

export const metadata = {
  title: "Negozio — Pasticceria De Martino",
  description:
    "Tutti i dolci della pasticceria De Martino. Sfogliatelle, babà, pastiera, caprese, delizie al limone. Spedizione refrigerata 24h in tutta Italia.",
};

export default function ShopPage() {
  return (
    <main>
      <Navbar />

      <section className="py-16 px-6 bg-[var(--color-ivory)] border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Il negozio
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-coffee)] mb-4 leading-tight">
            Tutti i nostri <em className="text-[var(--color-wine)]">dolci</em>.
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
            Otto dolci napoletani artigianali, preparati la mattina della
            spedizione. Scegli i tuoi preferiti o lascia fare a noi con una
            confezione regalo.
          </p>
        </div>
      </section>

      <ShopCatalog />

      <Footer />
      <CartDrawer />
    </main>
  );
}
