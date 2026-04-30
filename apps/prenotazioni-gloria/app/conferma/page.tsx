"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useBooking } from "../components/BookingContext";
import { services, staff } from "@/lib/services";
import {
  Check,
  MapPin,
  Clock,
  Phone,
  ArrowLeft,
  Ornament,
  MonogramSG,
} from "../components/Icon";

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

  const bookingCode =
    "SG-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(Math.random() * 9000 + 1000);

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 px-6 lg:px-10 min-h-[80vh]">
        <div className="max-w-3xl mx-auto">
          {/* Success header */}
          <div className="text-center mb-14">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 border border-[var(--color-success)]/30 rounded-full" />
              <div className="absolute inset-2 border border-[var(--color-success)]/50 rounded-full" />
              <div className="absolute inset-4 bg-[var(--color-success)] rounded-full flex items-center justify-center text-white">
                <Check size={20} />
              </div>
            </div>
            <div className="eyebrow eyebrow-line justify-center mb-5 inline-flex">
              <span>Prenotazione confermata</span>
            </div>
            <h1 className="font-display-light text-4xl md:text-6xl text-[var(--color-ink)] leading-[1.05] mb-5">
              A presto,
              <br />
              <span className="italic font-medium text-[var(--color-gold-dark)]">
                {booking.customer.name || "ospite"}.
              </span>
            </h1>
            <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-md mx-auto">
              Ti aspettiamo al Salone Gloria per il tuo appuntamento. Riceverai
              conferma via email e SMS.
            </p>
            <Ornament className="text-[var(--color-gold)] mx-auto mt-8" />
          </div>

          {/* Riepilogo "ticket" */}
          <div className="bg-[var(--color-white)] border border-[var(--color-border)] mb-6">
            {/* Header del ticket */}
            <div className="flex items-center justify-between p-8 border-b border-[var(--color-border)] bg-[var(--color-bg-warm)]/40">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)] mb-1">
                  Codice prenotazione
                </div>
                <div className="font-display-light text-2xl text-[var(--color-ink)] tracking-wider">
                  {bookingCode}
                </div>
              </div>
              <MonogramSG size={56} className="text-[var(--color-gold-dark)]" />
            </div>

            {/* Body del ticket */}
            <div className="p-8 grid sm:grid-cols-2 gap-8">
              <Row label="Servizio" value={service.name} sub={`${service.duration} minuti · €${service.price}`} />
              <Row
                label="Operatore"
                value={
                  staffMember?.id === "any" || !staffMember
                    ? "Da assegnare"
                    : staffMember.name
                }
                sub={staffMember?.role}
              />
              <Row
                label="Data e ora"
                value={formattedDate}
                sub={booking.time}
                highlight
                capitalize
              />
              <Row
                label="Cliente"
                value={booking.customer.name}
                sub={booking.customer.email}
              />
            </div>
          </div>

          {/* Cose utili da sapere */}
          <div className="bg-[var(--color-bg-warm)]/50 border border-[var(--color-border)] p-8 mb-8">
            <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)] mb-5">
              Cose utili da sapere
            </div>
            <ul className="space-y-4 text-sm">
              <Bullet icon={<MapPin size={16} />}>
                <span className="font-medium text-[var(--color-ink)]">
                  Via dei Mille 38, 80121 Napoli
                </span>
                <a
                  href="https://maps.google.com/?q=Via+dei+Mille+38+Napoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-[var(--color-gold-dark)] underline underline-offset-2 mt-1 hover:text-[var(--color-ink)] transition"
                >
                  Apri in Google Maps →
                </a>
              </Bullet>
              <Bullet icon={<Clock size={16} />}>
                <span className="text-[var(--color-ink-soft)]">
                  Ti consigliamo di arrivare 5 minuti prima
                  dell&apos;appuntamento.
                </span>
              </Bullet>
              <Bullet icon={<Phone size={16} />}>
                <span className="text-[var(--color-ink-soft)]">
                  Per modifiche o disdette:{" "}
                  <a
                    href="tel:+390811122334"
                    className="text-[var(--color-ink)] underline underline-offset-2"
                  >
                    081 112 2334
                  </a>
                </span>
              </Bullet>
              <Bullet icon={<ArrowLeft size={16} />}>
                <span className="text-[var(--color-ink-soft)]">
                  Disdetta gratuita fino a 24h prima.
                </span>
              </Bullet>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              onClick={() => reset()}
              className="bg-[var(--color-ink)] text-[var(--color-bg)] px-8 py-4 text-sm tracking-wide hover:bg-[var(--color-gold-dark)] transition text-center"
            >
              Torna alla home
            </Link>
            <button
              onClick={() => window.print()}
              className="border border-[var(--color-ink)]/20 px-8 py-4 text-sm tracking-wide hover:border-[var(--color-ink)] hover:bg-[var(--color-bg-warm)] transition"
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
  capitalize,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  capitalize?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-1.5">
        {label}
      </div>
      <div
        className={`font-display text-xl text-[var(--color-ink)] leading-tight ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </div>
      {sub && (
        <div
          className={`mt-0.5 ${
            highlight
              ? "font-display-light text-3xl text-[var(--color-gold-dark)] mt-1"
              : "text-xs text-[var(--color-muted)]"
          }`}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Bullet({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 items-start">
      <span className="text-[var(--color-gold-dark)] mt-0.5 flex-shrink-0">
        {icon}
      </span>
      <div className="leading-relaxed">{children}</div>
    </li>
  );
}
