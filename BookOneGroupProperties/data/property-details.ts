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
  tags?: string[];
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
    available?: string;
    description?: string;
    planNote?: string;
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
  propertyDetailsSection?: {
    title: string;
    lines: string[];
    activities?: string[];
    address?: string;
  };
  oneDayTripSection?: {
    title: string;
    time: string;
    includes: string[];
    notes?: string[];
  };
  policiesSection?: {
    title: string;
    accommodation: string[];
    cancellation: string[];
    dayOuting: string[];
    extra?: string[];
  };
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

function createSimplePropertyDetails(config: {
  slug: string;
  title: string;
  location: string;
  ratingLabel: string;
  typeBadge: string;
  description: string;
  price: number;
  roomName: string;
  occupancy: string;
  availability: string;
  image: string;
  features: string[];
  guests: string[];
  couponHint: string;
  couponDiscount: number;
}): PropertyDetails {
  return {
    slug: config.slug,
    title: config.title,
    location: config.location,
    ratingLabel: config.ratingLabel,
    typeBadge: config.typeBadge,
    description: config.description,
    tags: [`#${config.typeBadge.replace(/\s+/g, "_")}`, "#Near_Pune", "#Group_Friendly"],
    images: [
      config.image,
      siteImages.resortRoom,
      siteImages.modernHotelRestaurant,
      siteImages.resortPool,
      siteImages.hero,
      siteImages.suiteOceanView,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: config.roomName,
        size: "Comfort Stay",
        bed: config.occupancy,
        view: "Property View",
        price: config.price,
        image: config.image,
        features: config.features,
        available: "1",
        description: `Stay option at ${config.title} with comfortable accommodation and easy access around the property.`,
        planNote: "Plan availability can be confirmed at the time of booking.",
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: config.typeBadge,
      title: `Stay At ${config.title}`,
      description: config.description,
      image: siteImages.conciergeApp,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        `Stay at ${config.title}`,
        "Comfortable parking and guest access",
        "Restaurant and leisure-friendly environment",
      ],
      activities: config.features,
      address: config.location,
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "9:00 AM to 6:00 PM",
      includes: [
        "Access to property experiences",
        "Food inclusions depend on package availability",
        "Changing room support subject to property rules",
      ],
      notes: ["Please confirm one day trip availability before booking."],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        `Check in ${"12:00 PM"} and Check out ${"10:00 AM"}`,
        "Meal and activity timings are shared at the property",
      ],
      cancellation: [
        "Advance payment policy applies at the time of booking",
        "Date changes are subject to availability and prior notice",
      ],
      dayOuting: [
        "Room access may not be included in one day trip packages",
        "Property-specific rules apply for guests and activities",
      ],
      extra: ["Please check with the property team for the latest package and policy updates."],
    },
    booking: {
      basePrice: config.price,
      availability: config.availability,
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: config.guests,
      couponHint: config.couponHint,
      couponDiscount: config.couponDiscount,
      secureLabel: "Secure Booking",
    },
  };
}

