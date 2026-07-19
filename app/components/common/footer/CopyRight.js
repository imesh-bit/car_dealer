"use client";

import React from "react";
import Social from "./Social";
import { useTranslation } from "@/hooks/useTranslation";

const CopyRight = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-8 col-xl-9">
          <div className="copyright-widget mt5 text-start mb20-sm">
            <p>
              <a href="" target="_blank" rel="noopener noreferrer">
                RAICO GROUP
              </a>{" "}
              © {new Date().getFullYear()}. {t("footer.allRightsReserved")}
            </p>
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6 col-lg-4 col-xl-3">
          <div className="footer_social_widget text-start text-md-end">
            <ul className="mb0">
              <Social />
            </ul>
          </div>
        </div>
        {/* End .col */}
      </div>
    </div>
  );
};

export default CopyRight;
