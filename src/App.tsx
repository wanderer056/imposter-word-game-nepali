import { useState, useCallback } from "react";
import { getRandomWord, pickRandomImposters } from "./utils/game";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import type { GameOptions } from "./types/game";
import SetupScreen from "./components/SetupScreen";
import RevealScreen from "./components/RevealScreen";
import DiscussionScreen from "./components/DiscussionScreen";
import VotingScreen from "./components/VotingScreen";
import ResultScreen from "./components/ResultScreen";
import LanguageToggle from "./components/LanguageToggle";

type GamePhase =
  | "setup"
  | "reveal"
  | "discussion"
  | "voting"
  | "result";

function AppContent() {
  const { t, language } = useLanguage();
  const [phase, setPhase] = useState<GamePhase>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [lastGameOptions, setLastGameOptions] = useState<GameOptions>({
    showCategoryToImposter: true,
    showHintToImposter: true,
  });
  const [lastNumImposters, setLastNumImposters] = useState(1);
  const [wordEntry, setWordEntry] = useState<ReturnType<typeof getRandomWord> | null>(null);
  const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);
  const [imposters, setImposters] = useState<string[]>([]);
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
  const [hasViewed, setHasViewed] = useState<Set<string>>(new Set());
  const [votes, setVotes] = useState<Record<string, string>>({});

  const startGame = useCallback(
    (
      newPlayers: string[],
      newNumImposters: number,
      options: GameOptions
    ) => {
      const entry = getRandomWord();
      const selectedImposters = pickRandomImposters(
        newPlayers,
        newNumImposters
      );

      setPlayers(newPlayers);
      setWordEntry(entry);
      setGameOptions(options);
      setLastGameOptions(options);
      setLastNumImposters(newNumImposters);
      setImposters(selectedImposters);
      setCurrentRevealIndex(0);
      setHasViewed(new Set());
      setVotes({});
      setPhase("reveal");
    },
    []
  );

  const currentPlayer = players[currentRevealIndex];
  const isImposter = currentPlayer ? imposters.includes(currentPlayer) : false;

  const buildImposterContent = useCallback(() => {
    if (!wordEntry || !gameOptions) return t.imposterMessage;
    const parts: string[] = [t.imposterMessage];
    if (gameOptions.showCategoryToImposter) {
      const category =
        language === "ne" ? wordEntry.categoryNe : wordEntry.categoryEn;
      parts.push(`${t.categoryLabel} ${category}`);
    }
    if (gameOptions.showHintToImposter) {
      const hint = language === "ne" ? wordEntry.hintNe : wordEntry.hintEn;
      parts.push(`${t.hintLabel} ${hint}`);
    }
    return parts.join("\n");
  }, [wordEntry, gameOptions, t, language]);

  const playerContent = currentPlayer
    ? isImposter
      ? buildImposterContent()
      : wordEntry
        ? language === "ne"
          ? wordEntry.wordNe
          : wordEntry.wordEn
        : ""
    : "";

  const markViewed = useCallback(() => {
    if (currentPlayer) {
      setHasViewed((prev) => new Set(prev).add(currentPlayer));
    }
  }, [currentPlayer]);

  const nextReveal = useCallback(() => {
    if (currentRevealIndex < players.length - 1) {
      setCurrentRevealIndex((i) => i + 1);
    } else {
      setPhase("discussion");
    }
  }, [currentRevealIndex, players.length]);

  const finishDiscussion = useCallback(() => {
    setPhase("voting");
  }, []);

  const revealResult = useCallback((finalVotes: Record<string, string>) => {
    setVotes(finalVotes);
    setPhase("result");
  }, []);

  const playAgain = useCallback(() => {
    setPhase("setup");
    // Keep players for next game
  }, []);

  const exitGame = useCallback(() => {
    setPhase("setup");
    setWordEntry(null);
    setGameOptions(null);
    setImposters([]);
    setCurrentRevealIndex(0);
    setHasViewed(new Set());
    setVotes({});
    // Keep players when exiting during game
  }, []);

  const clearPlayers = useCallback(() => {
    setPlayers([]);
    setLastNumImposters(1);
  }, []);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-violet-50 to-white">
      <LanguageToggle />
      {phase === "setup" && (
        <SetupScreen
          initialPlayers={players}
          initialGameOptions={lastGameOptions}
          initialNumImposters={lastNumImposters}
          onStartGame={startGame}
          onClearAll={clearPlayers}
        />
      )}

      {phase === "reveal" && currentPlayer && (
        <RevealScreen
          playerName={currentPlayer}
          content={playerContent}
          isImposter={isImposter}
          hasViewed={hasViewed.has(currentPlayer)}
          onMarkViewed={markViewed}
          onNext={nextReveal}
          onExit={exitGame}
        />
      )}

      {phase === "discussion" && (
        <DiscussionScreen
          onComplete={finishDiscussion}
          onExit={exitGame}
        />
      )}

      {phase === "voting" && (
        <VotingScreen
          players={players}
          onRevealResult={revealResult}
          onExit={exitGame}
        />
      )}

      {phase === "result" && (
        <ResultScreen
          imposters={imposters}
          votes={votes}
          players={players}
          onPlayAgain={playAgain}
          onExit={exitGame}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
