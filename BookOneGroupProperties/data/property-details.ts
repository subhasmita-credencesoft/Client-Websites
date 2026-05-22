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
    availabilityApiUrl?: string;
    externalBookingUrl?: string;
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
  availabilityApiUrl?: string;
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
      availabilityApiUrl:
        config.availabilityApiUrl ??
        (config.slug === "vedanta-resort"
          ? "https://api.thehotelmate.co/api/thm/checkAvailability/1331"
          : undefined),
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
    slug: "4-BHK-Bhor-Pune",
    title: "4 BHK Villa (Karla)",
    location: "Karla, in-karla, Lonavala, India",
    ratingLabel: "4.9 (48 Reviews)",
    typeBadge: "Private Villa",
    description:
      "4 BHK Villa (Karla) is designed for guests who want a spacious private stay in Lonavala with room for families and groups to unwind together. Its comfortable villa layout, scenic surroundings, and easy access around Karla make it a strong option for weekend escapes.",
    images: [
      siteImages.fourBhkVillaKarla,
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
        image: siteImages.fourBhkVillaKarla,
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
    location: "WQ74+G7, Panchgani - Mahabaleshwar Rd, Mahabaleshwar, Panchgani, Maharashtra 412805, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Villa",
    description:
      "A R Villa, located in the scenic Panchgani-Mahabaleshwar belt, is a peaceful hill retreat designed for guests who want private villa comfort with natural views and a swimming pool. The property offers a spacious 4 BHK bungalow along with cozy couple cottages, making it suitable for family trips, friend groups, and relaxing getaways in the Western Ghats.",
    tags: ["#Panchgani", "#Villa_Stay", "#Swimming_Pool"],
    images: [
      siteImages.luxuryVillaSunset,
      siteImages.suiteOceanView,
      siteImages.modernTropicalVilla,
      siteImages.resortPool,
      siteImages.modernHotelRestaurant,
      siteImages.hero,
    ],
    amenities: [
      { icon: "droplets", label: "Swimming Pool" },
      { icon: "car", label: "Parking Facility" },
      { icon: "utensils", label: "Kitchen" },
      { icon: "coffee", label: "Breakfast" },
      { icon: "monitor", label: "Room Service" },
      { icon: "star", label: "Housekeeping" },
      { icon: "wifi", label: "WiFi" },
    ],
    rooms: [
      {
        id: 2419,
        name: "4 BHK Bungalow",
        size: "2 Units",
        bed: "10 to 15 Guests",
        view: "Hill View",
        price: 20000,
        image: siteImages.luxuryVillaSunset,
        features: ["4 BHK Vacation Home", "Double Beds", "Extra Mattresses", "Geyser", "Shower", "Washroom", "TV", "Swimming Pool"],
        available: "2",
        description:
          "Spacious 4 BHK bungalow with living room, dining area, and kitchen, suitable for larger groups wanting a homely hill-station stay.",
        planNote: "Check in 1 PM and check out 11 AM. Food available on extra charges.",
      },
      {
        id: 2512,
        name: "Couple Cottage",
        size: "4 Cottages",
        bed: "2 to 4 Guests",
        view: "Valley View",
        price: 3000,
        image: siteImages.suiteOceanView,
        features: ["Double Bed", "Private Feel", "Washroom", "WiFi", "TV"],
        available: "4",
        description:
          "Cozy cottages that work well for couples or smaller groups looking for a more secluded and peaceful stay.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "4 BHK Bungalow Stay",
        price: 20000,
        image: siteImages.luxuryVillaSunset,
        description: "Large villa stay ideal for family groups and scenic hill vacations.",
      },
      {
        id: 2,
        title: "Couple Cottage Stay",
        price: 3000,
        image: siteImages.suiteOceanView,
        description: "Private cottage stay for couples and smaller groups.",
      },
    ],
    appPromo: {
      badge: "Panchgani Retreat",
      title: "Scenic Villa And Cottage Stay",
      description:
        "Plan a scenic hill-station stay with a 4 BHK bungalow, cozy cottages, swimming pool access, and comfortable private space around Panchgani and Mahabaleshwar.",
      image: siteImages.conciergeApp,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Property ID: 1055",
        "Located on Panchgani - Mahabaleshwar Road",
        "4 BHK bungalow plus couple cottages",
        "Swimming pool for guest use",
        "Parking facility and room service",
        "Housekeeping and luggage storage support",
        "Kitchen access available",
        "Doctor on call support",
        "Contact: 8669121656",
        "Email: arvillamahabaleshwar@gmail.com",
        "Manager: A R Villa",
      ],
      activities: [
        "Swimming Pool",
        "Scenic hill stay",
        "Family and group getaway",
        "Private cottage stay",
      ],
      address: "WQ74+G7, Panchgani - Mahabaleshwar Rd, Mahabaleshwar, Panchgani, Maharashtra 412805, India",
    },
    oneDayTripSection: {
      title: "Stay Information",
      time: "Check in 1:00 PM and Check out 11:00 AM",
      includes: [
        "4 BHK bungalow stay",
        "Couple cottage stay",
        "Swimming pool access",
        "Hill-station private accommodation",
      ],
      notes: [
        "Food is available on extra charges.",
        "Room type selection depends on group size and booking availability.",
      ],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "4 BHK Bungalow supports 10 to 15 guests and Couple Cottage supports 2 to 4 guests.",
        "Property occupancy can support up to 50 guests across inventory.",
        "Bungalow and cottages are designed for villa-style private stays.",
      ],
      cancellation: [
        "Live availability is checked through the HotelMate booking API for this property.",
        "Rates and stay confirmation depend on selected room type and final availability.",
      ],
      dayOuting: [
        "This property is configured as a stay-focused villa and cottage listing.",
      ],
      extra: [
        "Property services include Breakfast, Swimming Pool, Room Service, Parking Facility, Luggage Storage, Housekeeping, Kitchen, and Doctor on Call.",
        "Nearby references: Mahabaleshwar ST Station 15.2 km and Panchgani Bus Stand 18.4 km.",
      ],
    },
    booking: {
      basePrice: 3000,
      availability: "Available Now",
      checkIn: "Oct 24, 2025",
      checkOut: "Oct 26, 2025",
      guests: ["2 Guests", "4 Guests", "15 Guests"],
      availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/1055",
      couponHint: "ARVILLA10",
      couponDiscount: 1000,
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
  "vedanta-resort": {
    slug: "vedanta-resort",
    title: "Vedanta Resort",
    location: "at Kelawade Village, Bhor, Pune, Maharashtra 412213, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Resort",
    description:
      "Vedanta Resort is a near Pune getaway at Kelawade Village, Bhor, around a 1 hour drive from Pune. The resort offers garden-side rooms, pool-side rooms, a suite room, swimming pool access, rain dance, kids play area, indoor and outdoor games, event-friendly spaces, and veg/non-veg food support for overnight stays, one day trips, and celebrations.",
    tags: ["#Near_Pune", "#Family_Resort", "#Group_Friendly"],
    images: [
      siteImages.vedantaResortLive,
      siteImages.resortPool,
      siteImages.resortRoom,
      siteImages.modernHotelRestaurant,
      siteImages.suiteOceanView,
      siteImages.propertyManager,
    ],
    amenities: [
      { icon: "droplets", label: "Swimming Pool" },
      { icon: "wind", label: "Ceiling Fan Rooms" },
      { icon: "car", label: "Free Parking" },
      { icon: "utensils", label: "Veg & Nonveg Kitchen" },
      { icon: "coffee", label: "Breakfast Available" },
      { icon: "monitor", label: "Indoor Games" },
      { icon: "star", label: "Event Friendly Venue" },
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe Room (Garden Side)",
        size: "6 Rooms",
        bed: "2 to 5 Guests",
        view: "Garden Side",
        price: 5500,
        image: siteImages.resortRoom,
        features: ["Double Bed", "Mattress", "Shower", "W/C Washroom", "Wardrobe", "Ceiling Fan", "Soap", "Hand Wash", "Towel"],
        available: "6",
        description: "Garden-side deluxe accommodation with practical in-room essentials and check-in at 12 PM, check-out at 10 AM.",
      },
      {
        id: 2,
        name: "Suite Room",
        size: "1 Room",
        bed: "2 to 8 Guests",
        view: "Farm View",
        price: 3000,
        image: siteImages.suiteOceanView,
        features: ["Double Bed", "Electric Kettle", "Shower", "W/C Washroom", "Geyser", "Extra Mattresses"],
        available: "1",
        description: "A larger suite-style stay option suited for families or group guests wanting extra flexibility.",
      },
      {
        id: 3,
        name: "Deluxe Room (Pool Side)",
        size: "5 Rooms",
        bed: "2 to 4 Guests",
        view: "Pool Side",
        price: 6000,
        image: siteImages.resortPool,
        features: ["Double Bed", "Ceiling Fan", "Wardrobe", "W/C Washroom", "Towel", "Soap"],
        available: "5",
        description: "Pool-side deluxe rooms with quick access to the resort activity zone and swimming facilities.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "One Day Trip",
        price: 1000,
        image: siteImages.resortPool,
        description: "One day outing package with activity access for guests visiting without an overnight room stay.",
      },
      {
        id: 2,
        title: "Overnight Stay",
        price: 3000,
        image: siteImages.resortRoom,
        description: "Comfortable overnight stay packages for couples, families, and small groups near Pune.",
      },
      {
        id: 3,
        title: "Function Event Celebration",
        price: 25600,
        image: siteImages.modernHotelRestaurant,
        description: "Birthday, marriage, engagement, and event-ready booking options with multipurpose hall support.",
      },
    ],
    appPromo: {
      badge: "Near Pune Resort",
      title: "Vacation, Good Food, And Hospitality",
      description:
        "Vedanta Resort combines stay options, one day trip access, event space, pool activities, and hospitality support in one destination near Pune.",
      image: siteImages.conciergeApp,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Property ID: 1331",
        "Accommodation business located at Kelawade Village, Bhor, Pune",
        "11 Deluxe Rooms in total: 6 Garden Side and 5 Pool Side",
        "1 Luxurious Cottage / Suite Room with farm-facing stay setup",
        "Maximum occupancy support up to 32 guests across property inventory",
        "Manager: Aniket Konde",
        "Email: vedfarms01@gmail.com",
        "Contact: 8007273965 / 9130583132",
        "Website: www.tripdip.in",
      ],
      activities: [
        "Swimming Pool with attached kids pool",
        "Rain Dance with music speaker",
        "Children's Play Area",
        "Lawn",
        "Indoor Games: Cards, Carrom, Chess",
        "Outdoor Games: Cricket, Badminton, Volleyball, Football, Musical Chair",
        "Multipurpose Hall for dormitory, event celebration, dance floor, and conference use",
        "Free Parking",
      ],
      address: "at Kelawade Village, Bhor, Pune, Maharashtra 412213, India",
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "Day outing package available",
      includes: [
        "Swimming pool and kids pool access",
        "Rain dance access",
        "Indoor and outdoor game zones",
        "Lawn and family leisure areas",
        "One day trip package booking support",
      ],
      notes: [
        "Please confirm the exact inclusions and timings before arrival.",
        "Function and celebration bookings can also be arranged separately.",
      ],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Check in 12:00 PM and Check out 10:00 AM",
        "Minimum occupancy starts from 1 guest and maximum occupancy goes up to 32 across the property",
        "Garden side, pool side, and suite inventory are subject to availability",
      ],
      cancellation: [
        "Live availability is checked through the HotelMate booking API for this property.",
        "Date and room availability remain subject to selected room type and guest count.",
      ],
      dayOuting: [
        "One Day Trip booking is available at the property.",
        "Event, birthday, marriage, and engagement booking can be arranged on request.",
      ],
      extra: [
        "Veg and Nonveg kitchens are separate.",
        "The property uses Razorpay for online payments through its connected booking engine.",
      ],
    },
    booking: {
      basePrice: 3000,
      availability: "Available Now",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/1331",
      couponHint: "VEDANTA10",
      couponDiscount: 300,
      secureLabel: "Secure Booking",
    },
  },
  "orchard-resort": {
    slug: "orchard-resort",
    title: "Orchard Resort",
    location: "Pune Satara NH48, at Kelawade, Bhor, near Reliance Petrol Pump, Pune, Maharashtra 412213, India",
    ratingLabel: "5.0 (1 Review)",
    typeBadge: "Resort",
    description:
      "Orchard Resort is a family and couple friendly resort near Kelawade, Bhor, around the Pune Satara highway belt. It offers AC deluxe rooms, AC suite rooms, one day trip access, food packages, pool activities, rain dance, rides, indoor and outdoor games, and a broad setup for family, couple, and corporate group outings near Pune.",
    tags: ["#Family_Resort", "#Couple_Friendly", "#Corporate_Group"],
    images: [
      siteImages.orchardResortLive,
      siteImages.resortRoom,
      siteImages.modernHotelRestaurant,
      siteImages.resortPool,
      siteImages.hero,
      siteImages.suiteOceanView,
    ],
    amenities: [
      { icon: "droplets", label: "Swimming Pool" },
      { icon: "wind", label: "Air Conditioning" },
      { icon: "utensils", label: "Restaurant" },
      { icon: "car", label: "Huge Parking Area" },
      { icon: "coffee", label: "Breakfast Available" },
      { icon: "monitor", label: "TV In Rooms" },
      { icon: "star", label: "Family & Corporate Friendly" },
    ],
    rooms: [
      {
        id: 1,
        name: "AC Deluxe Room",
        size: "Standard Room",
        bed: "2 Adults",
        view: "Resort View",
        price: 5000,
        image: siteImages.resortRoom,
        features: ["Double Bed", "AC", "Ceiling Fan", "Electric Geyser", "Attached Washroom", "Water Bottle", "Towel", "Soap", "Wardrobe", "Generator Backup"],
        available: "20",
        description:
          "AC deluxe room with double bed, ceiling fan, electric geyser, attached washroom, mineral water bottle, towel, soap, W/C toilet, and shower.",
        planNote: "Room inventory and stay plan remain subject to availability.",
      },
      {
        id: 2,
        name: "AC Suite Room",
        size: "10 Rooms",
        bed: "2 to 4 Guests",
        view: "Resort View",
        price: 6000,
        image: siteImages.suiteOceanView,
        features: ["Double Bed", "AC", "TV", "Ceiling Fan", "Electric Geyser", "Attached Washroom", "Water Bottle", "Towel", "Soap", "Hand Wash"],
        available: "10",
        description:
          "AC suite room with extra comfort for small families and group guests, including AC, TV, geyser, washroom, toiletries, and basic room conveniences.",
        planNote: "Please confirm suite inventory and selected package before booking.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "One Day Trip Package",
        price: 1000,
        image: siteImages.resortPool,
        description: "9:30 AM to 5:30 PM with breakfast, lunch, hi-tea, and activities.",
      },
      {
        id: 2,
        title: "Overnight Stay Package",
        price: 5000,
        image: siteImages.modernHotelRestaurant,
        description: "Stay with lunch, hi-tea, dinner, breakfast, and all activities included.",
      },
      {
        id: 3,
        title: "AC Suite Stay",
        price: 6000,
        image: siteImages.suiteOceanView,
        description: "AC suite room stay option for couples, families, and small groups with added room comfort.",
      },
    ],
    appPromo: {
      badge: "Family Resort",
      title: "Stay, Dine, And Enjoy Full-Day Activities",
      description:
        "Orchard Resort combines stay, dining, one day outing access, and family-friendly resort activities in one near Pune destination.",
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
        "Property ID: 516",
        "Stay in AC Deluxe Room and AC Suite Room",
        "Huge Parking Area",
        "Outdoor Seating Area",
        "Restaurant",
        "Contact: 9130583132",
        "Email: orchardresort1@gmail.com",
        "Manager: Shubham Jadhav",
        "Website: https://www.tripdip.in/#",
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
        "Pune Satara NH48, at Kelawade, Bhor, near Reliance Petrol Pump, Pune, Maharashtra 412213, India",
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "9:30 AM to 5:30 PM",
      includes: [
        "All Activities",
        "Breakfast",
        "Lunch (Veg / Nonveg)",
        "Hi-Tea",
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
        "Live availability is checked through the HotelMate booking API for this property.",
        "Date change can be done if cancelled with at least 1 week prior notice.",
      ],
      dayOuting: [
        "Time 09:30 AM to 05:30 PM",
        "No room included in one day trip.",
        "Changing rooms available.",
        "Alcohol consumption not allowed.",
      ],
      extra: [
        "Overnight stay package includes stay, lunch, hi-tea, dinner, breakfast, and all activities.",
        "Lunch: Veg/Non Thali 400, Hi-Tea: 100, Dinner: Veg/Non Thali 400, Breakfast: 100.",
      ],
    },
    booking: {
      basePrice: 5000,
      availability: "Available Now",
      checkIn: "12:00 PM",
      checkOut: "10:00 AM",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/516",
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
    image: siteImages.ruturangAgroResort,
    features: ["6 Cottages", "1 Farm Villa", "Nature Stay"],
    guests: ["2 Guests", "6 Guests", "12 Guests"],
    couponHint: "RUTURANG10",
    couponDiscount: 500,
    availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/712",
  }),
  "rajgad-water-park-resort": {
    slug: "rajgad-water-park-resort",
    title: "Rajgad Water Park & Resort",
    location: "Pune Satara National Highway 48, at Varve, Bhor, Pune, Maharashtra 412213, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Resort",
    description:
      "Rajgad Water Park & Resort is a family-friendly holiday destination near Pune that combines overnight stays, water park fun, and adventure experiences in one property. With cottages, AC deluxe rooms, jacuzzi rooms, royal tents, food packages, and activity access, it works well for day outings, overnight stays, and group celebrations close to the city.",
    tags: ["#Water_Park", "#Adventure_Park", "#Near_Pune"],
    images: [
      siteImages.rajgadWaterPark,
      siteImages.hero,
      siteImages.resortRoom,
      siteImages.modernHotelRestaurant,
      siteImages.suiteOceanView,
      siteImages.propertyManager,
    ],
    amenities: [
      { icon: "droplets", label: "Water Park Rides" },
      { icon: "star", label: "Adventure Park" },
      { icon: "car", label: "Huge Parking Area" },
      { icon: "utensils", label: "Restaurant" },
      { icon: "coffee", label: "Breakfast + Hi-Tea" },
      { icon: "monitor", label: "Changing Rooms" },
      { icon: "wind", label: "AC Stay Options" },
    ],
    rooms: [
      {
        id: 1,
        name: "AC Deluxe Room",
        size: "2 Rooms",
        bed: "2 to 4 Guests",
        view: "Resort View",
        price: 6000,
        image: siteImages.resortRoom,
        features: ["Double Bed", "Extra Mattresses", "WC Washroom", "Geyser", "Shower", "Water Bottle", "Table Fan", "Soap", "Hand Wash", "Towel"],
        available: "2",
        description: "AC Deluxe Room with check-in at 12 PM and check-out at 10 AM, suited for small families or couples visiting the water park and adventure park.",
      },
      {
        id: 2,
        name: "AC Deluxe Room (Jacuzzi)",
        size: "3 Rooms",
        bed: "2 to 4 Guests",
        view: "Resort View",
        price: 7000,
        image: siteImages.suiteOceanView,
        features: ["King Size Bed", "AC", "Smart TV", "Wardrobe", "Table Fan", "Mattresses", "Jacuzzi Bath Tub", "Geyser", "Soap", "Hand Wash", "Towel"],
        available: "3",
        description: "Premium AC Deluxe Room with Jacuzzi bath tub, ideal for guests who want extra comfort with their overnight stay package.",
      },
      {
        id: 3,
        name: "Royal Tent A/C",
        size: "2 Units",
        bed: "2 to 5 Guests",
        view: "Garden View",
        price: 8000,
        image: siteImages.mountainChalet,
        features: ["AC", "TV", "Extra Mattresses", "Geyser", "Shower"],
        available: "2",
        description: "Royal Tent A/C stay with overnight comfort, suitable for guests who want a tent-style experience with attached facilities.",
      },
      {
        id: 4,
        name: "AC Cottage",
        size: "3 Rooms",
        bed: "2 to 5 Guests",
        view: "Garden View",
        price: 9000,
        image: siteImages.modernTropicalVilla,
        features: ["AC", "Double Bed", "Wardrobe", "TV", "Geyser", "Shower", "Soap", "Towel", "Hand Wash"],
        available: "3",
        description: "AC Cottage stay with a more spacious private-room setup for families and small groups.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "Overnight Stay Package",
        price: 2500,
        image: siteImages.resortRoom,
        description: "Overnight package including stay, lunch, hi-tea, dinner, breakfast, water park rides, and adventure park activities.",
      },
      {
        id: 2,
        title: "Combo Package",
        price: 1500,
        image: siteImages.rajgadWaterPark,
        description: "10 AM to 5 PM combo package including water park, adventure park, breakfast, lunch, and hi-tea.",
      },
      {
        id: 3,
        title: "Water Park",
        price: 550,
        image: siteImages.hero,
        description: "Day-use water park access package with rides, swimming pool fun, and rain dance.",
      },
      {
        id: 4,
        title: "Adventure Park Add-On",
        price: 350,
        image: siteImages.propertyManager,
        description: "Adventure park access available as an activity add-on for thrill and family fun.",
      },
    ],
    appPromo: {
      badge: "Water Park & Adventure Park",
      title: "Holiday Fun With Stay And Activities",
      description:
        "Rajgad Water Park & Resort blends stay packages, water rides, adventure activities, and family food plans near Pune.",
      image: siteImages.conciergeApp,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Property ID: 518",
        "Water Park & Adventure Park destination",
        "A perfect holiday destination for friends and families",
        "Stay in cottages, AC deluxe rooms, jacuzzi rooms, and royal tents",
        "Huge Parking Area",
        "Changing Rooms",
        "Garden, Reception, and Restaurant setup",
        "Contact: 7030055051 / 9130583132",
        "Landline: 7276333374",
        "Email: g2khospitality@gmail.com / rajgadwaterpark.info@gmail.com",
        "Manager: Akash Gaikwad",
        "WhatsApp: 9130583132",
      ],
      activities: [
        "Water Park Rides (10+ rides)",
        "Wave Pool with DJ System",
        "Rain Dance",
        "Adventure Park (10+ activities)",
        "Holiday and family outing support",
      ],
      address: "Pune-Satara Highway, near McDonald's, Varve Khurd, next to Khedshivapur Toll Naka, Bhor, Pune, Maharashtra 412213, India",
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "10:00 AM to 5:00 PM",
      includes: [
        "Water Park",
        "Adventure Park",
        "Breakfast",
        "Lunch",
        "Hi-Tea",
      ],
      notes: [
        "Combo Package: 1,250 per adult (4+ ft height) and 1,100 per child (3-4 ft height).",
        "Children aged 5-12 are charged 1,500 in the overnight package and kids aged 0-5 are free.",
      ],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Check in 12:00 PM and Check out 10:00 AM",
        "Stay options include AC Deluxe Room, AC Deluxe Room (Jacuzzi), Royal Tent A/C, and AC Cottage",
        "Maximum occupancy support goes up to 30 guests across property inventory",
      ],
      cancellation: [
        "Live availability is checked through the HotelMate booking API for this property.",
        "Rates vary by room type, package, and occupancy selection.",
      ],
      dayOuting: [
        "Water Park and Combo Package are day-use products.",
        "Adventure Park can be added as part of activity-based visits.",
      ],
      extra: [
        "Veg Thali: 249, Hi-Tea: 99, Chicken Thali: 299, Breakfast: 99, Adventure Park: 350.",
        "Property supports Razorpay payments through its connected booking system.",
      ],
    },
    booking: {
      basePrice: 6000,
      availability: "Available Now",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/518",
      couponHint: "RAJGAD10",
      couponDiscount: 600,
      secureLabel: "Secure Booking",
    },
  },
  "mayurwan-farmhouse": {
    slug: "mayurwan-farmhouse",
    title: "Mayurwan Farmhouse",
    location: "Kusgav Khind Rd, Parwadi, Bhor, Pune, Maharashtra 412205, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Farmhouse",
    description:
      "Mayurwan Farmhouse is a private nature-stay property for family groups, friends groups, and corporate groups looking for a full farmhouse experience near Pune. It offers a 20,000 sq. ft. private premises with hill views, pool access, rain dance, games, bonfire, outdoor seating, pet-friendly stays, and an entire-property setup for larger group bookings.",
    tags: ["#Family_Group", "#Nature_Stay", "#Near_Pune"],
    images: [
      siteImages.mayurwanFarmhouseLive,
      siteImages.resortPool,
      siteImages.mountainChalet,
      siteImages.resortRoom,
      siteImages.suiteOceanView,
      siteImages.propertyManager,
    ],
    amenities: [
      { icon: "droplets", label: "Private Pool" },
      { icon: "star", label: "Nature Hills View" },
      { icon: "car", label: "Private Premises" },
      { icon: "utensils", label: "Veg & Nonveg Food" },
      { icon: "coffee", label: "Meal Packages" },
      { icon: "monitor", label: "Bluetooth Speaker" },
      { icon: "wifi", label: "WiFi" },
    ],
    rooms: [
      {
        id: 1611,
        name: "Entire Property",
        size: "1 Farmhouse",
        bed: "10 to 20 Guests",
        view: "360 Nature Hills View",
        price: 10000,
        image: siteImages.modernTropicalVilla,
        features: [
          "20,000 sq. ft. private premises",
          "1 Big Open Hall",
          "2 Bedrooms",
          "2 Bathrooms",
          "Extra Mattresses",
          "Kitchen Facilities",
          "Dining Area",
          "Varandha",
        ],
        available: "1",
        description:
          "Entire property stay with check-in at 1 PM and check-out at 11 AM. Meal packages are available on extra charges.",
        planNote: "Flexible timing may be possible on weekdays, subject to confirmation.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "Veg Meal Package",
        price: 849,
        image: siteImages.modernHotelRestaurant,
        description: "Lunch + Hi-Tea + Dinner + Breakfast.",
      },
      {
        id: 2,
        title: "Chicken Meal Package",
        price: 999,
        image: siteImages.modernHotelRestaurant,
        description: "Lunch + Hi-Tea + Dinner + Breakfast.",
      },
      {
        id: 3,
        title: "Dinner & Breakfast",
        price: 599,
        image: siteImages.modernHotelRestaurant,
        description: "Simple meal option for overnight farmhouse stays.",
      },
      {
        id: 4,
        title: "Bonfire Add-On",
        price: 99,
        image: siteImages.propertyManager,
        description: "Bonfire setup available as an add-on service.",
      },
    ],
    appPromo: {
      badge: "One Day In Nature",
      title: "Private Farmhouse Stay Near Pune",
      description:
        "Mayurwan Farmhouse is built for larger private group stays with nature views, pool fun, rain dance, games, and a full-property experience.",
      image: siteImages.conciergeApp,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Property ID: 552",
        "20,000 sq. ft. compounded private premises",
        "360 nature hills view",
        "19 people stay capacity",
        "Big swimming pool with attached kids pool",
        "Rain Dance (30 min)",
        "Bluetooth music speaker",
        "Children's play area",
        "Bonfire and sunset view",
        "Short trek and birds chirping sounds",
        "Pets are allowed",
        "Kitchen facilities, dining area, and outdoor seating",
        "Contact: 9130583132",
        "Email: mayurwanfamilyresort@gmail.com",
        "Manager: Prakash J",
      ],
      activities: [
        "Swimming Pool",
        "Kids Pool",
        "Rain Dance",
        "Carrom",
        "Chess",
        "Volleyball",
        "Lagori",
        "Short Trek",
        "Bonfire",
      ],
      address: "Just 27 km from Katraj Bus Stop, at Paravadi, Tal - Bhor, Dist - Pune. Route: Kondhanpur Fata (Jagdamba Hotel NH48) > Kondhanpur Gaon > Kusgaon Khind > Paravadi.",
    },
    oneDayTripSection: {
      title: "Stay Information",
      time: "Check in 1:00 PM and Check out 11:00 AM",
      includes: [
        "Entire Property Access",
        "Private Pool",
        "Kids Pool",
        "Rain Dance",
        "Games and Play Area",
      ],
      notes: [
        "Flexible timing may be available on weekdays.",
        "Meal package available on extra charges.",
      ],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Minimum occupancy starts at 10 guests and maximum occupancy goes up to 19 guests.",
        "Entire Property booking includes hall, bedrooms, bathrooms, and outdoor access.",
        "Extra mattresses are available for larger groups.",
      ],
      cancellation: [
        "Live availability is checked through the HotelMate booking API for this property.",
        "Rates and booking confirmation are subject to final availability.",
      ],
      dayOuting: [
        "This property is primarily configured as an entire-property farmhouse stay.",
        "Food and service add-ons can be selected separately.",
      ],
      extra: [
        "Veg Meal Package: 849, Chicken Meal Package: 999, Cook: 2000.",
        "Veg BBQ 1 Kg: 750, Chicken BBQ 1 Kg: 849, Bonfire: 99, Dinner & Breakfast: 599.",
      ],
    },
    booking: {
      basePrice: 10000,
      availability: "Available Now",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["10 Guests", "15 Guests", "19 Guests"],
      availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/552",
      couponHint: "MAYURWAN10",
      couponDiscount: 1000,
      secureLabel: "Secure Booking",
    },
  },
  "pipul-bandhan-inn-hotel": {
    slug: "pipul-bandhan-inn-hotel",
    title: "Pipul Bandhan Inn Hotel",
    location: "702 Ice Factory Lane, Cuttack Rd, Bhubaneswar, Odisha 751006, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Hotel",
    description:
      "Pipul Bandhan Inn Hotel is a budget-friendly hotel stay in Bhubaneswar designed for simple, comfortable accommodation with AC rooms and WiFi access. It works well for short city stays, business travel, and guests looking for affordable hotel rooms with essential amenities.",
    tags: ["#Budget_Hotel", "#Bhubaneswar", "#Business_Stay"],
    images: [
      siteImages.luxuryVillaSunset,
      siteImages.resortRoom,
      siteImages.modernHotelRestaurant,
      siteImages.resortBathroom,
      siteImages.suiteOceanView,
      siteImages.propertyManager,
    ],
    amenities: [
      { icon: "wifi", label: "WiFi" },
      { icon: "wind", label: "Air Conditioning" },
      { icon: "car", label: "City Access" },
      { icon: "monitor", label: "Basic Stay Comfort" },
      { icon: "coffee", label: "Budget-Friendly" },
    ],
    rooms: [
      {
        id: 2106,
        name: "1. Deluxe AC Room",
        size: "2 Rooms",
        bed: "2 to 3 Guests",
        view: "City View",
        price: 500,
        image: siteImages.resortRoom,
        features: ["WiFi", "AC Room", "Budget Stay", "Short Stay Friendly"],
        available: "2",
        description: "Deluxe AC Room for budget stays with essential comfort and WiFi connectivity.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "Room Only Stay",
        price: 500,
        image: siteImages.resortRoom,
        description: "Budget-friendly deluxe AC room stay for short visits and city travel.",
      },
    ],
    appPromo: {
      badge: "Budget Hotel Stay",
      title: "Affordable City Stay In Bhubaneswar",
      description:
        "Pipul Bandhan Inn Hotel offers a simple city-stay option with AC rooms, WiFi, and budget pricing in Bhubaneswar.",
      image: siteImages.conciergeApp,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Property ID: 812",
        "Business subtype: Hotel",
        "Budget hotel stay in Bhubaneswar",
        "Slogan: Paradiso El Heaven",
        "Contact: 7440002521",
        "Email: test.onboarding103@gmail.com",
        "Manager Contact: 7440002521",
        "GST Number: asd12345",
        "Website: https://bookonelocal.in",
      ],
      activities: ["Short city stays", "Business travel stays", "Budget-friendly accommodation"],
      address: "702 Ice Factory Lane, Cuttack Rd, Bhubaneswar, Odisha 751006, India",
    },
    oneDayTripSection: {
      title: "Stay Information",
      time: "Flexible subject to booking confirmation",
      includes: [
        "Deluxe AC Room",
        "WiFi access",
        "Basic hotel accommodation",
      ],
      notes: [
        "This property is primarily a room-stay hotel listing.",
        "Package inclusions should be confirmed at booking time.",
      ],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Deluxe AC Room supports 2 to 3 guests",
        "Minimum occupancy starts from 1 guest and maximum property occupancy is 18",
        "Taxes apply as per property GST slabs",
      ],
      cancellation: [
        "Live availability is checked through the HotelMate booking API for this property.",
        "Room availability and rates are subject to final confirmation.",
      ],
      dayOuting: [
        "This property is intended for room stays rather than activity packages.",
      ],
      extra: [
        "Instagram handle listed as: bookstartest.",
        "Payment gateway is connected through Atom.",
      ],
    },
    booking: {
      basePrice: 500,
      availability: "Available Now",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["2 Guests", "3 Guests", "4 Guests"],
      availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/812",
      couponHint: "PIPUL10",
      couponDiscount: 100,
      secureLabel: "Secure Booking",
    },
  },
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
    image: siteImages.threeBhkPurandarLive,
    features: ["Entire Villa", "1 Unit Available", "Group Stay"],
    guests: ["4 Guests", "8 Guests", "12 Guests"],
    couponHint: "PURANDAR10",
    couponDiscount: 1000,
    availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/714",
  }),
  "k-l-farmhouse": createSimplePropertyDetails({
    slug: "k-l-farmhouse",
    title: "K L Farmhouse",
    location: "Bopdev-Saswad Road, Purandar, Pune, Maharashtra 412301, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Resort",
    description:
      "K L Farmhouse is a private group-friendly resort stay near Purandar for couples, families, corporate groups, ladies groups, events, and get-togethers. The property offers a large compounded premises with swimming pool, kids pool, lawn space, event setup, dining hall, and multiple stay options including AC cottages, deluxe rooms, and container rooms.",
    price: 25000,
    roomName: "Farmhouse Stay",
    occupancy: "Up to 35 Guests",
    availability: "Available Now",
    image: siteImages.klFarmhouseLive,
    features: ["4 AC Cottages", "2 Deluxe Rooms", "2 Container Rooms", "Swimming Pool"],
    guests: ["10 Guests", "20 Guests", "35 Guests"],
    couponHint: "KLFARM10",
    couponDiscount: 1500,
    availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/1401",
  }),
  "peacock-hills-resort-pune": createSimplePropertyDetails({
    slug: "peacock-hills-resort-pune",
    title: "Peacock Hills Resort Pune",
    location: "at Village Degaon, Bhor, Pune, Maharashtra 412213, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Resort",
    description:
      "Peacock Hills Resort Pune offers a peaceful stay surrounded by natural views and a quiet atmosphere away from city noise. The property is suited for families, couples, and solo travellers looking for a calm nature-focused getaway with modern room comfort and a relaxed resort setting.",
    price: 0,
    roomName: "Resort Stay",
    occupancy: "Guests on Request",
    availability: "Available Now",
    image: siteImages.resortPool,
    features: ["Nature Stay", "Family Friendly", "Scenic Resort", "Peaceful Getaway"],
    guests: ["2 Guests", "4 Guests", "6 Guests"],
    couponHint: "PEACOCK10",
    couponDiscount: 500,
    availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/3519",
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
  "prathamesh-resort": {
    slug: "prathamesh-resort",
    title: "Prathamesh Resort",
    location: "Village Salawade, near Khed-Shivapur, Bhor, Pune, Maharashtra 412213, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Resort",
    description:
      "Prathamesh Resort is a riverside nature retreat near Khed-Shivapur, Bhor, offering tent accommodations and a 3 BHK stay option for families and groups. With garden and river view tents, a natural setting, and one day trip packages, it is a good option for guests looking for an affordable outdoor getaway close to Pune.",
    tags: ["#River_View", "#Tent_Stay", "#Near_Pune"],
    images: [
      siteImages.prathameshResortLive,
      siteImages.resortPool,
      siteImages.resortRoom,
      siteImages.modernHotelRestaurant,
      siteImages.suiteOceanView,
      siteImages.hero,
    ],
    amenities: [
      { icon: "droplets", label: "River View" },
      { icon: "star", label: "Tent Stay" },
      { icon: "car", label: "Free Parking" },
      { icon: "utensils", label: "Meal Packages" },
      { icon: "coffee", label: "Breakfast Option" },
      { icon: "monitor", label: "Outdoor Activities" },
      { icon: "wind", label: "Natural Setting" },
    ],
    rooms: [
      {
        id: 1,
        name: "Garden View Tent",
        size: "Multiple Units",
        bed: "2 to 4 Guests",
        view: "Garden View",
        price: 4500,
        image: siteImages.prathameshResortLive,
        features: ["Garden Setting", "Comfortable Bedding", "Attached Washroom", "Nature Stay"],
        available: "Available",
        description: "Garden-facing tent accommodation with a comfortable bedding setup and access to resort amenities.",
      },
      {
        id: 2,
        name: "River View Tent",
        size: "Multiple Units",
        bed: "2 to 4 Guests",
        view: "River View",
        price: 5500,
        image: siteImages.resortPool,
        features: ["River View", "Comfortable Bedding", "Attached Washroom", "Scenic Setting"],
        available: "Available",
        description: "River-facing tent stay with scenic views and a relaxed outdoor atmosphere for couples and small families.",
      },
      {
        id: 3,
        name: "3 BHK",
        size: "1 Unit",
        bed: "6 to 10 Guests",
        view: "Property View",
        price: 8000,
        image: siteImages.suiteOceanView,
        features: ["3 Bedrooms", "Hall & Kitchen", "Ideal for Groups", "Private Accommodation"],
        available: "1",
        description: "3 BHK private accommodation ideal for family and friend group stays with more space and privacy.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "One Day Trip",
        price: 1200,
        image: siteImages.prathameshResortLive,
        description: "Day outing package with access to property grounds, tent leisure, and riverside nature experiences.",
      },
      {
        id: 2,
        title: "Overnight Stay",
        price: 4500,
        image: siteImages.resortRoom,
        description: "Overnight package for couples, families, and small groups at Prathamesh Resort near Bhor.",
      },
    ],
    appPromo: {
      badge: "Riverside Tent Stay",
      title: "Nature Stay Near Pune",
      description:
        "Enjoy a relaxed riverside tent stay or a 3 BHK private accommodation near Khed-Shivapur, Bhor, with day trip packages and nature access.",
      image: siteImages.conciergeApp,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Garden View Tent and River View Tent stay options",
        "3 BHK private accommodation for group stays",
        "Located near Village Salawade, Khed-Shivapur, Bhor",
        "One Day Trip packages available",
        "Contact: 9130583132",
      ],
      activities: [
        "River View Tent Stay",
        "Garden View Tent Stay",
        "3 BHK Group Accommodation",
        "One Day Trip",
        "Nature Walks",
      ],
      address: "Village Salawade, near Khed-Shivapur, Bhor, Pune, Maharashtra 412213, India",
    },
    oneDayTripSection: {
      title: "One Day Trip",
      time: "9:00 AM to 5:00 PM",
      includes: [
        "Property and grounds access",
        "Riverside and garden nature experience",
        "Meal package based on booking plan",
      ],
      notes: ["Please confirm one day trip availability before booking."],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Check in 12:00 PM and Check out 10:00 AM",
        "Tent and 3 BHK availability subject to prior booking confirmation",
      ],
      cancellation: [
        "Advance payment terms apply at the time of booking.",
        "Date changes are subject to availability and prior notice.",
      ],
      dayOuting: [
        "One Day Trip access and timing depends on selected package.",
        "Guests are expected to follow property and outdoor activity rules.",
      ],
      extra: ["Please confirm guest count and meal requirements before arrival."],
    },
    booking: {
      basePrice: 4500,
      availability: "Available Now",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["2 Guests", "4 Guests", "8 Guests"],
      availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/1370",
      couponHint: "PRATHAMESH10",
      couponDiscount: 400,
      secureLabel: "Secure Booking",
    },
  },
  "4-bhk-bhor": {
    slug: "4-bhk-bhor",
    title: "4 BHK, Bhor",
    location: "Bhor, Pune, Maharashtra 412206, India",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Villa",
    description:
      "4 BHK, Bhor, also known as Suryansh Villa, is a private group-stay villa built for guests who want peace, fun, and relaxation together near Pune. The property offers a large 50,000 sq. ft. private area with AC bedrooms, private pool, rain dance, lawn space, indoor and outdoor games, outdoor seating, and a comfortable villa setup for family and friend groups.",
    tags: ["#Suryansh_Villa", "#Private_Pool", "#Near_Pune"],
    images: [
      siteImages.fourBhkBhor,
      siteImages.resortPool,
      siteImages.luxuryVillaSunset,
      siteImages.modernTropicalVilla,
      siteImages.resortRoom,
      siteImages.propertyManager,
    ],
    amenities: [
      { icon: "droplets", label: "Private Swimming Pool" },
      { icon: "wind", label: "AC Bedrooms" },
      { icon: "car", label: "Covered Parking" },
      { icon: "monitor", label: "LED TV" },
      { icon: "utensils", label: "Kitchen Setup" },
      { icon: "coffee", label: "Meal Packages" },
      { icon: "star", label: "Caretaker Support" },
    ],
    rooms: [
      {
        id: 1610,
        name: "Suryansh Villa",
        size: "1 Villa",
        bed: "10 to 18 Guests",
        view: "Private Lawn View",
        price: 20000,
        image: siteImages.fourBhkBhor,
        features: [
          "4 AC Bedrooms",
          "4 Bathrooms",
          "Living Room (AC)",
          "Private Swimming Pool",
          "Rain Dance",
          "Music Speaker",
          "Kids Play Area",
          "Indoor & Outdoor Games",
        ],
        available: "1",
        description:
          "Entire Suryansh Villa stay with check-in at 1 PM and check-out at 11 AM. Food is not included, while veg and non-veg meal packages are available at additional cost.",
        planNote: "Ideal for private group stays with outdoor seating, lawn access, and a villa-style setup.",
      },
    ],
    packages: [
      {
        id: 1,
        title: "Villa Stay",
        price: 20000,
        image: siteImages.suiteOceanView,
        description: "Entire villa stay for larger groups with private pool and villa amenities.",
      },
      {
        id: 2,
        title: "BBQ 1 Kg",
        price: 850,
        image: siteImages.modernHotelRestaurant,
        description: "Veg or non-veg BBQ add-on package.",
      },
      {
        id: 3,
        title: "Starter 1 Kg",
        price: 850,
        image: siteImages.modernHotelRestaurant,
        description: "Chicken sukka, chilly chicken, or paneer pakoda starter add-on.",
      },
    ],
    appPromo: {
      badge: "Peace, Fun & Happiness",
      title: "Private Villa Getaway In Bhor",
      description:
        "Suryansh Villa combines a private pool, lawn space, comfortable interiors, games, and outdoor hangout areas for large group stays near Pune.",
      image: siteImages.conciergeApp,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [
        "Property ID: 550",
        "50,000 sq. ft. compounded private area",
        "4 AC bedrooms and 4 bathrooms",
        "Living room with AC",
        "LED TV in hall and bedrooms with Tata Sky",
        "Kitchen with gas, fridge, and mineral water",
        "Private swimming pool (30 x 20)",
        "Rain Dance (30 min)",
        "Open lawn (5000 sq. ft.)",
        "Children's play area",
        "Outdoor double story machan",
        "Covered car parking area",
        "Organic farming and caretaker support",
        "Contact: 9130583132",
        "Email: suryanshresort@gmail.com",
        "Manager: Prathamesh V.",
      ],
      activities: [
        "Swimming Pool",
        "Rain Dance",
        "Cricket",
        "Carrom",
        "Chess",
        "Cards",
        "Badminton",
        "Kids Play Area",
      ],
      address: "Bhor, Pune, Maharashtra 412206, India",
    },
    oneDayTripSection: {
      title: "Stay Information",
      time: "Check in 1:00 PM and Check out 11:00 AM",
      includes: [
        "Entire Villa Access",
        "Private Pool",
        "Rain Dance",
        "Lawn and Outdoor Seating",
        "Indoor & Outdoor Games",
      ],
      notes: [
        "Food is not included in the base package.",
        "Veg and non-veg meal packages are available on additional charges.",
      ],
    },
    policiesSection: {
      title: "Policies",
      accommodation: [
        "Minimum occupancy starts at 10 guests and maximum occupancy goes up to 15 guests in property configuration.",
        "Entire villa booking includes bedrooms, bathrooms, hall, kitchen, lawn, and outdoor activity spaces.",
        "Extra mattresses are available for comfortable group stays.",
      ],
      cancellation: [
        "Live availability is checked through the HotelMate booking API for this property.",
        "Rates and booking confirmation depend on final availability and selected dates.",
      ],
      dayOuting: [
        "This property is configured as a private-stay villa listing rather than a separate day-out package.",
      ],
      extra: [
        "Distance references: 49 km from Katraj Bus Stop, 20 km from Kapurhol-Bhor Fata, and 7 km from Pruthviraj HP Petrol Pump.",
        "Nearby places: Bhor Rajwada, Necklace Point, Bhatghar Dam, Balaji Temple, and Baneshwar Temple.",
        "BBQ 1 Kg: 850 and Starter 1 Kg: 850.",
      ],
    },
    booking: {
      basePrice: 20000,
      availability: "Available Now",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["10 Guests", "15 Guests", "18 Guests"],
      availabilityApiUrl: "https://api.thehotelmate.co/api/thm/checkAvailability/3520",
      couponHint: "BHOR10",
      couponDiscount: 1500,
      secureLabel: "Secure Booking",
    },
  },
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
  "shalom-maple-leaf": {
    "slug": "shalom-maple-leaf",
    "title": "Shalom Maple Leaf",
    "location": "Villa House No. 3515, Chintamani Guli Road Nagaon Road, Survey No. 1922 Nagaon, Alibaug, Maharashtra, India",
    "ratingLabel": "New Property",
    "typeBadge": "Villa",
    "description": "Welcome to The Shalom Maple Leaf in Alibaug is a serene 4BHK private villa surrounded by lush greenery and peaceful mountain views, offering the perfect escape for relaxation. Spanning 3,500 sq. ft., it features a private swimming pool with a deck, spacious rooms, and generous outdoor areas that blend modern comfort with nature’s tranquility.",
    "tags": [
        "#Alibaug",
        "#Villa_Stay",
        "#Swimming_Pool"
    ],
    "images": [
        "https://bookonelocal.in/cdn/2025-11-18-071950407-45.jpg"
    ],
    "amenities": [
        {
            "icon": "droplets",
            "label": "Swimming Pool"
        },
        {
            "icon": "car",
            "label": "Free Hotel Parking"
        },
        {
            "icon": "wind",
            "label": "Air conditioning"
        },
        {
            "icon": "wifi",
            "label": "Free WiFi"
        },
        {
            "icon": "monitor",
            "label": "Flat screen TV"
        }
    ],
    "rooms": [
        {
            "id": 1,
            "name": "4BHK Private Villa",
            "size": "3500 sq.ft",
            "bed": "4 Bedrooms",
            "view": "Mountain View",
            "price": 25000,
            "image": "https://bookonelocal.in/cdn/2025-11-18-071950407-45.jpg",
            "features": [
                "Private Swimming Pool",
                "Deck",
                "Spacious Rooms",
                "Outdoor Areas"
            ],
            "available": "1",
            "description": "A serene 4BHK private villa surrounded by lush greenery and peaceful mountain views."
        }
    ],
    "packages": [],
    "appPromo": {
        "badge": "Alibaug Retreat",
        "title": "Scenic Villa Stay",
        "description": "Plan a scenic stay with a 4BHK private villa and swimming pool access in Alibaug.",
        "image": siteImages.conciergeApp
    },
    "reviews": [],
    "propertyDetailsSection": {
        "title": "Property Details",
        "lines": [
            "Property ID: 3268",
            "Located in Alibaug",
            "4BHK private villa",
            "Swimming pool with deck",
            "Spacious rooms and generous outdoor areas",
            "Contact: 7666478855",
            "Email: shalom.bytripdip@gmail.com",
            "Manager: Rashmi Kulkarni Goswami"
        ],
        "activities": [
            "Swimming Pool",
            "Garden",
            "Music system",
            "Barbeque Stand"
        ],
        "address": "Villa House No. 3515, Chintamani Guli Road Nagaon Road, Survey No. 1922 Nagaon, Alibaug, Maharashtra, India"
    },
    "oneDayTripSection": {
        "title": "Stay Information",
        "time": "Check in 1:00 PM and Check out 11:00 AM",
        "includes": [
            "4BHK private villa stay",
            "Swimming pool access",
            "Complete privacy"
        ],
        "notes": [
            "Ideal for families and groups."
        ]
    },
    "policiesSection": {
        "title": "Policies",
        "accommodation": [
            "4BHK private villa."
        ],
        "cancellation": [
            "Live availability is checked through the API."
        ],
        "dayOuting": [
            "This property is configured as a stay-focused villa listing."
        ],
        "extra": [
            "Nearby references: Nagaon Beach 1.8 km."
        ]
    },
    "booking": {
        "basePrice": 25000,
        "availability": "Available Now",
        "checkIn": "Mar 16, 2026",
        "checkOut": "Mar 17, 2026",
        "guests": [
            "1 Guest",
            "5 Guests",
            "10 Guests"
        ],
        "availabilityApiUrl": "https://api.thehotelmate.co/api/thm/checkAvailability/3268",
        "couponHint": "SHALOM10",
        "couponDiscount": 500,
        "secureLabel": "Secure Booking"
    }
  },
  "pool-and-pause": {
    "slug": "pool-and-pause",
    "title": "Pool And Pause",
    "location": "Villa House No. 3514 Chintamani Guli Road Nagaon Road, Survey No. 1922, Nagaon, Alibaug, Maharashtra, India",
    "ratingLabel": "New Property",
    "typeBadge": "Villa",
    "description": "Welcome to Pool And Pause, a serene retreat in the coastal paradise of Alibaug. Surrounded by swaying palms and refreshing sea breezes, our property offers the perfect blend of comfort, tranquility, and warm hospitality.",
    "tags": [
        "#Alibaug",
        "#Villa_Stay",
        "#Swimming_Pool"
    ],
    "images": [
        "https://bookonelocal.in/cdn/2025-11-18-092550308-38.png",
        "https://bookonelocal.in/cdn/2025-11-18-092554496-2.png",
        "https://bookonelocal.in/cdn/2025-11-18-092559036-1.png",
        "https://bookonelocal.in/cdn/2025-11-18-092607937-60.png",
        "https://bookonelocal.in/cdn/2025-11-18-092611161-61.png"
    ],
    "amenities": [
        {
            "icon": "droplets",
            "label": "Swimming Pool"
        },
        {
            "icon": "car",
            "label": "Free Hotel Parking"
        },
        {
            "icon": "wind",
            "label": "Air conditioning"
        },
        {
            "icon": "wifi",
            "label": "Free WiFi"
        },
        {
            "icon": "monitor",
            "label": "Flat screen TV"
        }
    ],
    "rooms": [
        {
            "id": 7806,
            "name": "5 BHK Villa",
            "size": "Entire Villa",
            "bed": "5 Bedrooms",
            "view": "Pool View",
            "price": 25000,
            "image": "https://bookonelocal.in/cdn/2025-11-18-092849502-30.png",
            "features": [
                "AC bedrooms",
                "Attached washrooms",
                "Living area",
                "Outdoor sit-out",
                "Dining space",
                "Caretaker support"
            ],
            "available": "1",
            "description": "A spacious private villa ideal for families and groups, featuring AC bedrooms, attached washrooms, living area, outdoor sit-out, dining space, caretaker support, 25KV genset backup, free WiFi, and all essentials for a comfortable stay.",
            "planNote": "Minimum Occupancy: 20, Maximum Occupancy: 25"
        }
    ],
    "packages": [],
    "appPromo": {
        "badge": "Alibaug Retreat",
        "title": "Scenic Villa Stay",
        "description": "Plan a scenic stay with a 5 BHK private villa and swimming pool access in Alibaug.",
        "image": siteImages.conciergeApp
    },
    "reviews": [],
    "propertyDetailsSection": {
        "title": "Property Details",
        "lines": [
            "Property ID: 3270",
            "Located in Alibaug",
            "5 BHK private villa",
            "Swimming pool with deck",
            "Caretaker support and 25KV genset backup",
            "Contact: 7666478855",
            "Email: poolpause.bytripdip@gmail.com",
            "Manager: Rashmi Kulkarni"
        ],
        "activities": [
            "Swimming Pool",
            "Garden",
            "Music system",
            "Barbeque Stand"
        ],
        "address": "Villa House No. 3514 Chintamani Guli Road Nagaon Road, Survey No. 1922, Nagaon, Alibaug, Maharashtra, India"
    },
    "oneDayTripSection": {
        "title": "Stay Information",
        "time": "Check in 1:00 PM and Check out 11:00 AM",
        "includes": [
            "5 BHK private villa stay",
            "Swimming pool access",
            "Complete privacy"
        ],
        "notes": [
            "Ideal for leisure and relaxation."
        ]
    },
    "policiesSection": {
        "title": "Policies",
        "accommodation": [
            "5 BHK private villa accommodating larger gatherings with ease."
        ],
        "cancellation": [
            "Live availability is checked through the API."
        ],
        "dayOuting": [
            "This property is configured as a stay-focused villa listing."
        ],
        "extra": [
            "Nearby references: Nagaon Beach 1 km, Kolaba Fort 9 km, Alibaug Beach 10 km."
        ]
    },
    "booking": {
        "basePrice": 25000,
        "availability": "Available Now",
        "checkIn": "Mar 16, 2026",
        "checkOut": "Mar 17, 2026",
        "guests": [
            "5 Guests",
            "10 Guests",
            "20 Guests"
        ],
        "availabilityApiUrl": "https://api.thehotelmate.co/api/thm/checkAvailability/3270",
        "couponHint": "POOLPAUSE10",
        "couponDiscount": 500,
        "secureLabel": "Secure Booking"
    }
  }
};

export const propertyDetailsData = propertyDetailsBySlug["vishals-orchard-resort"];
export const propertySlugs = Object.keys(propertyDetailsBySlug);


