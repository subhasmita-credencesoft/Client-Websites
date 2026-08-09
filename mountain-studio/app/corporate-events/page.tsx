import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { corporateHighlights, imageSet } from "@/lib/data";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Corporate Events in Arpora Goa | Day Events & Group Stays | Redwings Studio",
  description:
    "Plan corporate day events, company gatherings, and team retreats at Redwings Studio, Arpora, Goa. Private coordination, group room booking, resort setting. Near Baga Beach.",
  keywords: [
    "Corporate Events Goa",
    "Company Day Event Arpora",
    "Team Retreat Goa",
    "Group Accommodation Arpora",
    "Business Meeting Venue Goa",
    "Corporate Training Goa",
    "Redwings Studio Corporate",
  ],
  alternates: { canonical: "https://redwingsstudio.com/corporate-events" },
  openGraph: {
    title: "Corporate Events — Redwings Studio Goa | Team Retreats Arpora",
    description:
      "Corporate day events, team retreats, and private gatherings at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-11.jpeg",
        width: 1200,
        height: 630,
        alt: "Corporate Events at Redwings Studio Goa — Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Events — Redwings Studio Goa",
    description:
      "Corporate events, team retreats, and group stays in Arpora, Goa.",
    images: ["/mountain-studio/gallery-11.jpeg"],
  },
};

export default function CorporateEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Corporate Events", url: `${SITE_URL}/corporate-events` }])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(corporateFaqs, "/corporate-events")) }}
      />
      <PageHero
        image={imageSet.ballroom}
        eyebrow="Corporate Events"
        title="Corporate gatherings with a relaxed resort setting."
        description="From company day events to small group gatherings, Redwings Studio supports private hosting with direct coordination."
        priority
      />

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          {corporateHighlights.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[30px] border border-gold/16 bg-dark-2 p-8"
              style={{ animation: `fadeup 0.8s ${index * 0.08}s both` }}
            >
              <div className="font-mono text-sm tracking-[0.3em] text-gold-light">{item.stat}</div>
              <h2 className="mt-4 font-display text-4xl">{item.title}</h2>
              <p className="mt-5 text-sm leading-8 text-ivory/64">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 className="display-title text-5xl">A business event environment that still feels beautifully human.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 text-sm uppercase tracking-[0.28em] text-ivory/55">
              <div className="rounded-2xl border border-gold/12 bg-dark px-4 py-4">Hybrid AV production</div>
              <div className="rounded-2xl border border-gold/12 bg-dark px-4 py-4">Fast private check-in</div>
              <div className="rounded-2xl border border-gold/12 bg-dark px-4 py-4">Executive dining rooms</div>
              <div className="rounded-2xl border border-gold/12 bg-dark px-4 py-4">Branded welcome moments</div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px]">
            <Image src={imageSet.lobby} alt="Corporate venue" width={1000} height={800} className="aspect-[5/4] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <form className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
            {["Company", "Name", "Email", "Date", "Guests"].map((field) => (
              <label key={field} className="mb-5 block">
                <span className="mb-3 block text-xs uppercase tracking-[0.28em] text-gold-light">{field}</span>
                <input className="w-full rounded-2xl border border-gold/16 bg-dark px-4 py-4" />
              </label>
            ))}
            <button className="rounded-full bg-gold px-6 py-4 text-xs uppercase tracking-[0.3em] text-dark">Request Proposal</button>
          </form>
          <div>
            <p className="eyebrow">Event Design</p>
            <h2 className="display-title text-5xl">Need an investor summit, brand launch, or retreat that feels elevated?</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/68">
              Our corporate team manages logistics, staging, flow, guest arrival, and rooming strategy so your event feels calm, premium, and sharply executed.
            </p>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell grid gap-5 sm:grid-cols-2">
          <Link
            href="/events"
            className="group rounded-[24px] border border-gold/16 bg-dark-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-glow"
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
            href="/picnic"
            className="group rounded-[24px] border border-gold/16 bg-dark-2 p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-glow"
          >
            <h2 className="font-display text-3xl">Picnic Experiences</h2>
            <p className="mt-3 text-sm leading-7 text-ivory/64">
              Looking for a more relaxed outdoor gathering? See curated family
              and corporate picnic packages.
            </p>
            <span className="mt-4 inline-block text-xs uppercase tracking-[0.28em] text-gold">
              Explore Picnics →
            </span>
          </Link>
        </div>
      </section>

      <FaqSection
        eyebrow="Corporate Events"
        title="Frequently asked questions about corporate events at Redwings Studio"
        description="Company gatherings, team retreats, and group stays in Arpora, Goa."
        faqs={corporateFaqs}
      />
    </>
  );
}

const corporateFaqs = [
  {
    question: "Can Redwings Studio host corporate events and team offsites?",
    answer:
      "Yes. Redwings Studio hosts company day events, team retreats, group gatherings, and corporate picnics with private coordination, fast check-in, and a relaxed resort setting near Baga Beach.",
  },
  {
    question: "Can the whole team stay overnight at the venue?",
    answer:
      "Yes. With 10 studio apartments under one banner, the property can plan group accommodation, including multi-room blocks for overnight retreats and company outings.",
  },
  {
    question: "What facilities are available for corporate gatherings?",
    answer:
      "Facilities include open lawns and poolside zones, executive dining areas, fast private check-in, AV production support, and free parking for delegates.",
  },
  {
    question: "How do I request a proposal for a corporate event?",
    answer:
      "Use the proposal form on this page or contact the team directly with your company details, date, guest count, and requirements for a tailored quote.",
  },
  {
    question: "Where is the corporate events venue located?",
    answer:
      "Redwings Studio is at House No. 275/1, F30, Abalone Resort, Gorbhat, Goa 403516 — 3 km from Baga Beach and 2 km from the Arpora Saturday Night Market.",
  },
];
