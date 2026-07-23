// "use client";
// import listingsData from "@/data/listingCar";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// const FeaturedFilterListing = () => {
//   const [filter, setFilter] = useState("*");

//   const filteredItems =
//     filter === "*"
//       ? listingsData.slice(0, 8)
//       : listingsData.slice(0, 8).filter((item) => item.tags.includes(filter));

//   return (
//     <div className="popular_listing_sliders ">
//       {/* Nav tabs */}
//       <div className="nav nav-tabs  justify-content-center">
//         <button
//           className={filter === "*" ? "active nav-link" : "nav-link"}
//           onClick={() => setFilter("*")}
//         >
//           All Status
//         </button>

//         <button
//           className={filter === "new" ? "active nav-link" : "nav-link"}
//           onClick={() => setFilter("new")}
//         >
//           New Cars
//         </button>
//         <button
//           className={filter === "used" ? "active nav-link" : "nav-link"}
//           onClick={() => setFilter("used")}
//         >
//           Used Cars
//         </button>
//       </div>
//       {/* Tab panes */}
//       <div className="row">
//         {filteredItems.map((listing) => (
//           <div className="col-sm-6 col-xl-3" key={listing.id}>
//             <div className="car-listing">
//               <div className="thumb">
//                 {listing.featured ? (
//                   <>
//                     <div className="tag">FEATURED</div>
//                   </>
//                 ) : undefined}
//                 {!listing.featured ? (
//                   <>
//                     <div className="tag blue">SPECIAL</div>
//                   </>
//                 ) : undefined}

//                 <Image
//                   width={284}
//                   height={183}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                   priority
//                   src={listing.image}
//                   alt={listing.title}
//                 />
//                 <div className="thmb_cntnt2">
//                   <ul className="mb0">
//                     <li className="list-inline-item">
//                       <a className="text-white" href="#">
//                         <span className="flaticon-photo-camera mr3" />{" "}
//                         {listing.photosCount}
//                       </a>
//                     </li>
//                     <li className="list-inline-item">
//                       <a className="text-white" href="#">
//                         <span className="flaticon-play-button mr3" />{" "}
//                         {listing.videosCount}
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="thmb_cntnt3">
//                   <ul className="mb0">
//                     <li className="list-inline-item">
//                       <a href="#">
//                         <span className="flaticon-shuffle-arrows" />
//                       </a>
//                     </li>
//                     <li className="list-inline-item">
//                       <a href="#">
//                         <span className="flaticon-heart" />
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="details">
//                 <div className="wrapper">
//                   <h5 className="price">${listing.price}</h5>
//                   <h6 className="title">
//                     <Link href="/listing-single-v1">{listing.title}</Link>
//                   </h6>
//                   <div className="listign_review">
//                     <ul className="mb0">
//                       {[...Array(5)].map((_, index) => (
//                         <li key={index} className="list-inline-item">
//                           <a href="#">
//                             <i className="fa fa-star" />
//                           </a>
//                         </li>
//                       ))}
//                       <li className="list-inline-item">
//                         <a href="#">{listing.rating}</a>
//                       </li>
//                       <li className="list-inline-item">
//                         ({listing.reviewsCount} reviews)
//                       </li>
//                     </ul>
//                   </div>
//                 </div>{" "}
//                 <div className="listing_footer">
//                   <ul className="mb0">
//                     <li className="list-inline-item">
//                       <span className="flaticon-road-perspective me-2" />
//                       {listing.mileage}
//                     </li>
//                     <li className="list-inline-item">
//                       <span className="flaticon-gas-station me-2" />
//                       {listing.fuelType}
//                     </li>
//                     <li className="list-inline-item">
//                       <span className="flaticon-gear me-2" />
//                       {listing.transmission}
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedFilterListing;

"use client";
import listingsData from "@/data/listingCar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FeaturedFilterListing = ({ category = "automobile" }) => {
  const [filter, setFilter] = useState("*");
  const isAutomobileView = category === "automobile";

  const visibleListings = listingsData.filter(
    (item) => (item.category || "automobile") === category
  );

  const filteredItems =
    filter === "*"
      ? visibleListings.slice(0, 8)
      : visibleListings.filter((item) => item.tags.includes(filter)).slice(0, 8);

  return (
    <div className="popular_listing_sliders ">
      {/* Nav tabs */}
      {isAutomobileView && (
        <div className="nav nav-tabs  justify-content-center">
          <button
            className={filter === "*" ? "active nav-link" : "nav-link"}
            onClick={() => setFilter("*")}
          >
            All Status
          </button>

          <button
            className={filter === "new" ? "active nav-link" : "nav-link"}
            onClick={() => setFilter("new")}
          >
            New Cars
          </button>
          <button
            className={filter === "used" ? "active nav-link" : "nav-link"}
            onClick={() => setFilter("used")}
          >
            Used Cars
          </button>
        </div>
      )}
      {/* Tab panes */}
      <div className="row">
        {filteredItems.map((listing) => (
          <div className="col-sm-6 col-xl-3" key={listing.id}>
            <div className="car-listing">
              <div className="thumb">
                {listing.featured ? (
                  <>
                    <div className="tag">FEATURED</div>
                  </>
                ) : undefined}
                {!listing.featured ? (
                  <>
                    <div className="tag blue">SPECIAL</div>
                  </>
                ) : undefined}

                <Image
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 284px"
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={listing.image}
                  alt={listing.title}
                />
                <div className="thmb_cntnt2">
                  <ul className="mb0">
                    <li className="list-inline-item">
                      <a className="text-white" href="#">
                        <span className="flaticon-photo-camera mr3" />{" "}
                        {listing.photosCount}
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="text-white" href="#">
                        <span className="flaticon-play-button mr3" />{" "}
                        {listing.videosCount}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="thmb_cntnt3">
                  <ul className="mb0">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-shuffle-arrows" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-heart" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="details">
                <div className="wrapper">
                  {listing.category !== "species" && (
                    <h5 className="price">¥{listing.price}</h5>
                  )}
                  <h6 className="title">
                    <Link href={`/listing-single-v1/${listing.id}`}>
                      {listing.title}
                    </Link>
                  </h6>
                  {listing.category === "species" ? (
                    <div className="listign_review">
                      <ul className="mb0">
                        <li className="list-inline-item text-success fw-semibold">
                          <i className="fa fa-check-circle me-2" />
                          Verified supplier
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="listign_review">
                      <ul className="mb0">
                        <li className="list-inline-item">
                          <span className="auction_grade">
                            Auction Grade: <strong>{listing.auctionGrade}</strong>
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>{" "}
                <div className={listing.category === "species" || listing.category === "auto-part" ? "listing_footer merchandise-meta" : "listing_footer"}>
                  {listing.category === "species" ? (
                    <>
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
                        <li className="list-inline-item">
                          <i className="fa fa-layer-group me-2" />
                          MOQ: {listing.minimumOrderQuantity || "N/A"}
                        </li>
                      </ul>
                      <Link
                        href={`/listing-single-v1/${listing.id}`}
                        className="btn btn-thm mt15 w-100"
                      >
                        Request Quote
                      </Link>
                    </>
                  ) : listing.category === "auto-part" ? (
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <i className="fa fa-cogs me-2" />
                        {listing.partCategory}
                      </li>
                      <li className="list-inline-item">
                        <i className="fa fa-tag me-2" />
                        {listing.brand}
                      </li>
                      <li className="list-inline-item">
                        <i className="fa fa-check-circle me-2" />
                        {listing.condition}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFilterListing;