// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const HeroFilter = () => {
//   const router = useRouter();

//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const filters = [
//     {
//       label: "Make",
//       options: [
//         "Select Makes",
//         "Audi",
//         "Bentley",
//         "BMW",
//         "Ford",
//         "Honda",
//         "Mercedes",
//       ],
//     },
//     {
//       label: "Models",
//       options: ["Select Models", "A3 Sportback", "A4", "A6", "Q5"],
//     },
//     {
//       label: "Price",
//       options: [
//         "All Price",
//         "No max Price",
//         "$2,000",
//         "$5,000",
//         "$10,000",
//         "$15,000",
//         "$6,000",
//       ],
//     },
//   ];

//   const handleStatusClick = (status) => {
//     setSelectedStatus(status);
//   };

//   return (
//     <div className="col-lg-12">
//       <ul className="nav nav-pills justify-content-center">
//         <li className="nav-item" role="presentation">
//           <button
//             className={`nav-link ${
//               selectedStatus === "All Status" && "active"
//             }`}
//             onClick={() => handleStatusClick("All Status")}
//           >
//             All Status
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className={`nav-link ${selectedStatus === "Used Cars" && "active"}`}
//             onClick={() => handleStatusClick("Used Cars")}
//           >
//             Used Cars
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className={`nav-link ${selectedStatus === "New Cars" && "active"}`}
//             onClick={() => handleStatusClick("New Cars")}
//           >
//             New Cars
//           </button>
//         </li>
//       </ul>

//       {/* filter tabs */}
//       <div className="adss_bg_stylehome1">
//         <div className="home1_advance_search_wrapper">
//           <ul className="mb0 text-center">
//             {filters
//               .filter((filter) => filter.label !== selectedStatus)
//               .map((filter) => (
//                 <li className="list-inline-item" key={filter.label}>
//                   <div className="select-boxes">
//                     <div className="car_brand">
//                       <h6 className="title">{filter.label}</h6>
//                       <select className="form-select">
//                         {filter.options.map((option) => (
//                           <option key={option}>{option}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </li>
//               ))}

//             {/* Search button */}
//             <li className="list-inline-item">
//               <div className="d-block">
//                 <button
//                   onClick={() => router.push("/listing-v4")}
//                   className="btn btn-thm advnc_search_form_btn"
//                 >
//                   <span className="flaticon-magnifiying-glass" />
//                   Search
//                 </button>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroFilter;

// "use client";
// import { useRouter } from "next/navigation";
// import { useMemo, useState } from "react";
// import listingsData from "@/data/listingCar";

// const tabs = ["Automobiles", "Auto Parts", "General"];

// const tabCategoryMap = {
//   Automobiles: "automobile",
//   "Auto Parts": "auto-part",
//   "General": "species",
// };

// const buildPriceOptions = (sourceListings) => {
//   const prices = sourceListings.map((item) => item.price).filter(Boolean);

//   if (prices.length === 0) return ["All Price"];

//   const max = Math.max(...prices);
//   const step = Math.max(1, Math.ceil(max / 5));
//   const bands = Array.from({ length: 5 }, (_, index) => step * (index + 1));

//   return [
//     "All Price",
//     "No max Price",
//     ...bands.map((band) => `¥${band.toLocaleString()}`),
//   ];
// };

// const HeroFilter = () => {
//   const router = useRouter();

//   const [selectedTab, setSelectedTab] = useState("Automobiles");
//   const [selectedMake, setSelectedMake] = useState("Select Makes");
//   const [selectedModel, setSelectedModel] = useState("Select Models");
//   const [selectedPrice, setSelectedPrice] = useState("All Price");
//   const [selectedPartCategory, setSelectedPartCategory] = useState(
//     "All Categories"
//   );
//   const [selectedBrand, setSelectedBrand] = useState("Select Brand");
//   const [selectedProductCategory, setSelectedProductCategory] = useState(
//     "Select Product Category"
//   );
//   const [selectedPackagingType, setSelectedPackagingType] = useState(
//     "Select Packaging Type"
//   );
//   const [selectedOrderScale, setSelectedOrderScale] = useState(
//     "Select Order Scale (MOQ)"
//   );

//   const automobileListings = useMemo(
//     () =>
//       listingsData.filter(
//         (listing) => (listing.category || "automobile") === "automobile"
//       ),
//     []
//   );

//   const autoPartListings = useMemo(
//     () =>
//       listingsData.filter(
//         (listing) => (listing.category || "automobile") === "auto-part"
//       ),
//     []
//   );

