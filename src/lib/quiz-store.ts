import { create } from "zustand";
import {
  type CategoryId,
  type Difficulty,
  type Question,
  difficultyConfig,
  pickDailyQuestions,
  pickQuestions,
  todayKey,
} from "./quiz-data";
import {
  playComplete,
  playCorrect,
  playTimeout,
  playUrgentTick,
  playWrong,
  unlockAudio,
} from "./quiz-sounds";

export type Screen = "home" | "play" | "result";
export type PlayMode = "classic" | "daily";

export type AnswerRecord = {
  questionId: string;
  choice: number | null;
  correct: boolean;
  points: number;
  timeLeft: number;
};

type QuizState = {
  screen: Screen;
  mode: PlayMode;
  category: CategoryId | "all";
  difficulty: Difficulty;
  dailyKey: string | null;
  questions: Question[];
  index: number;
  selected: number | null;
  locked: boolean;
  answers: AnswerRecord[];
  remaining: number;
  streak: number;
  maxStreak: number;
  secondsPerQuestion: number;
  /** Best points — clés: category, category:difficulty, daily:YYYY-MM-DD */
  best: Record<string, number>;
  hydrate: () => void;
  start: (category: CategoryId | "all", difficulty?: Difficulty) => void;
  startDaily: () => void;
  select: (choice: number) => void;
  next: () => void;
  home: () => void;
  tick: () => void;
};

const BEST_KEY = "scientific-quiz-best-v3";

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

export function bestKeyClassic(
  category: CategoryId | "all",
  difficulty: Difficulty,
) {
  return `${category}:${difficulty}`;
}

export function bestKeyDaily(date: string) {
  return `daily:${date}`;
}

/** 100 pts + 5 × secondes restantes ; bonus série dès 2+ */
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

function recordKey(get: () => QuizState): string {
  const s = get();
  if (s.mode === "daily" && s.dailyKey) return bestKeyDaily(s.dailyKey);
  return bestKeyClassic(s.category, s.difficulty);
}

function finishIfLast(
  set: (p: Partial<QuizState>) => void,
  get: () => QuizState,
  answers: AnswerRecord[],
  maxStreak: number,
) {
  const { index, questions, best } = get();
  if (index + 1 >= questions.length) {
    const pts = answers.reduce((s, a) => s + a.points, 0);
    const key = recordKey(get);
    const nextBest = { ...best };
    if ((nextBest[key] ?? 0) < pts) {
      nextBest[key] = pts;
      saveBest(nextBest);
    }
    playComplete();
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
  mode: "classic",
  category: "all",
  difficulty: "medium",
  dailyKey: null,
  questions: [],
  index: 0,
  selected: null,
  locked: false,
  answers: [],
  remaining: 20,
  streak: 0,
  maxStreak: 0,
  secondsPerQuestion: 20,
  best: {},
  hydrate: () => set({ best: loadBest() }),
  start: (category, difficulty = "medium") => {
    unlockAudio();
    const cfg = difficultyConfig(difficulty);
    set({
      screen: "play",
      mode: "classic",
      category,
      difficulty,
      dailyKey: null,
      questions: pickQuestions({ category, difficulty }),
      index: 0,
      selected: null,
      locked: false,
      answers: [],
      remaining: cfg.seconds,
      secondsPerQuestion: cfg.seconds,
      streak: 0,
      maxStreak: 0,
      best: loadBest(),
    });
  },
  startDaily: () => {
    unlockAudio();
    const key = todayKey();
    const cfg = difficultyConfig("medium");
    set({
      screen: "play",
      mode: "daily",
      category: "all",
      difficulty: "medium",
      dailyKey: key,
      questions: pickDailyQuestions(key),
      index: 0,
      selected: null,
      locked: false,
      answers: [],
      remaining: cfg.seconds,
      secondsPerQuestion: cfg.seconds,
      streak: 0,
      maxStreak: 0,
      best: loadBest(),
    });
  },
  select: (choice) => {
    const { locked, questions, index, answers, remaining, streak, maxStreak } =
      get();
    if (locked) return;
    unlockAudio();
    const q = questions[index];
    const correct = choice === q.answer;
    const nextStreak = correct ? streak + 1 : 0;
    const pts = pointsForAnswer(correct, remaining, nextStreak);
    if (correct) playCorrect();
    else playWrong();
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
      playTimeout();
    }
    if (finishIfLast(set, get, answers, maxStreak)) return;
    set({
      answers,
      index: state.index + 1,
      selected: null,
      locked: false,
      remaining: state.secondsPerQuestion,
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
      dailyKey: null,
    }),
  tick: () => {
    const { screen, locked, remaining } = get();
    if (screen !== "play" || locked) return;
    if (remaining <= 1) {
      get().next();
      return;
    }
    const nextRemaining = remaining - 1;
    if (nextRemaining <= 3) {
      playUrgentTick();
    }
    set({ remaining: nextRemaining });
  },
}));

export function scoreOf(answers: AnswerRecord[]) {
  return answers.filter((a) => a.correct).length;
}

export function pointsOf(answers: AnswerRecord[]) {
  return answers.reduce((s, a) => s + a.points, 0);
}
