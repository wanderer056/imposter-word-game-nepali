import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import type { GameOptions } from "../types/game";
import ExitButton from "./ExitButton";

interface SetupScreenProps {
  initialPlayers: string[];
  initialGameOptions: GameOptions;
  initialNumImposters: number;
  onStartGame: (
    players: string[],
    numImposters: number,
    options: GameOptions
  ) => void;
  onClearAll: () => void;
}

export default function SetupScreen({
  initialPlayers,
  initialGameOptions,
  initialNumImposters,
  onStartGame,
  onClearAll,
}: SetupScreenProps) {
  const { t } = useLanguage();
  const [players, setPlayers] = useState<string[]>(initialPlayers);
  const [playerInput, setPlayerInput] = useState("");
  const [numImposters, setNumImposters] = useState(initialNumImposters);
  const [showCategoryToImposter, setShowCategoryToImposter] = useState(
    initialGameOptions.showCategoryToImposter
  );
  const [showHintToImposter, setShowHintToImposter] = useState(
    initialGameOptions.showHintToImposter
  );

  useEffect(() => {
    setPlayers(initialPlayers);
  }, [initialPlayers]);

  useEffect(() => {
    setNumImposters(initialNumImposters);
    setShowCategoryToImposter(initialGameOptions.showCategoryToImposter);
    setShowHintToImposter(initialGameOptions.showHintToImposter);
  }, [initialNumImposters, initialGameOptions]);

  const addPlayer = useCallback(() => {
    const name = playerInput.trim();
    if (!name || players.includes(name)) return;
    if (players.length >= 10) return;
    setPlayers((prev) => [...prev, name]);
    setPlayerInput("");
  }, [playerInput, players]);

  const removePlayer = useCallback((name: string) => {
    setPlayers((prev) => prev.filter((p) => p !== name));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addPlayer();
    },
    [addPlayer]
  );

  const handleStartGame = useCallback(() => {
    if (players.length >= 2) {
      const maxImposters = Math.min(numImposters, players.length - 1);
      onStartGame(players, maxImposters, {
        showCategoryToImposter,
        showHintToImposter,
      });
    }
  }, [
    players,
    numImposters,
    showCategoryToImposter,
    showHintToImposter,
    onStartGame,
  ]);

  const maxImposters = Math.max(1, players.length - 1);

  useEffect(() => {
    if (numImposters > maxImposters) {
      setNumImposters(maxImposters);
    }
  }, [maxImposters, numImposters]);

  const canStart = players.length >= 2;

  const handleClearAll = useCallback(() => {
    setPlayers([]);
    onClearAll();
  }, [onClearAll]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 animate-fade-in">
      {players.length > 0 && (
        <ExitButton
          variant="clear"
          fixed={true}
          onClick={handleClearAll}
        />
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-neutral-800">
        🎭 {t.gameTitle}
      </h1>
      <p className="text-neutral-600 text-sm mb-6 text-center">
        {t.setupSubtitle}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={playerInput}
            onChange={(e) => setPlayerInput(e.target.value)}
            placeholder={t.addPlayerPlaceholder}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-neutral-200 text-lg focus:border-violet-500 focus:outline-none transition-colors"
            maxLength={20}
            autoComplete="off"
          />
          <button
            type="submit"
            onClick={addPlayer}
            disabled={!playerInput.trim() || players.length >= 10}
            className="px-5 py-3 bg-violet-600 text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors active:scale-95"
          >
            {t.addButton}
          </button>
        </div>
      </form>

      <div className="w-full max-w-sm mb-6">
        <p className="text-sm text-neutral-600 mb-2">
          {t.playersLabel} ({players.length}/10)
        </p>
        <ul className="space-y-2">
          {players.map((player) => (
            <li
              key={player}
              className="flex items-center justify-between px-4 py-3 bg-neutral-100 rounded-xl animate-scale-in"
            >
              <span className="font-medium text-neutral-800">{player}</span>
              <button
                type="button"
                onClick={() => removePlayer(player)}
                className="text-red-500 hover:text-red-700 text-lg px-2 py-1 -mr-2"
                aria-label={`Remove ${player}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-sm mb-6">
        <label className="block text-sm text-neutral-600 mb-2">
          {t.imposterCountLabel} (1–{maxImposters})
        </label>
        <input
          type="range"
          min={1}
          max={maxImposters}
          value={numImposters}
          onChange={(e) => setNumImposters(Number(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none bg-neutral-200 accent-violet-600"
        />
        <p className="text-center text-xl font-bold text-violet-600 mt-1">
          {numImposters} {numImposters > 1 ? t.imposters : t.imposter}
        </p>
      </div>

      <div className="w-full max-w-sm mb-6">
        <p className="text-sm font-semibold text-neutral-700 mb-3">
          {t.gameOptions}
        </p>
        <div className="space-y-3">
          <label
            className="flex items-center justify-between gap-3 p-3 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors"
            onClick={() => setShowCategoryToImposter((v) => !v)}
          >
            <span className="text-sm text-neutral-700">
              {t.showCategoryToImposter}
            </span>
            <span
              role="switch"
              aria-checked={showCategoryToImposter}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 block ${
                showCategoryToImposter ? "bg-violet-500" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${
                  showCategoryToImposter ? "left-6" : "left-1"
                }`}
              />
            </span>
          </label>
          <label
            className="flex items-center justify-between gap-3 p-3 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors"
            onClick={() => setShowHintToImposter((v) => !v)}
          >
            <span className="text-sm text-neutral-700">
              {t.showHintToImposter}
            </span>
            <span
              role="switch"
              aria-checked={showHintToImposter}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 block ${
                showHintToImposter ? "bg-violet-500" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${
                  showHintToImposter ? "left-6" : "left-1"
                }`}
              />
            </span>
          </label>
        </div>
      </div>

      <button
        onClick={handleStartGame}
        disabled={!canStart}
        className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xl font-bold rounded-2xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-opacity active:scale-95"
      >
        🎮 {t.startGame}
      </button>

      {!canStart && (
        <p className="mt-4 text-sm text-amber-600">
          {t.addMinPlayers}
        </p>
      )}
    </div>
  );
}
