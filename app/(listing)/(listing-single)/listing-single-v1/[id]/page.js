import { notFound } from "next/navigation";
import Footer from "@/app/components/common/Footer";
import DefaultHeader from "@/app/components/common/DefaultHeader";
import HeaderSidebar from "@/app/components/common/HeaderSidebar";
import HeaderTop from "@/app/components/common/HeaderTop";
import MobileMenu from "@/app/components/common/MobileMenu";
import LoginSignupModal from "@/app/components/common/login-signup";
import BreadCrumb from "@/app/components/listing/listing-single/BreadCrumb";
import ShareMeta from "@/app/components/listing/listing-single/ShareMeta";
import ProductGallery from "@/app/components/listing/listing-single/listing-single-v1/ProductGallery";
import Overview from "@/app/components/listing/listing-single/Overview";
import Descriptions from "@/app/components/listing/listing-single/Descriptions";
import Features from "@/app/components/listing/listing-single/Features";
import Map from "@/app/components/common/Map";
import ConsumerReviews from "@/app/components/listing/listing-single/ConsumerReviews";
import ReviewBox from "@/app/components/listing/listing-single/ReviewBox";
import ContactSeller from "@/app/components/listing/listing-single/sidebar/ContactSeller";
import OrderInquiryGeneral from "@/app/components/listing/listing-single/sidebar/OrderInquiryGeneral";
import QuoteInquiry from "@/app/components/listing/listing-single/sidebar/QuoteInquiry";
import SellerDetail from "@/app/components/listing/listing-single/sidebar/SellerDetail";
import Link from "next/link";
import ReleatedCar from "@/app/components/listing/listing-single/ReleatedCar";
import listingsData from "@/data/listingCar";
import { CarJsonLd } from "@/app/components/common/JsonLd";
import { createListingMetadata } from "@/lib/metadata";

// Pre-render a page for every car at build time
export async function generateStaticParams() {
  return listingsData.map((car) => ({ id: String(car.id) }));
}

// Dynamic <title> per car
export async function generateMetadata({ params }) {
  const { id } = await params;
  const car = listingsData.find((item) => String(item.id) === id);

  if (!car) {
    return { title: "Listing Not Found" };
  }

  return createListingMetadata(car);
}

