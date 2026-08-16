export const SITE_NAME = "RAIKO GROUP";
export const SITE_DESCRIPTION =
  "RAIKO GROUP is a trusted automotive dealer offering quality new and used vehicles, auto parts, and expert service.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.raikogroup.com";

export const DEFAULT_OG_IMAGE = "/images/home/1.jpg";

export const CONTACT = {
  phone: "+81 90-63609950",
  email: "raikogroupjpn@gmail.com",
  address: "924-1 Tenma, Fuji, Shizuoka, Japan 419-0205",
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
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/home-automobile", changeFrequency: "daily", priority: 0.95 },
  { path: "/home-auto-part", changeFrequency: "daily", priority: 0.9 },
  { path: "/home-species", changeFrequency: "daily", priority: 0.9 },
  { path: "/listing-v1", changeFrequency: "daily", priority: 0.9 },
  { path: "/listing-map-v1", changeFrequency: "weekly", priority: 0.65 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/service", changeFrequency: "monthly", priority: 0.7 },
  { path: "/loan-calculator", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/blog-grid", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog-list", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog-single", changeFrequency: "weekly", priority: 0.6 },
];
