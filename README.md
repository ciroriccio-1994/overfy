# Overfy

> Digitalizzazione on-demand per imprese italiane.
> Sito, e-commerce, automazioni AI, chatbot, app — a canone mensile, senza contratti capestro.

🌐 **Live:** [overfydigital.com](https://overfydigital.com)

---

## Cos'è

Overfy è una piattaforma B2B SaaS che offre digitalizzazione personalizzata a micro e piccole imprese italiane. Il cliente sceglie un piano mensile, noi realizziamo quello di cui ha bisogno — da una landing page a un e-commerce completo, da un chatbot AI a un'app nativa.

Il modello è semplice: **installazione gratuita**, paghi solo il canone mensile, smetti quando vuoi.

Una delle opzioni è l'add-on **gestione social** (Basic €100/mese, Pro €200/mese), acquistabile sopra qualsiasi piano base.

---

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- **Database:** Supabase (PostgreSQL 17)
- **Pagamenti:** Stripe (subscription-based)
- **Email transazionali:** Resend
- **Hosting:** Vercel
- **Monorepo:** Turborepo
- **Styling:** Tailwind CSS 4

---

## Struttura repository

Questa è un monorepo Turborepo che contiene:

```
apps/
├── catalogo/              # Overfy — l'app principale (overfydigital.com)
├── pt-marco/              # Demo: personal trainer
├── pasticceria-demartino/ # Demo: pasticceria
├── menu-qr/               # Demo: menu digitale per ristoranti
├── prenotazioni-gloria/   # Demo: sistema prenotazioni
├── dott-russo/            # Demo: studio dentistico
└── studio-rinascita/      # Demo: studio professionale

packages/
├── ui/                    # Componenti UI condivisi
├── eslint-config/         # Config ESLint condivisa
└── typescript-config/     # Config TypeScript condivisa

supabase/                  # Schema e migration del DB (per le demo)
docs/                      # Documentazione del progetto
```

L'applicazione principale è in `apps/catalogo`, le altre cartelle sotto `apps/` sono **demo** pubbliche di come un cliente Overfy può apparire dopo la digitalizzazione.

---

## Cosa c'è dentro `apps/catalogo`

- Homepage marketing
- Sistema di autenticazione (Supabase Auth con Google OAuth + email/password)
- Checkout Stripe con piani mensili e trimestrali
- Dashboard utente (piano, fatture, profilo)
- Pannello amministrativo
- Programma referral (-50% sul rinnovo)
- Programma agenti/procacciatori (€40-300 per cliente portato)
- Add-on gestione social (Basic + Pro, con proration e cancellazione a fine periodo)

---

## Contatti

Per informazioni commerciali o partnership: [info@overfydigital.com](mailto:info@overfydigital.com)

Sito: [overfydigital.com](https://overfydigital.com)

---

## Licenza

Tutto il codice in questo repository è proprietario — © 2026 Overfy. Tutti i diritti riservati.
Vedi [LICENSE](./LICENSE) per i dettagli.
