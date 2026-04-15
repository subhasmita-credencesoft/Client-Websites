import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { SplitShowcase } from "@/components/site/SplitShowcase";
import { imageCatalog } from "@/lib/site-data";

const venues = [
  {
    title: "Spacious Lawn",
    image: imageCatalog.weddingLawn01,
    description: "Ideal for weddings, receptions, large gatherings, and open celebration layouts.",
  },
  {
    title: "Ceremony & Ritual Zones",
    image: imageCatalog.eventSpace,
    description: "Flexible event spaces suitable for haldi, mehendi, rituals, and family-led functions.",
  },
  {
    title: "Private Celebration Corners",
    image: imageCatalog.weddingZone,
    description: "Useful for intimate functions, pre-wedding moments, and family-led celebrations.",
  },
  {
    title: "Poolside Celebration Space",
    image: imageCatalog.poolside01,
    description: "A lively setting for cocktail nights, social gatherings, and post-event energy.",
  },
];

export default function WeddingLawnsPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.weddingLawn02}
        eyebrow="Venues & Event Spaces"
        title="Dedicated zones for every wedding event"
        subtitle="From intimate rituals to larger lawn celebrations, The Mountain offers a venue mix built for full destination wedding flow."
        specs={[
          "Private estate for exclusive event hosting",
          "Dedicated areas for sangeet, haldi, mehendi, cocktail, and reception",
          "Scenic surroundings for photography, videography, and guest arrival impact",
        ]}
      />

      <Section background="light">
        <SplitShowcase
          image={imageCatalog.mountainView02}
          alt="Venue overview"
          sectionLabel="VENUE OVERVIEW"
          title="A 7-acre destination venue with room to celebrate properly"
          paragraphs={[
            "The Mountain gives couples and planners the advantage of hosting multiple functions within one private property instead of splitting the celebration across scattered venues.",
            "That creates smoother guest movement, simpler hospitality coordination, and a much more connected wedding experience from check-in to check-out.",
          ]}
        />
      </Section>

      <Section
        background="lighter"
        sectionLabel="VENUE HIGHLIGHTS"
        title="Spaces that support the full wedding calendar"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {venues.map((venue) => (
            <InfoCard
              key={venue.title}
              image={venue.image}
              title={venue.title}
              description={venue.description}
            />
          ))}
        </div>
      </Section>

      <Section
        background="light"
        sectionLabel="WHY THE FLOW WORKS"
        title="What the property makes easier"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Private estate ensuring complete privacy",
            "Mountain-facing natural ambience for premium visual character",
            "Multiple event spaces for better celebration sequencing",
            "Full venue access planned around your event",
            "Parking, stay, meals, and venues connected in one estate",
          ].map((item) => (
            <InfoCard
              key={item}
              title={item}
              description="This reduces planning friction and helps the destination wedding feel more complete, organized, and immersive."
            />
          ))}
        </div>
      </Section>
    </>
  );
}
