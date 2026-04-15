import {
  CalendarRange,
  Camera,
  CarFront,
  Crown,
  HeartHandshake,
  Martini,
  Music4,
  Quote,
  ShieldCheck,
  Sparkles,
  Trees,
  VolumeX,
} from "lucide-react";

import { HomeHeroSection } from "@/components/site/HomeHeroSection";
import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { PackageTabs } from "@/components/site/PackageTabs";
import { Section } from "@/components/site/Section";
import { SplitShowcase } from "@/components/site/SplitShowcase";
import Button from "@/components/ui/Button";
import AnimatedContent from "@/components/sections/AnimatedContent";
import { homeTestimonials, imageCatalog, packages, roomDetails, siteMeta } from "@/lib/site-data";

const venueHighlights = [
  {
    title: "Mountain View Destination",
    description: "A scenic destination backdrop that instantly lifts the visual character of every celebration.",
    image: imageCatalog.mountainView01,
  },
  {
    title: "Wedding Lawn & Event Zones",
    description: "Dedicated spaces for haldi, mehendi, sangeet, cocktail, reception, and ceremony flow.",
    image: imageCatalog.weddingLawn01,
  },
  {
    title: "Private Estate Experience",
    description: "Full venue access with the privacy and exclusivity couples look for in a destination wedding property.",
    image: imageCatalog.weddingZone,
  },
  {
    title: "Poolside Celebrations",
    description: "24x7 pool access and social-event energy paired with a dramatic celebration setting.",
    image: imageCatalog.poolside01,
  },
];

const whyChooseUsHighlights = [
  {
    title: "Spacious lawn ideal for weddings, receptions, and large gatherings",
    description:
      "Wide-open celebration lawns create a refined sense of scale for ceremonies, receptions, and high-energy social moments.",
    icon: Trees,
    stat: "Large-format hosting",
  },
  {
    title: "Scenic mountain surroundings perfect for photography and videography",
    description:
      "Natural mountain backdrops and estate perspectives give every ritual, portrait, and candid moment a stronger visual character.",
    icon: Camera,
    stat: "Signature photo setting",
  },
  {
    title: "Ample parking space with private-estate style exclusivity",
    description:
      "A smoother arrival experience, strong privacy, and operational ease help the event feel premium from the first guest impression.",
    icon: CarFront,
    stat: "Arrival made seamless",
  },
  {
    title: "Dedicated areas for sangeet, haldi, mehendi, cocktails, and reception",
    description:
      "Distinct celebration zones allow each event to feel intentional, beautifully staged, and well-coordinated across the property.",
    icon: Music4,
    stat: "Multi-event flow",
  },
];

const specialAdvantages = [
  {
    title: "Unlimited music hours on the lawn with no sound restrictions",
    description:
      "Celebrate longer with a freer entertainment flow, designed for sangeet nights, receptions, and high-energy wedding moments.",
    icon: Music4,
    stat: "Music flexibility",
  },
  {
    title: "24x7 pool access for downtime and social celebrations",
    description:
      "Poolside time adds a resort-style rhythm to the stay experience, from relaxed mornings to cocktail-driven evening gatherings.",
    icon: Martini,
    stat: "All-day leisure",
  },
  {
    title: "Zero sound license required and no additional permit cost",
    description:
      "Hosts can plan celebrations with greater clarity and fewer operational barriers, helping budgets stay cleaner and execution smoother.",
    icon: VolumeX,
    stat: "Operational ease",
  },
  {
    title: "Full venue access with private-estate exclusivity",
    description:
      "The estate feels fully yours during the celebration, creating a more premium, private, and emotionally connected destination wedding experience.",
    icon: Crown,
    stat: "Private estate access",
  },
];

