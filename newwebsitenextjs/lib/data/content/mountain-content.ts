export const topLeftLinks = ["ABOUT US", "GALLERY", "MEDIA & AWARDS"];
export const topRightLinks: string[] = [];
export const mainLinks = [
  "PACKAGES & OFFERS",
  "STAY DETAILS",
  "VENUE HIGHLIGHTS",
  "KEY ADVANTAGES",
  "RULES",
  "CHECK-IN",
  "QUOTATION",
  "CONTACT",
];

export const headerDropdowns: Record<string, string[]> = {
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
  "STAY DETAILS": [
    { label: "Standard Room", href: "/standard-room" },
    { label: "Cliff Room", href: "/cliff-room" },
    { label: "Family Room", href: "/family-room" },
    { label: "Glass Cottage", href: "/glass-cottage" },
    { label: "Bungalow", href: "/bungalow" },
  ],
  "VENUE HIGHLIGHTS": [
    { label: "Mountain View Destination", href: "/mountain-view-destination" },
    { label: "Private Event Spaces", href: "/private-event-spaces" },
    { label: "Wedding Lawns", href: "/wedding-lawns" },
    { label: "Poolside Celebrations", href: "/poolside-celebrations" },
  ],
};

export const mainNavLinks: Record<string, string> = {
  "PACKAGES & OFFERS": "/offers",
  "STAY DETAILS": "/cliff-room",
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
      "/images/DSC08831.avif",
  },
  {
    title: "Hi-Tea",
    image:
      "/images/DSC08837.avif",
  },
  {
    title: "Starters",
    image:
      "/images/DSC08846.avif",
  },
  {
    title: "Dinner",
    image:
      "/images/DSC08853.avif",
  },
  {
    title: "Breakfast",
    image:
      "/images/DSC08717.avif",
  },
  {
    title: "Venue Access",
    image:
      "/images/DSC08720.avif",
  },
  {
    title: "Live Counters",
    image:
      "/images/DSC08758.avif",
  },
  {
    title: "Wedding Hospitality",
    image:
      "/images/DSC08759.avif",
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
    image: "/images/DSC08831.avif",
  },
  {
    id: "corporates",
    title: "Key Advantages",
    description:
      "Unlimited music hours, full venue access, private estate control, 24x7 pool access, and spaces tailored for all wedding functions.",
    cta: "DISCOVER MORE",
    href: "/key-advantages",
    image: "/images/DSC08849.avif",
  },
  {
    id: "adventure",
    title: "Rules & Regulations",
    description:
      "Government ID mandatory for guests, outside catering not allowed in packages, vendors need prior approval, and property limits must be respected.",
    cta: "LEARN MORE",
    href: "/rules",
    image: "/images/DSC08837.avif",
  },
  {
    id: "entertainment",
    title: "Check-In / Payment Terms",
    description:
      "Check-in at 2 PM, check-out at 11 AM, 50% advance to block dates, and final package calculations based on the final headcount.",
    cta: "DISCOVER MORE",
    href: "/check-in",
    image: "/images/DSC08846.avif",
  },
  {
    id: "spa",
    title: "Final Quotation Summary",
    description:
      "Selected package, dates, total guests, weekend or weekday booking, and stay duration determine the final package estimate.",
    cta: "DISCOVER MORE",
    href: "/quotation",
    image: "/images/DSC08853.avif",
  },
];

export const townshipCards = [
  {
    title: "Mountain View Lawns",
    city: "KARJAT",
    image:
      "/images/DSC08763.avif",
    metric: "Scenic valley-facing event zone",
    signed: "Ideal for ceremonies and rituals",
  },
  {
    title: "Premium Villas",
    city: "KARJAT",
    image:
      "/images/DSC08769.avif",
    metric: "Private modern furnished stays",
    signed: "Ideal for family accommodation",
  },
  {
    title: "Poolside Experiences",
    city: "KARJAT",
    image:
      "/images/DSC08801.avif",
    metric: "Pool + rain dance zone access",
    signed: "Perfect for cocktails and leisure",
  },
  {
    title: "Wedding Setups",
    city: "KARJAT",
    image:
      "/images/DSC08802.avif",
    metric: "Beautiful destination wedding ambiance",
    signed: "Photography-ready scenic estate",
  },
];

export const awardCards = [
  {
    title: "Key Advantages",
    subtitle: "Unlimited music hours, 24x7 pool access, full venue control",
    image:
      "/images/DSC08807.avif",
  },
  {
    title: "Rules & Regulations",
    subtitle: "Guest ID, vendor approval, no outside catering in package bookings",
    image:
      "/images/DSC08812.avif",
  },
  {
    title: "Check-In / Payment Terms",
    subtitle: "2 PM check-in, 11 AM check-out, 50% advance to block dates",
    image:
      "/images/DSC08820.avif",
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

export type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const footerSections: FooterLinkItem[][] = [
  [
    { label: "The Mountain, Karjat", href: "/" },
    { label: "Quotation & Package Details", href: "/quotation" },
    { label: "Destination Wedding Venue", href: "/wedding-lawns" },
    { label: "Wedding Packages", href: "/offers" },
    { label: "Venue Usage", href: "/private-event-spaces" },
  ],
  [
    { label: "Venue Highlights", href: "/mountain-view-destination" },
    { label: "Stay Details", href: "/cliff-room" },
    { label: "Key Advantages", href: "/key-advantages" },
    { label: "Rules & Regulations", href: "/rules" },
    { label: "Check-In Terms", href: "/check-in" },
    { label: "Quotation Summary", href: "/quotation" },
  ],
  [
    { label: "+91 9833866655", href: "tel:+919833866655" },
    { label: "9892011179", href: "tel:+919892011179" },
    { label: "instagram.com/themountain.karjat", href: "https://instagram.com/themountain.karjat", external: true },
    { label: "www.themountainresorts.com", href: "https://www.themountainresorts.com", external: true },
    {
      label: "The Mountain, Karjat",
      href: "https://maps.google.com/?q=The+Mountain+Karjat",
      external: true,
    },
    { label: "Wedding Enquiries", href: "/contact" },
  ],
];
