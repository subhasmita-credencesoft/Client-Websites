import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { bookingEngineUrl, imageSet } from "@/lib/data";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Contact Redwings Studio Goa | Phone, Email & Address in Arpora",
  description:
    "Contact Redwings Studio at Abalone Resort, Gorbhat, Arpora, Goa 403516. Call +91 9167680996 or email for room availability, group bookings, couple stays, and stay enquiries. Direct booking support.",
  keywords: [
    "Contact Redwings Studio",
    "Redwings Studio Phone Number",
    "Redwings Studio Goa Address",
    "Hotel in Arpora Contact",
    "Book Room Goa",
    "Group Booking Goa",
    "Redwings Studio Email",
    "Abalone Resort Goa Contact",
  ],
  alternates: { canonical: "https://redwingsstudio.com/contact" },
  openGraph: {
    title: "Contact Redwings Studio Goa — Phone, Email & Address",
    description:
      "Call +91 9167680996 or email for room availability and booking support. Located at Abalone Resort, Gorbhat, Arpora, Goa 403516.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact Redwings Studio Goa — Phone and Address",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Redwings Studio Goa",
    description:
      "Call +91 9167680996. Abalone Resort, Gorbhat, Arpora, Goa 403516.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

const contactFaqs = [
  {
    question: "How do I contact Redwings Studio in Arpora, Goa?",
    answer:
      "Call +91 9167680996 or +91 9763988999, or email psomvanshi9@gmail.com. The team provides direct availability checks, group booking support, and arrival guidance without intermediaries.",
  },
  {
    question: "What is the official address of Redwings Studio Goa?",
    answer:
      "Redwings Studio is at House No. 275/1, F30, Abalone Resort, Gorbhat, Goa 403516 — near Baga Beach (3 km) and the Arpora Saturday Night Market (2 km).",
  },
  {
    question: "Can I book a room by phone?",
    answer:
      "Yes. Call +91 9167680996 to check live availability and confirm your studio apartment directly with the owner-managed team for the best available rate.",
  },
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in starts at 1:00 PM and check-out is by 11:00 AM. Request early arrival or late departure in advance, subject to availability on your date.",
  },
  {
    question: "Is Redwings Studio near Baga and Calangute beaches?",
    answer:
      "Yes. Redwings Studio is 3 km from Baga Beach, 4 km from Calangute Beach, and 5 km from Anjuna Beach — an ideal base for exploring North Goa.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Contact", url: `${SITE_URL}/contact` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(contactFaqs, "/contact")) }}
      />
      <PageHero
        image={imageSet.homeHero}
        eyebrow="Direct Property Contact"
        title="Contact Redwings Studio"
        description="Speak directly with our team for room availability, booking support, property details, and owner-managed stay enquiries."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Availability"
        secondaryHref="tel:+919167680996"
        secondaryLabel="Call The Team"
        priority
      />

      <section className="section-space">
        <div className="container-shell grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
            <p className="eyebrow">Direct Support</p>
            <h2 className="font-display text-4xl">
              Everything you need to confirm a Goa stay without filling a form.
            </h2>
            <p className="mt-6 text-base leading-8 text-ivory/68">
              Redwings Studio is managed with direct owner-side coordination,
              so guests can call or email for availability, group planning, room
              combinations, and arrival guidance.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                ["Property Name", "Redwings Studio"],
                ["Location", "Gorbhat, Arpora, North Goa"],
                ["Inventory", "10 rooms under the Redwings banner"],
                ["Occupancy", "20 couples + 10 additional beds"],
                ["Check-In", "1:00 PM"],
                ["Check-Out", "11:00 AM"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[24px] border border-gold/14 bg-dark p-5"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-gold-light">
                    {label}
                  </p>
                  <p className="mt-3 text-base leading-7 text-ivory/72">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
              <h2 className="font-display text-4xl">Location</h2>
              <div className="mt-8 space-y-5 text-ivory/68">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-1 text-gold" size={18} />
                  <span>
                    <strong className="block text-ivory">Property</strong>
                    Redwings Studio, Arpora, North Goa
                  </span>
                </p>
                <p className="text-sm leading-7 text-ivory/64">
                  Studio apartment stay inventory at Gorbhat, Arpora, managed
                  under the Redwings Studio banner. Near Baga Beach, Calangute
                  Beach, and Anjuna Beach.
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-1 text-gold" size={18} />
                  <span>
                    <strong className="block text-ivory">
                      Official Address
                    </strong>
                    House No. 275/1, F30, Abalone Resort, Gorbhat, Goa -
                    403516
                  </span>
                </p>
                <p className="text-sm leading-7 text-ivory/64">
                  Owner: Pratibha Avinash Somvanshi
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
              <h2 className="font-display text-4xl">
                Direct Contact Details
              </h2>
              <div className="mt-8 space-y-5 text-ivory/68">
                <p className="flex items-start gap-3">
                  <Phone className="mt-1 text-gold" size={18} />
                  <Link
                    href="tel:+919167680996"
                    className="transition hover:text-gold"
                  >
                    +91 9167680996
                  </Link>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="mt-1 text-gold" size={18} />
                  <Link
                    href="tel:+919763988999"
                    className="transition hover:text-gold"
                  >
                    +91 9763988999
                  </Link>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="mt-1 text-gold" size={18} />
                  <Link
                    href="tel:+919833335933"
                    className="transition hover:text-gold"
                  >
                    +91 9833335933
                  </Link>
                </p>
                <p className="flex items-start gap-3">
                  <MessageCircle className="mt-1 text-gold" size={18} />
                  <Link
                    href="mailto:psomvanshi9@gmail.com"
                    className="transition hover:text-gold"
                  >
                    psomvanshi9@gmail.com
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Getting In Touch"
        title="Frequently asked questions about contacting Redwings Studio"
        description="How to reach us, where we are, and how to book directly in Arpora, Goa."
        faqs={contactFaqs}
      />

      <section className="section-space bg-dark-2">
        <div className="container-shell text-center">
          <p className="eyebrow">Quick Links</p>
          <h2 className="display-title text-5xl">
            Explore Redwings Studio
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/rooms"
              className="rounded-full border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.34em] text-gold transition hover:bg-gold hover:text-dark"
            >
              View Rooms
            </Link>
            <Link
              href={bookingEngineUrl}
              className="rounded-full border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.34em] text-gold transition hover:bg-gold hover:text-dark"
            >
              Check Availability
            </Link>
            <Link
              href="/tariff"
              className="rounded-full border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.34em] text-gold transition hover:bg-gold hover:text-dark"
            >
              View Tariff
            </Link>
            <Link
              href="/nearby-attractions"
              className="rounded-full border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.34em] text-gold transition hover:bg-gold hover:text-dark"
            >
              Nearby Attractions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
