import type { Metadata } from "next";
import { AboutPage } from "@/components/features/about/about-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  path: "/about",
  description:
    "Discover The Mountain Resort in Karjat — a 7-acre private estate designed for destination weddings, luxury stays, and scenic celebrations with mountain views and hospitality-led hosting.",
  keywords: [
    "about mountain resort karjat",
    "redwings resort karjat",
    "destination wedding venue about",
    "luxury resort about karjat",
    "7 acre estate wedding",
  ],
});

export default function Page() {
  return <AboutPage />;
}
