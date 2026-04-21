import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Policy rimborsi — Overfy',
  description: 'Come funzionano disdetta e rimborsi sul servizio Overfy.',
};

export default function RimborsiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6 bg-[var(--color-bg-soft)]">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition mb-6 inline-block"
          >
            ← Torna alla home
          </Link>

          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
              Policy · aggiornata 21 aprile 2026
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Disdetta e rimborsi.
            </h1>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed">
              Spieghiamo chiaramente come funziona. Niente sorprese, niente clausole nascoste.
            </p>
          </div>

          <article className="space-y-6">

            <div className="bg-[var(--color-paper)] border-2 rounded-2xl p-8" style={{ borderColor: 'var(--color-mint-ink)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg font-bold" style={{ background: 'var(--color-mint-ink)', color: 'white' }}>
                  ✓
                </div>
                <div>
                  <h2 className="font-display text-2xl text-[var(--color-ink)] mb-3 tracking-tight">
                    Puoi disdire quando vuoi
                  </h2>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed">
                    Dal pannello cliente (dashboard) puoi cancellare il rinnovo automatico in qualsiasi momento. Il servizio resta attivo fino alla scadenza del periodo che hai già pagato. Nessuna penale, nessun periodo minimo obbligatorio oltre a quello scelto.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-paper)] border-2 rounded-2xl p-8" style={{ borderColor: 'var(--color-coral-ink)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg font-bold" style={{ background: 'var(--color-coral-ink)', color: 'white' }}>
                  !
                </div>
                <div>
                  <h2 className="font-display text-2xl text-[var(--color-ink)] mb-3 tracking-tight">
                    Il periodo già pagato non viene rimborsato
                  </h2>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed mb-3">
                    Quando attivi l&apos;abbonamento, <strong>richiedi espressamente l&apos;avvio immediato del servizio</strong> accettando la checkbox al checkout. Questo significa che il lavoro di digitalizzazione (progettazione, sviluppo, consegna) parte subito.
                  </p>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed">
                    Ai sensi dell&apos;<strong>art. 59 lett. o)</strong> del Codice del Consumo, una volta che il servizio è stato interamente erogato, il diritto di recesso dei 14 giorni non si applica. Il periodo che hai pagato prosegue fino alla naturale scadenza e non viene rimborsato.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8">
              <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4 tracking-tight">
                Quando invece il rimborso lo facciamo
              </h2>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
                Ci sono alcuni casi specifici in cui ti rimborsiamo integralmente quello che hai pagato:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)' }}>
                    A
                  </span>
                  <div>
                    <strong className="text-[var(--color-ink)]">Non abbiamo iniziato il lavoro</strong>
                    <p className="text-sm mt-1">
                      Se ci scrivi entro <strong>48 ore</strong> dal pagamento chiedendoci di non procedere, e noi non abbiamo ancora avviato lo sviluppo, ti rimborsiamo al 100%. (Oltre le 48 ore il lavoro è tipicamente già partito, non è più possibile.)
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)' }}>
                    B
                  </span>
                  <div>
                    <strong className="text-[var(--color-ink)]">Non consegniamo entro i tempi contrattuali</strong>
                    <p className="text-sm mt-1">
                      Se non riceviamo da te i materiali richiesti entro 10 giorni iniziamo comunque il lavoro in attesa. Ma se <em>da parte nostra</em> superiamo i tempi contrattuali del pacchetto (48h/5-7gg/10-14gg) senza motivo, hai diritto a un&apos;estensione gratuita pari al ritardo, oppure al rimborso integrale se lo preferisci.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)' }}>
                    C
                  </span>
                  <div>
                    <strong className="text-[var(--color-ink)]">Difetti gravi non risolti</strong>
                    <p className="text-sm mt-1">
                      Se il servizio ha problemi sostanziali (sito irraggiungibile, funzionalità bloccate, errori evidenti) e non li risolviamo entro 7 giorni dalla tua segnalazione scritta, hai diritto al rimborso dei mesi interessati.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint-ink)' }}>
                    D
                  </span>
                  <div>
                    <strong className="text-[var(--color-ink)]">Impossibilità sopravvenuta</strong>
                    <p className="text-sm mt-1">
                      Se per cause non imputabili a te (es. impossibilità tecnica dimostrata) non possiamo erogare il servizio, ti rimborsiamo la parte non utilizzata del periodo.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8">
              <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4 tracking-tight">
                Come richiedere disdetta o rimborso
              </h2>
              <ol className="space-y-3 list-decimal ml-5 text-[var(--color-ink-soft)]">
                <li>
                  <strong className="text-[var(--color-ink)]">Disdetta</strong>: vai su <Link href="/dashboard" className="text-[var(--color-ink)] underline">Dashboard</Link> → Gestisci abbonamento → Cancella rinnovo. Il servizio resta attivo fino alla scadenza del periodo in corso.
                </li>
                <li>
                  <strong className="text-[var(--color-ink)]">Richiesta di rimborso</strong>: scrivi a{' '}
                  <a href="mailto:info@overfydigital.com" className="text-[var(--color-ink)] underline">
                    info@overfydigital.com
                  </a>{' '}
                  specificando il motivo (A, B, C o D della lista sopra). Ti rispondiamo entro 3 giorni lavorativi. Se il caso rientra, accrediteremo il rimborso entro 10 giorni tramite Stripe sullo stesso metodo di pagamento usato.
                </li>
              </ol>
            </div>

            <div className="bg-[var(--color-bg)] border border-[var(--color-line)] rounded-2xl p-8">
              <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4 tracking-tight">
                Clienti business (P.IVA)
              </h2>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                Se sottoscrivi Overfy nell&apos;ambito della tua attività imprenditoriale o professionale (fornendo P.IVA al checkout), il diritto di recesso dei 14 giorni non ti è riconosciuto dalla legge. Restano valide le garanzie di rimborso per i casi A, B, C e D sopra elencati.
              </p>
            </div>

            <div className="bg-[var(--color-mint-soft)] border border-[var(--color-mint-ink)] rounded-2xl p-8">
              <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4 tracking-tight">
                La nostra filosofia
              </h2>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                Costruiamo sul trust. Se il servizio non ti serve più, disdici. Se c&apos;è un problema vero, ti rimborsiamo. Ma essendo un servizio artigianale e personalizzato, non possiamo permetterci rimborsi arbitrari post-erogazione — il lavoro fatto è irreversibile.
              </p>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mt-3">
                Per questo siamo trasparenti fin dall&apos;inizio: prima di pagare leggi e accetti questa policy, così sappiamo entrambi dove stiamo.
              </p>
            </div>

          </article>

          <div className="mt-12 text-center">
            <Link
              href="/termini"
              className="inline-block text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] underline"
            >
              Vedi anche: Termini di servizio completi →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
