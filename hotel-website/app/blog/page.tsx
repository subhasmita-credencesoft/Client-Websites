import type { Metadata } from "next";
import BlogHero from "../../components/sections/BlogHero";
import BlogFilterGrid from "../../components/sections/BlogFilterGrid";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blog — UK's Resort Khopoli | Travel Tips, Getaway Stories & Resort Updates",
  description:
    "Read travel notes, resort updates, dining inspiration, and weekend getaway stories from UK's Resort Khopoli near Mumbai.",
  path: "/blog",
  image: "https://bookonelocal.in/cdn/3.png",
});

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      {/* <HeroBookingBarDock /> */}
      {/* <BlogFeature /> */}
      <BlogFilterGrid />
    </>
  );
}
