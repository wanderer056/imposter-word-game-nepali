import { useState, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import ExitButton from "./ExitButton";

interface RevealScreenProps {
  playerName: string;
  content: string;
  isImposter: boolean;
  hasViewed: boolean;
  onMarkViewed: () => void;
  onNext: () => void;
  onExit: () => void;
}

export default function RevealScreen({
  playerName,
  content,
  isImposter,
  hasViewed,
  onMarkViewed,
  onNext,
  onExit,
}: RevealScreenProps) {
  const { t } = useLanguage();
  const [holding, setHolding] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const handlePointerDown = useCallback(() => {
    if (hasViewed) return;
    setHolding(true);
  }, [hasViewed]);

  const handlePointerUp = useCallback(() => {
    if (holding && !hasViewed) {
      onMarkViewed();
      setHasRevealed(true);
    }
    setHolding(false);
  }, [holding, hasViewed, onMarkViewed]);

  const handlePointerLeave = useCallback(() => {
    if (holding && !hasViewed) {
      onMarkViewed();
      setHasRevealed(true);
    }
    setHolding(false);
  }, [holding, hasViewed, onMarkViewed]);

  const displayContent = hasViewed
    ? t.alreadyViewed
    : holding
      ? content
      : null;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 animate-fade-in">
      <ExitButton onClick={onExit} />
      <p className="text-lg sm:text-xl text-neutral-600 mb-8 text-center">
        {t.passPhoneTo(playerName)}
      </p>

      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerUp}
          onContextMenu={(e) => e.preventDefault()}
          disabled={hasViewed}
          className="w-full py-8 px-6 rounded-2xl font-bold text-xl transition-all duration-200 select-none touch-none
            bg-gradient-to-br from-violet-100 to-fuchsia-100
            border-2 border-violet-200
            disabled:opacity-60 disabled:cursor-not-allowed
            active:scale-[0.98]
            min-h-[140px] flex items-center justify-center"
          style={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
          }}
        >
          {displayContent ? (
            <span
              className={`animate-scale-in whitespace-pre-line text-center ${
                isImposter
                  ? "text-red-600 text-base sm:text-lg"
                  : "text-violet-800 text-2xl sm:text-3xl"
              }`}
            >
              {displayContent}
            </span>
          ) : (
            <span className="text-violet-600">
              {hasViewed ? t.passToNext : t.holdToReveal}
            </span>
          )}
        </button>

        {hasRevealed && (
          <button
            onClick={onNext}
            className="w-full py-4 bg-violet-600 text-white text-lg font-bold rounded-xl animate-fade-in hover:bg-violet-700 transition-colors active:scale-95"
          >
            {t.nextPlayer}
          </button>
        )}
      </div>
    </div>
  );
}
