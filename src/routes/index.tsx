import { createFileRoute } from "@tanstack/react-router";
import { HomeScreen } from "@/components/quiz/home-screen";
import { PlayScreen } from "@/components/quiz/play-screen";
import { ResultScreen } from "@/components/quiz/result-screen";
import { useQuiz } from "@/lib/quiz-store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const screen = useQuiz((s) => s.screen);
  return (
    <main className="min-h-dvh bg-bg text-foreground">
      {screen === "home" ? <HomeScreen /> : null}
      {screen === "play" ? <PlayScreen /> : null}
      {screen === "result" ? <ResultScreen /> : null}
    </main>
  );
}
