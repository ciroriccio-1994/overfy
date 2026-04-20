import { staff } from "@/lib/services";

export function Team() {
  return (
    <section id="staff" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
            Il team
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
            Le professioniste che ti
            <br />
            <em className="text-[var(--color-gold-dark)]">prenderanno cura.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((person) => (
            <div
              key={person.id}
              className="bg-[var(--color-white)] rounded-3xl p-6 border border-[var(--color-border)] text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--color-rose)] to-[var(--color-gold)] rounded-full flex items-center justify-center text-5xl mb-4">
                {person.emoji}
              </div>
              <h3 className="font-display text-2xl text-[var(--color-ink)] mb-1">
                {person.name}
              </h3>
              <div className="text-xs text-[var(--color-gold)] uppercase tracking-wider mb-4">
                {person.role}
              </div>
              <p className="text-sm text-[var(--color-muted)] mb-5 leading-relaxed">
                {person.bio}
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {person.specialties.map((sp, i) => (
                  <span
                    key={i}
                    className="bg-[var(--color-sand)] text-[var(--color-ink)] text-[11px] px-2.5 py-1 rounded-full"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
