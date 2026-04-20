export type Tier = "essenziale" | "professionale" | "enterprise";

export type Demo = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tier: Tier;
  addons?: string[];
  localUrl: string;
  localPort: number;
  features: string[];
  description: string;
  longDescription: string;
  idealFor: string[];
  preview: string;
};

// Colori per tier:
// Essenziale = rosso corallo
// Professionale = verde menta (il più scelto)
// Enterprise = blu cielo

export const demos: Demo[] = [
  {
    slug: "pt-marco",
    title: "Marco Esposito",
    subtitle: "Personal Trainer · Napoli",
    category: "Professionisti del benessere",
    tier: "essenziale",
    localUrl: "https://pt-marco.vercel.app",
    localPort: 3001,
    features: [
      "Landing page one-page",
      "3 programmi con prezzi",
      "Form prenotazione consulenza",
      "Testimonianze clienti",
      "FAQ dinamica",
      "WhatsApp floating",
      "Google Business integrato",
    ],
    description:
      "Landing energetica per professionisti del benessere. Ideale per PT, nutrizionisti, coach sportivi.",
    longDescription:
      "Il professionista del fitness oggi vive di reputazione e referral. Questa demo offre tutto quello che serve per convertire un visitatore curioso in un cliente fidelizzato: programmi chiari, prezzi trasparenti, testimonianze autentiche, e un form di consulenza gratuita che genera lead qualificati.",
    idealFor: [
      "Personal trainer",
      "Nutrizionisti",
      "Coach sportivi",
      "Istruttori yoga",
    ],
    preview: "💪",
  },
  {
    slug: "pasticceria-demartino",
    title: "Pasticceria De Martino",
    subtitle: "E-commerce · Napoli Materdei",
    category: "E-commerce alimentare",
    tier: "enterprise",
    localUrl: "https://pasticceria-demartino.vercel.app",
    localPort: 3002,
    features: [
      "Homepage narrativa editoriale",
      "Catalogo prodotti con filtri",
      "Schede dettaglio complete",
      "Carrello e checkout Stripe",
      "Pagina storia famigliare",
      "Area spedizioni dedicata",
      "Recensioni clienti",
    ],
    description:
      "E-commerce completo per prodotti artigianali alimentari. Storytelling e vendita integrati.",
    longDescription:
      "Quando il prodotto ha un'anima — una storia di famiglia, una ricetta tramandata — il sito deve raccontarla prima di venderla. Questo e-commerce bilancia narrativa emotiva e funzionalità commerciali complete: dal carrello al checkout, dalla gestione spedizioni alle recensioni.",
    idealFor: [
      "Pasticcerie artigianali",
      "Cantine e produttori",
      "Gastronomie tipiche",
      "Boutique alimentari",
    ],
    preview: "🥐",
  },
  {
    slug: "pizzeria-presidente",
    title: "'A Figlia d'o Presidente",
    subtitle: "Ristorante · Napoli Tribunali",
    category: "Ristorazione",
    tier: "professionale",
    localUrl: "https://pizzeria-qrmenu.vercel.app",
    localPort: 3003,
    features: [
      "Sito istituzionale elegante",
      "Pagina 'La nostra storia'",
      "Menu digitale con QR code reale",
      "QR generato dinamicamente",
      "Prenotazione via telefono/WhatsApp",
      "Google Maps integrato",
      "Tipografia editoriale",
    ],
    description:
      "Sito istituzionale per ristoranti storici. Menu digitale accessibile via QR al tavolo.",
    longDescription:
      "Il QR code al tavolo è la piccola rivoluzione silenziosa della ristorazione moderna: niente stampe, aggiornamenti istantanei, traduzioni automatiche, fotografie dei piatti. Il catalogo presenta un sito istituzionale elegante con il QR reale che punta al menu digitale.",
    idealFor: ["Pizzerie", "Trattorie storiche", "Ristoranti", "Bar e bistrot"],
    preview: "🍕",
  },
  {
    slug: "salone-gloria",
    title: "Salone Gloria",
    subtitle: "Parrucchiere & Estetica · Chiaia",
    category: "Beauty & wellness",
    tier: "professionale",
    localUrl: "https://prenotazioni-gloria.vercel.app",
    localPort: 3004,
    features: [
      "Homepage con catalogo servizi",
      "Pagina team professionisti",
      "Sistema prenotazioni in 4 step",
      "Calendario con slot disponibili",
      "Filtro staff per servizio",
      "Riepilogo prenotazione sticky",
      "Conferma con codice univoco",
    ],
    description:
      "Sistema completo di prenotazioni online per saloni beauty. Il più versatile del catalogo.",
    longDescription:
      "Il sistema di prenotazione è il cuore di un salone: ogni minuto liberato dalle chiamate telefoniche è un minuto risparmiato. Questo demo mostra un flusso completo in 4 step (servizio → operatore → data/ora → dati) facilmente adattabile a qualsiasi professionista con agenda.",
    idealFor: [
      "Parrucchieri",
      "Centri estetici",
      "Tatuatori",
      "Fisioterapisti",
    ],
    preview: "💇‍♀️",
  },
  {
    slug: "studio-rinascita",
    title: "Studio Rinascita",
    subtitle: "Studio Dentistico · Posillipo",
    category: "Sanità & cliniche",
    tier: "professionale",
    addons: ["Chatbot AI integrato"],
    localUrl: "https://studio-rinascita.vercel.app",
    localPort: 3005,
    features: [
      "Sito istituzionale clinico",
      "4 aree trattamenti (6 servizi)",
      "Team medico con specializzazioni",
      "Sezione tecnologie",
      "Testimonianze etiche",
      "Prenotazione 4 step",
      "Chatbot con FAQ cliniche",
      "Promemoria WhatsApp 24h prima",
    ],
    description:
      "Sito istituzionale per cliniche e studi medici premium. Include chatbot informativo.",
    longDescription:
      "Il paziente di oggi si informa online prima di prendere appuntamento. Questo demo offre trasparenza totale — prezzi, tecnologie, team, testimonianze — e un chatbot che risponde alle domande più frequenti (costi impianti, convenzioni, orari) prima che il paziente debba chiamare.",
    idealFor: [
      "Studi dentistici",
      "Poliambulatori",
      "Studi medici specialistici",
      "Centri diagnostici",
    ],
    preview: "🦷",
  },
  {
    slug: "dott-russo",
    title: "Dott.ssa Chiara Russo",
    subtitle: "Psicoterapeuta · Chiaia",
    category: "Professioni d'aiuto",
    tier: "professionale",
    addons: ["Chatbot AI integrato"],
    localUrl: "https://dott-russo.vercel.app",
    localPort: 3006,
    features: [
      "Hero con effetto 'respiro'",
      "6 aree di intervento",
      "Metodo terapeutico in 3 fasi",
      "Prenotazione chiamata gratuita",
      "Scelta modalità presenza/online",
      "Chatbot etico con disclaimer",
      "Sezione riservatezza",
      "Info ricevute detraibili",
    ],
    description:
      "Sito caldo e professionale per psicologi e counselor. Tono umano, mai clinico.",
    longDescription:
      "La psicoterapia si sceglie per fiducia. Questo demo dimostra come un sito possa essere il primo punto di contatto rassicurante: tono caldo, trasparenza sul metodo, primo contatto gratuito, e tutela della riservatezza come valore dichiarato e integrato.",
    idealFor: [
      "Psicologi",
      "Counselor",
      "Coach sviluppo personale",
      "Logopedisti",
    ],
    preview: "🌿",
  },
];

