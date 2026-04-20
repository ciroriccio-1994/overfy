"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../components/BookingContext";
import {
  treatments,
  doctors,
  categoryLabels,
  Treatment,
  Doctor,
} from "@/lib/data";

type Step = "treatment" | "doctor" | "datetime" | "patient";

export function BookingFlow() {
  const router = useRouter();
  const { booking, setTreatment, setDoctor, setDateTime, setPatient } = useBooking();
  const [step, setStep] = useState<Step>("treatment");
  const [submitting, setSubmitting] = useState(false);

  const treatment = treatments.find((t) => t.slug === booking.treatmentSlug);
  const doctor = doctors.find((d) => d.id === booking.doctorId);

  return (
    <section className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-12">
          <StepDot active={step === "treatment"} done={!!booking.treatmentSlug && step !== "treatment"} num={1} label="Trattamento" />
          <div className="flex-1 h-px bg-[var(--color-line)]"></div>
          <StepDot active={step === "doctor"} done={!!booking.doctorId && step !== "doctor" && step !== "treatment"} num={2} label="Dottore" />
          <div className="flex-1 h-px bg-[var(--color-line)]"></div>
          <StepDot active={step === "datetime"} done={!!booking.date && step === "patient"} num={3} label="Data e ora" />
          <div className="flex-1 h-px bg-[var(--color-line)]"></div>
          <StepDot active={step === "patient"} done={false} num={4} label="Dati" />
        </div>

        {step === "treatment" && (
          <TreatmentStep
            onSelect={(slug) => {
              setTreatment(slug);
              setStep("doctor");
            }}
          />
        )}

        {step === "doctor" && treatment && (
          <DoctorStep
            treatment={treatment}
            onBack={() => setStep("treatment")}
            onSelect={(id) => {
              setDoctor(id);
              setStep("datetime");
            }}
          />
        )}

        {step === "datetime" && treatment && doctor && (
          <DateTimeStep
            treatment={treatment}
            doctor={doctor}
            onBack={() => setStep("doctor")}
            onSelect={(date, time) => {
              setDateTime(date, time);
              setStep("patient");
            }}
          />
        )}

        {step === "patient" && treatment && doctor && booking.date && booking.time && (
          <PatientStep
            treatment={treatment}
            doctor={doctor}
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

function StepDot({ active, done, num, label }: { active: boolean; done: boolean; num: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition ${
          done
            ? "bg-[var(--color-sage-dark)] text-[var(--color-paper)]"
            : active
            ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
            : "border border-[var(--color-line)] text-[var(--color-muted)]"
        }`}
      >
        {done ? "✓" : num}
      </div>
      <span className={`hidden md:inline text-xs uppercase tracking-[0.15em] ${active ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"}`}>
        {label}
      </span>
    </div>
  );
}

// ========= STEP 1 =========
function TreatmentStep({ onSelect }: { onSelect: (slug: string) => void }) {
  const categories = ["prevenzione", "estetica", "implantologia", "ortodonzia"] as const;

  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-4">
          Passo 1 di 4
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Per cosa ci vieni a trovare?
        </h2>
      </div>

      {categories.map((cat) => {
        const catTreatments = treatments.filter((t) => t.category === cat);
        return (
          <div key={cat} className="mb-10">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-4">
              {categoryLabels[cat]}
            </div>
            <div className="space-y-2">
              {catTreatments.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => onSelect(t.slug)}
                  className="w-full text-left p-6 border border-[var(--color-line)] rounded-sm hover:border-[var(--color-sage-dark)] hover:bg-[var(--color-paper)] transition group"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-display text-xl text-[var(--color-ink)]">
                      {t.name}
                    </h3>
                    <div className="text-sm text-[var(--color-sage-dark)] whitespace-nowrap">
                      {t.priceFrom
                        ? `da € ${t.priceFrom}`
                        : t.priceRange
                        ? t.priceRange
                        : "Gratuita"}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {t.description}
                  </p>
                  <div className="text-xs text-[var(--color-muted)] mt-3 flex items-center gap-4">
                    <span>Durata {t.duration} min</span>
                    <span className="text-[var(--color-sage-dark)] opacity-0 group-hover:opacity-100 transition">
                      Seleziona →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ========= STEP 2 =========
function DoctorStep({
  treatment,
  onBack,
  onSelect,
}: {
  treatment: Treatment;
  onBack: () => void;
  onSelect: (id: string) => void;
}) {
  const available = doctors.filter((d) => d.treatments.includes(treatment.slug));

  return (
    <div>
      <button onClick={onBack} className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8">
        ← Cambia trattamento
      </button>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-4">
          Passo 2 di 4 · {treatment.name}
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Con quale dottore preferisci?
        </h2>
      </div>

      <button
        onClick={() => onSelect("any")}
        className="w-full text-left p-6 bg-[var(--color-bg-soft)] border border-[var(--color-line)] rounded-sm mb-3 hover:border-[var(--color-sage-dark)] transition"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-[var(--color-sage)] rounded-full flex items-center justify-center">
            <span className="font-display text-xl text-[var(--color-sage-dark)]">✦</span>
          </div>
          <div>
            <div className="font-display text-xl text-[var(--color-ink)]">
              Primo disponibile
            </div>
            <div className="text-sm text-[var(--color-muted)]">
              Massima flessibilità di orari
            </div>
          </div>
        </div>
      </button>

      <div className="grid md:grid-cols-2 gap-3">
        {available.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelect(d.id)}
            className="text-left p-6 border border-[var(--color-line)] rounded-sm hover:border-[var(--color-sage-dark)] hover:bg-[var(--color-paper)] transition"
          >
            <div className="flex items-start gap-4 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-sage)]/40 to-[var(--color-bg-soft)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-display text-xl text-[var(--color-sage-dark)]">
                  {d.name.split(" ").slice(-1)[0][0]}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] mb-1">
                  {d.role}
                </div>
                <div className="font-display text-lg text-[var(--color-ink)] leading-tight">
                  {d.name}
                </div>
                <div className="text-xs italic text-[var(--color-muted)] mt-1">
                  {d.specialty}
                </div>
              </div>
            </div>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
              {d.bio}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ========= STEP 3 =========
function DateTimeStep({
  treatment,
  doctor,
  onBack,
  onSelect,
}: {
  treatment: Treatment;
  doctor: Doctor;
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
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"
  ];

  const getUnavailable = (date: string) => {
    const hash = (date + doctor.id).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const busy = new Set<string>();
    [2, 5, 8, 11, 14].forEach((i) => busy.add(timeSlots[(hash + i) % timeSlots.length]));
    return busy;
  };

  const isClosed = (date: Date) => {
    const day = date.getDay();
    return day === 0; // solo domenica
  };

  return (
    <div>
      <button onClick={onBack} className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8">
        ← Cambia dottore
      </button>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-4">
          Passo 3 di 4 · {treatment.name} · {doctor.id === "any" ? "Primo disponibile" : doctor.name}
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Quando ti è più comodo?
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
                    ? "bg-[var(--color-bg-soft)]/50 text-[var(--color-muted)]/50 cursor-not-allowed"
                    : "bg-[var(--color-paper)] border border-[var(--color-line)] hover:border-[var(--color-sage-dark)]"
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider mb-1">
                  {d.toLocaleDateString("it-IT", { weekday: "short" })}
                </div>
                <div className="font-display text-2xl leading-none">{d.getDate()}</div>
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
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
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
                      ? "bg-[var(--color-bg-soft)]/30 text-[var(--color-muted)]/40 line-through cursor-not-allowed"
                      : "border border-[var(--color-line)] hover:border-[var(--color-sage-dark)] hover:bg-[var(--color-paper)]"
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

// ========= STEP 4 =========
function PatientStep({
  treatment,
  doctor,
  date,
  time,
  onBack,
  onSubmit,
  submitting,
}: {
  treatment: Treatment;
  doctor: Doctor;
  date: string;
  time: string;
  onBack: () => void;
  onSubmit: (p: { name: string; email: string; phone: string; notes: string }) => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  const formattedDate = new Date(date).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <button onClick={onBack} className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8">
          ← Cambia data
        </button>
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-4">
            Passo 4 di 4
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
            I suoi dati
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-5"
        >
          <Input label="Nome e cognome" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Input label="Telefono" type="tel" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted)] mb-2">
              Informazioni utili (opzionale)
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Es: allergie, farmaci, protesi esistenti..."
              className="w-full bg-[var(--color-paper)] border border-[var(--color-line)] px-4 py-3 focus:outline-none focus:border-[var(--color-sage-dark)] resize-none rounded-sm"
            />
          </div>

          <label className="flex items-start gap-3 text-xs text-[var(--color-muted)] cursor-pointer pt-2">
            <input type="checkbox" required className="mt-0.5 accent-[var(--color-sage-dark)]" />
            <span>
              Ho letto la Privacy Policy (Reg. UE 2016/679) e autorizzo il
              trattamento dei miei dati per la prenotazione e comunicazioni
              relative alla visita.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-sage-dark)] transition disabled:opacity-50 mt-4"
          >
            {submitting ? "Invio in corso..." : "Conferma prenotazione"}
          </button>

          <p className="text-xs text-[var(--color-muted)] text-center italic mt-4">
            Riceverà conferma via email e promemoria WhatsApp 24h prima
            dell&apos;appuntamento.
          </p>
        </form>
      </div>

      <div>
        <div className="sticky top-24 bg-[var(--color-bg-soft)] p-6 rounded-sm border border-[var(--color-line)]">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-sage-dark)] mb-5">
            Riepilogo
          </div>
          <div className="space-y-5 text-sm">
            <SummaryRow label="Trattamento" main={treatment.name} sub={`${treatment.duration} min · ${treatment.priceFrom ? `da €${treatment.priceFrom}` : treatment.priceRange || "Gratuita"}`} />
            <SummaryRow label="Dottore" main={doctor.id === "any" ? "Primo disponibile" : doctor.name} sub={doctor.id === "any" ? "—" : doctor.role} />
            <SummaryRow label="Appuntamento" main={formattedDate} sub={time} highlight />
          </div>
          <div className="mt-6 pt-6 border-t border-[var(--color-line)] text-xs text-[var(--color-muted)] space-y-2">
            <div className="flex gap-2">
              <span>✓</span>
              <span>Prima visita gratuita</span>
            </div>
            <div className="flex gap-2">
              <span>✓</span>
              <span>Disdetta gratuita fino a 24h prima</span>
            </div>
            <div className="flex gap-2">
              <span>✓</span>
              <span>Promemoria WhatsApp</span>
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
        {label} {required && <span className="text-[var(--color-gold)]">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full bg-[var(--color-paper)] border border-[var(--color-line)] px-4 py-3 focus:outline-none focus:border-[var(--color-sage-dark)] rounded-sm"
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
      <div className={`text-[var(--color-ink)] ${highlight ? "capitalize" : ""}`}>
        {main}
      </div>
      {sub && (
        <div
          className={
            highlight
              ? "font-display text-2xl text-[var(--color-sage-dark)] mt-1"
              : "text-xs text-[var(--color-muted)] mt-0.5"
          }
        >
          {sub}
        </div>
      )}
    </div>
  );
}
