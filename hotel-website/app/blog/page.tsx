import type { Metadata } from "next";
import BlogHero from "../../components/sections/BlogHero";
import BlogFilterGrid from "../../components/sections/BlogFilterGrid";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Read travel notes, resort updates, dining inspiration, and getaway stories from UK's Resort.",
  path: "/blog",
  image: "/images/room_2.jpg",
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
