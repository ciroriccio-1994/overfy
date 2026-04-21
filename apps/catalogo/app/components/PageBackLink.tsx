import Link from "next/link";

/**
 * Back-link minimal posizionato sotto la Navbar nelle pagine secondarie.
 * Compensa il padding-top della nav fissa e offre un ritorno rapido alla home.
 */
export function PageBackLink() {
  return (
    <div className="pt-28 md:pt-32 pb-4 px-6 max-w-7xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
      >
        <span>←</span>
        <span>Torna alla home</span>
      </Link>
    </div>
  );
}
