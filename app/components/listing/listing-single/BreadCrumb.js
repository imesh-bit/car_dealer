import Link from "next/link";
import { BreadcrumbJsonLd } from "@/app/components/common/JsonLd";

const getDefaultItems = (car) => {
  const category = car?.category || "automobile";

  if (category === "auto-part") {
    return [
      { label: "Home", href: "/" },
      { label: "Auto Parts", href: "/listing-v1" },
    ];
  }

  if (category === "species") {
    return [
      { label: "Home", href: "/" },
      { label: "General Listings", href: "/listing-v1" },
    ];
  }

  return [
    { label: "Home", href: "/" },
    { label: "Cars for Sale", href: "/listing-v1" },
  ];
};

const BreadCrumb = ({ items, car }) => {
  const breadcrumbItems = items || (car
    ? [
        ...getDefaultItems(car),
        { label: car.title },
      ]
    : getDefaultItems());

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ol className="breadcrumb float-start">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          if (isLast || !item.href) {
            return (
              <li
                key={`${item.label}-${index}`}
                className="breadcrumb-item active"
                aria-current="page"
              >
                {item.label}
              </li>
            );
          }

          return (
            <li key={`${item.label}-${index}`} className="breadcrumb-item">
              <Link href={item.href}>{item.label}</Link>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default BreadCrumb;
