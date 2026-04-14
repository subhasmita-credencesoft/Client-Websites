import type { Metadata } from "next";
import { MountainHomePage } from "@/components/features/home/mountain-home-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  path: "/",
});

export default function Home() {
  return <MountainHomePage />;
}
