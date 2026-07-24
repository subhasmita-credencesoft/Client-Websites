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
    "Hotel Near Anjuna Beach Goa | Budget Stay Arpora | Redwings Studio",
  description:
    "Looking for a hotel near Anjuna Beach, Goa? Redwings Studio in Arpora offers budget studio apartments just 5 km from Anjuna. Swimming pool, free Wi-Fi, free parking. Rooms from ₹1,950/night.",
  keywords: [
    "Hotel Near Anjuna Beach",
    "Stay Near Anjuna",
    "Budget Hotel Near Anjuna",
    "Apartments Near Anjuna",
    "Anjuna Beach Hotel Goa",
    "Arpora Hotel Near Anjuna",
    "Redwings Studio Anjuna",
    "Anjuna Flea Market Hotel",
  ],
  alternates: {
    canonical: "https://redwingsstudio.com/hotel-near-anjuna-beach",
  },
  openGraph: {
    title:
      "Hotel Near Anjuna Beach Goa | Redwings Studio Arpora",
    description:
      "Budget studio apartments near Anjuna Beach, Goa. Just 5 km from Anjuna. Swimming pool, free Wi-Fi. From ₹1,950/night.",
    url: "https://redwingsstudio.com/hotel-near-anjuna-beach",
    images: [
      {
        url: "/nearbyattraction/anjunabeach.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Near Anjuna Beach Goa — Redwings Studio Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Near Anjuna Beach — Redwings Studio Goa",
    description:
      "Budget hotel near Anjuna Beach, Goa. Studio apartments from ₹1,950/night.",
    images: ["/nearbyattraction/anjunabeach.jpg"],
  },
};

const nearbyThings = [
  {
    name: "Anjuna Beach",
    distance: "5 km",
    time: "15 min drive",
    description:
      "Famous for its vibrant Wednesday Flea Market and dramatic rocky coastline.",
  },
  {
    name: "Anjuna Flea Market",
    distance: "5 km",
    time: "15 min drive",
    description:
      "Legendary Wednesday market with bohemian clothing, jewellery, and live music.",
  },
  {
    name: "Chapora Fort",
    distance: "7 km",
    time: "18 min drive",
    description:
      "Famous for panoramic sea views and its appearance in Dil Chahta Hai.",
  },
  {
    name: "Vagator Beach",
    distance: "7 km",
    time: "18 min drive",
    description:
      "A quieter, picturesque beach flanked by red cliffs and Chapora Fort.",
  },
];

export default function HotelNearAnjunaBeachPage() {
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
                name: "Hotel Near Anjuna Beach",
                url: `${SITE_URL}/hotel-near-anjuna-beach`,
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
            name: "Redwings Studio — Hotel Near Anjuna Beach",
            description:
              "Budget hotel near Anjuna Beach, Goa. Studio apartments in Arpora with swimming pool, free Wi-Fi, and free parking. 5 km from Anjuna Beach.",
            url: `${SITE_URL}/hotel-near-anjuna-beach`,
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
            image: `${SITE_URL}/nearbyattraction/anjunabeach.jpg`,
          }),
        }}
      />

      <PageHero
        image="/nearbyattraction/anjunabeach.jpg"
        eyebrow="Location"
        title="Hotel Near Anjuna Beach, Goa"
        description="Budget studio apartments in Arpora, just 5 km from Anjuna Beach. Swimming pool, free Wi-Fi, and direct booking."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Availability"
        secondaryHref="/rooms"
        secondaryLabel="View Rooms"
        priority
      />

      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow">Why Stay Near Anjuna Beach?</p>
            <h1 className="display-title text-5xl">
              Your budget-friendly base near Anjuna Beach, Goa
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-9 text-ivory/68">
              Redwings Studio is a budget hotel near Anjuna Beach, located in
              Arpora, just 5 km away. Our 10 owner-managed studio apartments
              offer comfortable stays with swimming pool access, free Wi-Fi, and
              free parking — ideal for couples, families, and budget travelers
              exploring North Goa.
            </p>
            <p className="mt-4 max-w-[65ch] text-lg leading-9 text-ivory/68">
              Anjuna Beach is famous for its vibrant Wednesday Flea Market,
              dramatic rocky coastline, and bohemian culture. Stay at Redwings
              Studio for easy access to Anjuna, Vagator, Chapora Fort, and the
              best of North Goa&apos;s alternative scene.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href={bookingEngineUrl} label="Book Near Anjuna" />
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
              src="/nearbyattraction/anjunabeach.jpg"
              alt="Anjuna Beach, Goa — Near Redwings Studio Arpora"
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
            Close to Anjuna and the best of North Goa
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
          <p className="eyebrow">Rooms Near Anjuna Beach</p>
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
                    alt={`${room.name} near Anjuna Beach, Goa`}
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
          <p className="eyebrow">Book your stay near Anjuna Beach</p>
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
