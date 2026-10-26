import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NearbyLocations } from "@/components/location/NearbyLocations";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { metaFor } from "@/lib/seo/metadata";

const page = pages.nearby;
export const metadata: Metadata = metaFor(page);

export default function NearbyLocationsPage() {
  return (
    <>
      <HeroFor page={page} />

      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2rem" }} />

          <SectionHeading
            eyebrow="Neighborhood & Connectivity"
            title="Distances to Key Areas in Ludhiana"
            intro="Centrally positioned on Grand Trunk Road directly opposite Ludhiana Railway Station, Hotel The Taksonz gives you effortless access to the city's premier transit routes, heritage monuments, traditional wholesale textile markets, and upscale corporate hubs."
          />

          <NearbyLocations />
        </div>
      </section>

      <CtaBanner
        title="Stay right where the city connects."
        text="Experience comfortable rooms, warm hospitality, and unbeatable central convenience in Ludhiana."
        image="/taksonzhome.avif"
      >
        <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="light" size="lg" arrow>
          Book a Stay
        </ButtonLink>
        <ButtonLink href="/location" variant="ghost" size="lg">
          Directions & Map
        </ButtonLink>
      </CtaBanner>
    </>
  );
}
