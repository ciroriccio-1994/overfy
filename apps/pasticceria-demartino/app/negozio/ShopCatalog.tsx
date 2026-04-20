"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products, categories, Product } from "@/lib/products";
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

type SortOption = "popular" | "price-asc" | "price-desc" | "name";

export function ShopCatalog() {
  const [filter, setFilter] = useState("tutti");
  const [sort, setSort] = useState<SortOption>("popular");
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    const list =
      filter === "tutti"
        ? [...products]
        : products.filter((p) => p.category === filter);

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "popular":
      default:
        return list.sort((a, b) => {
          const aScore = (a.bestseller ? 2 : 0) + (a.featured ? 1 : 0);
          const bScore = (b.bestseller ? 2 : 0) + (b.featured ? 1 : 0);
          return bScore - aScore;
        });
    }
  }, [filter, sort]);

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Filters + Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[var(--color-border)]">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                  filter === cat.id
                    ? "bg-[var(--color-coffee)] text-[var(--color-cream)]"
                    : "bg-[var(--color-ivory)] text-[var(--color-coffee)] border border-[var(--color-border)] hover:bg-[var(--color-cream)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Ordina per:
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-coffee)] cursor-pointer"
            >
              <option value="popular">Popolarità</option>
              <option value="price-asc">Prezzo crescente</option>
              <option value="price-desc">Prezzo decrescente</option>
              <option value="name">Nome A-Z</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="text-sm text-[var(--color-muted)] mb-6">
          {filtered.length} {filtered.length === 1 ? "prodotto" : "prodotti"}
          {filter !== "tutti" &&
            ` in ${categories.find((c) => c.id === filter)?.label}`}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ShopCard
              key={p.slug}
              product={p}
              emoji={emojiMap[p.slug] || "🍰"}
              onAdd={() => addItem(p)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--color-muted)]">
            Nessun prodotto in questa categoria al momento.
          </div>
        )}
      </div>
    </section>
  );
}

function ShopCard({
  product,
  emoji,
  onAdd,
}: {
  product: Product;
  emoji: string;
  onAdd: () => void;
}) {
  return (
    <div className="group bg-[var(--color-ivory)] rounded-3xl overflow-hidden border border-[var(--color-border)] hover:shadow-xl transition flex flex-col">
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
          {product.limited && (
            <div className="absolute top-3 left-3 bg-[var(--color-gold)] text-[var(--color-coffee)] px-3 py-1 rounded-full text-xs font-semibold">
              Edizione limitata
            </div>
          )}
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-1">
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
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] mt-auto">
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
