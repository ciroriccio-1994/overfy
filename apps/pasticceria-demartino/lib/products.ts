export type Product = {
  slug: string;
  name: string;
  category: "classici" | "ricorrenze" | "salati" | "regalo";
  price: number;
  unit: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  conservation: string;
  pieces: string;
  featured?: boolean;
  bestseller?: boolean;
  limited?: boolean;
};

export const products: Product[] = [
  {
    slug: "sfogliatella-riccia",
    name: "Sfogliatella Riccia",
    category: "classici",
    price: 18,
    unit: "box da 6 pezzi",
    shortDescription:
      "La regina di Napoli. Pasta sfoglia a strati e ripieno di ricotta, semolino e canditi.",
    description:
      "La nostra sfogliatella riccia segue la ricetta della bisnonna Carmela, invariata dal 1952. Ogni foglio di pasta viene steso a mano e arrotolato per ore prima della cottura. Il ripieno di ricotta di bufala, semolino fine e canditi d'arancia siciliana nasce la mattina stessa.",
    ingredients: [
      "Farina 00, strutto, acqua, sale",
      "Ricotta di bufala campana DOP",
      "Semolino",
      "Canditi di arancia siciliana",
      "Zucchero, cannella",
    ],
    allergens: ["Glutine", "Latte", "Uova"],
    conservation:
      "Conservare a temperatura ambiente per 48h. Scaldare 3 min a 180°C prima di servire.",
    pieces: "6 pezzi da 70g circa",
    featured: true,
    bestseller: true,
  },
  {
    slug: "sfogliatella-frolla",
    name: "Sfogliatella Frolla",
    category: "classici",
    price: 16,
    unit: "box da 6 pezzi",
    shortDescription:
      "La sorella più dolce della riccia. Guscio di frolla friabile, stesso cuore di ricotta.",
    description:
      "Per chi ama il contrasto morbido della frolla al posto della sfoglia croccante. Stesso ripieno della riccia, stessa ricetta storica, ma avvolto da un guscio di pasta frolla burrosa.",
    ingredients: [
      "Farina 00, burro, uova, zucchero",
      "Ricotta di bufala campana DOP",
      "Semolino, canditi, cannella",
    ],
    allergens: ["Glutine", "Latte", "Uova"],
    conservation:
      "Conservare a temperatura ambiente per 3 giorni. Ottima anche fredda.",
    pieces: "6 pezzi da 70g circa",
  },
  {
    slug: "baba-rum",
    name: "Babà al Rum",
    category: "classici",
    price: 22,
    unit: "box da 4 pezzi",
    shortDescription:
      "Soffici, imbevuti di sciroppo al rum agricolo. Il dolce simbolo di Napoli.",
    description:
      "Lievitazione naturale di 18 ore. Lo sciroppo al rum è fatto in casa con rum agricolo martinicano invecchiato 3 anni. Ogni babà viene immerso a mano poco prima della spedizione, così arriva umido ma non fradicio.",
    ingredients: [
      "Farina manitoba, uova, burro, lievito madre",
      "Zucchero, rum agricolo invecchiato",
      "Acqua, scorza di limone",
    ],
    allergens: ["Glutine", "Latte", "Uova", "Alcol"],
    conservation: "3 giorni a temperatura ambiente in confezione sigillata.",
    pieces: "4 pezzi da 120g",
    featured: true,
  },
  {
    slug: "pastiera-napoletana",
    name: "Pastiera Napoletana",
    category: "ricorrenze",
    price: 28,
    unit: "torta intera 800g",
    shortDescription:
      "Grano cotto, ricotta, fiori d'arancio. La Pasqua in una fetta, tutto l'anno.",
    description:
      "La pastiera di nonna Assunta ha vinto il Premio Pasticceria Campana nel 2019. Grano cotto nel latte per 4 ore, ricotta setacciata tre volte, acqua di fiori d'arancio di Amalfi. Riposa 24h prima della spedizione per sviluppare il sapore pieno.",
    ingredients: [
      "Frolla all'olio di oliva",
      "Grano tenero cotto nel latte",
      "Ricotta di bufala, uova",
      "Canditi, acqua di fiori d'arancio",
    ],
    allergens: ["Glutine", "Latte", "Uova"],
    conservation: "Frigorifero per 5 giorni. Servire a temperatura ambiente.",
    pieces: "Torta 800g, 6-8 porzioni",
    limited: true,
  },
  {
    slug: "delizia-limone",
    name: "Delizia al Limone",
    category: "classici",
    price: 24,
    unit: "box da 4 pezzi",
    shortDescription:
      "Cupola di pan di Spagna, crema al limone di Sorrento IGP, glassa vellutata.",
    description:
      "Dolce nato in Costiera, perfezionato da noi. Pan di Spagna leggero, bagna al limoncello artigianale, crema pasticciera profumata con limoni di Sorrento IGP. Glassa bianca che si scioglie in bocca.",
    ingredients: [
      "Pan di Spagna, panna fresca",
      "Limoni di Sorrento IGP",
      "Uova, zucchero, limoncello",
    ],
    allergens: ["Glutine", "Latte", "Uova", "Alcol"],
    conservation: "Frigorifero, consumare entro 3 giorni.",
    pieces: "4 pezzi da 90g",
  },
  {
    slug: "caprese-cioccolato",
    name: "Torta Caprese",
    category: "classici",
    price: 26,
    unit: "torta intera 600g",
    shortDescription:
      "Senza farina, solo cioccolato fondente 70% e mandorle tostate.",
    description:
      "La leggenda racconta che nacque per errore a Capri negli anni '30. Noi la facciamo con cioccolato Amedei Toscano Black 70% e mandorle di Avola tostate e macinate a grana grossa. Naturalmente senza glutine.",
    ingredients: [
      "Cioccolato fondente 70% Amedei",
      "Mandorle di Avola",
      "Burro, uova, zucchero",
    ],
    allergens: ["Latte", "Uova", "Frutta a guscio"],
    conservation: "Temperatura ambiente per 5 giorni.",
    pieces: "Torta 600g, 8 porzioni",
  },
  {
    slug: "struffoli-miele",
    name: "Struffoli al Miele",
    category: "ricorrenze",
    price: 20,
    unit: "contenitore 500g",
    shortDescription:
      "Palline fritte e miele caldo. Tradizione natalizia napoletana, disponibili tutto l'anno su richiesta.",
    description:
      "Piccole palline di pasta fritte nell'olio di oliva e avvolte in miele di millefiori caldo. Guarnizione con canditi, confettini colorati e scorza di limone. Da condividere a fine pasto.",
    ingredients: [
      "Farina, uova, burro, zucchero",
      "Miele di millefiori",
      "Canditi, confettini, scorza di limone",
    ],
    allergens: ["Glutine", "Latte", "Uova"],
    conservation: "5 giorni in contenitore chiuso a temperatura ambiente.",
    pieces: "Circa 500g",
    limited: true,
  },
  {
    slug: "box-degustazione",
    name: "Box Degustazione De Martino",
    category: "regalo",
    price: 48,
    unit: "confezione regalo",
    shortDescription:
      "Selezione completa: 3 sfogliatelle ricce, 2 babà, 1 delizia al limone, 1 caprese mini.",
    description:
      "Il regalo perfetto per chi vuole scoprire tutta la nostra tradizione. Confezione in legno artigianale, cartolina di auguri personalizzabile, spedizione con ghiaccio secco per arrivo in 24h.",
    ingredients: ["Vedi singoli prodotti"],
    allergens: ["Glutine", "Latte", "Uova", "Frutta a guscio", "Alcol"],
    conservation: "Conservazione mista. Istruzioni nella confezione.",
    pieces: "7 dolci assortiti + cartolina",
    featured: true,
    bestseller: true,
  },
];

export const categories = [
  { id: "tutti", label: "Tutti i dolci" },
  { id: "classici", label: "Classici" },
  { id: "ricorrenze", label: "Ricorrenze" },
  { id: "regalo", label: "Confezioni regalo" },
];