//   const speciesListings = useMemo(
//     () =>
//       listingsData.filter(
//         (listing) => (listing.category || "automobile") === "species"
//       ),
//     []
//   );

//   const activeListings = useMemo(() => {
//     if (selectedTab === "Auto Parts") return autoPartListings;
//     if (selectedTab === "General") return speciesListings;
//     return automobileListings;
//   }, [selectedTab, autoPartListings, speciesListings, automobileListings]);

//   const makeOptions = useMemo(() => {
//     const makes = [
//       ...new Set(automobileListings.map((car) => car.make).filter(Boolean)),
//     ].sort();
//     return ["Select Makes", ...makes];
//   }, [automobileListings]);

//   const modelOptions = useMemo(() => {
//     const relevantCars =
//       selectedMake === "Select Makes"
//         ? automobileListings
//         : automobileListings.filter((car) => car.make === selectedMake);

//     const models = [
//       ...new Set(relevantCars.map((car) => car.model).filter(Boolean)),
//     ].sort();

//     return ["Select Models", ...models];
//   }, [selectedMake, automobileListings]);

//   const partCategoryOptions = useMemo(() => {
//     const categories = [
//       ...new Set(autoPartListings.map((item) => item.partCategory).filter(Boolean)),
//     ].sort();

//     return ["All Categories", ...categories];
//   }, [autoPartListings]);

//   const brandOptions = useMemo(() => {
//     const brands = [
//       ...new Set(autoPartListings.map((item) => item.brand).filter(Boolean)),
//     ].sort();

//     return ["Select Brand", ...brands];
//   }, [autoPartListings]);

//   const productCategoryOptions = useMemo(() => {
//     const productCategories = [
//       ...new Set(
//         speciesListings.map((item) => item.productCategory).filter(Boolean)
//       ),
//     ].sort();

//     return ["Select Product Category", ...productCategories];
//   }, [speciesListings]);

//   const packagingTypeOptions = useMemo(() => {
//     const packagingTypes = [
//       ...new Set(
//         speciesListings.map((item) => item.packagingType).filter(Boolean)
//       ),
//     ].sort();

//     return ["Select Packaging Type", ...packagingTypes];
//   }, [speciesListings]);

//   const orderScaleOptions = useMemo(() => {
//     const orderScales = [
//       ...new Set(speciesListings.map((item) => item.orderScale).filter(Boolean)),
//     ].sort();

//     return ["Select Order Scale (MOQ)", ...orderScales];
//   }, [speciesListings]);

//   const priceOptions = useMemo(
//     () => buildPriceOptions(activeListings),
//     [activeListings]
//   );

//   const handleMakeChange = (value) => {
//     setSelectedMake(value);
//     setSelectedModel("Select Models");
//   };

//   const handleProductCategoryChange = (value) => {
//     setSelectedProductCategory(value);
//   };

//   const handlePackagingTypeChange = (value) => {
//     setSelectedPackagingType(value);
//   };

//   const handleOrderScaleChange = (value) => {
//     setSelectedOrderScale(value);
//   };

//   const tabsConfig = useMemo(() => {
//     if (selectedTab === "Auto Parts") {
//       return [
//         {
//           label: "Category",
//           options: partCategoryOptions,
//           value: selectedPartCategory,
//           onChange: setSelectedPartCategory,
//         },
//         {
//           label: "Brand",
//           options: brandOptions,
//           value: selectedBrand,
//           onChange: setSelectedBrand,
//         },
//         {
//           label: "Price",
//           options: priceOptions,
//           value: selectedPrice,
//           onChange: setSelectedPrice,
//         },
//       ];
//     }

//     if (selectedTab === "General") {
//       return [
//         {
//           label: "Product Category",
//           options: productCategoryOptions,
//           value: selectedProductCategory,
//           onChange: handleProductCategoryChange,
//         },
//         {
//           label: "Packaging Type",
//           options: packagingTypeOptions,
//           value: selectedPackagingType,
//           onChange: handlePackagingTypeChange,
//         },
//         {
//           label: "Order Scale (MOQ)",
//           options: orderScaleOptions,
//           value: selectedOrderScale,
//           onChange: handleOrderScaleChange,
//         },
//       ];
//     }

