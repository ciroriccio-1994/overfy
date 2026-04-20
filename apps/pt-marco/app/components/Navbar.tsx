"use client";

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
          ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-lg tracking-tight">
          MARCO<span className="text-[var(--color-muted)]">/</span>ESPOSITO
        </div>
        <div className="hidden md:flex gap-8 text-sm">
          <a href="#chi-sono" className="hover:text-[var(--color-muted)] transition">
            Chi sono
          </a>
          <a href="#programmi" className="hover:text-[var(--color-muted)] transition">
            Programmi
          </a>
          <a href="#storie" className="hover:text-[var(--color-muted)] transition">
            Storie
          </a>
          <a href="#faq" className="hover:text-[var(--color-muted)] transition">
            FAQ
          </a>
        </div>
        <a
          href="#contatti"
          className="bg-[var(--color-ink)] text-[var(--color-bg)] px-5 py-2 rounded-full text-sm font-medium hover:opacity-80 transition"
        >
          Prenota
        </a>
      </div>
    </nav>
  );
}
