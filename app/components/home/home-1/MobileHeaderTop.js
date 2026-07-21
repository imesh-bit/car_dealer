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
            background-color: #fff;
            padding: 12px 0;
            border-bottom: 1px solid #e8e8e8;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
          .mobile-header-top .container {
            max-width: 100% !important;
            padding: 0 15px;
          }
          .mobile-header-top .row {
            margin: 0;
          }
          .mobile-header-top .col-6 {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 5px;
          }
          .mobile-header-top .col-6:first-child {
            justify-content: flex-start;
          }
          .mobile-header-top .col-6:last-child {
            justify-content: flex-end;
          }
          .mobile-header-top .header_top_contact_opening_widget,
          .mobile-header-top .header_top_social_widgets {
            margin: 0;
          }
          .mobile-header-top .header_top_contact_opening_widget ul,
          .mobile-header-top .header_top_social_widgets ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }
          .mobile-header-top .header_top_contact_opening_widget ul li,
          .mobile-header-top .header_top_social_widgets ul li {
            display: inline-block;
            margin: 0;
          }
          .mobile-header-top .header_top_contact_opening_widget ul li a,
          .mobile-header-top .header_top_social_widgets ul li a {
            color: #1a3760;
            font-size: 11px;
            font-weight: 500;
            line-height: 14px;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: all 0.3s ease;
          }
          .mobile-header-top .header_top_contact_opening_widget ul li a:hover,
          .mobile-header-top .header_top_social_widgets ul li a:hover {
            color: #ffb000;
          }
          .mobile-header-top .header_top_contact_opening_widget ul li a span,
          .mobile-header-top .header_top_social_widgets ul li a span {
            font-size: 13px;
            display: flex;
            align-items: center;
            color: #1a3760;
          }
        }
        @media only screen and (min-width: 993px) {
          .mobile-header-show {
            display: none !important;
          }
        }
      `}</style>
      <div className="header_top mobile-header-top mobile-header-show db-992" suppressHydrationWarning>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="header_top_contact_opening_widget">
                <ul>
                  <li className="list-inline-item">
                    <a href="#" onClick={(e) => e.preventDefault()} title="Japan Time">
                      <span className="flaticon-clock" />
                      <JapanTimeDisplay compact />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="header_top_social_widgets">
                <LanguageSwitcher variant="compact" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeaderTop;
