import { LayoutGrid, RotateCcw, Share2, Check, X, Flame, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/quiz-data";
import { DIFFICULTIES } from "@/lib/quiz-modes";
import { pointsOf, scoreOf, useQuiz } from "@/lib/quiz-store";
import { cn } from "@/lib/utils";
import { useState, type CSSProperties } from "react";

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

  const ringOffset = 100 - ratio * 100;

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
      /* cancelled */
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
    <div className="quiz-page mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 py-10 sm:py-16">
      <header className="flex flex-col items-center gap-5 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {catTitle}
        </p>

        <div className="relative flex size-28 items-center justify-center">
          <svg
            viewBox="0 0 36 36"
            className="absolute inset-0 size-full -rotate-90"
            aria-hidden
          >
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              className="stroke-muted"
              strokeWidth="2.2"
            />
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              className={cn(
                "quiz-score-ring-circle",
                ratio >= 0.75
                  ? "stroke-success"
                  : ratio >= 0.5
                    ? "stroke-ring"
                    : "stroke-danger",
              )}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="100"
              style={
                {
                  ["--score-offset" as string]: String(ringOffset),
                  strokeDashoffset: ringOffset,
                } as CSSProperties
              }
            />
          </svg>
          <p className="font-mono text-2xl tabular-nums text-foreground">
            {score}
            <span className="text-base text-muted-foreground">/{total}</span>
          </p>
        </div>

        <div>
          <h1 className="font-display text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            {title}
          </h1>
          {isRecord ? (
            <p className="mt-1.5 text-sm font-medium text-success">
              Nouveau record !
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-sm">
            <Trophy className="size-3.5 text-muted-foreground" />
            <span className="font-mono tabular-nums text-foreground">{pts}</span>
            <span className="text-muted-foreground">pts</span>
          </span>
          {maxStreak >= 2 ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-sm">
              <Flame className="size-3.5 text-amber-400" />
              <span className="font-mono tabular-nums">×{maxStreak}</span>
            </span>
          ) : null}
          {record != null ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-sm text-muted-foreground">
              Record{" "}
              <span className="font-mono tabular-nums text-foreground">
                {record}
              </span>
            </span>
          ) : null}
        </div>
      </header>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button
          className="h-11 flex-1"
          size="lg"
          onClick={() =>
            mode === "daily" ? startDaily() : start(category, difficulty)
          }
        >
          <RotateCcw className="size-4" />
          Rejouer
        </Button>
        <Button className="h-11 flex-1" size="lg" variant="secondary" onClick={home}>
          <LayoutGrid className="size-4" />
          Disciplines
        </Button>
        <Button className="h-11 flex-1" size="lg" variant="outline" onClick={share}>
          <Share2 className="size-4" />
          {copied ? "Copié" : "Partager"}
        </Button>
      </div>

      <section className="flex flex-col gap-2" aria-label="Détail des réponses">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Détail
        </p>
        <ul className="flex flex-col gap-2">
          {questions.map((q, i) => {
            const rec = answers[i];
            const ok = rec?.correct;
            const chose =
              rec?.choice != null ? q.choices[rec.choice] : "Sans réponse";
            return (
              <li key={q.id}>
                <Card className="border-border/80">
                  <CardContent className="flex gap-3 p-4">
                    <span
                      className={cn(
                        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                        ok
                          ? "bg-success-soft text-success"
                          : "bg-danger-soft text-danger",
                      )}
                    >
                      {ok ? (
                        <Check className="size-3.5" strokeWidth={2.5} />
                      ) : (
                        <X className="size-3.5" strokeWidth={2.5} />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug text-foreground">
                        <span className="mr-1.5 font-mono text-xs text-muted-foreground">
                          {i + 1}.
                        </span>
                        {q.prompt}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        <span className="text-foreground/75">Bonne réponse : </span>
                        {q.choices[q.answer]}
                      </p>
                      {!ok ? (
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          <span className="text-foreground/75">Ta réponse : </span>
                          {chose}
                        </p>
                      ) : rec?.points ? (
                        <p className="mt-0.5 text-xs tabular-nums text-success/90">
                          +{rec.points} pts
                        </p>
                      ) : null}
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/85">
                        {q.explain}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
