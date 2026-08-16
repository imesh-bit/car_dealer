import Blog from "@/app/components/home/home-1/Blog";
import CarIntro from "@/app/components/home/home-1/CarIntro";
// import Category from "@/app/components/home/home-1/Category";
import PopularListings from "@/app/components/home/home-1/PopularListings";
import WhyChoose from "@/app/components/common/WhyChoose";
import LoginSignupModal from "@/app/components/common/login-signup";
import HeaderTop from "@/app/components/home/home-1/HeaderTop";
import MobileHeaderTop from "@/app/components/home/home-1/MobileHeaderTop";
import HeaderSidebar from "@/app/components/common/HeaderSidebar";
import Header from "@/app/components/home/home-1/Header";
import MobileAnnouncementBar from "@/app/components/common/MobileAnnouncementBar";
import MobileMenu from "@/app/components/common/MobileMenu";
import FeaturedFilterListing from "@/app/components/home/home-1/FeaturedFilterListing";
import Hero from "@/app/components/home/home-1/Hero";
import Footer from "@/app/components/common/Footer";
import Testimonial from "@/app/components/common/Testimonial";
import Partner from "@/app/components/common/Partner";
import Counter from "@/app/components/home/home-1/Counter";
import PopularVehicles from "@/app/components/home/home-4/PopularVehicles";
import Category from "@/app/components/home/home-4/Category";
import TranslatedHeading from "@/app/components/common/TranslatedHeading";
import ShowAllCarsLink from "@/app/components/common/ShowAllCarsLink";
import WeBestBlock from "@/app/components/home/home-4/WeBestBlock";
import Address from "@/app/components/home/home-3/Address";

import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "RAIKO GROUP | Japan Export & Wholesale Sourcing — Vehicles, Parts & Trade Goods",
  description:
    "RAIKO GROUP exports quality vehicles, auto parts, and wholesale trade goods from Japan to buyers worldwide. Transparent pricing, verified suppliers, and fast quote turnaround.",
  path: "/",
});

const CATEGORY_LABELS = {
  automobile: "Automobiles",
  "auto-part": "Auto Parts",
  species: "General",
};

const Home_1 = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category || "automobile";
  const activeCategoryLabel = CATEGORY_LABELS[activeCategory] || CATEGORY_LABELS.automobile;

  return (
    <div className="wrapper ovh" suppressHydrationWarning>
      {/* Sidebar Panel Start */}

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
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile utility bar */}
      <MobileAnnouncementBar />
      {/* Main Header Nav For Mobile */}
      <MobileHeaderTop />
      <MobileMenu />
      {/* End Main Header Nav For Mobile */}

      {/* Hero */}
      <Hero activeCategory={activeCategory} />
      {/* End Hero */}

      {/* Car Category */}
      <section className="car-category mobile_space bgc-f9 pb30 pt10 pt80-md">
        <div className="container" style={{ paddingTop: 0 }}>
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="main-title text-center">
                <span className="active-category-chip">
                  <span className="active-category-chip__dot" aria-hidden="true" />
                  Showing: {activeCategoryLabel}
                </span>
                <h2>Top Categories</h2>
              </div>
            </div>
          </div>

          <div className="row mb20">
            <div className="col-xl-9 m-auto">
              <div className="row">
                <Category category={activeCategory} />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Car Cartegory */}

      {/* Featured Product  */}
      <section className="featured-product pt0 pb0">
        <div className="container" >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-title text-center">
                <TranslatedHeading messageKey="home.featuredListings" />
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos-delay="100" data-aos="fade-up" suppressHydrationWarning>
              <FeaturedFilterListing category={activeCategory} />
            </div>
          </div>
          {/* End .row */}

          <div className="row mt20">
            <div className="col-lg-12">
              <div className="text-center">
                <ShowAllCarsLink />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Featured Product  */}

      {/* Why Chose us  */}
      {/* <section className="why-chose pt0 pb90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-title text-center">
                <TranslatedHeading messageKey="home.whyChooseUs" />
              </div>
            </div>
          </div>
          <div className="row">
            <WhyChoose />
          </div>
        </div>
      </section> */}
      {/* Why Chose us  */}


      {/* We Are The Best */}
            <section className="we-are-best">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 m-auto">
                    <div className="main-title text-center">
                      <TranslatedHeading messageKey="home.weAreTheBest" />
                    </div>
                  </div>
                </div>
                {/* End .row */}
      
                <div className="row">
                  <WeBestBlock />
                </div>
                {/* End .row */}
              </div>
            </section>
            {/* End We Are The Best */}

      {/* Delivery Divider */}
      <section className="deliver-divider bg-img1 home1_car_intro_section">
        <img
          className="home1_car_intro_image object-cover"
          src="/images/background/1.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="home1_car_intro_overlay" aria-hidden="true" />
        <div className="container">
          <CarIntro />
        </div>
      </section>
      {/* End Delivery Divider */}

      {/* Our Popular Listing */}
      <section className="popular-listing pb80 bg-ptrn1 bgc-heading-color">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <TranslatedHeading
                  messageKey="home.popularListings"
                  className="text-white"
                />
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="col-lg-12">
            <div className="home1_popular_listing">
              <div className="listing_item_4grid_slider dots_none">
                <PopularListings category={activeCategory} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Popular Listing */}

      {activeCategory === "species" && (
        <>
          {/* Our Blog */}
          <section className="our-blog pb90">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="main-title text-center">
                    <TranslatedHeading messageKey="home.recentArticles" />
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <Blog />
              </div>
              {/* End .row */}
            </div>
          </section>
          {/* End Our Blog */}
        </>
      )}

      {/* Our Contact */}
      <section className="popular-listing pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2>How To Find Us</h2>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <Address />
          </div>
        </div>
      </section>
      {/* End Our Contact */}

      {/* Delivery Divider */}
      {/* <section className="deliver-divider bg-img1 home1_car_intro_section">
        <img
          className="home1_car_intro_image object-cover"
          src="/images/background/1.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="home1_car_intro_overlay" aria-hidden="true" />
        <div className="container">
          <CarIntro />
        </div>
      </section> */}
      {/* End Delivery Divider */}

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

export default Home_1;