export const propertyDetailsBySlug: Record<string, PropertyDetails> = {
  "vishals-orchard-resort": {
    slug: "vishals-orchard-resort",
    title: "Vishal's Orchard Resort",
    location: "Pune Satara NH48, at Kelawade, Bhor, near-reliance-petrol-pump, Pune, India",
    ratingLabel: "4.7 (89 Reviews)",
    typeBadge: "Resort",
    description:
      "Vishal's Orchard Resort offers a comfortable resort stay near Kelawade, Bhor for families, couples, and weekend travellers from Pune. With deluxe rooms, suite options, pool access, outdoor seating, and easy highway connectivity, the property works well for short breaks, family outings, and relaxed overnight stays.",
    tags: ["#Family_Resort", "#Couple_Friendly", "#Near_Pune"],
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
        name: "Deluxe Resort Room",
        size: "320 sq.ft",
        bed: "King Bed",
        view: "Garden View",
        price: 4000,
        image: siteImages.resortRoom,
        features: ["Swimming Pool Access", "Air Conditioning", "Breakfast Option"],
        available: "6",
        description: "A comfortable garden-facing room option suited for couples and small families looking for a calm stay near Bhor.",
        planNote: "Meal and activity plans can be selected based on availability at the property.",
      },
      {
        id: 2,
        name: "Family Resort Suite",
        size: "450 sq.ft",
        bed: "King Bed + Extra Bedding",
        view: "Pool View",
        price: 5200,
        image: siteImages.suiteOceanView,
        features: ["Spacious Layout", "Seating Area", "Ideal For Families"],
        available: "1",
        description: "A larger suite stay with more room for families and guests who want added comfort during an overnight visit.",
        planNote: "Package inclusions depend on selected stay plan and property confirmation.",
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Resort Stay",
      title: "Comfortable Getaway Near Pune",
      description:
        "Plan a smooth stay with comfortable rooms, poolside leisure, and easy access for a quick family or group vacation near Bhor.",
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
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Stay in deluxe rooms and family suites",
        "Easy highway access from Pune",
        "Parking area and outdoor seating spaces",
        "Restaurant and pool-friendly resort atmosphere",
      ],
      activities: ["Swimming Pool", "Family Stay", "Couple Friendly Stay", "Weekend Group Breaks"],
      address: "Pune Satara NH48, at Kelawade, Bhor, near-reliance-petrol-pump, Pune, India",
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "9:00 AM to 5:00 PM",
      includes: ["Pool access", "Property leisure access", "Food package subject to booking plan"],
      notes: ["Please confirm day outing availability directly with the resort before arrival."],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Check in 12:00 PM and Check out 10:00 AM",
        "Pool timings are shared at the property",
      ],
      cancellation: [
        "Advance booking amount may be non-refundable depending on the selected plan.",
        "Date changes are subject to availability and prior notice.",
      ],
      dayOuting: [
        "Room access is not guaranteed in one day trip packages.",
        "Guests are expected to follow property timing and pool rules.",
      ],
      extra: ["Please reconfirm meals, room plan, and activities before booking."],
    },
    booking: {
      basePrice: 4000,
      availability: "Available This Weekend",
      checkIn: "Oct 14, 2025",
      checkOut: "Oct 16, 2025",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      couponHint: "ORCHARD10",
      couponDiscount: 500,
      secureLabel: "Secure Booking",
    },
  },
  "rajgad-water-park-resort-pure-veg": {
    slug: "rajgad-water-park-resort-pure-veg",
    title: "Rajgad Water Park & Resort (Pure Veg)",
    location: "Ingavali Gaon Road, near Necklace Point, Bhor, ingavali, Pune, India",
    ratingLabel: "4.7 (89 Reviews)",
    typeBadge: "Resort",
    description:
      "Rajgad Water Park & Resort (Pure Veg) is a family-friendly resort in Ingavali, Bhor that combines comfortable room stays, pure veg dining, and water-based fun for guests planning a quick break near Pune. It is a strong choice for day outings, overnight stays, and group visits that want pool activities with a simple resort setup.",
    tags: ["#Family_Resort", "#Pure_Veg", "#Water_Park"],
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
        name: "Deluxe Resort Room",
        size: "340 sq.ft",
        bed: "Queen Bed",
        view: "Pool View",
        price: 5600,
        image: siteImages.affordableLuxuryRoom,
        features: ["Swimming Pool Access", "Pure Veg Meals", "Comfortable Interiors"],
        available: "2",
        description: "Comfortable resort accommodation for families and short getaways with pure veg meal support.",
        planNote: "Room plan and meals are based on package selection at the time of booking.",
      },
      {
        id: 2,
        name: "Family Resort Suite",
        size: "520 sq.ft",
        bed: "King Bed",
        view: "Resort View",
        price: 7200,
        image: siteImages.modernTropicalVilla,
        features: ["Family Layout", "Extra Seating", "Ideal For Groups"],
        available: "1",
        description: "A larger stay option for families and groups wanting water park access and pure veg resort comfort.",
        planNote: "Please check package inclusions and meal plan before confirmation.",
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Pure Veg Resort",
      title: "Stay, Swim, And Enjoy Group Time",
      description:
        "Enjoy a balanced getaway with water-based fun, comfortable rooms, and pure veg hospitality that works well for families and day visitors alike.",
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
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Pure veg resort stay with family-friendly setup",
        "Swimming pool and water-based recreation",
        "Comfortable room options for short trips",
        "Suitable for family, day outing, and group bookings",
      ],
      activities: ["Water Park Access", "Swimming Pool", "Group Friendly Stay", "Pure Veg Dining"],
      address: "Ingavali Gaon Road, near Necklace Point, Bhor, ingavali, Pune, India",
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "9:00 AM to 5:00 PM",
      includes: ["Water park activities", "Swimming pool access", "Food package based on selected plan"],
      notes: ["Please confirm one day trip availability and meal plan with the resort team."],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Check in and check out timings are shared during booking confirmation.",
        "Pool and meal timings follow resort schedule.",
      ],
      cancellation: [
        "Advance payment terms apply to all confirmed bookings.",
        "Date changes depend on prior notice and room availability.",
      ],
      dayOuting: [
        "Day outing timing and room access depend on package type.",
        "Guests must follow all property and water activity rules.",
      ],
      extra: ["Only pure veg food service is provided at the property."],
    },
    booking: {
      basePrice: 5600,
      availability: "Available This Weekend",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      couponHint: "RAJGAD10",
      couponDiscount: 600,
      secureLabel: "Secure Booking",
    },
  },
  "jalmeen-resort": {
    slug: "jalmeen-resort",
    title: "Jalmeen Resort",
    location: "Nasrapur-Velha Road, Bhor, hatve-bk, Pune, India",
    ratingLabel: "4.6 (73 Reviews)",
    typeBadge: "Resort",
    description:
      "Jalmeen Resort is a budget-friendly stay option near Bhor for guests looking for a relaxed getaway with pool access and practical room comfort. The resort suits small groups, family trips, and short weekend stays that need an easy, affordable place to unwind near Pune.",
    tags: ["#Budget_Friendly", "#Near_Pune", "#Family_Stay"],
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
        name: "Standard Resort Room",
        size: "300 sq.ft",
        bed: "Queen Bed",
        view: "Courtyard View",
        price: 3600,
        image: siteImages.resortRoom,
        features: ["Swimming Pool Access", "Air Conditioning", "Comfort Stay"],
        available: "5",
        description: "A practical budget-friendly room option for guests looking for a simple and comfortable overnight stay.",
        planNote: "Room and meal plans can be confirmed with the property before booking.",
      },
      {
        id: 2,
        name: "Family Resort Room",
        size: "420 sq.ft",
        bed: "King Bed",
        view: "Poolside View",
        price: 4800,
        image: siteImages.santoriniVilla,
        features: ["Extra Bedding", "Group Friendly", "Spacious Interiors"],
        available: "1",
        description: "A larger room choice suited for family or small group stays near Bhor with extra comfort features.",
        planNote: "Package inclusions are based on selected stay plan and room availability.",
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Budget Friendly",
      title: "Easy Resort Stays Near Bhor",
      description:
        "A simple and comfortable option for quick getaways, with pool access, practical rooms, and a relaxed atmosphere for short trips.",
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
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Budget-friendly resort stay near Bhor",
        "Standard and family room options",
        "Swimming pool access with easy weekend stay comfort",
        "Suitable for small groups and family breaks",
      ],
      activities: ["Swimming Pool", "Relaxed Weekend Stay", "Family Friendly Rooms", "Short Trip Comfort"],
      address: "Nasrapur-Velha Road, Bhor, hatve-bk, Pune, India",
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "9:00 AM to 5:00 PM",
      includes: ["Property access", "Pool use based on package", "Meal inclusions depend on booking plan"],
      notes: ["Please reconfirm one day outing support before final booking."],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Check in and check out timings are confirmed during booking.",
        "Pool and common-area timing follow property rules.",
      ],
      cancellation: [
        "Advance payment terms apply to all bookings.",
        "Date changes are subject to prior notice and availability.",
      ],
      dayOuting: [
        "One day trip access depends on selected package.",
        "Guests are expected to follow room and pool usage rules.",
      ],
      extra: ["Please confirm guest count and meal plan before arrival."],
    },
    booking: {
      basePrice: 3600,
      availability: "Limited Rooms Left",
      checkIn: "Oct 22, 2025",
      checkOut: "Oct 24, 2025",
      guests: ["4 Guests", "6 Guests", "8 Guests"],
      couponHint: "JALMEEN10",
      couponDiscount: 400,
      secureLabel: "Secure Booking",
    },
  },
  "4-bhk-villa-karla": {
    slug: "4-bhk-villa-karla",
    title: "4 BHK Villa (Karla)",
    location: "Karla, in-karla, Lonavala, India",
    ratingLabel: "4.9 (48 Reviews)",
    typeBadge: "Private Villa",
    description:
      "4 BHK Villa (Karla) is designed for guests who want a spacious private stay in Lonavala with room for families and groups to unwind together. Its comfortable villa layout, scenic surroundings, and easy access around Karla make it a strong option for weekend escapes.",
    images: [
      siteImages.mountainChalet,
      siteImages.affordableLuxuryRoom,
      siteImages.modernTropicalVilla,
      siteImages.resortDining,
      siteImages.resortRoom,
      siteImages.hero,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: "4 BHK Private Villa",
        size: "1800 sq.ft",
        bed: "4 Bedroom Setup",
        view: "Hill View",
        price: 14000,
        image: siteImages.mountainChalet,
        features: ["Private Villa", "Group Stay", "Spacious Living Area"],
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Lonavala Stay",
      title: "Private Villa Comfort In Karla",
      description:
        "Enjoy a roomy villa stay for families and friend groups with the comfort, privacy, and flexibility needed for a relaxed Lonavala trip.",
      image: siteImages.conciergeApp,
    },
    reviews: [
      {
        id: 1,
        user: "Mehul Joshi",
        rating: 5,
        date: "Jan 2026",
        comment:
          "Great villa for a group trip. The space felt comfortable and the Karla location made the stay easy to plan.",
      },
      {
        id: 2,
        user: "Sneha Kulkarni",
        rating: 4,
        date: "Nov 2025",
        comment:
          "A good private villa option for Lonavala weekends with enough room for the whole family.",
      },
    ],
    booking: {
      basePrice: 14000,
      availability: "Available This Weekend",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["6 Guests", "8 Guests", "10 Guests"],
      couponHint: "KARLA10",
      couponDiscount: 1000,
      secureLabel: "Secure Booking",
    },
  },
  "a-r-villa": {
    slug: "a-r-villa",
    title: "A R Villa",
    location: "Mahabaleshwar, Panchgani, Maharashtra, India",
    ratingLabel: "4.9 (56 Reviews)",
    typeBadge: "Private Villa",
    description:
      "A R Villa is a premium stay option for guests looking for a peaceful private villa experience around Mahabaleshwar and Panchgani. It is well suited for scenic getaways, close family trips, and comfortable long-weekend plans in the hills.",
    images: [
      siteImages.luxuryVillaSunset,
      siteImages.suiteOceanView,
      siteImages.modernTropicalVilla,
      siteImages.resortPool,
      siteImages.modernHotelRestaurant,
      siteImages.hero,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: "Villa Suite",
        size: "700 sq.ft",
        bed: "King Bed",
        view: "Valley View",
        price: 25000,
        image: siteImages.luxuryVillaSunset,
        features: ["Private Villa", "Premium Interiors", "Outdoor Seating"],
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Mahabaleshwar Stay",
      title: "A Scenic Private Villa Escape",
      description:
        "Plan a refined hill-station stay with private space, comfortable interiors, and a premium villa setting around Panchgani and Mahabaleshwar.",
      image: siteImages.conciergeApp,
    },
    reviews: [
      {
        id: 1,
        user: "Ritika Deshmukh",
        rating: 5,
        date: "Feb 2026",
        comment:
          "Beautiful villa setting and a very comfortable stay. Great option for a premium Mahabaleshwar weekend.",
      },
      {
        id: 2,
        user: "Aditya Singh",
        rating: 5,
        date: "Dec 2025",
        comment:
          "The villa felt private and well maintained. Perfect for a peaceful stay with family.",
      },
    ],
    booking: {
      basePrice: 25000,
      availability: "High Demand",
      checkIn: "Oct 24, 2025",
      checkOut: "Oct 26, 2025",
      guests: ["4 Guests", "6 Guests", "8 Guests"],
      couponHint: "ARVILLA10",
      couponDiscount: 1500,
      secureLabel: "Secure Booking",
    },
  },
  "7-bhk-skyabode": {
    slug: "7-bhk-skyabode",
    title: "7 BHK Skyabode",
    location: "Mahabaleshwar, Panchgani, Maharashtra, India",
    ratingLabel: "4.7 (39 Reviews)",
    typeBadge: "Private Villa",
    description:
      "7 BHK Skyabode is ideal for large family groups, celebrations, and premium hill-station escapes that need plenty of space. The villa delivers a spacious multi-bedroom layout in the Mahabaleshwar-Panchgani belt for guests who want a larger private stay.",
    images: [
      siteImages.santoriniVilla,
      siteImages.luxuryVillaSunset,
      siteImages.suiteOceanView,
      siteImages.modernHotelRestaurant,
      siteImages.resortPool,
      siteImages.hero,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: "7 BHK Full Villa",
        size: "3200 sq.ft",
        bed: "7 Bedroom Setup",
        view: "Hill View",
        price: 11000,
        image: siteImages.santoriniVilla,
        features: ["Large Group Stay", "Private Villa", "Multiple Living Spaces"],
      },
    ],
    packages: sharedPackages,
    appPromo: {
      badge: "Group Villa",
      title: "Large Private Stay In Panchgani",
      description:
        "A practical choice for large groups wanting a private Mahabaleshwar-Panchgani villa with enough bedrooms and shared space for everyone.",
      image: siteImages.conciergeApp,
    },
    reviews: [
      {
        id: 1,
        user: "Pranav Patil",
        rating: 5,
        date: "Jan 2026",
        comment:
          "Very spacious for our group and the stay felt smooth from check-in to check-out.",
      },
      {
        id: 2,
        user: "Komal Shah",
        rating: 4,
        date: "Nov 2025",
        comment:
          "A good option for large family stays in the Mahabaleshwar side with enough room for everyone.",
      },
    ],
    booking: {
      basePrice: 11000,
      availability: "Available Now",
      checkIn: "Oct 26, 2025",
      checkOut: "Oct 28, 2025",
      guests: ["8 Guests", "10 Guests", "14 Guests"],
      couponHint: "SKYABODE10",
      couponDiscount: 1000,
      secureLabel: "Secure Booking",
    },
  },
  "vedanta-resort": createSimplePropertyDetails({
    slug: "vedanta-resort",
    title: "Vedanta Resort",
    location: "Bhor, Pune, Maharashtra, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Resort",
    description:
      "Vedanta Resort is a practical Near Pune stay option for quick breaks, family time, and easy resort-style comfort around Bhor.",
    price: 3000,
    roomName: "Deluxe Room (Garden Side)",
    occupancy: "2 Adults",
    availability: "Available Now",
    image: siteImages.hero,
    features: ["6 Garden Side Rooms", "1 Suite Room", "5 Pool Side Rooms"],
    guests: ["2 Guests", "4 Guests", "6 Guests"],
    couponHint: "VEDANTA10",
    couponDiscount: 300,
  }),
  "orchard-resort": {
    slug: "orchard-resort",
    title: "Orchard Resort",
    location: "Pune Satara NH48, at Kelawade, Bhor, near-reliance-petrol-pump, Pune, India",
    ratingLabel: "5.0 (1 Review)",
    typeBadge: "Resort",
    description:
      "Orchard Resort is a family-friendly stay near Kelawade, Bhor, offering deluxe and suite accommodation, dining, and a full set of day outing and overnight stay activities close to Pune.",
    tags: ["#Family_Resort", "#Couple_Friendly", "#Corporate_Group"],
    images: [
      siteImages.modernTropicalVilla,
      siteImages.resortRoom,
      siteImages.modernHotelRestaurant,
      siteImages.resortPool,
      siteImages.hero,
      siteImages.suiteOceanView,
    ],
    amenities: sharedAmenities,
    rooms: [
      {
        id: 1,
        name: "AC Deluxe Room",
        size: "Standard Room",
        bed: "2 Adults",
        view: "Resort View",
        price: 5000,
        image: siteImages.resortRoom,
        features: ["Double Bed", "AC", "Ceiling Fan", "Electric Geyser", "Attached Washroom"],
        available: "20",
        description:
          "Double Bed, AC, Ceiling Fan, Electric Geyser, Attached Washroom, Mineral Water Bottle, Towel, Soap, W/C Toilet, Shower.",
        planNote: "Plan Not Available. Without plan you can't book room.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "One Day Trip Package",
        price: 5000,
        image: siteImages.resortPool,
        description: "9 AM to 5 PM with all activities, breakfast, lunch, tea, and snacks.",
      },
      {
        id: 2,
        title: "Overnight Stay Package",
        price: 5000,
        image: siteImages.modernHotelRestaurant,
        description: "Stay with lunch, hi-tea, dinner, breakfast, and all activities included.",
      },
    ],
    appPromo: {
      badge: "Resort Stay",
      title: "Family, Couple, And Corporate Group Friendly",
      description:
        "Orchard Resort combines stay, food, and activity inclusions for overnight stays and one day outings near Pune.",
      image: siteImages.conciergeApp,
    },
    reviews: [
      {
        id: 1,
        user: "Prathamesh V",
        rating: 5,
        date: "May 30, 2022, 10:35 PM",
        comment:
          "Best for Family, Couple & Corporate Group. Budget Friendly, Great Amenities. Enjoyed Swimming Pool, Water Slides & Train Ride.",
      },
    ],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Stay in Deluxe Room and Suite Room",
        "Huge Parking Area",
        "Outdoor Seating Area",
        "Restaurant",
      ],
      activities: [
        "Mini Water Park",
        "Swimming Pool with Water Rides",
        "Rain Dance",
        "Indoor and Outdoor Games",
        "Children's Play Area",
        "Mini Train Ride",
        "Columbus Ride",
        "Ground Activities",
        "Carrom",
        "Pool Table",
        "Table Tennis",
        "Music",
      ],
      address:
        "Pune-Satara Highway, Village Kelawade, 5 kms ahead of Khed-Shivapur Toll Plaza, Near Reliance Petrol Pump, Taluka Bhor, District Pune, Maharashtra 412213.",
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "9:00 AM to 5:00 PM",
      includes: [
        "All Activities",
        "Breakfast",
        "Lunch (Veg / Nonveg)",
        "Tea and Snacks",
      ],
      notes: [
        "Below 5 year child is non chargeable.",
        "Children between 5 to 12 years are charged 60%.",
      ],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Check in 12:00 PM and Check out 10:00 AM",
        "Pool: 10:00 AM to 5:00 PM",
        "Lunch: 2:00 PM to 3:30 PM",
        "Hi-Tea: 5:00 PM to 6:00 PM",
        "Dinner: 9:00 PM to 10:30 PM",
      ],
      cancellation: [
        "Advance payment done is non-refundable.",
        "Date change can be done if cancelled with at least 1 week prior notice.",
      ],
      dayOuting: [
        "Time 09:00 AM to 06:00 PM",
        "No room included in one day trip.",
        "Changing rooms available.",
        "Alcohol consumption not allowed.",
      ],
      extra: [
        "Overnight stay package includes stay, lunch, hi-tea, dinner, breakfast, and all activities.",
      ],
    },
    booking: {
      basePrice: 5000,
      availability: "Available Now",
      checkIn: "12:00 PM",
      checkOut: "10:00 AM",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      couponHint: "ORCHARD10",
      couponDiscount: 500,
      secureLabel: "Secure Booking",
    },
  },
  "ruturang-agro-resort": createSimplePropertyDetails({
    slug: "ruturang-agro-resort",
    title: "Ruturang Agro Resort",
    location: "Bhor, Pune, Maharashtra, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Agro Resort",
    description:
      "Ruturang Agro Resort is suited for guests who want a countryside stay around Bhor with cottage and farm villa options.",
    price: 5000,
    roomName: "Cottage",
    occupancy: "2 Adults",
    availability: "Available Now",
    image: siteImages.santoriniVilla,
    features: ["6 Cottages", "1 Farm Villa", "Nature Stay"],
    guests: ["2 Guests", "6 Guests", "12 Guests"],
    couponHint: "RUTURANG10",
    couponDiscount: 500,
  }),
  "rajgad-water-park-resort": createSimplePropertyDetails({
    slug: "rajgad-water-park-resort",
    title: "Rajgad Water Park & Resort",
    location: "Bhor, Pune, Maharashtra, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Resort",
    description:
      "Rajgad Water Park & Resort is a Near Pune option for guests looking for simple resort stays with AC rooms and water-based leisure.",
    price: 6000,
    roomName: "AC Deluxe Room",
    occupancy: "2 Adults",
    availability: "Available Now",
    image: siteImages.resortPool,
    features: ["2 AC Deluxe Rooms", "Water Park Access", "Bhor Stay"],
    guests: ["2 Guests", "4 Guests", "6 Guests"],
    couponHint: "RAJGAD10",
    couponDiscount: 600,
  }),
  "mayurwan-farmhouse": createSimplePropertyDetails({
    slug: "mayurwan-farmhouse",
    title: "Mayurwan Farmhouse",
    location: "Bhor, Pune, Maharashtra, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Farmhouse",
    description:
      "Mayurwan Farmhouse is designed for larger private group stays in Bhor with full-property access and a more secluded farmhouse feel.",
    price: 10000,
    roomName: "Entire Property",
    occupancy: "Up to 20 Guests",
    availability: "Available Now",
    image: siteImages.modernTropicalVilla,
    features: ["Entire Property", "1 Unit Available", "Group Friendly"],
    guests: ["8 Guests", "12 Guests", "20 Guests"],
    couponHint: "MAYURWAN10",
    couponDiscount: 1000,
  }),
  "3-bhk-purandar": createSimplePropertyDetails({
    slug: "3-bhk-purandar",
    title: "3 BHK Purandar",
    location: "Purandar, Pune, Maharashtra, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Villa",
    description:
      "3 BHK Purandar is a private villa stay for guests who want a spacious and independent getaway on the Pune side of Purandar.",
    price: 12000,
    roomName: "Entire Villa",
    occupancy: "Up to 12 Guests",
    availability: "Available Now",
    image: siteImages.luxuryVillaSunset,
    features: ["Entire Villa", "1 Unit Available", "Group Stay"],
    guests: ["4 Guests", "8 Guests", "12 Guests"],
    couponHint: "PURANDAR10",
    couponDiscount: 1000,
  }),
  "bamboo-house-5-bhk": createSimplePropertyDetails({
    slug: "bamboo-house-5-bhk",
    title: "Bamboo House 5 BHK",
    location: "Bhor, Pune, Maharashtra, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Villa",
    description:
      "Bamboo House 5 BHK is built for larger group stays in Bhor with an entire private property setup and meal-inclusive comfort.",
    price: 15000,
    roomName: "Entire Property with Meal",
    occupancy: "Up to 15 Guests",
    availability: "Available Now",
    image: siteImages.mountainChalet,
    features: ["Meal Included", "5 BHK Layout", "Private Property"],
    guests: ["6 Guests", "10 Guests", "15 Guests"],
    couponHint: "BAMBOO10",
    couponDiscount: 1200,
  }),
  "4-bhk-bhor": createSimplePropertyDetails({
    slug: "4-bhk-bhor",
    title: "4 BHK, Bhor",
    location: "Bhor, Pune, Maharashtra, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Villa",
    description:
      "4 BHK, Bhor offers a private villa stay for groups who want a larger property setup and a comfortable base near Pune.",
    price: 20000,
    roomName: "Suryansh Villa",
    occupancy: "Up to 18 Guests",
    availability: "Available Now",
    image: siteImages.suiteOceanView,
    features: ["Suryansh Villa", "1 Unit Available", "Large Group Stay"],
    guests: ["8 Guests", "12 Guests", "18 Guests"],
    couponHint: "BHOR10",
    couponDiscount: 1500,
  }),
  "3-bhk-infinity-pawana": createSimplePropertyDetails({
    slug: "3-bhk-infinity-pawana",
    title: "3 BHK Infinity Pawana",
    location: "Mawal, Pune, Maharashtra, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Villa",
    description:
      "3 BHK Infinity Pawana is a premium villa choice for guests planning a spacious private stay around Mawal and the Pawana side of Pune.",
    price: 25000,
    roomName: "Entire Villa",
    occupancy: "Up to 15 Guests",
    availability: "Available Now",
    image: siteImages.santoriniVilla,
    features: ["Entire Villa", "1 Unit Available", "Premium Group Stay"],
    guests: ["6 Guests", "10 Guests", "15 Guests"],
    couponHint: "PAWANA10",
    couponDiscount: 2000,
  }),
};

export const propertyDetailsData = propertyDetailsBySlug["vishals-orchard-resort"];
export const propertySlugs = Object.keys(propertyDetailsBySlug);
