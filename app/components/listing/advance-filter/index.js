// import AdvanceMainFilter from "./AdvanceMainFilter";
// import CheckBoxFilter from "./CheckBoxFilter";
// import MainFilter from "./MainFilter";
// import PriceRange from "./PriceRange";

// const AdvanceFilter = () => {
//   return (
//     <>
//       <div className="row">
//         <MainFilter />

//         <div className="col col-sm-4 col-lg-2">
//           <div className="advance_search_style">
//             <a
//               className="advance_dd_btn d-inline-flex"
//               href="#collapseAdvanceSearch"
//               data-bs-toggle="collapse"
//               role="button"
//               aria-expanded={false}
//               aria-controls="collapseAdvanceSearch"
//             >
//               <span className="flaticon-cogwheel" /> Advanced
//             </a>
//           </div>
//         </div>
//         {/* End .col */}

//         <div className="col col-sm-4 col-lg-2">
//           <div className="advance_search_style">
//             <a className="btn search_btn btn-thm" href="">
//               <span className="flaticon-magnifiying-glass" /> Search
//             </a>
//           </div>
//         </div>
//         {/* End .col */}
//       </div>
//       {/* End .row */}

//       <div className="collapse" id="collapseAdvanceSearch">
//         <div className="row bgc-thm2">
//           <AdvanceMainFilter />
//         </div>
//         {/* End .row */}

//         <div className="row">
//           <div className="col-sm-6 col-md-4 col-lg-3">
//             <div className="advance_search_style">
//               <div className="uilayout_range">
//                 <h6 className="ass_price_title text-white text-start">Price</h6>
//                 <PriceRange />
//               </div>
//             </div>
//           </div>
//           {/* End .col */}

//           <div className="col-sm-6 col-md-4 col-lg-6 ">
//             <h6 className="font-600 ass_price_title text-white text-start mb-3">
//               Features
//             </h6>
//             <CheckBoxFilter />
//           </div>
//           {/* End .col */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdvanceFilter;
"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import listingsData from "@/data/listingCar";
import AdvanceMainFilter from "./AdvanceMainFilter";
import CheckBoxFilter from "./CheckBoxFilter";
import MainFilter from "./MainFilter";
import PriceRange from "./PriceRange";

const emptyFilters = {
  sort: "Sort By",
  make: "Select Makes",
  model: "Select Models",
  bodyType: "Select Type",
  partCategory: "All Categories",
  brand: "Select Brand",
  productCategory: "Select Product Category",
  packagingType: "Select Packaging Type",
  orderScale: "Select Order Scale (MOQ)",
  year: "Year",
  fuelType: "Fuel Type",
  transmission: "Transmission",
  doors: "Doors",
  interiorColor: "Interior Color",
  exteriorColor: "Exterior Color",
  cylinders: "Cylinders",
  minMileage: "",
  maxMileage: "",
  vin: "",
  features: [],
};

const AdvanceFilter = ({ category = "automobile" }) => {
  const router = useRouter();

  // Real min/max price straight from the data, used as the slider bounds
  const priceBounds = useMemo(() => {
    const prices = listingsData.map((car) => car.price).filter(Boolean);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, []);

  const [filters, setFilters] = useState(emptyFilters);
  const [priceRange, setPriceRange] = useState({
    min: priceBounds.min,
    max: priceBounds.max,
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      // Model options depend on Make, so reset Model whenever Make changes
      if (key === "make") next.model = "Select Models";
      return next;
    });
  };

  const toggleFeature = (feature) => {
    setFilters((prev) => {
      const alreadySelected = prev.features.includes(feature);
      return {
        ...prev,
        features: alreadySelected
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filters.sort !== emptyFilters.sort) params.set("sort", filters.sort);
    if (category === "auto-part") {
      if (filters.partCategory !== emptyFilters.partCategory)
        params.set("partCategory", filters.partCategory);
      if (filters.brand !== emptyFilters.brand) params.set("brand", filters.brand);
    }
    if (category === "species") {
      if (filters.productCategory !== emptyFilters.productCategory)
        params.set("productCategory", filters.productCategory);
      if (filters.packagingType !== emptyFilters.packagingType)
        params.set("packagingType", filters.packagingType);
      if (filters.orderScale !== emptyFilters.orderScale)
        params.set("orderScale", filters.orderScale);
    }
    if (category === "automobile") {
      if (filters.make !== emptyFilters.make) params.set("make", filters.make);
      if (filters.model !== emptyFilters.model)
        params.set("model", filters.model);
    }
    if (filters.bodyType !== emptyFilters.bodyType)
      params.set("type", filters.bodyType);
    if (filters.year !== emptyFilters.year) params.set("year", filters.year);
    if (filters.fuelType !== emptyFilters.fuelType)
      params.set("fuelType", filters.fuelType);
    if (filters.transmission !== emptyFilters.transmission)
      params.set("transmission", filters.transmission);
    if (filters.doors !== emptyFilters.doors)
      params.set("doors", filters.doors);
    if (filters.interiorColor !== emptyFilters.interiorColor)
      params.set("interiorColor", filters.interiorColor);
    if (filters.exteriorColor !== emptyFilters.exteriorColor)
      params.set("exteriorColor", filters.exteriorColor);
    if (filters.cylinders !== emptyFilters.cylinders)
      params.set("cylinders", filters.cylinders);
    if (filters.minMileage) params.set("minMileage", filters.minMileage);
    if (filters.maxMileage) params.set("maxMileage", filters.maxMileage);
    if (filters.vin) params.set("vin", filters.vin);
    if (filters.features.length > 0)
      params.set("features", filters.features.join(","));

    if (priceRange.min !== priceBounds.min)
      params.set("minPrice", priceRange.min);
    if (priceRange.max !== priceBounds.max)
      params.set("maxPrice", priceRange.max);

    const queryString = params.toString();
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/listing-v4";
    router.push(queryString ? `${currentPath}?${queryString}` : currentPath);
  };

  return (
    <>
      <div className="row">
        <MainFilter filters={filters} updateFilter={updateFilter} category={category} />

        <div className="col col-sm-4 col-lg-2">
          <div className="advance_search_style">
            <a
              className="advance_dd_btn d-inline-flex"
              href="#collapseAdvanceSearch"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded={false}
              aria-controls="collapseAdvanceSearch"
            >
              <span className="flaticon-cogwheel" /> Advanced
            </a>
          </div>
        </div>
        {/* End .col */}

        <div className="col col-sm-4 col-lg-2">
          <div className="advance_search_style">
            <button
              type="button"
              className="btn search_btn btn-thm"
              onClick={handleSearch}
            >
              <span className="flaticon-magnifiying-glass" /> Search
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}

      <div className="collapse" id="collapseAdvanceSearch">
        <div className="row bgc-thm2">
          <AdvanceMainFilter filters={filters} updateFilter={updateFilter} />
        </div>
        {/* End .row */}

        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="advance_search_style">
              <div className="uilayout_range">
                <h6 className="ass_price_title text-white text-start">Price</h6>
                <PriceRange
                  bounds={priceBounds}
                  value={priceRange}
                  onChange={setPriceRange}
                />
              </div>
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-6 col-md-4 col-lg-6 ">
            <h6 className="font-600 ass_price_title text-white text-start mb-3">
              Features
            </h6>
            <CheckBoxFilter
              selectedFeatures={filters.features}
              onToggle={toggleFeature}
            />
          </div>
          {/* End .col */}
        </div>
      </div>
    </>
  );
};

export default AdvanceFilter;