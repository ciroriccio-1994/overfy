export function About() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--color-bg-alt)]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-center">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] rounded-sm overflow-hidden relative bg-gradient-to-br from-[var(--color-terra)]/40 via-[var(--color-bg-alt)] to-[var(--color-moss)]/20">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-muted)]/40 text-xs uppercase tracking-[0.3em]">
              [ Ritratto Dott.ssa Russo ]
            </div>
          </div>
          <p className="text-xs text-center text-[var(--color-muted)] italic mt-3">
            Chiara Russo, nel suo studio a Chiaia.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-terra-dark)] mb-6">
            — Chi sono —
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-[var(--color-ink)] mb-8">
            Mi chiamo Chiara,
            <br />
            <em className="font-display-italic">e ti ascolto.</em>
          </h2>
          <div className="space-y-5 text-[var(--color-ink-soft)] leading-[1.8]">
            <p>
              Sono psicoterapeuta cognitivo-comportamentale dal 2015, iscritta
              all&apos;Albo degli Psicologi della Campania al numero 8432.
            </p>
            <p>
              Lavoro con persone adulte che attraversano momenti di fatica:
              ansia, attacchi di panico, difficoltà relazionali, transizioni di
              vita. Il mio approccio è pragmatico ma sempre umano — non credo
              nelle terapie fredde, fatte di protocolli meccanici.
            </p>
            <p>
              Ricevo in studio a Chiaia (Napoli) e online, in italiano e
              inglese. La prima chiamata conoscitiva è gratuita: serve per
              capirci, sentirci, decidere insieme se cominciare.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 pt-8 border-t border-[var(--color-line)]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)] mb-1">
                Formazione
              </div>
              <div className="text-sm text-[var(--color-ink)]">
                Federico II · SITCC
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)] mb-1">
                Esperienza
              </div>
              <div className="text-sm text-[var(--color-ink)]">Dal 2015</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)] mb-1">
                Albo Psicologi
              </div>
              <div className="text-sm text-[var(--color-ink)]">Campania · 8432</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
