import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const serif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Mountain by Redwings",
  description:
    "Premium destination wedding and celebration estate in Karjat with luxury stays, private venues, and all-inclusive hospitality.",
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
      <body suppressHydrationWarning className={`${serif.variable} ${sans.variable} theme-hotel antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
