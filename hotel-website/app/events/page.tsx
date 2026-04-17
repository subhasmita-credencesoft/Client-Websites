import type { Metadata } from "next";
import EventsHero from "../../components/sections/EventsHero";
import EventsCelebration from "../../components/sections/EventsCelebration";
import EventsImmersiveMoments from "../../components/sections/EventsImmersiveMoments";
import EventsActivitiesShowcase from "../../components/sections/EventsActivitiesShowcase";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Events & Activities",
  description:
    "Explore day events, family outings, play zones, adventure activities, and group experiences at UK's Resort.",
  path: "/events",
  image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
});

export default function EventsPage() {
  return (
    <div className="site-page">
      <EventsHero />
      <EventsCelebration />
      
      <CinematicParallaxBreak 
        title="Unforgettable Milestones" 
        subtitle="From grand corporate retreats to thrilling one-day picnics, UK's Resort offers impeccably crafted spaces that breathe life into your most significant gatherings." 
        image="https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif"
      />
      
      <EventsImmersiveMoments />
      {/* <EventsActivitiesShowcase /> */}
      
      {/* <ImmersiveGallery title="Moments of Joy" /> */}
    </div>
  );
}
