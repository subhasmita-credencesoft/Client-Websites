import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { imageCatalog, roomDetails, siteMeta } from "@/lib/site-data";
import { formatPrice } from "@/lib/format";

export default function RoomsPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.stayRoom01}
        eyebrow="Rooms & Stay"
        title="Accommodation planning for every guest profile"
        subtitle="Multiple stay options for couples, families, host groups, and destination wedding guests."
        cta={{ label: "Check Availability", href: siteMeta.bookingEngineHref }}
        specs={[
          "Room types for standard, premium, family, signature, and private group stays",
          "Packages aligned with stay, meals, lawn access, and venue usage",
          "Nearby 10 BHK support available for guest counts above 140",
        ]}
      />
      <Section
        background="light"
        sectionLabel="STAY OPTIONS"
        title="Choose the right accommodation mix"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {roomDetails.map((room) => (
            <InfoCard
              key={room.slug}
              image={room.heroImage}
              title={room.name}
              description={room.summary}
              details={[
                `Tariff: ${formatPrice(room.tariff)}`,
                `Weekday package: ${formatPrice(room.packagePrice)}`,
                `Capacity: ${room.capacity}`,
              ]}
              href={`/${room.slug}`}
              hrefLabel="View Details"
            />
          ))}
        </div>
      </Section>
    </>
  );
}
