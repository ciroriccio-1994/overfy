import { areas } from "@/lib/data";

export function Areas() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra-dark)] mb-6">
            — Con cosa ti aiuto —
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight max-w-2xl">
            Le aree in cui lavoro
            <br />
            <em className="font-display-italic">più spesso.</em>
          </h2>
          <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-xl mt-6">
            Non tutte le persone che incontro portano gli stessi temi, ma
            queste sono le aree in cui mi ritrovo più frequentemente.
          </p>
        </div>

        <div className="space-y-12">
          {areas.map((area, i) => (
            <article
              key={area.slug}
              className="grid md:grid-cols-12 gap-6 md:gap-10 pb-12 border-b border-[var(--color-line)] last:border-b-0"
            >
              <div className="md:col-span-1">
                <div className="font-display text-3xl text-[var(--color-terra)] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight">
                  {area.title}
                </h3>
                <p className="text-sm italic text-[var(--color-terra-dark)] mt-2">
                  {area.subtitle}
                </p>
              </div>
              <div className="md:col-span-7">
                <p className="text-[var(--color-ink-soft)] leading-relaxed">
                  {area.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
