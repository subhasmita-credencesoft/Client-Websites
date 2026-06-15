import type { Metadata } from "next";
import ExperiencesHero from "../../components/sections/ExperiencesHero";
import LongFormExperience from "../../components/sections/LongFormExperience";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Experience at UK's Resort, Khopoli",
  description:
    "Discover a refreshing retreat at UK's Resort, Khopoli. Unwind with spacious rooms, a water park, rain dance, outdoor games, and premium dining near Mumbai & Pune.",
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
