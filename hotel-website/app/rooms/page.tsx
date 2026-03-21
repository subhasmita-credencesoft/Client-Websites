import type { Metadata } from "next";
import RoomsHero from "../../components/sections/RoomsHero";
import RoomsGrid from "../../components/sections/RoomsGrid";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Rooms & Suites",
  description:
    "Explore rooms and suites at UK's Resort, Khopoli with comfortable stays and thoughtful amenities.",
  path: "/rooms",
  image: "https://bookonelocal.in/cdn/3.avif",
});

export default function RoomsPage() {
  return (
    <div className="site-page">
      <RoomsHero />
      {/* <HeroBookingBarDock /> */}
      <RoomsGrid
      />
    </div>
  );
}
