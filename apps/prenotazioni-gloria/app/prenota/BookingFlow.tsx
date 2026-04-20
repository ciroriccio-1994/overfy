"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../components/BookingContext";
import { services, staff, categoryLabels, categoryEmojis } from "@/lib/services";

type Step = "service" | "staff" | "datetime" | "customer";

export function BookingFlow() {
  const router = useRouter();
  const { booking, setService, setStaff, setDateTime, setCustomer } =
    useBooking();
  const [step, setStep] = useState<Step>("service");
  const [submitting, setSubmitting] = useState(false);

  const service = services.find((s) => s.slug === booking.serviceSlug);
  const staffMember = staff.find((s) => s.id === booking.staffId);

  const handleSubmit = async (customer: typeof booking.customer) => {
    setCustomer(customer);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/conferma");
  };

  return (
    <section className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-10">
          <StepDot
            active={step === "service"}
            done={booking.serviceSlug !== null && step !== "service"}
            num={1}
            label="Servizio"
          />
          <div className="flex-1 h-px bg-[var(--color-border)]"></div>
          <StepDot
            active={step === "staff"}
            done={booking.staffId !== null && step !== "staff" && step !== "service"}
            num={2}
            label="Operatore"
          />
          <div className="flex-1 h-px bg-[var(--color-border)]"></div>
          <StepDot
            active={step === "datetime"}
            done={booking.date !== null && step === "customer"}
            num={3}
            label="Data e ora"
          />
          <div className="flex-1 h-px bg-[var(--color-border)]"></div>
          <StepDot
            active={step === "customer"}
            done={false}
            num={4}
            label="Dati"
          />
        </div>

        {step === "service" && (
          <ServiceStep
            onSelect={(slug) => {
              setService(slug);
              setStep("staff");
            }}
            selected={booking.serviceSlug}
          />
        )}

        {step === "staff" && service && (
          <StaffStep
            service={service}
            onBack={() => setStep("service")}
            onSelect={(id) => {
              setStaff(id);
              setStep("datetime");
            }}
            selected={booking.staffId}
          />
        )}

        {step === "datetime" && service && staffMember && (
          <DateTimeStep
            service={service}
            staffMember={staffMember}
            onBack={() => setStep("staff")}
            onSelect={(date, time) => {
              setDateTime(date, time);
              setStep("customer");
            }}
          />
        )}

        {step === "customer" && service && staffMember && booking.date && booking.time && (
          <CustomerStep
            service={service}
            staffMember={staffMember}
            date={booking.date}
            time={booking.time}
            onBack={() => setStep("datetime")}
            onSubmit={handleSubmit}
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
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition ${
          done
            ? "bg-[var(--color-success)] text-white"
            : active
            ? "bg-[var(--color-ink)] text-[var(--color-bg)]"
            : "bg-[var(--color-border)] text-[var(--color-muted)]"
        }`}
      >
        {done ? "✓" : num}
      </div>
      <span
        className={`hidden md:inline text-sm ${
          active
            ? "text-[var(--color-ink)] font-medium"
            : "text-[var(--color-muted)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// ============ STEP 1: SERVIZIO ============
function ServiceStep({
  onSelect,
  selected,
}: {
  onSelect: (slug: string) => void;
  selected: string | null;
}) {
  const categories = ["parrucchiere", "estetica", "manicure", "trattamenti"] as const;

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-3">
          Passo 1 di 4
        </div>
        <h2 className="font-display text-4xl text-[var(--color-ink)]">
          Quale servizio ti serve?
        </h2>
      </div>

      {categories.map((cat) => {
        const catServices = services.filter((s) => s.category === cat);
        return (
          <div key={cat} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{categoryEmojis[cat]}</span>
              <h3 className="font-display text-2xl text-[var(--color-ink)]">
                {categoryLabels[cat]}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {catServices.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => onSelect(s.slug)}
                  className={`text-left bg-[var(--color-white)] rounded-2xl p-5 border-2 transition ${
                    selected === s.slug
                      ? "border-[var(--color-gold)] shadow-lg"
                      : "border-[var(--color-border)] hover:border-[var(--color-gold)]/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-sand)] rounded-xl flex items-center justify-center text-xl">
                        {s.emoji}
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-ink)]">
                          {s.name}
                        </div>
                        <div className="text-xs text-[var(--color-muted)]">
                          ⏱ {s.duration} min
                        </div>
                      </div>
                    </div>
                    <div className="font-display text-xl text-[var(--color-gold-dark)]">
                      €{s.price}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    {s.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ STEP 2: STAFF ============
function StaffStep({
  service,
  onBack,
  onSelect,
  selected,
}: {
  service: (typeof services)[0];
  onBack: () => void;
  onSelect: (id: string) => void;
  selected: string | null;
}) {
  const availableStaff = staff.filter((s) => s.services.includes(service.slug));

  return (
    <div>
      <button
        onClick={onBack}
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6"
      >
        ← Cambia servizio
      </button>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-3">
          Passo 2 di 4 · {service.name}
        </div>
        <h2 className="font-display text-4xl text-[var(--color-ink)]">
          Con chi preferisci?
        </h2>
      </div>

      <button
        onClick={() => onSelect("any")}
        className={`w-full text-left bg-[var(--color-sand)]/50 rounded-2xl p-5 border-2 mb-3 transition ${
          selected === "any"
            ? "border-[var(--color-gold)]"
            : "border-[var(--color-border)] hover:border-[var(--color-gold)]/50"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[var(--color-gold)]/20 rounded-full flex items-center justify-center text-2xl">
            ✨
          </div>
          <div>
            <div className="font-semibold text-[var(--color-ink)]">
              Chiunque sia disponibile
            </div>
            <div className="text-xs text-[var(--color-muted)]">
              Più slot disponibili
            </div>
          </div>
        </div>
      </button>

      <div className="grid md:grid-cols-2 gap-3">
        {availableStaff.map((person) => (
          <button
            key={person.id}
            onClick={() => onSelect(person.id)}
            className={`text-left bg-[var(--color-white)] rounded-2xl p-5 border-2 transition ${
              selected === person.id
                ? "border-[var(--color-gold)] shadow-lg"
                : "border-[var(--color-border)] hover:border-[var(--color-gold)]/50"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-rose)] to-[var(--color-gold)] rounded-full flex items-center justify-center text-3xl">
                {person.emoji}
              </div>
              <div>
                <div className="font-display text-xl text-[var(--color-ink)]">
                  {person.name}
                </div>
                <div className="text-xs text-[var(--color-gold)] uppercase tracking-wider">
                  {person.role}
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-3">
              {person.bio}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {person.specialties.map((sp, i) => (
                <span
                  key={i}
                  className="bg-[var(--color-sand)] text-[var(--color-ink)] text-[10px] px-2 py-0.5 rounded-full"
                >
                  {sp}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ STEP 3: DATA E ORA ============
function DateTimeStep({
  service,
  staffMember,
  onBack,
  onSelect,
}: {
  service: (typeof services)[0];
  staffMember: (typeof staff)[0];
  onBack: () => void;
  onSelect: (date: string, time: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Genera 14 giorni a partire da oggi
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // Slot disponibili (simulati, alcuni occupati pseudo-randomicamente)
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30",
  ];

  const getUnavailable = (date: string) => {
    // Simula occupazione basata su hash del date+staff
    const hash = (date + staffMember.id)
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const busy = new Set<string>();
    [3, 5, 8, 11, 14].forEach((i) => {
      busy.add(timeSlots[(hash + i) % timeSlots.length]);
    });
    return busy;
  };

  const isClosed = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 1; // dom, lun chiuso
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6"
      >
        ← Cambia operatore
      </button>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-3">
          Passo 3 di 4 · {service.name} ·{" "}
          {staffMember.id === "any" ? "Qualsiasi" : staffMember.name}
        </div>
        <h2 className="font-display text-4xl text-[var(--color-ink)]">
          Quando preferisci?
        </h2>
      </div>

      <div className="mb-8">
        <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3">
          Scegli una data
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {dates.map((d) => {
            const dateStr = d.toISOString().split("T")[0];
            const closed = isClosed(d);
            const isSelected = selectedDate === dateStr;
            return (
              <button
                key={dateStr}
                onClick={() => !closed && setSelectedDate(dateStr)}
                disabled={closed}
                className={`flex-shrink-0 w-20 py-4 rounded-2xl text-center transition ${
                  isSelected
                    ? "bg-[var(--color-ink)] text-[var(--color-bg)]"
                    : closed
                    ? "bg-[var(--color-sand)]/30 text-[var(--color-muted)]/50 cursor-not-allowed"
                    : "bg-[var(--color-white)] border border-[var(--color-border)] hover:border-[var(--color-gold)]"
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
          <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3">
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
                  className={`py-3 rounded-xl text-sm font-medium transition ${
                    isUnavailable
                      ? "bg-[var(--color-sand)]/30 text-[var(--color-muted)]/50 line-through cursor-not-allowed"
                      : "bg-[var(--color-white)] border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:bg-[var(--color-sand)]/30"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-[var(--color-muted)] mt-4">
            Gli slot barrati sono già occupati
          </div>
        </div>
      )}
    </div>
  );
}

// ============ STEP 4: DATI CLIENTE ============
function CustomerStep({
  service,
  staffMember,
  date,
  time,
  onBack,
  onSubmit,
  submitting,
}: {
  service: (typeof services)[0];
  staffMember: (typeof staff)[0];
  date: string;
  time: string;
  onBack: () => void;
  onSubmit: (c: { name: string; email: string; phone: string; notes: string }) => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const formattedDate = new Date(date).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <button
          onClick={onBack}
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6"
        >
          ← Cambia data e ora
        </button>
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-3">
            Passo 4 di 4
          </div>
          <h2 className="font-display text-4xl text-[var(--color-ink)]">
            I tuoi dati
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Nome e cognome *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-gold)]"
              placeholder="Giulia Rossi"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-gold)]"
                placeholder="giulia@email.it"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
                Telefono *
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-gold)]"
                placeholder="333 1234567"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Note (opzionale)
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-gold)] resize-none"
              placeholder="Es: allergie, preferenze di stile..."
            />
          </div>

          <label className="flex items-start gap-3 text-xs text-[var(--color-muted)] cursor-pointer pt-2">
            <input
              type="checkbox"
              required
              className="mt-0.5 accent-[var(--color-ink)]"
            />
            <span>
              Accetto la Privacy Policy e autorizzo il trattamento dei miei dati
              per la gestione della prenotazione.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[var(--color-ink)] text-[var(--color-bg)] py-4 rounded-full font-medium hover:bg-[var(--color-gold-dark)] transition disabled:opacity-50 mt-4"
          >
            {submitting ? "Invio in corso..." : "Conferma prenotazione →"}
          </button>

          <p className="text-xs text-[var(--color-muted)] text-center">
            Riceverai una conferma via email e SMS. Puoi disdire fino a 24h
            prima senza costi.
          </p>
        </form>
      </div>

      {/* Riepilogo sticky */}
      <div>
        <div className="sticky top-24 bg-[var(--color-sand)]/40 rounded-3xl p-6 border border-[var(--color-border)]">
          <div className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-4">
            Riepilogo
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Servizio
              </div>
              <div className="font-semibold text-[var(--color-ink)]">
                {service.emoji} {service.name}
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-0.5">
                {service.duration} minuti
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Con
              </div>
              <div className="font-semibold text-[var(--color-ink)]">
                {staffMember.id === "any"
                  ? "Chiunque disponibile"
                  : `${staffMember.emoji} ${staffMember.name}`}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Quando
              </div>
              <div className="font-semibold text-[var(--color-ink)] capitalize">
                {formattedDate}
              </div>
              <div className="text-[var(--color-gold-dark)] font-display text-2xl mt-0.5">
                {time}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex justify-between items-baseline">
            <span className="text-sm text-[var(--color-muted)]">Totale</span>
            <span className="font-display text-3xl text-[var(--color-ink)]">
              €{service.price}
            </span>
          </div>
          <div className="text-[11px] text-[var(--color-muted)] text-right mt-1">
            Pagamento in salone
          </div>
        </div>
      </div>
    </div>
  );
}
