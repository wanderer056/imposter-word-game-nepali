import { useLanguage } from "../contexts/LanguageContext";

interface ExitButtonProps {
  onClick: () => void;
  variant?: "exit" | "clear";
  fixed?: boolean;
  className?: string;
}

export default function ExitButton({
  onClick,
  variant = "exit",
  fixed = true,
  className = "",
}: ExitButtonProps) {
  const { t } = useLanguage();
  const label = variant === "clear" ? t.clearAll : t.exitGame;

  const baseClasses = "px-4 py-2 text-sm font-medium text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors z-50";
  const positionClasses = fixed
    ? "fixed top-4 left-4 bg-white/90 backdrop-blur-sm shadow-md border border-neutral-200"
    : "";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${positionClasses} ${className}`.trim()}
      aria-label={label}
    >
      {variant === "exit" ? "✕ " : ""}
      {label}
    </button>
  );
}
