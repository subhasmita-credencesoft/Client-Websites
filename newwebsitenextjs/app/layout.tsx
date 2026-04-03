import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { ClientEnhancements } from "@/components/providers/client-enhancements";

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
      <body className="overflow-x-hidden antialiased" suppressHydrationWarning>
        {children}
        <ClientEnhancements />
      </body>
    </html>
  );
}
