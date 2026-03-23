import { useLanguage } from "../contexts/LanguageContext";
import ExitButton from "./ExitButton";

interface ResultScreenProps {
  imposters: string[];
  votes: Record<string, string>;
  players: string[];
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function ResultScreen({
  imposters,
  votes,
  players,
  onPlayAgain,
  onExit,
}: ResultScreenProps) {
  const { t } = useLanguage();
  const voteCounts = players.reduce(
    (acc, player) => {
      acc[player] = 0;
      return acc;
    },
    {} as Record<string, number>
  );
  Object.values(votes).forEach((votedFor) => {
    if (voteCounts[votedFor] !== undefined) voteCounts[votedFor]++;
  });

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 animate-fade-in">
      <ExitButton onClick={onExit} />
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-neutral-800">
        🎭 {t.result}
      </h2>

      <div className="w-full max-w-sm mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
        <p className="text-sm text-red-600 font-semibold mb-2">
          {imposters.length > 1 ? t.impostersWerePlural : t.impostersWere}
        </p>
        <p className="text-xl font-bold text-red-700">
          {imposters.join(", ")} 😈
        </p>
      </div>

      <div className="w-full max-w-sm mb-8">
        <p className="text-sm text-neutral-600 font-semibold mb-3">{t.votesLabel}</p>
        <ul className="space-y-2">
          {players.map((player) => (
            <li
              key={player}
              className="flex justify-between items-center px-4 py-2 bg-neutral-100 rounded-xl"
            >
              <span className="font-medium text-neutral-800">{player}</span>
              <span className="text-sm text-neutral-600">
                {voteCounts[player] ?? 0} {t.vote} • {votes[player] ? `→ ${votes[player]}` : "-"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onPlayAgain}
        className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xl font-bold rounded-2xl shadow-lg hover:opacity-95 transition-opacity active:scale-95"
      >
        {t.playAgain}
      </button>
    </div>
  );
}
