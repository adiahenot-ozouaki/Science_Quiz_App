import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Leaf, c as FlaskConical, d as ArrowRight, i as Orbit, l as Clock, n as Shuffle, o as LayoutGrid, r as RotateCcw, s as Globe, u as Atom } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { r as Slot } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CV2YwKRe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		id: "physics",
		title: "Physique",
		blurb: "Forces, lumière, énergie",
		icon: "atom"
	},
	{
		id: "chemistry",
		title: "Chimie",
		blurb: "Atomes, liaisons, réactions",
		icon: "flask"
	},
	{
		id: "biology",
		title: "Biologie",
		blurb: "Cellules, gènes, vivant",
		icon: "leaf"
	},
	{
		id: "astronomy",
		title: "Astronomie",
		blurb: "Planètes, étoiles, cosmos",
		icon: "orbit"
	},
	{
		id: "earth",
		title: "Terre",
		blurb: "Climat, roches, océans",
		icon: "globe"
	}
];
var QUESTIONS = [
	{
		id: "p1",
		category: "physics",
		prompt: "Quelle est l’unité SI de la force ?",
		choices: [
			"Joule",
			"Newton",
			"Watt",
			"Pascal"
		],
		answer: 1,
		explain: "Le newton (N) est défini comme 1 kg·m/s²."
	},
	{
		id: "p2",
		category: "physics",
		prompt: "La vitesse de la lumière dans le vide est d’environ…",
		choices: [
			"3×10⁶ m/s",
			"3×10⁸ m/s",
			"3×10¹⁰ m/s",
			"300 m/s"
		],
		answer: 1,
		explain: "c ≈ 299 792 458 m/s, arrondi à 3×10⁸ m/s."
	},
	{
		id: "p3",
		category: "physics",
		prompt: "Quelle particule porte une charge électrique négative ?",
		choices: [
			"Proton",
			"Neutron",
			"Électron",
			"Photon"
		],
		answer: 2,
		explain: "L’électron a une charge −e ; le proton est positif."
	},
	{
		id: "p4",
		category: "physics",
		prompt: "E = mc² relie l’énergie à…",
		choices: [
			"La température",
			"La masse",
			"La pression",
			"Le volume"
		],
		answer: 1,
		explain: "L’équivalence masse-énergie d’Einstein : E = mc²."
	},
	{
		id: "p5",
		category: "physics",
		prompt: "Un photon est…",
		choices: [
			"Un quark",
			"Un quantum de lumière",
			"Un ion",
			"Un neutrino"
		],
		answer: 1,
		explain: "Le photon est le quantum du champ électromagnétique."
	},
	{
		id: "p6",
		category: "physics",
		prompt: "La période d’un pendule simple dépend principalement de…",
		choices: [
			"La masse",
			"La longueur",
			"La couleur",
			"La charge"
		],
		answer: 1,
		explain: "T ≈ 2π√(L/g) : la masse n’intervient pas au premier ordre."
	},
	{
		id: "p7",
		category: "physics",
		prompt: "Le son se propage le plus vite dans…",
		choices: [
			"L’air",
			"L’eau",
			"Le vide",
			"L’acier"
		],
		answer: 3,
		explain: "Les solides denses transmettent les ondes mécaniques plus vite."
	},
	{
		id: "p8",
		category: "physics",
		prompt: "Quelle loi relie tension, courant et résistance ?",
		choices: [
			"Faraday",
			"Ohm",
			"Ampère",
			"Coulomb"
		],
		answer: 1,
		explain: "U = RI, la loi d’Ohm."
	},
	{
		id: "c1",
		category: "chemistry",
		prompt: "Quel est le numéro atomique du carbone ?",
		choices: [
			"6",
			"8",
			"12",
			"14"
		],
		answer: 0,
		explain: "Le carbone a 6 protons ; 12 est sa masse atomique moyenne."
	},
	{
		id: "c2",
		category: "chemistry",
		prompt: "H₂O est une molécule…",
		choices: [
			"Ionique",
			"Polaires covalente",
			"Métallique",
			"Apolaire"
		],
		answer: 1,
		explain: "Les liaisons O–H sont covalentes polaires ; l’eau est polaire."
	},
	{
		id: "c3",
		category: "chemistry",
		prompt: "Le pH d’une solution acide est…",
		choices: [
			"Égal à 7",
			"Supérieur à 7",
			"Inférieur à 7",
			"Toujours 0"
		],
		answer: 2,
		explain: "pH < 7 : acide ; pH = 7 : neutre ; pH > 7 : basique."
	},
	{
		id: "c4",
		category: "chemistry",
		prompt: "NaCl est un exemple de…",
		choices: [
			"Gaz noble",
			"Sel ionique",
			"Polymère",
			"Acide fort"
		],
		answer: 1,
		explain: "Le chlorure de sodium est un cristal ionique Na⁺ Cl⁻."
	},
	{
		id: "c5",
		category: "chemistry",
		prompt: "Combien d’électrons de valence a l’oxygène ?",
		choices: [
			"2",
			"4",
			"6",
			"8"
		],
		answer: 2,
		explain: "Configuration 2s² 2p⁴ : six électrons de valence."
	},
	{
		id: "c6",
		category: "chemistry",
		prompt: "Une réaction d’oxydation implique…",
		choices: [
			"Un gain d’électrons",
			"Une perte d’électrons",
			"Un gain de protons",
			"Une fusion nucléaire"
		],
		answer: 1,
		explain: "Oxydation = perte d’électrons ; réduction = gain."
	},
	{
		id: "c7",
		category: "chemistry",
		prompt: "Le gaz le plus abondant dans l’air sec est…",
		choices: [
			"Oxygène",
			"Azote",
			"CO₂",
			"Argon"
		],
		answer: 1,
		explain: "L’azote représente environ 78 % de l’atmosphère."
	},
	{
		id: "c8",
		category: "chemistry",
		prompt: "Un catalyseur…",
		choices: [
			"Est consommé",
			"Abaisse l’énergie d’activation",
			"Change l’équilibre",
			"Augmente ΔH"
		],
		answer: 1,
		explain: "Il accélère la réaction sans être consommé ni déplacer l’équilibre."
	},
	{
		id: "b1",
		category: "biology",
		prompt: "L’unité de base du vivant est…",
		choices: [
			"L’atome",
			"La cellule",
			"L’organe",
			"Le gène"
		],
		answer: 1,
		explain: "Tous les organismes sont constitués d’une ou plusieurs cellules."
	},
	{
		id: "b2",
		category: "biology",
		prompt: "L’ADN se trouve principalement dans…",
		choices: [
			"Le cytoplasme",
			"Le noyau",
			"Le lysosome",
			"La membrane"
		],
		answer: 1,
		explain: "Chez les eucaryotes, l’ADN génomique est nucléaire (et mitochondrial)."
	},
	{
		id: "b3",
		category: "biology",
		prompt: "La photosynthèse produit surtout…",
		choices: [
			"Azote",
			"Glucose et O₂",
			"Protéines",
			"CO₂"
		],
		answer: 1,
		explain: "CO₂ + H₂O + lumière → sucres + O₂."
	},
	{
		id: "b4",
		category: "biology",
		prompt: "Les mitochondries sont le siège de…",
		choices: [
			"La photosynthèse",
			"La respiration cellulaire",
			"La digestion",
			"La mitose"
		],
		answer: 1,
		explain: "Elles produisent l’ATP par phosphorylation oxydative."
	},
	{
		id: "b5",
		category: "biology",
		prompt: "Combien de chromosomes a une cellule humaine somatique ?",
		choices: [
			"23",
			"46",
			"48",
			"92"
		],
		answer: 1,
		explain: "23 paires, soit 46 chromosomes."
	},
	{
		id: "b6",
		category: "biology",
		prompt: "Les antibiotiques ciblent principalement…",
		choices: [
			"Les virus",
			"Les bactéries",
			"Les prions",
			"Les champignons"
		],
		answer: 1,
		explain: "Ils n’agissent pas sur les virus, d’où l’inutilité contre un rhume viral."
	},
	{
		id: "b7",
		category: "biology",
		prompt: "L’hémoglobine transporte…",
		choices: [
			"Le glucose",
			"L’oxygène",
			"L’urée",
			"Le calcium"
		],
		answer: 1,
		explain: "Elle lie O₂ dans les globules rouges."
	},
	{
		id: "b8",
		category: "biology",
		prompt: "La méiose produit des cellules…",
		choices: [
			"Diploïdes",
			"Haploïdes",
			"Triploïdes",
			"Anucléées"
		],
		answer: 1,
		explain: "Gamètes à n chromosomes, pour la reproduction sexuée."
	},
	{
		id: "a1",
		category: "astronomy",
		prompt: "Quelle planète est la plus proche du Soleil ?",
		choices: [
			"Vénus",
			"Mercure",
			"Mars",
			"Terre"
		],
		answer: 1,
		explain: "Mercure orbite à ~0,39 ua."
	},
	{
		id: "a2",
		category: "astronomy",
		prompt: "Une année-lumière mesure…",
		choices: [
			"Un temps",
			"Une distance",
			"Une masse",
			"Une énergie"
		],
		answer: 1,
		explain: "Distance parcourue par la lumière en un an (~9,46×10¹⁵ m)."
	},
	{
		id: "a3",
		category: "astronomy",
		prompt: "Le Soleil est principalement composé de…",
		choices: [
			"Fer",
			"Hydrogène",
			"Oxygène",
			"Carbone"
		],
		answer: 1,
		explain: "Environ 75 % d’hydrogène (en masse), puis hélium."
	},
	{
		id: "a4",
		category: "astronomy",
		prompt: "Un trou noir supermassif se trouve au centre de…",
		choices: [
			"La Lune",
			"La Voie lactée",
			"Mars",
			"Un atome"
		],
		answer: 1,
		explain: "Sagittarius A* occupe le centre galactique."
	},
	{
		id: "a5",
		category: "astronomy",
		prompt: "Les saisons terrestres sont dues à…",
		choices: [
			"La distance au Soleil",
			"L’inclinaison de l’axe",
			"Les marées",
			"Les taches solaires"
		],
		answer: 1,
		explain: "L’axe est incliné d’environ 23,5°."
	},
	{
		id: "a6",
		category: "astronomy",
		prompt: "Quelle est la plus grande planète du système solaire ?",
		choices: [
			"Saturne",
			"Jupiter",
			"Neptune",
			"Uranus"
		],
		answer: 1,
		explain: "Jupiter contient plus de masse que toutes les autres planètes réunies."
	},
	{
		id: "a7",
		category: "astronomy",
		prompt: "Une supernova est…",
		choices: [
			"Une collision de comètes",
			"L’explosion d’une étoile massive",
			"Un eclipse",
			"Un pulsar lent"
		],
		answer: 1,
		explain: "Fin de vie d’une étoile massive, ou explosion thermonucléaire d’une naine blanche."
	},
	{
		id: "a8",
		category: "astronomy",
		prompt: "La Lune provoque les marées surtout par…",
		choices: [
			"Sa lumière",
			"Sa gravité",
			"Son magnétisme",
			"Son vent"
		],
		answer: 1,
		explain: "Le gradient gravitationnel lunaire déforme les océans."
	},
	{
		id: "e1",
		category: "earth",
		prompt: "La couche la plus externe de la Terre solide est…",
		choices: [
			"Le manteau",
			"La croûte",
			"Le noyau",
			"La mésosphère"
		],
		answer: 1,
		explain: "La croûte (continentale ou océanique) surmonte le manteau."
	},
	{
		id: "e2",
		category: "earth",
		prompt: "Le gaz à effet de serre le plus discuté est…",
		choices: [
			"O₂",
			"N₂",
			"CO₂",
			"Ar"
		],
		answer: 2,
		explain: "Le CO₂ d’origine humaine est le principal levier climatique actuel."
	},
	{
		id: "e3",
		category: "earth",
		prompt: "L’échelle de Richter mesure…",
		choices: [
			"Le vent",
			"Les séismes",
			"La pluie",
			"Les marées"
		],
		answer: 1,
		explain: "Elle estime la magnitude d’un tremblement de terre (aujourd’hui : magnitude moment)."
	},
	{
		id: "e4",
		category: "earth",
		prompt: "Le cycle de l’eau commence surtout par…",
		choices: [
			"La condensation",
			"L’évaporation",
			"L’infiltration",
			"Le ruissellement"
		],
		answer: 1,
		explain: "L’énergie solaire évapore l’eau des océans et des sols."
	},
	{
		id: "e5",
		category: "earth",
		prompt: "Les plaques tectoniques flottent sur…",
		choices: [
			"Le noyau",
			"L’asthénosphère",
			"L’atmosphère",
			"La cryosphère"
		],
		answer: 1,
		explain: "La lithosphère se déplace sur l’asthénosphère visqueuse."
	},
	{
		id: "e6",
		category: "earth",
		prompt: "L’ozone stratosphérique protège de…",
		choices: [
			"Les IR",
			"Les UV",
			"Les micro-ondes",
			"Les rayons X solaires"
		],
		answer: 1,
		explain: "O₃ absorbe une grande partie du rayonnement ultraviolet."
	},
	{
		id: "e7",
		category: "earth",
		prompt: "Un fossile se forme le plus souvent dans…",
		choices: [
			"Le granite",
			"Les roches sédimentaires",
			"Le basalte",
			"Le magma"
		],
		answer: 1,
		explain: "L’enfouissement dans les sédiments favorise la fossilisation."
	},
	{
		id: "e8",
		category: "earth",
		prompt: "El Niño est un phénomène…",
		choices: [
			"Volcanique",
			"Océan-atmosphère pacifique",
			"Magnétique",
			"Glaciaire uniquement"
		],
		answer: 1,
		explain: "Réchauffement périodique du Pacifique équatorial, avec impacts climatiques globaux."
	}
];
function pickQuestions(category) {
	const copy = [...category === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.category === category)];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy.slice(0, Math.min(8, copy.length));
}
var BEST_KEY = "scientific-quiz-best";
function loadBest() {
	try {
		const raw = localStorage.getItem(BEST_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}
function saveBest(best) {
	localStorage.setItem(BEST_KEY, JSON.stringify(best));
}
function finishIfLast(set, get, answers) {
	const { index, questions, category, best } = get();
	if (index + 1 >= questions.length) {
		const score = answers.filter((a) => a.correct).length;
		const nextBest = { ...best };
		if ((nextBest[category] ?? 0) < score) {
			nextBest[category] = score;
			saveBest(nextBest);
		}
		set({
			screen: "result",
			answers,
			best: nextBest,
			locked: true
		});
		return true;
	}
	return false;
}
var useQuiz = create((set, get) => ({
	screen: "home",
	category: "all",
	questions: [],
	index: 0,
	selected: null,
	locked: false,
	answers: [],
	remaining: 20,
	best: {},
	hydrate: () => set({ best: loadBest() }),
	start: (category) => {
		set({
			screen: "play",
			category,
			questions: pickQuestions(category),
			index: 0,
			selected: null,
			locked: false,
			answers: [],
			remaining: 20,
			best: loadBest()
		});
	},
	select: (choice) => {
		const { locked, questions, index, answers } = get();
		if (locked) return;
		const q = questions[index];
		set({
			selected: choice,
			locked: true,
			answers: [...answers, {
				questionId: q.id,
				choice,
				correct: choice === q.answer
			}]
		});
	},
	next: () => {
		const state = get();
		let answers = state.answers;
		if (!state.locked) {
			const q = state.questions[state.index];
			answers = [...answers, {
				questionId: q.id,
				choice: null,
				correct: false
			}];
		}
		if (finishIfLast(set, get, answers)) return;
		set({
			answers,
			index: state.index + 1,
			selected: null,
			locked: false,
			remaining: 20
		});
	},
	home: () => set({
		screen: "home",
		questions: [],
		answers: [],
		index: 0,
		selected: null,
		locked: false
	}),
	tick: () => {
		const { screen, locked, remaining } = get();
		if (screen !== "play" || locked) return;
		if (remaining <= 1) {
			get().next();
			return;
		}
		set({ remaining: remaining - 1 });
	}
}));
function scoreOf(answers) {
	return answers.filter((a) => a.correct).length;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "border-transparent bg-secondary text-secondary-foreground",
		outline: "border-border text-muted-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-muted",
			ghost: "text-foreground hover:bg-muted",
			outline: "border border-border bg-transparent text-foreground hover:bg-muted"
		},
		size: {
			default: "h-11 px-5",
			lg: "h-12 px-6 text-base",
			sm: "h-9 px-3",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-[var(--radius-xl)] border border-border bg-card text-card-foreground", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5", className),
		...props
	});
}
var ICONS = {
	atom: Atom,
	flask: FlaskConical,
	leaf: Leaf,
	orbit: Orbit,
	globe: Globe
};
function CategoryCard({ cat, best, onPick }) {
	const Icon = ICONS[cat.icon];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onPick,
		className: "group text-left",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "h-full transition-[border-color,background-color] duration-[var(--motion-quick)] hover:border-border-strong hover:bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-secondary text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							strokeWidth: 1.6
						})
					}), best != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						children: [
							"Meilleur ",
							best,
							"/8"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: "Nouveau"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-medium tracking-tight",
					children: cat.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: cat.blurb
				})] })]
			})
		})
	});
}
function HomeScreen() {
	const start = useQuiz((s) => s.start);
	const best = useQuiz((s) => s.best);
	const hydrate = useQuiz((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-10 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
						children: "Laboratoire"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl",
						children: "Quiz scientifique"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-base leading-relaxed text-muted-foreground",
						children: "Huit questions, vingt secondes chacune. Choisis une discipline — ou mélange tout."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				className: "w-full sm:w-auto",
				onClick: () => start("all"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" }),
					"Mixte",
					best.all != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-primary-foreground/70",
						children: [
							"· ",
							best.all,
							"/8"
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
					cat,
					best: best[cat.id],
					onPick: () => start(cat.id)
				}, cat.id))
			})
		]
	});
}
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full bg-primary transition-[transform] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
			style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
		})
	});
}
function PlayScreen() {
	const questions = useQuiz((s) => s.questions);
	const index = useQuiz((s) => s.index);
	const selected = useQuiz((s) => s.selected);
	const locked = useQuiz((s) => s.locked);
	const remaining = useQuiz((s) => s.remaining);
	const category = useQuiz((s) => s.category);
	const select = useQuiz((s) => s.select);
	const next = useQuiz((s) => s.next);
	const tick = useQuiz((s) => s.tick);
	const home = useQuiz((s) => s.home);
	const q = questions[index];
	const catLabel = category === "all" ? CATEGORIES.find((c) => c.id === q.category)?.title : CATEGORIES.find((c) => c.id === category)?.title;
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, [tick, index]);
	if (!q) return null;
	const progress = (index + (locked ? 1 : 0)) / questions.length * 100;
	const last = index + 1 >= questions.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 py-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: home,
					className: "text-sm text-muted-foreground hover:text-foreground",
					children: "Quitter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm tabular-nums text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
						remaining,
						"s"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: progress }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
				children: [
					catLabel,
					" · ",
					index + 1,
					" / ",
					questions.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-[1.75rem]",
				children: q.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 flex flex-col gap-2.5",
				children: q.choices.map((choice, i) => {
					const isSel = selected === i;
					const isAns = i === q.answer;
					const show = locked;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: locked,
						onClick: () => select(i),
						className: cn("flex min-h-12 w-full items-center rounded-[var(--radius-md)] border px-4 py-3 text-left text-[0.95rem] leading-snug transition-[background-color,border-color,color] duration-[var(--motion-quick)]", !show && "border-border bg-card text-foreground hover:border-border-strong hover:bg-muted", show && isAns && "border-success/40 bg-success-soft text-foreground", show && isSel && !isAns && "border-danger/40 bg-danger-soft text-foreground", show && !isSel && !isAns && "border-border bg-card text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-3 font-mono text-xs text-muted-foreground",
							children: String.fromCharCode(65 + i)
						}), choice]
					}) }, choice);
				})
			}),
			locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm leading-relaxed text-muted-foreground",
				children: q.explain
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full",
					size: "lg",
					onClick: next,
					disabled: !locked,
					children: [last ? "Voir le résultat" : "Question suivante", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})
		]
	});
}
function ResultScreen() {
	const answers = useQuiz((s) => s.answers);
	const questions = useQuiz((s) => s.questions);
	const category = useQuiz((s) => s.category);
	const best = useQuiz((s) => s.best);
	const start = useQuiz((s) => s.start);
	const home = useQuiz((s) => s.home);
	const score = scoreOf(answers);
	const total = questions.length;
	const ratio = total ? score / total : 0;
	const title = ratio === 1 ? "Sans faute" : ratio >= .75 ? "Très solide" : ratio >= .5 ? "Correct" : "À retravailler";
	const catTitle = category === "all" ? "Mixte" : CATEGORIES.find((c) => c.id === category)?.title;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 py-10 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
						children: catTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-medium tracking-[-0.03em]",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-3xl tabular-nums text-foreground",
						children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: ["/", total]
						})]
					}),
					best[category] != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Record : ",
							best[category],
							"/",
							total
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "flex-1",
					size: "lg",
					onClick: () => start(category),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Rejouer"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "flex-1",
					size: "lg",
					variant: "secondary",
					onClick: home,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" }), "Disciplines"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: questions.map((q, i) => {
					const ok = answers[i]?.correct;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-0.5 size-2 shrink-0 rounded-full", ok ? "bg-success" : "bg-danger") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-snug text-foreground",
								children: q.prompt
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted-foreground",
								children: q.choices[q.answer]
							})]
						})]
					}) }) }, q.id);
				})
			})
		]
	});
}
function Home() {
	const screen = useQuiz((s) => s.screen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-foreground",
		children: [
			screen === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {}) : null,
			screen === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayScreen, {}) : null,
			screen === "result" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultScreen, {}) : null
		]
	});
}
//#endregion
export { Home as component };
