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
          ? "bg-[var(--color-paper)]/85 backdrop-blur-md border-b border-[var(--color-line)]/50 py-3"
          : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group">
          <div className="font-display text-xl tracking-tight leading-none">
            'A Figlia d'o Presidente
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)] mt-1">
            Pizzeria · Napoli
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm">
          <Link
            href="/"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Home
          </Link>
          <Link
            href="/storia"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            La nostra storia
          </Link>
          <Link
            href="/menu"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Menu
          </Link>
          <a
            href="tel:+390811234567"
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] hover:bg-[var(--color-accent)] transition"
          >
            Prenota
          </a>
        </div>

        <a
          href="tel:+390811234567"
          className="md:hidden bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em]"
        >
          Prenota
        </a>
      </div>
    </nav>
  );
}
