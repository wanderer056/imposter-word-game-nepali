import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-md border border-neutral-200">
      <span
        className={`text-sm font-medium transition-colors ${
          language === "ne" ? "text-violet-600 font-semibold" : "text-neutral-400"
        }`}
      >
        नेपाली
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={language === "en"}
        aria-label="Toggle language"
        onClick={() => setLanguage(language === "ne" ? "en" : "ne")}
        className={`relative w-14 h-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
          language === "en" ? "bg-violet-500" : "bg-neutral-200"
        }`}
      >
        <span
          className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-200 ${
            language === "en" ? "left-7" : "left-1"
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          language === "en" ? "text-violet-600 font-semibold" : "text-neutral-400"
        }`}
      >
        English
      </span>
    </div>
  );
}
