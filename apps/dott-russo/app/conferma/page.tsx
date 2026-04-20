"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";
import { useBooking } from "../components/BookingContext";
import { services, modalityLabels } from "@/lib/data";

export default function ConfirmationPage() {
  const { booking, reset } = useBooking();
  const router = useRouter();

  const service = services.find((s) => s.slug === booking.serviceSlug);

  useEffect(() => {
    if (!service || !booking.date) {
      router.push("/prenota");
    }
  }, [service, booking.date, router]);

  if (!service || !booking.date || !booking.time || !booking.modality) return null;

  const formattedDate = new Date(booking.date).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const code =
    "CR-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(Math.random() * 9000 + 1000);

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 px-6 min-h-[80vh]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 border-2 border-[var(--color-terra-dark)] rounded-full flex items-center justify-center text-[var(--color-terra-dark)] text-2xl mx-auto mb-8">
              ✓
            </div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra-dark)] mb-6">
              — Prenotazione ricevuta —
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-6 leading-tight">
              Grazie,{" "}
              <em className="font-display-italic text-[var(--color-terra-dark)]">
                {booking.patient.name.split(" ")[0] || "gentile"}.
              </em>
            </h1>
            <p className="text-[var(--color-ink-soft)] leading-[1.8]">
              Ho ricevuto la tua richiesta di prenotazione. Ti scrivo entro 24
              ore per confermare l&apos;appuntamento e, se hai scelto la chiamata
              conoscitiva, per concordare il numero su cui chiamarti.
            </p>
          </div>

          <div className="bg-[var(--color-paper)] p-10 border border-[var(--color-line)] mb-6 rounded-sm">
            <div className="flex items-center justify-between pb-6 border-b border-[var(--color-line)] mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)] mb-1">
                  Codice richiesta
                </div>
                <div className="font-display text-xl text-[var(--color-ink)]">
                  {code}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)] mb-1">
                  Dottoressa
                </div>
                <div className="font-display text-xl text-[var(--color-terra-dark)]">
                  Chiara Russo
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Row label="Servizio" main={service.name} sub={`${service.duration} min · ${service.price}`} />
              <Row
                label="Modalità"
                main={
                  booking.modality === "presenza"
                    ? "In studio a Chiaia"
                    : "Online"
                }
                sub={
                  booking.modality === "presenza"
                    ? "Via Filangieri 22, Napoli"
                    : service.slug === "chiamata-conoscitiva"
                    ? "Telefonata"
                    : "Google Meet"
                }
              />
              <Row label="Data" main={formattedDate} highlight />
              <Row label="Orario" main={booking.time} highlight />
              <Row
                label="Contatto"
                main={booking.patient.email}
                sub={booking.patient.phone}
              />
            </div>
          </div>

          <div className="bg-[var(--color-bg-alt)] p-6 rounded-sm mb-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-terra-dark)] mb-4">
              Cosa succede ora
            </div>
            <ul className="space-y-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">·</span>
                Entro 24 ore riceverai la mia email di conferma
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">·</span>
                Se la data non fosse disponibile, ti proporrò un&apos;alternativa
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">·</span>
                Il giorno prima ti arriverà un promemoria via email
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-gold)]">·</span>
                Per modifiche o disdette: chiara@chiararussopsicologa.it
              </li>
            </ul>
          </div>

          <p className="text-center text-sm italic text-[var(--color-muted)] mt-8 mb-10 leading-relaxed">
            Se stai passando un momento difficile e senti che non puoi
            aspettare, chiama il numero verde di sostegno psicologico
            <br />
            <strong className="text-[var(--color-ink)]">800 86 17 35</strong> (gratuito, 24/7).
          </p>

          <div className="flex justify-center">
            <Link
              href="/"
              onClick={() => reset()}
              className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-terra-dark)] transition"
            >
              Torna alla home
            </Link>
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
          highlight
            ? "font-display text-2xl text-[var(--color-terra-dark)] capitalize"
            : ""
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
