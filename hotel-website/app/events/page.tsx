import type { Metadata } from "next";
import EventsHero from "../../components/sections/EventsHero";
import EventsCelebration from "../../components/sections/EventsCelebration";
import EventsImmersiveMoments from "../../components/sections/EventsImmersiveMoments";
import EventsZoneAtlas from "../../components/sections/EventsZoneAtlas";
import EventsActivitiesShowcase from "../../components/sections/EventsActivitiesShowcase";
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
    <>
      <EventsHero />
      {/* <HeroBookingBarDock /> */}
      <EventsCelebration />
      <EventsImmersiveMoments />
      {/* <EventsZoneAtlas /> */}
      <EventsActivitiesShowcase />
    </>
  );
}
