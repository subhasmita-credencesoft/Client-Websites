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
        url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=630&fit=crop",
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
    images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=630&fit=crop"],
  },
};

const attractions = [
  {
    name: "Baga Beach",
    distance: "3 km",
    driveTime: "10 min",
    category: "Beach",
    description: "One of North Goa's most popular beaches, known for water sports like parasailing, jet skiing, and banana boat rides. Lively beach shacks and nightlife along the shore.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    slug: "baga-beach"
  },
  {
    name: "Calangute Beach",
    distance: "4 km",
    driveTime: "12 min",
    category: "Beach",
    description: "Known as the Queen of Beaches, Calangute offers a long stretch of golden sand, bustling markets, and coastal dining. A favourite for swimming and sunbathing.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
    slug: "calangute-beach"
  },
  {
    name: "Anjuna Beach",
    distance: "5 km",
    driveTime: "15 min",
    category: "Beach",
    description: "Famous for its vibrant Wednesday Flea Market and dramatic rocky coastline. Anjuna blends bohemian culture, trance music heritage, and scenic sunset views.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    slug: "anjuna-beach"
  },
  {
    name: "Vagator Beach",
    distance: "7 km",
    driveTime: "18 min",
    category: "Beach",
    description: "A quieter, picturesque beach flanked by red cliffs and Chapora Fort. Known for its dramatic scenery, beach clubs, and laid-back atmosphere.",
    image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&h=600&fit=crop",
    slug: "vagator-beach"
  },
  {
    name: "Candolim Beach",
    distance: "6 km",
    driveTime: "15 min",
    category: "Beach",
    description: "A long, peaceful stretch of sand away from the busiest crowds. Candolim offers calm waters, beach resorts, and a relaxed coastal vibe.",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=600&fit=crop",
    slug: "candolim-beach"
  },
  {
    name: "Fort Aguada",
    distance: "10 km",
    driveTime: "20 min",
    category: "Heritage",
    description: "A well-preserved 17th-century Portuguese fortress with an iconic lighthouse. Offers sweeping views of the Arabian Sea and surrounding coastline.",
    image: "https://images.unsplash.com/photo-1590050752117-298138c5b84f?w=800&h=600&fit=crop",
    slug: "fort-aguada"
  },
  {
    name: "Chapora Fort",
    distance: "7 km",
    driveTime: "18 min",
    category: "Heritage",
    description: "Famous for its panoramic sea views and its appearance in the Bollywood film Dil Chahta Hai. A short hike leads to stunning cliff-top vistas.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
    slug: "chapora-fort"
  },
  {
    name: "Anjuna Flea Market",
    distance: "5 km",
    driveTime: "15 min",
    category: "Market",
    description: "A legendary Wednesday market offering bohemian clothing, jewellery, handicrafts, and live music. A must-visit for unique souvenirs and local flavour.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",
    slug: "anjuna-flea-market"
  },
  {
    name: "Saturday Night Market, Arpora",
    distance: "2 km",
    driveTime: "8 min",
    category: "Market",
    description: "A vibrant weekly night market with food stalls, live performances, handcrafted goods, and a buzzing atmosphere. Walking distance from the property.",
    image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&h=600&fit=crop",
    slug: "saturday-night-market-arpora"
  },
  {
    name: "Tito's Lane, Baga",
    distance: "3 km",
    driveTime: "10 min",
    category: "Nightlife",
    description: "Goa's most famous nightlife strip with clubs, bars, and restaurants. Tito's Lane comes alive after dark with music, dancing, and social energy.",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&h=600&fit=crop",
    slug: "titos-lane-baga"
  },
  {
    name: "Fontainhas, Panaji",
    distance: "15 km",
    driveTime: "30 min",
    category: "Heritage",
    description: "Goa's vibrant Latin Quarter with colourful Portuguese-era houses, art galleries, quaint bakeries, and winding narrow streets full of character.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
    slug: "fontainhas-panaji"
  },
  {
    name: "Basilica of Bom Jesus, Old Goa",
    distance: "18 km",
    driveTime: "35 min",
    category: "Heritage",
    description: "A UNESCO World Heritage Site housing the mortal remains of St. Francis Xavier. A masterpiece of Baroque architecture and a key landmark of Old Goa.",
    image: "https://images.unsplash.com/photo-1590050752117-298138c5b84f?w=800&h=600&fit=crop",
    slug: "basilica-bom-jesus"
  },
  {
    name: "Parra Road",
    distance: "3 km",
    driveTime: "10 min",
    category: "Scenic",
    description: "An iconic palm-tree-lined road perfect for a leisurely drive or bike ride. A popular photography spot and one of Goa's most recognised scenic routes.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    slug: "parra-road"
  },
  {
    name: "Dudhsagar Waterfalls",
    distance: "58 km",
    driveTime: "1 hr 30 min",
    category: "Nature",
    description: "One of India's tallest waterfalls, cascading through lush Western Ghats forest. A spectacular day trip combining nature, wildlife, and spice plantation visits.",
    image: "https://images.unsplash.com/photo-1432405972618-c6b0cfba8b43?w=800&h=600&fit=crop",
    slug: "dudhsagar-waterfalls"
  },
  {
    name: "Arambol Beach",
    distance: "12 km",
    driveTime: "25 min",
    category: "Beach",
    description: "A relaxed, bohemian beach in North Goa known for its fresh water lake, drum circles at sunset, and a laid-back traveller community.",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
    slug: "arambol-beach"
  },
  {
    name: "Spice Plantations, Ponda",
    distance: "22 km",
    driveTime: "40 min",
    category: "Nature",
    description: "Lush spice plantations offering guided tours through cardamom, pepper, and vanilla gardens. Often paired with traditional Goan lunch and elephant encounters.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
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
