

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useMergedListings } from "@/hooks/useMergedListings";

// const FeaturedFilterListing = ({ category = "automobile" }) => {
//   const [filter, setFilter] = useState("*");
//   const isAutomobileView = category === "automobile";
//   const mergedListings = useMergedListings();
//   const searchParams = useSearchParams();
//   const featuredParam = searchParams?.get ? searchParams.get("featured") : null;

//   const visibleListings = mergedListings.filter(
//     (item) => (item.category || "automobile") === category
//   );

//   // If ?featured=1 is present, show only featured listings
//   const onlyFeatured = featuredParam === "1" || featuredParam === "true";
//   const listingsForDisplay = onlyFeatured
//     ? visibleListings.filter((l) => l.featured)
//     : visibleListings;

//   const filteredItems =
//     filter === "*"
//       ? listingsForDisplay.slice(0, 8)
//       : listingsForDisplay.filter((item) => item.tags.includes(filter)).slice(0, 8);

//   return (
//     <div className="popular_listing_sliders ">
//       {/* Nav tabs */}
//       {isAutomobileView && (
//         <div className="nav nav-tabs  justify-content-center">
//           <button
//             className={filter === "*" ? "active nav-link" : "nav-link"}
//             onClick={() => setFilter("*")}
//           >
//             All Status
//           </button>

//           <button
//             className={filter === "new" ? "active nav-link" : "nav-link"}
//             onClick={() => setFilter("new")}
//           >
//             New Cars
//           </button>
//           <button
//             className={filter === "used" ? "active nav-link" : "nav-link"}
//             onClick={() => setFilter("used")}
//           >
//             Used Cars
//           </button>
//         </div>
//       )}
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
//                   fill
//                   sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 284px"
//                   className="w-100 h-100"
//                   style={{
//                     objectFit: "cover",
//                     objectPosition: "center",
//                   }}
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
//                   {listing.category !== "species" && (
//                     <h5 className="price">¥{listing.price}</h5>
//                   )}
//                   <h6 className="title">
//                     <Link href={`/listing-single-v1/${listing.id}`}>
//                       {listing.title}
//                     </Link>
//                   </h6>
//                   {listing.category === "species" ? (
//                     <div className="listign_review">
//                       <ul className="mb0">
//                         <li className="list-inline-item text-success fw-semibold">
//                           <i className="fa fa-check-circle me-2" />
//                           Verified supplier
//                         </li>
//                       </ul>
//                     </div>
//                   ) : (
//                     <p style={{ margin: "4px 0", fontSize: "13px", color: "#666" }}>
//                       Auction Grade: <strong>{listing.auctionGrade}</strong>
//                     </p>
//                   )}
//                 </div>{" "}
//                 <div className={listing.category === "species" || listing.category === "auto-part" ? "listing_footer merchandise-meta" : "listing_footer"}>
//                   {listing.category === "species" ? (
//                     <>
//                       <ul className="mb0">
//                         <li className="list-inline-item">
//                           <i className="fa fa-cube me-2" />
//                           {listing.productCategory}
//                         </li>
//                         <li className="list-inline-item">
//                           <i className="fa fa-box me-2" />
//                           {listing.packagingType}
//                         </li>
//                         <li className="list-inline-item">
//                           <i className="fa fa-truck me-2" />
//                           {listing.orderScale}
//                         </li>
//                         <li className="list-inline-item">
//                           <i className="fa fa-layer-group me-2" />
//                           MOQ: {listing.minimumOrderQuantity || "N/A"}
//                         </li>
//                       </ul>
//                       {/* <Link
//                         href={`/listing-single-v1/${listing.id}`}
//                         className="btn btn-thm mt15 w-100 home1-request-quote-btn"
//                       >
//                         Request Quote
//                       </Link> */}
//                     </>
//                   ) : listing.category === "auto-part" ? (
//                     <ul className="mb0">
//                       <li className="list-inline-item">
//                         <i className="fa fa-cogs me-2" />
//                         {listing.partCategory}
//                       </li>
//                       <li className="list-inline-item">
//                         <i className="fa fa-tag me-2" />
//                         {listing.brand}
//                       </li>
//                       <li className="list-inline-item">
//                         <i className="fa fa-check-circle me-2" />
//                         {listing.condition}
//                       </li>
//                     </ul>
//                   ) : (
//                     <>
//                       <ul className="mb0">
//                         <li className="list-inline-item">
//                           <span className="flaticon-road-perspective me-2" />
//                           {listing.mileage}
//                         </li>
//                         <li className="list-inline-item">
//                           <span className="flaticon-gas-station me-2" />
//                           {listing.fuelType}
//                         </li>
//                         <li className="list-inline-item">
//                           <span className="flaticon-gear me-2" />
//                           {listing.transmission}
//                         </li>
//                       </ul>
//                       {/* <Link
//                         href={`/listing-single-v1/${listing.id}`}
//                         className="btn btn-thm mt15 w-100 home1-request-quote-btn"
//                       >
//                         Request Quote
//                       </Link> */}
//                     </>
//                   )}
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
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMergedListings } from "@/hooks/useMergedListings";

