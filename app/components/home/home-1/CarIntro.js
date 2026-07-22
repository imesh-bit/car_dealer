"use client";

import { useTranslation } from "@/hooks/useTranslation";

const CarIntro = () => {
  const { t } = useTranslation();

  return (
    <div className="row align-items-center">
      <div className="col-12 col-md-9 col-xl-7">
        <div className="home1_divider_content">
          <span className="home1_divider_badge">OUR PROMISE</span>
          <h2 className="title">{t("home.carIntroTitle")}</h2>
          <p className="para">{t("home.carIntroDescription")}</p>
        </div>
      </div>
      {/* End col-md-9 */}
    </div>
  );
};

export default CarIntro;
