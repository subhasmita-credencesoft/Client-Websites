import type { Metadata } from "next";
import ExperiencesHero from "../../components/sections/ExperiencesHero";
import LongFormExperience from "../../components/sections/LongFormExperience";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "My Experience at UK's Resort Khopoli - Weekend Getaway near Mumbai & Pune",
  description:
    "A detailed first-hand experience review of UK's Resort, Khopoli. Explore family activities, room comfort, buffet dining, swimming pools, rain dance, and nearby spots like Imagicaa.",
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
