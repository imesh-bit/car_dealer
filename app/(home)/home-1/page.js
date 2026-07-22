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
  title: "Automotive & Car Dealer",
  description:
    "Browse featured cars, compare listings, and find the right vehicle at the best price with RAICO GROUP.",
  path: "/",
});

const Home_1 = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category || "automobile";

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

      {/* Main Header Nav For Mobile */}
      <MobileHeaderTop />
      <MobileMenu />
      {/* End Main Header Nav For Mobile */}

      {/* Hero */}
      <Hero />
      {/* End Hero */}

      {/* Car Category */}
      <section className="car-category mobile_space bgc-f9 pb100 pt0 pt120-md">
        <div className="container">
          <div className="row d-md-none">
            <div className="col-lg-8 m-auto">
              <div className="main-title text-center">
                <h2>Top Categories</h2>
              </div>
            </div>
          </div>

          <div className="row mb90">
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
      <section className="featured-product">
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

      {/* Popular Vehicles */}
      {/* <section className="popular-listing home4-popular-showcase trending-listings-section pt80 pb110">
        <div className="container-fluid px-2 px-md-3">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb-4 mb-lg-5">
                <TranslatedHeading messageKey="home.trendingListings" />
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div
              className="home1_popular_listing home4_style px-0 px-md-3"
              data-aos="fade"
              data-aos-delay="100"
              suppressHydrationWarning
            >
              <div className="listing_item_car_grid_slider trending-slider">
                <PopularVehicles category={activeCategory} />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Popular Vehicles */}

      {/* <!-- Funfact --> */}
      <section className="our-funfact home1-counter-section pt50 pb30">
        <div className="container">
          <div className="row">
            <Counter />
          </div>
        </div>
      </section>
      {/* <!-- End Funfact --> */}

      {/* Testimonials  */}
      {/* <section className="our-testimonials-home1 pt120 pb120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-title text-center">
                <h2>Testimonials</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="testimonial_slider_home1">
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Testimonials  */}

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
