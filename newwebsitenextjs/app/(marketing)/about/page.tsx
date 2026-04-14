import type { Metadata } from "next";
import { AboutPage } from "@/components/features/about/about-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
