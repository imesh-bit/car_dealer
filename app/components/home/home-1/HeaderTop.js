"use client";

import LanguageSwitcher from "@/app/components/common/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

const HeaderTop = () => {
  const { t } = useTranslation();

  const contactData = [
    {
      icon: "flaticon-phone-call",
      text: "+81 90-6360-9950",
    },
    {
      icon: "flaticon-map",
      text: "924-1 Tenma,Fuji,Shizuoka 419-0205,Japan",
    },
    {
      icon: "flaticon-clock",
      text: t("header.openingHours"),
    },
  ];

  return (
    <div className="header_top dn-992">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 col-xl-7">
            <div className="header_top_contact_opening_widget text-center text-md-start">
              <ul className="mb0">
                {contactData.map((contact, index) => (
                  <li className="list-inline-item" key={index}>
                    <a href="#">
                      <span className={contact.icon} />
                      {contact.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-4 col-xl-5">
            <div className="header_top_social_widgets text-center text-md-end">
              <LanguageSwitcher variant="compact" />
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </div>
  );
};

export default HeaderTop;
