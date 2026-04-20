export type Service = {
  slug: string;
  name: string;
  category: "parrucchiere" | "estetica" | "manicure" | "trattamenti";
  duration: number; // minuti
  price: number;
  description: string;
  emoji: string;
};

export type Staff = {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  emoji: string;
  services: string[]; // slug servizi che fa
};

export const services: Service[] = [
  // PARRUCCHIERE
  {
    slug: "taglio-donna",
    name: "Taglio Donna",
    category: "parrucchiere",
    duration: 45,
    price: 35,
    description:
      "Taglio personalizzato con consulenza, shampoo e piega finale. Include analisi del capello.",
    emoji: "💇‍♀️",
  },
  {
    slug: "piega",
    name: "Piega",
    category: "parrucchiere",
    duration: 30,
    price: 22,
    description:
      "Shampoo, trattamento base e piega a scelta tra liscio, onde o ricci.",
    emoji: "💨",
  },
  {
    slug: "colore",
    name: "Colore",
    category: "parrucchiere",
    duration: 90,
    price: 55,
    description:
      "Colorazione professionale con prodotti senza ammoniaca. Include taglio e piega.",
    emoji: "🎨",
  },
  {
    slug: "meches",
    name: "Meches / Balayage",
    category: "parrucchiere",
    duration: 150,
    price: 95,
    description:
      "Schiariture personalizzate, tecnica balayage o meches. Include toner, taglio e piega.",
    emoji: "✨",
  },
  {
    slug: "taglio-uomo",
    name: "Taglio Uomo",
    category: "parrucchiere",
    duration: 30,
    price: 20,
    description: "Taglio personalizzato, rifinitura barba, shampoo e styling.",
    emoji: "💈",
  },
  // MANICURE
  {
    slug: "manicure-classica",
    name: "Manicure Classica",
    category: "manicure",
    duration: 45,
    price: 18,
    description: "Limatura, cuticole, massaggio mani e smalto classico a scelta.",
    emoji: "💅",
  },
  {
    slug: "manicure-semi",
    name: "Manicure Semipermanente",
    category: "manicure",
    duration: 60,
    price: 28,
    description:
      "Manicure completa con applicazione smalto semipermanente. Dura 3 settimane.",
    emoji: "💎",
  },
  {
    slug: "pedicure",
    name: "Pedicure Curativa",
    category: "manicure",
    duration: 60,
    price: 32,
    description:
      "Pediluvio, rimozione calli, cuticole, massaggio piedi e smalto.",
    emoji: "🦶",
  },
  // ESTETICA
  {
    slug: "pulizia-viso",
    name: "Pulizia Viso Profonda",
    category: "estetica",
    duration: 60,
    price: 45,
    description:
      "Detersione, esfoliazione, estrazione impurità, maschera e idratazione.",
    emoji: "🧖‍♀️",
  },
  {
    slug: "trattamento-antiage",
    name: "Trattamento Anti-Age",
    category: "estetica",
    duration: 75,
    price: 65,
    description:
      "Protocollo viso con sieri attivi, massaggio tonificante, maschera rassodante.",
    emoji: "🌸",
  },
  {
    slug: "sopracciglia",
    name: "Design Sopracciglia",
    category: "estetica",
    duration: 20,
    price: 12,
    description:
      "Definizione forma sopracciglia con cera e pinzetta, tinta opzionale.",
    emoji: "👁️",
  },
  // TRATTAMENTI CORPO
  {
    slug: "massaggio-rilassante",
    name: "Massaggio Rilassante",
    category: "trattamenti",
    duration: 60,
    price: 55,
    description:
      "Massaggio total body con oli essenziali per sciogliere tensioni.",
    emoji: "🌿",
  },
  {
    slug: "massaggio-drenante",
    name: "Massaggio Drenante",
    category: "trattamenti",
    duration: 60,
    price: 60,
    description:
      "Massaggio mirato per stimolare circolazione e drenaggio linfatico.",
    emoji: "💧",
  },
];

export const staff: Staff[] = [
  {
    id: "gloria",
    name: "Gloria",
    role: "Titolare / Hair Stylist",
    bio: "25 anni di esperienza. Specializzata in colore e tagli contemporanei.",
    specialties: ["Colore", "Meches", "Tagli corti"],
    emoji: "👩‍🦰",
    services: [
      "taglio-donna",
      "piega",
      "colore",
      "meches",
      "taglio-uomo",
    ],
  },
  {
    id: "martina",
    name: "Martina",
    role: "Hair Stylist Junior",
    bio: "Formazione a Milano da Toni & Guy. Esperta in balayage e onde naturali.",
    specialties: ["Balayage", "Styling", "Cura del capello"],
    emoji: "👩",
    services: ["taglio-donna", "piega", "meches"],
  },
  {
    id: "chiara",
    name: "Chiara",
    role: "Estetista",
    bio: "Diplomata CIDESCO. Specialista in trattamenti viso e massaggi.",
    specialties: ["Anti-age", "Pulizia viso", "Massaggi"],
    emoji: "👩‍⚕️",
    services: [
      "pulizia-viso",
      "trattamento-antiage",
      "sopracciglia",
      "massaggio-rilassante",
      "massaggio-drenante",
    ],
  },
  {
    id: "valeria",
    name: "Valeria",
    role: "Onicotecnica",
    bio: "Certificata gel e semipermanente. Nail art su richiesta.",
    specialties: ["Semipermanente", "Nail art", "Pedicure"],
    emoji: "👩‍🎨",
    services: ["manicure-classica", "manicure-semi", "pedicure"],
  },
];

export const categoryLabels = {
  parrucchiere: "Parrucchiere",
  estetica: "Viso",
  manicure: "Mani e Piedi",
  trattamenti: "Corpo",
} as const;

export const categoryEmojis = {
  parrucchiere: "💇‍♀️",
  estetica: "🧖‍♀️",
  manicure: "💅",
  trattamenti: "🌿",
};
