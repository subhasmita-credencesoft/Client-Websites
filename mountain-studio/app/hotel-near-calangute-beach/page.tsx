import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, rooms } from "@/lib/data";
import {
  breadcrumbSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Hotel Near Calangute Beach Goa | Budget Stay Arpora | Redwings Studio",
  description:
    "Looking for a hotel near Calangute Beach, Goa? Redwings Studio in Arpora offers budget studio apartments just 4 km from Calangute. Swimming pool, free Wi-Fi, free parking. Rooms from ₹1,950/night.",
  keywords: [
    "Hotel Near Calangute Beach",
    "Stay Near Calangute",
    "Budget Hotel Near Calangute",
    "Apartments Near Calangute",
    "Calangute Beach Hotel Goa",
    "Arpora Hotel Near Calangute",
    "Redwings Studio Calangute",
  ],
  alternates: {
    canonical: "https://redwingsstudio.com/hotel-near-calangute-beach",
  },
  openGraph: {
    title:
      "Hotel Near Calangute Beach Goa | Redwings Studio Arpora",
    description:
      "Budget studio apartments near Calangute Beach, Goa. Just 4 km from Calangute. Swimming pool, free Wi-Fi. From ₹1,950/night.",
    url: "https://redwingsstudio.com/hotel-near-calangute-beach",
    images: [
      {
        url: "/nearbyattraction/chalanguebeach.png",
        width: 1200,
        height: 630,
        alt: "Hotel Near Calangute Beach Goa — Redwings Studio Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Near Calangute Beach — Redwings Studio Goa",
    description:
      "Budget hotel near Calangute Beach, Goa. Studio apartments from ₹1,950/night.",
    images: ["/nearbyattraction/chalanguebeach.png"],
  },
};

const nearbyThings = [
  {
    name: "Calangute Beach",
    distance: "4 km",
    time: "12 min drive",
    description:
      "Known as the Queen of Beaches with golden sand, bustling markets, and coastal dining.",
  },
  {
    name: "Baga Beach",
    distance: "3 km",
    time: "10 min drive",
    description:
      "Popular beach with water sports, parasailing, and beach shacks.",
  },
  {
    name: "Anjuna Beach",
    distance: "5 km",
    time: "15 min drive",
    description:
      "Famous for its vibrant Wednesday Flea Market and dramatic rocky coastline.",
  },
  {
    name: "Candolim Beach",
    distance: "6 km",
    time: "15 min drive",
    description:
      "A long, peaceful stretch of sand away from the busiest crowds.",
  },
];

export default function HotelNearCalanguteBeachPage() {
  const featuredRooms = rooms.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              {
                name: "Hotel Near Calangute Beach",
                url: `${SITE_URL}/hotel-near-calangute-beach`,
              },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: "Redwings Studio — Hotel Near Calangute Beach",
            description:
              "Budget hotel near Calangute Beach, Goa. Studio apartments in Arpora with swimming pool, free Wi-Fi, and free parking. 4 km from Calangute Beach.",
            url: `${SITE_URL}/hotel-near-calangute-beach`,
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "House No. 275/1, F30, Abalone Resort, Gorbhat",
              addressLocality: "Arpora, Goa",
              addressRegion: "GA",
              postalCode: "403516",
              addressCountry: "IN",
            },
            telephone: "+91-9167680996",
            priceRange: "₹₹",
            image: `${SITE_URL}/nearbyattraction/chalanguebeach.png`,
          }),
        }}
      />

      <PageHero
        image="/nearbyattraction/chalanguebeach.png"
        eyebrow="Location"
        title="Hotel Near Calangute Beach, Goa"
        description="Budget studio apartments in Arpora, just 4 km from Calangute Beach. Swimming pool, free Wi-Fi, and direct booking."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Availability"
        secondaryHref="/rooms"
        secondaryLabel="View Rooms"
        priority
      />

      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow">Why Stay Near Calangute Beach?</p>
            <h1 className="display-title text-5xl">
              Your budget-friendly base near Calangute Beach, Goa
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-9 text-ivory/68">
              Redwings Studio is a budget hotel near Calangute Beach, located in
              Arpora, just 4 km away. Our 10 owner-managed studio apartments
              offer comfortable stays with swimming pool access, free Wi-Fi, and
              free parking — ideal for couples, families, and budget travelers
              exploring North Goa.
            </p>
            <p className="mt-4 max-w-[65ch] text-lg leading-9 text-ivory/68">
              Calangute Beach, known as the Queen of Beaches, is one of
              Goa&apos;s most popular destinations. Stay at Redwings Studio for
              easy access to Calangute, Baga, Anjuna, and Candolim beaches.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href={bookingEngineUrl} label="Book Near Calangute" />
              <LuxuryButton
                href="/rooms"
                label="View Rooms"
                variant="ghost"
                className="border-gold/55"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px]">
            <Image
              src="/nearbyattraction/chalanguebeach.png"
              alt="Calangute Beach, Goa — Near Redwings Studio Arpora"
              width={900}
              height={1000}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <p className="eyebrow">Distance from Redwings Studio</p>
          <h2 className="display-title text-5xl">
            Close to Calangute and the best of North Goa
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {nearbyThings.map((item) => (
              <article
                key={item.name}
                className="rounded-[28px] border border-gold/16 bg-dark p-6"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-gold-light">
                  {item.distance} · {item.time}
                </p>
                <h3 className="mt-4 font-display text-3xl">{item.name}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/64">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <p className="eyebrow">Rooms Near Calangute Beach</p>
          <h2 className="display-title text-5xl">
            Studio apartments from ₹1,950/night
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredRooms.map((room) => (
              <Link
                key={room.slug}
                href={`/rooms/${room.slug}`}
                className="group overflow-hidden rounded-[28px] border border-gold/16 bg-dark-2 transition duration-500 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={`${room.name} near Calangute Beach, Goa`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl">{room.name}</h3>
                  <p className="mt-2 text-sm text-ivory/64">
                    {room.size} sqft · {room.beds} · {room.view}
                  </p>
                  <p className="mt-3 text-gold">
                    From ₹{room.price.toLocaleString("en-IN")}/night
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/rooms"
              className="text-sm uppercase tracking-[0.28em] text-gold transition hover:text-gold-light"
            >
              View All 5 Room Types →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell text-center">
          <p className="eyebrow">Book your stay near Calangute Beach</p>
          <h2 className="display-title text-5xl">
            Reserve your studio apartment today
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LuxuryButton href={bookingEngineUrl} label="Book Now — From ₹1,950" />
            <LuxuryButton href="/tariff" label="View Tariff" variant="ghost" />
            <LuxuryButton href="/contact" label="Contact Us" variant="ghost" />
          </div>
        </div>
      </section>
    </>
  );
}