//     return [
//       {
//         label: "Make",
//         options: makeOptions,
//         value: selectedMake,
//         onChange: handleMakeChange,
//       },
//       {
//         label: "Models",
//         options: modelOptions,
//         value: selectedModel,
//         onChange: setSelectedModel,
//       },
//       {
//         label: "Price",
//         options: priceOptions,
//         value: selectedPrice,
//         onChange: setSelectedPrice,
//       },
//     ];
//   }, [
//     selectedTab,
//     partCategoryOptions,
//     selectedPartCategory,
//     brandOptions,
//     selectedBrand,
//     priceOptions,
//     selectedPrice,
//     productCategoryOptions,
//     selectedProductCategory,
//     packagingTypeOptions,
//     selectedPackagingType,
//     orderScaleOptions,
//     selectedOrderScale,
//     makeOptions,
//     selectedMake,
//     modelOptions,
//     selectedModel,
//   ]);

//   const handleTabClick = (tab) => {
//     if (tab === selectedTab) return;

//     const nextCategory = tabCategoryMap[tab];

//     setSelectedTab(tab);
//     setSelectedMake("Select Makes");
//     setSelectedModel("Select Models");
//     setSelectedPrice("All Price");
//     setSelectedPartCategory("All Categories");
//     setSelectedBrand("Select Brand");
//     setSelectedProductCategory("Select Product Category");
//     setSelectedPackagingType("Select Packaging Type");
//     setSelectedOrderScale("Select Order Scale (MOQ)");

//     router.push(`/?category=${encodeURIComponent(nextCategory)}`);
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     const selectedCategory = tabCategoryMap[selectedTab];

//     params.set("category", selectedCategory);

//     if (selectedTab === "Automobiles") {
//       if (selectedMake !== "Select Makes") params.set("make", selectedMake);
//       if (selectedModel !== "Select Models")
//         params.set("model", selectedModel);
//     }

//     if (selectedTab === "Auto Parts") {
//       if (selectedPartCategory !== "All Categories")
//         params.set("partCategory", selectedPartCategory);
//       if (selectedBrand !== "Select Brand") params.set("brand", selectedBrand);
//     }

//     if (selectedTab === "General") {
//       if (selectedProductCategory !== "Select Product Category")
//         params.set("productCategory", selectedProductCategory);
//       if (selectedPackagingType !== "Select Packaging Type")
//         params.set("packagingType", selectedPackagingType);
//       if (selectedOrderScale !== "Select Order Scale (MOQ)")
//         params.set("orderScale", selectedOrderScale);
//     }

//     if (selectedPrice !== "All Price") params.set("price", selectedPrice);

//     const queryString = params.toString();
//     router.push(queryString ? `/listing-v1?${queryString}` : "/listing-v1");
//   };

//   return (
//     <div className="col-lg-12">
//       <ul className="nav nav-pills justify-content-center">
//         {tabs.map((tab) => (
//           <li className="nav-item" role="presentation" key={tab}>
//             <button
//               className={`nav-link ${selectedTab === tab && "active"}`}
//               onClick={() => handleTabClick(tab)}
//             >
//               {tab}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* filter tabs */}
//       <div className="adss_bg_stylehome1">
//         <div className="home1_advance_search_wrapper">
//           <ul className="mb0 text-center">
//             {tabsConfig.map((filter) => (
//               <li className="list-inline-item" key={filter.label}>
//                 <div className="select-boxes">
//                   <div className="car_brand">
//                     <h6 className="title">{filter.label}</h6>
//                     <select
//                       className="form-select"
//                       value={filter.value}
//                       onChange={(e) => filter.onChange(e.target.value)}
//                     >
//                       {filter.options.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </li>
//             ))}

//             {/* Search button */}
//             <li className="list-inline-item">
//               <div className="d-block">
//                 <button
//                   onClick={handleSearch}
//                   className="btn btn-thm advnc_search_form_btn"
//                 >
//                   <span className="flaticon-magnifiying-glass" />
//                   Search
//                 </button>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroFilter;


// "use client";
// import { useRouter } from "next/navigation";
// import { useMemo, useState } from "react";
// import listingsData from "@/data/listingCar";

// const tabs = ["Automobiles", "Auto Parts", "General"];

// const tabCategoryMap = {
//   Automobiles: "automobile",
//   "Auto Parts": "auto-part",
//   "General": "species",
// };

// const buildPriceOptions = (sourceListings) => {
//   const prices = sourceListings.map((item) => item.price).filter(Boolean);

//   if (prices.length === 0) return ["All Price"];

//   const max = Math.max(...prices);
//   const step = Math.max(1, Math.ceil(max / 5));
//   const bands = Array.from({ length: 5 }, (_, index) => step * (index + 1));

