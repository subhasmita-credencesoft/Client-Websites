const U = (id: string) => `https://images.unsplash.com/photo-${id}`;

export interface NearbyPlace {
  name: string;
  distance: string;
  category: "Transport" | "Heritage" | "Shopping" | "Commercial & Parks" | "Institutions";
  importance: string;
  travelMode: string;
  image: string;
  mapQuery: string;
  highlights: string[];
  highlight?: boolean;
}

export const nearbyPlaces: NearbyPlace[] = [
  {
    name: "Railway Station / Kamla Nehru Market",
    distance: "0 – 0.5 km",
    category: "Transport",
    importance: "Primary railway transit junction, intercity train connections, auto-rickshaw stands, budget accommodations, and transit markets.",
    travelMode: "2–5 mins walk",
    image: U("1474487548417-781cb71495f3"),
    mapQuery: "Ludhiana Junction Railway Station, Ludhiana, Punjab",
    highlights: ["Major Rail Hub", "Transit Markets", "24/7 Connectivity"],
    highlight: true,
  },
  {
    name: "GT Road / GT Colony",
    distance: "At the hotel",
    category: "Transport",
    importance: "Historic national highway corridor right at the hotel's doorstep, packed with commercial showrooms, bank branches, local eateries, and direct city transit.",
    travelMode: "Immediate doorstep access",
    image: "/taksonzhome.avif",
    mapQuery: "Hotel The Taksonz, Grand Trunk Road, Ludhiana, Punjab 141008",
    highlights: ["Arterial Highway", "Bank ATMs & Dining", "Effortless Transit"],
    highlight: true,
  },
  {
    name: "Clock Tower / Ghanta Ghar",
    distance: "0.3 – 0.7 km",
    category: "Heritage",
    importance: "Ludhiana's most iconic British-era heritage landmark, serving as the historic focal point and gateway to the city's traditional shopping streets.",
    travelMode: "5 mins walk / 2 mins drive",
    image: "/dturnwmxiqfqeyam6i7t.avif",
    mapQuery: "Clock Tower Ghanta Ghar, Ludhiana, Punjab",
    highlights: ["Colonial Architecture", "City Landmark", "Heritage Walking"],
    highlight: true,
  },
  {
    name: "Chaura Bazaar / Akal Market",
    distance: "0.5 – 1.5 km",
    category: "Shopping",
    importance: "World-famous traditional bazaar and Asia's largest wholesale textile market, acclaimed for woollen knitwear, shawls, wedding apparel, and jewellery.",
    travelMode: "5–8 mins",
    image: U("1555529669-e69e7aa0ba9a"),
    mapQuery: "Chaura Bazaar, Ludhiana, Punjab",
    highlights: ["Wholesale Textiles", "Winter Wear & Shawls", "Authentic Street Food"],
    highlight: true,
  },
  {
    name: "Daresi / Purana Bazar side",
    distance: "1 – 2 km",
    category: "Shopping",
    importance: "Historic old-city trading district characterized by centuries-old merchant markets, brassware, traditional trade, and renowned festive Ramlila grounds.",
    travelMode: "6–10 mins drive",
    image: U("1533900298318-6b8da08a523e"),
    mapQuery: "Daresi Ground, Purana Bazar, Ludhiana, Punjab",
    highlights: ["Traditional Merchants", "Old-World Charm", "Festive Gathering Grounds"],
  },
  {
    name: "Civil Lines / Fountain Chowk",
    distance: "1 – 2 km",
    category: "Commercial & Parks",
    importance: "Upscale boulevard hosting elite lifestyle retail stores, administrative centers, corporate office branches, premier cafes, and fine-dining restaurants.",
    travelMode: "5–10 mins drive",
    image: U("1486406146926-c627a92ad1ab"),
    mapQuery: "Fountain Chowk, Civil Lines, Ludhiana, Punjab",
    highlights: ["Corporate Offices", "Fine-Dining Restaurants", "Lifestyle Boutiques"],
  },
  {
    name: "Rakh Bagh / Mall Road",
    distance: "1 – 2 km",
    category: "Commercial & Parks",
    importance: "Expansive green urban park with lush walking trails, scenic toy train, children's recreation, and immediate proximity to premier hospitals and clubs.",
    travelMode: "7–10 mins drive",
    image: U("1519331379826-f10be5486c6f"),
    mapQuery: "Rakh Bagh Park, Club Road, Ludhiana, Punjab",
    highlights: ["Jogging Tracks", "Botanical Gardens", "Healthcare Centers"],
  },
  {
    name: "Model Town",
    distance: "3 – 5 km",
    category: "Commercial & Parks",
    importance: "Ludhiana's premier upscale residential neighborhood, celebrated for trendy designer fashion boutiques, artisan bakeries, and high-end medical facilities.",
    travelMode: "12–15 mins drive",
    image: U("1441986300917-64674bd600d8"),
    mapQuery: "Model Town, Ludhiana, Punjab",
    highlights: ["Designer Fashion", "Artisan Cafes", "Premium Residential"],
  },
  {
    name: "Ferozepur Road / Gurdev Nagar",
    distance: "4 – 7 km",
    category: "Shopping",
    importance: "Ludhiana's vibrant commercial corridor boasting premier modern malls (MBD Neopolis, Silver Arc, Westend Mall), multiplexes, and international luxury brands.",
    travelMode: "15–20 mins drive",
    image: U("1519567241046-7f570eee3ce6"),
    mapQuery: "Ferozepur Road, Gurdev Nagar, Ludhiana, Punjab",
    highlights: ["MBD Neopolis & Silver Arc", "Cinema Multiplexes", "Luxury Showrooms"],
  },
  {
    name: "Punjab Agricultural University (PAU) area",
    distance: "4 – 6 km",
    category: "Institutions",
    importance: "Internationally renowned agricultural university spread over hundreds of lush green acres, featuring botanical gardens, the Rural Museum, and sports complexes.",
    travelMode: "15 mins drive",
    image: U("1562774053-701939374585"),
    mapQuery: "Punjab Agricultural University, Ferozepur Road, Ludhiana, Punjab",
    highlights: ["Historic Green Campus", "Ajaib Ghar Rural Museum", "Research Hub"],
  },
];

export const nearbyCategories = [
  "All",
  "Transport",
  "Heritage",
  "Shopping",
  "Commercial & Parks",
  "Institutions",
] as const;
