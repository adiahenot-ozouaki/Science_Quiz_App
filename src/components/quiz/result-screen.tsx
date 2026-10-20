import { LayoutGrid, RotateCcw, Share2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/quiz-data";
import { DIFFICULTIES } from "@/lib/quiz-modes";
import { pointsOf, scoreOf, useQuiz } from "@/lib/quiz-store";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ResultScreen() {
  const answers = useQuiz((s) => s.answers);
  const questions = useQuiz((s) => s.questions);
  const category = useQuiz((s) => s.category);
  const best = useQuiz((s) => s.best);
  const maxStreak = useQuiz((s) => s.maxStreak);
  const mode = useQuiz((s) => s.mode);
  const difficulty = useQuiz((s) => s.difficulty);
  const dailyKey = useQuiz((s) => s.dailyKey);
  const start = useQuiz((s) => s.start);
  const startDaily = useQuiz((s) => s.startDaily);
  const home = useQuiz((s) => s.home);
  const [copied, setCopied] = useState(false);

  const score = scoreOf(answers);
  const total = questions.length;
  const pts = pointsOf(answers);
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
    mode === "daily"
      ? `Défi du jour${dailyKey ? ` · ${dailyKey}` : ""}`
      : category === "all"
        ? `Mixte · ${DIFFICULTIES.find((d) => d.id === difficulty)?.title ?? ""}`
        : `${CATEGORIES.find((c) => c.id === category)?.title} · ${
            DIFFICULTIES.find((d) => d.id === difficulty)?.title ?? ""
          }`;

  const recordKey =
    mode === "daily" && dailyKey
      ? `daily:${dailyKey}`
      : `${category}:${difficulty}`;
  const record = best[recordKey];
  const isRecord = record != null && record === pts && pts > 0;

  async function share() {
    const text = `Quiz Scientifique (${catTitle}) : ${score}/${total} · ${pts} pts${
      maxStreak >= 2 ? ` · série ×${maxStreak}` : ""
    }`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Quiz Scientifique", text });
        return;
      }
    } catch {
      /* user cancelled or unsupported */
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

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
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>
            <span className="font-mono tabular-nums text-foreground">{pts}</span>{" "}
            points
          </span>
          {maxStreak >= 2 ? (
            <span>
              Meilleure série{" "}
              <span className="font-mono tabular-nums text-foreground">
                ×{maxStreak}
              </span>
            </span>
          ) : null}
          {record != null ? (
            <span>
              Record{" "}
              <span className="font-mono tabular-nums text-foreground">
                {record}
              </span>{" "}
              pts
              {isRecord ? " · nouveau !" : null}
            </span>
          ) : null}
        </div>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="flex-1"
          size="lg"
          onClick={() =>
            mode === "daily" ? startDaily() : start(category, difficulty)
          }
        >
          <RotateCcw className="size-4" />
          Rejouer
        </Button>
        <Button className="flex-1" size="lg" variant="secondary" onClick={home}>
          <LayoutGrid className="size-4" />
          Disciplines
        </Button>
        <Button className="flex-1" size="lg" variant="outline" onClick={share}>
          <Share2 className="size-4" />
          {copied ? "Copié" : "Partager"}
        </Button>
      </div>

      <ul className="flex flex-col gap-2">
        {questions.map((q, i) => {
          const rec = answers[i];
          const ok = rec?.correct;
          const chose =
            rec?.choice != null ? q.choices[rec.choice] : "Sans réponse";
          return (
            <li key={q.id}>
              <Card>
                <CardContent className="flex gap-3 p-4">
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                      ok ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
                    )}
                  >
                    {ok ? (
                      <Check className="size-3" strokeWidth={2.5} />
                    ) : (
                      <X className="size-3" strokeWidth={2.5} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug text-foreground">
                      {q.prompt}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      <span className="text-foreground/80">Bonne réponse : </span>
                      {q.choices[q.answer]}
                    </p>
                    {!ok ? (
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        <span className="text-foreground/80">Ta réponse : </span>
                        {chose}
                      </p>
                    ) : rec?.points ? (
                      <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                        +{rec.points} pts
                      </p>
                    ) : null}
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/90">
                      {q.explain}
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