export default function Home() {
  return (
    <>
      <HomeHeroSection
        slides={[
          { image: imageCatalog.weddingLawn02, alt: "The Mountain wedding lawn" },
          { image: imageCatalog.mountainView02, alt: "The Mountain mountain view estate" },
          { image: imageCatalog.poolside01, alt: "The Mountain poolside celebration area" },
          { image: imageCatalog.stayEstate, alt: "The Mountain accommodation estate" },
        ]}
        eyebrow="Your Dream Wedding"
        title="Green Beauty in 7 Acres | Destination Wedding & Event Venue"
        subtitle="Thank you for considering The Mountain, Karjat as your venue for creating unforgettable memories."
        cta={{ label: "Check Availability", href: siteMeta.bookingEngineHref }}
        secondaryCta={{ label: "Explore Venues", href: "/wedding-lawns" }}
      />

      <Section
        background="lighter"
        sectionLabel="WELCOME TO THE MOUNTAIN"
        title="A private destination venue designed for unforgettable celebrations"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <AnimatedContent animateOnView distance={36} duration={0.65} ease="power3.out">
            <InfoCard
              icon={<HeartHandshake className="h-5 w-5" />}
              title="Luxury, Privacy, and Hospitality"
              description="The Mountain offers a luxurious, private, and fully equipped destination estate surrounded by greenery, open lawns, and scenic views."
            />
          </AnimatedContent>
          <AnimatedContent animateOnView distance={36} duration={0.65} ease="power3.out" delay={0.1}>
            <InfoCard
              icon={<CalendarRange className="h-5 w-5" />}
              title="Built for Wedding Weekends"
              description="Our property structure supports ceremonies, rooming, meals, photography, and guest movement in one coordinated venue experience."
            />
          </AnimatedContent>
          <AnimatedContent animateOnView distance={36} duration={0.65} ease="power3.out" delay={0.2}>
            <InfoCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Per Person, Per Day Packages"
              description="Packages are planned per person per day and include stay, meals, services, lawn access, and venue usage."
            />
          </AnimatedContent>
        </div>
      </Section>

      <Section background="light">
        <SplitShowcase
          image={imageCatalog.mountainView02}
          alt="The Mountain wedding venue"
          sectionLabel="ESTATE OVERVIEW"
          title="The right setting for your full celebration flow"
          paragraphs={[
            "The Mountain brings together scenic mountain surroundings, a beautiful natural ambience, spacious lawns, and the privacy needed for a truly destination-style wedding experience.",
            "From intimate rituals to larger receptions, the property is designed so every event can feel connected, well-hosted, and visually memorable.",
          ]}
          cta={{ label: "Discover The Estate", href: "/about", variant: "outline" }}
        />
      </Section>

      <Section
        background="lighter"
        sectionLabel="VENUE HIGHLIGHTS"
        title="Mountain view destination hosting with celebration-ready infrastructure"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {venueHighlights.map((item) => (
            <InfoCard
              key={item.title}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      <Section
        background="light"
        sectionLabel="WHY COUPLES CHOOSE US"
        title="Designed around the needs of destination weddings"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {whyChooseUsHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[30px] border border-[rgba(198,138,75,0.18)] bg-[linear-gradient(180deg,#fffdfa_0%,#f7f1e7_100%)] p-8 shadow-[0_14px_36px_rgba(15,24,25,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,24,25,0.14)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,138,75,0.65),transparent)]" />
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,rgba(198,138,75,0.18)_0%,rgba(198,138,75,0.08)_100%)] text-[var(--accent-gold)] shadow-[inset_0_0_0_1px_rgba(198,138,75,0.2)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-[rgba(198,138,75,0.18)] bg-white/70 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-gold)]">
                    {item.stat}
                  </span>
                </div>

                <h3 className="mt-7 text-[2rem] font-semibold leading-[1.18] text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-5 text-[1.02rem] leading-8 text-[var(--text-secondary)]">
                  {item.description}
                </p>

                <div className="mt-8 h-px w-full bg-[linear-gradient(90deg,rgba(198,138,75,0.35),rgba(198,138,75,0.04))]" />
              </div>
            );
          })}
        </div>
      </Section>

      <Section background="lighter">
        <SplitShowcase
          image={imageCatalog.stayEstate}
          alt="The Mountain hospitality"
          reverse
          sectionLabel="STAY & HOSPITALITY"
          title="Stay, meals, and venue access aligned in one celebration package"
          paragraphs={[
            "Our wedding packages are built to reduce planning friction by combining accommodation, meals, service, lawn access, and venue usage in one per person, per day structure.",
            "If the guest count exceeds 140 people, we also have a nearby 10 BHK property available at additional cost for overflow stay planning.",
          ]}
          points={[
            "Multiple stay options for families, guests, and premium allocations",
            "Breakfast, hi-tea, lunch, starters, and dinner support",
            "Private estate access with venue usage built into the package",
            "A nearby 10 BHK option for larger celebrations",
          ]}
          cta={{ label: "View Packages", href: "/offers" }}
        />
      </Section>

      <Section
        background="light"
        sectionLabel="ACCOMMODATION OPTIONS"
        title="Stay formats for every guest mix"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {roomDetails.slice(0, 3).map((room) => (
            <InfoCard
              key={room.slug}
              image={room.heroImage}
              title={room.name}
              description={room.summary}
              details={[
                `Capacity: ${room.capacity}`,
                `Perfect for: ${room.perfectFor}`,
                `Tariff starts at Rs. ${room.tariff.toLocaleString("en-IN")}`,
              ]}
              href={`/${room.slug}`}
              hrefLabel="View Details"
            />
          ))}
        </div>
        <div className="mt-10">
          <Button href="/rooms">View All Rooms</Button>
        </div>
      </Section>

      <Section
        background="lighter"
        sectionLabel="SPECIAL ADVANTAGES"
        title="The flexibility hosts ask for most"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {specialAdvantages.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[30px] border border-[rgba(198,138,75,0.18)] bg-[linear-gradient(180deg,#fffdfa_0%,#f6efe3_100%)] p-8 shadow-[0_16px_40px_rgba(15,24,25,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(15,24,25,0.14)]"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(198,138,75,0.14)_0%,rgba(198,138,75,0)_72%)]" />
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,rgba(198,138,75,0.18)_0%,rgba(198,138,75,0.08)_100%)] text-[var(--accent-gold)] shadow-[inset_0_0_0_1px_rgba(198,138,75,0.2)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-[rgba(198,138,75,0.18)] bg-white/75 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-gold)]">
                    {item.stat}
                  </span>
                </div>

                <h3 className="mt-7 text-[1.95rem] font-semibold leading-[1.18] text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-5 text-[1.02rem] leading-8 text-[var(--text-secondary)]">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-gold)]">
                  <Sparkles className="h-4 w-4" />
                  Celebration-ready advantage
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        background="light"
        sectionLabel="FLEXIBLE PRICING"
        title="Wedding packages for different event budgets"
        subtitle="Choose between weekday and weekend pricing with all-inclusive hospitality, stay planning, and premium upgrade options."
      >
        <PackageTabs />
      </Section>

      <Section
        background="lighter"
        sectionLabel="RULES & REGULATIONS"
        title="Clear terms before you confirm the dates"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Check-In / Payment Terms"
            description="A clear booking process keeps planning and guest logistics simple."
            details={[
              "50% advance required to block the dates",
              "Remaining 50% before check-in",
              "Final headcount is used for package calculation",
              "Check-in: 2:00 PM | Check-out: 11:00 AM",
            ]}
          />
          <InfoCard
            title="Property Rules"
            description="These guidelines protect the venue experience and keep the event environment smooth for everyone."
            details={[
              "Government ID proof mandatory for all staying guests",
              "Outside catering is not allowed in package bookings",
              "Any property damage will be chargeable",
              "Decorators and vendors require prior approval",
            ]}
          />
          <InfoCard
            title="Guest Conduct"
            description="The estate is flexible, but celebrations should still be handled responsibly."
            details={[
              "Loud music allowed within property limits respectfully",
              "Smoking permitted only in designated areas",
              "Lost belongings remain the guest's responsibility",
              "Dates can be rescheduled subject to availability",
            ]}
            href="/rules"
            hrefLabel="View Full Terms"
          />
        </div>
      </Section>

      <Section
        background="light"
        sectionLabel="GUEST EXPERIENCES"
        title="What families remember most"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {homeTestimonials.map((item, index) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-[30px] border border-[rgba(198,138,75,0.18)] bg-white p-8 shadow-[0_18px_44px_rgba(15,24,25,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,24,25,0.14)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(198,138,75,0.9),rgba(198,138,75,0.18))]" />
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-50)] text-[var(--accent-gold)] shadow-[inset_0_0_0_1px_rgba(198,138,75,0.18)]">
                  <Quote className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-[rgba(198,138,75,0.18)] bg-[var(--bg-lighter)] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-gold)]">
                  {`0${index + 1}`}
                </span>
              </div>

              <p className="mt-7 text-[1.3rem] leading-9 text-[var(--text-secondary)]">
                "{item.quote}"
              </p>

              <div className="mt-8 border-t border-[rgba(198,138,75,0.18)] pt-5">
                <h3 className="text-[2rem] font-semibold leading-[1.1] text-[var(--text-primary)]">
                  {item.name}
                </h3>
                <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-gold)]">
                  Verified guest impression
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <HeroSection
        image={imageCatalog.poolside02}
        eyebrow="Start Planning"
        title="Ready to host your wedding at The Mountain, Karjat?"
        subtitle="Speak with our team about dates, guest count, stay planning, and the right package for your event."
        cta={{ label: "Start Planning Now", href: siteMeta.bookingEngineHref }}
        secondaryCta={{ label: "Contact Our Team", href: "/contact" }}
        specs={packages[1].inclusions.slice(0, 3)}
      />
    </>
  );
}
