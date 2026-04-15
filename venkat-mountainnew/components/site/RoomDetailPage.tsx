import { notFound } from "next/navigation";

import { roomDetails, siteMeta } from "@/lib/site-data";
import { formatPrice } from "@/lib/format";
import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { SplitShowcase } from "@/components/site/SplitShowcase";
import Button from "@/components/ui/Button";

export function RoomDetailPage({ slug }: { slug: string }) {
  const room = roomDetails.find((item) => item.slug === slug);

  if (!room) {
    notFound();
  }

  const relatedRooms = roomDetails.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <HeroSection
        image={room.heroImage}
        eyebrow={room.category}
        title={room.name}
        subtitle={room.tagline}
        cta={{ label: "Check Availability", href: siteMeta.bookingEngineHref }}
        secondaryCta={{ label: "View Packages", href: "/offers" }}
        specs={[
          `Capacity: ${room.capacity}`,
          `Tariff: ${formatPrice(room.tariff)}`,
          `Perfect for: ${room.perfectFor}`,
        ]}
      />
      <Section background="light">
        <SplitShowcase
          image={room.gallery[1] ?? room.heroImage}
          alt={room.name}
          sectionLabel="ROOM DETAILS"
          title={room.name}
          paragraphs={room.description}
          points={room.highlightPoints}
        />
      </Section>
      <Section
        background="lighter"
        sectionLabel="WHAT'S INCLUDED"
        title="Key features and comforts"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {room.amenities.map((amenity) => (
            <div
              key={amenity}
              className="rounded-[24px] border border-[var(--neutral-200)] bg-white px-5 py-4 text-base text-[var(--text-secondary)] shadow-[0_2px_8px_rgba(15,24,25,0.05)]"
            >
              <span className="mr-3 text-[var(--accent-gold)]">◆</span>
              {amenity}
            </div>
          ))}
        </div>
      </Section>
      <Section
        background="light"
        sectionLabel="SPECIFICATIONS"
        title="Room facts at a glance"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Stay Details"
            description={`Designed for ${room.capacity.toLowerCase()} with ${room.bedding.toLowerCase()} and a ${room.size.toLowerCase()} layout.`}
            details={[`Capacity: ${room.capacity}`, `Size: ${room.size}`, `Bedding: ${room.bedding}`]}
          />
          <InfoCard
            title="Room Specifications"
            description="A balance of practical comfort and event-friendly stay planning for destination wedding hosting."
            details={room.roomSpecs}
          />
          <InfoCard
            title="Package Value"
            description="This room can be paired with all-inclusive event packages for a cleaner guest planning workflow."
            details={[
              `Room tariff: ${formatPrice(room.tariff)}`,
              `Weekday package: ${formatPrice(room.packagePrice)} per person`,
              `Weekend package: ${formatPrice(room.weekendPackagePrice)} per person`,
            ]}
          />
        </div>
      </Section>
      <Section
        background="lighter"
        sectionLabel="IDEAL FOR"
        title="Who this room serves best"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {room.idealFor.map((item) => (
            <InfoCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </Section>
      <Section
        background="light"
        sectionLabel="ROOM GALLERY"
        title="A closer look at the stay"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {room.gallery.map((image, index) => (
            <div
              key={`${room.slug}-${image}-${index}`}
              className="overflow-hidden rounded-[28px] border border-[var(--neutral-200)] bg-white shadow-[0_2px_8px_rgba(15,24,25,0.05)]"
            >
              <div
                className="aspect-[4/3] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </Section>
      <Section
        background="lighter"
        sectionLabel="PRICING & BOOKING"
        title="Book this room with confidence"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[var(--neutral-200)] bg-white p-8 shadow-[0_2px_10px_rgba(15,24,25,0.08)]">
            <div className="space-y-4 text-base leading-8 text-[var(--text-secondary)]">
              <p>Room tariff: {formatPrice(room.tariff)}</p>
              <p>Weekday per person package: {formatPrice(room.packagePrice)}</p>
              <p>Weekend per person package: {formatPrice(room.weekendPackagePrice)}</p>
              <p>Meals, venue access, and celebration support are aligned with the selected package structure.</p>
            </div>
          </div>
          <div className="rounded-[28px] bg-[var(--primary-900)] p-8 text-white shadow-[0_8px_24px_rgba(15,24,25,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-gold)]">Direct Actions</p>
            <h3 className="mt-4 text-3xl font-bold">Ready to reserve this room?</h3>
            <div className="mt-8 flex flex-col gap-4">
              <Button href={siteMeta.bookingEngineHref}>Check Availability</Button>
              <Button href="/offers" variant="light-outline">
                View Packages
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Section
        background="light"
        sectionLabel="OTHER ROOMS"
        title="Explore more stay options"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {relatedRooms.map((item) => (
            <InfoCard
              key={item.slug}
              image={item.heroImage}
              title={item.name}
              description={`${item.tagline} Tariff starts at ${formatPrice(item.tariff)}.`}
              href={`/${item.slug}`}
              hrefLabel="View Details"
            />
          ))}
        </div>
      </Section>
      <HeroSection
        image={room.heroImage}
        eyebrow="BOOK THIS ROOM"
        title={`Ready to book ${room.name}?`}
        subtitle="Share your dates and guest requirements, and our team will help match the best package."
        cta={{ label: "Check Availability Now", href: siteMeta.bookingEngineHref }}
      />
    </>
  );
}
