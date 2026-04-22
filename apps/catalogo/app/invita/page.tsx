import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Invita un amico â€” -50% sul prossimo rinnovo Â· Overfy',
  description:
    'Porta un imprenditore su Overfy e ricevi il 50% di sconto sul tuo prossimo rinnovo. Automatico, nessuna scadenza.',
};

const HEADING_ANIM_CSS = `
@keyframes overfy-heading-in {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
.overfy-heading-item {
  opacity: 0;
  animation: overfy-heading-in 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  will-change: opacity, transform;
}
@media (prefers-reduced-motion: reduce) {
  .overfy-heading-item { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

export default function InvitaPage() {
  return (
    <>
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: HEADING_ANIM_CSS }} />

      <main className="min-h-screen pt-32 pb-20 px-6">
        {/* HERO */}
        <section className="max-w-5xl mx-auto mb-24">
          <Link
            href="/"
            className="overfy-heading-item text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition mb-6 inline-block"
            style={{ animationDelay: '0ms' }}
          >
            â† Torna alla home
          </Link>

          <div
            className="overfy-heading-item text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4"
            style={{ animationDelay: '40ms' }}
          >
            Programma Referral Amico
          </div>

          <h1
            className="overfy-heading-item font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6 max-w-4xl"
            style={{ animationDelay: '80ms' }}
          >
            Porti un amico.
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              Il prossimo rinnovo Ã¨ al -50%.
            </em>
          </h1>

          <p
            className="overfy-heading-item text-lg md:text-xl text-[var(--color-ink-soft)] leading-relaxed max-w-3xl mb-10"
            style={{ animationDelay: '140ms' }}
          >
            Sei giÃ  cliente Overfy? Hai colleghi, parenti, clienti del tuo negozio che potrebbero aver bisogno di digitalizzarsi? Per ogni amico che diventa cliente, sblocchi uno sconto del 50% sul tuo prossimo rinnovo. Automatico, nessuna scadenza.
          </p>

          <div
            className="overfy-heading-item flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: '200ms' }}
          >
            <Link
              href="/dashboard#referral"
              className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
            >
              Trova il tuo codice â†’
            </Link>
            <Link
              href="/#pacchetti"
              className="border border-[var(--color-line)] text-[var(--color-ink)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-bg-soft)] transition"
            >
              Non sei ancora cliente?
            </Link>
          </div>
        </section>

        {/* COME FUNZIONA */}
        <section className="max-w-5xl mx-auto mb-24">
          <div className="mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Come funziona
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Tre passaggi.
              <br />
              <em className="font-display-italic text-[var(--color-sky-ink)]">
                Tutto automatico.
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 hover:border-[var(--color-ink)] transition"
              >
                <span className="font-display text-5xl leading-none text-[var(--color-ink)] mb-4 block">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ESEMPIO PRATICO */}
        <section className="max-w-5xl mx-auto mb-24">
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div
              className="absolute top-10 right-10 w-[250px] h-[250px] blob opacity-10"
              style={{ background: 'var(--color-mint)' }}
            ></div>

            <div className="relative max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
                Esempio pratico
              </div>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.0] text-[var(--color-ink)] tracking-tight mb-6">
                Paghi <span className="line-through text-[var(--color-muted)]">â‚¬49,99</span>{' '}
                <em className="font-display-italic text-[var(--color-mint-ink)]">â‚¬24,99</em>.
              </h2>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
                Sei sul piano Essenziale a â‚¬49,99/mese. Porti un amico che sceglie il piano Professionale trimestrale.
                Dopo 30 giorni dal suo pagamento, il tuo prossimo rinnovo mensile sarÃ  di <strong>â‚¬24,99 invece di â‚¬49,99</strong>. Risparmi â‚¬25.
              </p>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                Ne porti 2 in un mese? Salvi â‚¬25 due volte (su due rinnovi consecutivi). Ne porti 10? Hai 10 rinnovi al -50% in coda. Automatico, nessuna scadenza.
              </p>
            </div>
          </div>
        </section>

        {/* REGOLE */}
        <section className="max-w-3xl mx-auto mb-24">
          <div className="mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Regole del programma
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] text-[var(--color-ink)] tracking-tight">
              Nessun trucco.
            </h2>
          </div>

          <div className="space-y-3">
            {rules.map((rule, i) => (
              <div
                key={i}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full shrink-0 font-mono text-xs font-semibold"
                    style={{
                      background: 'var(--color-mint-soft)',
                      color: 'var(--color-mint-ink)',
                    }}
                  >
                    âœ“
                  </span>
                  <div>
                    <h3 className="font-medium text-[var(--color-ink)] mb-1">{rule.title}</h3>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{rule.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
            Il tuo codice ti aspetta.
          </h2>
          <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
            Apri la tua dashboard, copia il codice, inizia a condividere.
          </p>
          <Link
            href="/dashboard#referral"
            className="inline-block bg-[var(--color-ink)] text-[var(--color-paper)] px-10 py-5 rounded-full text-base font-medium hover:bg-[var(--color-mint-ink)] transition"
          >
            Vai alla dashboard â†’
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */

type Step = { title: string; description: string };

const steps: Step[] = [
  {
    title: 'Condividi il codice',
    description:
      'Dalla dashboard copi il tuo codice (tipo REF-A9X2K4) o il link diretto. Lo mandi a chi vuoi: WhatsApp, email, LinkedIn, faccia a faccia.',
  },
  {
    title: 'Il tuo amico paga',
    description:
      'Si registra con il tuo codice, sceglie un piano, completa il pagamento. Il sistema lo associa automaticamente al tuo account.',
  },
  {
    title: 'Lo sconto arriva solo',
    description:
      'Dopo 30 giorni dal suo pagamento (per sicurezza anti-rimborso), applichiamo il -50% al tuo prossimo rinnovo. Lo vedi sulla fattura.',
  },
];

type Rule = { title: string; body: string };

const rules: Rule[] = [
  {
    title: 'Sconto una tantum per ogni amico',
    body: 'Ogni amico che porti vale uno sconto del 50% su un singolo rinnovo. Se porti 10 amici, hai 10 rinnovi al -50% (consecutivi o alternati, come preferisci).',
  },
  {
    title: 'Cap di 6 sconti in coda',
    body: 'Per evitare abusi, il massimo di sconti pendenti contemporaneamente Ã¨ 6. Quando ne consumi qualcuno (rinnovo al -50%) il contatore si libera e puoi portarne altri. Nessun limite totale.',
  },
  {
    title: 'Attivazione automatica a 30 giorni',
    body: 'Aspettiamo 30 giorni dal pagamento del tuo amico per escludere rimborsi. Passati i 30 giorni, lo sconto si sblocca da solo. Non devi fare nulla.',
  },
  {
    title: 'Lo sconto non scade',
    body: 'Una volta sbloccato, il credito resta lÃ¬ finchÃ© non lo usi. Se al momento non hai un abbonamento attivo, lo applichiamo al primo rinnovo successivo.',
  },
  {
    title: 'Niente auto-inviti',
    body: 'Non puoi usare il tuo codice per te stesso con un\'altra email. Il sistema blocca automaticamente i tentativi di auto-riferimento e signup multipli dallo stesso indirizzo IP o carta di credito.',
  },
  {
    title: 'Rimborso del tuo amico = annullamento sconto',
    body: 'Se il tuo amico chiede e ottiene il rimborso entro 30 giorni, lo sconto relativo viene annullato. Gli altri sconti (da altri amici) non vengono toccati.',
  },
];
