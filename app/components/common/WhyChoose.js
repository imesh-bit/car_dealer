"use client";

import { useTranslation } from "@/hooks/useTranslation";

const WhyChoose = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      iconClass: "flaticon-price-tag",
      title: t("home.bestPrice"),
      description: t("home.whyChooseDescription"),
      delay: 100,
      style: "style1",
    },
    {
      iconClass: "flaticon-car",
      title: t("home.trustedByThousands"),
      description: t("home.whyChooseDescription"),
      delay: 200,
      style: "style2",
    },
    {
      iconClass: "flaticon-trust",
      title: t("home.wideRangeOfBrands"),
      description: t("home.whyChooseDescription"),
      delay: 300,
      style: "style3",
    },
  ];

  return (
    <>
      {reasons.map((reason, index) => (
        <div
          className="col-sm-6 col-lg-4"
          data-aos="fade-up"
          data-aos-delay={reason.delay}
          key={index}
        >
          <div className="why_chose_us home7_style">
            <div className={`icon ${reason.style}`}>
              <span className={reason.iconClass} />
            </div>
            <div className="details">
              <h5 className="title">{reason.title}</h5>
              <p>{reason.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
