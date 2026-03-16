import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { PropertyDataProvider } from "../components/providers/PropertyDataProvider";

const bodyFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const serifFont = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

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
      <body
        suppressHydrationWarning
        className={`${bodyFont.variable} ${serifFont.variable} theme-hotel antialiased`}
      >
        <PropertyDataProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </PropertyDataProvider>
      </body>
    </html>
  );
}
