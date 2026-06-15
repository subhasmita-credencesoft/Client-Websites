import type { Metadata } from "next";
import PageHero from "../../components/sections/PageHero";
import PicnicDetailSection from "../../components/sections/PicnicDetailSection";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "One Day Picnic at UK's Resort, Khopoli | Resort near Mumbai",
  description:
    "Escape to UK's Resort, Khopoli for the ultimate one day picnic. Enjoy water park access, pools, rain dance, games, and buffet meals near Mumbai & Pune.",
  path: "/picnic",
  image: "/picnic.avif",
});

export default function PicnicPage() {
  return (
    <div className="site-page">
      <PageHero
        title="One Day Picnic"
        backgroundImage="https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif"
        backgroundVideo="https://bookonelocal.in/cdn/Picnic.mp4"
        subtitle="Plan vibrant day outings with lawns, family-friendly activities, and buffet dining."
        breadcrumb="Home / Picnic"
      />
      <PicnicDetailSection />
    </div>
  );
}
