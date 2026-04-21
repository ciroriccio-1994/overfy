import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Termini di servizio — Overfy',
  description: 'Condizioni contrattuali per l\'utilizzo dei servizi Overfy di digitalizzazione a canone.',
};

export default function TerminiPage() {
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
              Documento legale · ultimo aggiornamento 21 aprile 2026
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-[0.95] text-[var(--color-ink)] tracking-tight mb-6">
              Termini di servizio
            </h1>
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed">
              Questo documento regola il rapporto contrattuale tra te e Overfy. Leggilo con attenzione — contiene clausole importanti sulla <strong>rinuncia al diritto di recesso</strong> e sulla politica di rimborsi.
            </p>
          </div>

          <article className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl p-8 md:p-12 space-y-8 text-sm leading-relaxed text-[var(--color-ink-soft)]">

            <Section title="1. Identificazione del fornitore">
              <p>
                Il servizio Overfy è fornito da <strong className="text-[var(--color-ink)]">Ciro Riccio</strong>, lavoratore autonomo in regime forfettario, con sede in Napoli, Italia.
              </p>
              <p>
                Codice fiscale e partita IVA: <em>verranno comunicati in fattura al momento del primo pagamento</em>.
              </p>
              <p>
                Contatto ufficiale:{' '}
                <a href="mailto:info@overfydigital.com" className="text-[var(--color-ink)] underline">
                  info@overfydigital.com
                </a>
              </p>
            </Section>

            <Section title="2. Oggetto del servizio">
              <p>
                Overfy fornisce servizi di digitalizzazione on-demand per micro-attività e professionisti, con modello a canone mensile, trimestrale o annuale. I pacchetti disponibili sono <em>Essenziale</em>, <em>Professionale</em>, <em>Business</em> (prezzi pubblicati sul sito) e <em>Su Misura</em> (preventivo personalizzato).
              </p>
              <p>
                Ogni pacchetto include la realizzazione e la gestione continuativa di un sito web, strumenti digitali e servizi accessori descritti nella pagina pubblica dei pacchetti. Le consegne iniziali avvengono entro i tempi indicati in ciascun piano (48h–14gg).
              </p>
            </Section>

            <Section title="3. Sottoscrizione e pagamento">
              <p>
                La sottoscrizione avviene online attraverso il sito www.overfydigital.com. I pagamenti sono gestiti da Stripe Payments Europe Ltd. I dati della carta non transitano mai sui nostri server.
              </p>
              <p>
                L&apos;abbonamento si rinnova automaticamente alla scadenza del periodo scelto, salvo disdetta da parte del cliente. La disdetta non è retroattiva: blocca i rinnovi futuri, ma il periodo già pagato prosegue fino alla naturale scadenza <strong>senza diritto di rimborso</strong>.
              </p>
            </Section>

            <Section title="4. Avvio immediato del servizio e rinuncia al diritto di recesso">
              <div className="p-4 rounded-lg border-2" style={{ background: 'var(--color-coral-soft)', borderColor: 'var(--color-coral-ink)' }}>
                <p className="mb-3">
                  <strong className="text-[var(--color-ink)]">Clausola fondamentale</strong> — da leggere con attenzione:
                </p>
                <p className="mb-3">
                  Il servizio Overfy prevede per sua natura l&apos;<strong>avvio immediato dell&apos;esecuzione</strong> dopo il pagamento (progettazione, sviluppo, configurazione, consegna del sito web e degli strumenti digitali richiesti).
                </p>
                <p className="mb-3">
                  Ai sensi dell&apos;<strong>art. 59, comma 1, lett. o)</strong> del D.lgs. 206/2005 (Codice del Consumo), sottoscrivendo l&apos;abbonamento e accettando i presenti Termini, il Cliente:
                </p>
                <ul className="space-y-2 ml-5 list-disc">
                  <li>chiede espressamente che il servizio venga avviato durante il periodo di recesso di 14 giorni;</li>
                  <li>riconosce di perdere il diritto di recesso una volta che il servizio sia stato interamente erogato.</li>
                </ul>
              </div>
              <p>
                In concreto: una volta consegnato il sito web e avviati gli strumenti digitali del pacchetto sottoscritto, <strong>il Cliente non può più richiedere il rimborso</strong> per recesso, in quanto il servizio è stato pienamente eseguito su sua esplicita richiesta.
              </p>
              <p>
                Questa clausola tutela il fornitore da richieste di rimborso per un servizio già erogato e personalizzato sul Cliente, ed è conforme alla disciplina europea sulla vendita a distanza di servizi.
              </p>
              <p>
                <em>La presente clausola non si applica se il Cliente agisce nell&apos;ambito della propria attività professionale o imprenditoriale (B2B), ai quali il diritto di recesso non è riconosciuto per legge.</em>
              </p>
            </Section>

            <Section title="5. Casi in cui il rimborso è dovuto">
              <p>
                Nonostante la rinuncia al recesso di cui all&apos;art. 4, il Cliente ha diritto al rimborso integrale di quanto pagato nei seguenti casi tassativi:
              </p>
              <ul className="space-y-2 ml-5 list-disc">
                <li><strong>Mancata erogazione</strong>: il servizio non è stato avviato entro i tempi contrattuali indicati nel piano scelto;</li>
                <li><strong>Difetti gravi del servizio</strong>: il sito/strumento non funziona o ha errori sostanziali non corretti entro 7 giorni dalla segnalazione;</li>
                <li><strong>Impossibilità sopravvenuta</strong> non imputabile al Cliente.</li>
              </ul>
              <p>
                I dettagli sono specificati nella pagina <Link href="/rimborsi" className="text-[var(--color-ink)] underline">Policy rimborsi</Link>.
              </p>
            </Section>

            <Section title="6. Durata, rinnovo e disdetta">
              <p>
                L&apos;abbonamento ha la durata del periodo selezionato al checkout (mensile, trimestrale o annuale) e si rinnova automaticamente allo stesso prezzo salvo disdetta.
              </p>
              <p>
                La disdetta si effettua dal pannello cliente (dashboard) in qualsiasi momento e ha effetto dalla successiva scadenza. Il servizio resta attivo fino al termine del periodo già pagato.
              </p>
            </Section>

            <Section title="7. Obblighi del Cliente">
              <p>
                Il Cliente si impegna a fornire tempestivamente i materiali richiesti (testi, immagini, accessi a dominio e hosting esistenti, informazioni legali) necessari per l&apos;esecuzione del servizio.
              </p>
              <p>
                I ritardi nella fornitura dei materiali da parte del Cliente non prorogano automaticamente la scadenza dell&apos;abbonamento né comportano rimborsi. Il fornitore si impegna invece a iniziare il lavoro entro i tempi contrattuali da quando riceve il materiale.
              </p>
            </Section>

            <Section title="8. Proprietà intellettuale">
              <p>
                Alla fine del rapporto contrattuale, il Cliente rimane titolare dei <em>contenuti</em> da lui forniti (testi, immagini, dati). Il <em>codice, la struttura tecnica, la configurazione tecnica e gli asset visuali prodotti da Overfy</em> restano di proprietà del fornitore salvo diversa pattuizione scritta.
              </p>
              <p>
                Il Cliente può richiedere, al termine del rapporto, l&apos;esportazione dei propri contenuti in formato standard (HTML, CSV, JSON). Non è previsto il trasferimento dell&apos;installazione tecnica su infrastruttura di terzi.
              </p>
            </Section>

            <Section title="9. Responsabilità e limitazioni">
              <p>
                Il fornitore garantisce un uptime di riferimento del 99% mensile, calcolato escludendo le manutenzioni programmate. In caso di interruzioni superiori a 24 ore consecutive non dovute a cause di forza maggiore, il Cliente ha diritto a un&apos;estensione gratuita del servizio pari al doppio del downtime.
              </p>
              <p>
                Overfy non è responsabile per: uso improprio del servizio da parte del Cliente o di terzi; contenuti caricati dal Cliente che violino diritti di terzi; malfunzionamenti di servizi di terze parti integrati (es. provider email, sistemi di pagamento, API esterne).
              </p>
            </Section>

            <Section title="10. Privacy e trattamento dati">
              <p>
                Il trattamento dei dati personali del Cliente è regolato dall&apos;<Link href="/privacy" className="text-[var(--color-ink)] underline">Informativa privacy</Link>, redatta ai sensi del Regolamento UE 2016/679 (GDPR). I dati sono ospitati su infrastruttura europea (Supabase, Vercel, Resend, Stripe) e non vengono trasferiti al di fuori dello Spazio Economico Europeo senza adeguata garanzia.
              </p>
            </Section>

            <Section title="11. Modifiche ai Termini">
              <p>
                Overfy si riserva il diritto di modificare i presenti Termini, dandone comunicazione via email al Cliente con almeno 30 giorni di preavviso. Se il Cliente non accetta le modifiche, può disdire l&apos;abbonamento senza penali fino alla scadenza del periodo in corso.
              </p>
              <p>
                Le modifiche non incidono sui servizi già erogati né sul prezzo del periodo già pagato.
              </p>
            </Section>

            <Section title="12. Legge applicabile e foro competente">
              <p>
                I presenti Termini sono regolati dalla legge italiana. Per controversie con clienti consumatori, foro competente è quello del luogo di residenza o domicilio del consumatore, se in Italia.
              </p>
              <p>
                Per controversie con clienti business (partita IVA), foro esclusivo è quello di <strong>Napoli</strong>.
              </p>
            </Section>

            <Section title="13. Contatti">
              <p>
                Per qualsiasi richiesta o dubbio sui presenti Termini:{' '}
                <a href="mailto:info@overfydigital.com" className="text-[var(--color-ink)] underline">
                  info@overfydigital.com
                </a>
              </p>
            </Section>

          </article>

          <div className="mt-12 text-center">
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Documento aggiornato al 21 aprile 2026. Versione 1.0.
            </p>
            <Link
              href="/rimborsi"
              className="inline-block text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] underline"
            >
              Vedi anche: Policy rimborsi →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-[var(--color-ink)] mb-4 tracking-tight">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
