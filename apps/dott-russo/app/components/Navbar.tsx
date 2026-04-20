"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-paper)]/92 backdrop-blur-md border-b border-[var(--color-line)]/70 py-4"
          : "py-6"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="leading-tight">
          <div className="font-display text-lg text-[var(--color-ink)]">
            Chiara Russo
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-terra-dark)]">
            Psicologa · Psicoterapeuta
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm">
          <Link
            href="/"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-terra-dark)] transition"
          >
            Home
          </Link>
          <Link
            href="/percorso"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-terra-dark)] transition"
          >
            Il percorso
          </Link>
          <Link
            href="/prenota"
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] hover:bg-[var(--color-terra-dark)] transition"
          >
            Prima chiamata
          </Link>
        </div>

        <Link
          href="/prenota"
          className="md:hidden bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em]"
        >
          Prenota
        </Link>
      </div>
    </nav>
  );
}
