"use client";

import { useLocale } from "./LocaleProvider";

type LanguageToggleProps = {
  onDark?: boolean;
};

export function LanguageToggle({ onDark = false }: LanguageToggleProps) {
  const { locale, setLocale } = useLocale();

  const baseText = onDark ? "text-white" : "text-[#061d48]";
  const active = onDark ? "border-white text-white" : "border-[#061d48] text-[#061d48]";
  const inactive = onDark
    ? "border-transparent text-white/45 hover:text-white/80"
    : "border-transparent text-[#34473d]/45 hover:text-[#061d48]";
  const divider = onDark ? "text-white/25" : "text-[#34473d]/30";

  return (
    <div className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] ${baseText}`} aria-label="Language">
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        className={`min-h-7 border-b px-1.5 transition ${locale === "en" ? active : inactive}`}
      >
        EN
      </button>
      <span className={divider} aria-hidden="true">
        /
      </span>
      <button
        type="button"
        aria-pressed={locale === "ko"}
        onClick={() => setLocale("ko")}
        className={`min-h-7 border-b px-1.5 transition ${locale === "ko" ? active : inactive}`}
      >
        KO
      </button>
    </div>
  );
}
