"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

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

export function CartDrawer() {
  const { items, isOpen, setOpen, total, updateQuantity, removeItem } =
    useCart();

  const freeShipping = total >= 60;
  const remainingForFree = 60 - total;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--color-ivory)] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <h3 className="font-serif text-2xl text-[var(--color-coffee)]">
            Il tuo carrello
          </h3>
          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-[var(--color-cream)] flex items-center justify-center transition"
            aria-label="Chiudi carrello"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-[var(--color-muted)] mb-6">
              Il tuo carrello è vuoto
            </p>
            <button
              onClick={() => setOpen(false)}
              className="bg-[var(--color-coffee)] text-[var(--color-cream)] px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--color-wine)] transition"
            >
              Scopri i dolci
            </button>
          </div>
        ) : (
          <>
            {!freeShipping && (
              <div className="bg-[var(--color-gold)]/15 px-6 py-3 text-sm text-[var(--color-coffee)]">
                Aggiungi <strong>€{remainingForFree.toFixed(2)}</strong> per la
                spedizione gratuita 🚚
              </div>
            )}
            {freeShipping && (
              <div className="bg-[var(--color-success)]/15 px-6 py-3 text-sm text-[var(--color-coffee)]">
                🎉 Hai diritto alla spedizione gratuita!
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.slug}
                  className="flex gap-4 bg-[var(--color-cream)] rounded-2xl p-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-caramel)]/40 to-[var(--color-gold)]/30 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {emojiMap[item.product.slug] || "🍰"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-lg text-[var(--color-coffee)] truncate">
                      {item.product.name}
                    </div>
                    <div className="text-xs text-[var(--color-muted)] mb-2">
                      {item.product.unit}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-[var(--color-ivory)] rounded-full px-2 py-1">
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
                        <span className="text-sm font-medium w-6 text-center">
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
                      <div className="font-semibold text-[var(--color-coffee)]">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.slug)}
                    className="text-[var(--color-muted)] hover:text-[var(--color-wine)] text-sm self-start"
                    aria-label="Rimuovi"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--color-border)] p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-muted)]">Subtotale</span>
                <span className="font-medium">€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-muted)]">Spedizione</span>
                <span className="font-medium">
                  {freeShipping ? (
                    <span className="text-[var(--color-success)]">Gratuita</span>
                  ) : (
                    "Calcolata al checkout"
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg pt-3 border-t border-[var(--color-border)]">
                <span className="font-serif">Totale</span>
                <span className="font-serif font-semibold">
                  €{total.toFixed(2)}
                </span>
              </div>
              <Link
                href="/carrello"
                onClick={() => setOpen(false)}
                className="block w-full bg-[var(--color-coffee)] text-[var(--color-cream)] py-4 rounded-full font-medium text-center hover:bg-[var(--color-wine)] transition"
              >
                Vai al checkout →
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
