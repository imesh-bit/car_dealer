 "use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import listingCar from "@/data/listingCar";
import Image from "next/image";
import Link from "next/link";

const PopularVehicles = () => {
  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        speed={1000}
        centeredSlides={true}
        initialSlide={Math.floor(listingCar.length / 2)}
        modules={[Pagination, Navigation]}
        pagination={{
          el: ".js-pagination-pag2",
          spaceBetween: 10,
          clickable: true,
        }}
        navigation={{
          nextEl: ".p3-arrow-next",
          prevEl: ".p3-arrow-prev",
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {listingCar.slice(0, 6).map((listing, index) => (
          <SwiperSlide key={listing.id}>
            {/* Added a container class to handle flex column flow */}
            <div className="item carlisting-popular-vehicles" style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Image moved to the top */}
              <div className="thumb">
                <Image
                  width={640}
                  height={420}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={100}
                  priority={index < 4}
                  src={listing.image}
                  alt={listing.title}
                />
              </div>

              {/* Details follow the image */}
              <div className="details text-center" style={{ paddingTop: '20px' }}>
                <div className="wrapper">
                  <h5 className="price text-thm4">
                    ${Number(listing.price).toLocaleString()}
                  </h5>
                  <h6 className="title">
                    <Link href={`/listing-single-v1/${listing.id}`}>
                      {listing.title}
                    </Link>
                  </h6>
                  <div className="listign_review">
                    <ul className="mb0" style={{ listStyle: 'none', padding: 0 }}>
                      {[...Array(5)].map((_, i) => (
                        <li key={i} className="list-inline-item">
                          <i className="fa fa-star" />
                        </li>
                      ))}
                      <li className="list-inline-item">{listing.rating}</li>
                      <li className="list-inline-item">({listing.reviewsCount} reviews)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="listing_footer mt-3">
                  <ul className="mb0" style={{ listStyle: 'none', padding: 0 }}>
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
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <div className="arrow-70-plus light-arrow_btn d-none d-sm-block">
        <div className="slider-arrow-center">
          <button className="prev p3-arrow-prev">
            <i className="flaticon-left-arrow"></i>
          </button>
          <button className="next p3-arrow-next">
            <i className="flaticon-right-arrow"></i>
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="text-center mt-4">
        <div className="js-pagination-pag2" />
      </div>
    </>
  );
};

export default PopularVehicles;