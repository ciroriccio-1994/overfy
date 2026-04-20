"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../components/BookingContext";
import { services, modalityLabels, Service } from "@/lib/data";

type Step = "service" | "modality" | "datetime" | "patient";

export function BookingFlow() {
  const router = useRouter();
  const { booking, setService, setModality, setDateTime, setPatient } =
    useBooking();
  const [step, setStep] = useState<Step>("service");
  const [submitting, setSubmitting] = useState(false);

  const service = services.find((s) => s.slug === booking.serviceSlug);

  return (
    <section className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <StepDot
            active={step === "service"}
            done={!!booking.serviceSlug && step !== "service"}
            num={1}
            label="Servizio"
          />
          <div className="flex-1 h-px bg-[var(--color-line)]"></div>
          <StepDot
            active={step === "modality"}
            done={!!booking.modality && step !== "modality" && step !== "service"}
            num={2}
            label="Modalità"
          />
          <div className="flex-1 h-px bg-[var(--color-line)]"></div>
          <StepDot
            active={step === "datetime"}
            done={!!booking.date && step === "patient"}
            num={3}
            label="Data e ora"
          />
          <div className="flex-1 h-px bg-[var(--color-line)]"></div>
          <StepDot
            active={step === "patient"}
            done={false}
            num={4}
            label="Dati"
          />
        </div>

        {step === "service" && (
          <ServiceStep
            onSelect={(slug) => {
              setService(slug);
              setStep("modality");
            }}
          />
        )}

        {step === "modality" && service && (
          <ModalityStep
            service={service}
            onBack={() => setStep("service")}
            onSelect={(m) => {
              setModality(m);
              setStep("datetime");
            }}
          />
        )}

        {step === "datetime" && service && booking.modality && (
          <DateTimeStep
            service={service}
            onBack={() => setStep("modality")}
            onSelect={(date, time) => {
              setDateTime(date, time);
              setStep("patient");
            }}
          />
        )}

        {step === "patient" &&
          service &&
          booking.modality &&
          booking.date &&
          booking.time && (
            <PatientStep
              service={service}
              modality={booking.modality}
              date={booking.date}
              time={booking.time}
              onBack={() => setStep("datetime")}
              onSubmit={async (p) => {
                setPatient(p);
                setSubmitting(true);
                await new Promise((r) => setTimeout(r, 1000));
                router.push("/conferma");
              }}
              submitting={submitting}
            />
          )}
      </div>
    </section>
  );
}

