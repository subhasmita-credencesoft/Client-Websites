import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { ClientEnhancements } from "@/components/providers/client-enhancements";
import { heroBackgroundUrls } from "@/lib/data/content/media-assets";

export const metadata: Metadata = {
  title: "The Mountain Resort in Karjat , By Redwings",
  description: "Private destination wedding and event venue in Karjat with stay, meals, venue access, and scenic mountain celebrations across 7 acres.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://bookonelocal.in" crossOrigin="anonymous" />
        <link rel="preload" as="image" href={heroBackgroundUrls[0]} fetchPriority="high" />
      </head>
      <body className="overflow-x-hidden antialiased" suppressHydrationWarning>
        {children}
        <ClientEnhancements />
      </body>
    </html>
  );
}
