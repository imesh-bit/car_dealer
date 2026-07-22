"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const WeBestBlock = () => {
  const { t } = useTranslation();

  const blocksData = [
    {
      icon: "flaticon-user-1",
      iconClass: "one",
      titleKey: "home.verifiedSourcing",
      descriptionKey: "home.verifiedSourcingDescription",
    },
    {
      icon: "flaticon-high-five",
      titleKey: "home.exportReadyInventory",
      iconClass: "two",
      descriptionKey: "home.exportReadyInventoryDescription",
      marginClass: "mt60 mt0-lg",
    },
    {
      icon: "flaticon-megaphone",
      titleKey: "home.globalLogistics",
      iconClass: "three",
      descriptionKey: "home.globalLogisticsDescription",
    },
    {
      icon: "flaticon-headphones",
      titleKey: "home.tradeSupport",
      iconClass: "four",
      marginClass: "mt60 mt0-lg",
      descriptionKey: "home.tradeSupportDescription",
    },
  ];

  return (
    <>
      {blocksData.map((block, index) => (
        <div
          key={index}
          className={`col-sm-6 col-xl-3`}
          data-aos="fade-up"
          data-aos-delay={`${index * 200}`}
          suppressHydrationWarning
        >
          <div className={`iconbox_home4_style mb30-lg ${block.marginClass}`}>
            <div className={`icon ${block.iconClass}`}>
              <span className={block.icon} />
            </div>
            <div className="details">
              <h4 className="title">{t(block.titleKey)}</h4>
              <p>{t(block.descriptionKey)}</p>
              <Link href="/listing-v3" className="more_listing home4_style">
                Learn More{" "}
                <span className="icon">
                  <span className="fas fa-plus" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WeBestBlock;
