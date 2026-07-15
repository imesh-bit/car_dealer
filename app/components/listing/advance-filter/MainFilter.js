// 

"use client";
import { useMemo } from "react";
import listingsData from "@/data/listingCar";

const MainFilter = ({ filters, updateFilter }) => {
  const makeOptions = useMemo(() => {
    const makes = [
      ...new Set(listingsData.map((car) => car.make).filter(Boolean)),
    ].sort();
    return makes;
  }, []);

  const modelOptions = useMemo(() => {
    const relevantCars =
      filters.make === "Select Makes"
        ? listingsData
        : listingsData.filter((car) => car.make === filters.make);
    return [
      ...new Set(relevantCars.map((car) => car.model).filter(Boolean)),
    ].sort();
  }, [filters.make]);

  const bodyTypeOptions = useMemo(() => {
    return [
      ...new Set(listingsData.map((car) => car.bodyType).filter(Boolean)),
    ].sort();
  }, []);

  // NOTE: this dropdown was originally labeled "Condition" but its values
  // ("Most Recent", "Best Selling", "Old Review"...) are sort options, not
  // a car condition (New/Used/Certified). Treating it as "Sort By" here —
  // flag if that's not what was intended.
  const filterConfigs = [
    {
      key: "sort",
      label: "Sort By",
      options: ["Most Recent", "Recent", "Best Selling", "Old Review"],
    },
    {
      key: "make",
      label: "Select Makes",
      options: makeOptions,
    },
    {
      key: "model",
      label: "Select Models",
      options: modelOptions,
    },
    {
      key: "bodyType",
      label: "Select Type",
      options: bodyTypeOptions,
    },
  ];

  return (
    <>
      {filterConfigs.map((config) => (
        <div key={config.key} className="col-12 col-sm-4 col-lg-2">
          <div className="advance_search_style">
            <select
              className="form-select show-tick"
              value={filters[config.key]}
              onChange={(e) => updateFilter(config.key, e.target.value)}
            >
              <option value={config.label}>{config.label}</option>
              {config.options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </>
  );
};

export default MainFilter;