export const topLeftLinks = ["ABOUT", "GALLERY", "MEDIA & AWARDS"] as const;
export const topRightLinks: string[] = [];
export const mainLinks = [
  "PACKAGES",
  "STAY",
  "VENUE HIGHLIGHTS",
  "CHECK AVAILABILITY",
  "BOOKING TERMS",
  "CHECK-IN",
  "PLAN YOUR WEDDING",
  "CONTACT",
] as const;

export const headerDropdownLinks: Record<string, Array<{ label: string; href: string }>> = {
  STAY: [
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
  PACKAGES: "/offers",
  STAY: "/cliff-room",
  "VENUE HIGHLIGHTS": "/mountain-view-destination",
  "CHECK AVAILABILITY": "/booking?eventType=Destination%20Wedding",
  "BOOKING TERMS": "/rules",
  "CHECK-IN": "/check-in",
  "PLAN YOUR WEDDING": "/booking?eventType=Destination%20Wedding",
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
    { label: "Plan Your Wedding", href: "/booking?eventType=Destination%20Wedding" },
    { label: "Destination Wedding Venue", href: "/wedding-lawns" },
    { label: "Packages", href: "/offers" },
    { label: "Private Event Spaces", href: "/private-event-spaces" },
  ],
  [
    { label: "Venue Highlights", href: "/mountain-view-destination" },
    { label: "Stay", href: "/cliff-room" },
    { label: "Check Availability", href: "/booking?eventType=Destination%20Wedding" },
    { label: "Booking Terms", href: "/rules" },
    { label: "Check-In", href: "/check-in" },
    { label: "Reserve Your Dates", href: "/booking?eventType=Destination%20Wedding" },
  ],
  [
    { label: "+91 9833866655", href: "tel:+919833866655" },
    { label: "+91 9892011179", href: "tel:+919892011179" },
    { label: "instagram.com/themountain.karjat", href: "https://instagram.com/themountain.karjat", external: true },
    { label: "themountainresorts.com", href: "https://www.themountainresorts.com", external: true },
    { label: "The Mountain, Karjat", href: "https://maps.google.com/?q=The+Mountain+Karjat", external: true },
    { label: "Contact For Wedding And Stay Bookings", href: "/contact" },
  ],
];
