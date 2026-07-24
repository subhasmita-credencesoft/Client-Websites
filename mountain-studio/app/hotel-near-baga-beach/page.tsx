import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, imageSet, rooms } from "@/lib/data";
import {
  breadcrumbSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Hotel Near Baga Beach Goa | Budget Stay in Arpora | Redwings Studio",
  description:
    "Looking for a hotel near Baga Beach, Goa? Redwings Studio in Arpora offers budget-friendly studio apartments just 3 km from Baga Beach. Swimming pool, free Wi-Fi, free parking. Rooms from ₹1,950/night. Book direct.",
  keywords: [
    "Hotel Near Baga Beach",
    "Stay Near Baga Beach",
    "Budget Hotel Near Baga Beach",
    "Homestay Near Baga Beach",
    "Apartments Near Baga Beach",
    "Baga Beach Hotel Goa",
    "Arpora Hotel Near Baga",
    "Budget Stay Arpora Goa",
    "Studio Apartment Near Baga",
    "Redwings Studio Baga Beach",
  ],
  alternates: {
    canonical: "https://redwingsstudio.com/hotel-near-baga-beach",
  },
  openGraph: {
    title:
      "Hotel Near Baga Beach Goa | Redwings Studio Arpora",
    description:
      "Budget studio apartments near Baga Beach, Goa. Just 3 km from Baga. Swimming pool, free Wi-Fi. From ₹1,950/night.",
    url: "https://redwingsstudio.com/hotel-near-baga-beach",
    images: [
      {
        url: "/nearbyattraction/bagabeach.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Near Baga Beach Goa — Redwings Studio Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Near Baga Beach — Redwings Studio Goa",
    description:
      "Budget hotel near Baga Beach, Goa. Studio apartments from ₹1,950/night in Arpora.",
    images: ["/nearbyattraction/bagabeach.jpg"],
  },
};

const nearbyThings = [
  {
    name: "Baga Beach",
    distance: "3 km",
    time: "10 min drive",
    description:
      "One of North Goa's most popular beaches with water sports, beach shacks, and nightlife.",
  },
  {
    name: "Tito's Lane",
    distance: "3 km",
    time: "10 min drive",
    description:
      "Goa's famous nightlife strip with clubs, bars, and restaurants.",
  },
  {
    name: "Saturday Night Market",
    distance: "2 km",
    time: "8 min drive",
    description:
      "Vibrant weekly night market with food stalls, live music, and handcrafted goods.",
  },
  {
    name: "Calangute Beach",
    distance: "4 km",
    time: "12 min drive",
    description:
      "Known as the Queen of Beaches with golden sand and coastal dining.",
  },
];

export default function HotelNearBagaBeachPage() {
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
                name: "Hotel Near Baga Beach",
                url: `${SITE_URL}/hotel-near-baga-beach`,
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
            name: "Redwings Studio — Hotel Near Baga Beach",
            description:
              "Budget hotel near Baga Beach, Goa. Studio apartments in Arpora with swimming pool, free Wi-Fi, and free parking. 3 km from Baga Beach.",
            url: `${SITE_URL}/hotel-near-baga-beach`,
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
            image: `${SITE_URL}/nearbyattraction/bagabeach.jpg`,
          }),
        }}
      />

      <PageHero
        image="/nearbyattraction/bagabeach.jpg"
        eyebrow="Location"
        title="Hotel Near Baga Beach, Goa"
        description="Budget studio apartments in Arpora, just 3 km from Baga Beach. Swimming pool, free Wi-Fi, and direct booking support."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Availability"
        secondaryHref="/rooms"
        secondaryLabel="View Rooms"
        priority
      />

      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow">Why Stay Near Baga Beach?</p>
            <h1 className="display-title text-5xl">
              Your budget-friendly base near Baga Beach, Goa
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-9 text-ivory/68">
              Redwings Studio is a budget hotel near Baga Beach, located in
              Arpora, just 3 km away. Our 10 owner-managed studio apartments
              offer comfortable stays with swimming pool access, free Wi-Fi, and
              free parking — ideal for couples, families, and budget travelers
              exploring North Goa.
            </p>
            <p className="mt-4 max-w-[65ch] text-lg leading-9 text-ivory/68">
              Whether you want to enjoy water sports at Baga Beach, explore the
              Saturday Night Market in Arpora, or experience the nightlife at
              Tito&apos;s Lane, Redwings Studio is perfectly positioned for your
              Goa vacation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href={bookingEngineUrl} label="Book Near Baga Beach" />
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
              src="/nearbyattraction/bagabeach.jpg"
              alt="Baga Beach, Goa — Near Redwings Studio Arpora"
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
            Close to Baga Beach and everything around it
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
          <p className="eyebrow">Rooms Near Baga Beach</p>
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
                    alt={`${room.name} near Baga Beach, Goa`}
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
          <p className="eyebrow">Book your stay near Baga Beach</p>
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
