"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main>
      <Navbar />

      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute top-20 right-0 w-[400px] h-[400px] blob opacity-20"
          style={{ background: "var(--color-coral)" }}
        ></div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 relative">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse"></span>
              <span className="text-[var(--color-ink-soft)]">Parliamone</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight mb-8">
              Raccontaci
              <br />
              <em className="font-display-italic text-[var(--color-coral)]">
                il tuo progetto.
              </em>
            </h1>
            <p className="text-[var(--color-ink-soft)] leading-relaxed mb-12 text-lg">
              Ti rispondiamo entro 24 ore con una proposta personalizzata. La
              prima call è sempre gratuita e senza impegno.
            </p>

            <div className="space-y-6">
              <div
                className="p-5 rounded-xl border"
                style={{
                  background: "var(--color-mint-soft)",
                  borderColor: "var(--color-mint)",
                }}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-mint-ink)] mb-1">
                  WhatsApp diretto
                </div>
                <a
                  href="https://wa.me/393331234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-mint-ink)] transition"
                >
                  +39 333 123 4567
                </a>
              </div>
              <div
                className="p-5 rounded-xl border"
                style={{
                  background: "var(--color-sky-soft)",
                  borderColor: "var(--color-sky)",
                }}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-sky-ink)] mb-1">
                  Email
                </div>
                <a
                  href="mailto:ciao@catalogosoluzioni.it"
                  className="text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-sky-ink)] transition"
                >
                  ciao@catalogosoluzioni.it
                </a>
              </div>
              <div
                className="p-5 rounded-xl border"
                style={{
                  background: "var(--color-coral-soft)",
                  borderColor: "var(--color-coral)",
                }}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-coral-ink)] mb-1">
                  Dove siamo
                </div>
                <div className="text-lg font-medium text-[var(--color-ink)]">
                  Napoli, Italia
                </div>
                <div className="text-xs text-[var(--color-muted)] mt-1">
                  Lavoriamo online in tutta Italia
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="bg-[var(--color-paper)] border border-[var(--color-mint)] rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 bg-[var(--color-mint-soft)] text-[var(--color-mint-ink)] font-bold">
                  ✓
                </div>
                <h2 className="font-display text-3xl mb-4">
                  Richiesta ricevuta!
                </h2>
                <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
                  Grazie {form.name}, ti rispondiamo entro 24 ore all&apos;
                  indirizzo {form.email}.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-[var(--color-ink)] text-[var(--color-paper)] px-7 py-3 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
                >
                  Torna al catalogo →
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10 space-y-5"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-mint-ink)] mb-2">
                  — Richiedi consulto gratuito —
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Il tuo nome"
                    required
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <Input
                    label="Nome attività"
                    value={form.business}
                    onChange={(v) => setForm({ ...form, business: v })}
                  />
                </div>
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                    Che tipo di progetto ti interessa?
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) =>
                      setForm({ ...form, projectType: e.target.value })
                    }
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-line)] px-4 py-3 focus:outline-none focus:border-[var(--color-mint)] rounded-xl text-[var(--color-ink)]"
                  >
                    <option value="">Non lo so ancora — mi consigliate</option>
                    <option value="landing">Landing page / sito vetrina</option>
                    <option value="prenotazioni">
                      Sito con prenotazioni online
                    </option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="menu-qr">Menu digitale con QR code</option>
                    <option value="gestionale">Gestionale / web app</option>
                    <option value="app">App mobile</option>
                    <option value="chatbot">Chatbot AI</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                    Parlaci del tuo progetto
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Che tipo di attività hai? Cosa vorresti ottenere? Hai già un sito?"
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-line)] px-4 py-3 focus:outline-none focus:border-[var(--color-mint)] rounded-xl text-[var(--color-ink)] resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 text-xs text-[var(--color-muted)] cursor-pointer leading-relaxed">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 accent-[var(--color-mint)]"
                  />
                  <span>
                    Autorizzo il trattamento dei miei dati per essere
                    ricontattato.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition disabled:opacity-50"
                >
                  {loading ? "Invio in corso..." : "Invia richiesta →"}
                </button>

                <p className="text-xs font-mono text-[var(--color-muted)] text-center">
                  Risposta entro 24 ore. Nessuna vendita aggressiva.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
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
      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
        {label}{" "}
        {required && (
          <span className="text-[var(--color-coral)]">*</span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full bg-[var(--color-bg)] border border-[var(--color-line)] px-4 py-3 focus:outline-none focus:border-[var(--color-mint)] rounded-xl text-[var(--color-ink)]"
      />
    </div>
  );
}
