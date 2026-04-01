export const topLeftLinks = ["ABOUT US", "GALLERY", "MEDIA & AWARDS"];
export const topRightLinks: string[] = [];
export const mainLinks = [
  "ROOM TYPES",
  "HOTEL SERVICES",
  "PROPERTY HIGHLIGHTS",
  "WHY STAY",
  "TERMS",
  "CHECK-IN",
  "BOOKING",
  "CONTACT",
];

export const headerDropdowns: Record<string, string[]> = {
  "ROOM TYPES": [
    "Standard Room",
    "Deluxe Room",
    "Luxury Room",
    "Supreme Room",
    "Maharaja Suite Room",
  ],
  "HOTEL SERVICES": [
    "Free WiFi",
    "Free Hotel Parking",
    "24-hour Room Service",
    "Housekeeping",
  ],
};

export const headerDropdownLinks: Record<string, Array<{ label: string; href: string }>> = {
  "ROOM TYPES": [
    { label: "Standard Room", href: "/standard-room" },
    { label: "Deluxe Room", href: "/family-room" },
    { label: "Luxury Room", href: "/cliff-room" },
    { label: "Supreme Room", href: "/glass-cottage" },
    { label: "Maharaja Suite Room", href: "/bungalow" },
  ],
  "HOTEL SERVICES": [
    { label: "Free WiFi", href: "/key-advantages" },
    { label: "Free Hotel Parking", href: "/key-advantages" },
    { label: "24-hour Room Service", href: "/key-advantages" },
    { label: "Housekeeping", href: "/key-advantages" },
  ],
};

export const mainNavLinks: Record<string, string> = {
  "ROOM TYPES": "/standard-room",
  "HOTEL SERVICES": "/key-advantages",
  "PROPERTY HIGHLIGHTS": "/mountain-view-destination",
  "WHY STAY": "/private-event-spaces",
  TERMS: "/rules",
  "CHECK-IN": "/check-in",
  BOOKING: "/booking",
  CONTACT: "/contact",
};

export const stayCardsPrimary = [
  {
    title: "Standard Room",
    description: "A budget-friendly room category for solo travellers and couples who want a comfortable Panvel stay with essential hotel amenities.",
    tariff: "Room Tariff Rs. 2,750/-",
    packagePrice: "Air-conditioning, Wi-Fi, room service support",
    image: "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg",
  },
  {
    title: "Deluxe Room",
    description: "A cozy and comfortable room with soft interiors and a practical layout for relaxed city stays.",
    tariff: "Room Tariff Rs. 3,300/-",
    packagePrice: "Modern furnishing, room service, comfortable stay",
    image: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
  },
  {
    title: "Luxury Room",
    description: "A stronger premium option for guests who want more polished room comfort for work or leisure stays.",
    tariff: "Room Tariff Rs. 3,850/-",
    packagePrice: "Premium comfort, Wi-Fi, room service",
    image: "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg",
  },
];

export const stayCardsSecondary = [
  {
    title: "Supreme Room",
    description: "A stylish room category offering a refined stay atmosphere with improved comfort and hotel convenience.",
    tariff: "Room Tariff Rs. 6,050/-",
    packagePrice: "Premium room design with stronger amenity mix",
    image: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
  },
  {
    title: "Maharaja Suite Room",
    description: "The top-category suite stay at Hotel Redwings Castle, designed for guests who want spacious luxury and elegant room styling.",
    tariff: "Room Tariff Rs. 8,250/-",
    packagePrice: "Suite-style comfort for premium stays",
    image: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
  },
];

export const gastronomyCards = [
  {
    title: "Free WiFi",
    image: "https://bookonelocal.in/cdn/2025-06-24-092820440-5.jpg",
  },
  {
    title: "Free Hotel Parking",
    image: "https://bookonelocal.in/cdn/2025-06-24-092828011-2.jpg",
  },
  {
    title: "Air Conditioning",
    image: "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg",
  },
  {
    title: "24-hour Room Service",
    image: "https://bookonelocal.in/cdn/2025-06-24-092831095-3.jpg",
  },
  {
    title: "Housekeeping",
    image: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
  },
  {
    title: "Power Backup",
    image: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
  },
  {
    title: "Luggage Storage",
    image: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
  },
  {
    title: "Doctor on Call",
    image: "https://bookonelocal.in/cdn/2025-06-24-095145740-23.jpg",
  },
];

export const offersCards = [
  {
    title: "Value Stays",
    subtitle: "Comfort-first room choices for budget-conscious and short-stay guests",
    description: "Standard Room and Deluxe Room categories offer a practical Panvel stay with hotel essentials and dependable comfort.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg",
    tabs: ["FEATURED"],
  },
  {
    title: "Premium Stays",
    subtitle: "Elevated room options for guests who want more polish and space",
    description: "Luxury Room, Supreme Room, and Maharaja Suite Room create stronger comfort tiers for business, leisure, and premium city stays.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
    tabs: ["PREMIUM"],
  },
] as const;

