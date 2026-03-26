export const topLeftLinks = ["ABOUT US", "GALLERY", "MEDIA & AWARDS"];
export const topRightLinks: string[] = [];
export const mainLinks = [
  "PACKAGES",
  "STAY DETAILS",
  "VENUE HIGHLIGHTS",
  "KEY ADVANTAGES",
  "RULES",
  "CHECK-IN",
  "QUOTATION",
  "CONTACT",
];

export const headerDropdowns: Record<string, string[]> = {
  PACKAGES: [
    "Classic Package",
    "Signature Package",
    "Premium Luxe Package",
  ],
  "STAY DETAILS": [
    "Standard Room",
    "Cliff Room",
    "Family Room",
    "Glass Cottage",
    "Bungalow",
  ],
  "VENUE HIGHLIGHTS": [
    "Mountain View Destination",
    "Private Event Spaces",
    "Wedding Lawns",
    "Poolside Celebrations",
  ],
};

export const headerDropdownLinks: Record<string, Array<{ label: string; href: string }>> = {
  PACKAGES: [
    { label: "Classic Package", href: "/classic-package" },
    { label: "Signature Package", href: "/signature-package" },
    { label: "Premium Luxe Package", href: "/premium-luxo-package" },
  ],
  "STAY DETAILS": [
    { label: "Standard Room", href: "/garden-villa-resort" },
    { label: "Cliff Room", href: "/luxury-resort" },
    { label: "Family Room", href: "/camp-della-resort-room" },
    { label: "Glass Cottage", href: "/adventure-resort" },
    { label: "Bungalow", href: "/della-enclave-villa-rooms" },
  ],
  "VENUE HIGHLIGHTS": [
    { label: "Mountain View Destination", href: "/mountain-view-destination" },
    { label: "Private Event Spaces", href: "/private-event-spaces" },
    { label: "Wedding Lawns", href: "/wedding-lawns" },
    { label: "Poolside Celebrations", href: "/poolside-celebrations" },
  ],
};

export const mainNavLinks: Record<string, string> = {
  PACKAGES: "/offers",
  "STAY DETAILS": "/luxury-resort",
  "VENUE HIGHLIGHTS": "/mountain-view-destination",
  "KEY ADVANTAGES": "/key-advantages",
  RULES: "/rules",
  "CHECK-IN": "/check-in",
  QUOTATION: "/quotation",
  CONTACT: "/contact",
};

export const stayCardsPrimary = [
  {
    title: "Standard Room",
    description: "Comfortable premium room with modern amenities",
    tariff: "Room Tariff Rs. 5,000/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 3,000/-",
    image: "/images/DSC08717.avif",
  },
  {
    title: "Cliff Room",
    description: "Scenic room option with enhanced privacy",
    tariff: "Room Tariff Rs. 6,500/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 3,500/-",
    image: "/images/DSC08769.avif",
  },
  {
    title: "Family Room",
    description: "Spacious room ideal for families and groups",
    tariff: "Room Tariff Rs. 20,000/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 2,500/-",
    image: "/images/DSC08812.avif",
  },
];

export const stayCardsSecondary = [
  {
    title: "Glass Cottage",
    description: "Private cottage-style stay with calm ambience",
    tariff: "Room Tariff Rs. 12,000/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 7,500/-",
    image: "/images/DSC08802.avif",
  },
  {
    title: "Bungalow",
    description: "Large premium bungalow for longer stays",
    tariff: "Bungalow Tariff Rs. 25,000/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 3,500/-",
    image: "/images/DSC08758.avif",
  },
];

export const gastronomyCards = [
  {
    title: "Lunch",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Hi-Tea",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Starters",
    image:
      "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Dinner",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Venue Access",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Live Counters",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Wedding Hospitality",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1000&q=80",
  },
];

