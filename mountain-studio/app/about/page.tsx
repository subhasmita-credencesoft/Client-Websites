import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  bookingEngineUrl,
  imageSet,
  studioGallery,
} from "@/lib/data";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Redwings Studio | Owner-Managed Goa Stay in Arpora",
  description:
    "Learn about Redwings Studio Goa — 10 owner-managed studio apartments at Abalone Resort, Gorbhat, Arpora, North Goa. Direct booking support, check-in 1 PM, check-out 11 AM. Budget to pool-view rooms for couples, families, and groups.",
  keywords: [
    "About Redwings Studio",
    "Redwings Studio Goa",
    "Redwings Studio Arpora",
    "Studio Apartments Goa",
    "Homestay in Arpora",
    "Hotel in Arpora Goa",
    "Abalone Resort Goa",
    "Owner managed hotel Goa",
    "Budget Stay Goa",
    "North Goa accommodation",
  ],
  alternates: { canonical: "https://redwingsstudio.com/about" },
  openGraph: {
    title: "About Redwings Studio — Owner-Managed Goa Stay Property",
    description:
      "10 owner-managed studio apartments in Arpora, Goa. Direct booking support, check-in 1 PM, check-out 11 AM.",
    images: [
      {
        url: "/mountain-studio/hero-secondary.jpeg",
        width: 1200,
        height: 630,
        alt: "About Redwings Studio Goa — Studio Apartments in Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Redwings Studio Goa",
    description:
      "10 owner-managed studio apartments in Arpora, Goa. Budget to pool-view rooms.",
    images: ["/mountain-studio/hero-secondary.jpeg"],
  },
};

const propertyFacts = [
  ["Property Name", "Redwings Studio"],
  ["Location", "Gorbhat, Arpora, North Goa"],
  ["Inventory", "10 rooms under the Redwings banner"],
  ["Occupancy", "20 couples + 10 additional beds"],
];

const aboutHighlights = [
  {
    title: "Direct Coordination",
    body: "Guests can connect directly with the Redwings Studio team for availability, room count, and booking support before arrival.",
  },
  {
    title: "Goa Stay Focus",
    body: "The property is built around studio apartment stays in Gorbhat, Goa, with a relaxed resort environment rather than venue-led hosting.",
  },
  {
    title: "Flexible Inventory",
    body: "Redwings Studio combines owner rooms and partner-owner rooms under one banner, making multi-room stay planning much easier.",
  },
];

const bookingFlow = [
  {
    step: "01",
    title: "Review The Property",
    text: "Guests can explore room visuals, common areas, and the general property atmosphere before making a booking enquiry.",
  },
  {
    step: "02",
    title: "Contact The Team",
    text: "Phone and email support help confirm room count, occupancy planning, and the most practical stay format.",
  },
  {
    step: "03",
    title: "Arrive Clearly",
    text: "The stay remains simple with direct support, check-in at 1:00 PM, and check-out at 11:00 AM.",
  },
];

const aboutFaqs = [
  {
    question: "What is Redwings Studio Goa?",
    answer:
      "Redwings Studio is an owner-managed stay property set within Abalone Resort at Gorbhat, Arpora, North Goa. It brings together 10 studio apartments under one banner with direct phone and email booking support.",
  },
  {
    question: "Where is Redwings Studio located?",
    answer:
      "Redwings Studio is at House No. 275/1, F30, Abalone Resort, Gorbhat, Goa 403516 — close to Baga Beach (3 km), the Arpora Saturday Night Market (2 km), Calangute (4 km), and Anjuna (5 km).",
  },
  {
    question: "How many rooms does Redwings Studio have?",
    answer:
      "Redwings Studio has 10 studio apartments across 5 room types — Budget Double, Standard, Superior King, Standard Room Pool Access, and Superior Pool View.",
  },
  {
    question: "Is Redwings Studio suitable for groups and families?",
    answer:
      "Yes. The flexible multi-room inventory makes it easy to plan stays for couples, families, and small groups, with free parking, a swimming pool, and a garden lawn shared with the resort.",
  },
  {
    question: "What are the check-in and check-out times at Redwings Studio?",
    answer:
      "Check-in is from 1:00 PM and check-out is by 11:00 AM. Early arrival and late departure can be requested in advance, subject to availability.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "About", url: `${SITE_URL}/about` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(aboutFaqs, "/about")) }}
      />
      <PageHero
        image="/mountain-studio/hero-secondary.jpeg"
        eyebrow="About"
        title="About Redwings Studio"
        description="A Goa stay property built around owner-managed studio apartments, direct support, and flexible room inventory."
        priority
      />

      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow">About Redwings Studio</p>
            <h2 className="display-title text-5xl">
              A Goa stay property where direct support, clear inventory, and a
              relaxed resort setting come together.
            </h2>
            <p className="mt-6 max-w-[65ch] text-lg leading-9 text-ivory/68">
              Set within Abalone Resort in Gorbhat, Arpora, North Goa,
              Redwings Studio brings together owner-managed studio stays, shared
              resort surroundings, and a cleaner direct-booking experience for
              guests who want clarity before arrival.
            </p>
            <p className="mt-4 max-w-[65ch] text-lg leading-9 text-ivory/68">
              The property is especially suited for couples, families, and small
              groups looking for{" "}
              <Link href="/rooms" className="text-gold underline">
                Goa accommodation
              </Link>{" "}
              backed by direct phone and email coordination.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href="/contact" label="Contact The Team" />
              <LuxuryButton
                href={bookingEngineUrl}
                label="Reserve Your Stay"
                variant="ghost"
                className="border-gold/55"
              />
              <LuxuryButton
                href="/gallery"
                label="View Property Images"
                variant="ghost"
                className="border-gold/55"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px]">
            <Image
              src={imageSet.exterior}
              alt="Redwings Studio exterior view at Abalone Resort, Arpora, North Goa"
              width={900}
              height={1000}
              className="aspect-[4/5] w-full object-cover grayscale transition duration-1000 hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <p className="eyebrow">Property Facts</p>
          <h2 className="display-title text-5xl">
            The key information guests usually need first.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {propertyFacts.map(([label, value]) => (
              <article
                key={label}
                className="rounded-[28px] border border-gold/16 bg-dark-2 p-6"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-gold-light">
                  {label}
                </p>
                <p className="mt-4 text-lg leading-8 text-ivory/72">{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <p className="eyebrow">Property Gallery</p>
          <h2 className="display-title text-5xl">
            A broader look at the spaces, styling, and atmosphere behind
            Redwings Studio.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {studioGallery.slice(0, 6).map((item, index) => (
              <div
                key={`${item.image}-${index}`}
                className={`relative overflow-hidden rounded-[28px] ${
                  index === 0
                    ? "md:col-span-2 min-h-[360px]"
                    : "min-h-[240px]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <h2 className="display-title text-5xl">
            Why Guests Choose Redwings Studio
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {aboutHighlights.map((item) => (
              <div key={item.title} className="group [perspective:1200px]">
                <div className="relative min-h-[260px] rounded-[28px] border border-gold/16 bg-dark-2 p-8 transition duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 rounded-[28px] p-8 [backface-visibility:hidden]">
                    <h3 className="font-display text-4xl">{item.title}</h3>
                  </div>
                  <div className="absolute inset-0 rounded-[28px] p-8 text-base leading-8 text-ivory/66 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    {item.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <p className="eyebrow">How The Stay Works</p>
          <h2 className="display-title text-5xl">
            A simpler booking flow built around direct support.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {bookingFlow.map((item) => (
              <article
                key={item.step}
                className="rounded-[28px] border border-gold/16 bg-dark p-6 sm:p-8"
              >
                <div className="font-mono text-sm tracking-[0.3em] text-gold-light">
                  {item.step}
                </div>
                <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/64">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Common Questions"
        title="About Redwings Studio and staying in Arpora, Goa"
        description="The details guests usually want before booking an owner-managed stay at Redwings Studio."
        faqs={aboutFaqs}
      />

      <section className="section-space">
        <div className="container-shell text-center">
          <p className="eyebrow">
            Ready to book your Goa stay?
          </p>
          <h2 className="display-title text-5xl">
            Plan your stay at Redwings Studio
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LuxuryButton href="/rooms" label="View All Rooms" />
            <LuxuryButton
              href={bookingEngineUrl}
              label="Check Availability"
              variant="ghost"
            />
            <LuxuryButton
              href="/tariff"
              label="View Tariff"
              variant="ghost"
            />
          </div>
        </div>
      </section>
    </>
  );
}
