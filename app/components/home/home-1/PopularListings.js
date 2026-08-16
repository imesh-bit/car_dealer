"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { useMergedListings } from "@/hooks/useMergedListings";

const PopularListings = ({ category = "automobile" }) => {
  const mergedListings = useMergedListings();
  const visibleListings = mergedListings.filter(
    (item) => (item.category || "automobile") === category
  );

  return (
    <>
      <Swiper
        spaceBetween={22}
        slidesPerView={3}
        loop={visibleListings.length > 3}
        speed={900}
        centeredSlides={true}
        grabCursor={true}
        initialSlide={Math.floor(visibleListings.length / 2)}
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{
          el: ".p1-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".p1-arrow-next",
          prevEl: ".p1-arrow-prev",
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 22 },
        }}
      >
        {visibleListings.map((listing) => {
          const priceNumber = Number(listing.price) || 0;

          return (
            <SwiperSlide key={listing.id}>
              <motion.article
                className="item carlisting-popular-vehicles"
                layout
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="thumb"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  <Image
                    width={640}
                    height={420}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    src={listing.image}
                    alt={listing.title}
                  />

                  <div className="popular-vehicle-badges">
                    <span className="popular-vehicle-badge">
                      {listing.featured ? "Featured" : "Special"}
                    </span>
                    <span className="popular-vehicle-verified">
                      <i className="fas fa-check-circle" aria-hidden="true" />
                      Verified
                    </span>
                  </div>

                  <div className="thumb-overlay">
                    <Link
                      href={`/listing-single-v1/${listing.id}`}
                      className="view-details-pill"
                    >
                      View Details
                      <i className="fas fa-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>

                <div className="details text-center">
                  <div className="wrapper">
                    <h5 className="price text-thm4">
                      {priceNumber ? `$${priceNumber.toLocaleString()}` : "Ask for Price"}
                    </h5>
                    <h6 className="title">
                      <Link href={`/listing-single-v1/${listing.id}`}>
                        {listing.title}
                      </Link>
                    </h6>

                    {category === "auto-part" ? (
                      listing.condition && (
                        <span className="auction-grade-chip">
                          Condition: <strong>{listing.condition}</strong>
                        </span>
                      )
                    ) : category === "species" ? (
                      (listing.minimumOrderQuantity || listing.orderScale) && (
                        <span className="auction-grade-chip">
                          MOQ: <strong>{listing.minimumOrderQuantity || listing.orderScale}</strong>
                        </span>
                      )
                    ) : (
                      listing.auctionGrade && (
                        <span className="auction-grade-chip">
                          Auction Grade: <strong>{listing.auctionGrade}</strong>
                        </span>
                      )
                    )}

                    {listing.rating ? (
                      <div className="listign_review">
                        <ul className="mb0">
                          {[...Array(5)].map((_, i) => (
                            <li key={i} className="list-inline-item">
                              <i className="fa fa-star" />
                            </li>
                          ))}
                          <li className="list-inline-item">{listing.rating}</li>
                          <li className="list-inline-item">
                            ({listing.reviewsCount || 0} reviews)
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <div className="listing_footer mt-3">
                    {category === "species" ? (
                      <ul className="mb0">
                        <li className="list-inline-item">
                          <i className="fa fa-cube me-2" />
                          {listing.productCategory}
                        </li>
                        <li className="list-inline-item">
                          <i className="fa fa-box me-2" />
                          {listing.packagingType}
                        </li>
                        <li className="list-inline-item">
                          <i className="fa fa-truck me-2" />
                          {listing.orderScale}
                        </li>
                      </ul>
                    ) : category === "auto-part" ? (
                      <ul className="mb0">
                        <li className="list-inline-item">
                          <i className="fa fa-cogs me-2" />
                          {listing.partCategory}
                        </li>
                        <li className="list-inline-item">
                          <i className="fa fa-tag me-2" />
                          {listing.brand}
                        </li>
                      </ul>
                    ) : (
                      <ul className="mb0">
                        <li className="list-inline-item">
                          <span className="flaticon-road-perspective me-2" />
                          {listing.mileage}
                        </li>
                        <li className="list-inline-item">
                          <span className="flaticon-gas-station me-2" />
                          {listing.fuelType}
                        </li>
                        <li className="list-inline-item">
                          <span className="flaticon-gear me-2" />
                          {listing.transmission}
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </motion.article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Arrows */}
      <div className="arrow-70-plus light-arrow_btn d-none d-sm-block">
        <div className="slider-arrow-center">
          <button className="prev p1-arrow-prev" aria-label="Previous listing">
            <i className="flaticon-left-arrow"></i>
          </button>
          <button className="next p1-arrow-next" aria-label="Next listing">
            <i className="flaticon-right-arrow"></i>
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="text-center mt-4">
        <div className="p1-pagination" />
      </div>
    </>
  );
};

export default PopularListings;
