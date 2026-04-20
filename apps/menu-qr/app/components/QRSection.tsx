"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { QRCode } from "./QRCode";

export function QRSection() {
  const [menuUrl, setMenuUrl] = useState("/menu");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMenuUrl(`${window.location.origin}/menu`);
    }
  }, []);

  return (
    <section id="menu-section" className="py-24 md:py-32 px-6 bg-[var(--color-bg-alt)]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-6">
            Il menu
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-[var(--color-ink)] leading-[1] mb-8">
            Scansiona,
            <br />
            <em className="font-display-italic text-[var(--color-accent)]">
              sfoglia, scegli.
            </em>
          </h2>
          <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
            Il nostro menu è sempre aggiornato. Inquadra il codice con la
            fotocamera del telefono per sfogliarlo direttamente dal tavolo.
          </p>
          <p className="text-sm text-[var(--color-muted)] italic mb-10">
            Oppure se preferisci, aprilo qui sotto.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 text-[var(--color-ink)] border-b border-[var(--color-ink)] pb-1 text-sm uppercase tracking-[0.15em] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition"
          >
            Apri il menu
            <span>→</span>
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="bg-[var(--color-paper)] p-10 md:p-12 rounded-sm relative">
            {/* Cornice decorativa */}
            <div className="absolute top-3 left-3 right-3 bottom-3 border border-[var(--color-line)]/60 pointer-events-none"></div>
            <div className="absolute top-5 left-5 right-5 bottom-5 border-t border-b border-[var(--color-line)]/30 pointer-events-none"></div>

            <div className="relative">
              <div className="text-center mb-6">
                <div className="font-display italic text-lg text-[var(--color-accent)]">
                  'A Figlia d'o Presidente
                </div>
                <div className="w-10 h-px bg-[var(--color-line)] mx-auto my-3"></div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  Il menu digitale
                </div>
              </div>

              <div className="flex justify-center my-6">
                <QRCode value={menuUrl} size={240} />
              </div>

              <div className="text-center mt-6">
                <div className="w-10 h-px bg-[var(--color-line)] mx-auto mb-3"></div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  Scansiona con la fotocamera
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
