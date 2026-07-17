import Link from "next/link";
import listingCar from "@/data/listingCar";

const categories = [
  {
    icon: "flaticon-car-black-side-view-pointing-left",
    title: "Compact",
    type: "Compact",
  },
  {
    icon: "flaticon-sedan-car-model",
    title: "Sedan",
    type: "Sedan",
  },
  {
    icon: "flaticon-jeep",
    title: "SUV",
    type: "SUV",
  },
  {
    icon: "flaticon-cabrio-car",
    title: "Convertible",
    type: "Convertible",
  },
  {
    icon: "flaticon-coupe-car",
    title: "Coupe",
    type: "Coupe",
  },
  {
    icon: "flaticon-gear",
    title: "Backhoe Loader",
    type: "Backhoe Loader",
}

];

const Category = () => {
  const categoryCounts = categories.map((category) => ({
    ...category,
    listing: listingCar.filter(
      (item) => item.bodyType?.toLowerCase() === category.type.toLowerCase()
    ).length,
  }));

  return (
    <>
      {categoryCounts.map((category, index) => (
        <div
          className="col-6 col-sm-6 col-md-4 col-lg col-xl"
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-delay={index * 200 + 100}
          key={index}
        >
          <div className="category_item home4_style mt0-md">
            <div className="icon">
              <span className={category.icon} />
            </div>
            <div className="details">
              <p className="title">
                <Link href={`/listing-v1?type=${encodeURIComponent(category.type)}`}>
                  {category.title}
                </Link>
              </p>
              <p className="para">{category.listing} Listings</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Category;
