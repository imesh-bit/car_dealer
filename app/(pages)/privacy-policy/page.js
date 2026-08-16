import Footer from "@/app/components/common/Footer";
import DefaultHeader from "@/app/components/common/DefaultHeader";
import HeaderSidebar from "@/app/components/common/HeaderSidebar";
import HeaderTop from "@/app/components/common/HeaderTop";
import MobileMenu from "@/app/components/common/MobileMenu";
import LoginSignupModal from "@/app/components/common/login-signup";
import PrivacyPolicy from "@/app/components/pages/privacy-policy/PrivacyPolicy";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how RAIKO GROUP collects, uses, and protects your information, and how to manage your cookie preferences.",
  path: "/privacy-policy",
});

const PrivacyPolicyPage = () => {
  return (
    <div className="wrapper">
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <HeaderSidebar />
      </div>
      {/* Sidebar Panel End */}

      {/* header top */}
      <HeaderTop />
      {/* End header top */}

      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Main Header Nav For Mobile */}
      <MobileMenu />
      {/* End Main Header Nav For Mobile */}

      {/* Inner Page Breadcrumb */}
      <section className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">Privacy Policy</h2>
                <ol className="breadcrumb fn-sm">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <a href="#">Privacy Policy</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Inner Page Breadcrumb */}

      {/* Our Privacy Policy */}
      <section className="our-terms pb90">
        <div className="container">
          <PrivacyPolicy />
        </div>
      </section>
      {/* Our Privacy Policy */}

      {/* Our Footer */}
      <Footer />
      {/* End Our Footer */}

      {/* Modal */}
      <div
        className="sign_up_modal modal fade"
        id="logInModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-hidden="true"
      >
        <LoginSignupModal />
      </div>
      {/* End Modal */}
    </div>
    // End wrapper
  );
};

export default PrivacyPolicyPage;
