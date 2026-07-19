import {
  DEFAULT_OG_IMAGE,
  NO_INDEX_PATHS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./site-config";

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}) {
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const shouldNoIndex =
    noIndex || NO_INDEX_PATHS.some((blockedPath) => path.startsWith(blockedPath));

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(shouldNoIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export function createListingMetadata(car) {
  const title = car.title;
  const description =
    car.tagline ||
    `${car.title} - ${car.condition} ${car.make} ${car.model}. Price: ¥${Number(car.price).toLocaleString()}.`;
  const path = `/listing-single-v1/${car.id}`;
  const image = car.image || DEFAULT_OG_IMAGE;

  return createPageMetadata({
    title,
    description,
    path,
    image,
  });
}