const FILTERS = [
  { key: "*", label: "All Status" },
  { key: "new", label: "New Cars" },
  { key: "used", label: "Used Cars" },
];

const formatPrice = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString("en-US") : value;
};

const FeaturedFilterListing = ({ category = "automobile" }) => {
  const [filter, setFilter] = useState("*");
  const [favorites, setFavorites] = useState(() => new Set());
  const isAutomobileView = category === "automobile";
  const mergedListings = useMergedListings();
  const searchParams = useSearchParams();
  const featuredParam = searchParams?.get ? searchParams.get("featured") : null;

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visibleListings = useMemo(
    () =>
      (mergedListings || []).filter(
        (item) => (item.category || "automobile") === category
      ),
    [mergedListings, category]
  );

  const onlyFeatured = featuredParam === "1" || featuredParam === "true";
  const listingsForDisplay = onlyFeatured
    ? visibleListings.filter((l) => l.featured)
    : visibleListings;

  const filteredItems =
    filter === "*"
      ? listingsForDisplay.slice(0, 8)
      : listingsForDisplay.filter((item) => item.tags.includes(filter)).slice(0, 8);

  const isLoading = mergedListings === undefined || mergedListings === null;

  return (
    <div className="popular_listing_sliders">
      {isAutomobileView && (
        <div className="nav nav-tabs justify-content-center listing-filter-tabs" role="tablist">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className={filter === key ? "active nav-link" : "nav-link"}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="row">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div className="col-sm-6 col-xl-3" key={`skeleton-${i}`}>
              <div className="car-listing skeleton-card" aria-hidden="true">
                <div className="thumb skeleton-thumb" />
                <div className="details">
                  <div className="skeleton-line skeleton-line--price" />
                  <div className="skeleton-line skeleton-line--title" />
                  <div className="skeleton-line skeleton-line--meta" />
                </div>
              </div>
            </div>
          ))}

        {!isLoading && filteredItems.length === 0 && (
          <div className="col-12">
            <div className="listing-empty-state">
              <span className="flaticon-search" aria-hidden="true" />
              <h6>No listings match this filter</h6>
              <p>Try a different status, or check back soon — new listings are added regularly.</p>
              {filter !== "*" && (
                <button type="button" className="btn btn-thm" onClick={() => setFilter("*")}>
                  Clear filter
                </button>
              )}
            </div>
          </div>
        )}

        {!isLoading &&
          filteredItems.map((listing) => {
            const isFavorited = favorites.has(listing.id);
            return (
              <div className="col-sm-6 col-xl-3" key={listing.id}>
                <div className="car-listing">
                  <div className="thumb">
                    {listing.featured ? (
                      <div className="tag">FEATURED</div>
                    ) : (
                      <div className="tag blue">SPECIAL</div>
                    )}

                    <Image
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 284px"
                      className="w-100 h-100 listing-img"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      src={listing.image}
                      alt={`${listing.title}${listing.auctionGrade ? ` — grade ${listing.auctionGrade}` : ""}`}
                    />

                    <div className="thmb_cntnt2">
                      <ul className="mb0">
                        <li className="list-inline-item">
                          <span className="text-white">
                            <span className="flaticon-photo-camera mr3" aria-hidden="true" />{" "}
                            {listing.photosCount}
                          </span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-white">
                            <span className="flaticon-play-button mr3" aria-hidden="true" />{" "}
                            {listing.videosCount}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="thmb_cntnt3">
                      <ul className="mb0">
                        <li className="list-inline-item">
                          <button
                            type="button"
                            className="icon-btn"
                            aria-label="Add to compare"
                            onClick={(e) => e.preventDefault()}
                          >
                            <span className="flaticon-shuffle-arrows" aria-hidden="true" />
                          </button>
                        </li>
                        <li className="list-inline-item">
                          <button
                            type="button"
                            className={isFavorited ? "icon-btn is-active" : "icon-btn"}
                            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                            aria-pressed={isFavorited}
                            onClick={() => toggleFavorite(listing.id)}
                          >
                            <span className="flaticon-heart" aria-hidden="true" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="details">
                    <div className="wrapper">
                      {listing.category !== "species" && (
                        <h5 className="price">¥{formatPrice(listing.price)}</h5>
                      )}
                      <h6 className="title" title={listing.title}>
                        <Link href={`/listing-single-v1/${listing.id}`}>{listing.title}</Link>
                      </h6>
                      {listing.category === "species" ? (
                        <div className="listign_review">
                          <ul className="mb0">
                            <li className="list-inline-item text-success fw-semibold">
                              <i className="fa fa-check-circle me-2" aria-hidden="true" />
                              Verified supplier
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <p className="grade-line">
                          Auction Grade: <strong className="grade-badge">{listing.auctionGrade}</strong>
                        </p>
                      )}
                    </div>

                    <div
                      className={
                        listing.category === "species" || listing.category === "auto-part"
                          ? "listing_footer merchandise-meta"
                          : "listing_footer"
                      }
                    >
                      {listing.category === "species" ? (
                        <ul className="mb0">
                          <li className="list-inline-item">
                            <i className="fa fa-cube me-2" aria-hidden="true" />
                            {listing.productCategory}
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-box me-2" aria-hidden="true" />
                            {listing.packagingType}
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-truck me-2" aria-hidden="true" />
                            {listing.orderScale}
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-layer-group me-2" aria-hidden="true" />
                            MOQ: {listing.minimumOrderQuantity || "N/A"}
                          </li>
                        </ul>
                      ) : listing.category === "auto-part" ? (
                        <ul className="mb0">
                          <li className="list-inline-item">
                            <i className="fa fa-cogs me-2" aria-hidden="true" />
                            {listing.partCategory}
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-tag me-2" aria-hidden="true" />
                            {listing.brand}
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-check-circle me-2" aria-hidden="true" />
                            {listing.condition}
                          </li>
                        </ul>
                      ) : (
                        <ul className="mb0">
                          <li className="list-inline-item">
                            <span className="flaticon-road-perspective me-2" aria-hidden="true" />
                            {listing.mileage}
                          </li>
                          <li className="list-inline-item">
                            <span className="flaticon-gas-station me-2" aria-hidden="true" />
                            {listing.fuelType}
                          </li>
                          <li className="list-inline-item">
                            <span className="flaticon-gear me-2" aria-hidden="true" />
                            {listing.transmission}
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <style jsx>{`
        .listing-filter-tabs {
          gap: 8px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .listing-filter-tabs .nav-link {
          border-radius: 999px;
          padding: 8px 20px;
          border: 1px solid #e5e5e5;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }
        .listing-filter-tabs .nav-link.active {
          transform: scale(1.02);
        }

        .car-listing {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border-radius: 12px;
          overflow: hidden;
        }
        .car-listing:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
        }
        .car-listing:hover :global(.listing-img) {
          transform: scale(1.06);
        }
        :global(.listing-img) {
          transition: transform 0.5s ease;
        }

        .icon-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.15s ease, background-color 0.15s ease;
        }
        .icon-btn:hover {
          transform: scale(1.1);
        }
        .icon-btn.is-active {
          background: #ff5a5f;
          color: #fff;
        }

        .title {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .grade-badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 6px;
          background: #f2f4f7;
          margin-left: 4px;
        }
        .grade-line {
          margin: 4px 0;
          font-size: 13px;
          color: #666;
        }

        .skeleton-card {
          pointer-events: none;
        }
        .skeleton-thumb {
          aspect-ratio: 4 / 3;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        .skeleton-line {
          height: 12px;
          border-radius: 6px;
          margin: 10px 0;
          background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        .skeleton-line--price {
          width: 40%;
        }
        .skeleton-line--title {
          width: 80%;
        }
        .skeleton-line--meta {
          width: 60%;
        }
        @keyframes shimmer {
          0% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0 50%;
          }
        }

        .listing-empty-state {
          text-align: center;
          padding: 64px 24px;
          color: #667085;
        }
        .listing-empty-state span {
          font-size: 40px;
          display: inline-block;
          margin-bottom: 12px;
          opacity: 0.6;
        }
        .listing-empty-state h6 {
          color: #1d2939;
          margin-bottom: 6px;
        }
        .listing-empty-state p {
          max-width: 360px;
          margin: 0 auto 16px;
        }

        @media (prefers-reduced-motion: reduce) {
          .car-listing,
          .car-listing:hover,
          :global(.listing-img),
          .icon-btn,
          .skeleton-thumb,
          .skeleton-line {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedFilterListing;