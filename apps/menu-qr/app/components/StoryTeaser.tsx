import Link from "next/link";

export function StoryTeaser() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-6">
          La nostra storia
        </div>
        <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-8">
          Giuseppe impastava
          <br />
          <em className="font-display-italic">a mano, di notte.</em>
        </h2>
        <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed mb-4">
          Nel 1989 apriva un piccolo forno in via dei Tribunali. Dormiva poco,
          lavorava tanto. Trentasei anni dopo, sua nipote Maria — formatasi a
          Parigi e tornata a Napoli — porta avanti la stessa ricetta.
        </p>
        <p className="text-[var(--color-muted)] italic mb-10">
          Nulla è cambiato. Non l&apos;impasto. Non il forno. Non la ricotta di
          bufala di Agerola.
        </p>
        <Link
          href="/storia"
          className="inline-flex items-center gap-3 text-[var(--color-ink)] border-b border-[var(--color-ink)] pb-1 text-sm uppercase tracking-[0.15em] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition"
        >
          Leggi la storia completa
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
