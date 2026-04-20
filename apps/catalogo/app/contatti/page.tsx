import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function ContattiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link
              href="/"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition mb-6 inline-block"
            >
              ← Torna alla home
            </Link>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Parliamo
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">
                del tuo progetto.
              </em>
            </h1>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
              Compila il form qui sotto o scrivici a{" "}
              <a
                href="mailto:info@overfydigital.com"
                className="text-[var(--color-ink)] underline decoration-[var(--color-mint)] decoration-2 underline-offset-4 hover:text-[var(--color-mint-ink)] transition"
              >
                info@overfydigital.com
              </a>
              . Ti rispondiamo entro 24 ore lavorative.
            </p>
          </div>

          <form
            action="mailto:info@overfydigital.com"
            method="post"
            encType="text/plain"
            className="space-y-6 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
                  placeholder="Marco Rossi"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
                  placeholder="marco@esempio.it"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                Attività / Azienda
              </label>
              <input
                type="text"
                name="azienda"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
                placeholder="Studio legale Rossi"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                Tipo di progetto
              </label>
              <select
                name="progetto"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition"
              >
                <option value="">Seleziona una categoria</option>
                <option value="sito-vetrina">Sito vetrina / landing</option>
                <option value="prenotazioni">Sistema prenotazioni</option>
                <option value="ecommerce">E-commerce</option>
                <option value="chatbot">Chatbot AI</option>
                <option value="menu-qr">Menu digitale QR</option>
                <option value="app">App native iOS/Android</option>
                <option value="webapp">Web app / gestionale</option>
                <option value="ai-azienda">Tool AI per azienda strutturata</option>
                <option value="altro">Altro / non so ancora</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                Raccontaci cosa ti serve *
              </label>
              <textarea
                name="messaggio"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition resize-none"
                placeholder="Descrivi brevemente la tua attività, cosa vorresti ottenere e in quanto tempo..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
              >
                Invia richiesta →
              </button>
              <a
                href="mailto:info@overfydigital.com"
                className="flex-1 text-center border border-[var(--color-line)] text-[var(--color-ink)] py-4 rounded-full text-sm font-medium hover:border-[var(--color-ink)] transition"
              >
                Scrivi direttamente →
              </a>
            </div>

            <p className="text-xs text-[var(--color-muted)] italic text-center pt-2">
              Inviando accetti che i tuoi dati vengano usati solo per
              risponderti. Nessuna newsletter, nessun contatto indesiderato.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
