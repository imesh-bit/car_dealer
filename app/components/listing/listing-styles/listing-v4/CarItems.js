// // import listingCar from "@/data/listingCar";
// // import Image from "next/image";
// // import Link from "next/link";

// // const CarItems = () => {
// //   return (
// //     <>
// //       {listingCar.slice(0, 5).map((listing) => (
// //         <div className="col-md-12 col-xl-12" key={listing.id}>
// //           <div className="car-listing list_style">
// //             <div className="thumb">
// //               {listing.featured ? (
// //                 <>
// //                   <div className="tag">FEATURED</div>
// //                 </>
// //               ) : undefined}
// //               {!listing.featured ? (
// //                 <>
// //                   <div className="tag blue">SPECIAL</div>
// //                 </>
// //               ) : undefined}

// //               <Image
// //                 width={260}
// //                 height={167}
// //                 style={{
// //                   width: "100%",
// //                   height: "100%",
// //                   objectFit: "cover",
// //                 }}
// //                 priority
// //                 src={listing.image}
// //                 alt={listing.title}
// //               />
// //               <div className="thmb_cntnt2">
// //                 <ul className="mb0">
// //                   <li className="list-inline-item">
// //                     <a className="text-white" href="#">
// //                       <span className="flaticon-photo-camera mr3" />{" "}
// //                       {listing.photosCount}
// //                     </a>
// //                   </li>
// //                   <li className="list-inline-item">
// //                     <a className="text-white" href="#">
// //                       <span className="flaticon-play-button mr3" />{" "}
// //                       {listing.videosCount}
// //                     </a>
// //                   </li>
// //                 </ul>
// //               </div>

// //               <div className="thmb_cntnt3">
// //                 <ul className="mb0">
// //                   <li className="list-inline-item">
// //                     <a href="#">
// //                       <span className="flaticon-shuffle-arrows" />
// //                     </a>
// //                   </li>
// //                   <li className="list-inline-item">
// //                     <a href="#">
// //                       <span className="flaticon-heart" />
// //                     </a>
// //                   </li>
// //                 </ul>
// //               </div>
// //             </div>
// //             {/* End thumb */}

// //             <div className="details">
// //               <div className="wrapper">
// //                 <h5 className="price">${listing.price}</h5>
// //                 <h6 className="title">
// //                   <Link href="/listing-single-v1">{listing.title}</Link>
// //                 </h6>
// //                 <div className="listign_review">
// //                   <ul className="mb0">
// //                     {[...Array(5)].map((_, index) => (
// //                       <li key={index} className="list-inline-item">
// //                         <a href="#">
// //                           <i className="fa fa-star" />
// //                         </a>
// //                       </li>
// //                     ))}
// //                     <li className="list-inline-item">
// //                       <a href="#">{listing.rating}</a>
// //                     </li>
// //                     <li className="list-inline-item">
// //                       ({listing.reviewsCount} reviews)
// //                     </li>
// //                   </ul>
// //                 </div>
// //               </div>
// //               {/* End wrapper */}

// //               <div className="listing_footer">
// //                 <ul className="mb0">
// //                   <li className="list-inline-item">
// //                     <span className="flaticon-road-perspective me-2" />
// //                     {listing.mileage}
// //                   </li>
// //                   <li className="list-inline-item">
// //                     <span className="flaticon-gas-station me-2" />
// //                     {listing.fuelType}
// //                   </li>
// //                   <li className="list-inline-item">
// //                     <span className="flaticon-gear me-2" />
// //                     {listing.transmission}
// //                   </li>
// //                 </ul>
// //                 {/* End car meta */}
// //                 <ul className="mb0 share-icons">
// //                   <li className="list-inline-item pointer">
// //                     <span className="flaticon-shuffle-arrows"></span>
// //                   </li>
// //                   <li className="list-inline-item pointer">
// //                     <span className="flaticon-heart"></span>
// //                   </li>
// //                 </ul>
// //                 {/* End share icon */}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </>
// //   );
// // };

// // export default CarItems;


// import listingCar from "@/data/listingCar";
// import Image from "next/image";
// import Link from "next/link";

// const CarItems = ({ status, make, model, price }) => {
//   const filteredListings = listingCar.filter((listing) => {
//     if (status === "Used Cars" && !listing.tags.includes("used")) return false;
//     if (status === "New Cars" && !listing.tags.includes("new")) return false;

//     if (make && make !== "Select Makes" && listing.make !== make) return false;

//     if (model && model !== "Select Models" && listing.model !== model)
//       return false;

//     if (price && price !== "All Price" && price !== "No max Price") {
//       // price arrives as something like "¥478" -> pull out the number
//       const maxPrice = Number(price.replace(/[^0-9]/g, ""));
//       if (!Number.isNaN(maxPrice) && listing.price > maxPrice) return false;
//     }

