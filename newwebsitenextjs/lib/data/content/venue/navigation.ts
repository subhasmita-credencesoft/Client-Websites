export const topLeftLinks = ["ABOUT US", "GALLERY", "MEDIA & AWARDS"] as const;
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
] as const;

export const headerDropdowns: Record<string, string[]> = {
  "STAY DETAILS": ["Standard Room", "Cliff Room", "Family Room", "Glass Cottage", "Bungalow"],
  "VENUE HIGHLIGHTS": ["Mountain View Destination", "Private Event Spaces", "Wedding Lawns", "Poolside Celebrations"],
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
    { label: "The Mountain, Karjat", href: "https://maps.google.com/?q=The+Mountain+Karjat", external: true },
    { label: "Wedding Enquiries", href: "/contact" },
  ],
];