"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../components/BookingContext";
import {
  services,
  staff,
  categoryLabels,
  categoryIconKeys,
  ServiceCategory,
} from "@/lib/services";
import { Avatar } from "../components/Avatar";
import {
  Scissors,
  Sparkle,
  Diamond,
  Leaf,
  Clock,
  Check,
  ArrowLeft,
  ArrowRight,
} from "../components/Icon";

type Step = "service" | "staff" | "datetime" | "customer";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  scissors: Scissors,
  sparkle: Sparkle,
  diamond: Diamond,
  leaf: Leaf,
};

const categoriesOrder: ServiceCategory[] = [
  "parrucchiere",
  "estetica",
  "manicure",
  "trattamenti",
];

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
    <section className="pt-32 pb-20 px-6 lg:px-10 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-12">
          <StepDot
            active={step === "service"}
            done={booking.serviceSlug !== null && step !== "service"}
            num={1}
            label="Servizio"
          />
          <Divider />
          <StepDot
            active={step === "staff"}
            done={
              booking.staffId !== null &&
              step !== "staff" &&
              step !== "service"
            }
            num={2}
            label="Operatore"
          />
          <Divider />
          <StepDot
            active={step === "datetime"}
            done={booking.date !== null && step === "customer"}
            num={3}
            label="Data e ora"
          />
          <Divider />
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

        {step === "customer" &&
          service &&
          staffMember &&
          booking.date &&
          booking.time && (
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

function Divider() {
  return <div className="flex-1 h-px bg-[var(--color-border)]" />;
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
    <div className="flex items-center gap-2.5">
      <div
        className={`w-9 h-9 flex items-center justify-center text-sm font-medium transition border ${
          done
            ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-[var(--color-ink)]"
            : active
            ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-[var(--color-bg)]"
            : "bg-transparent border-[var(--color-border)] text-[var(--color-muted)]"
        }`}
      >
        {done ? <Check size={16} /> : num}
      </div>
      <span
        className={`hidden md:inline text-[11px] uppercase tracking-[0.22em] ${
          active
            ? "text-[var(--color-ink)]"
            : done
            ? "text-[var(--color-gold-dark)]"
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
  return (
    <div>
      <div className="mb-12">
        <div className="eyebrow eyebrow-line mb-4">
          <span>Passo 1 di 4</span>
        </div>
        <h2 className="font-display-light text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Quale servizio
          <br />
          <span className="italic font-medium text-[var(--color-gold-dark)]">
            ti serve?
          </span>
        </h2>
      </div>

      {categoriesOrder.map((cat) => {
        const catServices = services.filter((s) => s.category === cat);
        const Icon = iconMap[categoryIconKeys[cat]];
        return (
          <div key={cat} className="mb-12">
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--color-border)]">
              <Icon size={20} className="text-[var(--color-gold-dark)]" />
              <h3 className="font-display text-2xl text-[var(--color-ink)]">
                {categoryLabels[cat]}
              </h3>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] ml-auto">
                {catServices.length} servizi
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {catServices.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => onSelect(s.slug)}
                  className={`text-left bg-[var(--color-white)] p-5 border transition lift ${
                    selected === s.slug
                      ? "border-[var(--color-gold)] shadow-md"
                      : "border-[var(--color-border)] hover:border-[var(--color-gold)]/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="font-display text-xl text-[var(--color-ink)] mb-1">
                        {s.name}
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        <Clock size={12} />
                        {s.duration} min
                      </div>
                    </div>
                    <div className="font-display-light text-3xl text-[var(--color-gold-dark)] leading-none">
                      €{s.price}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
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
      <BackButton onClick={onBack} label="Cambia servizio" />
      <div className="mb-10">
        <div className="eyebrow eyebrow-line mb-4">
          <span>Passo 2 di 4 · {service.name}</span>
        </div>
        <h2 className="font-display-light text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Con chi
          <br />
          <span className="italic font-medium text-[var(--color-gold-dark)]">
            preferisci?
          </span>
        </h2>
      </div>

      <button
        onClick={() => onSelect("any")}
        className={`w-full text-left p-5 border mb-4 transition lift bg-[var(--color-bg-warm)]/60 ${
          selected === "any"
            ? "border-[var(--color-gold)] shadow-md"
            : "border-[var(--color-border)] hover:border-[var(--color-gold)]/60"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 border border-[var(--color-gold)]/40 flex items-center justify-center text-[var(--color-gold-dark)]">
            <Sparkle size={22} />
          </div>
          <div>
            <div className="font-display text-xl text-[var(--color-ink)]">
              Chiunque sia disponibile
            </div>
            <div className="text-xs text-[var(--color-ink-soft)] mt-0.5">
              Più slot disponibili — risparmi tempo
            </div>
          </div>
        </div>
      </button>

      <div className="grid md:grid-cols-2 gap-3">
        {availableStaff.map((person) => (
          <button
            key={person.id}
            onClick={() => onSelect(person.id)}
            className={`text-left bg-[var(--color-white)] p-5 border transition lift ${
              selected === person.id
                ? "border-[var(--color-gold)] shadow-md"
                : "border-[var(--color-border)] hover:border-[var(--color-gold)]/60"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 flex-shrink-0">
                <Avatar initial={person.initial} size="md" />
              </div>
              <div>
                <div className="font-display text-2xl text-[var(--color-ink)] leading-tight">
                  {person.name}
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)] mt-1">
                  {person.role}
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed mb-3">
              {person.bio}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {person.specialties.map((sp, i) => (
                <span
                  key={i}
                  className="text-[10px] uppercase tracking-wider border border-[var(--color-border)] text-[var(--color-ink-soft)] px-2 py-0.5"
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

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];

  const getUnavailable = (date: string) => {
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
      <BackButton onClick={onBack} label="Cambia operatore" />
      <div className="mb-10">
        <div className="eyebrow eyebrow-line mb-4">
          <span>
            Passo 3 di 4 · {service.name} ·{" "}
            {staffMember.id === "any" ? "Qualsiasi" : staffMember.name}
          </span>
        </div>
        <h2 className="font-display-light text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
          Quando
          <br />
          <span className="italic font-medium text-[var(--color-gold-dark)]">
            preferisci?
          </span>
        </h2>
      </div>

      <div className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)] mb-4">
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
                className={`flex-shrink-0 w-20 py-4 text-center transition border ${
                  isSelected
                    ? "bg-[var(--color-ink)] text-[var(--color-bg)] border-[var(--color-ink)]"
                    : closed
                    ? "bg-transparent border-[var(--color-border-soft)] text-[var(--color-muted)]/40 cursor-not-allowed"
                    : "bg-[var(--color-white)] border-[var(--color-border)] hover:border-[var(--color-gold)]"
                }`}
              >
                <div className="text-[10px] uppercase tracking-[0.22em] mb-1">
                  {d.toLocaleDateString("it-IT", { weekday: "short" })}
                </div>
                <div className="font-display-light text-3xl leading-none">
                  {d.getDate()}
                </div>
                <div className="text-[10px] mt-1 capitalize">
                  {d.toLocaleDateString("it-IT", { month: "short" })}
                </div>
                {closed && (
                  <div className="text-[9px] mt-1 italic">chiuso</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)] mb-4">
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
                  className={`py-3 text-sm transition border ${
                    isUnavailable
                      ? "bg-transparent border-[var(--color-border-soft)] text-[var(--color-muted)]/40 line-through cursor-not-allowed"
                      : "bg-[var(--color-white)] border-[var(--color-border)] hover:border-[var(--color-gold)] hover:bg-[var(--color-bg-warm)]/60"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-[var(--color-muted)] mt-4 italic">
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
  onSubmit: (c: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => void;
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
    <div className="grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <BackButton onClick={onBack} label="Cambia data e ora" />
        <div className="mb-10">
          <div className="eyebrow eyebrow-line mb-4">
            <span>Passo 4 di 4</span>
          </div>
          <h2 className="font-display-light text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
            I tuoi
            <br />
            <span className="italic font-medium text-[var(--color-gold-dark)]">
              dati.
            </span>
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-5"
        >
          <Field
            label="Nome e cognome"
            required
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="Giulia Rossi"
            type="text"
          />
          <div className="grid md:grid-cols-2 gap-5">
            <Field
              label="Email"
              required
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="giulia@email.it"
              type="email"
            />
            <Field
              label="Telefono"
              required
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="333 1234567"
              type="tel"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-2">
              Note (opzionale)
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-[var(--color-white)] border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-gold)] resize-none text-sm"
              placeholder="Es: allergie, preferenze di stile, primo appuntamento..."
            />
          </div>

          <label className="flex items-start gap-3 text-xs text-[var(--color-ink-soft)] cursor-pointer pt-2">
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
            className="group w-full inline-flex items-center justify-center gap-2 bg-[var(--color-ink)] text-[var(--color-bg)] py-4 text-sm tracking-wide hover:bg-[var(--color-gold-dark)] transition disabled:opacity-50 mt-4"
          >
            {submitting ? (
              "Invio in corso..."
            ) : (
              <>
                Conferma prenotazione
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>

          <p className="text-[11px] text-[var(--color-muted)] text-center italic">
            Riceverai una conferma via email e SMS. Disdici fino a 24h prima
            senza costi.
          </p>
        </form>
      </div>

      {/* Riepilogo sticky */}
      <div>
        <div className="sticky top-28 bg-[var(--color-bg-warm)] p-8 border border-[var(--color-border)]">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)] mb-6 pb-4 border-b border-[var(--color-border)]">
            Riepilogo
          </div>
          <div className="space-y-5 text-sm">
            <SummaryRow
              label="Servizio"
              value={service.name}
              sub={`${service.duration} minuti`}
            />
            <SummaryRow
              label="Con"
              value={
                staffMember.id === "any"
                  ? "Chiunque disponibile"
                  : staffMember.name
              }
            />
            <SummaryRow
              label="Quando"
              value={formattedDate}
              sub={time}
              capitalize
              highlight
            />
          </div>

          <div className="mt-7 pt-6 border-t border-[var(--color-border)] flex justify-between items-baseline">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)]">
              Totale
            </span>
            <span className="font-display-light text-4xl text-[var(--color-ink)]">
              €{service.price}
            </span>
          </div>
          <div className="text-[10px] text-[var(--color-muted)] text-right italic mt-1">
            Pagamento in salone
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ HELPERS ============

function BackButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-8 transition"
    >
      <ArrowLeft
        size={14}
        className="transition-transform group-hover:-translate-x-1"
      />
      {label}
    </button>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-2">
        {label} {required && <span className="text-[var(--color-gold)]">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[var(--color-white)] border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-gold)] text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
  sub,
  capitalize,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  capitalize?: boolean;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-1">
        {label}
      </div>
      <div
        className={`font-display text-lg text-[var(--color-ink)] leading-tight ${
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
