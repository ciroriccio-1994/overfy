import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]/40 px-6 py-10 border-t border-[var(--color-paper)]/10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[11px]">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
          <div className="font-display italic text-[var(--color-paper)]/70">
            Dott.ssa Chiara Russo
          </div>
          <div>
            © 2026 · P.IVA 05678901234 · Albo Psicologi Campania 8432
          </div>
        </div>
        <div className="flex gap-6">
          <Link
            href="/"
            className="hover:text-[var(--color-paper)] transition"
          >
            Home
          </Link>
          <Link
            href="/percorso"
            className="hover:text-[var(--color-paper)] transition"
          >
            Il percorso
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
