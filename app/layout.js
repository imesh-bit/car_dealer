import { Inter } from "next/font/google";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import "../public/css/main.css";
import ScrollToTop from "./components/common/ScrollTop";
import ClientInitializer from "./components/common/ClientInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Voiture - Automotive & Car Dealer Next.js Template",
  description: "Voiture is a modern Automotive and Car Dealer Next.js template.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ClientInitializer />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
