import type { Metadata } from "next";
import DiningHero from "../../components/sections/DiningHero";
import DiningShowcase from "../../components/sections/DiningShowcase";
import DiningCulinaryExperience from "../../components/sections/DiningCulinaryExperience";
import DiningMoodSlider from "../../components/sections/DiningMoodSlider";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dining",
  description:
    "Enjoy destination dining, curated menus, and memorable culinary experiences at UK's Resort, Khopoli.",
  path: "/dining",
  image: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif",
});

export default function DiningPage() {
  return (
    <>
      <DiningHero />
      {/* <HeroBookingBarDock /> */}
      <DiningCulinaryExperience />
      <DiningMoodSlider />
      <DiningShowcase />
    </>
  );
}
