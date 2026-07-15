// const filterOptions = [
//   {
//     label: "Year",
//     options: ["1967", "1990", "2000", "2002", "2005", "2010", "2015", "2020"],
//     type: "select",
//   },
//   {
//     label: "Fuel Type",
//     options: ["Diesel", "Electric", "Hybrid", "Petrol"],
//     type: "select",
//   },
//   {
//     label: "Transmission",
//     options: ["Autometic", "Manual", "Semi-Autometic"],
//     type: "select",
//   },
//   {
//     label: "Doors",
//     options: ["2 Doors", "3 Doors", "4 Doors", "5 Doors"],
//     type: "select",
//   },
//   {
//     label: "Interior Color",
//     options: ["Black", "Beige", "Brown", "Red"],
//     type: "select",
//   },
//   {
//     label: "Exterior Color",
//     options: ["Black", "Beige", "Brown", "Red"],
//     type: "select",
//   },
//   {
//     label: "Cylinders",
//     options: ["4", "6", "8"],
//     type: "select",
//   },
//   {
//     label: "Listing Status",
//     options: ["Active", "Pending", "Disable"],
//     type: "select",
//   },
//   {
//     label: "Min. Mileage",
//     placeholder: "Min. Mileage",
//     type: "input",
//     inputType: "number",
//   },
//   {
//     label: "Max. Mileage",
//     placeholder: "Max. Mileage",
//     type: "input",
//     inputType: "number",
//   },
//   {
//     label: "VIN number",
//     placeholder: "VIN number",
//     type: "input",
//     inputType: "number",
//   },
// ];

// const AdvanceMainFilter = () => {
//   return (
//     <>
//       {filterOptions.map((option, index) => (
//         <div className="col-12 col-sm-4 col-lg-2" key={index}>
//           <div className="advance_search_style">
//             {option.type === "select" ? (
//               <select className="form-select show-tick">
//                 <option>{option.label}</option>
//                 {option.options.map((opt, i) => (
//                   <option key={i}>{opt}</option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 className="form-control form_control"
//                 type={option.inputType}
//                 placeholder={option.placeholder}
//               />
//             )}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default AdvanceMainFilter;

"use client";
import { useMemo } from "react";
import listingsData from "@/data/listingCar";

const uniqueSorted = (values) => [...new Set(values.filter(Boolean))].sort();

const AdvanceMainFilter = ({ filters, updateFilter }) => {
  const yearOptions = useMemo(
    () => uniqueSorted(listingsData.map((car) => car.year)).reverse(),
    []
  );
  const fuelTypeOptions = useMemo(
    () => uniqueSorted(listingsData.map((car) => car.fuelType)),
    []
  );
  const transmissionOptions = useMemo(
    () => uniqueSorted(listingsData.map((car) => car.transmission)),
    []
  );
  const doorsOptions = useMemo(
    () => uniqueSorted(listingsData.map((car) => car.doors)),
    []
  );
  const interiorColorOptions = useMemo(
    () => uniqueSorted(listingsData.map((car) => car.interiorColor)),
    []
  );
  const exteriorColorOptions = useMemo(
    () => uniqueSorted(listingsData.map((car) => car.color)),
    []
  );
  const cylinderOptions = useMemo(
    () => uniqueSorted(listingsData.map((car) => car.cylinders)),
    []
  );

  // "Listing Status" (Active/Pending/Disable) from the original template
  // doesn't correspond to anything in the car data and reads like an
  // admin/seller-dashboard field rather than a public search filter, so
  // it's intentionally left out here rather than wired to something fake.
  const selectFilters = [
    { key: "year", label: "Year", options: yearOptions },
    { key: "fuelType", label: "Fuel Type", options: fuelTypeOptions },
    {
      key: "transmission",
      label: "Transmission",
      options: transmissionOptions,
    },
    {
      key: "doors",
      label: "Doors",
      options: doorsOptions.map((d) => `${d} Doors`),
    },
    {
      key: "interiorColor",
      label: "Interior Color",
      options: interiorColorOptions,
    },
    {
      key: "exteriorColor",
      label: "Exterior Color",
      options: exteriorColorOptions,
    },
    { key: "cylinders", label: "Cylinders", options: cylinderOptions },
  ];

  return (
    <>
      {selectFilters.map((filter) => (
        <div className="col-12 col-sm-4 col-lg-2" key={filter.key}>
          <div className="advance_search_style">
            <select
              className="form-select show-tick"
              value={filters[filter.key]}
              onChange={(e) => updateFilter(filter.key, e.target.value)}
            >
              <option value={filter.label}>{filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <div className="col-12 col-sm-4 col-lg-2">
        <div className="advance_search_style">
          <input
            className="form-control form_control"
            type="number"
            placeholder="Min. Mileage"
            value={filters.minMileage}
            onChange={(e) => updateFilter("minMileage", e.target.value)}
          />
        </div>
      </div>

      <div className="col-12 col-sm-4 col-lg-2">
        <div className="advance_search_style">
          <input
            className="form-control form_control"
            type="number"
            placeholder="Max. Mileage"
            value={filters.maxMileage}
            onChange={(e) => updateFilter("maxMileage", e.target.value)}
          />
        </div>
      </div>

      <div className="col-12 col-sm-4 col-lg-2">
        <div className="advance_search_style">
          <input
            className="form-control form_control"
            type="text"
            placeholder="VIN number"
            value={filters.vin}
            onChange={(e) => updateFilter("vin", e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default AdvanceMainFilter;
