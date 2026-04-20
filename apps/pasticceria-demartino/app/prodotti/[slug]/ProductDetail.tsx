"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/app/components/CartContext";

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

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-[var(--color-caramel)]/40 to-[var(--color-gold)]/30 rounded-3xl flex items-center justify-center text-[12rem] relative overflow-hidden">
              {emojiMap[product.slug] || "🍰"}
              {product.bestseller && (
                <div className="absolute top-4 left-4 bg-[var(--color-wine)] text-[var(--color-cream)] px-3 py-1 rounded-full text-xs font-semibold">
                  ★ Bestseller
                </div>
              )}
              {product.limited && (
                <div className="absolute top-4 left-4 bg-[var(--color-gold)] text-[var(--color-coffee)] px-3 py-1 rounded-full text-xs font-semibold">
                  Edizione limitata
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-[var(--color-caramel)]/20 to-[var(--color-gold)]/15 rounded-xl flex items-center justify-center text-3xl cursor-pointer hover:opacity-70 transition"
                >
                  {emojiMap[product.slug] || "🍰"}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-3">
              {product.category === "classici"
                ? "I Classici"
                : product.category === "ricorrenze"
                ? "Ricorrenze"
                : product.category === "regalo"
                ? "Confezioni Regalo"
                : "Salati"}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-coffee)] mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-[var(--color-gold)]">★★★★★</div>
              <span className="text-sm text-[var(--color-muted)]">
                4.9 (127 recensioni)
              </span>
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-[var(--color-ivory)] rounded-2xl p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif text-4xl text-[var(--color-coffee)]">
                  €{product.price}
                </span>
                <span className="text-[var(--color-muted)]">{product.unit}</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-[var(--color-cream)] rounded-full px-3 py-2 border border-[var(--color-border)]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 hover:bg-[var(--color-border)] rounded-full transition"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 hover:bg-[var(--color-border)] rounded-full transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addItem(product, quantity)}
                  className="flex-1 bg-[var(--color-coffee)] text-[var(--color-cream)] py-4 rounded-full font-medium hover:bg-[var(--color-wine)] transition"
                >
                  Aggiungi al carrello — €{(product.price * quantity).toFixed(2)}
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                <div className="flex items-center gap-1">
                  <span>🚚</span> Spedizione 24h
                </div>
                <div className="flex items-center gap-1">
                  <span>🌡️</span> Imballaggio refrigerato
                </div>
                <div className="flex items-center gap-1">
                  <span>📦</span> Oltre €60 gratis
                </div>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              <Block title="Ingredienti">
                <ul className="space-y-1 text-[var(--color-muted)]">
                  {product.ingredients.map((ing, i) => (
                    <li key={i}>• {ing}</li>
                  ))}
                </ul>
              </Block>

              <Block title="Allergeni">
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((a, i) => (
                    <span
                      key={i}
                      className="bg-[var(--color-gold)]/15 text-[var(--color-coffee)] px-3 py-1 rounded-full text-xs"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </Block>

              <Block title="Conservazione">
                <p className="text-[var(--color-muted)]">{product.conservation}</p>
              </Block>

              <Block title="Formato">
                <p className="text-[var(--color-muted)]">{product.pieces}</p>
              </Block>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 px-6 bg-[var(--color-ivory)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-[var(--color-coffee)] mb-8">
              Altri dolci che potrebbero piacerti
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/prodotti/${p.slug}`}
                  className="group bg-[var(--color-cream)] rounded-3xl overflow-hidden border border-[var(--color-border)] hover:shadow-xl transition block"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-caramel)]/40 to-[var(--color-gold)]/30 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                    {emojiMap[p.slug] || "🍰"}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[var(--color-coffee)] mb-2">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-[var(--color-muted)]">
                        {p.unit}
                      </div>
                      <div className="font-serif text-lg text-[var(--color-coffee)]">
                        €{p.price}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--color-border)] pt-4">
      <div className="text-xs uppercase tracking-wider text-[var(--color-coffee)] font-semibold mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}
