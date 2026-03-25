import { siteImages } from "@/lib/site-images";

export type AmenityIconKey =
  | "wifi"
  | "wind"
  | "coffee"
  | "car"
  | "utensils"
  | "droplets"
  | "monitor"
  | "star";

export type PropertyDetails = {
  slug: string;
  title: string;
  location: string;
  ratingLabel: string;
  typeBadge: string;
  description: string;
  images: string[];
  amenities: Array<{ icon: AmenityIconKey; label: string }>;
  rooms: Array<{
    id: number;
    name: string;
    size: string;
    bed: string;
    view: string;
    price: number;
    image: string;
    features: string[];
  }>;
  packages: Array<{
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
  }>;
  appPromo: {
    badge: string;
    title: string;
    description: string;
    image: string;
  };
  reviews: Array<{
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
  }>;
  booking: {
    basePrice: number;
    availability: string;
    checkIn: string;
    checkOut: string;
    guests: string[];
    couponHint: string;
    couponDiscount: number;
    secureLabel: string;
  };
};

const sharedAmenities: PropertyDetails["amenities"] = [
  { icon: "wifi", label: "Free WiFi" },
  { icon: "wind", label: "Air Conditioning" },
  { icon: "coffee", label: "Breakfast Included" },
  { icon: "car", label: "Free Parking" },
  { icon: "utensils", label: "Restaurant" },
  { icon: "droplets", label: "Swimming Pool" },
  { icon: "monitor", label: "TV" },
  { icon: "star", label: "Concierge" },
];

const sharedPackages = [
  {
    id: 1,
    title: "Romantic Dinner by the Beach",
    price: 2500,
    image: siteImages.candlelightDinner,
    description: "5-course meal with wine under the stars.",
  },
  {
    id: 2,
    title: "Seafood Signature Platter",
    price: 1800,
    image: siteImages.seafoodPlatter,
    description: "Fresh catch of the day, prepared with regional flavours.",
  },
  {
    id: 3,
    title: "Jet Ski Adventure",
    price: 1500,
    image: siteImages.jetSki,
    description: "30-minute adrenaline rush on the waves.",
  },
  {
    id: 4,
    title: "Rejuvenating Spa Session",
    price: 2200,
    image: siteImages.spaMassage,
    description: "60-minute full body massage.",
  },
];

