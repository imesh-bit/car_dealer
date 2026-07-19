"use client";

import { LanguageProvider } from "@/context/LanguageContext";

const Providers = ({ children, initialLocale }) => {
  return (
    <LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider>
  );
};

export default Providers;
