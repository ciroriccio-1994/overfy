export function Contact() {
  return (
    <section
      id="contatti"
      className="bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent-soft)] mb-6">
            Visita il locale
          </div>
          <h2 className="font-display text-5xl md:text-6xl leading-[1] mb-6">
            Ti aspettiamo
            <br />
            <em className="font-display-italic text-[var(--color-accent-soft)]">
              ai Tribunali.
            </em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div className="text-center md:text-left">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent-soft)] mb-3">
              Dove siamo
            </div>
            <div className="font-display text-xl leading-snug mb-2">
              Via dei Tribunali 47
            </div>
            <div className="text-sm text-[var(--color-paper)]/60 mb-4">
              80138 Napoli, Italia
            </div>
            <a
              href="https://maps.google.com/?q=Via+dei+Tribunali+47+Napoli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent-soft)] border-b border-[var(--color-accent-soft)]/40 pb-1 hover:text-[var(--color-paper)] hover:border-[var(--color-paper)] transition"
            >
              Indicazioni →
            </a>
          </div>

          <div className="text-center md:text-left">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent-soft)] mb-3">
              Orari
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between md:justify-start md:gap-6">
                <span className="text-[var(--color-paper)]/60">Mar — Gio</span>
                <span>19:00 — 23:30</span>
              </div>
              <div className="flex justify-between md:justify-start md:gap-6">
                <span className="text-[var(--color-paper)]/60">Ven — Sab</span>
                <span>19:00 — 00:30</span>
              </div>
              <div className="flex justify-between md:justify-start md:gap-6">
                <span className="text-[var(--color-paper)]/60">Domenica</span>
                <span>12:30 — 15:30</span>
              </div>
              <div className="flex justify-between md:justify-start md:gap-6 pt-1">
                <span className="text-[var(--color-paper)]/60">Lunedì</span>
                <span className="italic text-[var(--color-paper)]/40">Chiuso</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent-soft)] mb-3">
              Prenota
            </div>
            <div className="space-y-3">
              <a
                href="tel:+390811234567"
                className="block bg-[var(--color-paper)] text-[var(--color-ink)] text-center py-3 rounded-full text-xs uppercase tracking-[0.15em] hover:bg-[var(--color-accent-soft)] transition"
              >
                Chiama · 081 123 4567
              </a>
              <a
                href="https://wa.me/393331234567?text=Ciao,%20vorrei%20prenotare%20un%20tavolo"
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-[var(--color-paper)]/40 text-[var(--color-paper)] text-center py-3 rounded-full text-xs uppercase tracking-[0.15em] hover:bg-[var(--color-paper)]/10 transition"
              >
                WhatsApp
              </a>
            </div>
            <p className="text-xs text-[var(--color-paper)]/50 mt-4 italic">
              Consigliamo di prenotare per cene weekend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