export const propertyDetailsBySlug: Record<string, PropertyDetails> = {
  "silver-sand-resort": {
    slug: "silver-sand-resort",
    title: "Silver Sand Resort",
    location: "Alibaug, Maharashtra",
    ratingLabel: "4.8 (124 Reviews)",
    typeBadge: "Luxury Resort",
    description:
      "Nestled along the pristine coastline of Alibaug, Silver Sand Resort offers a perfect blend of luxury and tranquility. Whether you're looking for a romantic getaway or a family vacation, the resort delivers spacious rooms, direct beach access, sunset dining, and a seamless hospitality experience tailored around rest and recreation.",
    images: [
      siteImages.hero,
      siteImages.resortRoom,
      siteImages.resortBathroom,
      siteImages.resortDining,
      siteImages.resortPool,
      siteImages.suiteOceanView,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: "Deluxe Ocean View",
        size: "450 sq.ft",
        bed: "King Bed",
        view: "Ocean View",
        price: 8500,
        image: siteImages.resortRoom,
        features: ["Balcony", "Rain Shower", "Work Desk"],
      },
      {
        id: 2,
        name: "Royal Suite",
        size: "800 sq.ft",
        bed: "California King",
        view: "Panoramic Ocean",
        price: 18500,
        image: siteImages.suiteOceanView,
        features: ["Private Jacuzzi", "Living Area", "Butler Service"],
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Digital Concierge",
      title: "The Pune Resort Experience App",
      description:
        "Manage your stay effortlessly with room service, activity booking, housekeeping requests, and local recommendations from your phone.",
      image: siteImages.conciergeApp,
    },
    reviews: [
      {
        id: 1,
        user: "Sarah Jenkins",
        rating: 5,
        date: "Oct 2025",
        comment:
          "Absolutely stunning property. The ocean view and the service together made the stay feel truly premium.",
      },
      {
        id: 2,
        user: "Rahul Mehta",
        rating: 4,
        date: "Sep 2025",
        comment:
          "Great location and amenities. The food and poolside atmosphere were highlights of the trip.",
      },
    ],
    booking: {
      basePrice: 8500,
      availability: "Available Now",
      checkIn: "Oct 14, 2025",
      checkOut: "Oct 16, 2025",
      guests: ["2 Guests", "3 Guests", "4 Guests"],
      couponHint: "THEPUNERESORT20",
      couponDiscount: 2000,
      secureLabel: "Secure Booking",
    },
  },
  "green-didis-cottage": {
    slug: "green-didis-cottage",
    title: "Green Didi's Cottage",
    location: "Nagaon, Alibaug",
    ratingLabel: "4.7 (89 Reviews)",
    typeBadge: "Boutique Cottage",
    description:
      "Green Didi's Cottage is a warm, garden-facing retreat designed for travellers who want calm surroundings without giving up comfort. From open sit-out spaces to naturally lit interiors, the cottage combines privacy, greenery, and a relaxed hospitality style that suits couples, small families, and long weekend stays.",
    images: [
      siteImages.modernTropicalVilla,
      siteImages.affordableLuxuryRoom,
      siteImages.modernHotelRestaurant,
      siteImages.propertyManager,
      siteImages.hero,
      siteImages.santoriniVilla,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: "Garden Cottage Room",
        size: "380 sq.ft",
        bed: "Queen Bed",
        view: "Garden View",
        price: 6200,
        image: siteImages.affordableLuxuryRoom,
        features: ["Private Sit-Out", "Tea Station", "Premium Linen"],
      },
      {
        id: 2,
        name: "Family Cottage Suite",
        size: "560 sq.ft",
        bed: "King Bed",
        view: "Poolside View",
        price: 9800,
        image: siteImages.modernTropicalVilla,
        features: ["Living Corner", "Pool Access", "Family Layout"],
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Dining & Stay",
      title: "Comfort Wrapped In Nature",
      description:
        "Enjoy curated meals, easy housekeeping support, and peaceful corners for reading, slow mornings, and intimate evening gatherings.",
      image: siteImages.modernHotelRestaurant,
    },
    reviews: [
      {
        id: 1,
        user: "Priya Nair",
        rating: 5,
        date: "Nov 2025",
        comment:
          "A charming and peaceful stay. The garden setting made the entire place feel refreshing and private.",
      },
      {
        id: 2,
        user: "Kunal Shah",
        rating: 4,
        date: "Aug 2025",
        comment:
          "Lovely atmosphere and very comfortable rooms. Perfect for a short family getaway.",
      },
    ],
    booking: {
      basePrice: 6200,
      availability: "Available This Weekend",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      couponHint: "GREENSTAY15",
      couponDiscount: 1500,
      secureLabel: "Secure Booking",
    },
  },
  "shirke-holiday-home": {
    slug: "shirke-holiday-home",
    title: "Shirke Holiday Home",
    location: "Akshi, Alibaug",
    ratingLabel: "4.6 (73 Reviews)",
    typeBadge: "Family Holiday Home",
    description:
      "Shirke Holiday Home is built for group stays that need both comfort and flexibility. Spacious common areas, easy beach access, and practical family-friendly layouts make it a dependable choice for reunions, festive getaways, and relaxed vacations with children or friends.",
    images: [
      siteImages.santoriniVilla,
      siteImages.resortDining,
      siteImages.resortRoom,
      siteImages.resortBathroom,
      siteImages.hero,
      siteImages.modernTropicalVilla,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: "Family Comfort Room",
        size: "420 sq.ft",
        bed: "Twin + Queen Setup",
        view: "Courtyard View",
        price: 7400,
        image: siteImages.resortRoom,
        features: ["Family Layout", "Dining Nook", "Extra Storage"],
      },
      {
        id: 2,
        name: "Holiday Home Suite",
        size: "700 sq.ft",
        bed: "King Bed",
        view: "Sea Breeze View",
        price: 12500,
        image: siteImages.santoriniVilla,
        features: ["Large Lounge", "Private Terrace", "Group Friendly"],
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Group Friendly",
      title: "Made For Shared Getaways",
      description:
        "Organise meals, room setups, and local activities more easily with a property experience that supports families and friend groups.",
      image: siteImages.conciergeApp,
    },
    reviews: [
      {
        id: 1,
        user: "Neha Patil",
        rating: 5,
        date: "Dec 2025",
        comment:
          "Very spacious and comfortable for our family trip. The home felt practical and welcoming from the start.",
      },
      {
        id: 2,
        user: "Amit Rao",
        rating: 4,
        date: "Jul 2025",
        comment:
          "A solid holiday home with great space for groups. The location was convenient and the stay was easy.",
      },
    ],
    booking: {
      basePrice: 7400,
      availability: "Limited Rooms Left",
      checkIn: "Oct 22, 2025",
      checkOut: "Oct 24, 2025",
      guests: ["4 Guests", "6 Guests", "8 Guests"],
      couponHint: "HOLIDAYHOME10",
      couponDiscount: 1000,
      secureLabel: "Secure Booking",
    },
  },
  "urban-breeze-villa": {
    slug: "urban-breeze-villa",
    title: "Urban Breeze Villa",
    location: "Goa Coastline",
    ratingLabel: "4.9 (156 Reviews)",
    typeBadge: "Premium Villa",
    description:
      "Urban Breeze Villa blends sleek architecture with a laid-back waterfront mood. The property is ideal for guests who want modern design, expansive outdoor lounging, and elevated privacy, all within a destination that feels both luxurious and easy to settle into.",
    images: [
      siteImages.luxuryVillaSunset,
      siteImages.suiteOceanView,
      siteImages.modernHotelRestaurant,
      siteImages.resortPool,
      siteImages.candlelightDinner,
      siteImages.hero,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: "Sunset View Room",
        size: "460 sq.ft",
        bed: "King Bed",
        view: "Infinity Pool View",
        price: 14500,
        image: siteImages.suiteOceanView,
        features: ["Designer Interior", "Lounge Seating", "Premium Bath"],
      },
      {
        id: 2,
        name: "Villa Master Suite",
        size: "920 sq.ft",
        bed: "California King",
        view: "Sea Facing Terrace",
        price: 28000,
        image: siteImages.luxuryVillaSunset,
        features: ["Private Deck", "Open Lounge", "Host Services"],
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Villa Living",
      title: "Modern Luxury With Coastal Calm",
      description:
        "Plan chef dinners, sunset setups, concierge assistance, and villa experiences from a single streamlined stay platform.",
      image: siteImages.conciergeApp,
    },
    reviews: [
      {
        id: 1,
        user: "Rhea Malhotra",
        rating: 5,
        date: "Jan 2026",
        comment:
          "The villa looks incredible in photos and even better in person. Perfect for a stylish celebratory stay.",
      },
      {
        id: 2,
        user: "Daniel George",
        rating: 5,
        date: "Oct 2025",
        comment:
          "Great design, amazing pool, and a very polished experience throughout the stay.",
      },
    ],
    booking: {
      basePrice: 14500,
      availability: "High Demand",
      checkIn: "Oct 28, 2025",
      checkOut: "Oct 30, 2025",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      couponHint: "VILLALUXE25",
      couponDiscount: 2500,
      secureLabel: "Secure Booking",
    },
  },
};

export const propertyDetailsData = propertyDetailsBySlug["silver-sand-resort"];
export const propertySlugs = Object.keys(propertyDetailsBySlug);
