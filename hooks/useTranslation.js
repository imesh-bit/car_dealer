"use client";

import { useLanguageContext } from "@/context/LanguageContext";

export function useTranslation() {
  return useLanguageContext();
}
