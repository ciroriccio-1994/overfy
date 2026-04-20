import Link from "next/link";

export function FinalCta() {
  return (
    <section className="py-20 px-6 bg-[var(--color-ivory)]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-6">
          Pronti a ordinare?
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-coffee)] mb-6 leading-tight">
          Porta Napoli
          <br />
          <em className="text-[var(--color-wine)]">sulla tua tavola.</em>
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed max-w-xl mx-auto mb-8">
          Ordina oggi, ricevi entro 24 ore. I dolci vengono preparati la mattina
          stessa della spedizione, imballaggio refrigerato incluso.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/negozio"
            className="bg-[var(--color-coffee)] text-[var(--color-cream)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-wine)] transition"
          >
            Vai al negozio →
          </Link>
          <Link
            href="/spedizioni"
            className="border border-[var(--color-coffee)] text-[var(--color-coffee)] px-8 py-4 rounded-full font-medium hover:bg-[var(--color-cream)] transition"
          >
            Info spedizioni
          </Link>
        </div>
      </div>
    </section>
  );
}
