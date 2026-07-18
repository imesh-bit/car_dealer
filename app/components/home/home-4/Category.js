import Link from "next/link";
import listingCar from "@/data/listingCar";

const categoryGroups = {
  automobile: [
    {
      icon: "flaticon-car-black-side-view-pointing-left",
      title: "Compact",
      value: "Compact",
      queryKey: "type",
    },
    {
      icon: "flaticon-sedan-car-model",
      title: "Sedan",
      value: "Sedan",
      queryKey: "type",
    },
    {
      icon: "flaticon-jeep",
      title: "SUV",
      value: "SUV",
      queryKey: "type",
    },
    {
      icon: "flaticon-cabrio-car",
      title: "Convertible",
      value: "Convertible",
      queryKey: "type",
    },
    {
      icon: "flaticon-coupe-car",
      title: "Coupe",
      value: "Coupe",
      queryKey: "type",
    },
    {
      icon: "flaticon-gear",
      title: "Backhoe Loader",
      value: "Backhoe Loader",
      queryKey: "type",
    },
  ],
  "auto-part": [
    {
      icon: "flaticon-gear",
      title: "Engine",
      value: "Engine",
      queryKey: "partCategory",
    },
    {
      icon: "flaticon-dashboard",
      title: "Cooling",
      value: "Cooling",
      queryKey: "partCategory",
    },
    {
      icon: "flaticon-cogwheel",
      title: "Electrical",
      value: "Electrical",
      queryKey: "partCategory",
    },
    {
      icon: "flaticon-shield",
      title: "Brakes",
      value: "Brakes",
      queryKey: "partCategory",
    },
    {
      icon: "flaticon-sedan-car-model",
      title: "Suspension",
      value: "Suspension",
      queryKey: "partCategory",
    },
  ],
  species: [
    {
      icon: "flaticon-price-tag",
      title: "Processed Food Items",
      value: "Processed Food Items",
      queryKey: "productCategory",
    },
    {
      icon: "flaticon-list",
      title: "Dry Goods & Spices",
      value: "Dry Goods & Spices",
      queryKey: "productCategory",
    },
    {
      icon: "flaticon-heart",
      title: "Household & Daily Essentials",
      value: "Household & Daily Essentials",
      queryKey: "productCategory",
    },
    {
      icon: "flaticon-cogwheel",
      title: "Industrial Raw Materials",
      value: "Industrial Raw Materials",
      queryKey: "productCategory",
    },
  ],
};

const Category = ({ category = "automobile" }) => {
  const categories = categoryGroups[category] || categoryGroups.automobile;

  const categoryCounts = categories.map((item) => ({
    ...item,
    listing: listingCar.filter((listing) => {
      if (category === "auto-part") {
        return (listing.partCategory || "").toLowerCase() === item.value.toLowerCase();
      }

      if (category === "species") {
        return (listing.productCategory || "").toLowerCase() === item.value.toLowerCase();
      }

      return (listing.bodyType || "").toLowerCase() === item.value.toLowerCase();
    }).length,
  }));

  return (
    <>
      {categoryCounts.map((item, index) => {
        const href =
          item.queryKey === "type"
            ? `/listing-v1?type=${encodeURIComponent(item.value)}`
            : `/listing-v1?category=${encodeURIComponent(category)}&${item.queryKey}=${encodeURIComponent(item.value)}`;

        return (
          <div
            className="col-6 col-sm-6 col-md-4 col-lg col-xl"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay={index * 200 + 100}
            key={`${item.title}-${index}`}
          >
            <div className="category_item home4_style mt0-md">
              <div className="icon">
                <span className={item.icon} />
              </div>
              <div className="details">
                <p className="title">
                  <Link href={href}>{item.title}</Link>
                </p>
                <p className="para">{item.listing} Listings</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Category;