//     return true;
//   });

//   if (filteredListings.length === 0) {
//     return (
//       <div className="col-md-12 col-xl-12">
//         <p className="mt20 mb20">
//           No cars match your filters. Try adjusting your search.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {filteredListings.map((listing) => (
//         <div className="col-md-12 col-xl-12" key={listing.id}>
//           <div className="car-listing list_style">
//             <div className="thumb">
//               {listing.featured ? (
//                 <>
//                   <div className="tag">FEATURED</div>
//                 </>
//               ) : undefined}
//               {!listing.featured ? (
//                 <>
//                   <div className="tag blue">SPECIAL</div>
//                 </>
//               ) : undefined}

//               <Image
//                 width={260}
//                 height={167}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//                 priority
//                 src={listing.image}
//                 alt={listing.title}
//               />
//               <div className="thmb_cntnt2">
//                 <ul className="mb0">
//                   <li className="list-inline-item">
//                     <a className="text-white" href="#">
//                       <span className="flaticon-photo-camera mr3" />{" "}
//                       {listing.photosCount}
//                     </a>
//                   </li>
//                   <li className="list-inline-item">
//                     <a className="text-white" href="#">
//                       <span className="flaticon-play-button mr3" />{" "}
//                       {listing.videosCount}
//                     </a>
//                   </li>
//                 </ul>
//               </div>

//               <div className="thmb_cntnt3">
//                 <ul className="mb0">
//                   <li className="list-inline-item">
//                     <a href="#">
//                       <span className="flaticon-shuffle-arrows" />
//                     </a>
//                   </li>
//                   <li className="list-inline-item">
//                     <a href="#">
//                       <span className="flaticon-heart" />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             {/* End thumb */}

//             <div className="details">
//               <div className="wrapper">
//                 <h5 className="price">
//                   ¥{Number(listing.price).toLocaleString()}
//                 </h5>
//                 <h6 className="title">
//                   <Link href={`/listing-single-v1/${listing.id}`}>
//                     {listing.title}
//                   </Link>
//                 </h6>
//                 <div className="listign_review">
//                   <ul className="mb0">
//                     {[...Array(5)].map((_, index) => (
//                       <li key={index} className="list-inline-item">
//                         <a href="#">
//                           <i className="fa fa-star" />
//                         </a>
//                       </li>
//                     ))}
//                     <li className="list-inline-item">
//                       <a href="#">{listing.rating}</a>
//                     </li>
//                     <li className="list-inline-item">
//                       ({listing.reviewsCount} reviews)
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               {/* End wrapper */}

//               <div className="listing_footer">
//                 <ul className="mb0">
//                   <li className="list-inline-item">
//                     <span className="flaticon-road-perspective me-2" />
//                     {listing.mileage}
//                   </li>
//                   <li className="list-inline-item">
//                     <span className="flaticon-gas-station me-2" />
//                     {listing.fuelType}
//                   </li>
//                   <li className="list-inline-item">
//                     <span className="flaticon-gear me-2" />
//                     {listing.transmission}
//                   </li>
//                 </ul>
//                 {/* End car meta */}
//                 <ul className="mb0 share-icons">
//                   <li className="list-inline-item pointer">
//                     <span className="flaticon-shuffle-arrows"></span>
//                   </li>
//                   <li className="list-inline-item pointer">
//                     <span className="flaticon-heart"></span>
//                   </li>
//                 </ul>
//                 {/* End share icon */}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default CarItems;

import listingCar from "@/data/listingCar";
import Image from "next/image";
import Link from "next/link";

