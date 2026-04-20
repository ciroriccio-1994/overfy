"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";
import { useCart } from "../components/CartContext";

const emojiMap: Record<string, string> = {
  "sfogliatella-riccia": "🥐",
  "sfogliatella-frolla": "🥮",
  "baba-rum": "🍮",
  "pastiera-napoletana": "🥧",
  "delizia-limone": "🍋",
  "caprese-cioccolato": "🍫",
  "struffoli-miele": "🍯",
  "box-degustazione": "🎁",
};

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    region: "Campania",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const shippingCost =
    total >= 60
      ? 0
      : shipping.region === "Sicilia" || shipping.region === "Sardegna"
      ? 12
      : shipping.region === "Campania"
      ? 5
      : 8;

  const grandTotal = total + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    clear();
    router.push("/ordine-confermato");
  };

  if (items.length === 0 && step === "cart") {
    return (
      <main>
        <Navbar />
        <section className="py-32 px-6 text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="font-serif text-4xl text-[var(--color-coffee)] mb-4">
            Il tuo carrello è vuoto
          </h1>
          <p className="text-[var(--color-muted)] mb-8">
            Scopri i nostri dolci artigianali, spediti in 24h in tutta Italia.
          </p>
          <Link
            href="/"
            className="inline-block bg-[var(--color-coffee)] text-[var(--color-cream)] px-7 py-4 rounded-full font-medium hover:bg-[var(--color-wine)] transition"
          >
            Torna al negozio
          </Link>
        </section>
        <Footer />
        <CartDrawer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-10 text-sm">
            <StepIndicator
              active={step === "cart"}
              done={step !== "cart"}
              label="Carrello"
              number={1}
            />
            <div className="flex-1 h-px bg-[var(--color-border)]"></div>
            <StepIndicator
              active={step === "shipping"}
              done={step === "payment"}
              label="Spedizione"
              number={2}
            />
            <div className="flex-1 h-px bg-[var(--color-border)]"></div>
            <StepIndicator
              active={step === "payment"}
              done={false}
              label="Pagamento"
              number={3}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {step === "cart" && (
                <>
                  <h1 className="font-serif text-3xl text-[var(--color-coffee)] mb-6">
                    Il tuo carrello
                  </h1>
                  {items.map((item) => (
                    <div
                      key={item.product.slug}
                      className="bg-[var(--color-ivory)] rounded-2xl p-5 flex gap-4 items-center"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-caramel)]/40 to-[var(--color-gold)]/30 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                        {emojiMap[item.product.slug] || "🍰"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-xl text-[var(--color-coffee)]">
                          {item.product.name}
                        </h3>
                        <div className="text-xs text-[var(--color-muted)] mb-2">
                          {item.product.unit}
                        </div>
                        <div className="flex items-center gap-2 bg-[var(--color-cream)] rounded-full px-2 py-1 w-fit">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.slug,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 hover:bg-[var(--color-border)] rounded-full transition"
                          >
                            −
                          </button>
                          <span className="text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.slug,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 hover:bg-[var(--color-border)] rounded-full transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-xl text-[var(--color-coffee)]">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.slug)}
                          className="text-xs text-[var(--color-muted)] hover:text-[var(--color-wine)] mt-1"
                        >
                          Rimuovi
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {step === "shipping" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("payment");
                  }}
                  className="bg-[var(--color-ivory)] rounded-2xl p-8 space-y-4"
                >
                  <h1 className="font-serif text-3xl text-[var(--color-coffee)] mb-4">
                    Indirizzo di spedizione
                  </h1>
                  <Input
                    label="Nome e cognome"
                    required
                    value={shipping.name}
                    onChange={(v) => setShipping({ ...shipping, name: v })}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={shipping.email}
                      onChange={(v) => setShipping({ ...shipping, email: v })}
                    />
                    <Input
                      label="Telefono"
                      type="tel"
                      required
                      value={shipping.phone}
                      onChange={(v) => setShipping({ ...shipping, phone: v })}
                    />
                  </div>
                  <Input
                    label="Indirizzo"
                    required
                    value={shipping.address}
                    onChange={(v) => setShipping({ ...shipping, address: v })}
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="Città"
                      required
                      value={shipping.city}
                      onChange={(v) => setShipping({ ...shipping, city: v })}
                    />
                    <Input
                      label="CAP"
                      required
                      value={shipping.zip}
                      onChange={(v) => setShipping({ ...shipping, zip: v })}
                    />
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
                        Regione
                      </label>
                      <select
                        value={shipping.region}
                        onChange={(e) =>
                          setShipping({ ...shipping, region: e.target.value })
                        }
                        className="w-full bg-[var(--color-cream)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-coffee)]"
                      >
                        <option>Campania</option>
                        <option>Lazio</option>
                        <option>Lombardia</option>
                        <option>Piemonte</option>
                        <option>Toscana</option>
                        <option>Veneto</option>
                        <option>Emilia-Romagna</option>
                        <option>Sicilia</option>
                        <option>Sardegna</option>
                        <option>Altro</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
                      Note per il corriere (opzionale)
                    </label>
                    <textarea
                      rows={2}
                      value={shipping.notes}
                      onChange={(e) =>
                        setShipping({ ...shipping, notes: e.target.value })
                      }
                      className="w-full bg-[var(--color-cream)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-coffee)] resize-none"
                      placeholder="Es: suonare al citofono 3, lasciare al vicino..."
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep("cart")}
                      className="border border-[var(--color-coffee)] text-[var(--color-coffee)] px-6 py-3 rounded-full font-medium hover:bg-[var(--color-cream)] transition"
                    >
                      ← Indietro
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[var(--color-coffee)] text-[var(--color-cream)] py-3 rounded-full font-medium hover:bg-[var(--color-wine)] transition"
                    >
                      Continua al pagamento →
                    </button>
                  </div>
                </form>
              )}

              {step === "payment" && (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[var(--color-ivory)] rounded-2xl p-8 space-y-4"
                >
                  <h1 className="font-serif text-3xl text-[var(--color-coffee)] mb-4">
                    Pagamento
                  </h1>
                  <div className="bg-[var(--color-cream)] border border-[var(--color-border)] rounded-xl p-4 text-sm text-[var(--color-muted)]">
                    🔒 Pagamento sicuro con Stripe. I tuoi dati sono crittografati.
                  </div>
                  <Input label="Nome sulla carta" required />
                  <Input label="Numero carta" required placeholder="1234 5678 9012 3456" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Scadenza" required placeholder="MM/AA" />
                    <Input label="CVC" required placeholder="123" />
                  </div>

                  <div className="pt-4 space-y-3">
                    <label className="flex items-start gap-3 text-sm text-[var(--color-muted)] cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 accent-[var(--color-coffee)]"
                      />
                      <span>
                        Accetto i Termini di Vendita e la Privacy Policy
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="border border-[var(--color-coffee)] text-[var(--color-coffee)] px-6 py-3 rounded-full font-medium hover:bg-[var(--color-cream)] transition"
                    >
                      ← Indietro
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-[var(--color-coffee)] text-[var(--color-cream)] py-3 rounded-full font-medium hover:bg-[var(--color-wine)] transition disabled:opacity-50"
                    >
                      {loading
                        ? "Elaborazione..."
                        : `Conferma ordine — €${grandTotal.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[var(--color-ivory)] rounded-2xl p-6 space-y-4">
                <h3 className="font-serif text-xl text-[var(--color-coffee)]">
                  Riepilogo ordine
                </h3>

                <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.slug} className="flex justify-between">
                      <span className="text-[var(--color-muted)] truncate pr-2">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--color-border)] pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-muted)]">Subtotale</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-muted)]">Spedizione</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-[var(--color-success)]">
                          Gratuita
                        </span>
                      ) : (
                        `€${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[var(--color-border)] pt-4 flex justify-between items-baseline">
                  <span className="font-serif text-lg text-[var(--color-coffee)]">
                    Totale
                  </span>
                  <span className="font-serif text-2xl text-[var(--color-coffee)]">
                    €{grandTotal.toFixed(2)}
                  </span>
                </div>

                {step === "cart" && (
                  <button
                    onClick={() => setStep("shipping")}
                    className="w-full bg-[var(--color-coffee)] text-[var(--color-cream)] py-4 rounded-full font-medium hover:bg-[var(--color-wine)] transition"
                  >
                    Procedi al checkout →
                  </button>
                )}

                <div className="text-xs text-[var(--color-muted)] space-y-1 pt-3 border-t border-[var(--color-border)]">
                  <div>🔒 Pagamento sicuro</div>
                  <div>🚚 Spedizione refrigerata 24h</div>
                  <div>↩ Reso gratuito entro 14 giorni</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  );
}

function StepIndicator({
  active,
  done,
  label,
  number,
}: {
  active: boolean;
  done: boolean;
  label: string;
  number: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          done
            ? "bg-[var(--color-success)] text-white"
            : active
            ? "bg-[var(--color-coffee)] text-[var(--color-cream)]"
            : "bg-[var(--color-border)] text-[var(--color-muted)]"
        }`}
      >
        {done ? "✓" : number}
      </div>
      <span
        className={`hidden md:inline ${
          active
            ? "text-[var(--color-coffee)] font-medium"
            : "text-[var(--color-muted)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Input({
  label,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        className="w-full bg-[var(--color-cream)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-coffee)]"
      />
    </div>
  );
}
