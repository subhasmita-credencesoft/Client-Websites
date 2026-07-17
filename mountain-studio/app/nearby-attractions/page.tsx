import type { Metadata } from "next";
import { NearbyAttractionsPageClient } from "./NearbyAttractionsPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Nearby Attractions & Tourist Places",
  description:
    "Explore tourist places near Redwings Studio, Goa — Baga Beach, Calangute Beach, Anjuna Flea Market, Fort Aguada, Chapora Fort, Fontainhas, and more. Distances and travel info included.",
  alternates: { canonical: "https://redwingsstudio.com/nearby-attractions" },
  openGraph: {
    title: "Nearby Attractions — Redwings Studio Goa",
    description: "Top tourist places near Redwings Studio, Goa — beaches, forts, markets, and heritage sites with distances.",
    images: [
      {
        url: "/nearbyattraction/bagabeach.jpg",
        width: 1200,
        height: 630,
        alt: "Goa Beach — Nearby Attractions from Redwings Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nearby Attractions — Redwings Studio Goa",
    description: "Top tourist places near Redwings Studio, Goa with distances.",
    images: ["/nearbyattraction/bagabeach.jpg"],
  },
};

const attractions = [
  {
    name: "Baga Beach",
    distance: "3 km",
    driveTime: "10 min",
    category: "Beach",
    description: "One of North Goa's most popular beaches, known for water sports like parasailing, jet skiing, and banana boat rides. Lively beach shacks and nightlife along the shore.",
    image: "/nearbyattraction/bagabeach.jpg",
    slug: "baga-beach"
  },
  {
    name: "Calangute Beach",
    distance: "4 km",
    driveTime: "12 min",
    category: "Beach",
    description: "Known as the Queen of Beaches, Calangute offers a long stretch of golden sand, bustling markets, and coastal dining. A favourite for swimming and sunbathing.",
    image: "/nearbyattraction/chalanguebeach.png",
    slug: "calangute-beach"
  },
  {
    name: "Anjuna Beach",
    distance: "5 km",
    driveTime: "15 min",
    category: "Beach",
    description: "Famous for its vibrant Wednesday Flea Market and dramatic rocky coastline. Anjuna blends bohemian culture, trance music heritage, and scenic sunset views.",
    image: "/nearbyattraction/anjunabeach.jpg",
    slug: "anjuna-beach"
  },
  {
    name: "Vagator Beach",
    distance: "7 km",
    driveTime: "18 min",
    category: "Beach",
    description: "A quieter, picturesque beach flanked by red cliffs and Chapora Fort. Known for its dramatic scenery, beach clubs, and laid-back atmosphere.",
    image: "/nearbyattraction/vagator%20beach.jpg",
    slug: "vagator-beach"
  },
  {
    name: "Candolim Beach",
    distance: "6 km",
    driveTime: "15 min",
    category: "Beach",
    description: "A long, peaceful stretch of sand away from the busiest crowds. Candolim offers calm waters, beach resorts, and a relaxed coastal vibe.",
    image: "/nearbyattraction/chandolim%20beach.png",
    slug: "candolim-beach"
  },
  {
    name: "Fort Aguada",
    distance: "10 km",
    driveTime: "20 min",
    category: "Heritage",
    description: "A well-preserved 17th-century Portuguese fortress with an iconic lighthouse. Offers sweeping views of the Arabian Sea and surrounding coastline.",
    image: "/nearbyattraction/fortarguda.webp",
    slug: "fort-aguada"
  },
  {
    name: "Chapora Fort",
    distance: "7 km",
    driveTime: "18 min",
    category: "Heritage",
    description: "Famous for its panoramic sea views and its appearance in the Bollywood film Dil Chahta Hai. A short hike leads to stunning cliff-top vistas.",
    image: "/nearbyattraction/fortarguda.webp",
    slug: "chapora-fort"
  },
  {
    name: "Anjuna Flea Market",
    distance: "5 km",
    driveTime: "15 min",
    category: "Market",
    description: "A legendary Wednesday market offering bohemian clothing, jewellery, handicrafts, and live music. A must-visit for unique souvenirs and local flavour.",
    image: "/nearbyattraction/anhunaflexmarket.jpg",
    slug: "anjuna-flea-market"
  },
  {
    name: "Saturday Night Market, Arpora",
    distance: "2 km",
    driveTime: "8 min",
    category: "Market",
    description: "A vibrant weekly night market with food stalls, live performances, handcrafted goods, and a buzzing atmosphere. Walking distance from the property.",
    image: "/nearbyattraction/saturdaymarketarmorA.jpg",
    slug: "saturday-night-market-arpora"
  },
  {
    name: "Tito's Lane, Baga",
    distance: "3 km",
    driveTime: "10 min",
    category: "Nightlife",
    description: "Goa's most famous nightlife strip with clubs, bars, and restaurants. Tito's Lane comes alive after dark with music, dancing, and social energy.",
    image: "/nearbyattraction/TITOSBga.jpg",
    slug: "titos-lane-baga"
  },
  {
    name: "Fontainhas, Panaji",
    distance: "15 km",
    driveTime: "30 min",
    category: "Heritage",
    description: "Goa's vibrant Latin Quarter with colourful Portuguese-era houses, art galleries, quaint bakeries, and winding narrow streets full of character.",
    image: "/nearbyattraction/panaji.jpg",
    slug: "fontainhas-panaji"
  },
  {
    name: "Basilica of Bom Jesus, Old Goa",
    distance: "18 km",
    driveTime: "35 min",
    category: "Heritage",
    description: "A UNESCO World Heritage Site housing the mortal remains of St. Francis Xavier. A masterpiece of Baroque architecture and a key landmark of Old Goa.",
    image: "/nearbyattraction/basilicajeus.jpg",
    slug: "basilica-bom-jesus"
  },
  {
    name: "Parra Road",
    distance: "3 km",
    driveTime: "10 min",
    category: "Scenic",
    description: "An iconic palm-tree-lined road perfect for a leisurely drive or bike ride. A popular photography spot and one of Goa's most recognised scenic routes.",
    image: "/nearbyattraction/pararoad.webp",
    slug: "parra-road"
  },
  {
    name: "Dudhsagar Waterfalls",
    distance: "58 km",
    driveTime: "1 hr 30 min",
    category: "Nature",
    description: "One of India's tallest waterfalls, cascading through lush Western Ghats forest. A spectacular day trip combining nature, wildlife, and spice plantation visits.",
    image: "/nearbyattraction/dudhsagarwaterfall.webp",
    slug: "dudhsagar-waterfalls"
  },
  {
    name: "Arambol Beach",
    distance: "12 km",
    driveTime: "25 min",
    category: "Beach",
    description: "A relaxed, bohemian beach in North Goa known for its fresh water lake, drum circles at sunset, and a laid-back traveller community.",
    image: "/nearbyattraction/arambolbeach.jpg",
    slug: "arambol-beach"
  },
  {
    name: "Spice Plantations, Ponda",
    distance: "22 km",
    driveTime: "40 min",
    category: "Nature",
    description: "Lush spice plantations offering guided tours through cardamom, pepper, and vanilla gardens. Often paired with traditional Goan lunch and elephant encounters.",
    image: "/nearbyattraction/spiceplantation.avif",
    slug: "spice-plantations-ponda"
  }
];

const categoryOrder = ["Beach", "Heritage", "Market", "Nightlife", "Scenic", "Nature"];

export default function NearbyAttractionsPage() {
  const sortedAttractions = [...attractions].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Nearby Attractions", url: `${SITE_URL}/nearby-attractions` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Tourist Attractions Near Redwings Studio Goa",
            description: "Top tourist places to visit near Redwings Studio in Arpora, North Goa, including beaches, forts, markets, and heritage sites.",
            numberOfItems: attractions.length,
            itemListElement: sortedAttractions.map((attraction, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "TouristAttraction",
                name: attraction.name,
                description: attraction.description,
                image: attraction.image,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Goa",
                  addressRegion: "GA",
                  addressCountry: "IN"
                },
                touristType: attraction.category
              }
            }))
          }),
        }}
      />
      <NearbyAttractionsPageClient attractions={sortedAttractions} />
    </>
  );
}
