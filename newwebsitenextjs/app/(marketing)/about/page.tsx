import type { Metadata } from "next";
import { AboutPage } from "@/components/features/about/about-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  path: "/about",
  description:
    "Discover The Mountain Resort in Karjat — a 7-acre private estate designed for destination weddings, luxury stays, and scenic celebrations with mountain views and hospitality-led hosting.",
});

export default function Page() {
  return <AboutPage />;
}
