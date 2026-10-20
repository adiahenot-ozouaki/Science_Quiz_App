import { useEffect, useState } from "react";
import { ArrowRight, Check, Clock, Flame, Trophy, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CATEGORIES } from "@/lib/quiz-data";
import { DIFFICULTIES } from "@/lib/quiz-modes";
import { pointsOf, useQuiz } from "@/lib/quiz-store";
import { isMuted, loadMute, setMuted, unlockAudio } from "@/lib/quiz-sounds";
import { cn } from "@/lib/utils";

export function PlayScreen() {
  const questions = useQuiz((s) => s.questions);
  const index = useQuiz((s) => s.index);
  const selected = useQuiz((s) => s.selected);
  const locked = useQuiz((s) => s.locked);
  const remaining = useQuiz((s) => s.remaining);
  const category = useQuiz((s) => s.category);
  const answers = useQuiz((s) => s.answers);
  const streak = useQuiz((s) => s.streak);
  const select = useQuiz((s) => s.select);
  const next = useQuiz((s) => s.next);
  const tick = useQuiz((s) => s.tick);
  const home = useQuiz((s) => s.home);
  const mode = useQuiz((s) => s.mode);
  const difficulty = useQuiz((s) => s.difficulty);
  const secondsPerQuestion = useQuiz((s) => s.secondsPerQuestion);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    setMute(loadMute());
  }, []);

  const q = questions[index];
  const catLabel =
    category === "all"
      ? CATEGORIES.find((c) => c.id === q?.category)?.title
      : CATEGORIES.find((c) => c.id === category)?.title;
  const modeLabel =
    mode === "daily"
      ? "Défi du jour"
      : DIFFICULTIES.find((d) => d.id === difficulty)?.title;
  const livePoints = pointsOf(answers);
  const urgent = remaining <= 5 && !locked;

  useEffect(() => {
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [tick, index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "Escape") {
        home();
        return;
      }
      if (!locked) {
        const map: Record<string, number> = {
          "1": 0,
          "2": 1,
          "3": 2,
          "4": 3,
          a: 0,
          b: 1,
          c: 2,
          d: 3,
          A: 0,
          B: 1,
          C: 2,
          D: 3,
        };
        if (e.key in map) {
          e.preventDefault();
          select(map[e.key]);
          return;
        }
      }
      if (locked && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, select, next, home]);

  if (!q) return null;

  const progress = ((index + (locked ? 1 : 0)) / questions.length) * 100;
  const last = index + 1 >= questions.length;
  const timerRatio = remaining / secondsPerQuestion;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 py-6 sm:py-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={home}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Quitter
          </button>
          <button
            type="button"
            onClick={() => {
              unlockAudio();
              const next = !isMuted();
              setMuted(next);
              setMute(next);
            }}
            className="text-muted-foreground hover:text-foreground"
            aria-label={mute ? "Activer le son" : "Couper le son"}
          >
            {mute ? (
              <VolumeX className="size-3.5" />
            ) : (
              <Volume2 className="size-3.5" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-3 text-sm tabular-nums">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Trophy className="size-3.5" />
            <span
              key={livePoints}
              className={locked ? "quiz-anim-points tabular-nums" : "tabular-nums"}
            >
              {livePoints}
            </span>
          </span>
          {streak >= 2 ? (
            <span className="inline-flex items-center gap-1 text-foreground">
              <Flame className="size-3.5 text-amber-400" />
              ×{streak}
            </span>
          ) : null}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 font-medium",
              urgent ? "text-danger" : "text-muted-foreground",
            )}
          >
            <Clock className={cn("size-3.5", urgent && "animate-pulse")} />
            {remaining}s
          </span>
        </div>
      </div>

      <div className="relative">
        <Progress value={progress} />
        <div
          className={cn(
            "mt-1.5 h-1 overflow-hidden rounded-full bg-muted",
            urgent && "ring-1 ring-danger/40",
          )}
          aria-hidden
        >
          <div
            className={cn(
              "h-full origin-left rounded-full transition-[width,background-color] duration-1000 ease-linear",
              urgent ? "bg-danger" : "bg-ring/70",
            )}
            style={{ width: `${timerRatio * 100}%` }}
          />
        </div>
      </div>

      <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {modeLabel} · {catLabel} · {index + 1} / {questions.length}
      </p>

      <h2 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-[1.75rem]">
        {q.prompt}
      </h2>

      <ul className="mt-8 flex flex-col gap-2.5">
        {q.choices.map((choice, i) => {
          const isSel = selected === i;
          const isAns = i === q.answer;
          const show = locked;
          const isCorrectPick = show && isAns;
          const isWrongPick = show && isSel && !isAns;
          return (
            <li key={`${q.id}-${i}`}>
              <button
                type="button"
                disabled={locked}
                onClick={() => select(i)}
                className={cn(
                  "relative flex min-h-12 w-full items-center rounded-[var(--radius-md)] border px-4 py-3 text-left text-[0.95rem] leading-snug transition-[background-color,border-color,color,transform] duration-[var(--motion-quick)]",
                  !show &&
                    "border-border bg-card text-foreground hover:border-border-strong hover:bg-muted active:scale-[0.99]",
                  isCorrectPick &&
                    "quiz-anim-correct border-success/40 bg-success-soft text-foreground",
                  isWrongPick &&
                    "quiz-anim-wrong border-danger/40 bg-danger-soft text-foreground",
                  show &&
                    isAns &&
                    !isSel &&
                    "quiz-anim-answer-reveal border-success/40 bg-success-soft text-foreground",
                  show &&
                    !isSel &&
                    !isAns &&
                    "border-border bg-card text-muted-foreground opacity-60",
                )}
              >
                <span className="mr-3 font-mono text-xs text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{choice}</span>
                {isCorrectPick ? (
                  <span className="quiz-anim-icon ml-2 text-success">
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                ) : null}
                {isWrongPick ? (
                  <span className="quiz-anim-icon ml-2 text-danger">
                    <X className="size-4" strokeWidth={2.5} />
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      {locked ? (
        <div
          key={`fb-${q.id}-${selected}`}
          className={cn(
            "quiz-anim-feedback mt-5 rounded-[var(--radius-md)] border px-4 py-3 text-sm leading-relaxed",
            selected === q.answer
              ? "border-success/30 bg-success-soft text-foreground"
              : "border-danger/25 bg-danger-soft text-foreground",
          )}
        >
          {selected === q.answer ? (
            <p className="mb-1 flex items-center gap-2 font-medium text-foreground">
              <span className="quiz-anim-icon text-success">
                <Check className="size-4" strokeWidth={2.5} />
              </span>
              Correct
              {answers[answers.length - 1]?.points ? (
                <span className="quiz-anim-points font-mono text-success">
                  +{answers[answers.length - 1].points} pts
                </span>
              ) : null}
            </p>
          ) : (
            <p className="mb-1 flex items-center gap-2 font-medium text-foreground">
              <span className="quiz-anim-icon text-danger">
                <X className="size-4" strokeWidth={2.5} />
              </span>
              {selected == null ? "Temps écoulé" : "Incorrect"}
            </p>
          )}
          <p className="text-muted-foreground">{q.explain}</p>
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">
          Raccourcis : A–D ou 1–4 · Entrée pour continuer
        </p>
      )}

      <div className="mt-auto pt-8">
        <Button className="w-full" size="lg" onClick={next} disabled={!locked}>
          {last ? "Voir le résultat" : "Question suivante"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
