"use client";

import Link from "next/link";
import { ArrowRight, MonogramSG, Star } from "./Icon";

/**
 * Foto del salone — Pexels (URL pattern verificato).
 * Photo ID 3993133 = interno salone con sedie e specchi (cottonbro studio).
 */
const HERO_PHOTO =
  "https://images.pexels.com/photos/3993133/pexels-photo-3993133.jpeg?auto=compress&cs=tinysrgb&w=1200";

export function Hero() {
  return (
    <section className="pt-36 md:pt-40 pb-24 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* LEFT: copy + stats */}
        <div className="lg:col-span-7 fade-up">
          <div className="eyebrow eyebrow-line mb-8">
            <span>Dal 2008 · Chiaia, Napoli</span>
          </div>

          <h1 className="font-display-light text-[3.25rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.25rem] text-[var(--color-ink)] leading-[0.95] tracking-tight mb-8">
            Il tuo momento,
            <br />
            <span className="italic font-medium text-[var(--color-gold-dark)]">
              in mani esperte.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-ink-soft)] leading-relaxed max-w-xl mb-10 font-display-light">
            Parrucchiere ed estetica nel cuore di Chiaia. Prenota online il tuo
            appuntamento in meno di un minuto, 24 ore su 24.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link
              href="/prenota"
              className="group inline-flex items-center justify-center gap-2 bg-[var(--color-ink)] text-[var(--color-bg)] px-8 py-4 text-sm tracking-wide hover:bg-[var(--color-gold-dark)] transition"
            >
              Prenota ora
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/servizi"
              className="inline-flex items-center justify-center gap-2 border border-[var(--color-ink)]/20 px-8 py-4 text-sm tracking-wide hover:border-[var(--color-ink)] hover:bg-[var(--color-bg-warm)] transition"
            >
              Esplora i servizi
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl pt-10 border-t border-[var(--color-border)]">
            <Stat figure="17" label="Anni di esperienza" />
            <Stat figure="4" label="Professioniste" />
            <Stat figure="4.9" label="Google Reviews" suffix={<StarRating />} />
          </div>
        </div>

        {/* RIGHT: foto del salone */}
        <div className="lg:col-span-5 relative">
          <SalonePhoto />
        </div>
      </div>
    </section>
  );
}

function Stat({
  figure,
  label,
  suffix,
}: {
  figure: string;
  label: string;
  suffix?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="font-display-light text-4xl sm:text-5xl text-[var(--color-ink)] leading-none">
          {figure}
        </span>
        {suffix}
      </div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}

function StarRating() {
  return (
    <Star
      size={18}
      className="text-[var(--color-gold)] mb-1"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1}
    />
  );
}

function SalonePhoto() {
  return (
    <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-full lg:ml-auto">
      {/* Fallback gradient — visibile se l'immagine non si carica */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-rose-soft)] via-[var(--color-sand)] to-[var(--color-bg-warm)]" />

      {/* Foto principale */}
      <img
        src={HERO_PHOTO}
        alt="Interno del Salone Gloria a Chiaia, Napoli"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay tonale per dare calore */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/30 via-transparent to-transparent" />

      {/* Badge monogramma */}
      <div className="absolute top-5 right-5 bg-[var(--color-bg)]/90 backdrop-blur-sm w-16 h-16 flex items-center justify-center text-[var(--color-gold-dark)]">
        <MonogramSG size={48} />
      </div>

      {/* Etichetta "est. MMVIII" */}
      <div className="absolute bottom-24 left-5 text-[var(--color-bg)] drop-shadow-lg">
        <div className="font-display italic text-2xl leading-none">
          est. MMVIII
        </div>
        <div className="text-[10px] uppercase tracking-[0.32em] mt-1 opacity-90">
          Chiaia · Napoli
        </div>
      </div>

      {/* Cornice doppia */}
      <div className="absolute inset-3 border border-[var(--color-bg)]/30 pointer-events-none" />

      {/* Card "60 secondi" che sborda */}
      <div className="absolute -bottom-6 left-6 right-6 bg-[var(--color-ink)] text-[var(--color-bg)] p-5 flex items-center gap-4 shadow-2xl">
        <div className="font-display italic text-3xl text-[var(--color-gold-soft)] leading-none">
          60″
        </div>
        <div className="flex-1 leading-tight">
          <div className="font-display text-lg">Prenota in 60 secondi</div>
          <div className="text-[11px] text-[var(--color-bg)]/60 tracking-wide">
            Online · 24/7 · senza telefonare
          </div>
        </div>
      </div>
    </div>
  );
}
