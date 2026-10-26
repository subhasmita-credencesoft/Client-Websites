export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Stay", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Banquets & Meetings", href: "/banquets" },
  { label: "Nearby", href: "/nearby-locations" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

export const secondaryNav: NavItem[] = [
  { label: "Nearby Locations", href: "/nearby-locations" },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export const footerGroups: { title: string; links: NavItem[] }[] = [
  {
    title: "Stay",
    links: [
      { label: "Rooms & Suites", href: "/rooms" },
      { label: "Book Online", href: "https://bookone.io/Hotel-The-Taksonz?bookingEngine=true" },
      { label: "Location & Directions", href: "/location" },
      { label: "Nearby Locations", href: "/nearby-locations" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Dining & Bar", href: "/dining" },
      { label: "Banquets & Meetings", href: "/banquets" },
      { label: "Nearby Locations", href: "/nearby-locations" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Hotel",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
];

/** Routes that open with a full-bleed hero (header starts transparent). */
export const heroRoutes = [
  "/",
  "/rooms",
  "/dining",
  "/banquets",
  "/meetings",
  "/nearby-locations",
  "/nearby",
  "/about",
  "/gallery",
  "/location",
  "/contact",
  "/offers",
];
