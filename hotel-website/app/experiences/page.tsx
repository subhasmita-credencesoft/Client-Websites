import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ExperiencesHero from "../../components/sections/ExperiencesHero";
import BlogFeature from "@/components/sections/BlogFeature";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Experiences",
  description:
    "Discover family activities, leisure experiences, and memorable moments curated at UK's Resort.",
  path: "/experiences",
  image: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
});

const ExperiencesShowcase = dynamic(() => import("../../components/sections/ExperiencesShowcase"), {
  loading: () => <section className="min-h-[70vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const ExperiencesExplore = dynamic(() => import("../../components/sections/ExperiencesExplore"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
        <BlogFeature />
      {/* <ExperiencesIntro /> */}
      <ExperiencesShowcase />
      <ExperiencesExplore />
    </>
  );
}

