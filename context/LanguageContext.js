"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLocale, localeCookieName, locales } from "@/lib/i18n/config";
import messages from "@/lib/i18n/messages";
import { getMessage } from "@/lib/i18n/translate";

const LanguageContext = createContext(null);

function persistLocale(locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageProvider({ children, initialLocale = defaultLocale }) {
  const [locale, setLocaleState] = useState(() =>
    locales.includes(initialLocale) ? initialLocale : defaultLocale
  );

  const setLocale = useCallback((nextLocale) => {
    if (!locales.includes(nextLocale)) {
      return;
    }

    setLocaleState(nextLocale);
    persistLocale(nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key) => getMessage(messages[locale] || messages[defaultLocale], key),
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  }

  return context;
}
