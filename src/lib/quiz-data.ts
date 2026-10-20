import { EXTRA_QUESTIONS } from "./quiz-extra";

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
    choices: ["L’air", "L’eau", "L’acier", "Le vide"],
    answer: 2,
    explain: "Plus le milieu est dense et rigide, plus la vitesse du son est élevée.",
  },
  {
    id: "p8",
    category: "physics",
    prompt: "Un isolant thermique limite…",
    choices: [
      "Le courant électrique seulement",
      "Les transferts de chaleur",
      "La lumière visible uniquement",
      "La gravité",
    ],
    answer: 1,
    explain: "Il réduit conduction, convection ou rayonnement selon le matériau.",
  },
  {
    id: "c1",
    category: "chemistry",
    prompt: "Le numéro atomique indique…",
    choices: [
      "Le nombre de neutrons",
      "Le nombre de protons",
      "La masse molaire",
      "Le nombre d’isotopes",
    ],
    answer: 1,
    explain: "Z = nombre de protons du noyau, définit l’élément.",
  },
  {
    id: "c2",
    category: "chemistry",
    prompt: "H₂O est…",
    choices: [
      "Un élément",
      "Un composé",
      "Un mélange hétérogène",
      "Un ion",
    ],
    answer: 1,
    explain: "Deux éléments liés chimiquement : un composé.",
  },
  {
    id: "c3",
    category: "chemistry",
    prompt: "Une liaison covalente met en jeu…",
    choices: [
      "Un transfert d’électrons",
      "Un partage d’électrons",
      "Des protons partagés",
      "Des neutrons",
    ],
    answer: 1,
    explain: "Les atomes partagent des doublets d’électrons.",
  },
  {
    id: "c4",
    category: "chemistry",
    prompt: "Le tableau périodique classe les éléments selon…",
    choices: [
      "La densité",
      "Le numéro atomique",
      "La date de découverte",
      "La couleur",
    ],
    answer: 1,
    explain: "L’ordre est celui du numéro atomique croissant.",
  },
  {
    id: "c5",
    category: "chemistry",
    prompt: "Un acide selon Arrhenius libère en solution…",
    choices: ["OH⁻", "H⁺", "Na⁺", "Cl₂"],
    answer: 1,
    explain: "Les acides augmentent la concentration en H⁺ (ou H₃O⁺).",
  },
  {
    id: "c6",
    category: "chemistry",
    prompt: "L’eau oxygénée (H₂O₂) est…",
    choices: [
      "Un combustible",
      "Un oxydant courant",
      "Un gaz noble",
      "Un métal",
    ],
    answer: 1,
    explain: "H₂O₂ oxydant utilisé notamment comme désinfectant.",
  },
  {
    id: "c7",
    category: "chemistry",
    prompt: "Une réaction exothermique…",
    choices: [
      "Absorbe de la chaleur",
      "Libère de la chaleur",
      "Ne change pas d’énergie",
      "Produit toujours un gaz",
    ],
    answer: 1,
    explain: "ΔH < 0 : de l’énergie est cédée au milieu.",
  },
  {
    id: "c8",
    category: "chemistry",
    prompt: "Le diamant et le graphite sont…",
    choices: ["Des isotopes", "Des allotropes", "Des ions", "Des mélanges"],
    answer: 1,
    explain: "Même élément (C), structures cristallines différentes.",
  },
  {
    id: "b1",
    category: "biology",
    prompt: "L’unité de base du vivant est…",
    choices: ["L’atome", "La cellule", "Le tissu", "L’organe"],
    answer: 1,
    explain: "Tous les organismes sont constitués d’une ou plusieurs cellules.",
  },
  {
    id: "b2",
    category: "biology",
    prompt: "L’ADN code principalement…",
    choices: [
      "Les lipides",
      "Les protéines (via l’ARN)",
      "Les os",
      "Les hormones stéroïdes seulement",
    ],
    answer: 1,
    explain: "Gène → ARNm → protéine (dogme central).",
  },
  {
    id: "b3",
    category: "biology",
    prompt: "La photosynthèse a lieu surtout dans…",
    choices: [
      "Les mitochondries",
      "Les chloroplastes",
      "Le noyau",
      "Les ribosomes",
    ],
    answer: 1,
    explain: "Les chloroplastes des végétaux captent la lumière.",
  },
  {
    id: "b4",
    category: "biology",
    prompt: "Les globules rouges transportent…",
    choices: ["Le glucose seulement", "L’oxygène", "Les nerfs", "La bile"],
    answer: 1,
    explain: "Grâce à l’hémoglobine, ils acheminent O₂.",
  },
  {
    id: "b5",
    category: "biology",
    prompt: "Une espèce regroupe des individus…",
    choices: [
      "Identiques génétiquement",
      "Capables de se reproduire entre eux",
      "De même couleur",
      "Du même continent",
    ],
    answer: 1,
    explain: "Critère biologique : interfécondité et descendance fertile.",
  },
  {
    id: "b6",
    category: "biology",
    prompt: "Les antibiotiques ciblent en général…",
    choices: ["Les virus", "Les bactéries", "Les prions", "Les moisissures seulement"],
    answer: 1,
    explain: "Inefficaces contre les virus ; action antibactérienne.",
  },
  {
    id: "b7",
    category: "biology",
    prompt: "La mitose produit…",
    choices: [
      "Des gamètes haploïdes",
      "Deux cellules filles diploïdes",
      "Quatre spores",
      "Un zygote",
    ],
    answer: 1,
    explain: "Division cellulaire de croissance / réparation.",
  },
  {
    id: "b8",
    category: "biology",
    prompt: "Un écosystème comprend…",
    choices: [
      "Uniquement les animaux",
      "Biotique et abiotique",
      "Seulement le climat",
      "Uniquement les plantes",
    ],
    answer: 1,
    explain: "Interactions entre êtres vivants et milieu physique.",
  },
  {
    id: "a1",
    category: "astronomy",
    prompt: "La planète la plus proche du Soleil est…",
    choices: ["Vénus", "Mercure", "Mars", "Terre"],
    answer: 1,
    explain: "Mercure orbite le plus près du Soleil.",
  },
  {
    id: "a2",
    category: "astronomy",
    prompt: "Une année-lumière est une unité de…",
    choices: ["Temps", "Distance", "Masse", "Luminosité"],
    answer: 1,
    explain: "Distance parcourue par la lumière en une année.",
  },
  {
    id: "a3",
    category: "astronomy",
    prompt: "Le Soleil est essentiellement…",
    choices: [
      "Une planète gazeuse",
      "Une étoile",
      "Une comète",
      "Un trou noir",
    ],
    answer: 1,
    explain: "Naine jaune de la séquence principale.",
  },
  {
    id: "a4",
    category: "astronomy",
    prompt: "Les phases de la Lune viennent de…",
    choices: [
      "L’ombre de la Terre seule",
      "La portion éclairée visible depuis la Terre",
      "Des éclipses mensuelles",
      "La rotation du Soleil",
    ],
    answer: 1,
    explain: "Selon l’angle Soleil–Lune–Terre, on voit plus ou moins du disque éclairé.",
  },
  {
    id: "a5",
    category: "astronomy",
    prompt: "Saturne est célèbre pour…",
    choices: [
      "Sa surface océanique",
      "Son système d’anneaux",
      "Être la plus proche",
      "Son absence de lunes",
    ],
    answer: 1,
    explain: "Anneaux de glace et de poussières très visibles.",
  },
  {
    id: "a6",
    category: "astronomy",
    prompt: "Un trou noir supermassif se trouve…",
    choices: [
      "Au centre de la plupart des galaxies",
      "Uniquement dans le Soleil",
      "Sur la Lune",
      "Dans l’atmosphère terrestre",
    ],
    answer: 0,
    explain: "Dont Sgr A* au centre de la Voie lactée.",
  },
  {
    id: "a7",
    category: "astronomy",
    prompt: "Les étoiles filantes sont surtout…",
    choices: [
      "Des étoiles qui tombent",
      "Des météores",
      "Des satellites",
      "Des aurores",
    ],
    answer: 1,
    explain: "Petits corps qui s’échauffent en entrant dans l’atmosphère.",
  },
  {
    id: "a8",
    category: "astronomy",
    prompt: "La polaris indique approximativement…",
    choices: [
      "Le sud",
      "Le nord céleste",
      "L’est",
      "L’équateur",
    ],
    answer: 1,
    explain: "Étoile polaire proche du pôle nord céleste.",
  },
  {
    id: "e1",
    category: "earth",
    prompt: "La couche gazeuse autour de la Terre est…",
    choices: ["L’hydrosphère", "L’atmosphère", "La lithosphère", "La biosphère"],
    answer: 1,
    explain: "L’atmosphère enveloppe la planète.",
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

export const QUIZ_LENGTH = 10;
export const SECONDS_PER_QUESTION = 20;

export function pickQuestions(category: CategoryId | "all"): Question[] {
  const base =
    category === "all"
      ? QUESTIONS
      : QUESTIONS.filter((q) => q.category === category);
  const extra =
    category === "all"
      ? EXTRA_QUESTIONS
      : EXTRA_QUESTIONS.filter((q) => q.category === category);
  const pool = [...base, ...extra];
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
