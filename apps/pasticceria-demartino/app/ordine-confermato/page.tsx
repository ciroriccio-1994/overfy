import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";

export default function OrderConfirmedPage() {
  return (
    <main>
      <Navbar />
      <section className="py-20 px-6 min-h-[60vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-[var(--color-success)] rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-6">
            ✓
          </div>
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Ordine confermato
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-coffee)] mb-4">
            Grazie, il tuo ordine è in <em className="text-[var(--color-wine)]">preparazione</em>.
          </h1>
          <p className="text-[var(--color-muted)] leading-relaxed mb-8">
            Abbiamo ricevuto la tua richiesta. Riceverai una email di conferma a
            breve con il numero di tracking. I dolci verranno preparati la
            mattina della spedizione e arriveranno entro 24 ore.
          </p>

          <div className="bg-[var(--color-ivory)] rounded-2xl p-6 mb-8 text-left">
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3">
              Prossimi passi
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">1.</span>
                <span>
                  <strong>Email di conferma</strong> (entro 5 minuti) con il
                  riepilogo del tuo ordine
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">2.</span>
                <span>
                  <strong>Preparazione</strong> la mattina della spedizione, tra
                  le 4 e le 8
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">3.</span>
                <span>
                  <strong>Tracking</strong> via SMS e email appena il pacco parte
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">4.</span>
                <span>
                  <strong>Consegna in 24h</strong> con corriere espresso
                  refrigerato
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-[var(--color-coffee)] text-[var(--color-cream)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-wine)] transition"
            >
              Torna al negozio
            </Link>
            <Link
              href="/spedizioni"
              className="border border-[var(--color-coffee)] text-[var(--color-coffee)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-ivory)] transition"
            >
              Info spedizioni
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <CartDrawer />
    </main>
  );
}
