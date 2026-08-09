import type { Metadata } from "next";
import Link from "next/link";
import { PicnicPageClient } from "./PicnicPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Picnic Experiences | Family & Corporate Outdoor Events in Arpora Goa",
  description:
    "Plan open-air picnic experiences at Redwings Studio, Arpora, Goa — family outings, corporate lawn events, and curated outdoor gatherings with resort setting and concierge support.",
  keywords: [
    "Picnic Experience Goa",
    "Family Outdoor Events Arpora",
    "Corporate Lawn Events Goa",
    "Outdoor Gathering Goa",
    "Resort Picnic Arpora",
    "Group Picnic North Goa",
  ],
  alternates: { canonical: "https://redwingsstudio.com/picnic" },
  openGraph: {
    title: "Picnic Experiences — Redwings Studio Goa | Outdoor Events",
    description:
      "Family picnics, corporate lawn events, and curated outdoor gatherings at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/hero-secondary.jpeg",
        width: 1200,
        height: 630,
        alt: "Picnic Experiences at Redwings Studio Goa — Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Picnic Experiences — Redwings Studio Goa",
    description: "Family picnics and corporate lawn events in Arpora, Goa.",
    images: ["/mountain-studio/hero-secondary.jpeg"],
  },
};

const picnicFaqs = [
  {
    question: "What is a picnic experience at Redwings Studio?",
    answer:
      "Picnic experiences at Redwings Studio use the 7-acre garden estate in Arpora for open-air family outings, friends' gatherings, and corporate lawn events — with curated packages, games, catering, and concierge support.",
  },
  {
    question: "Can I host a corporate picnic or team outing here?",
    answer:
      "Yes. The lawn and garden spaces host corporate picnics, team-building days, and group outings with private coordination, catering, and ample parking near Baga Beach.",
  },
  {
    question: "What is included in the picnic packages?",
    answer:
      "Packages typically include the lawn or garden space, seating, games, and food options. Contact the team for the current picnic package menu, pricing, and group sizes.",
  },
  {
    question: "How many people can a picnic group accommodate?",
    answer:
      "Group sizes from small family outings to larger corporate batches can be accommodated. Share your headcount and preferred date to confirm availability and layout.",
  },
  {
    question: "Where is the picnic venue located?",
    answer:
      "Redwings Studio is at House No. 275/1, F30, Abalone Resort, Gorbhat, Goa 403516 — just 3 km from Baga Beach and 2 km from the Arpora Saturday Night Market.",
  },
];

export default function PicnicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Picnic", url: `${SITE_URL}/picnic` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(picnicFaqs, "/picnic")) }}
      />
      <PicnicPageClient />
      <FaqSection
        eyebrow="Picnic Experiences"
        title="Frequently asked questions about picnic experiences at Redwings Studio"
        description="Family outings and corporate lawn events on the Arpora estate, Goa."
        faqs={picnicFaqs}
      />
      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-5 sm:grid-cols-2">
          <Link
            href="/events"
            className="group rounded-[24px] border border-gold/16 bg-dark p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-glow"
          >
            <h2 className="font-display text-3xl">Events & Weddings</h2>
            <p className="mt-3 text-sm leading-7 text-ivory/64">
              Explore the open lawns, poolside zones, and 7-acre estate used
              for weddings and private celebrations.
            </p>
            <span className="mt-4 inline-block text-xs uppercase tracking-[0.28em] text-gold">
              Explore Events →
            </span>
          </Link>
          <Link
            href="/corporate-events"
            className="group rounded-[24px] border border-gold/16 bg-dark p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-glow"
          >
            <h2 className="font-display text-3xl">Corporate Events</h2>
            <p className="mt-3 text-sm leading-7 text-ivory/64">
              Company day events, team retreats, and group stays with private
              coordination and fast check-in.
            </p>
            <span className="mt-4 inline-block text-xs uppercase tracking-[0.28em] text-gold">
              Explore Corporate →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