export const splitFeatures = [
  {
    id: "rooms",
    title: "Room Categories",
    description:
      "Five stay options from Standard Room to Maharaja Suite Room make it easier for every guest to find the right fit.",
    cta: "EXPLORE ROOMS",
    href: "/standard-room",
    image: "https://bookonelocal.in/cdn/2025-06-24-094939625-29.jpg",
  },
  {
    id: "services",
    title: "Hotel Services",
    description:
      "Wi-Fi, parking, room service, housekeeping, power backup, and luggage support help the stay feel smoother from arrival to departure.",
    cta: "VIEW SERVICES",
    href: "/key-advantages",
    image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
  },
  {
    id: "location",
    title: "Panvel Accessibility",
    description:
      "Near Orion Mall, New Panvel Bridge, Panvel station, and the Mumbai Pune Expressway, the hotel works well for city movement and travel convenience.",
    cta: "LEARN MORE",
    href: "/mountain-view-destination",
    image: "https://bookonelocal.in/cdn/2025-06-24-092853092-22.jpg",
  },
  {
    id: "terms",
    title: "Check-In & Policies",
    description:
      "Important stay notes, booking guidance, and arrival clarity help guests prepare better before reaching the hotel.",
    cta: "VIEW TERMS",
    href: "/check-in",
    image: "https://bookonelocal.in/cdn/2025-06-24-095124999-4.jpg",
  },
  {
    id: "contact",
    title: "Booking Assistance",
    description:
      "Connect with the hotel team directly for stay planning, room availability, and booking support through phone, WhatsApp, or enquiry.",
    cta: "CONTACT HOTEL",
    href: "/contact",
    image: "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
  },
];

export const townshipCards = [
  {
    title: "Maharaja Suite Room",
    city: "PANVEL",
    image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
    metric: "Elegant suite-style stay",
    signed: "Ideal for premium guests",
  },
  {
    title: "Supreme Room",
    city: "PANVEL",
    image: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
    metric: "Comfortable upgraded room",
    signed: "Ideal for refined stays",
  },
  {
    title: "Luxury Room",
    city: "PANVEL",
    image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
    metric: "Premium room comfort",
    signed: "Good for business or leisure",
  },
  {
    title: "Deluxe Room",
    city: "PANVEL",
    image: "https://bookonelocal.in/cdn/2025-06-24-094807016-15.jpg",
    metric: "Cozy modern stay option",
    signed: "Balanced comfort and value",
  },
];

export const awardCards = [
  {
    title: "Room Variety",
    subtitle: "Five room categories help guests choose the right stay based on comfort level and budget.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095108957-15.jpg",
  },
  {
    title: "Useful Hotel Amenities",
    subtitle: "Wi-Fi, room service, parking, housekeeping, and power backup support day-to-day guest comfort.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092834179-1.jpg",
  },
  {
    title: "Panvel Location Advantage",
    subtitle: "Close to rail, road, and city access points for easier movement across Panvel and beyond.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
  },
];

export const brandLogos = [
  "Panvel Location",
  "5 Room Categories",
  "Wi-Fi Access",
  "Room Service",
  "Free Hotel Parking",
  "Housekeeping",
  "Power Backup",
  "Doctor on Call",
  "Luggage Storage",
  "Comfortable Premium Stay",
];

export type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const footerSections: FooterLinkItem[][] = [
  [
    { label: "Hotel Redwings Castle", href: "/" },
    { label: "Room Types", href: "/standard-room" },
    { label: "Hotel Services", href: "/key-advantages" },
    { label: "Gallery", href: "/gallery" },
    { label: "Booking Support", href: "/booking" },
  ],
  [
    { label: "About The Hotel", href: "/about" },
    { label: "Property Highlights", href: "/mountain-view-destination" },
    { label: "Check-In Details", href: "/check-in" },
    { label: "Terms & Policies", href: "/rules" },
    { label: "Contact", href: "/contact" },
  ],
  [
    { label: "+91 9930022229", href: "tel:+919930022229" },
    { label: "WhatsApp Booking", href: "https://wa.me/919930022229", external: true },
    { label: "info@redwingscatlegmailcom", href: "mailto:info@redwingscatlegmailcom" },
    { label: "Panvel, Maharashtra", href: "https://maps.google.com/?q=Hotel+Redwings+Castle+Panvel", external: true },
    { label: "Room Enquiries", href: "/contact" },
  ],
];
