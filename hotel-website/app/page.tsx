import type { Metadata } from "next";
import Hero from "../components/sections/Hero";
import HomeLazyStack from "../components/sections/HomeLazyStack";
import { createPageMetadata, SITE_NAME } from "../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "UK's Resort Khopoli — Weekend Getaway Resort Near Mumbai | Water Park & Stay",
  description:
    "Just 90 km from Mumbai, UK's Resort Khopoli offers stay packages, water park, day picnics, corporate events and dining in the Sahyadri foothills.",
  path: "/",
  image: "https://bookonelocal.in/cdn/3.png",
});

export default function Home() {
  return (
    <div className="site-page">
      <Hero />
      <HomeLazyStack />
    </div>
  );
}

