import { create } from "zustand";
import {
  type CategoryId,
  type Question,
  pickQuestions,
  SECONDS_PER_QUESTION,
} from "./quiz-data";

export type Screen = "home" | "play" | "result";

export type AnswerRecord = {
  questionId: string;
  choice: number | null;
  correct: boolean;
  points: number;
  timeLeft: number;
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
  streak: number;
  maxStreak: number;
  /** Best points per category key */
  best: Record<string, number>;
  hydrate: () => void;
  start: (category: CategoryId | "all") => void;
  select: (choice: number) => void;
  next: () => void;
  home: () => void;
  tick: () => void;
};

const BEST_KEY = "scientific-quiz-best-v2";

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

/** 100 pts for a correct answer + 5 pts per second left; streak ×10 bonus after 2+ */
export function pointsForAnswer(
  correct: boolean,
  timeLeft: number,
  streakAfter: number,
): number {
  if (!correct) return 0;
  const base = 100 + timeLeft * 5;
  const streakBonus = streakAfter >= 2 ? (streakAfter - 1) * 10 : 0;
  return base + streakBonus;
}

function finishIfLast(
  set: (p: Partial<QuizState>) => void,
  get: () => QuizState,
  answers: AnswerRecord[],
  maxStreak: number,
) {
  const { index, questions, category, best } = get();
  if (index + 1 >= questions.length) {
    const pts = answers.reduce((s, a) => s + a.points, 0);
    const nextBest = { ...best };
    if ((nextBest[category] ?? 0) < pts) {
      nextBest[category] = pts;
      saveBest(nextBest);
    }
    set({
      screen: "result",
      answers,
      best: nextBest,
      locked: true,
      maxStreak,
    });
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
  remaining: SECONDS_PER_QUESTION,
  streak: 0,
  maxStreak: 0,
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
      remaining: SECONDS_PER_QUESTION,
      streak: 0,
      maxStreak: 0,
      best: loadBest(),
    });
  },
  select: (choice) => {
    const { locked, questions, index, answers, remaining, streak, maxStreak } =
      get();
    if (locked) return;
    const q = questions[index];
    const correct = choice === q.answer;
    const nextStreak = correct ? streak + 1 : 0;
    const pts = pointsForAnswer(correct, remaining, nextStreak);
    set({
      selected: choice,
      locked: true,
      streak: nextStreak,
      maxStreak: Math.max(maxStreak, nextStreak),
      answers: [
        ...answers,
        {
          questionId: q.id,
          choice,
          correct,
          points: pts,
          timeLeft: remaining,
        },
      ],
    });
  },
  next: () => {
    const state = get();
    let answers = state.answers;
    let maxStreak = state.maxStreak;
    let streak = state.streak;
    if (!state.locked) {
      const q = state.questions[state.index];
      answers = [
        ...answers,
        {
          questionId: q.id,
          choice: null,
          correct: false,
          points: 0,
          timeLeft: 0,
        },
      ];
      streak = 0;
    }
    if (finishIfLast(set, get, answers, maxStreak)) return;
    set({
      answers,
      index: state.index + 1,
      selected: null,
      locked: false,
      remaining: SECONDS_PER_QUESTION,
      streak,
      maxStreak,
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
      streak: 0,
      maxStreak: 0,
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

export function pointsOf(answers: AnswerRecord[]) {
  return answers.reduce((s, a) => s + a.points, 0);
}
