import { NO_INDEX_PATHS, SITE_URL } from "@/lib/site-config";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: NO_INDEX_PATHS,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
