export type DetailPage = {
  slug: string;
  title: string;
  subtitle: string;
  introTitle: string;
  introBody: string;
  heroImage: string;
  cards: Array<{
    label: string;
    title: string;
    description: string;
    image: string;
  }>;
  galleryTabs: string[];
  galleryImage: string;
  galleryImages?: string[];
  galleryVideos?: string[];
  packageComparison?: {
    weekday: {
      title: string;
      rows: Array<{
        package: string;
        price: string;
        includes: string;
      }>;
    };
    weekend: {
      title: string;
      rows: Array<{
        package: string;
        price: string;
        includes: string;
      }>;
    };
    meals: {
      title: string;
      items: string[];
      note: string;
    };
  };
};

type DetailSeed = DetailPage;

const hotelRoomComparison = {
  weekday: {
    title: "Featured Room Pricing",
    rows: [
      { package: "Standard Room", price: "Rs. 2,750", includes: "Budget-friendly room with essentials" },
      { package: "Deluxe Room", price: "Rs. 3,300", includes: "Cozy room with comfortable modern furnishing" },
      { package: "Luxury Room", price: "Rs. 3,850", includes: "Balanced premium comfort for city stays" },
    ],
  },
  weekend: {
    title: "Premium Room Pricing",
    rows: [
      { package: "Supreme Room", price: "Rs. 6,050", includes: "Refined room comfort with useful amenities" },
      { package: "Maharaja Suite", price: "Rs. 8,250", includes: "Royal suite-style stay for elevated comfort" },
      { package: "Extra Person", price: "Rs. 1,100", includes: "Applicable in premium room plan categories" },
    ],
  },
  meals: {
    title: "Key Hotel Amenities",
    items: [
      "Air-conditioning across room categories",
      "Room service and housekeeping support",
      "Wi-Fi in selected room categories",
      "Parking and luggage assistance",
      "Power backup and doctor on call support",
    ],
    note:
      "Room availability, final room plan, and any applicable person-based extras are subject to confirmation at the time of booking.",
  },
} satisfies NonNullable<DetailPage["packageComparison"]>;

