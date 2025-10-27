import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import ar from "@/locales/ar.json";

export type Locale = "en" | "fr" | "ar";

type Translations = typeof en;

const LOCALES: Record<Locale, Translations> = { 
  en, 
  fr: fr as Translations,
  ar: ar as Translations
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string, fallback?: string) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en" as Locale,
  setLocale: (l: Locale) => {},
  t: (path: string, fallback?: string) => fallback || path,
});

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const stored = localStorage.getItem("app_locale") as Locale | null;
      return stored === "en" || stored === "fr" || stored === "ar" ? stored : "en";
    } catch {
      return "en";
    }
  });

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("app_locale", l);
    } catch {}
  };

  const t = useMemo(() => {
    const translations = LOCALES[locale];
    return (path: string, fallback?: string): string => {
      const parts = path.split(".");
      let cur: any = translations;
      for (const p of parts) {
        if (cur === undefined || cur === null) return fallback ?? path;
        cur = cur[p];
      }
      // If the resolved value is undefined, return fallback; otherwise return the actual value
      return cur === undefined ? (fallback ?? path) : String(cur);
    };
  }, [locale]);

  // Keep <html lang> and direction in sync
  useEffect(() => {
    try {
      document.documentElement.lang = locale;
      // Set RTL for Arabic
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    } catch {}
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => useContext(LocaleContext);

export default LocaleContext;
