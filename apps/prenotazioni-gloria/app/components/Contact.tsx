import Link from "next/link";
import { ArrowRight, Clock, MapPin, Mail, Phone, ChiaiaMap } from "./Icon";

const hours = [
  { day: "Lunedì", time: "Chiuso" },
  { day: "Martedì", time: "9:00 – 19:30" },
  { day: "Mercoledì", time: "9:00 – 19:30" },
  { day: "Giovedì", time: "9:00 – 20:30" },
  { day: "Venerdì", time: "9:00 – 20:30" },
  { day: "Sabato", time: "9:00 – 19:00" },
  { day: "Domenica", time: "Chiuso" },
];

export function Contact() {
  return (
    <section
      id="contatti"
      className="py-24 md:py-32 px-6 lg:px-10 scroll-mt-20 bg-[var(--color-bg-warm)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — heading + contact details + map */}
          <div className="lg:col-span-7">
            <div className="eyebrow eyebrow-line mb-5">
              <span>Vieni a trovarci</span>
            </div>
            <h2 className="font-display-light text-4xl md:text-6xl text-[var(--color-ink)] leading-[1.05] mb-10">
              Un piccolo salone
              <br />
              <span className="italic font-medium text-[var(--color-gold-dark)]">
                a due passi dal mare.
              </span>
            </h2>

            {/* Mappa decorativa */}
            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] aspect-[10/7] mb-10 overflow-hidden">
              <ChiaiaMap className="w-full h-full text-[var(--color-ink-soft)]" />
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <ContactRow
                icon={<MapPin size={18} />}
                eyebrow="Indirizzo"
                value="Via dei Mille 38"
                sub="80121 Napoli"
                href="https://maps.google.com/?q=Via+dei+Mille+38+Napoli"
                hrefLabel="Apri in Maps"
              />
              <ContactRow
                icon={<Phone size={18} />}
                eyebrow="Telefono"
                value="081 112 2334"
                sub="Risponde Maria"
                href="tel:+390811122334"
              />
              <ContactRow
                icon={<Mail size={18} />}
                eyebrow="Email"
                value="info@salonegloria.it"
                sub="Risposta in 24h"
                href="mailto:info@salonegloria.it"
              />
            </div>
          </div>

          {/* RIGHT — orari */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--color-ink)] text-[var(--color-bg)] p-10 md:p-12 sticky top-28">
              <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-[var(--color-bg)]/15">
                <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold-soft)]">
                  Orari di apertura
                </div>
                <Clock size={18} className="text-[var(--color-gold-soft)]" />
              </div>

              <div className="space-y-3.5 text-sm mb-8">
                {hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-baseline pb-3 border-b border-[var(--color-bg)]/10 last:border-b-0"
                  >
                    <span className="text-[var(--color-bg)]/60 tracking-wide">
                      {h.day}
                    </span>
                    <span
                      className={`font-display ${
                        h.time === "Chiuso"
                          ? "text-[var(--color-bg)]/30 italic"
                          : "text-[var(--color-bg)] text-base"
                      }`}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status pill */}
              <div className="border border-[var(--color-success)]/40 bg-[var(--color-success)]/10 p-4 mb-8">
                <div className="flex items-center gap-3 text-[var(--color-success)] mb-1">
                  <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full pulse-soft" />
                  <span className="text-[11px] uppercase tracking-[0.28em]">
                    Aperti ora
                  </span>
                </div>
                <div className="text-xs text-[var(--color-bg)]/60 leading-relaxed pl-4">
                  Chiudiamo alle 19:30. Ultimo appuntamento alle 18:30.
                </div>
              </div>

              <Link
                href="/prenota"
                className="group w-full inline-flex items-center justify-center gap-2 bg-[var(--color-gold)] text-[var(--color-ink)] py-4 text-sm tracking-wide hover:bg-[var(--color-gold-soft)] transition"
              >
                Prenota online
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  eyebrow,
  value,
  sub,
  href,
  hrefLabel,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  value: string;
  sub?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[var(--color-gold-dark)] mb-3">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.28em]">
          {eyebrow}
        </span>
      </div>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="font-display text-2xl text-[var(--color-ink)] underline-grow"
        >
          {value}
        </a>
      ) : (
        <div className="font-display text-2xl text-[var(--color-ink)]">
          {value}
        </div>
      )}
      {sub && (
        <div className="text-xs text-[var(--color-muted)] mt-1">{sub}</div>
      )}
      {href && hrefLabel && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[11px] text-[var(--color-gold-dark)] mt-2 underline underline-offset-2 hover:text-[var(--color-ink)] transition"
        >
          {hrefLabel} →
        </a>
      )}
    </div>
  );
}
