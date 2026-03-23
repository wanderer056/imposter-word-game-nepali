import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import ExitButton from "./ExitButton";

interface VotingScreenProps {
  players: string[];
  onRevealResult: (votes: Record<string, string>) => void;
  onExit: () => void;
}

export default function VotingScreen({
  players,
  onRevealResult,
  onExit,
}: VotingScreenProps) {
  const { t } = useLanguage();
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [currentVoter, setCurrentVoter] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const voterName = players[currentVoter];
  const allVoted = currentVoter >= players.length;

  const handleVote = (votedFor: string) => {
    setSelectedPlayer(votedFor);
  };

  const handleConfirmVote = () => {
    if (!selectedPlayer) return;
    setVotes((prev) => ({
      ...prev,
      [voterName]: selectedPlayer,
    }));
    setSelectedPlayer(null);
    setCurrentVoter((i) => i + 1);
  };

  const handleReveal = () => {
    onRevealResult(votes);
  };

  if (allVoted) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center p-6 animate-fade-in">
        <ExitButton onClick={onExit} />
        <h2 className="text-2xl font-bold text-center mb-4 text-neutral-800">
          ✅ {t.allVoted}
        </h2>
        <p className="text-neutral-600 text-center mb-8">
          {t.clickToSeeResult}
        </p>
        <button
          onClick={handleReveal}
          className="px-8 py-4 bg-violet-600 text-white text-lg font-bold rounded-xl hover:bg-violet-700 transition-colors active:scale-95"
        >
          {t.revealResult}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 animate-fade-in">
      <ExitButton onClick={onExit} />
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-neutral-800">
        🗳️ {t.voting}
      </h2>
      <p className="text-lg text-violet-600 font-semibold mb-6">
        {t.passPhoneFor(voterName)}
      </p>
      <p className="text-sm text-neutral-500 mb-6">
        {t.whoIsImposter}
      </p>

      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-8">
        {players
          .filter((p) => p !== voterName)
          .map((player) => (
            <button
              key={player}
              onClick={() => handleVote(player)}
              className={`py-4 px-4 rounded-xl font-medium transition-all ${
                selectedPlayer === player
                  ? "bg-violet-600 text-white ring-2 ring-violet-400 scale-105"
                  : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              {player}
            </button>
          ))}
      </div>

      <button
        onClick={handleConfirmVote}
        disabled={!selectedPlayer}
        className="w-full max-w-sm py-4 bg-violet-600 text-white text-lg font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors active:scale-95"
      >
        {t.confirm}
      </button>

      <p className="mt-4 text-xs text-neutral-400">
        {t.votesCast(currentVoter, players.length)}
      </p>
    </div>
  );
}
