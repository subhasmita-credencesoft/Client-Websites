export const gastronomyCards = [
  { title: "Lunch", image: "/images/DSC08831.avif" },
  { title: "Hi-Tea", image: "/images/DSC08837.avif" },
  { title: "Starters", image: "/images/DSC08846.avif" },
  { title: "Dinner", image: "/images/DSC08853.avif" },
  { title: "Breakfast", image: "/images/DSC08717.avif" },
  { title: "Venue Access", image: "/images/DSC08720.avif" },
  { title: "Live Counters", image: "/images/DSC08758.avif" },
  { title: "Wedding Hospitality", image: "/images/DSC08759.avif" },
] as const;

export const offersCards = [
  {
    title: "Weekday Package",
    subtitle: "Monday to Thursday pricing for refined hosting with stronger bundled value",
    description: "Classic Rs. 4,500, Signature Rs. 5,500, and Premium Luxe Rs. 6,500 per person per day with stay, meals, venue access, and wedding-ready hospitality.",
    image: "/images/DSC08846.avif",
    tabs: ["WEEKDAY"],
  },
  {
    title: "Weekend Package",
    subtitle: "Friday to Sunday pricing for destination-style celebration weekends",
    description: "Classic Rs. 5,500, Signature Rs. 6,500, and Premium Luxe Rs. 7,500 per person per day with stay, meals, venue access, and elevated guest hosting.",
    image: "/images/DSC08849.avif",
    tabs: ["WEEKEND"],
  },
] as const;

export const splitFeatures = [
  {
    id: "weddings",
    title: "Venue Highlights",
    description:
      "7 acres of greenery, scenic mountain surroundings, spacious lawns, and dedicated zones for Haldi, Mehendi, Sangeet, Cocktail Night, and Reception.",
    cta: "EXPLORE VENUES",
    href: "/wedding-lawns",
    image: "/images/DSC08831.avif",
  },
  {
    id: "corporates",
    title: "Key Advantages",
    description:
      "Private-estate exclusivity, multi-function celebration flow, premium guest stays, and destination charm designed for weddings and hosted weekends.",
    cta: "VIEW ADVANTAGES",
    href: "/key-advantages",
    image: "/images/DSC08849.avif",
  },
  {
    id: "adventure",
    title: "Booking Rules",
    description:
      "Government ID is mandatory for staying guests, outside catering is not allowed in package bookings, and decorators or vendors require prior approval.",
    cta: "VIEW DETAILS",
    href: "/rules",
    image: "/images/DSC08837.avif",
  },
  {
    id: "entertainment",
    title: "Check-In / Payment Terms",
    description:
      "Check-in is 2:00 PM, check-out is 11:00 AM, 50% advance is required to block dates, and final billing follows confirmed headcount.",
    cta: "CHECK TERMS",
    href: "/check-in",
    image: "/images/DSC08846.avif",
  },
  {
    id: "spa",
    title: "Availability & Proposal Summary",
    description:
      "Event type, selected package, preferred dates, guest count, weekday or weekend selection, and total stay requirement shape the final quotation.",
    cta: "CHECK AVAILABILITY",
    href: "/quotation",
    image: "/images/DSC08853.avif",
  },
] as const;

export const awardCards = [
  {
    title: "Advance & Booking Terms",
    subtitle: "50% advance to block dates, remaining payment before check-in, with rescheduling subject to availability",
    image: "/images/DSC08807.avif",
  },
  {
    title: "Booking Rules",
    subtitle: "Guest ID is mandatory, outside catering is not allowed, and vendors require prior approval",
    image: "/images/DSC08812.avif",
  },
  {
    title: "Check-In / Payment Terms",
    subtitle: "Packages follow final headcount, check-in is 2:00 PM, and check-out is 11:00 AM",
    image: "/images/DSC08820.avif",
  },
] as const;

export const brandLogos = [
  "Exclusive Estate Bookings",
  "Destination Wedding Venue",
  "7 Acres Of Greenery",
  "Scenic Mountain Views",
  "Multi-Event Wedding Spaces",
  "Premium Stay Options",
  "Stay + Meals Packages",
  "Wedding-Ready Hospitality",
  "Celebration Weekend Flow",
  "Guest-Friendly Booking Support",
] as const;
