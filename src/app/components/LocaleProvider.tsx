"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Locale = "en" | "ko";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = "maek-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(storageKey);

    if (storedLocale === "en" || storedLocale === "ko") {
      setLocaleState(storedLocale);
    }
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "ko" : "en"),
    }),
    [locale, setLocale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);

  if (!value) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return value;
}
