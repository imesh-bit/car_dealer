import Link from "next/link";
import listingCar from "@/data/listingCar";

// icons8 "ios" style, white — used for every category icon
const iconWrapStyle = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: "56px",
  marginBottom: "12px",
};

const Icons8Icon = ({ name, alt }) => (
  <div style={iconWrapStyle}>
    <img width="56" height="56" src={`https://img.icons8.com/ios/100/FFFFFF/${name}.png`} alt={alt} />
  </div>
);

const CustomIcons = {
  // automobile
  car: <Icons8Icon name="fiat-500" alt="Cars" />,
  bike: <Icons8Icon name="dirt-bike--v2" alt="Bikes" />,
  truck: <Icons8Icon name="truck--v1" alt="Trucks" />,
  machinery: <Icons8Icon name="bulldozer" alt="Machinery" />,

  // auto-part
  engine: <Icons8Icon name="engine" alt="Engine" />,
  cooling: <Icons8Icon name="cooling" alt="Cooling" />,
  electrical: <Icons8Icon name="electrical" alt="Electrical" />,
  brakes: <Icons8Icon name="brake-discs" alt="Brakes" />,
  suspension: <Icons8Icon name="suspension-dampers" alt="Suspension" />,

  // species
  processedFood: <Icons8Icon name="food-bar" alt="Processed Food Items" />,
  dryGoods: <Icons8Icon name="vegan-food" alt="Dry Goods & Spices" />,
  household: <Icons8Icon name="sponge" alt="Household & Daily Essentials" />,
  rawMaterials: <Icons8Icon name="ingredients" alt="Industrial Raw Materials" />,
};

const categoryBackgrounds = {
  Cars: "/images/listing/1.jpg",
  Bikes: "/images/listing/3.jpg",
  Trucks: "/images/listing/4.jpg",
  Machinery: "/images/listing/jcb-backhoe1.jpg",
  Engine: "/images/listing/auto-parts/bosch.jpg",
  Cooling: "/images/listing/auto-parts/bosch.jpg",
  Electrical: "/images/listing/auto-parts/bosch.jpg",
  Brakes: "/images/listing/auto-parts/bosch.jpg",
  Suspension: "/images/listing/auto-parts/bosch.jpg",
  "Processed Food Items": "/images/listing/7.jpg",
  "Dry Goods & Spices": "/images/listing/8.jpg",
  "Household & Daily Essentials": "/images/listing/9.jpg",
  "Industrial Raw Materials": "/images/listing/10.jpg",
};

const categoryGroups = {
  automobile: [
    { customIcon: "car", title: "Cars", value: "Cars", queryKey: "type" },
    { customIcon: "bike", title: "Bikes", value: "Bikes", queryKey: "type" },
    { customIcon: "truck", title: "Trucks", value: "Trucks", queryKey: "type" },
    { customIcon: "machinery", title: "Machinery", value: "Machinery", queryKey: "type" },
  ],
  "auto-part": [
    { customIcon: "engine", title: "Engine", value: "Engine", queryKey: "partCategory" },
    { customIcon: "cooling", title: "Cooling", value: "Cooling", queryKey: "partCategory" },
    { customIcon: "electrical", title: "Electrical", value: "Electrical", queryKey: "partCategory" },
    { customIcon: "brakes", title: "Brakes", value: "Brakes", queryKey: "partCategory" },
    { customIcon: "suspension", title: "Suspension", value: "Suspension", queryKey: "partCategory" },
  ],
  species: [
    { customIcon: "processedFood", title: "Processed Food Items", value: "Processed Food Items", queryKey: "productCategory" },
    { customIcon: "dryGoods", title: "Dry Goods & Spices", value: "Dry Goods & Spices", queryKey: "productCategory" },
    { customIcon: "household", title: "Household & Daily Essentials", value: "Household & Daily Essentials", queryKey: "productCategory" },
    { customIcon: "rawMaterials", title: "Industrial Raw Materials", value: "Industrial Raw Materials", queryKey: "productCategory" },
  ],
};

const getAutomobileHeroCategory = (listing) => {
  const bodyType = (listing.bodyType || "").toLowerCase();
  if (["sedan", "suv", "coupe", "compact", "convertible", "wagon"].includes(bodyType)) return "Cars";
  if (["bike", "motorcycle", "bikes"].includes(bodyType)) return "Bikes";
  if (["truck", "pickup", "lorry", "van", "trailer"].includes(bodyType)) return "Trucks";
  if (["backhoe loader", "machinery", "heavy-equipment"].includes(bodyType)) return "Machinery";
  return "Cars";
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
      return getAutomobileHeroCategory(listing).toLowerCase() === item.value.toLowerCase();
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
            suppressHydrationWarning
          >
            <div
              className="category_item category_card_mobile home4_style mt0-md"
              style={{ "--category-image": `url(${categoryBackgrounds[item.value]})` }}
            >
              <div className="icon">{CustomIcons[item.customIcon]}</div>
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