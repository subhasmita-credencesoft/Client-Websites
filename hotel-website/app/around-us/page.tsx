import type { Metadata } from "next";
import ContactHero from "../../components/sections/ContactHero";
import ContactAttractions from "../../components/sections/ContactAttractions";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Around Us",
  description:
    "Explore attractions, scenic escapes, and local destinations around UK's Resort in Khopoli.",
  path: "/around-us",
  image: "https://bookonelocal.in/cdn/Water-Park-1.jpg",
});

export default function AroundUsPage() {
  return (
    <>
      <ContactHero />
      <ContactAttractions />
    </>
  );
}
