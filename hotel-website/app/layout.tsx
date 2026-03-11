import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const bodyFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amoja Hotel & Resort",
  description: "A refined hotel experience with curated stays and resort amenities.",
  icons: {
    icon: "/window.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${playfair.variable} theme-hotel antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