//   return [
//     "All Price",
//     "No max Price",
//     ...bands.map((band) => `¥${band.toLocaleString()}`),
//   ];
// };

// const HeroFilter = () => {
//   const router = useRouter();

//   const [selectedTab, setSelectedTab] = useState("Automobiles");
//   const [selectedMake, setSelectedMake] = useState("Select Makes");
//   const [selectedModel, setSelectedModel] = useState("Select Models");
//   const [selectedPrice, setSelectedPrice] = useState("All Price");
//   const [selectedPartCategory, setSelectedPartCategory] = useState(
//     "All Categories"
//   );
//   const [selectedBrand, setSelectedBrand] = useState("Select Brand");
//   const [selectedProductCategory, setSelectedProductCategory] = useState(
//     "Select Product Category"
//   );
//   const [selectedPackagingType, setSelectedPackagingType] = useState(
//     "Select Packaging Type"
//   );
//   const [selectedOrderScale, setSelectedOrderScale] = useState(
//     "Select Order Scale (MOQ)"
//   );

//   const automobileListings = useMemo(
//     () =>
//       listingsData.filter(
//         (listing) => (listing.category || "automobile") === "automobile"
//       ),
//     []
//   );

//   const autoPartListings = useMemo(
//     () =>
//       listingsData.filter(
//         (listing) => (listing.category || "automobile") === "auto-part"
//       ),
//     []
//   );

//   const speciesListings = useMemo(
//     () =>
//       listingsData.filter(
//         (listing) => (listing.category || "automobile") === "species"
//       ),
//     []
//   );

//   const activeListings = useMemo(() => {
//     if (selectedTab === "Auto Parts") return autoPartListings;
//     if (selectedTab === "General") return speciesListings;
//     return automobileListings;
//   }, [selectedTab, autoPartListings, speciesListings, automobileListings]);

//   const makeOptions = useMemo(() => {
//     const makes = [
//       ...new Set(automobileListings.map((car) => car.make).filter(Boolean)),
//     ].sort();
//     return ["Select Makes", ...makes];
//   }, [automobileListings]);

//   const modelOptions = useMemo(() => {
//     const relevantCars =
//       selectedMake === "Select Makes"
//         ? automobileListings
//         : automobileListings.filter((car) => car.make === selectedMake);

//     const models = [
//       ...new Set(relevantCars.map((car) => car.model).filter(Boolean)),
//     ].sort();

//     return ["Select Models", ...models];
//   }, [selectedMake, automobileListings]);

//   const partCategoryOptions = useMemo(() => {
//     const categories = [
//       ...new Set(autoPartListings.map((item) => item.partCategory).filter(Boolean)),
//     ].sort();

//     return ["All Categories", ...categories];
//   }, [autoPartListings]);

//   const brandOptions = useMemo(() => {
//     const brands = [
//       ...new Set(autoPartListings.map((item) => item.brand).filter(Boolean)),
//     ].sort();

//     return ["Select Brand", ...brands];
//   }, [autoPartListings]);

//   const productCategoryOptions = useMemo(() => {
//     const productCategories = [
//       ...new Set(
//         speciesListings.map((item) => item.productCategory).filter(Boolean)
//       ),
//     ].sort();

//     return ["Select Product Category", ...productCategories];
//   }, [speciesListings]);

//   const packagingTypeOptions = useMemo(() => {
//     const packagingTypes = [
//       ...new Set(
//         speciesListings.map((item) => item.packagingType).filter(Boolean)
//       ),
//     ].sort();

//     return ["Select Packaging Type", ...packagingTypes];
//   }, [speciesListings]);

//   const orderScaleOptions = useMemo(() => {
//     const orderScales = [
//       ...new Set(speciesListings.map((item) => item.orderScale).filter(Boolean)),
//     ].sort();

//     return ["Select Order Scale (MOQ)", ...orderScales];
//   }, [speciesListings]);

//   const priceOptions = useMemo(
//     () => buildPriceOptions(activeListings),
//     [activeListings]
//   );

//   const handleMakeChange = (value) => {
//     setSelectedMake(value);
//     setSelectedModel("Select Models");
//   };

//   const handleProductCategoryChange = (value) => {
//     setSelectedProductCategory(value);
//   };

//   const handlePackagingTypeChange = (value) => {
//     setSelectedPackagingType(value);
//   };

//   const handleOrderScaleChange = (value) => {
//     setSelectedOrderScale(value);
//   };

