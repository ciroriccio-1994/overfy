import { notFound } from "next/navigation";
import Link from "next/link";
import { demos, tierLabels, plans, tierColors } from "@/lib/demos";
import { Navbar } from "@/app/components/Navbar";
import { Footer, FinalCta } from "@/app/components/Footer";

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = demos.find((d) => d.slug === slug);
  if (!demo) notFound();

  const related = demos.filter((d) => d.slug !== slug).slice(0, 3);
  const plan = plans.find((p) => p.tier === demo.tier);
  const tc = tierColors[demo.tier];

  return (
    <main>
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-32 pb-6 px-6 border-b border-[var(--color-line)] bg-[var(--color-bg-soft)]">
        <div className="max-w-6xl mx-auto text-sm font-mono text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-ink)]">
            Catalogo
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#demo" className="hover:text-[var(--color-ink)]">
            I lavori
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-ink)]">{demo.title}</span>
        </div>
      </div>

      {/* Hero demo */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6">
            <div
              className="inline-flex items-center gap-2 border rounded-full px-3 py-1 mb-6 text-xs font-mono"
              style={{
                background: tc.bg,
                borderColor: tc.accent,
                color: tc.ink,
              }}
            >
              {demo.category}
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-3">
              {demo.title}
            </h1>
            <div className="text-lg italic text-[var(--color-muted)] mb-8">
              {demo.subtitle}
            </div>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed mb-8">
              {demo.longDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              <span
                className="text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full"
                style={{
                  background: tc.bg,
                  color: tc.ink,
                  border: `1px solid ${tc.accent}`,
                }}
              >
                Pacchetto {tierLabels[demo.tier]}
              </span>
              {demo.addons?.map((a) => (
                <span
                  key={a}
                  className="bg-[var(--color-paper)] text-[var(--color-ink)] text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full border border-[var(--color-line)]"
                >
                  + {a}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={demo.localUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition flex items-center justify-center gap-2"
              >
                Apri demo dal vivo
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </a>
              <Link
                href="/contatti"
                className="bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] px-8 py-4 rounded-full text-sm font-medium hover:border-[var(--color-ink)] transition text-center"
              >
                Voglio questo →
              </Link>
            </div>
            <p className="text-xs font-mono text-[var(--color-muted)] mt-4">
              Demo gira su localhost:{demo.localPort}
            </p>
          </div>

          <div className="md:col-span-6">
            <div
              className="aspect-[4/3] rounded-2xl relative overflow-hidden shadow-xl border"
              style={{
                background: tc.bg,
                borderColor: tc.accent,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-[10rem] opacity-90">
                {demo.preview}
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-paper)] p-4 rounded-xl border border-[var(--color-line)]">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1">
                  Anteprima
                </div>
                <div className="font-display text-xl text-[var(--color-ink)]">
                  {demo.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
              <span className="text-[var(--color-ink-soft)]">Cosa include</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)]">
              Tutto quello che vedi,
              <br />
              <em className="font-display-italic" style={{ color: tc.ink }}>
                è compreso nel pacchetto.
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {demo.features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[var(--color-paper)] border border-[var(--color-line)] p-5 rounded-xl"
              >
                <span
                  className="mt-0.5 flex-shrink-0 text-lg leading-none"
                  style={{ color: tc.accent }}
                >
                  ✓
                </span>
                <span className="text-[var(--color-ink-soft)] leading-relaxed">
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideale per */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
              <span className="text-[var(--color-ink-soft)]">Ideale per</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight max-w-2xl mx-auto">
              Questa soluzione è pensata
              <br />
              <em className="font-display-italic">per categorie come:</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {demo.idealFor.map((cat, i) => (
              <div
                key={i}
                className="border p-6 rounded-xl text-center transition hover:-translate-y-1"
                style={{
                  background: tc.bg,
                  borderColor: tc.accent,
                }}
              >
                <div className="text-sm font-medium" style={{ color: tc.ink }}>
                  {cat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prezzo del pacchetto */}
      {plan && (
        <section className="py-20 px-6 bg-[var(--color-bg-soft)]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
              <span className="text-[var(--color-ink-soft)]">
                Pacchetto {plan.name}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-10">
              Questa soluzione costa
            </h2>

            <div className="inline-flex items-baseline gap-2 mb-6">
              <span
                className="font-display text-8xl md:text-9xl leading-none"
                style={{ color: tc.ink }}
              >
                €{plan.price}
              </span>
              <span className="text-[var(--color-muted)] text-lg">/mese</span>
            </div>

            {plan.setupFee && (
              <div className="text-sm font-mono text-[var(--color-muted)] mb-6">
                + €{plan.setupFee} setup una tantum
              </div>
            )}

            <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-xl mx-auto mb-10">
              {plan.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contatti"
                className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
              >
                Richiedi preventivo →
              </Link>
              <Link
                href="/#pacchetti"
                className="bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] px-8 py-4 rounded-full text-sm font-medium hover:border-[var(--color-ink)] transition"
              >
                Confronta pacchetti
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Altre demo */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full px-3 py-1 mb-6 text-xs font-mono">
              <span className="text-[var(--color-ink-soft)]">
                Esplora il catalogo
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Altri lavori
              <br />
              <em className="font-display-italic text-[var(--color-mint-ink)]">
                che potrebbero interessarti.
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {related.map((d) => {
              const rtc = tierColors[d.tier];
              return (
                <Link
                  key={d.slug}
                  href={`/demo/${d.slug}`}
                  className="group bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="aspect-[16/10] flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500"
                    style={{ background: rtc.bg }}
                  >
                    {d.preview}
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
                      {d.category}
                    </div>
                    <div className="font-display text-2xl text-[var(--color-ink)] mb-2">
                      {d.title}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: rtc.ink }}
                    >
                      Scopri →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </main>
  );
}
