import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]/40 px-6 py-8 border-t border-[var(--color-paper)]/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[11px]">
        <div className="flex items-center gap-6">
          <div className="font-display text-[var(--color-paper)]/70">
            Studio Dentistico Rinascita
          </div>
          <div>© 2026 · P.IVA 04567890123 · Iscr. Ordine Medici Napoli n. 12345</div>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-[var(--color-paper)] transition">
            Home
          </Link>
          <Link
            href="/studio"
            className="hover:text-[var(--color-paper)] transition"
          >
            Lo studio
          </Link>
          <Link
            href="/prenota"
            className="hover:text-[var(--color-paper)] transition"
          >
            Prenota
          </Link>
        </div>
      </div>
    </footer>
  );
}
