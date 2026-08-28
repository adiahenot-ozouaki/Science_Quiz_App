import { RotateCcw, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/quiz-data";
import { scoreOf, useQuiz } from "@/lib/quiz-store";
import { cn } from "@/lib/utils";

export function ResultScreen() {
  const answers = useQuiz((s) => s.answers);
  const questions = useQuiz((s) => s.questions);
  const category = useQuiz((s) => s.category);
  const best = useQuiz((s) => s.best);
  const start = useQuiz((s) => s.start);
  const home = useQuiz((s) => s.home);

  const score = scoreOf(answers);
  const total = questions.length;
  const ratio = total ? score / total : 0;
  const title =
    ratio === 1
      ? "Sans faute"
      : ratio >= 0.75
        ? "Très solide"
        : ratio >= 0.5
          ? "Correct"
          : "À retravailler";

  const catTitle =
    category === "all"
      ? "Mixte"
      : CATEGORIES.find((c) => c.id === category)?.title;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 py-10 sm:py-16">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {catTitle}
        </p>
        <h1 className="font-display text-4xl font-medium tracking-[-0.03em]">
          {title}
        </h1>
        <p className="font-mono text-3xl tabular-nums text-foreground">
          {score}
          <span className="text-muted-foreground">/{total}</span>
        </p>
        {best[category] != null ? (
          <p className="text-sm text-muted-foreground">
            Record : {best[category]}/{total}
          </p>
        ) : null}
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1" size="lg" onClick={() => start(category)}>
          <RotateCcw className="size-4" />
          Rejouer
        </Button>
        <Button className="flex-1" size="lg" variant="secondary" onClick={home}>
          <LayoutGrid className="size-4" />
          Disciplines
        </Button>
      </div>

      <ul className="flex flex-col gap-2">
        {questions.map((q, i) => {
          const rec = answers[i];
          const ok = rec?.correct;
          return (
            <li key={q.id}>
              <Card>
                <CardContent className="flex gap-3 p-4">
                  <span
                    className={cn(
                      "mt-0.5 size-2 shrink-0 rounded-full",
                      ok ? "bg-success" : "bg-danger",
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-snug text-foreground">{q.prompt}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {q.choices[q.answer]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
