"use client";

import JapanTimeDisplay from "@/app/components/common/JapanTimeDisplay";
import LanguageSwitcher from "@/app/components/common/LanguageSwitcher";

const MobileHeaderTop = () => {
  return (
    <>
      <style>{`
        @media only screen and (max-width: 992px) {
          .mobile-header-show {
            display: block !important;
            width: 100%;
            overflow: hidden;
            background: #18181b;
            color: #d4d4d8;
            font-family: inherit;
          }
          .mobile-header-top .container {
            max-width: 100% !important;
            padding: 0 16px;
          }
          .mobile-header-ticker {
            min-height: 26px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 4px 0;
            font-size: 11px;
            line-height: 1;
            letter-spacing: 0.02em;
          }
          .mobile-header-time {
            display: flex;
            align-items: center;
            gap: 7px;
            min-width: 0;
          }
          .mobile-header-online-dot {
            width: 6px;
            height: 6px;
            flex: 0 0 6px;
            border-radius: 50%;
            background: #4ade80;
            box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.12);
            animation: mobile-header-pulse 2s ease-in-out infinite;
          }
          .mobile-header-language {
            flex: 0 0 auto;
          }
          .mobile-header-top .language-switcher {
            gap: 2px;
          }
          .mobile-header-top .language-switcher__item {
            gap: 2px;
          }
          .mobile-header-top .language-switcher__button {
            color: #a1a1aa;
            padding: 4px 6px;
            border-radius: 3px;
            font-size: 11px;
          }
          .mobile-header-top .language-switcher__button:hover,
          .mobile-header-top .language-switcher__button.is-active {
            color: #fff;
            background: rgba(255, 255, 255, 0.12);
          }
          .mobile-menu .header.stylehome1 {
            min-height: 58px;
            padding: 12px 16px !important;
            border-bottom: 1px solid #e4e4e7;
            box-shadow: 0 2px 8px rgba(24, 24, 27, 0.06);
          }
          .mobile-menu .menubar {
            transition: color 0.2s ease, transform 0.2s ease;
          }
          .mobile-menu .menubar:hover,
          .mobile-menu .menubar:focus-visible {
            color: #18181b;
            transform: translateY(-1px);
          }
          .mobile-menu .mobile_menu_main_logo img {
            max-width: 140px;
            height: auto;
          }
        }
        @media only screen and (min-width: 993px) {
          .mobile-header-show {
            display: none !important;
          }
        }
        @keyframes mobile-header-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
      <div className="mobile-header-top mobile-header-show" suppressHydrationWarning>
        <div className="container">
          <div className="mobile-header-ticker" role="group" aria-label="Japan time and language selector">
            <div className="mobile-header-time">
              <span className="mobile-header-online-dot" aria-hidden="true" />
              <JapanTimeDisplay compact />
            </div>
            <div className="mobile-header-language">
              <LanguageSwitcher variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeaderTop;
