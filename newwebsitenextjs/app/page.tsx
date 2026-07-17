import type { Metadata } from "next";
import { MountainHomePage } from "@/components/features/home/mountain-home-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  path: "/",
  description:
    "The Mountain Resort in Karjat by Redwings — a 7-acre private destination wedding estate with luxury rooms, scenic mountain views, wedding lawns, poolside celebrations, and curated packages near Mumbai and Pune.",
});

export default function Home() {
  return <MountainHomePage />;
}
