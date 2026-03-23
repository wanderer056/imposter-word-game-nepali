import { useEffect, useState } from "react";
import { DISCUSSION_DURATION_SECONDS } from "../constants";
import { useLanguage } from "../contexts/LanguageContext";
import ExitButton from "./ExitButton";

interface DiscussionScreenProps {
  onComplete: () => void;
  onExit: () => void;
}

export default function DiscussionScreen({
  onComplete,
  onExit,
}: DiscussionScreenProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(DISCUSSION_DURATION_SECONDS);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const progress =
    ((DISCUSSION_DURATION_SECONDS - timeLeft) / DISCUSSION_DURATION_SECONDS) *
    100;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 animate-fade-in">
      <ExitButton onClick={onExit} />
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-neutral-800">
        💬 {t.discussionPhase}
      </h2>
      <p className="text-neutral-600 text-center mb-8">
        {t.discussImposter}
      </p>

      <div className="w-full max-w-xs mb-6">
        <div
          className="h-4 bg-neutral-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={timeLeft}
          aria-valuemin={0}
          aria-valuemax={DISCUSSION_DURATION_SECONDS}
        >
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-1000 ease-linear"
            style={{ width: `${100 - progress}%` }}
          />
        </div>
      </div>

      <p
        className={`text-5xl font-bold mb-2 transition-colors ${
          timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-violet-600"
        }`}
      >
        {timeLeft}s
      </p>
      <p className="text-sm text-neutral-500">{t.timeLeft}</p>

      <button
        onClick={onComplete}
        className="mt-12 px-8 py-4 bg-violet-600 text-white text-lg font-bold rounded-xl hover:bg-violet-700 transition-colors active:scale-95"
      >
        {t.goToVoting}
      </button>
    </div>
  );
}
