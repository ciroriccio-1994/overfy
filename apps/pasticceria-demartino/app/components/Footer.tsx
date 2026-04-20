import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-coffee)] text-[var(--color-cream)]/70 px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] mb-2">
              Dal 1952
            </div>
            <div className="font-serif text-3xl text-[var(--color-cream)] mb-4">
              De Martino
            </div>
            <p className="text-sm leading-relaxed">
              Pasticceria artigianale napoletana. Tre generazioni di tradizione,
              spediti ovunque in Italia.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-3">
              Naviga
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[var(--color-cream)] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/negozio"
                  className="hover:text-[var(--color-cream)] transition"
                >
                  Negozio
                </Link>
              </li>
              <li>
                <Link
                  href="/storia"
                  className="hover:text-[var(--color-cream)] transition"
                >
                  La nostra storia
                </Link>
              </li>
              <li>
                <Link
                  href="/spedizioni"
                  className="hover:text-[var(--color-cream)] transition"
                >
                  Spedizioni
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-3">
              Contatti
            </div>
            <ul className="space-y-2 text-sm">
              <li>Via Materdei 45, Napoli</li>
              <li>+39 081 123 4567</li>
              <li>info@pasticceriademartino.it</li>
              <li className="pt-2">
                <span className="text-xs text-[var(--color-gold)]">
                  Aperti da mar a dom, 7:00–20:00
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-3">
              Social
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[var(--color-cream)] transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-cream)] transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-cream)] transition">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--color-cream)]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>
            © 2026 Pasticceria De Martino S.r.l. • P.IVA 09876543210 •
            Via Materdei 45, 80136 Napoli
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-cream)] transition">
              Privacy
            </a>
            <a href="#" className="hover:text-[var(--color-cream)] transition">
              Cookie
            </a>
            <a href="#" className="hover:text-[var(--color-cream)] transition">
              Resi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
