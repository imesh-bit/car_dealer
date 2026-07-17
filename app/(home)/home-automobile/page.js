import CarIntro from "@/app/components/home/home-1/CarIntro";
import WhyChoose from "@/app/components/common/WhyChoose";
import LoginSignupModal from "@/app/components/common/login-signup";
import HeaderTop from "@/app/components/home/home-1/HeaderTop";
import HeaderSidebar from "@/app/components/common/HeaderSidebar";
import Header from "@/app/components/home/home-1/Header";
import MobileMenu from "@/app/components/common/MobileMenu";
import Hero from "@/app/components/home/home-1/Hero";
import Footer from "@/app/components/common/Footer";
import Partner from "@/app/components/common/Partner";
import Counter from "@/app/components/home/home-1/Counter";
import Category from "@/app/components/home/home-4/Category";

export const metadata = {
  title: "RAICO GROUP - Automotive & Car Dealer",
  description: "RAICO GROUP - Automotive & Car Dealer.",
};

const HomeAutomobile = () => {
  return (
    <div className="wrapper ovh">
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <HeaderSidebar />
      </div>

      <HeaderTop />
      <Header />
      <MobileMenu />

      <Hero />

      <section className="car-category mobile_space bgc-f9 pb100">
        <div className="container">
          <div className="row">
            <Category />
          </div>
        </div>
      </section>

      <section className="why-chose pt0 pb90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-title text-center">
                <h2>Why Choose Us?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <WhyChoose />
          </div>
        </div>
      </section>

      <section className="deliver-divider bg-img1">
        <div className="container">
          <CarIntro />
        </div>
      </section>

      <section className="our-funfact pt50 pb30">
        <div className="container">
          <div className="row">
            <Counter />
          </div>
        </div>
      </section>

      <section className="our-partner pt0 pb100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Popular Brands</h2>
              </div>
            </div>
          </div>

          <div className="partner_divider">
            <div className="row">
              <Partner />
            </div>
          </div>
        </div>
      </section>

      <Footer />

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
    </div>
  );
};

export default HomeAutomobile;