const CarItems = ({
  status,
  category,
  make,
  model,
  price,
  sort,
  bodyType,
  year,
  fuelType,
  transmission,
  doors,
  interiorColor,
  exteriorColor,
  cylinders,
  minMileage,
  maxMileage,
  vin,
  features,
  minPrice,
  maxPrice,
  partCategory,
  brand,
  speciesType,
  breed,
}) => {
  const selectedFeatures = features ? features.split(",") : [];
  const selectedCategory = category || "automobile";

  let filteredListings = listingCar.filter((listing) => {
    const listingCategory = listing.category || "automobile";

    if (selectedCategory && selectedCategory !== "all") {
      if (listingCategory !== selectedCategory) return false;
    }

    if (status === "Used Cars" && !listing.tags.includes("used")) return false;
    if (status === "New Cars" && !listing.tags.includes("new")) return false;

    if (make && make !== "Select Makes" && listing.make !== make) return false;

    if (model && model !== "Select Models" && listing.model !== model)
      return false;

    if (partCategory && partCategory !== "All Categories" && listing.partCategory !== partCategory)
      return false;

    if (brand && brand !== "Select Brand" && listing.brand !== brand)
      return false;

    if (speciesType && speciesType !== "Select Species Type" && listing.speciesType !== speciesType)
      return false;

    if (breed && breed !== "Select Breed" && listing.breed !== breed)
      return false;

    if (bodyType && bodyType !== "Select Type" && listing.bodyType !== bodyType)
      return false;

    if (year && year !== "Year" && String(listing.year) !== String(year))
      return false;

    if (
      fuelType &&
      fuelType !== "Fuel Type" &&
      listing.fuelType !== fuelType
    )
      return false;

    if (
      transmission &&
      transmission !== "Transmission" &&
      listing.transmission !== transmission
    )
      return false;

    if (doors && doors !== "Doors") {
      const doorsCount = Number(String(doors).replace(/[^0-9]/g, ""));
      if (Number(listing.doors) !== doorsCount) return false;
    }

    if (
      interiorColor &&
      interiorColor !== "Interior Color" &&
      listing.interiorColor !== interiorColor
    )
      return false;

    if (
      exteriorColor &&
      exteriorColor !== "Exterior Color" &&
      listing.color !== exteriorColor
    )
      return false;

    if (cylinders && cylinders !== "Cylinders") {
      if (String(listing.cylinders) !== String(cylinders)) return false;
    }

    if (minMileage && Number(listing.mileage) < Number(minMileage))
      return false;

    if (maxMileage && Number(listing.mileage) > Number(maxMileage))
      return false;

    if (vin && !listing.vin.toLowerCase().includes(vin.toLowerCase()))
      return false;

    // Legacy single "max price" value from HeroFilter, e.g. "¥478"
    if (price && price !== "All Price" && price !== "No max Price") {
      const maxPriceValue = Number(price.replace(/[^0-9]/g, ""));
      if (!Number.isNaN(maxPriceValue) && listing.price > maxPriceValue)
        return false;
    }

    // Range values from the AdvanceFilter price slider
    if (minPrice && listing.price < Number(minPrice)) return false;
    if (maxPrice && listing.price > Number(maxPrice)) return false;

    // Car must have every feature that was checked
    if (
      selectedFeatures.length > 0 &&
      !selectedFeatures.every((feature) =>
        (listing.features || []).some((category) =>
          category.items.includes(feature)
        )
      )
    )
      return false;

    return true;
  });

  // Sort By - the dropdown was originally labeled "Condition" but its
  // values are sort options; mapped onto the closest fields we have.
  if (sort === "Most Recent") {
    filteredListings = [...filteredListings].sort((a, b) => b.id - a.id);
  } else if (sort === "Recent") {
    filteredListings = [...filteredListings].sort((a, b) => b.views - a.views);
  } else if (sort === "Best Selling") {
    filteredListings = [...filteredListings].sort(
      (a, b) => b.reviewsCount - a.reviewsCount
    );
  } else if (sort === "Old Review") {
    filteredListings = [...filteredListings].sort(
      (a, b) => a.reviewsCount - b.reviewsCount
    );
  }

  if (filteredListings.length === 0) {
    return (
      <div className="col-md-12 col-xl-12">
        <p className="mt20 mb20">
          No cars match your filters. Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <>
      {filteredListings.map((listing) => (
        <div className="col-md-12 col-xl-12" key={listing.id}>
          <div className="car-listing list_style">
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 284px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
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
            {/* End thumb */}

            <div className="details">
              <div className="wrapper">
                <h5 className="price">
                  ¥{Number(listing.price).toLocaleString()}
                </h5>
                <h6 className="title">
                  <Link href={`/listing-single-v1/${listing.id}`}>
                    {listing.title}
                  </Link>
                </h6>
                <div className="listign_review">
                  <ul className="mb0">
                    {[...Array(5)].map((_, index) => (
                      <li key={index} className="list-inline-item">
                        <a href="#">
                          <i className="fa fa-star" />
                        </a>
                      </li>
                    ))}
                    <li className="list-inline-item">
                      <a href="#">{listing.rating}</a>
                    </li>
                    <li className="list-inline-item">
                      ({listing.reviewsCount} reviews)
                    </li>
                  </ul>
                </div>
              </div>
              {/* End wrapper */}

              <div className={listing.category === "species" ? "listing_footer merchandise-meta" : "listing_footer"}>
                {listing.category === "species" ? (
                  <ul className="mb0">
                    <li className="list-inline-item">{listing.productCategory}</li>
                    <li className="list-inline-item">{listing.packagingType}</li>
                    <li className="list-inline-item">{listing.orderScale}</li>
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
                {/* End car meta */}
                <ul className="mb0 share-icons">
                  <li className="list-inline-item pointer">
                    <span className="flaticon-shuffle-arrows"></span>
                  </li>
                  <li className="list-inline-item pointer">
                    <span className="flaticon-heart"></span>
                  </li>
                </ul>
                {/* End share icon */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CarItems;