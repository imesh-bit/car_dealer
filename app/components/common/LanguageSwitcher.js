"use client";

import { localeLabels, locales } from "@/lib/i18n/config";
import { useTranslation } from "@/hooks/useTranslation";

const LanguageSwitcher = ({ className = "", variant = "default" }) => {
  const { locale, setLocale } = useTranslation();

  return (
    <div
      className={`language-switcher language-switcher--${variant} ${className}`.trim()}
      role="group"
      aria-label="Language selector"
    >
      {locales.map((item, index) => (
        <span key={item} className="language-switcher__item">
          {index > 0 ? (
            <span className="language-switcher__divider" aria-hidden="true">
              |
            </span>
          ) : null}
          <button
            type="button"
            className={`language-switcher__button ${
              locale === item ? "is-active" : ""
            }`}
            onClick={() => setLocale(item)}
            aria-pressed={locale === item}
          >
            {localeLabels[item]}
          </button>
        </span>
      ))}

      <style jsx>{`
        .language-switcher {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          line-height: 1;
        }

        .language-switcher__item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .language-switcher__divider {
          opacity: 0.45;
        }

        .language-switcher__button {
          border: 0;
          background: transparent;
          color: inherit;
          padding: 4px 6px;
          border-radius: 4px;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .language-switcher__button:hover,
        .language-switcher__button.is-active {
          color: var(--primary-color, #ff5a1f);
        }

        .language-switcher--mobile {
          margin-bottom: 20px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .language-switcher--mobile .language-switcher__button {
          font-weight: 600;
        }

        .language-switcher--compact .language-switcher__button {
          padding: 2px 4px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
