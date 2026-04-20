import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)]/60 px-6 py-10 border-t border-[var(--color-bg)]/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="font-display text-lg text-[var(--color-bg)]">
            Salone Gloria
          </div>
          <div>© 2026 • P.IVA 03456789012</div>
        </div>
        <div className="flex gap-6">
          <Link href="/servizi" className="hover:text-[var(--color-bg)]">
            Servizi
          </Link>
          <Link href="/prenota" className="hover:text-[var(--color-bg)]">
            Prenota
          </Link>
          <a href="#" className="hover:text-[var(--color-bg)]">
            Privacy
          </a>
          <a href="#" className="hover:text-[var(--color-bg)]">
            Cookie
          </a>
        </div>
      </div>
    </footer>
  );
}
