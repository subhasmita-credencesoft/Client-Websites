import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { SplitShowcase } from "@/components/site/SplitShowcase";
import { imageCatalog } from "@/lib/site-data";

const values = [
  "Private estate hospitality",
  "Warm and responsive guest care",
  "Clear event coordination",
  "Natural beauty with premium comfort",
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.mountainView01}
        eyebrow="About The Estate"
        title="Know The Mountain"
        subtitle="A destination wedding and event venue in Karjat shaped around privacy, greenery, and celebration-ready hospitality."
        cta={{ label: "Book a Visit", href: "/contact" }}
        specs={[
          "7 acres of lush green natural landscape",
          "Stay options, lawns, and event spaces in one property",
          "A destination venue planned for weddings and multi-day celebrations",
        ]}
      />

      <Section background="light">
        <SplitShowcase
          image={imageCatalog.weddingLawn01}
          alt="The Mountain story"
          sectionLabel="OUR STORY"
          title="A venue created for unforgettable memories"
          paragraphs={[
            "The Mountain was shaped as a destination property where weddings can feel premium, private, and naturally beautiful at the same time.",
            "Its strongest advantage is that hospitality, stays, meals, lawns, and celebration spaces are all aligned within one estate, making destination weddings easier to plan and smoother to host.",
          ]}
        />
      </Section>

      <Section
        background="lighter"
        sectionLabel="WHAT DEFINES THE PROPERTY"
        title="A celebration estate, not just a venue"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <InfoCard
            title="Our Mission"
            description="To help families and couples host destination weddings in Karjat with better privacy, more natural beauty, and stronger hospitality coordination."
          />
          <InfoCard
            title="Our Vision"
            description="To be a trusted celebration venue where weddings, receptions, and stay-based events feel relaxed, premium, and beautifully managed."
          />
        </div>
      </Section>

      <Section
        background="light"
        sectionLabel="CORE VALUES"
        title="What we want every celebration to feel like"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <InfoCard
              key={value}
              title={value}
              description="This principle shapes how we handle guest experience, event planning support, and the overall property environment."
            />
          ))}
        </div>
      </Section>

      <Section
        background="lighter"
        sectionLabel="PROPERTY HIGHLIGHTS"
        title="Why the estate works well for weddings"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            "Spacious lawn ideal for weddings and receptions",
            "Multiple event spaces for ceremonies and rituals",
            "Scenic mountain surroundings for photography and videography",
            "Private estate ensuring complete privacy for the event",
            "Pool plus celebration-friendly social spaces",
            "Ample parking and smooth guest arrival flow",
          ].map((item) => (
            <InfoCard
              key={item}
              title={item}
              description="Planned to support both the emotional atmosphere and the practical logistics of destination events."
            />
          ))}
        </div>
      </Section>

      <Section background="light">
        <SplitShowcase
          image={imageCatalog.celebrationSpace}
          alt="Mountain philosophy"
          sectionLabel="OUR PHILOSOPHY"
          title="Luxury should feel welcoming, not overwhelming"
          paragraphs={[
            "The Mountain is designed to feel premium without becoming stiff or overcomplicated. The mood is green, open, private, and naturally celebratory.",
            "That balance matters for weddings, where families want beauty, flexibility, and hospitality quality to work together through every event on the schedule.",
          ]}
        />
      </Section>
    </>
  );
}
