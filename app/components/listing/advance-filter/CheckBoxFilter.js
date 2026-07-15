// const CheckBoxFilter = () => {
//     const checkboxes = [
//         {
//             id: "customCheck1",
//             label: "Adaptive Cruise Control (6,676)",
//         },
//         {
//             id: "customCheck2",
//             label: "Cooled Seats (9,784)",
//         },
//         {
//             id: "customCheck3",
//             label: "Keyless Start (9,784)",
//         },
//         {
//             id: "customCheck4",
//             label: "Navigation System (9,784)",
//         },
//         {
//             id: "customCheck5",
//             label: "Remote Start (9,784)",
//         },
//     ];

//     return (
//         <div className="advance_search_style">
//             <div className="ui_kit_checkbox text-start me-3">
//                 {checkboxes.slice(0, 3).map((checkbox) => (
//                     <div className="df mb20" key={checkbox.id}>
//                         <input
//                             type="checkbox"
//                             className="custom-control-input"
//                             id={checkbox.id}
//                         />
//                         <label
//                             className="custom-control-label"
//                             htmlFor={checkbox.id}
//                         >
//                             {checkbox.label}
//                         </label>
//                     </div>
//                 ))}
//             </div>
//             {/* End .ui_kit_checkbox */}

//             <div className="ui_kit_checkbox text-start">
//                 {checkboxes.slice(3).map((checkbox) => (
//                     <div className="df mb20" key={checkbox.id}>
//                         <input
//                             type="checkbox"
//                             className="custom-control-input"
//                             id={checkbox.id}
//                         />
//                         <label
//                             className="custom-control-label"
//                             htmlFor={checkbox.id}
//                         >
//                             {checkbox.label}
//                         </label>
//                     </div>
//                 ))}
//             </div>
//             {/* End .ui_kit_checkbox */}
//         </div>
//     );
// };

// export default CheckBoxFilter;

"use client";
import { useMemo } from "react";
import listingsData from "@/data/listingCar";

const CheckBoxFilter = ({ selectedFeatures, onToggle }) => {
  // Flatten every car's feature items into one list, count how many cars
  // have each one, and surface the most common ones as checkboxes.
  const popularFeatures = useMemo(() => {
    const counts = {};

    listingsData.forEach((car) => {
      (car.features || []).forEach((category) => {
        category.items.forEach((item) => {
          counts[item] = (counts[item] || 0) + 1;
        });
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([label, count]) => ({ label, count }));
  }, []);

  const firstHalf = popularFeatures.slice(0, Math.ceil(popularFeatures.length / 2));
  const secondHalf = popularFeatures.slice(Math.ceil(popularFeatures.length / 2));

  const renderCheckbox = (feature) => (
    <div className="df mb20" key={feature.label}>
      <input
        type="checkbox"
        className="custom-control-input"
        id={feature.label}
        checked={selectedFeatures.includes(feature.label)}
        onChange={() => onToggle(feature.label)}
      />
      <label className="custom-control-label" htmlFor={feature.label}>
        {feature.label} ({feature.count})
      </label>
    </div>
  );

  return (
    <div className="advance_search_style">
      <div className="ui_kit_checkbox text-start me-3">
        {firstHalf.map(renderCheckbox)}
      </div>
      {/* End .ui_kit_checkbox */}

      <div className="ui_kit_checkbox text-start">
        {secondHalf.map(renderCheckbox)}
      </div>
      {/* End .ui_kit_checkbox */}
    </div>
  );
};

export default CheckBoxFilter;