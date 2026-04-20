"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, setOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[var(--color-coffee)] text-[var(--color-cream)] text-xs py-2 text-center px-4">
        🚚 Spedizione refrigerata in 24h in tutta Italia • Gratuita sopra i €60
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-ivory)]/95 backdrop-blur-md shadow-sm"
            : "bg-[var(--color-cream)]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Dal 1952
            </span>
            <span className="font-serif text-2xl text-[var(--color-coffee)] leading-none">
              De Martino
            </span>
          </Link>

          <div className="hidden md:flex gap-8 text-sm">
            <Link
              href="/"
              className="hover:text-[var(--color-gold)] transition"
            >
              Home
            </Link>
            <Link
              href="/negozio"
              className="hover:text-[var(--color-gold)] transition"
            >
              Negozio
            </Link>
            <Link
              href="/storia"
              className="hover:text-[var(--color-gold)] transition"
            >
              La nostra storia
            </Link>
            <Link
              href="/spedizioni"
              className="hover:text-[var(--color-gold)] transition"
            >
              Spedizioni
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="relative bg-[var(--color-coffee)] text-[var(--color-cream)] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-wine)] transition flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Carrello
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-gold)] text-[var(--color-coffee)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
