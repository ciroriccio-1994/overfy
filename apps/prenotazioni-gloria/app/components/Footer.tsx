import Link from "next/link";
import { Instagram, Whatsapp, MonogramSG } from "./Icon";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)] px-6 lg:px-10 pt-20 pb-10 border-t border-[var(--color-bg)]/10">
      <div className="max-w-7xl mx-auto">
        {/* Top: monogramma centrale + cta */}
        <div className="text-center mb-16 pb-16 border-b border-[var(--color-bg)]/10">
          <MonogramSG
            size={80}
            className="text-[var(--color-gold-soft)] mx-auto mb-6"
          />
          <div className="font-display italic text-3xl text-[var(--color-bg)] mb-2">
            Salone Gloria
          </div>
          <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold-soft)]">
            Chiaia · Napoli · est. MMVIII
          </div>
        </div>

        {/* Middle: nav e social */}
        <div className="grid md:grid-cols-3 gap-10 mb-12 text-sm">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold-soft)] mb-4">
              Naviga
            </div>
            <ul className="space-y-2 text-[var(--color-bg)]/80">
              <li>
                <Link
                  href="/servizi"
                  className="underline-grow hover:text-[var(--color-bg)]"
                >
                  Servizi e listino
                </Link>
              </li>
              <li>
                <Link
                  href="/#staff"
                  className="underline-grow hover:text-[var(--color-bg)]"
                >
                  Il team
                </Link>
              </li>
              <li>
                <Link
                  href="/#contatti"
                  className="underline-grow hover:text-[var(--color-bg)]"
                >
                  Contatti e orari
                </Link>
              </li>
              <li>
                <Link
                  href="/prenota"
                  className="underline-grow hover:text-[var(--color-bg)]"
                >
                  Prenota online
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold-soft)] mb-4">
              Contatti
            </div>
            <ul className="space-y-2 text-[var(--color-bg)]/80">
              <li>Via dei Mille 38, 80121 Napoli</li>
              <li>
                <a
                  href="tel:+390811122334"
                  className="underline-grow hover:text-[var(--color-bg)]"
                >
                  081 112 2334
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@salonegloria.it"
                  className="underline-grow hover:text-[var(--color-bg)]"
                >
                  info@salonegloria.it
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold-soft)] mb-4">
              Seguici
            </div>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-[var(--color-bg)]/20 flex items-center justify-center hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold-soft)] transition"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/390811122334"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 border border-[var(--color-bg)]/20 flex items-center justify-center hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold-soft)] transition"
              >
                <Whatsapp size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-[var(--color-bg)]/40">
          <div>© 2026 Salone Gloria · P.IVA 03456789012</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-bg)]/70 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-[var(--color-bg)]/70 transition">
              Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
