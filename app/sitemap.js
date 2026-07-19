import listingsData from "@/data/listingCar";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/site-config";

export default function sitemap() {
  const staticEntries = PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const listingEntries = listingsData.map((car) => ({
    url: `${SITE_URL}/listing-single-v1/${car.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...listingEntries];
}
