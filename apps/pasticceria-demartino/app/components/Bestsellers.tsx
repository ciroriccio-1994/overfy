"use client";

import Link from "next/link";
import { products, Product } from "@/lib/products";
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

export function Bestsellers() {
  const { addItem } = useCart();
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
              I più amati
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-coffee)] leading-tight">
              I dolci <em className="text-[var(--color-wine)]">bestseller</em>.
            </h2>
          </div>
          <Link
            href="/negozio"
            className="text-sm font-medium text-[var(--color-coffee)] border-b-2 border-[var(--color-coffee)] pb-1 hover:text-[var(--color-wine)] hover:border-[var(--color-wine)] transition self-start md:self-end"
          >
            Scopri tutti i dolci →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <BestsellerCard
              key={p.slug}
              product={p}
              emoji={emojiMap[p.slug] || "🍰"}
              onAdd={() => addItem(p)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/negozio"
            className="inline-block bg-[var(--color-coffee)] text-[var(--color-cream)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-wine)] transition"
          >
            Vedi tutti i dolci nel negozio →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BestsellerCard({
  product,
  emoji,
  onAdd,
}: {
  product: Product;
  emoji: string;
  onAdd: () => void;
}) {
  return (
    <div className="group bg-[var(--color-ivory)] rounded-3xl overflow-hidden border border-[var(--color-border)] hover:shadow-xl transition">
      <Link href={`/prodotti/${product.slug}`} className="block">
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-caramel)]/40 to-[var(--color-gold)]/30 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
            {emoji}
          </div>
          {product.bestseller && (
            <div className="absolute top-3 left-3 bg-[var(--color-wine)] text-[var(--color-cream)] px-3 py-1 rounded-full text-xs font-semibold">
              ★ Bestseller
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <Link href={`/prodotti/${product.slug}`}>
          <h3 className="font-serif text-2xl text-[var(--color-coffee)] mb-2 hover:text-[var(--color-wine)] transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed line-clamp-2 min-h-[40px]">
          {product.shortDescription}
        </p>
        <div className="text-xs text-[var(--color-muted)] mb-4">
          {product.unit}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <div className="font-serif text-2xl text-[var(--color-coffee)]">
            €{product.price}
          </div>
          <button
            onClick={onAdd}
            className="bg-[var(--color-coffee)] text-[var(--color-cream)] px-4 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-wine)] transition"
          >
            Aggiungi +
          </button>
        </div>
      </div>
    </div>
  );
}
