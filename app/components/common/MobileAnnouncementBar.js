"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { localeLabels, locales } from "@/lib/i18n/config";

const MobileAnnouncementBar = () => {
  const [japanTime, setJapanTime] = useState("--:--");
  const { locale, setLocale } = useTranslation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Tokyo",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setJapanTime(formatter.format(now));
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mobile-announcement-bar" aria-label="Utility announcement bar">
      <div className="mobile-announcement-bar__content">
        <div className="mobile-announcement-bar__clock" aria-label="Current Japan time">
          <span className="mobile-announcement-bar__icon" aria-hidden="true">
            🕒
          </span>
          <span>JST: {japanTime}</span>
        </div>

        <label className="mobile-announcement-bar__language" htmlFor="mobile-announcement-language">
          <span className="mobile-announcement-bar__icon" aria-hidden="true">
            🌐
          </span>
          <select
            id="mobile-announcement-language"
            value={locale}
            onChange={(event) => setLocale(event.target.value)}
            aria-label="Select language"
          >
            {locales.map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>
          <span className="mobile-announcement-bar__chevron" aria-hidden="true">
            ▾
          </span>
        </label>
      </div>

      <style jsx>{`
        .mobile-announcement-bar {
          display: none;
          width: 100%;
          background: #0f172a;
          color: #e2e8f0;
          border-bottom: 1px solid rgba(226, 232, 240, 0.16);
          position: sticky;
          top: 0;
          z-index: 1100;
        }

        .mobile-announcement-bar__content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          height: 34px;
          padding: 0 16px;
          margin: 0 auto;
          max-width: 100%;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          font-family: Arial, Helvetica, sans-serif;
        }

        .mobile-announcement-bar__clock,
        .mobile-announcement-bar__language {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }

        .mobile-announcement-bar__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          font-size: 10px;
        }

        .mobile-announcement-bar__chevron {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 1px;
          font-size: 10px;
          opacity: 0.9;
        }

        .mobile-announcement-bar__language select {
          background: transparent;
          border: 0;
          color: inherit;
          font: inherit;
          padding: 0;
          cursor: pointer;
          outline: none;
          appearance: none;
          min-width: 2.5rem;
        }

        .mobile-announcement-bar__language select option {
          color: #0f172a;
        }

        @media (max-width: 991px) {
          .mobile-announcement-bar {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileAnnouncementBar;
