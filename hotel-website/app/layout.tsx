import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { PropertyDataProvider } from "../components/providers/PropertyDataProvider";
import SmoothScrollProvider from "../components/providers/SmoothScrollProvider";
import GlobalGsapEffects from "../components/providers/GlobalGsapEffects";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";

export const metadata: Metadata = {
  title: "  UK Resort",
  description: "A refined hotel experience with curated stays and resort amenities.",
  icons: {
    icon: "/images/logo1.png",
    shortcut: "/images/logo1.png",
    apple: "/images/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="theme-hotel antialiased">
        <SmoothScrollProvider>
          <PropertyDataProvider>
            <GlobalGsapEffects />
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTopButton />
          </PropertyDataProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
