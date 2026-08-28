import { Atom, FlaskConical, Leaf, Orbit, Globe, Shuffle } from "lucide-react";
import { CATEGORIES, type Category } from "@/lib/quiz-data";
import { useQuiz } from "@/lib/quiz-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

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
      className="group text-left"
    >
      <Card className="h-full transition-[border-color,background-color] duration-[var(--motion-quick)] hover:border-border-strong hover:bg-muted">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-secondary text-foreground">
              <Icon className="size-4" strokeWidth={1.6} />
            </span>
            {best != null ? (
              <Badge variant="outline">Meilleur {best}/8</Badge>
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
  const best = useQuiz((s) => s.best);
  const hydrate = useQuiz((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-10 sm:py-16">
      <header className="flex flex-col gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Laboratoire
        </p>
        <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl">
          Quiz scientifique
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Huit questions, vingt secondes chacune. Choisis une discipline — ou
          mélange tout.
        </p>
      </header>

      <Button size="lg" className="w-full sm:w-auto" onClick={() => start("all")}>
        <Shuffle className="size-4" />
        Mixte
        {best.all != null ? (
          <span className="text-primary-foreground/70">· {best.all}/8</span>
        ) : null}
      </Button>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            best={best[cat.id]}
            onPick={() => start(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}
