import { create } from "zustand";
import {
  type CategoryId,
  type Question,
  pickQuestions,
} from "./quiz-data";

export type Screen = "home" | "play" | "result";

export type AnswerRecord = {
  questionId: string;
  choice: number | null;
  correct: boolean;
};

type QuizState = {
  screen: Screen;
  category: CategoryId | "all";
  questions: Question[];
  index: number;
  selected: number | null;
  locked: boolean;
  answers: AnswerRecord[];
  remaining: number;
  best: Record<string, number>;
  hydrate: () => void;
  start: (category: CategoryId | "all") => void;
  select: (choice: number) => void;
  next: () => void;
  home: () => void;
  tick: () => void;
};

const BEST_KEY = "scientific-quiz-best";

function loadBest(): Record<string, number> {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function saveBest(best: Record<string, number>) {
  localStorage.setItem(BEST_KEY, JSON.stringify(best));
}

function finishIfLast(
  set: (p: Partial<QuizState>) => void,
  get: () => QuizState,
  answers: AnswerRecord[],
) {
  const { index, questions, category, best } = get();
  if (index + 1 >= questions.length) {
    const score = answers.filter((a) => a.correct).length;
    const nextBest = { ...best };
    if ((nextBest[category] ?? 0) < score) {
      nextBest[category] = score;
      saveBest(nextBest);
    }
    set({ screen: "result", answers, best: nextBest, locked: true });
    return true;
  }
  return false;
}

export const useQuiz = create<QuizState>((set, get) => ({
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
      best: loadBest(),
    });
  },
  select: (choice) => {
    const { locked, questions, index, answers } = get();
    if (locked) return;
    const q = questions[index];
    set({
      selected: choice,
      locked: true,
      answers: [
        ...answers,
        { questionId: q.id, choice, correct: choice === q.answer },
      ],
    });
  },
  next: () => {
    const state = get();
    let answers = state.answers;
    if (!state.locked) {
      const q = state.questions[state.index];
      answers = [
        ...answers,
        { questionId: q.id, choice: null, correct: false },
      ];
    }
    if (finishIfLast(set, get, answers)) return;
    set({
      answers,
      index: state.index + 1,
      selected: null,
      locked: false,
      remaining: 20,
    });
  },
  home: () =>
    set({
      screen: "home",
      questions: [],
      answers: [],
      index: 0,
      selected: null,
      locked: false,
    }),
  tick: () => {
    const { screen, locked, remaining } = get();
    if (screen !== "play" || locked) return;
    if (remaining <= 1) {
      get().next();
      return;
    }
    set({ remaining: remaining - 1 });
  },
}));

export function scoreOf(answers: AnswerRecord[]) {
  return answers.filter((a) => a.correct).length;
}
