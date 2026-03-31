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
    description: "A comfortable premium stay option for wedding guests who value ease, warmth, and convenience.",
    tariff: "Room Tariff Rs. 5,000/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 3,000/-",
    image: "/images/DSC08717.avif",
  },
  {
    title: "Cliff Room",
    description: "A scenic room experience with a more elevated destination feel, ideal for close family or premium guest hosting.",
    tariff: "Room Tariff Rs. 6,500/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 3,500/-",
    image: "/images/DSC08769.avif",
  },
  {
    title: "Family Room",
    description: "A spacious stay option designed for group comfort during multi-function family celebrations.",
    tariff: "Room Tariff Rs. 20,000/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 2,500/-",
    image: "/images/DSC08812.avif",
  },
];

export const stayCardsSecondary = [
  {
    title: "Glass Cottage",
    description: "A private cottage stay with a distinctive premium atmosphere for special guests or hosted family stays.",
    tariff: "Room Tariff Rs. 12,000/-",
    packagePrice: "Per Person Package (Stay + All Meals) Rs. 7,500/-",
    image: "/images/DSC08802.avif",
  },
  {
    title: "Bungalow",
    description: "A larger-format stay suited for hosts, key family members, and wedding weekends that need more private space.",
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
    subtitle: "Monday to Thursday pricing for better bundled value",
    description: "Classic ₹4,500, Signature ₹5,500, and Premium Luxe ₹6,500 per person per day with stay, meals, services, lawn access, and venue usage.",
    image: "/images/DSC08846.avif",
    tabs: ["WEEKDAY"],
  },
  {
    title: "Weekend Package",
    subtitle: "Friday to Sunday pricing for celebration weekends",
    description: "Classic ₹5,500, Signature ₹6,500, and Premium Luxe ₹7,500 per person per day with stay, meals, services, lawn access, and venue usage.",
    image: "/images/DSC08849.avif",
    tabs: ["WEEKEND"],
  },
] as const;

export const splitFeatures = [
  {
    id: "weddings",
    title: "Venue Highlights",
    description:
      "7 acres of lush greenery, scenic mountain surroundings, spacious lawns, and dedicated areas for Haldi, Mehendi, Sangeet, Cocktail, and Reception.",
    cta: "DISCOVER WEDDINGS",
    href: "/wedding-lawns",
    image: "/images/DSC08831.avif",
  },
  {
    id: "corporates",
    title: "Key Advantages",
    description:
      "Unlimited Music Hours, 24×7 Pool Access, Zero Sound License Required, Full Venue Access, and a private estate designed for complete celebration flow.",
    cta: "DISCOVER MORE",
    href: "/key-advantages",
    image: "/images/DSC08849.avif",
  },
  {
    id: "adventure",
    title: "Rules & Regulations",
    description:
      "Government ID is mandatory for staying guests, outside catering is not allowed in package bookings, and decorators or vendors require prior approval.",
    cta: "LEARN MORE",
    href: "/rules",
    image: "/images/DSC08837.avif",
  },
  {
    id: "entertainment",
    title: "Check-In / Payment Terms",
    description:
      "Check-in is 2:00 PM, check-out is 11:00 AM, 50% advance is required to block dates, and final package billing is based on confirmed headcount.",
    cta: "DISCOVER MORE",
    href: "/check-in",
    image: "/images/DSC08846.avif",
  },
  {
    id: "spa",
    title: "Final Quotation Summary",
    description:
      "Event type, selected package, dates, guest count, weekday or weekend selection, and total stay required shape the final package estimate.",
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
    title: "Advance & Booking Terms",
    subtitle: "50% advance to block dates, remaining 50% before check-in, with rescheduling subject to availability",
    image:
      "/images/DSC08807.avif",
  },
  {
    title: "Rules & Regulations",
    subtitle: "Guest ID mandatory, outside catering not allowed, and vendors require prior approval",
    image:
      "/images/DSC08812.avif",
  },
  {
    title: "Check-In / Payment Terms",
    subtitle: "Packages are based on final headcount, check-in is 2:00 PM, and check-out is 11:00 AM",
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
    { label: "+91 9892011179", href: "tel:+919892011179" },
    { label: "instagram.com/themountain.karjat", href: "https://instagram.com/themountain.karjat", external: true },
    { label: "themountainresorts.com", href: "https://www.themountainresorts.com", external: true },
    {
      label: "The Mountain, Karjat",
      href: "https://maps.google.com/?q=The+Mountain+Karjat",
      external: true,
    },
    { label: "Wedding Enquiries", href: "/contact" },
  ],
];
