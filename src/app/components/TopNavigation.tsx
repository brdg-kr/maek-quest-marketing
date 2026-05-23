"use client";

import { useLocale } from "./LocaleProvider";

type NavigationKey = "stories" | "stage-map" | "system-flow" | "design-system" | "design-system-copy";

type TopNavigationProps = {
  current?: NavigationKey;
  includeStories?: boolean;
  variant?: "green" | "neutral";
  className?: string;
};

const navigationCopy = {
  en: {
    stories: "Stories",
    stageMap: "AI Stage Map",
    systemFlow: "System Flow",
    designSystem: "Design System",
    designCopy: "Design Copy",
  },
  ko: {
    stories: "스토리",
    stageMap: "AI 단계 지도",
    systemFlow: "시스템 흐름",
    designSystem: "디자인 시스템",
    designCopy: "디자인 카피",
  },
} as const;

export function TopNavigation({
  current,
  includeStories = false,
  variant = "green",
  className = "",
}: TopNavigationProps) {
  const { locale } = useLocale();
  const copy = navigationCopy[locale];
  const baseColor = variant === "neutral" ? "text-[#4f555b]" : "text-[#10251a]/58";
  const activeColor = variant === "neutral" ? "text-[#171717]" : "text-[#087a45]";
  const hoverColor = variant === "neutral" ? "hover:text-[#171717]" : "hover:text-[#087a45]";
  const items = [
    ...(includeStories ? [{ key: "stories" as const, href: "/stories", label: copy.stories }] : []),
    { key: "stage-map" as const, href: "/", label: copy.stageMap },
    { key: "system-flow" as const, href: "/system-flow", label: copy.systemFlow },
  ];

  return (
    <nav
      className={`flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-right text-xs font-semibold uppercase tracking-[0.14em] ${baseColor} ${className}`}
      aria-label="Primary navigation"
    >
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          aria-current={current === item.key ? "page" : undefined}
          className={`transition ${hoverColor} ${current === item.key ? activeColor : ""}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
