"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const STORAGE_KEY = "voiture:cookie-consent";
const CONSENT_EVENT = "voiture:cookie-consent-updated";

const DEFAULT_PREFERENCES = { necessary: true, analytics: false, marketing: false };

const readStoredConsent = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch (error) {
    return null;
  }
};

const persistConsent = (preferences) => {
  const record = { ...preferences, necessary: true, updatedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch (error) {
    // localStorage unavailable (private browsing, quota, etc.) — consent
    // just won't persist across reloads, non-fatal.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
};

const CookieConsent = () => {
  const { t } = useTranslation();
  const [view, setView] = useState("hidden"); // hidden | banner | settings
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setPreferences(stored);
    } else {
      setView("banner");
    }
  }, []);

  const acceptAll = () => {
    const next = { necessary: true, analytics: true, marketing: true };
    setPreferences(next);
    persistConsent(next);
    setView("hidden");
  };

  const rejectNonEssential = () => {
    const next = { necessary: true, analytics: false, marketing: false };
    setPreferences(next);
    persistConsent(next);
    setView("hidden");
  };

  const savePreferences = () => {
    persistConsent(preferences);
    setView("hidden");
  };

  const reopen = () => setView("settings");

  const togglePreference = (key) => {
    setPreferences((previous) => ({ ...previous, [key]: !previous[key] }));
  };

  return (
    <>
      {view !== "hidden" && (
        <div className="cookie-consent" role="dialog" aria-live="polite" aria-label={t("cookieConsent.title")}>
          <div className="cookie-consent__card">
            <div className="cookie-consent__body">
              <h2 className="cookie-consent__title">{t("cookieConsent.title")}</h2>
              <p className="cookie-consent__message">
                {t("cookieConsent.message")}{" "}
                <Link href="/privacy-policy">{t("cookieConsent.privacyLink")}</Link>
              </p>

              {view === "settings" && (
                <div className="cookie-consent__categories">
                  <label className="cookie-consent__category">
                    <span className="cookie-consent__category-head">
                      <input type="checkbox" checked disabled />
                      <strong>{t("cookieConsent.necessaryTitle")}</strong>
                    </span>
                    <span className="cookie-consent__category-desc">
                      {t("cookieConsent.necessaryDescription")}
                    </span>
                  </label>

                  <label className="cookie-consent__category">
                    <span className="cookie-consent__category-head">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference("analytics")}
                      />
                      <strong>{t("cookieConsent.analyticsTitle")}</strong>
                    </span>
                    <span className="cookie-consent__category-desc">
                      {t("cookieConsent.analyticsDescription")}
                    </span>
                  </label>

                  <label className="cookie-consent__category">
                    <span className="cookie-consent__category-head">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => togglePreference("marketing")}
                      />
                      <strong>{t("cookieConsent.marketingTitle")}</strong>
                    </span>
                    <span className="cookie-consent__category-desc">
                      {t("cookieConsent.marketingDescription")}
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="cookie-consent__actions">
              {view === "banner" ? (
                <>
                  <button type="button" className="cookie-consent__btn cookie-consent__btn--ghost" onClick={rejectNonEssential}>
                    {t("cookieConsent.rejectNonEssential")}
                  </button>
                  <button type="button" className="cookie-consent__btn cookie-consent__btn--ghost" onClick={() => setView("settings")}>
                    {t("cookieConsent.managePreferences")}
                  </button>
                  <button type="button" className="cookie-consent__btn cookie-consent__btn--primary" onClick={acceptAll}>
                    {t("cookieConsent.acceptAll")}
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="cookie-consent__btn cookie-consent__btn--ghost" onClick={rejectNonEssential}>
                    {t("cookieConsent.rejectNonEssential")}
                  </button>
                  <button type="button" className="cookie-consent__btn cookie-consent__btn--primary" onClick={savePreferences}>
                    {t("cookieConsent.savePreferences")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {view === "hidden" && (
        <button
          type="button"
          className="cookie-consent__reopen"
          onClick={reopen}
          aria-label={t("cookieConsent.settingsButton")}
          title={t("cookieConsent.settingsButton")}
        >
          <span className="fas fa-cookie-bite" aria-hidden="true" />
        </button>
      )}

      <style jsx>{`
        .cookie-consent {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1400;
          display: flex;
          justify-content: center;
          padding: 16px;
          pointer-events: none;
        }

        .cookie-consent__card {
          pointer-events: auto;
          width: 100%;
          max-width: 760px;
          background: #ffffff;
          border: 1px solid #e8edf4;
          border-radius: 16px;
          box-shadow: 0 20px 55px rgba(10, 35, 87, 0.22);
          padding: 20px 22px;
          animation: cookieConsentRise 0.3s ease both;
        }

        @keyframes cookieConsentRise {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cookie-consent__title {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 700;
          color: #173b68;
          font-family: Inter, sans-serif;
        }

        .cookie-consent__message {
          margin: 0 0 4px;
          font-size: 13.5px;
          line-height: 1.55;
          color: #475569;
        }

        .cookie-consent__message :global(a) {
          color: #2563eb;
          font-weight: 600;
          text-decoration: underline;
        }

        .cookie-consent__categories {
          margin-top: 14px;
          display: grid;
          gap: 10px;
        }

        .cookie-consent__category {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 10px 12px;
          border: 1px solid #eef1f6;
          border-radius: 10px;
          background: #f8fafc;
          cursor: pointer;
        }

        .cookie-consent__category-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #173b68;
        }

        .cookie-consent__category-desc {
          font-size: 12px;
          color: #64748b;
          margin-left: 24px;
        }

        .cookie-consent__actions {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 8px;
        }

        .cookie-consent__btn {
          border-radius: 999px;
          font-size: 12.5px;
          font-weight: 700;
          padding: 10px 16px;
          cursor: pointer;
          transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
          white-space: nowrap;
        }

        .cookie-consent__btn--ghost {
          background: #ffffff;
          border: 1px solid #dbe3ee;
          color: #334155;
        }

        .cookie-consent__btn--ghost:hover {
          background: #f4f6f9;
        }

        .cookie-consent__btn--primary {
          background: var(--primary-color, #f5c34b);
          border: 1px solid transparent;
          color: #173b68;
        }

        .cookie-consent__btn--primary:hover {
          filter: brightness(0.96);
        }

        .cookie-consent__reopen {
          position: fixed;
          left: 1rem;
          bottom: calc(1rem + env(safe-area-inset-bottom));
          z-index: 1200;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: none;
          background: #173b68;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          box-shadow: 0 10px 24px rgba(10, 35, 87, 0.28);
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .cookie-consent__reopen:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(10, 35, 87, 0.32);
        }

        @media (max-width: 575px) {
          .cookie-consent {
            padding: 10px;
          }
          .cookie-consent__card {
            padding: 16px;
            border-radius: 14px;
          }
          .cookie-consent__actions {
            justify-content: stretch;
          }
          .cookie-consent__btn {
            flex: 1 1 auto;
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cookie-consent__card {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default CookieConsent;
