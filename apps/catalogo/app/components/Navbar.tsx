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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/92 backdrop-blur-md border-b border-[var(--color-line)] py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <OverfyMark />
          <div className="leading-none">
            <span className="font-display text-2xl text-[var(--color-ink)] tracking-tight">
              Overfy
            </span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-6 text-sm">
          <Link
            href="/#demo"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Esempi
          </Link>
          <Link
            href="/#ai-business"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            AI per aziende
          </Link>
          <Link
            href="/#pacchetti"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition font-medium"
          >
            Pacchetti
          </Link>
          <Link
            href="/#come-funziona"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Come funziona
          </Link>
          <Link
            href="/#modello"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Il modello
          </Link>
          <Link
            href="/contatti"
            className="bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[var(--color-mint-ink)] transition"
          >
            Parla con noi →
          </Link>
        </div>
        <Link
          href="/contatti"
          className="lg:hidden bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2 rounded-full text-xs"
        >
          Contatti
        </Link>
      </div>
    </nav>
  );
}

function OverfyMark() {
  return (
    <span
      className="relative inline-flex items-center"
      aria-hidden="true"
      style={{ width: 40, height: 18 }}
    >
      <span className="flex gap-0.5 absolute left-0 top-1/2 -translate-y-1/2">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-coral)]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-mint)] -ml-1"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sky)] -ml-1"></span>
      </span>
      <svg
        viewBox="0 0 40 18"
        width="40"
        height="18"
        className="absolute left-0 top-0 pointer-events-none overflow-visible"
      >
        <defs>
          <linearGradient id="overfy-mark-arrow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-mint)" />
            <stop offset="100%" stopColor="var(--color-sky)" />
          </linearGradient>
        </defs>
        <path
          d="M 17 13 Q 26 13 32 6"
          fill="none"
          stroke="url(#overfy-mark-arrow)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 32 6 L 28.5 5 M 32 6 L 31.5 9.5"
          fill="none"
          stroke="url(#overfy-mark-arrow)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
