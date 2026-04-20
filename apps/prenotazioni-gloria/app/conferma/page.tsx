"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useBooking } from "../components/BookingContext";
import { services, staff } from "@/lib/services";

export default function ConfirmationPage() {
  const { booking, reset } = useBooking();
  const router = useRouter();

  const service = services.find((s) => s.slug === booking.serviceSlug);
  const staffMember = staff.find((s) => s.id === booking.staffId);

  useEffect(() => {
    if (!service || !booking.date) {
      router.push("/prenota");
    }
  }, [service, booking.date, router]);

  if (!service || !booking.date || !booking.time) {
    return null;
  }

  const formattedDate = new Date(booking.date).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Genera un codice prenotazione finto
  const bookingCode =
    "SG-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(Math.random() * 9000 + 1000);

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 px-6 min-h-[80vh]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-[var(--color-success)] rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-6">
              ✓
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
              Prenotazione confermata
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-4 leading-tight">
              A presto, <em className="text-[var(--color-gold-dark)]">
                {booking.customer.name || "ospite"}
              </em>.
            </h1>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Ti aspettiamo al Salone Gloria per il tuo appuntamento.
              <br />
              Riceverai conferma via email e SMS.
            </p>
          </div>

          {/* Card riepilogo */}
          <div className="bg-[var(--color-white)] rounded-3xl p-8 border border-[var(--color-border)] mb-6">
            <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border)] mb-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
                  Codice prenotazione
                </div>
                <div className="font-display text-xl text-[var(--color-ink)]">
                  {bookingCode}
                </div>
              </div>
              <div className="w-12 h-12 bg-[var(--color-sand)] rounded-xl flex items-center justify-center text-2xl">
                📅
              </div>
            </div>

            <div className="space-y-5">
              <Row label="Servizio" value={`${service.emoji} ${service.name}`} sub={`${service.duration} minuti · €${service.price}`} />
              <Row
                label="Operatore"
                value={
                  staffMember?.id === "any" || !staffMember
                    ? "Da assegnare"
                    : `${staffMember.emoji} ${staffMember.name}`
                }
                sub={staffMember?.role}
              />
              <Row
                label="Data e ora"
                value={formattedDate}
                sub={booking.time}
                highlight
              />
              <Row label="Cliente" value={booking.customer.name} sub={booking.customer.email} />
            </div>
          </div>

          {/* Info importanti */}
          <div className="bg-[var(--color-sand)]/40 rounded-3xl p-6 mb-6 border border-[var(--color-border)]">
            <div className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-3">
              Cose utili da sapere
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-[var(--color-gold-dark)]">📍</span>
                <div>
                  <div className="font-medium text-[var(--color-ink)]">
                    Via dei Mille 38, 80121 Napoli
                  </div>
                  <a
                    href="https://maps.google.com/?q=Via+dei+Mille+38+Napoli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--color-gold)] underline"
                  >
                    Apri in Google Maps →
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold-dark)]">⏰</span>
                <div className="text-[var(--color-ink)]">
                  Ti consigliamo di arrivare 5 minuti prima dell&apos;appuntamento
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold-dark)]">📞</span>
                <div className="text-[var(--color-ink)]">
                  Per modifiche o disdette: <a href="tel:+390811122334" className="underline">081 112 2334</a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold-dark)]">↩</span>
                <div className="text-[var(--color-ink)]">
                  Disdetta gratuita fino a 24h prima
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              onClick={() => reset()}
              className="bg-[var(--color-ink)] text-[var(--color-bg)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-gold-dark)] transition text-center"
            >
              Torna alla home
            </Link>
            <button
              onClick={() => window.print()}
              className="border border-[var(--color-border)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-white)] transition"
            >
              Stampa / Salva
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Row({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
        {label}
      </div>
      <div
        className={`font-semibold text-[var(--color-ink)] ${
          highlight ? "capitalize" : ""
        }`}
      >
        {value}
      </div>
      {sub && (
        <div
          className={`text-xs mt-0.5 ${
            highlight
              ? "font-display text-2xl text-[var(--color-gold-dark)] mt-1"
              : "text-[var(--color-muted)]"
          }`}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