export const offersCards = [
  {
    title: "Weekday Package",
    subtitle: "Monday to Thursday pricing",
    description: "Classic Rs. 4,500, Signature Rs. 5,500, and Premium Luxe Rs. 6,500 per person per day with 5 meals, stay, and venue access.",
    image: "/images/DSC08846.avif",
    tabs: ["WEEKDAY"],
  },
  {
    title: "Weekend Package",
    subtitle: "Friday to Sunday pricing",
    description: "Classic Rs. 5,500, Signature Rs. 6,500, and Premium Luxe Rs. 7,500 per person per day with 5 meals, stay, and venue access.",
    image: "/images/DSC08849.avif",
    tabs: ["WEEKEND"],
  },
  {
    title: "Classic Package",
    subtitle: "5 meals + stay + venue access",
    description: "Includes 5 meals, stay, and venue access as the base package option for destination wedding groups.",
    image: "/images/DSC08846.avif",
    tabs: ["CLASSIC"],
  },
  {
    title: "Signature Package",
    subtitle: "Classic + extra 2 starters + 1 gravy extra each in lunch and dinner",
    description: "Adds extra 2 starters and 1 gravy extra each in lunch and dinner on top of the Classic package for fuller hospitality.",
    image: "/images/DSC08853.avif",
    tabs: ["SIGNATURE"],
  },
  {
    title: "Premium Luxe Package",
    subtitle: "Signature package + 2 live counters",
    description: "Premium package tier with Signature inclusions plus 2 live counters for elevated event dining and guest service.",
    image: "/images/DSC08849.avif",
    tabs: ["PREMIUM LUXE"],
  },
] as const;

export const splitFeatures = [
  {
    id: "weddings",
    title: "Venue Highlights",
    description:
      "7 acres of lush green natural landscape, spacious lawns, scenic mountain surroundings, and dedicated areas for wedding rituals.",
    cta: "DISCOVER WEDDINGS",
    href: "/wedding-lawns",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "corporates",
    title: "Key Advantages",
    description:
      "Unlimited music hours, full venue access, private estate control, 24x7 pool access, and spaces tailored for all wedding functions.",
    cta: "DISCOVER MORE",
    href: "/key-advantages",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "adventure",
    title: "Rules & Regulations",
    description:
      "Government ID mandatory for guests, outside catering not allowed in packages, vendors need prior approval, and property limits must be respected.",
    cta: "LEARN MORE",
    href: "/rules",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "entertainment",
    title: "Check-In / Payment Terms",
    description:
      "Check-in at 2 PM, check-out at 11 AM, 50% advance to block dates, and final package calculations based on the final headcount.",
    cta: "DISCOVER MORE",
    href: "/check-in",
    image:
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "spa",
    title: "Final Quotation Summary",
    description:
      "Selected package, dates, total guests, weekend or weekday booking, and stay duration determine the final package estimate.",
    cta: "DISCOVER MORE",
    href: "/quotation",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80",
  },
];

export const townshipCards = [
  {
    title: "Mountain View Lawns",
    city: "KARJAT",
    image:
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=1200&q=80",
    metric: "Scenic valley-facing event zone",
    signed: "Ideal for ceremonies and rituals",
  },
  {
    title: "Premium Villas",
    city: "KARJAT",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    metric: "Private modern furnished stays",
    signed: "Ideal for family accommodation",
  },
  {
    title: "Poolside Experiences",
    city: "KARJAT",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    metric: "Pool + rain dance zone access",
    signed: "Perfect for cocktails and leisure",
  },
  {
    title: "Wedding Setups",
    city: "KARJAT",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    metric: "Beautiful destination wedding ambiance",
    signed: "Photography-ready scenic estate",
  },
];

export const awardCards = [
  {
    title: "Key Advantages",
    subtitle: "Unlimited music hours, 24x7 pool access, full venue control",
    image:
      "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rules & Regulations",
    subtitle: "Guest ID, vendor approval, no outside catering in package bookings",
    image:
      "https://images.unsplash.com/photo-1578808534343-171f6908071a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Check-In / Payment Terms",
    subtitle: "2 PM check-in, 11 AM check-out, 50% advance to block dates",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=900&q=80",
  },
];

export const brandLogos = [
  "7 Acres Green Beauty",
  "Destination Wedding Venue",
  "Private Estate Access",
  "Scenic Mountain Views",
  "Spacious Lawns",
  "Stay + Meals Included",
  "Venue Access Included",
  "Custom Wedding Setup",
  "Pool + Rain Dance Zone",
  "Complete Hospitality",
];

export const footerColumns = [
  ["The Mountain, Karjat", "Quotation & Package Details", "Destination Wedding Venue", "Wedding Packages", "Venue Usage"],
  [
    "Classic Package",
    "Signature Package",
    "Premium Luxe Package",
    "Meals Includes",
  ],
  ["Venue Highlights", "Stay Details", "Key Advantages", "Rules & Regulations", "Check-In Terms", "Quotation Summary"],
  [
    "+91 9833866655",
    "9892011179",
    "instagram.com/themountain.karjat",
    "www.themountainresorts.com",
    "The Mountain, Karjat",
    "Wedding Enquiries",
  ],
];
