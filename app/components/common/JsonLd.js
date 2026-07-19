import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site-config";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/header-logo2.svg`,
    description:
      "Trusted automotive dealer offering quality vehicles, auto parts, and professional service.",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CarJsonLd({ car }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: car.title,
    description: car.tagline,
    image: car.image.startsWith("http") ? car.image : `${SITE_URL}${car.image}`,
    brand: {
      "@type": "Brand",
      name: car.make,
    },
    model: car.model,
    vehicleModelDate: car.year,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.mileage,
      unitCode: "KMT",
    },
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/listing-single-v1/${car.id}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
