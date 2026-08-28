import { useEffect } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CATEGORIES } from "@/lib/quiz-data";
import { useQuiz } from "@/lib/quiz-store";
import { cn } from "@/lib/utils";

export function PlayScreen() {
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
  const catLabel =
    category === "all"
      ? CATEGORIES.find((c) => c.id === q.category)?.title
      : CATEGORIES.find((c) => c.id === category)?.title;

  useEffect(() => {
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [tick, index]);

  if (!q) return null;

  const progress = ((index + (locked ? 1 : 0)) / questions.length) * 100;
  const last = index + 1 >= questions.length;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 py-6 sm:py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={home}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Quitter
        </button>
        <div className="flex items-center gap-2 text-sm tabular-nums text-muted-foreground">
          <Clock className="size-3.5" />
          {remaining}s
        </div>
      </div>

      <Progress value={progress} />

      <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {catLabel} · {index + 1} / {questions.length}
      </p>

      <h2 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-[1.75rem]">
        {q.prompt}
      </h2>

      <ul className="mt-8 flex flex-col gap-2.5">
        {q.choices.map((choice, i) => {
          const isSel = selected === i;
          const isAns = i === q.answer;
          const show = locked;
          return (
            <li key={choice}>
              <button
                type="button"
                disabled={locked}
                onClick={() => select(i)}
                className={cn(
                  "flex min-h-12 w-full items-center rounded-[var(--radius-md)] border px-4 py-3 text-left text-[0.95rem] leading-snug transition-[background-color,border-color,color] duration-[var(--motion-quick)]",
                  !show &&
                    "border-border bg-card text-foreground hover:border-border-strong hover:bg-muted",
                  show && isAns && "border-success/40 bg-success-soft text-foreground",
                  show && isSel && !isAns && "border-danger/40 bg-danger-soft text-foreground",
                  show && !isSel && !isAns && "border-border bg-card text-muted-foreground",
                )}
              >
                <span className="mr-3 font-mono text-xs text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
                {choice}
              </button>
            </li>
          );
        })}
      </ul>

      {locked ? (
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {q.explain}
        </p>
      ) : null}

      <div className="mt-auto pt-8">
        <Button
          className="w-full"
          size="lg"
          onClick={next}
          disabled={!locked}
        >
          {last ? "Voir le résultat" : "Question suivante"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
