import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

export const metadata: Metadata = {
  title: "Hotel Redwings Castle | Panvel Hotel Stay",
  description:
    "Hotel Redwings Castle in Panvel offers Maharaja Suite, Supreme, Luxury, Deluxe, and Standard room stays with practical amenities and accessible city connectivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
