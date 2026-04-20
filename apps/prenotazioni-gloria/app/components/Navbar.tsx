"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Chiaia, Napoli
          </span>
          <span className="font-display text-2xl text-[var(--color-ink)] leading-none">
            Salone Gloria
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm">
          <Link
            href="/servizi"
            className="hover:text-[var(--color-gold)] transition"
          >
            Servizi
          </Link>
          <Link
            href="/#staff"
            className="hover:text-[var(--color-gold)] transition"
          >
            Il team
          </Link>
          <Link
            href="/#contatti"
            className="hover:text-[var(--color-gold)] transition"
          >
            Contatti
          </Link>
        </div>

        <Link
          href="/prenota"
          className="bg-[var(--color-ink)] text-[var(--color-bg)] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-gold-dark)] transition"
        >
          Prenota ora →
        </Link>
      </div>
    </nav>
  );
}
