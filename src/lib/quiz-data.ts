export type CategoryId =
  | "physics"
  | "chemistry"
  | "biology"
  | "astronomy"
  | "earth";

export type Question = {
  id: string;
  category: CategoryId;
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explain: string;
};

export type Category = {
  id: CategoryId;
  title: string;
  blurb: string;
  icon: "atom" | "flask" | "leaf" | "orbit" | "globe";
};

export const CATEGORIES: Category[] = [
  {
    id: "physics",
    title: "Physique",
    blurb: "Forces, lumière, énergie",
    icon: "atom",
  },
  {
    id: "chemistry",
    title: "Chimie",
    blurb: "Atomes, liaisons, réactions",
    icon: "flask",
  },
  {
    id: "biology",
    title: "Biologie",
    blurb: "Cellules, gènes, vivant",
    icon: "leaf",
  },
  {
    id: "astronomy",
    title: "Astronomie",
    blurb: "Planètes, étoiles, cosmos",
    icon: "orbit",
  },
  {
    id: "earth",
    title: "Terre",
    blurb: "Climat, roches, océans",
    icon: "globe",
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "p1",
    category: "physics",
    prompt: "Quelle est l’unité SI de la force ?",
    choices: ["Joule", "Newton", "Watt", "Pascal"],
    answer: 1,
    explain: "Le newton (N) est défini comme 1 kg·m/s².",
  },
  {
    id: "p2",
    category: "physics",
    prompt: "La vitesse de la lumière dans le vide est d’environ…",
    choices: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "300 m/s"],
    answer: 1,
    explain: "c ≈ 299 792 458 m/s, arrondi à 3×10⁸ m/s.",
  },
  {
    id: "p3",
    category: "physics",
    prompt: "Quelle particule porte une charge électrique négative ?",
    choices: ["Proton", "Neutron", "Électron", "Photon"],
    answer: 2,
    explain: "L’électron a une charge −e ; le proton est positif.",
  },
  {
    id: "p4",
    category: "physics",
    prompt: "E = mc² relie l’énergie à…",
    choices: ["La température", "La masse", "La pression", "Le volume"],
    answer: 1,
    explain: "L’équivalence masse-énergie d’Einstein : E = mc².",
  },
  {
    id: "p5",
    category: "physics",
    prompt: "Un photon est…",
    choices: [
      "Un quark",
      "Un quantum de lumière",
      "Un ion",
      "Un neutrino",
    ],
    answer: 1,
    explain: "Le photon est le quantum du champ électromagnétique.",
  },
  {
    id: "p6",
    category: "physics",
    prompt: "La période d’un pendule simple dépend principalement de…",
    choices: ["La masse", "La longueur", "La couleur", "La charge"],
    answer: 1,
    explain: "T ≈ 2π√(L/g) : la masse n’intervient pas au premier ordre.",
  },
  {
    id: "p7",
    category: "physics",
    prompt: "Le son se propage le plus vite dans…",
    choices: ["L’air", "L’eau", "Le vide", "L’acier"],
    answer: 3,
    explain: "Les solides denses transmettent les ondes mécaniques plus vite.",
  },
  {
    id: "p8",
    category: "physics",
    prompt: "Quelle loi relie tension, courant et résistance ?",
    choices: ["Faraday", "Ohm", "Ampère", "Coulomb"],
    answer: 1,
    explain: "U = RI, la loi d’Ohm.",
  },
  {
    id: "c1",
    category: "chemistry",
    prompt: "Quel est le numéro atomique du carbone ?",
    choices: ["6", "8", "12", "14"],
    answer: 0,
    explain: "Le carbone a 6 protons ; 12 est sa masse atomique moyenne.",
  },
  {
    id: "c2",
    category: "chemistry",
    prompt: "H₂O est une molécule…",
    choices: ["Ionique", "Polaires covalente", "Métallique", "Apolaire"],
    answer: 1,
    explain: "Les liaisons O–H sont covalentes polaires ; l’eau est polaire.",
  },
  {
    id: "c3",
    category: "chemistry",
    prompt: "Le pH d’une solution acide est…",
    choices: ["Égal à 7", "Supérieur à 7", "Inférieur à 7", "Toujours 0"],
    answer: 2,
    explain: "pH < 7 : acide ; pH = 7 : neutre ; pH > 7 : basique.",
  },
  {
    id: "c4",
    category: "chemistry",
    prompt: "NaCl est un exemple de…",
    choices: ["Gaz noble", "Sel ionique", "Polymère", "Acide fort"],
    answer: 1,
    explain: "Le chlorure de sodium est un cristal ionique Na⁺ Cl⁻.",
  },
  {
    id: "c5",
    category: "chemistry",
    prompt: "Combien d’électrons de valence a l’oxygène ?",
    choices: ["2", "4", "6", "8"],
    answer: 2,
    explain: "Configuration 2s² 2p⁴ : six électrons de valence.",
  },
  {
    id: "c6",
    category: "chemistry",
    prompt: "Une réaction d’oxydation implique…",
    choices: [
      "Un gain d’électrons",
      "Une perte d’électrons",
      "Un gain de protons",
      "Une fusion nucléaire",
    ],
    answer: 1,
    explain: "Oxydation = perte d’électrons ; réduction = gain.",
  },
  {
    id: "c7",
    category: "chemistry",
    prompt: "Le gaz le plus abondant dans l’air sec est…",
    choices: ["Oxygène", "Azote", "CO₂", "Argon"],
    answer: 1,
    explain: "L’azote représente environ 78 % de l’atmosphère.",
  },
  {
    id: "c8",
    category: "chemistry",
    prompt: "Un catalyseur…",
    choices: [
      "Est consommé",
      "Abaisse l’énergie d’activation",
      "Change l’équilibre",
      "Augmente ΔH",
    ],
    answer: 1,
    explain: "Il accélère la réaction sans être consommé ni déplacer l’équilibre.",
  },
  {
    id: "b1",
    category: "biology",
    prompt: "L’unité de base du vivant est…",
    choices: ["L’atome", "La cellule", "L’organe", "Le gène"],
    answer: 1,
    explain: "Tous les organismes sont constitués d’une ou plusieurs cellules.",
  },
  {
    id: "b2",
    category: "biology",
    prompt: "L’ADN se trouve principalement dans…",
    choices: ["Le cytoplasme", "Le noyau", "Le lysosome", "La membrane"],
    answer: 1,
    explain: "Chez les eucaryotes, l’ADN génomique est nucléaire (et mitochondrial).",
  },
  {
    id: "b3",
    category: "biology",
    prompt: "La photosynthèse produit surtout…",
    choices: ["Azote", "Glucose et O₂", "Protéines", "CO₂"],
    answer: 1,
    explain: "CO₂ + H₂O + lumière → sucres + O₂.",
  },
  {
    id: "b4",
    category: "biology",
    prompt: "Les mitochondries sont le siège de…",
    choices: [
      "La photosynthèse",
      "La respiration cellulaire",
      "La digestion",
      "La mitose",
    ],
    answer: 1,
    explain: "Elles produisent l’ATP par phosphorylation oxydative.",
  },
  {
    id: "b5",
    category: "biology",
    prompt: "Combien de chromosomes a une cellule humaine somatique ?",
    choices: ["23", "46", "48", "92"],
    answer: 1,
    explain: "23 paires, soit 46 chromosomes.",
  },
  {
    id: "b6",
    category: "biology",
    prompt: "Les antibiotiques ciblent principalement…",
    choices: ["Les virus", "Les bactéries", "Les prions", "Les champignons"],
    answer: 1,
    explain: "Ils n’agissent pas sur les virus, d’où l’inutilité contre un rhume viral.",
  },
  {
    id: "b7",
    category: "biology",
    prompt: "L’hémoglobine transporte…",
    choices: ["Le glucose", "L’oxygène", "L’urée", "Le calcium"],
    answer: 1,
    explain: "Elle lie O₂ dans les globules rouges.",
  },
  {
    id: "b8",
    category: "biology",
    prompt: "La méiose produit des cellules…",
    choices: ["Diploïdes", "Haploïdes", "Triploïdes", "Anucléées"],
    answer: 1,
    explain: "Gamètes à n chromosomes, pour la reproduction sexuée.",
  },
  {
    id: "a1",
    category: "astronomy",
    prompt: "Quelle planète est la plus proche du Soleil ?",
    choices: ["Vénus", "Mercure", "Mars", "Terre"],
    answer: 1,
    explain: "Mercure orbite à ~0,39 ua.",
  },
  {
    id: "a2",
    category: "astronomy",
    prompt: "Une année-lumière mesure…",
    choices: ["Un temps", "Une distance", "Une masse", "Une énergie"],
    answer: 1,
    explain: "Distance parcourue par la lumière en un an (~9,46×10¹⁵ m).",
  },
  {
    id: "a3",
    category: "astronomy",
    prompt: "Le Soleil est principalement composé de…",
    choices: ["Fer", "Hydrogène", "Oxygène", "Carbone"],
    answer: 1,
    explain: "Environ 75 % d’hydrogène (en masse), puis hélium.",
  },
  {
    id: "a4",
    category: "astronomy",
    prompt: "Un trou noir supermassif se trouve au centre de…",
    choices: ["La Lune", "La Voie lactée", "Mars", "Un atome"],
    answer: 1,
    explain: "Sagittarius A* occupe le centre galactique.",
  },
  {
    id: "a5",
    category: "astronomy",
    prompt: "Les saisons terrestres sont dues à…",
    choices: [
      "La distance au Soleil",
      "L’inclinaison de l’axe",
      "Les marées",
      "Les taches solaires",
    ],
    answer: 1,
    explain: "L’axe est incliné d’environ 23,5°.",
  },
  {
    id: "a6",
    category: "astronomy",
    prompt: "Quelle est la plus grande planète du système solaire ?",
    choices: ["Saturne", "Jupiter", "Neptune", "Uranus"],
    answer: 1,
    explain: "Jupiter contient plus de masse que toutes les autres planètes réunies.",
  },
  {
    id: "a7",
    category: "astronomy",
    prompt: "Une supernova est…",
    choices: [
      "Une collision de comètes",
      "L’explosion d’une étoile massive",
      "Un eclipse",
      "Un pulsar lent",
    ],
    answer: 1,
    explain: "Fin de vie d’une étoile massive, ou explosion thermonucléaire d’une naine blanche.",
  },
  {
    id: "a8",
    category: "astronomy",
    prompt: "La Lune provoque les marées surtout par…",
    choices: ["Sa lumière", "Sa gravité", "Son magnétisme", "Son vent"],
    answer: 1,
    explain: "Le gradient gravitationnel lunaire déforme les océans.",
  },
  {
    id: "e1",
    category: "earth",
    prompt: "La couche la plus externe de la Terre solide est…",
    choices: ["Le manteau", "La croûte", "Le noyau", "La mésosphère"],
    answer: 1,
    explain: "La croûte (continentale ou océanique) surmonte le manteau.",
  },
  {
    id: "e2",
    category: "earth",
    prompt: "Le gaz à effet de serre le plus discuté est…",
    choices: ["O₂", "N₂", "CO₂", "Ar"],
    answer: 2,
    explain: "Le CO₂ d’origine humaine est le principal levier climatique actuel.",
  },
  {
    id: "e3",
    category: "earth",
    prompt: "L’échelle de Richter mesure…",
    choices: ["Le vent", "Les séismes", "La pluie", "Les marées"],
    answer: 1,
    explain: "Elle estime la magnitude d’un tremblement de terre (aujourd’hui : magnitude moment).",
  },
  {
    id: "e4",
    category: "earth",
    prompt: "Le cycle de l’eau commence surtout par…",
    choices: ["La condensation", "L’évaporation", "L’infiltration", "Le ruissellement"],
    answer: 1,
    explain: "L’énergie solaire évapore l’eau des océans et des sols.",
  },
  {
    id: "e5",
    category: "earth",
    prompt: "Les plaques tectoniques flottent sur…",
    choices: ["Le noyau", "L’asthénosphère", "L’atmosphère", "La cryosphère"],
    answer: 1,
    explain: "La lithosphère se déplace sur l’asthénosphère visqueuse.",
  },
  {
    id: "e6",
    category: "earth",
    prompt: "L’ozone stratosphérique protège de…",
    choices: ["Les IR", "Les UV", "Les micro-ondes", "Les rayons X solaires"],
    answer: 1,
    explain: "O₃ absorbe une grande partie du rayonnement ultraviolet.",
  },
  {
    id: "e7",
    category: "earth",
    prompt: "Un fossile se forme le plus souvent dans…",
    choices: ["Le granite", "Les roches sédimentaires", "Le basalte", "Le magma"],
    answer: 1,
    explain: "L’enfouissement dans les sédiments favorise la fossilisation.",
  },
  {
    id: "e8",
    category: "earth",
    prompt: "El Niño est un phénomène…",
    choices: [
      "Volcanique",
      "Océan-atmosphère pacifique",
      "Magnétique",
      "Glaciaire uniquement",
    ],
    answer: 1,
    explain: "Réchauffement périodique du Pacifique équatorial, avec impacts climatiques globaux.",
  },
];

export const QUIZ_LENGTH = 8;
export const SECONDS_PER_QUESTION = 20;

export function pickQuestions(category: CategoryId | "all"): Question[] {
  const pool =
    category === "all"
      ? QUESTIONS
      : QUESTIONS.filter((q) => q.category === category);
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(QUIZ_LENGTH, copy.length));
}

export function categoryById(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)!;
}
