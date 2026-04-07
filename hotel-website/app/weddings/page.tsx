import type { Metadata } from "next";
import WeddingsHero from "../../components/sections/WeddingsHero";
import WeddingsCelebration from "../../components/sections/WeddingsCelebration";
import WeddingsImmersiveMoments from "../../components/sections/WeddingsImmersiveMoments";
import WeddingsMeetings from "../../components/sections/WeddingsMeetings";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Weddings & Events",
  description:
    "Plan weddings, celebrations, and events at UK's Resort with elegant indoor and outdoor venues.",
  path: "/weddings",
  image: "https://bookonelocal.in/cdn/4.avif",
});

export default function WeddingsPage() {
  return (
    <>
      <WeddingsHero />
      {/* <HeroBookingBarDock /> */}
      <WeddingsCelebration />
      <WeddingsImmersiveMoments />
      <WeddingsMeetings />
    </>
  );
}
