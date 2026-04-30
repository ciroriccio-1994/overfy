import { staff } from "@/lib/services";
import { Avatar } from "./Avatar";
import { Ornament } from "./Icon";

export function Team() {
  return (
    <section
      id="staff"
      className="py-24 md:py-32 px-6 lg:px-10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header allineato a sinistra per cambiare ritmo dopo il centrato di Servizi */}
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20 items-end">
          <div className="md:col-span-7">
            <div className="eyebrow eyebrow-line mb-5">
              <span>Il team</span>
            </div>
            <h2 className="font-display-light text-4xl md:text-6xl text-[var(--color-ink)] leading-[1.05]">
              Le professioniste
              <br />
              <span className="italic font-medium text-[var(--color-gold-dark)]">
                che ti prenderanno cura.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base text-[var(--color-ink-soft)] leading-relaxed max-w-md">
              Quattro mani esperte, ognuna con la propria specialità. Formazione
              continua a Milano, Londra e Parigi. Selezionate da Gloria, una a
              una, in oltre quindici anni.
            </p>
          </div>
        </div>

        {/* Griglia con offset Y alternato per look editoriale */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {staff.map((person, i) => (
            <article
              key={person.id}
              className={`group ${
                // offset verticale solo su desktop, alternato
                i % 2 === 1 ? "lg:mt-16" : ""
              }`}
            >
              <div className="relative mb-5 lift">
                <Avatar initial={person.initial} size="xl" />
                {/* Numero progressivo in stile editoriale */}
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold-dark)]/80 bg-[var(--color-bg)]/80 backdrop-blur px-2 py-1">
                  Nº 0{i + 1}
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)] mb-2">
                {person.role}
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-[var(--color-ink)] mb-3 leading-tight">
                {person.name}
              </h3>
              <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-5">
                {person.bio}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {person.specialties.map((sp) => (
                  <span
                    key={sp}
                    className="text-[10px] uppercase tracking-wider text-[var(--color-ink-soft)] border border-[var(--color-border)] px-2.5 py-1"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <Ornament className="text-[var(--color-gold)] mx-auto mt-20" />
      </div>
    </section>
  );
}
