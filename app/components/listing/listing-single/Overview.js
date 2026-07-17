// const Overview = () => {
//   const carData = [
//     { label: "Make", value: "Volvo" },
//     { label: "Model", value: "XC 90" },
//     { label: "Color", value: "white" },
//     { label: "Drive Type", value: "4x4" },
//     { label: "Transmission", value: "Automatic" },
//     { label: "Condition", value: "Used" },
//     { label: "Year", value: "2021" },
//     { label: "Mileage", value: "280,000" },
//     { label: "Fuel Type", value: "Diesel" },
//     { label: "Engine Size", value: "5.2L" },
//     { label: "Doors", value: "5" },
//     { label: "Cylinders", value: "10" },
//     { label: "VIN", value: "2D456THA798700213GT21" },
//   ];

//   return (
//     <ul className="list-group">
//       {carData.map((item, index) => (
//         <li
//           className="list-group-item d-flex justify-content-between align-items-start"
//           key={index}
//         >
//           <div className="me-auto">
//             <div className="day">{item.label}</div>
//           </div>
//           <span className="schedule">{item.value}</span>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Overview;

const Overview = ({ car }) => {
  const carData =
    car?.category === "species"
      ? [
          {
            label: "Product Category",
            value: car?.productCategory || "N/A",
          },
          {
            label: "Packaging Type",
            value: car?.packagingType || "N/A",
          },
          {
            label: "Order Scale (MOQ)",
            value: car?.orderScale || "N/A",
          },
          { label: "Condition", value: car?.condition || "N/A" },
          { label: "Year", value: car?.year || "N/A" },
          { label: "Listing Type", value: "General Merchandise" },
        ]
      : [
          { label: "Make", value: car?.make || "N/A" },
          { label: "Model", value: car?.model || "N/A" },
          { label: "Color", value: car?.color || "N/A" },
          { label: "Drive Type", value: car?.drivetrain || "N/A" },
          { label: "Transmission", value: car?.transmission || "N/A" },
          { label: "Condition", value: car?.condition || "N/A" },
          { label: "Year", value: car?.year || "N/A" },
          {
            label: "Mileage",
            value: car?.mileage ? `${Number(car.mileage).toLocaleString()} mi` : "N/A",
          },
          { label: "Fuel Type", value: car?.fuelType || "N/A" },
          { label: "Engine Size", value: car?.engineSize || "N/A" },
          { label: "Doors", value: car?.doors || "N/A" },
          { label: "Cylinders", value: car?.cylinders || "N/A" },
          { label: "VIN", value: car?.vin || "N/A" },
        ];

  return (
    <ul className="list-group">
      {carData.map((item, index) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-start"
          key={index}
        >
          <div className="me-auto">
            <div className="day">{item.label}</div>
          </div>
          <span className="schedule">{item.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default Overview;