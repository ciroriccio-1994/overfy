import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]/40 px-6 py-8 border-t border-[var(--color-paper)]/10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[11px]">
        <div className="flex items-center gap-6">
          <div className="font-display italic text-[var(--color-paper)]/70">
            'A Figlia d'o Presidente
          </div>
          <div>© 2026 · P.IVA 02345678901</div>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-[var(--color-paper)] transition">
            Home
          </Link>
          <Link href="/storia" className="hover:text-[var(--color-paper)] transition">
            Storia
          </Link>
          <Link href="/menu" className="hover:text-[var(--color-paper)] transition">
            Menu
          </Link>
        </div>
      </div>
    </footer>
  );
}
