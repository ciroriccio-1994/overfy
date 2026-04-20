"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";
import { useBooking } from "../components/BookingContext";
import { treatments, doctors } from "@/lib/data";

export default function ConfirmationPage() {
  const { booking, reset } = useBooking();
  const router = useRouter();

  const treatment = treatments.find((t) => t.slug === booking.treatmentSlug);
  const doctor = doctors.find((d) => d.id === booking.doctorId);

  useEffect(() => {
    if (!treatment || !booking.date) {
      router.push("/prenota");
    }
  }, [treatment, booking.date, router]);

  if (!treatment || !booking.date || !booking.time) return null;

  const formattedDate = new Date(booking.date).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const code = "SR-" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 9000 + 1000);

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 px-6 min-h-[80vh]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 border-2 border-[var(--color-sage-dark)] rounded-full flex items-center justify-center text-[var(--color-sage-dark)] text-2xl mx-auto mb-8">
              ✓
            </div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-sage-dark)] mb-6">
              — Prenotazione confermata —
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-4 leading-tight">
              A presto,{" "}
              <em className="font-display-italic text-[var(--color-sage-dark)]">
                {booking.patient.name.split(" ")[0] || "gentile paziente"}.
              </em>
            </h1>
            <p className="text-[var(--color-ink-soft)] leading-relaxed">
              La aspettiamo allo Studio Rinascita per il suo appuntamento.
              Riceverà a breve una email di conferma e un promemoria WhatsApp 24
              ore prima.
            </p>
          </div>

          <div className="bg-[var(--color-paper)] p-10 border border-[var(--color-line)] mb-6 rounded-sm">
            <div className="flex items-center justify-between pb-6 border-b border-[var(--color-line)] mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)] mb-1">
                  Codice prenotazione
                </div>
                <div className="font-display text-xl text-[var(--color-ink)]">{code}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)] mb-1">
                  Studio
                </div>
                <div className="font-display text-xl text-[var(--color-sage-dark)]">
                  Rinascita
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Row label="Trattamento" main={treatment.name} />
              <Row
                label="Dottore"
                main={doctor?.id === "any" || !doctor ? "Da assegnare" : doctor.name}
                sub={doctor?.id === "any" || !doctor ? undefined : doctor.role}
              />
              <Row label="Data" main={formattedDate} highlight />
              <Row label="Orario" main={booking.time} highlight />
              <Row label="Paziente" main={booking.patient.name} sub={booking.patient.email} />
            </div>
          </div>

          <div className="bg-[var(--color-bg-soft)] p-6 rounded-sm mb-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-sage-dark)] mb-4">
              Come prepararsi
            </div>
            <ul className="space-y-3 text-sm text-[var(--color-ink-soft)]">
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">·</span>
                Arrivare 10 minuti prima per l&apos;accettazione
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">·</span>
                Portare tessera sanitaria e documento d&apos;identità
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">·</span>
                Se disponibili, portare radiografie o TAC recenti
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">·</span>
                Per modifiche: 081 234 5678 (24h prima è gratuito)
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link
              href="/"
              onClick={() => reset()}
              className="bg-[var(--color-ink)] text-[var(--color-paper)] px-7 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-sage-dark)] transition text-center"
            >
              Torna alla home
            </Link>
            <button
              onClick={() => window.print()}
              className="border border-[var(--color-ink)] text-[var(--color-ink)] px-7 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-paper)] transition"
            >
              Stampa conferma
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}

function Row({
  label,
  main,
  sub,
  highlight,
}: {
  label: string;
  main: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)] mb-1">
        {label}
      </div>
      <div
        className={`text-[var(--color-ink)] ${
          highlight ? "font-display text-2xl text-[var(--color-sage-dark)] capitalize" : ""
        }`}
      >
        {main}
      </div>
      {sub && (
        <div className="text-xs text-[var(--color-muted)] mt-1">{sub}</div>
      )}
    </div>
  );
}
