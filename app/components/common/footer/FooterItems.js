"use client";

import { useTranslation } from "@/hooks/useTranslation";

const FooterItems = () => {
  const { t } = useTranslation();

  return (
    <div className="row">
      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <div className="footer_about_widget">
          <h5 className="title">{t("footer.office")}</h5>
          <p>
            JAPAN —<br />
            924-1 Tenma,Fuji,
            <br />
            Shizuoka,Japan 419-0205
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h5 className="title">{t("footer.needHelp")}</h5>
          <div className="footer_phone">+81 90-63609950</div>
          <p>hello@voiture.com</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h5 className="title">{t("footer.openingHours")}</h5>
          <p>
            {t("footer.mondayFriday")}
            <br />
            {t("footer.saturday")}
            <br />
            {t("footer.sunday")}
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h5 className="title">{t("footer.keepInTouch")}</h5>
          <form className="footer_mailchimp_form">
            <div className="wrapper">
              <div className="col-auto">
                <input
                  type="email"
                  className="form-control"
                  placeholder={t("footer.emailPlaceholder")}
                  required
                />
                <button type="submit">{t("footer.go")}</button>
              </div>
            </div>
          </form>
          <p>{t("footer.newsletterText")}</p>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default FooterItems;