//   const tabsConfig = useMemo(() => {
//     if (selectedTab === "Auto Parts") {
//       return [
//         {
//           label: "Category",
//           options: partCategoryOptions,
//           value: selectedPartCategory,
//           onChange: setSelectedPartCategory,
//         },
//         {
//           label: "Brand",
//           options: brandOptions,
//           value: selectedBrand,
//           onChange: setSelectedBrand,
//         },
//         {
//           label: "Price",
//           options: priceOptions,
//           value: selectedPrice,
//           onChange: setSelectedPrice,
//         },
//       ];
//     }

//     if (selectedTab === "General") {
//       return [
//         {
//           label: "Product Category",
//           options: productCategoryOptions,
//           value: selectedProductCategory,
//           onChange: handleProductCategoryChange,
//         },
//         {
//           label: "Packaging Type",
//           options: packagingTypeOptions,
//           value: selectedPackagingType,
//           onChange: handlePackagingTypeChange,
//         },
//         {
//           label: "Order Scale (MOQ)",
//           options: orderScaleOptions,
//           value: selectedOrderScale,
//           onChange: handleOrderScaleChange,
//         },
//       ];
//     }

//     return [
//       {
//         label: "Make",
//         options: makeOptions,
//         value: selectedMake,
//         onChange: handleMakeChange,
//       },
//       {
//         label: "Models",
//         options: modelOptions,
//         value: selectedModel,
//         onChange: setSelectedModel,
//       },
//       {
//         label: "Price",
//         options: priceOptions,
//         value: selectedPrice,
//         onChange: setSelectedPrice,
//       },
//     ];
//   }, [
//     selectedTab,
//     partCategoryOptions,
//     selectedPartCategory,
//     brandOptions,
//     selectedBrand,
//     priceOptions,
//     selectedPrice,
//     productCategoryOptions,
//     selectedProductCategory,
//     packagingTypeOptions,
//     selectedPackagingType,
//     orderScaleOptions,
//     selectedOrderScale,
//     makeOptions,
//     selectedMake,
//     modelOptions,
//     selectedModel,
//   ]);

//   const handleTabClick = (tab) => {
//     if (tab === selectedTab) return;

//     const nextCategory = tabCategoryMap[tab];

//     setSelectedTab(tab);
//     setSelectedMake("Select Makes");
//     setSelectedModel("Select Models");
//     setSelectedPrice("All Price");
//     setSelectedPartCategory("All Categories");
//     setSelectedBrand("Select Brand");
//     setSelectedProductCategory("Select Product Category");
//     setSelectedPackagingType("Select Packaging Type");
//     setSelectedOrderScale("Select Order Scale (MOQ)");

//     router.push(`/?category=${encodeURIComponent(nextCategory)}`);
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     const selectedCategory = tabCategoryMap[selectedTab];

//     params.set("category", selectedCategory);

//     if (selectedTab === "Automobiles") {
//       if (selectedMake !== "Select Makes") params.set("make", selectedMake);
//       if (selectedModel !== "Select Models")
//         params.set("model", selectedModel);
//     }

//     if (selectedTab === "Auto Parts") {
//       if (selectedPartCategory !== "All Categories")
//         params.set("partCategory", selectedPartCategory);
//       if (selectedBrand !== "Select Brand") params.set("brand", selectedBrand);
//     }

//     if (selectedTab === "General") {
//       if (selectedProductCategory !== "Select Product Category")
//         params.set("productCategory", selectedProductCategory);
//       if (selectedPackagingType !== "Select Packaging Type")
//         params.set("packagingType", selectedPackagingType);
//       if (selectedOrderScale !== "Select Order Scale (MOQ)")
//         params.set("orderScale", selectedOrderScale);
//     }

//     if (selectedPrice !== "All Price") params.set("price", selectedPrice);

//     const queryString = params.toString();
//     router.push(queryString ? `/listing-v1?${queryString}` : "/listing-v1");
//   };

//   return (
//     <div className="col-lg-12">
//       <ul className="nav nav-pills justify-content-center">
//         {tabs.map((tab) => (
//           <li className="nav-item" role="presentation" key={tab}>
//             <button
//               className={`nav-link ${selectedTab === tab && "active"}`}
//               onClick={() => handleTabClick(tab)}
//             >
//               {tab}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* filter tabs */}
//       <div className="adss_bg_stylehome1">
//         <div className="home1_advance_search_wrapper">
//           <ul className="mb0 text-center">
//             {tabsConfig.map((filter) => (
//               <li
//                 className="list-inline-item mb-4 mb-lg-0 w-100 w-lg-auto"
//                 key={filter.label}
//               >
//                 <div className="select-boxes">
//                   <div className="car_brand">
//                     <h6 className="title">{filter.label}</h6>
//                     <select
//                       className="form-select"
//                       value={filter.value}
//                       onChange={(e) => filter.onChange(e.target.value)}
//                     >
//                       {filter.options.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </li>
//             ))}