function StepDot({
  active,
  done,
  num,
  label,
}: {
  active: boolean;
  done: boolean;
  num: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition ${
          done
            ? "bg-[var(--color-terra-dark)] text-[var(--color-paper)]"
            : active
            ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
            : "border border-[var(--color-line)] text-[var(--color-muted)]"
        }`}
      >
        {done ? "✓" : num}
      </div>
      <span
        className={`hidden md:inline text-xs uppercase tracking-[0.15em] ${
          active ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function ServiceStep({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-terra-dark)] mb-4">
          Passo 1 di 4
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Cosa vorresti prenotare?
        </h2>
        <p className="text-[var(--color-muted)] mt-4 text-sm leading-relaxed max-w-xl">
          Se non hai mai fatto terapia, ti suggerisco di cominciare con la
          prima chiamata conoscitiva gratuita.
        </p>
      </div>

      <div className="space-y-3">
        {services.map((s) => (
          <button
            key={s.slug}
            onClick={() => onSelect(s.slug)}
            className={`w-full text-left p-6 border rounded-sm transition ${
              s.isFirst
                ? "bg-[var(--color-bg-alt)] border-[var(--color-terra)] hover:border-[var(--color-terra-dark)]"
                : "bg-[var(--color-paper)] border-[var(--color-line)] hover:border-[var(--color-terra-dark)]"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="font-display text-2xl text-[var(--color-ink)]">
                  {s.name}
                </h3>
                {s.isFirst && (
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-terra-dark)] border border-[var(--color-terra)] px-2 py-0.5 rounded-full">
                    Consigliato per iniziare
                  </span>
                )}
              </div>
              <div className="font-display text-xl text-[var(--color-terra-dark)] whitespace-nowrap">
                {s.price}
              </div>
            </div>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-3">
              {s.description}
            </p>
            <div className="text-xs text-[var(--color-muted)] flex items-center gap-4">
              <span>Durata {s.duration} min</span>
              <span>·</span>
              <span>{modalityLabels[s.modality]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ModalityStep({
  service,
  onBack,
  onSelect,
}: {
  service: Service;
  onBack: () => void;
  onSelect: (m: "presenza" | "online") => void;
}) {
  // Se il servizio è "solo online", salta automaticamente
  const options: Array<{ id: "presenza" | "online"; label: string; desc: string }> = [];

  if (service.modality === "presenza" || service.modality === "entrambe") {
    options.push({
      id: "presenza",
      label: "In studio a Chiaia",
      desc: "Via Filangieri 22, Napoli. Piano terra con accesso indipendente, sala d'attesa riservata.",
    });
  }
  if (service.modality === "online" || service.modality === "entrambe") {
    options.push({
      id: "online",
      label: "Online",
      desc: service.slug === "chiamata-conoscitiva"
        ? "Telefonata, senza video. Ti chiamo io all'orario concordato."
        : "Videochiamata su Google Meet. Link privato via email prima della seduta.",
    });
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8"
      >
        ← Cambia servizio
      </button>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-terra-dark)] mb-4">
          Passo 2 di 4 · {service.name}
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Come preferisci?
        </h2>
      </div>

      <div className="space-y-3">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onSelect(o.id)}
            className="w-full text-left p-6 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-terra-dark)] transition"
          >
            <div className="font-display text-2xl text-[var(--color-ink)] mb-2">
              {o.label}
            </div>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
              {o.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function DateTimeStep({
  service,
  onBack,
  onSelect,
}: {
  service: Service;
  onBack: () => void;
  onSelect: (date: string, time: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
  ];

  const getUnavailable = (date: string) => {
    const hash = date
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const busy = new Set<string>();
    [1, 3, 6].forEach((i) =>
      busy.add(timeSlots[(hash + i) % timeSlots.length])
    );
    return busy;
  };

  const isClosed = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 2 || day === 6; // dom, mar, sab chiusi
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8"
      >
        ← Cambia modalità
      </button>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-terra-dark)] mb-4">
          Passo 3 di 4
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Quando?
        </h2>
      </div>

      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
          Scegli il giorno
        </div>
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-6 px-6">
          {dates.map((d) => {
            const dateStr = d.toISOString().split("T")[0];
            const closed = isClosed(d);
            const isSelected = selectedDate === dateStr;
            return (
              <button
                key={dateStr}
                onClick={() => !closed && setSelectedDate(dateStr)}
                disabled={closed}
                className={`flex-shrink-0 w-20 py-4 rounded-sm text-center transition ${
                  isSelected
                    ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                    : closed
                    ? "bg-[var(--color-bg-alt)]/40 text-[var(--color-muted)]/50 cursor-not-allowed"
                    : "bg-[var(--color-paper)] border border-[var(--color-line)] hover:border-[var(--color-terra-dark)]"
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider mb-1">
                  {d.toLocaleDateString("it-IT", { weekday: "short" })}
                </div>
                <div className="font-display text-2xl leading-none">
                  {d.getDate()}
                </div>
                <div className="text-[10px] mt-1">
                  {d.toLocaleDateString("it-IT", { month: "short" })}
                </div>
                {closed && <div className="text-[9px] mt-0.5">chiuso</div>}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
            Orari disponibili
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {timeSlots.map((time) => {
              const busy = getUnavailable(selectedDate);
              const isUnavailable = busy.has(time);
              return (
                <button
                  key={time}
                  disabled={isUnavailable}
                  onClick={() => onSelect(selectedDate, time)}
                  className={`py-3 rounded-sm text-sm transition ${
                    isUnavailable
                      ? "bg-[var(--color-bg-alt)]/30 text-[var(--color-muted)]/40 line-through cursor-not-allowed"
                      : "border border-[var(--color-line)] hover:border-[var(--color-terra-dark)] hover:bg-[var(--color-paper)]"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function PatientStep({
  service,
  modality,
  date,
  time,
  onBack,
  onSubmit,
  submitting,
}: {
  service: Service;
  modality: "presenza" | "online";
  date: string;
  time: string;
  onBack: () => void;
  onSubmit: (p: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const formattedDate = new Date(date).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <button
          onClick={onBack}
          className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8"
        >
          ← Cambia data
        </button>
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-terra-dark)] mb-4">
            Passo 4 di 4
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
            I tuoi dati.
          </h2>
          <p className="text-sm text-[var(--color-muted)] italic mt-4">
            Solo lo stretto necessario. Il resto lo scoprirò quando ci
            parleremo.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-5"
        >
          <Input
            label="Come ti chiami"
            required
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <Input
              label="Telefono"
              type="tel"
              required
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted)] mb-2">
              Vuoi dirmi qualcosa di più? (opzionale)
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Se vuoi, scrivi in poche righe cosa ti porta qui. Va benissimo anche non scrivere nulla."
              className="w-full bg-[var(--color-paper)] border border-[var(--color-line)] px-4 py-3 focus:outline-none focus:border-[var(--color-terra-dark)] resize-none rounded-sm"
            />
          </div>

          <label className="flex items-start gap-3 text-xs text-[var(--color-muted)] cursor-pointer pt-2 leading-relaxed">
            <input
              type="checkbox"
              required
              className="mt-0.5 accent-[var(--color-terra-dark)]"
            />
            <span>
              Ho letto l&apos;Informativa Privacy e autorizzo il trattamento dei
              dati personali, anche sensibili, per la gestione
              dell&apos;appuntamento e la comunicazione professionale.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-terra-dark)] transition disabled:opacity-50 mt-4"
          >
            {submitting ? "Invio in corso..." : "Conferma prenotazione"}
          </button>
        </form>
      </div>

      <div>
        <div className="sticky top-24 bg-[var(--color-bg-alt)] p-6 rounded-sm border border-[var(--color-line)]">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-terra-dark)] mb-5">
            Riepilogo
          </div>
          <div className="space-y-5 text-sm">
            <SummaryRow
              label="Servizio"
              main={service.name}
              sub={`${service.duration} min · ${service.price}`}
            />
            <SummaryRow
              label="Modalità"
              main={
                modality === "presenza" ? "In studio a Chiaia" : "Online"
              }
              sub={
                modality === "presenza"
                  ? "Via Filangieri 22"
                  : service.slug === "chiamata-conoscitiva"
                  ? "Telefonata"
                  : "Google Meet"
              }
            />
            <SummaryRow label="Data" main={formattedDate} highlight />
            <SummaryRow label="Orario" main={time} highlight />
          </div>
          <div className="mt-6 pt-6 border-t border-[var(--color-line)] text-xs text-[var(--color-muted)] space-y-2">
            <div className="flex gap-2">
              <span>·</span>
              <span>Conferma via email entro 24h</span>
            </div>
            <div className="flex gap-2">
              <span>·</span>
              <span>Promemoria il giorno prima</span>
            </div>
            <div className="flex gap-2">
              <span>·</span>
              <span>Disdetta gratuita entro 24h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted)] mb-2">
        {label}{" "}
        {required && (
          <span className="text-[var(--color-terra-dark)]">*</span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full bg-[var(--color-paper)] border border-[var(--color-line)] px-4 py-3 focus:outline-none focus:border-[var(--color-terra-dark)] rounded-sm"
      />
    </div>
  );
}

function SummaryRow({
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
      <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-1">
        {label}
      </div>
      <div
        className={`text-[var(--color-ink)] ${highlight ? "capitalize" : ""}`}
      >
        {main}
      </div>
      {sub && (
        <div
          className={
            highlight
              ? "font-display text-2xl text-[var(--color-terra-dark)] mt-1"
              : "text-xs text-[var(--color-muted)] mt-0.5"
          }
        >
          {sub}
        </div>
      )}
    </div>
  );
}
