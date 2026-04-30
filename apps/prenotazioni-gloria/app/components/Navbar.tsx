"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "./Icon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-bg)]/85 backdrop-blur-xl border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="group flex flex-col items-start leading-none">
          <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)] mb-1">
            Chiaia · Napoli
          </span>
          <span className="font-display text-[1.6rem] md:text-2xl text-[var(--color-ink)] italic">
            Salone Gloria
          </span>
        </Link>

        <div className="hidden md:flex gap-10 text-[13px] tracking-wide">
          <Link
            href="/servizi"
            className="underline-grow text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Servizi
          </Link>
          <Link
            href="/#staff"
            className="underline-grow text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Il team
          </Link>
          <Link
            href="/#contatti"
            className="underline-grow text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Il salone
          </Link>
        </div>

        <Link
          href="/prenota"
          className="group inline-flex items-center gap-2 bg-[var(--color-ink)] text-[var(--color-bg)] px-5 py-2.5 text-[13px] tracking-wide hover:bg-[var(--color-gold-dark)] transition"
        >
          Prenota
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </nav>
  );
}
