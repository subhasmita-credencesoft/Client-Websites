import type { Metadata } from "next";
import ExperiencesHero from "../../components/sections/ExperiencesHero";
import LongFormExperience from "../../components/sections/LongFormExperience";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Experiences at UK's Resort Khopoli — Water Park, Rain Dance, Games & Dining Near Mumbai",
  description:
    "Discover a refreshing retreat at UK's Resort, Khopoli. Unwind with a water park, rain dance, outdoor games, pool, and multi-cuisine dining near Mumbai & Pune.",
  path: "/experiences",
  image: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
});

export default function ExperiencesPage() {
  return (
    <div className="site-page">
      <ExperiencesHero />
      <LongFormExperience />
    </div>
  );
}