export type Plan = {
  tier: Tier;
  name: string;
  price: number;
  tagline: string;
  description: string;
  features: string[];
  highlight?: boolean;
  setupFee?: number;
};

export const plans: Plan[] = [
  {
    tier: "essenziale",
    name: "Essenziale",
    price: 49,
    tagline: "Il minimo per esistere online oggi",
    description:
      "Per chi non ha mai avuto un sito. Landing professionale, Google Business, form contatti.",
    features: [
      "Sito web fino a 3 pagine",
      "Sottodominio gratuito",
      "Mobile responsive",
      "Form contatti",
      "Google Business ottimizzato",
      "Chatbot base (FAQ template)",
      "Supporto WhatsApp",
      "Modifiche testi/foto illimitate",
      "Hosting, SSL, backup inclusi",
    ],
  },
  {
    tier: "professionale",
    name: "Professionale",
    price: 99,
    tagline: "Sito + strumenti che liberano il tuo tempo",
    description:
      "Per professionisti con appuntamenti e prenotazioni. Il pacchetto più scelto.",
    features: [
      "Tutto dell'Essenziale, più:",
      "Sito fino a 7 pagine",
      "Dominio .it personalizzato",
      "Email professionale",
      "Sistema prenotazioni online",
      "Menu digitale QR code",
      "Chatbot avanzato personalizzato",
      "Google Analytics + report mensile",
      "Modifiche design 2 all'anno",
      "Supporto prioritario (2h)",
    ],
    highlight: true,
  },
  {
    tier: "enterprise",
    name: "Enterprise",
    price: 199,
    setupFee: 499,
    tagline: "Quando vendi online o gestisci processi complessi",
    description:
      "Per chi vende prodotti online. Include e-commerce completo e dashboard admin.",
    features: [
      "Tutto del Professionale, più:",
      "E-commerce completo",
      "Pagamenti Stripe integrati",
      "Gestione spedizioni e ordini",
      "Gestione inventario",
      "Dashboard amministratore",
      "Email marketing integrato",
      "Report avanzati",
      "Personalizzazioni design",
      "Supporto dedicato",
    ],
  },
];

export const tierLabels: Record<Tier, string> = {
  essenziale: "Essenziale",
  professionale: "Professionale",
  enterprise: "Enterprise",
};

// Mapping colori per tier
export const tierColors = {
  essenziale: {
    bg: "var(--color-coral-soft)",
    accent: "var(--color-coral)",
    ink: "var(--color-coral-ink)",
  },
  professionale: {
    bg: "var(--color-mint-soft)",
    accent: "var(--color-mint)",
    ink: "var(--color-mint-ink)",
  },
  enterprise: {
    bg: "var(--color-sky-soft)",
    accent: "var(--color-sky)",
    ink: "var(--color-sky-ink)",
  },
} as const;