//             {/* Search button */}
//             <li className="list-inline-item mt-2 mt-lg-0 w-100 w-lg-auto">
//               <div className="d-block">
//                 <button
//                   onClick={handleSearch}
//                   className="btn btn-thm advnc_search_form_btn w-100"
//                 >
//                   <span className="flaticon-magnifiying-glass" />
//                   Search
//                 </button>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <style jsx>{`
//         @media (max-width: 991px) {
//           .home1_advance_search_wrapper {
//             padding: 20px;
//           }
//           .select-boxes {
//             margin-bottom: 0;
//           }
//           .car_brand .title {
//             margin-bottom: 8px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroFilter;


"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { useMergedListings } from "@/hooks/useMergedListings";

const tabs = ["Automobiles", "Auto Parts", "General"];

const tabCategoryMap = {
  Automobiles: "automobile",
  "Auto Parts": "auto-part",
  "General": "species",
};

const buildConditionOptions = (sourceListings) => {
  const conditions = [
    ...new Set(sourceListings.map((item) => item.condition).filter(Boolean)),
  ].sort();

  return ["All Conditions", ...conditions];
};

const HeroFilter = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [selectedTab, setSelectedTab] = useState("Automobiles");
  const [selectedMake, setSelectedMake] = useState("Select Makes");
  const [selectedModel, setSelectedModel] = useState("Select Models");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [selectedPartCategory, setSelectedPartCategory] = useState(
    "All Categories"
  );
  const [selectedBrand, setSelectedBrand] = useState("Select Brand");
  const [selectedProductCategory, setSelectedProductCategory] = useState(
    "Select Product Category"
  );
  const [selectedPackagingType, setSelectedPackagingType] = useState(
    "Select Packaging Type"
  );
  const [selectedOrderScale, setSelectedOrderScale] = useState(
    "Select Order Scale (MOQ)"
  );

  const mergedListings = useMergedListings();

  const automobileListings = useMemo(
    () =>
      mergedListings.filter(
        (listing) => (listing.category || "automobile") === "automobile"
      ),
    [mergedListings]
  );

  const autoPartListings = useMemo(
    () =>
      mergedListings.filter(
        (listing) => (listing.category || "automobile") === "auto-part"
      ),
    [mergedListings]
  );

  const speciesListings = useMemo(
    () =>
      mergedListings.filter(
        (listing) => (listing.category || "automobile") === "species"
      ),
    [mergedListings]
  );

  const activeListings = useMemo(() => {
    if (selectedTab === "Auto Parts") return autoPartListings;
    if (selectedTab === "General") return speciesListings;
    return automobileListings;
  }, [selectedTab, autoPartListings, speciesListings, automobileListings]);

  const makeOptions = useMemo(() => {
    const makes = [
      ...new Set(automobileListings.map((car) => car.make).filter(Boolean)),
    ].sort();
    return ["Select Makes", ...makes];
  }, [automobileListings]);

  const modelOptions = useMemo(() => {
    const relevantCars =
      selectedMake === "Select Makes"
        ? automobileListings
        : automobileListings.filter((car) => car.make === selectedMake);

    const models = [
      ...new Set(relevantCars.map((car) => car.model).filter(Boolean)),
    ].sort();

    return ["Select Models", ...models];
  }, [selectedMake, automobileListings]);

  const partCategoryOptions = useMemo(() => {
    const categories = [
      ...new Set(autoPartListings.map((item) => item.partCategory).filter(Boolean)),
    ].sort();

    return ["All Categories", ...categories];
  }, [autoPartListings]);

  const brandOptions = useMemo(() => {
    const brands = [
      ...new Set(autoPartListings.map((item) => item.brand).filter(Boolean)),
    ].sort();

    return ["Select Brand", ...brands];
  }, [autoPartListings]);

  const productCategoryOptions = useMemo(() => {
    const productCategories = [
      ...new Set(
        speciesListings.map((item) => item.productCategory).filter(Boolean)
      ),
    ].sort();

    return ["Select Product Category", ...productCategories];
  }, [speciesListings]);

  const packagingTypeOptions = useMemo(() => {
    const packagingTypes = [
      ...new Set(
        speciesListings.map((item) => item.packagingType).filter(Boolean)
      ),
    ].sort();

    return ["Select Packaging Type", ...packagingTypes];
  }, [speciesListings]);

  const orderScaleOptions = useMemo(() => {
    const orderScales = [
      ...new Set(speciesListings.map((item) => item.orderScale).filter(Boolean)),
    ].sort();

    return ["Select Order Scale (MOQ)", ...orderScales];
  }, [speciesListings]);

  const conditionOptions = useMemo(
    () => buildConditionOptions(activeListings),
    [activeListings]
  );

  const handleMakeChange = (value) => {
    setSelectedMake(value);
    setSelectedModel("Select Models");
  };

  const handleProductCategoryChange = (value) => {
    setSelectedProductCategory(value);
  };

  const handlePackagingTypeChange = (value) => {
    setSelectedPackagingType(value);
  };

  const handleOrderScaleChange = (value) => {
    setSelectedOrderScale(value);
  };

  const tabsConfig = useMemo(() => {
    if (selectedTab === "Auto Parts") {
      return [
        {
          label: "Category",
          options: partCategoryOptions,
          value: selectedPartCategory,
          onChange: setSelectedPartCategory,
        },
        {
          label: "Brand",
          options: brandOptions,
          value: selectedBrand,
          onChange: setSelectedBrand,
        },
        {
          label: "Condition",
          options: conditionOptions,
          value: selectedCondition,
          onChange: setSelectedCondition,
        },
      ];
    }

    if (selectedTab === "General") {
      return [
        {
          label: "Product Category",
          options: productCategoryOptions,
          value: selectedProductCategory,
          onChange: handleProductCategoryChange,
        },
        {
          label: "Packaging Type",
          options: packagingTypeOptions,
          value: selectedPackagingType,
          onChange: handlePackagingTypeChange,
        },
        {
          label: "Order Scale (MOQ)",
          options: orderScaleOptions,
          value: selectedOrderScale,
          onChange: handleOrderScaleChange,
        },
      ];
    }

    return [
      {
        label: "Make",
        options: makeOptions,
        value: selectedMake,
        onChange: handleMakeChange,
      },
      {
        label: "Models",
        options: modelOptions,
        value: selectedModel,
        onChange: setSelectedModel,
      },
      {
        label: "Condition",
        options: conditionOptions,
        value: selectedCondition,
        onChange: setSelectedCondition,
      },
    ];
  }, [
    selectedTab,
    partCategoryOptions,
    selectedPartCategory,
    brandOptions,
    selectedBrand,
    conditionOptions,
    selectedCondition,
    productCategoryOptions,
    selectedProductCategory,
    packagingTypeOptions,
    selectedPackagingType,
    orderScaleOptions,
    selectedOrderScale,
    makeOptions,
    selectedMake,
    modelOptions,
    selectedModel,
  ]);

  const handleTabClick = (tab) => {
    if (tab === selectedTab) return;

    const nextCategory = tabCategoryMap[tab];

    setSelectedTab(tab);
    setSelectedMake("Select Makes");
    setSelectedModel("Select Models");
    setSelectedCondition("All Conditions");
    setSelectedPartCategory("All Categories");
    setSelectedBrand("Select Brand");
    setSelectedProductCategory("Select Product Category");
    setSelectedPackagingType("Select Packaging Type");
    setSelectedOrderScale("Select Order Scale (MOQ)");

    startTransition(() => {
      router.push(`/?category=${encodeURIComponent(nextCategory)}`);
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    const selectedCategory = tabCategoryMap[selectedTab];

    params.set("category", selectedCategory);

    if (selectedTab === "Automobiles") {
      if (selectedMake !== "Select Makes") params.set("make", selectedMake);
      if (selectedModel !== "Select Models")
        params.set("model", selectedModel);
    }

    if (selectedTab === "Auto Parts") {
      if (selectedPartCategory !== "All Categories")
        params.set("partCategory", selectedPartCategory);
      if (selectedBrand !== "Select Brand") params.set("brand", selectedBrand);
    }

    if (selectedTab === "General") {
      if (selectedProductCategory !== "Select Product Category")
        params.set("productCategory", selectedProductCategory);
      if (selectedPackagingType !== "Select Packaging Type")
        params.set("packagingType", selectedPackagingType);
      if (selectedOrderScale !== "Select Order Scale (MOQ)")
        params.set("orderScale", selectedOrderScale);
    }

    if (selectedCondition !== "All Conditions")
      params.set("condition", selectedCondition);

    const queryString = params.toString();
    router.push(queryString ? `/listing-v1?${queryString}` : "/listing-v1");
  };

  return (
    <div className="col-lg-12" suppressHydrationWarning>
      {isPending && (
        <div className="hero_filter_progress" aria-hidden="true">
          <span className="hero_filter_progress_bar" />
        </div>
      )}

      <ul
        className="nav nav-pills justify-content-center"
        suppressHydrationWarning
        aria-busy={isPending}
      >
        {tabs.map((tab) => {
          const isActive = selectedTab === tab;
          return (
            <li className="nav-item" role="presentation" key={tab}>
              <button
                className={`nav-link ${isActive && "active"}`}
                onClick={() => handleTabClick(tab)}
                disabled={isPending && !isActive}
              >
                {tab}
                {isPending && isActive && (
                  <span className="hero_filter_tab_spinner" aria-hidden="true" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* filter tabs */}
      <div className="adss_bg_stylehome1">
        <div className="home1_advance_search_wrapper">
          <ul className="mb0 text-center" key={selectedTab}>
            {tabsConfig.map((filter, index) => (
              <li
                className="list-inline-item hero_filter_item"
                key={filter.label}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="select-boxes">
                  <div className="car_brand">
                    <h6 className="title">{filter.label}</h6>
                    <select
                      className="form-select"
                      value={filter.value}
                      onChange={(e) => filter.onChange(e.target.value)}
                    >
                      {filter.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
            ))}

            {/* Search button */}
            <li
              className="list-inline-item hero_filter_item hero_filter_search"
              style={{ animationDelay: `${tabsConfig.length * 60}ms` }}
            >
              <div className="d-block">
                <button
                  onClick={handleSearch}
                  className="btn btn-thm advnc_search_form_btn"
                >
                  <span className="flaticon-magnifiying-glass" />
                  Search
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .hero_filter_progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(13, 110, 253, 0.12);
          z-index: 9999;
          overflow: hidden;
        }
        .hero_filter_progress_bar {
          display: block;
          height: 100%;
          width: 40%;
          background: var(--primary-color, #0d6efd);
          border-radius: 0 4px 4px 0;
          animation: heroFilterProgress 1s ease-in-out infinite;
        }
        @keyframes heroFilterProgress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(350%);
          }
        }

        :global(.advance_search_panel .nav-pills .nav-link) {
          position: relative;
          transition: background-color 0.25s ease, color 0.25s ease,
            box-shadow 0.25s ease, transform 0.15s ease, opacity 0.2s ease;
        }
        :global(.advance_search_panel .nav-pills .nav-link:disabled) {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .hero_filter_tab_spinner {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-left: 6px;
          border: 1.5px solid rgba(26, 55, 96, 0.25);
          border-top-color: #1a3760;
          border-radius: 50%;
          vertical-align: middle;
          animation: heroFilterSpin 0.6s linear infinite;
        }
        @keyframes heroFilterSpin {
          to {
            transform: rotate(360deg);
          }
        }
        :global(.advance_search_panel .nav-pills .nav-link.active) {
          box-shadow: 0 -2px 10px rgba(23, 26, 33, 0.06);
        }
        :global(.advance_search_panel .nav-pills .nav-link:not(.active):hover) {
          filter: brightness(1.04);
        }
        :global(.advance_search_panel .nav-pills .nav-link:active) {
          transform: scale(0.97);
        }

        @keyframes heroFilterFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero_filter_item {
          animation: heroFilterFadeIn 0.32s ease both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero_filter_item {
            animation: none;
          }
          :global(.advance_search_panel .nav-pills .nav-link) {
            transition: none;
          }
          .hero_filter_progress_bar,
          .hero_filter_tab_spinner {
            animation-duration: 1.6s;
          }
        }

        @media (max-width: 991px) {
          .home1_advance_search_wrapper {
            padding: 20px;
          }
          .hero_filter_item {
            display: block;
            width: 100%;
            margin-bottom: 20px;
          }
          .hero_filter_search {
            margin-bottom: 0;
            margin-top: 4px;
          }
          .hero_filter_search .advnc_search_form_btn {
            width: 100%;
          }
          .select-boxes {
            margin-bottom: 0;
          }
          .car_brand .title {
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroFilter;