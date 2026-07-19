"use client";

import Image from "next/image";
import HeroFilter from "../../common/HeroFilter";
import { useTranslation } from "@/hooks/useTranslation";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="home-one bg-home1">
      <div className="container">
        <div className="row posr">
          <div className="col-lg-10 m-auto">
            <div className="home_content home1_style">
              <div className="home-text text-center mb30">
                <h1 className="title">
                  <span className="aminated-object1">
                    <Image
                      width={110}
                      height={14}
                      style={{
                        objectFit: "contain",
                      }}
                      priority
                      className="objects"
                      src="/images/home/title-bottom-border.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </span>
                  {t("home.heroTitle")}
                </h1>
                <p className="para">{t("home.heroSubtitle")}</p>
              </div>
              <div className="advance_search_panel">
                <div className="row">
                  <HeroFilter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
