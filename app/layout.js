import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "../public/css/main.css";
import ScrollToTop from "./components/common/ScrollTop";
import ClientInitializer from "./components/common/ClientInitializer";
import Providers from "./components/common/Providers";
import { OrganizationJsonLd } from "./components/common/JsonLd";
import {
  defaultLocale,
  localeCookieName,
  locales,
} from "@/lib/i18n/config";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Automotive & Car Dealer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Automotive & Car Dealer`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Automotive & Car Dealer`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const initialLocale = locales.includes(cookieLocale)
    ? cookieLocale
    : defaultLocale;

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers initialLocale={initialLocale}>
          <OrganizationJsonLd />
          <ClientInitializer />
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
