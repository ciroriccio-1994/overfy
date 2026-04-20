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
          ? "bg-[var(--color-paper)]/95 backdrop-blur-md border-b border-[var(--color-line)] py-3"
          : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 border border-[var(--color-sage)] rounded-full flex items-center justify-center">
            <span className="font-display text-lg text-[var(--color-sage-dark)]">
              R
            </span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-base text-[var(--color-ink)]">
              Studio Rinascita
            </div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Odontoiatria · Posillipo
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-sage-dark)] transition"
          >
            Home
          </Link>
          <Link
            href="/studio"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-sage-dark)] transition"
          >
            Lo studio
          </Link>
          <Link
            href="/#trattamenti"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-sage-dark)] transition"
          >
            Trattamenti
          </Link>
          <Link
            href="/prenota"
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] hover:bg-[var(--color-sage-dark)] transition"
          >
            Prima visita gratuita
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
