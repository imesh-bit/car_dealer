export const SITE_NAME = "RAICO GROUP";
export const SITE_DESCRIPTION =
  "RAICO GROUP is a trusted automotive dealer offering quality new and used vehicles, auto parts, and expert service.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.raicogroup.com";

export const DEFAULT_OG_IMAGE = "/images/home/home-1.jpg";

export const CONTACT = {
  phone: "+81-3-1234-5678",
  email: "info@raicogroup.com",
  address: "3891 Ranchview Dr. Richardson, California 62639",
};

export const NO_INDEX_PATHS = [
  "/dashboard",
  "/login",
  "/signup",
  "/add-listings",
  "/profile",
  "/messages",
  "/favourites",
  "/my-listing",
];

export const PUBLIC_ROUTES = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/listing-v1", changeFrequency: "daily", priority: 0.9 },
  { path: "/listing-v2", changeFrequency: "weekly", priority: 0.7 },
  { path: "/listing-v3", changeFrequency: "weekly", priority: 0.7 },
  { path: "/listing-v4", changeFrequency: "weekly", priority: 0.7 },
  { path: "/listing-v5", changeFrequency: "weekly", priority: 0.7 },
  { path: "/listing-v6", changeFrequency: "weekly", priority: 0.7 },
  { path: "/listing-map-v1", changeFrequency: "weekly", priority: 0.6 },
  { path: "/listing-map-v2", changeFrequency: "weekly", priority: 0.6 },
  { path: "/listing-map-v3", changeFrequency: "weekly", priority: 0.6 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/service", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.6 },
  { path: "/compare", changeFrequency: "monthly", priority: 0.5 },
  { path: "/loan-calculator", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/blog-grid", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog-list", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog-single", changeFrequency: "weekly", priority: 0.6 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.7 },
  { path: "/shop-single", changeFrequency: "weekly", priority: 0.6 },
  { path: "/cart", changeFrequency: "monthly", priority: 0.4 },
  { path: "/checkout", changeFrequency: "monthly", priority: 0.4 },
  { path: "/complete-order", changeFrequency: "monthly", priority: 0.3 },
];
