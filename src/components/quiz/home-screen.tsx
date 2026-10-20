import {
  Atom,
  FlaskConical,
  Leaf,
  Orbit,
  Globe,
  Shuffle,
  Volume2,
  VolumeX,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import { CATEGORIES, type Category } from "@/lib/quiz-data";
import {
  DIFFICULTIES,
  type Difficulty,
  todayKey,
} from "@/lib/quiz-modes";
import {
  bestKeyClassic,
  bestKeyDaily,
  useQuiz,
} from "@/lib/quiz-store";
import { isMuted, loadMute, setMuted, unlockAudio } from "@/lib/quiz-sounds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const ICONS = {
  atom: Atom,
  flask: FlaskConical,
  leaf: Leaf,
  orbit: Orbit,
  globe: Globe,
} as const;

function CategoryCard({
  cat,
  best,
  onPick,
}: {
  cat: Category;
  best?: number;
  onPick: () => void;
}) {
  const Icon = ICONS[cat.icon];
  return (
    <button
      type="button"
      onClick={onPick}
      className="group text-left focus-visible:outline-none"
    >
      <Card className="quiz-card-lift h-full border-border/80 hover:border-border-strong hover:bg-muted/80">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-border bg-secondary text-accent transition-colors group-hover:border-border-strong group-hover:text-foreground">
              <Icon className="size-[1.1rem]" strokeWidth={1.6} />
            </span>
            {best != null ? (
              <Badge variant="outline" className="tabular-nums">
                {best} pts
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                Nouveau
              </Badge>
            )}
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <h2 className="font-display text-lg font-medium tracking-tight">
                {cat.title}
              </h2>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                {cat.blurb}
              </p>
            </div>
            <ChevronRight className="mb-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

export function HomeScreen() {
  const start = useQuiz((s) => s.start);
  const startDaily = useQuiz((s) => s.startDaily);
  const best = useQuiz((s) => s.best);
  const hydrate = useQuiz((s) => s.hydrate);
  const [mute, setMute] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const day = todayKey();
  const dailyBest = best[bestKeyDaily(day)];
  const cfg = DIFFICULTIES.find((d) => d.id === difficulty)!;

  useEffect(() => {
    hydrate();
    setMute(loadMute());
  }, [hydrate]);

  function toggleMute() {
    unlockAudio();
    const next = !isMuted();
    setMuted(next);
    setMute(next);
  }

  return (
    <div className="quiz-page mx-auto flex w-full max-w-3xl flex-col gap-9 px-5 py-10 sm:gap-11 sm:py-16">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Laboratoire
          </p>
          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm transition-colors hover:border-border-strong hover:text-foreground"
            aria-label={mute ? "Activer le son" : "Couper le son"}
          >
            {mute ? (
              <VolumeX className="size-3.5" />
            ) : (
              <Volume2 className="size-3.5" />
            )}
            {mute ? "Muet" : "Son"}
          </button>
        </div>
        <h1 className="font-display text-[2.35rem] font-medium leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl">
          Quiz scientifique
        </h1>
        <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
          Choisis un niveau, une discipline — ou relève le défi du jour,
          identique pour tout le monde.
        </p>
      </header>

      <button
        type="button"
        onClick={startDaily}
        className="group text-left focus-visible:outline-none"
      >
        <Card className="quiz-card-lift overflow-hidden border-border-strong/60 bg-gradient-to-br from-accent-soft/80 via-card to-card">
          <CardContent className="flex items-start gap-4 p-5 sm:p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-border-strong/50 bg-secondary text-foreground">
              <CalendarDays className="size-[1.15rem]" strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-medium tracking-tight sm:text-xl">
                  Défi du jour
                </h2>
                <Badge variant="outline" className="tabular-nums">
                  {day}
                </Badge>
                {dailyBest != null ? (
                  <Badge variant="outline" className="tabular-nums">
                    Record {dailyBest} pts
                  </Badge>
                ) : (
                  <Badge variant="outline">Pas encore joué</Badge>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                Même tirage pour tous · 10 questions · 20 s · niveau moyen
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground/90 transition-transform group-hover:translate-x-0.5">
                Commencer
                <ChevronRight className="size-3.5" />
              </p>
            </div>
          </CardContent>
        </Card>
      </button>

      <section className="flex flex-col gap-3" aria-label="Niveau de difficulté">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Niveau
          </p>
          <p className="text-xs text-muted-foreground">{cfg.blurb}</p>
        </div>
        <div
          className="grid grid-cols-3 gap-1.5 rounded-[var(--radius-lg)] border border-border bg-card/50 p-1.5"
          role="radiogroup"
          aria-label="Choisir le niveau"
        >
          {DIFFICULTIES.map((d) => {
            const active = difficulty === d.id;
            return (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setDifficulty(d.id)}
                className={cn(
                  "rounded-[var(--radius-md)] px-2 py-3 text-center transition-[background-color,color,box-shadow] duration-[var(--motion-quick)]",
                  active
                    ? "bg-muted text-foreground shadow-sm ring-1 ring-border-strong"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="block text-sm font-medium">{d.title}</span>
                <span className="mt-0.5 block text-[0.68rem] tabular-nums opacity-75">
                  {d.seconds}s · {d.length} q.
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <Button
        size="lg"
        className="h-12 w-full gap-2 text-base sm:w-auto sm:min-w-[14rem]"
        onClick={() => start("all", difficulty)}
      >
        <Shuffle className="size-4" />
        Mixte · {cfg.title}
        {best[bestKeyClassic("all", difficulty)] != null ? (
          <span className="ml-0.5 tabular-nums opacity-70">
            · {best[bestKeyClassic("all", difficulty)]} pts
          </span>
        ) : null}
      </Button>

      <section className="flex flex-col gap-3" aria-label="Disciplines">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Disciplines
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              best={best[bestKeyClassic(cat.id, difficulty)]}
              onPick={() => start(cat.id, difficulty)}
            />
          ))}
        </div>
      </section>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        100 pts + 5 × secondes restantes · bonus de série dès 2 bonnes réponses
        d’affilée
      </p>
    </div>
  );
}
