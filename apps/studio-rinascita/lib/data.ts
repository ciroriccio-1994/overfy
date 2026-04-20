export type Treatment = {
  slug: string;
  name: string;
  category: "prevenzione" | "estetica" | "implantologia" | "ortodonzia";
  duration: number;
  priceFrom?: number;
  priceRange?: string;
  description: string;
  detail: string;
};

export type Doctor = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  education: string[];
  bio: string;
  treatments: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "prima-visita",
    name: "Prima Visita Gratuita",
    category: "prevenzione",
    duration: 45,
    description:
      "Anamnesi completa, esame clinico, preventivo personalizzato. Senza impegno.",
    detail:
      "La prima visita include anamnesi medica, esame obiettivo del cavo orale, radiografia panoramica digitale e consulenza con piano di trattamento personalizzato. Nessun costo, nessun obbligo di trattamento successivo.",
  },
  {
    slug: "igiene",
    name: "Igiene Professionale",
    category: "prevenzione",
    duration: 60,
    priceFrom: 80,
    description:
      "Detartrasi con ultrasuoni, levigatura, lucidatura e fluorizzazione.",
    detail:
      "Protocollo di igiene professionale con strumenti a ultrasuoni piezoelettrici. Include rimozione placca e tartaro, air polishing, lucidatura finale e applicazione di fluoro. Consigliata ogni 6 mesi.",
  },
  {
    slug: "sbiancamento",
    name: "Sbiancamento Professionale",
    category: "estetica",
    duration: 90,
    priceFrom: 350,
    description:
      "Sbiancamento in studio con lampada LED. Risultato visibile immediato.",
    detail:
      "Trattamento di sbiancamento a base di perossido di idrogeno attivato con lampada LED. Sicuro, indolore, risultato fino a 8 tonalità più chiare in una singola seduta.",
  },
  {
    slug: "faccette",
    name: "Faccette Dentali",
    category: "estetica",
    duration: 120,
    priceRange: "€ 600 — 900 per dente",
    description:
      "Faccette in ceramica per un sorriso armonioso. Digital smile design.",
    detail:
      "Faccette in ceramica integrale realizzate con tecnologia CAD/CAM. Prima del trattamento eseguiamo un Digital Smile Design per mostrarti il risultato finale prima ancora di iniziare.",
  },
  {
    slug: "impianti",
    name: "Implantologia",
    category: "implantologia",
    duration: 120,
    priceRange: "€ 1.500 — 2.500 per impianto",
    description:
      "Impianti osteointegrati di titanio. Chirurgia guidata digitale.",
    detail:
      "Implantologia di ultima generazione con chirurgia computer-guidata. Usiamo impianti Straumann e Nobel Biocare, garantiti a vita. Tecnica minimamente invasiva, ripresa in 24-48 ore.",
  },
  {
    slug: "ortodonzia-invisibile",
    name: "Ortodonzia Invisibile",
    category: "ortodonzia",
    duration: 45,
    priceRange: "€ 3.000 — 5.500",
    description:
      "Allineatori trasparenti Invisalign. Nessuno vedrà che li porti.",
    detail:
      "Sistema Invisalign, leader mondiale nell'ortodonzia invisibile. Allineatori trasparenti personalizzati, rimovibili per mangiare e lavarsi i denti. Durata media del trattamento: 12-18 mesi.",
  },
];

export const doctors: Doctor[] = [
  {
    id: "alessandra-romano",
    name: "Dott.ssa Alessandra Romano",
    role: "Direttrice Sanitaria",
    specialty: "Implantologia e Protesi",
    education: [
      "Laurea in Odontoiatria, Università Federico II, Napoli — 2005",
      "Specializzazione in Chirurgia Orale, Università di Bologna — 2009",
      "Master in Implantologia Digitale, NYU — 2014",
    ],
    bio: "Oltre 800 impianti posizionati. Relatrice a congressi internazionali di implantologia digitale.",
    treatments: ["prima-visita", "impianti"],
  },
  {
    id: "marco-esposito",
    name: "Dott. Marco Esposito",
    role: "Ortodontista",
    specialty: "Ortodonzia Invisibile",
    education: [
      "Laurea in Odontoiatria, Università Federico II — 2010",
      "Diploma Invisalign Platinum Provider — 2016",
    ],
    bio: "Specialista Invisalign certificato. Oltre 400 trattamenti di ortodonzia invisibile completati.",
    treatments: ["prima-visita", "ortodonzia-invisibile"],
  },
  {
    id: "giulia-conte",
    name: "Dott.ssa Giulia Conte",
    role: "Odontoiatra Estetica",
    specialty: "Estetica Dentale e Faccette",
    education: [
      "Laurea in Odontoiatria, Università di Napoli — 2012",
      "Fellowship in Estetica Dentale, University of Siena — 2017",
    ],
    bio: "Esperta in Digital Smile Design e faccette in ceramica integrale.",
    treatments: ["prima-visita", "sbiancamento", "faccette"],
  },
  {
    id: "laura-ferraro",
    name: "Dott.ssa Laura Ferraro",
    role: "Igienista Dentale",
    specialty: "Prevenzione",
    education: [
      "Laurea in Igiene Dentale, Università Federico II — 2015",
      "Certificazione Air Polishing EMS — 2020",
    ],
    bio: "Protocolli di prevenzione personalizzati. Approccio delicato con pazienti ansiosi.",
    treatments: ["prima-visita", "igiene"],
  },
];

export const categoryLabels = {
  prevenzione: "Prevenzione",
  estetica: "Estetica",
  implantologia: "Implantologia",
  ortodonzia: "Ortodonzia",
} as const;
