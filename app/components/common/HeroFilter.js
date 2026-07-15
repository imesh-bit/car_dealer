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

"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import listingsData from "@/data/listingCar";

const HeroFilter = () => {
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedMake, setSelectedMake] = useState("Select Makes");
  const [selectedModel, setSelectedModel] = useState("Select Models");
  const [selectedPrice, setSelectedPrice] = useState("All Price");

  // Unique makes pulled straight from the listing data
  const makeOptions = useMemo(() => {
    const makes = [
      ...new Set(listingsData.map((car) => car.make).filter(Boolean)),
    ].sort();
    return ["Select Makes", ...makes];
  }, []);

  // Models narrow down to whichever make is currently selected
  const modelOptions = useMemo(() => {
    const relevantCars =
      selectedMake === "Select Makes"
        ? listingsData
        : listingsData.filter((car) => car.make === selectedMake);
    const models = [
      ...new Set(relevantCars.map((car) => car.model).filter(Boolean)),
    ].sort();
    return ["Select Models", ...models];
  }, [selectedMake]);

  // Price bands computed from the real min/max price in the data (in Yen)
  const priceOptions = useMemo(() => {
    const prices = listingsData.map((car) => car.price).filter(Boolean);
    if (prices.length === 0) return ["All Price"];

    const max = Math.max(...prices);
    const step = Math.max(1, Math.ceil(max / 5));
    const bands = Array.from({ length: 5 }, (_, i) => step * (i + 1));

    return [
      "All Price",
      "No max Price",
      ...bands.map((band) => `¥${band.toLocaleString()}`),
    ];
  }, []);

  const handleMakeChange = (value) => {
    setSelectedMake(value);
    // Reset model since the available models just changed
    setSelectedModel("Select Models");
  };

  const filters = [
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
      label: "Price",
      options: priceOptions,
      value: selectedPrice,
      onChange: setSelectedPrice,
    },
  ];

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedStatus !== "All Status") params.set("status", selectedStatus);
    if (selectedMake !== "Select Makes") params.set("make", selectedMake);
    if (selectedModel !== "Select Models") params.set("model", selectedModel);
    if (selectedPrice !== "All Price") params.set("price", selectedPrice);

    const queryString = params.toString();
    router.push(queryString ? `/listing-v4?${queryString}` : "/listing-v4");
  };

  return (
    <div className="col-lg-12">
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${
              selectedStatus === "All Status" && "active"
            }`}
            onClick={() => handleStatusClick("All Status")}
          >
            All Status
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${selectedStatus === "Used Cars" && "active"}`}
            onClick={() => handleStatusClick("Used Cars")}
          >
            Used Cars
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${selectedStatus === "New Cars" && "active"}`}
            onClick={() => handleStatusClick("New Cars")}
          >
            New Cars
          </button>
        </li>
      </ul>

      {/* filter tabs */}
      <div className="adss_bg_stylehome1">
        <div className="home1_advance_search_wrapper">
          <ul className="mb0 text-center">
            {filters.map((filter) => (
              <li className="list-inline-item" key={filter.label}>
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
            <li className="list-inline-item">
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
    </div>
  );
};

export default HeroFilter;