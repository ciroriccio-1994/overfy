import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AgentCandidaturaForm } from './AgentCandidaturaForm';

export const metadata: Metadata = {
  title: 'Diventa Agent Overfy — Commissioni fino a €300 per cliente',
  description:
    'Programma agent Overfy: commissioni ricorrenti per ogni imprenditore che porti sulla piattaforma. Tabella trasparente, clawback solo 30gg, zero burocrazia iniziale.',
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

export default function AgentiPage() {
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
            ← Torna alla home
          </Link>

          <div
            className="overfy-heading-item text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4"
            style={{ animationDelay: '40ms' }}
          >
            Programma Agent
          </div>

          <h1
            className="overfy-heading-item font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6 max-w-4xl"
            style={{ animationDelay: '80ms' }}
          >
            Porti imprenditori.
            <br />
            <em className="font-display-italic text-[var(--color-mint-ink)]">
              Ti paghiamo per ognuno.
            </em>
          </h1>

          <p
            className="overfy-heading-item text-lg md:text-xl text-[var(--color-ink-soft)] leading-relaxed max-w-3xl mb-10"
            style={{ animationDelay: '140ms' }}
          >
            Overfy è la piattaforma che digitalizza attività italiane in 48 ore. Se conosci commercianti, ristoratori, professionisti che stanno ancora con Facebook e un sito di 10 anni fa, abbiamo un accordo per te.
          </p>

          <div
            className="overfy-heading-item flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: '200ms' }}
          >
            <a
              href="#candidatura"
              className="bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-mint-ink)] transition"
            >
              Candidati in 60 secondi →
            </a>
            <a
              href="#commissioni"
              className="border border-[var(--color-line)] text-[var(--color-ink)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--color-bg-soft)] transition"
            >
              Vedi le commissioni
            </a>
          </div>
        </section>

        {/* TABELLA COMMISSIONI */}
        <section id="commissioni" className="max-w-5xl mx-auto mb-24">
          <div className="mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Commissioni
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Tabella trasparente.
              <br />
              <em className="font-display-italic text-[var(--color-sky-ink)]">
                Pagata al primo incasso.
              </em>
            </h2>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-3xl">
              Commissione una-tantum sul primo pagamento del cliente che hai portato. 30 giorni di garanzia (clawback automatico se il cliente chiede rimborso), poi il bonifico parte.
            </p>
          </div>

          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-bg-soft)] border-b border-[var(--color-line)]">
                    <th className="text-left py-4 px-5 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                      Piano
                    </th>
                    <th className="text-right py-4 px-5 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                      Mensile
                    </th>
                    <th className="text-right py-4 px-5 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                      Trimestrale
                    </th>
                    <th className="text-right py-4 px-5 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                      Annuale
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)]">
                  <tr>
                    <td className="py-5 px-5">
                      <div className="font-medium text-[var(--color-ink)]">Essenziale</div>
                      <div className="text-xs text-[var(--color-muted)]">€49,99 / mese</div>
                    </td>
                    <td className="py-5 px-5 text-right font-mono text-[var(--color-muted)]">—</td>
                    <td className="py-5 px-5 text-right font-mono text-[var(--color-ink)]">€40</td>
                    <td className="py-5 px-5 text-right font-mono font-semibold text-[var(--color-mint-ink)]">€80</td>
                  </tr>
                  <tr>
                    <td className="py-5 px-5">
                      <div className="font-medium text-[var(--color-ink)]">Professionale</div>
                      <div className="text-xs text-[var(--color-muted)]">€129,99 / mese</div>
                    </td>
                    <td className="py-5 px-5 text-right font-mono text-[var(--color-muted)]">—</td>
                    <td className="py-5 px-5 text-right font-mono text-[var(--color-ink)]">€60</td>
                    <td className="py-5 px-5 text-right font-mono font-semibold text-[var(--color-mint-ink)]">€130</td>
                  </tr>
                  <tr>
                    <td className="py-5 px-5">
                      <div className="font-medium text-[var(--color-ink)]">Business</div>
                      <div className="text-xs text-[var(--color-muted)]">€249,99 / mese</div>
                    </td>
                    <td className="py-5 px-5 text-right font-mono text-[var(--color-ink)]">€40</td>
                    <td className="py-5 px-5 text-right font-mono text-[var(--color-ink)]">€90</td>
                    <td className="py-5 px-5 text-right font-mono font-semibold text-[var(--color-mint-ink)]">€300</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-[var(--color-muted)] leading-relaxed mt-4 max-w-3xl">
            Importi netti pagati via bonifico bancario. La commissione si consolida 30 giorni dopo il primo pagamento del cliente (passato il diritto di recesso). Un cliente che sceglie il piano Business annuale ti fa guadagnare €300 una tantum. Rinnovi successivi non generano nuove commissioni.
          </p>
        </section>

        {/* COME FUNZIONA */}
        <section className="max-w-5xl mx-auto mb-24">
          <div className="mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Come funziona
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Quattro passaggi.
              <br />
              <em className="font-display-italic text-[var(--color-coral-ink)]">
                Zero burocrazia iniziale.
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-7 hover:border-[var(--color-ink)] transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-display text-4xl leading-none text-[var(--color-ink)]">
                    0{i + 1}
                  </span>
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{ background: step.accentSoft, color: step.accentInk }}
                  >
                    {step.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] leading-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-24">
          <div className="mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Domande frequenti
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] text-[var(--color-ink)] tracking-tight">
              Le cose che ti stai chiedendo.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-xl p-5 hover:border-[var(--color-ink)] transition group"
              >
                <summary className="cursor-pointer font-medium text-[var(--color-ink)] flex items-center justify-between list-none">
                  <span>{faq.q}</span>
                  <span className="text-[var(--color-muted)] group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CANDIDATURA */}
        <section id="candidatura" className="max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-4">
              Candidatura
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Raccontaci di te.
            </h2>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed">
              Rispondiamo entro 48 ore. Se è un buon fit, ti inviamo codice agent e link alla tua dashboard via email.
            </p>
          </div>

          <Suspense fallback={<div className="text-center text-sm text-[var(--color-muted)]">Caricamento…</div>}>
            <AgentCandidaturaForm />
          </Suspense>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */

type Step = {
  title: string;
  description: string;
  tag: string;
  accentSoft: string;
  accentInk: string;
};

const steps: Step[] = [
  {
    title: 'Candidati',
    description:
      'Compili il form qui sotto con i tuoi dati. Niente CV, niente colloquio: raccontaci solo chi conosci e come lavori.',
    tag: '60 secondi',
    accentSoft: 'var(--color-mint-soft)',
    accentInk: 'var(--color-mint-ink)',
  },
  {
    title: 'Ti inviamo il codice',
    description:
      'Se ci sembri in linea, ricevi via email il tuo codice personale (AGT-XXXX) e il link alla tua dashboard riservata.',
    tag: 'Entro 48h',
    accentSoft: 'var(--color-sky-soft)',
    accentInk: 'var(--color-sky-ink)',
  },
  {
    title: 'Condividi il link',
    description:
      'Il tuo link è overfydigital.com/registrati?agent=TUOCODICE. Lo mandi ai potenziali clienti via WhatsApp, email, faccia a faccia. Noi tracciamo tutto.',
    tag: 'Automatico',
    accentSoft: 'var(--color-coral-soft)',
    accentInk: 'var(--color-coral-ink)',
  },
  {
    title: 'Vieni pagato',
    description:
      'Quando il cliente paga il primo abbonamento, aspettiamo 30 giorni (clawback rimborsi). Poi ti bonifichiamo la commissione.',
    tag: 'Bonifico',
    accentSoft: 'var(--color-mint-soft)',
    accentInk: 'var(--color-mint-ink)',
  },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: 'Devo essere un agente di commercio iscritto Enasarco?',
    a: 'No. Il programma è aperto a chiunque abbia una rete di contatti imprenditoriali: consulenti, commercialisti, designer, commerciali freelance. Al momento operiamo come procacciamento d\'affari occasionale o continuativo con fattura da parte tua (se hai P.IVA) o come collaborazione occasionale. I dettagli fiscali li vediamo al momento della candidatura in base alla tua situazione.',
  },
  {
    q: 'Serve un contratto firmato?',
    a: 'Sì, ti mandiamo un accordo di procacciamento affari standard prima del primo pagamento commissione. Nessuna clausola di esclusiva, nessun minimo di vendita, nessuna penale. Puoi smettere in qualunque momento e le commissioni già maturate restano tue.',
  },
  {
    q: 'Come faccio a sapere quanti clienti ho portato?',
    a: 'Hai una dashboard dedicata accessibile tramite link magico (niente password da ricordare). Ci vedi in tempo reale: clienti acquisiti, commissioni in maturazione, commissioni bonificabili, bonifici già effettuati.',
  },
  {
    q: 'Quanto tempo ci vuole per ricevere il primo bonifico?',
    a: 'Il cliente paga → 30 giorni di clawback (rimborsi) → commissione diventa "bonificabile" → bonifico a fine mese successivo. In pratica: se il cliente paga a gennaio, tu ricevi il bonifico a fine febbraio o inizio marzo.',
  },
  {
    q: 'Cosa succede se il cliente annulla o chiede rimborso?',
    a: 'Se il cliente chiede rimborso entro 30 giorni dal pagamento, la commissione viene automaticamente annullata (clawback). Dopo 30 giorni non ci sono più rischi: la commissione è tua indipendentemente da cosa fa il cliente dopo.',
  },
  {
    q: 'Posso portare anche clienti che conosco già?',
    a: 'Sì. Qualunque nuovo cliente che si registra con il tuo link conta, anche se è un tuo conoscente. L\'unica regola: il cliente deve essere nuovo (email mai vista prima nel nostro sistema).',
  },
  {
    q: 'C\'è un limite di clienti che posso portare?',
    a: 'No, nessun limite. Porti 1 cliente? Bene. Ne porti 50? Benissimo. La struttura è pensata per scalare: se inizi a fare numeri grossi ci sediamo e vediamo se ha senso passare a un accordo più strutturato (retainer + percentuale, esclusiva territoriale, ecc.).',
  },
];
