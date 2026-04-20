export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/60 px-6 py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold text-lg tracking-tight text-white mb-3">
              MARCO<span className="text-white/40">/</span>ESPOSITO
            </div>
            <p className="text-sm leading-relaxed">
              Personal trainer certificato a Napoli. Risultati reali, metodo
              sostenibile.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-white/40 mb-3">
              Naviga
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#chi-sono" className="hover:text-white transition">
                  Chi sono
                </a>
              </li>
              <li>
                <a href="#programmi" className="hover:text-white transition">
                  Programmi
                </a>
              </li>
              <li>
                <a href="#storie" className="hover:text-white transition">
                  Storie clienti
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-white/40 mb-3">
              Social
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>© 2026 Marco Esposito Personal Trainer. P.IVA 01234567890</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Cookie
            </a>
            <a href="#" className="hover:text-white transition">
              Termini
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
