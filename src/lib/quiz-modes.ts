import { EXTRA_QUESTIONS } from "./quiz-extra";
import {
  type CategoryId,
  type Question,
  QUESTIONS,
} from "./quiz-data";

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: {
  id: Difficulty;
  title: string;
  blurb: string;
  seconds: number;
  length: number;
}[] = [
  {
    id: "easy",
    title: "Facile",
    blurb: "25 s · 8 questions · pool accessible",
    seconds: 25,
    length: 8,
  },
  {
    id: "medium",
    title: "Moyen",
    blurb: "20 s · 10 questions · mix complet",
    seconds: 20,
    length: 10,
  },
  {
    id: "hard",
    title: "Difficile",
    blurb: "12 s · 12 questions · pool exigeant",
    seconds: 12,
    length: 12,
  },
];

export const QUIZ_LENGTH = 10;
export const SECONDS_PER_QUESTION = 20;

export function difficultyConfig(d: Difficulty) {
  return DIFFICULTIES.find((x) => x.id === d)!;
}

export function questionDifficulty(q: Question): Difficulty {
  let h = 0;
  for (let i = 0; i < q.id.length; i++) {
    h = (h * 31 + q.id.charCodeAt(i)) >>> 0;
  }
  const r = h % 3;
  return r === 0 ? "easy" : r === 1 ? "medium" : "hard";
}

export function mulberry32(seed: number) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dateSeed(isoDate: string): number {
  let h = 2166136261;
  for (let i = 0; i < isoDate.length; i++) {
    h ^= isoDate.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function allQuestions(): Question[] {
  return [...QUESTIONS, ...EXTRA_QUESTIONS];
}

function filterPool(
  category: CategoryId | "all",
  difficulty: Difficulty,
): Question[] {
  let pool = allQuestions();
  if (category !== "all") {
    pool = pool.filter((q) => q.category === category);
  }
  if (difficulty === "easy") {
    pool = pool.filter((q) => {
      const d = questionDifficulty(q);
      return d === "easy" || d === "medium";
    });
  } else if (difficulty === "hard") {
    pool = pool.filter((q) => {
      const d = questionDifficulty(q);
      return d === "medium" || d === "hard";
    });
  }
  return pool;
}

function shuffleWith<T>(arr: T[], rand: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export type PickOptions = {
  category: CategoryId | "all";
  difficulty?: Difficulty;
  seed?: number;
  length?: number;
};

export function pickQuestions(
  categoryOrOpts: CategoryId | "all" | PickOptions,
  maybeDifficulty?: Difficulty,
): Question[] {
  const opts: PickOptions =
    typeof categoryOrOpts === "object"
      ? categoryOrOpts
      : {
          category: categoryOrOpts,
          difficulty: maybeDifficulty ?? "medium",
        };

  const difficulty = opts.difficulty ?? "medium";
  const cfg = difficultyConfig(difficulty);
  const length = opts.length ?? cfg.length;
  const pool = filterPool(opts.category, difficulty);
  const rand = opts.seed != null ? mulberry32(opts.seed) : Math.random;
  const shuffled = shuffleWith(pool, rand);
  return shuffled.slice(0, Math.min(length, shuffled.length));
}

export function pickDailyQuestions(date = todayKey()): Question[] {
  const seed = dateSeed(`daily-v1-${date}`);
  return pickQuestions({
    category: "all",
    difficulty: "medium",
    seed,
    length: 10,
  });
}