const ListingSingleV1 = async ({ params }) => {
  const { id } = await params;
  const car = listingsData.find((item) => String(item.id) === id);

  // No matching car for this id -> Next.js not-found page
  if (!car) {
    notFound();
  }

  const conditionLabel =
    car.condition === "New"
      ? "BRAND NEW - IN STOCK"
      : `${car.condition.toUpperCase()} - IN STOCK`;

  const formatCurrency = (value) => `¥${Number(value).toLocaleString()}`;

  return (
    <div className="wrapper">
      <CarJsonLd car={car} />
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

      {/* Agent Single Grid View */}
      <section className="our-agent-single bgc-f9 pb90 mt70-992 pt30">
        <div className="container">
          <div className="row mb20">
            <div className="col-xl-12">
              <div className="breadcrumb_content style2">
                <BreadCrumb car={car} />
              </div>
            </div>
          </div>
          {/* End .row bradcrumb */}

          <div className="row mb30">
            <div className="col-lg-7 col-xl-8">
              <div className="single_page_heading_content">
                <div className="car_single_content_wrapper">
                  <ul className="car_info mb20-md">
                    <li className="list-inline-item">
                      <a href="#">{conditionLabel}</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-clock-1 vam" />
                        {car.postedAgo}
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-eye vam" />
                        {car.views}
                      </a>
                    </li>
                  </ul>
                  <h1 className="title">{car.title}</h1>
                </div>
              </div>
            </div>
            {/* End .col-lg-7 */}

            <div className="col-lg-5 col-xl-4">
              <div className="single_page_heading_content text-start text-lg-end">
                <div className="share_content d-none d-lg-block">
                  <ShareMeta />
                </div>
                <div className="price_content">
                  <div className="price mt30 mb10 mt10-md">
                    <h3>{formatCurrency(car.price)}</h3>
                  </div>
                </div>
              </div>
            </div>
            {/* End col-lg-5 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <ProductGallery car={car} />
              {/* End Car Gallery */}

              <div className="d-block d-lg-none mt30 mb30">
                <div className="opening_hour_widgets p25 shadow-sm rounded-4 border">
                  <div className="wrapper">
                    <h4 className="title mb20">Free Quote / Inquiry</h4>
                    {car.category === "species" ? (
                      <OrderInquiryGeneral hideTitle car={car} />
                    ) : (
                      <QuoteInquiry hideTitle baseFobPrice={car.price} />
                    )}
                  </div>
                </div>
              </div>

              <div className="opening_hour_widgets p30 mt30">
                <div className="wrapper">
                  <h4 className="title">General Info</h4>
                  <Overview car={car} />
                </div>
              </div>
              {/* End opening_hour_widgets */}

              <div className="listing_single_description mt30">
                <h4 className="mb30">
                  Description{" "}
                  <span className="float-end body-color fz13">
                    ID #{9500 + car.id}
                  </span>
                </h4>
                <Descriptions car={car} />
              </div>
              {/* End car descriptions */}

              <div className="user_profile_service">
                <Features car={car} />
                <hr />
                <div className="row">
                  <div className="col-lg-12">
                    <a className="fz12 tdu color-blue" href="#">
                      View all features
                    </a>
                  </div>
                </div>
              </div>
              {/* End user profile service */}

              <div className="user_profile_location">
                <h4 className="title">Location</h4>
                <div className="property_sp_map mb40">
                  <div className="h400 bdrs8 map_in" id="map-canvas">
                    <Map />
                  </div>
                </div>
                <div className="upl_content d-block d-md-flex">
                  <p className="float-start fn-sm mb20-sm">
                    <span className="fas fa-map-marker-alt pr10 vam" />
                    3891 Ranchview Dr. Richardson, California 62639
                  </p>
                  <button className="btn location_btn">Get Direction</button>
                </div>
              </div>
              {/* End Location */}

              {/* <ConsumerReviews /> */}
              {/* End ConsumerReviews */}

              {/* <ReviewBox /> */}
              {/* End ReviewBox */}
            </div>
            {/* End .col-xl-8 */}

            <div className="col-lg-4 col-xl-4">
              <div className="offer_btns">
                <div className="text-end">
                  <button className="btn btn-thm ofr_btn1 btn-block mt0 mb20">
                    <span className="flaticon-coin mr10 fz18 vam" />
                    {car.category === "species"
                      ? "Request quote"
                      : "Make an Offer Price"}
                  </button>
                  {car.category === "automobile" && (
                    <button className="btn ofr_btn2 btn-block mt0 mb20">
                      <span className="flaticon-profit-report mr10 fz18 vam" />
                      View VIN Report
                    </button>
                  )}
                </div>
              </div>
              {/* End offer_btn
               */}
              <div className="sidebar_seller_wrapper sticky">
                <div className="sidebar_seller_contact d-none d-lg-block opening_hour_widgets p25 shadow-sm rounded-4 border">
                  <div className="wrapper">
                    <QuoteInquiry hideTitle baseFobPrice={car.price} />
                  </div>
                </div>
                <div className="sidebar_seller_contact mt30">
                  <SellerDetail car={car} />
                  <h4 className="mb30">Contact Seller</h4>
                  <ContactSeller car={car} />
                </div>
              </div>

              {/* End .col-xl-4 */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Agent Single Grid View */}

      {/* Car For Rent */}
      <section className="car-for-rent bb1">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="main-title text-center text-md-start mb10-520">
                <h2 className="title">Releated Best Car</h2>
              </div>
            </div>
            {/* End .col-sm-6 */}

            <div className="col-sm-6">
              <div className="text-center text-md-end mb30-520">
                <Link href="/page-list-v1" className="more_listing">
                  Show All Cars
                  <span className="icon">
                    <span className="fas fa-plus" />
                  </span>
                </Link>
              </div>
            </div>
            {/* End .col-sm-6 */}
          </div>
          {/* End .row */}

          <div className="col-lg-12">
            <div
              className="home1_popular_listing home3_style"
              data-aos-delay="100"
            >
              <div className="listing_item_4grid_slider nav_none">
                <ReleatedCar currentId={car.id} />
              </div>
            </div>
          </div>
          {/* End .col-lg-12 */}
        </div>
        {/* End .container */}
      </section>
      {/* End Car For Rent */}

      {/* Our Footer */}
      <Footer />
      {/* End Our Footer */}

      {/* Modal */}
      <div
        className="sign_up_modal modal fade"
        id="logInModal"
        data-backdrop="static"
        data-keyboard=""
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

export default ListingSingleV1;