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
} from "lucide-react";
import {
  CATEGORIES,
  DIFFICULTIES,
  type Category,
  type Difficulty,
  todayKey,
} from "@/lib/quiz-data";
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
    <button type="button" onClick={onPick} className="group text-left">
      <Card className="h-full transition-[border-color,background-color] duration-[var(--motion-quick)] hover:border-border-strong hover:bg-muted">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-secondary text-foreground">
              <Icon className="size-4" strokeWidth={1.6} />
            </span>
            {best != null ? (
              <Badge variant="outline">{best} pts</Badge>
            ) : (
              <Badge variant="outline">Nouveau</Badge>
            )}
          </div>
          <div>
            <h2 className="font-display text-lg font-medium tracking-tight">
              {cat.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{cat.blurb}</p>
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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-10 sm:py-16">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Laboratoire
          </p>
          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
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
        <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl">
          Quiz scientifique
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Choisis un niveau, une discipline — ou le défi du jour, identique pour
          tout le monde.
        </p>
      </header>

      {/* Défi du jour */}
      <button type="button" onClick={startDaily} className="text-left">
        <Card className="transition-[border-color,background-color] duration-[var(--motion-quick)] hover:border-border-strong hover:bg-muted">
          <CardContent className="flex items-start gap-4 p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-secondary text-foreground">
              <CalendarDays className="size-4" strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-medium tracking-tight">
                  Défi du jour
                </h2>
                <Badge variant="outline">{day}</Badge>
                {dailyBest != null ? (
                  <Badge variant="outline">{dailyBest} pts</Badge>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Même tirage pour tous · 10 questions · 20 s · niveau moyen
              </p>
            </div>
          </CardContent>
        </Card>
      </button>

      {/* Niveau */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Niveau
        </p>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDifficulty(d.id)}
              className={cn(
                "rounded-[var(--radius-md)] border px-3 py-3 text-left transition-[border-color,background-color] duration-[var(--motion-quick)]",
                difficulty === d.id
                  ? "border-border-strong bg-muted text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              <span className="block text-sm font-medium text-foreground">
                {d.title}
              </span>
              <span className="mt-0.5 block text-[0.7rem] leading-snug opacity-80">
                {d.seconds}s · {d.length} q.
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{cfg.blurb}</p>
      </div>

      <Button
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => start("all", difficulty)}
      >
        <Shuffle className="size-4" />
        Mixte · {cfg.title}
        {best[bestKeyClassic("all", difficulty)] != null ? (
          <span className="ml-1 opacity-70">
            · record {best[bestKeyClassic("all", difficulty)]} pts
          </span>
        ) : null}
      </Button>

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

      <p className="text-center text-xs text-muted-foreground">
        100 pts + 5 × secondes restantes · bonus de série dès 2 bonnes réponses
        d’affilée
      </p>
    </div>
  );
}
