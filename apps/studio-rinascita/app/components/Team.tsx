import { doctors } from "@/lib/data";

export function Team() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--color-bg-soft)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage-dark)] mb-6">
            — Il team —
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
            Professionisti che
            <br />
            <em className="font-display-italic">sanno ascoltare.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-[var(--color-paper)] p-8 rounded-sm border border-[var(--color-line)]"
            >
              <div className="aspect-square bg-gradient-to-br from-[var(--color-sage)]/30 to-[var(--color-bg-soft)] rounded-sm mb-6 flex items-center justify-center">
                <span className="font-display text-6xl text-[var(--color-sage-dark)]/40">
                  {doctor.name.split(" ").slice(-1)[0][0]}
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] mb-2">
                {doctor.role}
              </div>
              <h3 className="font-display text-xl text-[var(--color-ink)] leading-tight mb-2">
                {doctor.name}
              </h3>
              <div className="text-sm italic text-[var(--color-muted)] mb-4">
                {doctor.specialty}
              </div>
              <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                {doctor.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
