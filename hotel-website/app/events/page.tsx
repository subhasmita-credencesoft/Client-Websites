import type { Metadata } from "next";
import EventsHero from "../../components/sections/EventsHero";
import EventsCelebration from "../../components/sections/EventsCelebration";
import EventsImmersiveMoments from "../../components/sections/EventsImmersiveMoments";
import EventsActivitiesShowcase from "../../components/sections/EventsActivitiesShowcase";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Events, Activities & Adventure at UK's Resort Khopoli — Birthdays, Sports & Group Days Near Mumbai",
  description:
    "Plan birthdays, school outings, corporate team days, and activity-led group events at UK's Resort Khopoli near Mumbai.",
  path: "/events",
  image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
});

export default function EventsPage() {
  return (
    <div className="site-page">
      <EventsHero />
      <EventsCelebration />
      
      {/* <CinematicParallaxBreak 
        title="Unforgettable Milestones" 
        subtitle="Take a virtual walkthrough before you visit, then tell us what kind of day you’re planning and we’ll help shape it around your group." 
        image="https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif"
      />
       */}
      {/* Section intentionally removed to avoid repeating the same event story with AI/meta commentary. */}
      {/* <EventsActivitiesShowcase /> */}
      
      {/* <ImmersiveGallery title="Moments of Joy" /> */}
    </div>
  );
}
