export type Area = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  duration: number;
  price: string;
  modality: "presenza" | "online" | "entrambe";
  description: string;
  isFirst?: boolean;
};

export const areas: Area[] = [
  {
    slug: "ansia",
    title: "Ansia",
    subtitle: "Quando il pensiero non si ferma",
    description:
      "Preoccupazioni costanti, irritabilità, tensione muscolare, difficoltà a concentrarsi. L'ansia è una risposta naturale, ma quando diventa cronica ci impedisce di vivere serenamente.",
  },
  {
    slug: "panico",
    title: "Attacchi di panico",
    subtitle: "Quando il corpo grida, ma il pericolo non c'è",
    description:
      "Tachicardia, mancanza d'aria, sensazione di perdere il controllo o svenire. Gli attacchi di panico sono una delle esperienze più spaventose, ma si possono capire, affrontare e superare.",
  },
  {
    slug: "relazioni",
    title: "Relazioni affettive",
    subtitle: "Quando ama far male, non dovrebbe essere così",
    description:
      "Difficoltà di coppia, rotture, schemi relazionali che si ripetono, dipendenza affettiva. Esplorare le proprie relazioni è spesso esplorare se stessi.",
  },
  {
    slug: "autostima",
    title: "Autostima e autoefficacia",
    subtitle: "Imparare a volersi bene, davvero",
    description:
      "Senso di inadeguatezza, autocritica severa, difficoltà a riconoscere il proprio valore. Costruire un'autostima solida è un processo, non un interruttore da girare.",
  },
  {
    slug: "cambiamenti",
    title: "Cambiamenti di vita",
    subtitle: "Nelle transizioni c'è sempre un'ombra",
    description:
      "Trasferimenti, separazioni, nascite, lutti, cambi di lavoro. I momenti di transizione espongono le fragilità e offrono l'occasione per comprenderle.",
  },
  {
    slug: "stress",
    title: "Stress e burnout",
    subtitle: "Quando tutto diventa troppo",
    description:
      "Stanchezza cronica, cinismo, senso di inefficacia. Il burnout non è debolezza — è un campanello d'allarme che ci chiede di rivedere equilibri.",
  },
];

export const services: Service[] = [
  {
    slug: "chiamata-conoscitiva",
    name: "Chiamata conoscitiva",
    duration: 20,
    price: "Gratuita",
    modality: "online",
    description:
      "Una telefonata per capire se posso esserti utile, raccontarti come lavoro, rispondere alle tue domande. Nessun impegno.",
    isFirst: true,
  },
  {
    slug: "prima-seduta",
    name: "Prima seduta",
    duration: 60,
    price: "€ 80",
    modality: "entrambe",
    description:
      "Un primo incontro per conoscerci meglio, raccontarmi cosa ti porta qui, cominciare a costruire insieme il percorso.",
  },
  {
    slug: "seduta-individuale",
    name: "Seduta individuale",
    duration: 50,
    price: "€ 70",
    modality: "entrambe",
    description:
      "Percorso di psicoterapia individuale con cadenza settimanale o quindicinale, in presenza o online.",
  },
  {
    slug: "seduta-coppia",
    name: "Seduta di coppia",
    duration: 75,
    price: "€ 100",
    modality: "presenza",
    description:
      "Per coppie che attraversano un momento difficile o vogliono comprendere meglio la propria relazione.",
  },
];

export const modalityLabels = {
  presenza: "In studio a Chiaia",
  online: "Online",
  entrambe: "In studio o online",
} as const;