const detailPageSeeds: DetailSeed[] = [
  {
    slug: "garden-villa-resort",
    title: "Hotel Overview",
    subtitle: "An overview of Hotel Redwings Castle as a comfort-led Panvel stay with multiple room categories and practical guest services.",
    introTitle: "HOTEL OVERVIEW",
    introBody:
      "Hotel Redwings Castle offers guests a polished city-stay experience with five room categories, useful hotel amenities, and a Panvel location close to major travel connections.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-092820440-5.jpg",
    cards: [
      {
        label: "PROPERTY",
        title: "Comfortable Panvel Hotel",
        description: "Designed for business, leisure, family visits, and transit stays with practical luxury and approachable comfort.",
        image: "https://bookonelocal.in/cdn/2025-06-24-092828011-2.jpg",
      },
      {
        label: "LOCATION",
        title: "Easy Access",
        description: "Near Orion Mall, New Panvel Bridge, Old Mumbai Pune Expressway, Panvel station, and airport-linked routes.",
        image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
      },
    ],
    galleryTabs: ["Hotel", "Rooms", "Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-092834179-1.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2025-06-24-092820440-5.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-092828011-2.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-092831095-3.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
    ],
  },
  {
    slug: "standard-room",
    title: "Standard Room",
    subtitle: "A comfortable and budget-friendly room for solo travelers and couples looking for a dependable Panvel hotel stay.",
    introTitle: "ROOM DETAILS",
    introBody:
      "Standard Room offers cozy comfort with essential amenities and practical value, making it ideal for short stays and budget-conscious travel.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg",
    cards: [
      {
        label: "ROOM TYPE",
        title: "Standard Room",
        description: "A simple, comfortable room category with air-conditioning, Wi-Fi, and room service support.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095052417-28.jpg",
      },
      {
        label: "TARIFF",
        title: "Starting From Rs. 2,750",
        description: "A strong value stay option for travelers who want comfort and convenience without stepping into premium pricing tiers.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095108957-15.jpg",
      },
    ],
    galleryTabs: ["Standard", "Comfort", "Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-095108957-15.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-095052417-28.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-095108957-15.jpg",
    ],
  },
  {
    slug: "cliff-room",
    title: "Luxury Room",
    subtitle: "A polished room category that balances elevated comfort with practical hotel convenience for longer or premium stays.",
    introTitle: "ROOM DETAILS",
    introBody:
      "Luxury Room offers a blend of comfort and elegance with modern amenities, cozy interiors, and a peaceful atmosphere for guests who want a more premium stay feel.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg",
    cards: [
      {
        label: "ROOM TYPE",
        title: "Luxury Room",
        description: "A better-appointed room with air-conditioning, Wi-Fi, room service, and a more premium layout.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
      },
      {
        label: "TARIFF",
        title: "Starting From Rs. 3,850",
        description: "Good for guests who want a more refined stay option while keeping the booking practical and accessible.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095124999-4.jpg",
      },
    ],
    galleryTabs: ["Luxury", "Premium Stay", "Comfort"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-095124999-4.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-095124999-4.jpg",
    ],
  },
  {
    slug: "family-room",
    title: "Deluxe Room",
    subtitle: "A cozy and comfortable stay option with modern furnishing and a peaceful room environment.",
    introTitle: "ROOM DETAILS",
    introBody:
      "Deluxe Room is designed for guests who want a dependable, comfortable stay with upgraded finishing and essential hotel amenities.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
    cards: [
      {
        label: "ROOM TYPE",
        title: "Deluxe Room",
        description: "A practical choice for guests who want a calmer room environment with air-conditioning and room service support.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094807016-15.jpg",
      },
      {
        label: "TARIFF",
        title: "Starting From Rs. 3,300",
        description: "A balanced mid-tier room category that improves comfort while staying cost-effective for many travelers.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095145740-23.jpg",
      },
    ],
    galleryTabs: ["Deluxe", "Comfort", "Room"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-095145740-23.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-094807016-15.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-095145740-23.jpg",
    ],
  },
  {
    slug: "glass-cottage",
    title: "Supreme Room",
    subtitle: "A stylish upgraded room that offers a stronger balance of comfort, design, and premium hotel atmosphere.",
    introTitle: "ROOM DETAILS",
    introBody:
      "Supreme Room combines comfort and style for guests who want a more refined room environment with useful amenities and better room presence.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
    cards: [
      {
        label: "ROOM TYPE",
        title: "Supreme Room",
        description: "A refined room category with Wi-Fi, air-conditioning, room service, and a polished stay atmosphere.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
      },
      {
        label: "TARIFF",
        title: "Starting From Rs. 6,050",
        description: "Well suited to guests who want a noticeably stronger room category for work trips or leisure comfort.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094939625-29.jpg",
      },
    ],
    galleryTabs: ["Supreme", "Premium", "Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-094939625-29.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-094939625-29.jpg",
    ],
  },
  {
    slug: "bungalow",
    title: "Maharaja Suite Room",
    subtitle: "The most elevated room category at Hotel Redwings Castle, offering spacious interiors and a more luxurious stay feel.",
    introTitle: "ROOM DETAILS",
    introBody:
      "Maharaja Suite Room is built for guests who want royal comfort, elegant decor, and a more spacious premium stay with top-class amenities.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
    cards: [
      {
        label: "ROOM TYPE",
        title: "Maharaja Suite Room",
        description: "A premium suite-style category with elegant decor, polished interiors, and an upgraded in-room experience.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
      },
      {
        label: "TARIFF",
        title: "Starting From Rs. 8,250",
        description: "The best fit for guests who want the highest level of room comfort currently available at the property.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
      },
    ],
    galleryTabs: ["Suite", "Luxury", "Premium Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
      "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
    ],
  },
  {
    slug: "cafe24",
    title: "Hotel Services",
    subtitle: "A look at the practical amenities and service features that support guest comfort across the property.",
    introTitle: "HOTEL SERVICES",
    introBody:
      "Hotel Redwings Castle combines room comfort with useful service support, helping guests enjoy a smoother Panvel stay from check-in to departure.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
    cards: [
      {
        label: "SERVICE",
        title: "Stay Essentials",
        description: "Free WiFi, air-conditioning, room service, and housekeeping support are designed to make daily stay comfort easier.",
        image: "https://bookonelocal.in/cdn/2025-06-24-092831095-3.jpg",
      },
      {
        label: "SERVICE",
        title: "Guest Support",
        description: "Free hotel parking, luggage storage, doctor on call, first aid support, and CCTV in public areas strengthen convenience and peace of mind.",
        image: "https://bookonelocal.in/cdn/2025-06-24-092853092-22.jpg",
      },
    ],
    galleryTabs: ["Amenities", "Service", "Hotel"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
    packageComparison: hotelRoomComparison,
  },
  {
    slug: "classic-package",
    title: "Standard Comfort Plan",
    subtitle: "An introductory stay direction built around the Standard and Deluxe room categories.",
    introTitle: "PLAN DETAILS",
    introBody:
      "This plan direction is ideal for guests who want practical room comfort, city convenience, and a more value-oriented booking choice.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg",
    cards: [
      {
        label: "FEATURED",
        title: "Standard Room",
        description: "Rs. 2,750 | Budget-friendly room with essential amenities and comfortable stay support.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095052417-28.jpg",
      },
      {
        label: "FEATURED",
        title: "Deluxe Room",
        description: "Rs. 3,300 | A step up in comfort for guests who want a slightly more polished room environment.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094807016-15.jpg",
      },
    ],
    galleryTabs: ["Value", "Comfort", "Plan"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
    packageComparison: hotelRoomComparison,
  },
  {
    slug: "signature-package",
    title: "Premium Comfort Plan",
    subtitle: "A room-booking direction centered on Luxury and Supreme stays for guests who want more comfort and polish.",
    introTitle: "PLAN DETAILS",
    introBody:
      "This stay direction is ideal for travelers who want a better in-room experience and stronger hotel comfort during their Panvel visit.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
    cards: [
      {
        label: "FEATURED",
        title: "Luxury Room",
        description: "Rs. 3,850 | Premium room comfort with a refined and practical stay experience.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
      },
      {
        label: "FEATURED",
        title: "Supreme Room",
        description: "Rs. 6,050 | Stylish upgraded room category with a stronger amenity mix and better room presence.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094939625-29.jpg",
      },
    ],
    galleryTabs: ["Premium", "Comfort", "Plan"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
    packageComparison: hotelRoomComparison,
  },
  {
    slug: "premium-luxo-package",
    title: "Royal Suite Plan",
    subtitle: "A premium stay direction built around the Maharaja Suite Room for guests who want the hotel’s most elevated experience.",
    introTitle: "PLAN DETAILS",
    introBody:
      "This room plan direction highlights the best suite-style category in the property for premium city stays, special visits, or guests who want more spacious comfort.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
    cards: [
      {
        label: "FEATURED",
        title: "Maharaja Suite Room",
        description: "Rs. 8,250 | Royal comfort, elegant decor, and spacious interiors for the hotel’s strongest room experience.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
      },
      {
        label: "NOTE",
        title: "Extra Person Charge",
        description: "Premium room plans can include additional person charges of Rs. 1,100 where applicable, subject to final room confirmation.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
      },
    ],
    galleryTabs: ["Suite", "Luxury", "Plan"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
    packageComparison: hotelRoomComparison,
  },
  {
    slug: "adventure-resort",
    title: "Property Highlights",
    subtitle: "A visual and practical look at what makes Hotel Redwings Castle useful for Panvel travellers.",
    introTitle: "PROPERTY HIGHLIGHTS",
    introBody:
      "From room variety to location convenience, the hotel is built to make business and leisure travel more comfortable and manageable.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-092853092-22.jpg",
    cards: [
      {
        label: "HIGHLIGHT",
        title: "Useful Location",
        description: "Near Panvel station, road links, mall access, and airport-connected travel corridors.",
        image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
      },
      {
        label: "HIGHLIGHT",
        title: "Practical Amenities",
        description: "Wi-Fi, parking, housekeeping, room service, and support services create a more complete stay experience.",
        image: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
      },
    ],
    galleryTabs: ["Hotel", "Highlights", "Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
  },
  {
    slug: "della-enclave-villa-rooms",
    title: "Premium Room Collection",
    subtitle: "A quick view of the property’s higher-comfort room categories.",
    introTitle: "PREMIUM ROOMS",
    introBody:
      "Luxury Room, Supreme Room, and Maharaja Suite Room together form the hotel’s stronger premium stay collection.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
    cards: [
      {
        label: "COLLECTION",
        title: "Luxury To Suite Comfort",
        description: "Guests can scale up from refined premium rooms to the full Maharaja suite experience based on comfort goals and budget.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
      },
      {
        label: "BOOKING",
        title: "Better Room Choice",
        description: "The premium collection gives business and leisure travelers more flexibility than a single-room-type hotel setup.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
      },
    ],
    galleryTabs: ["Premium", "Rooms", "Collection"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
  },
  {
    slug: "camp-della-resort-room",
    title: "Stay Collection",
    subtitle: "An overview of the hotel’s complete room inventory, from value stays to the premium suite category.",
    introTitle: "STAY COLLECTION",
    introBody:
      "Hotel Redwings Castle offers 22 rooms across five categories so guests can find a stay style that matches their plan and budget.",
    heroImage: "https://bookonelocal.in/cdn/2025-06-24-092831095-3.jpg",
    cards: [
      {
        label: "INVENTORY",
        title: "22 Total Rooms",
        description: "Standard, Deluxe, Luxury, Supreme, and Maharaja Suite categories together create a broader room mix for varied guest needs.",
        image: "https://bookonelocal.in/cdn/2025-06-24-092828011-2.jpg",
      },
      {
        label: "FLEXIBILITY",
        title: "Stay Options For Every Need",
        description: "The range supports short stays, business visits, family travel, and premium city booking requirements.",
        image: "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
      },
    ],
    galleryTabs: ["Inventory", "Rooms", "Hotel"],
    galleryImage: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
  },
] satisfies DetailSeed[];

export const detailPages: Record<string, DetailPage> = Object.fromEntries(
  detailPageSeeds.map((page) => [page.slug, page]),
) as Record<string, DetailPage>;

export const detailPageSlugs = detailPageSeeds.map((seed) => seed.slug);

export function getDetailPage(slug: string) {
  return detailPages[slug];
}
