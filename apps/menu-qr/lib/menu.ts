export type Dish = {
  name: string;
  description?: string;
  price: number;
  signature?: boolean;
};

export type MenuSection = {
  title: string;
  subtitle?: string;
  dishes: Dish[];
};

export const menuSections: MenuSection[] = [
  {
    title: "Le Classiche",
    subtitle: "Le pizze della tradizione napoletana",
    dishes: [
      {
        name: "Marinara",
        description: "Pomodoro San Marzano DOP, aglio, origano, olio extravergine",
        price: 6,
      },
      {
        name: "Margherita",
        description: "Pomodoro San Marzano, fiordilatte di Agerola, basilico, olio extravergine",
        price: 7.5,
      },
      {
        name: "Margherita con Bufala",
        description: "Pomodoro San Marzano, mozzarella di bufala campana DOP, basilico",
        price: 10,
      },
      {
        name: "Diavola",
        description: "Pomodoro San Marzano, fiordilatte, salame piccante calabrese",
        price: 9,
      },
      {
        name: "Capricciosa",
        description: "Pomodoro, fiordilatte, prosciutto cotto, funghi, carciofini, olive nere",
        price: 11,
      },
      {
        name: "Napoli",
        description: "Pomodoro San Marzano, fiordilatte, alici di Cetara, capperi, olive",
        price: 10,
      },
    ],
  },
  {
    title: "Le Nostre Signature",
    subtitle: "Ricette originali della casa",
    dishes: [
      {
        name: "'A Figlia d'o Presidente",
        description:
          "Fiordilatte di Agerola, provola affumicata di bufalo, prosciutto crudo di Parma 24 mesi, rucola del Vesuvio, scaglie di Grana Padano",
        price: 14,
        signature: true,
      },
      {
        name: "Pistacchio e Mortadella",
        description:
          "Crema di pistacchio di Bronte, fiordilatte, mortadella Favola, granella di pistacchio",
        price: 13,
        signature: true,
      },
      {
        name: "Tartufata",
        description:
          "Crema di tartufo nero, fiordilatte, prosciutto crudo, scaglie di tartufo fresco",
        price: 18,
        signature: true,
      },
      {
        name: "Vesuviana",
        description:
          "Pomodorino del piennolo del Vesuvio DOP, fiordilatte, basilico, olio al peperoncino",
        price: 12,
      },
    ],
  },
  {
    title: "Antipasti",
    dishes: [
      {
        name: "Caprese di Bufala",
        description: "Mozzarella di bufala DOP, pomodori del Vesuvio, basilico, olio extravergine",
        price: 9,
      },
      {
        name: "Tagliere di Salumi Campani",
        description: "Capocollo, soppressata, prosciutto crudo, salame, crostini",
        price: 14,
      },
      {
        name: "Polipetti affogati",
        description: "Polipetti in umido con pomodorini e olive, serviti con friselline",
        price: 13,
      },
    ],
  },
  {
    title: "Fritti Napoletani",
    subtitle: "La tradizione della pizzeria fritta",
    dishes: [
      {
        name: "Frittatine",
        description: "Pasta, besciamella, piselli, prosciutto cotto, provola",
        price: 5,
      },
      {
        name: "Crocché di patate",
        description: "Patate, provola filante, prezzemolo",
        price: 4,
      },
      {
        name: "Montanara",
        description: "Pizza fritta ripassata al forno con pomodoro, fiordilatte, basilico",
        price: 6,
      },
      {
        name: "Arancino napoletano",
        description: "Risotto al ragù, piselli, provola, pangrattato",
        price: 5.5,
      },
    ],
  },
  {
    title: "Dolci",
    dishes: [
      {
        name: "Sfogliatella riccia",
        description: "Pasta sfoglia, ricotta, semolino, canditi. Servita tiepida",
        price: 3.5,
      },
      {
        name: "Babà al Rum",
        description: "Dolce lievitato al rum agricolo, panna fresca",
        price: 4.5,
      },
      {
        name: "Tiramisù della casa",
        description: "Mascarpone, savoiardi, caffè espresso, cacao",
        price: 5,
      },
    ],
  },
  {
    title: "Cantina",
    subtitle: "Selezione di vini campani",
    dishes: [
      {
        name: "Falanghina dei Campi Flegrei",
        description: "Bianco, 0.75L",
        price: 18,
      },
      {
        name: "Greco di Tufo DOCG",
        description: "Bianco, 0.75L",
        price: 22,
      },
      {
        name: "Aglianico del Taburno",
        description: "Rosso, 0.75L",
        price: 20,
      },
      {
        name: "Taurasi Riserva",
        description: "Rosso, 0.75L",
        price: 35,
      },
      {
        name: "Birra alla spina",
        description: "Media 0.4L / Piccola 0.2L",
        price: 5,
      },
      {
        name: "Acqua naturale o frizzante",
        description: "0.75L",
        price: 2,
      },
    ],
  },
];
