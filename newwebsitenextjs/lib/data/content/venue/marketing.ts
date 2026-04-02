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
    subtitle: "Monday to Thursday pricing for better bundled value",
    description: "Classic Rs. 4,500, Signature Rs. 5,500, and Premium Luxe Rs. 6,500 per person per day with stay, meals, services, lawn access, and venue usage.",
    image: "/images/DSC08846.avif",
    tabs: ["WEEKDAY"],
  },
  {
    title: "Weekend Package",
    subtitle: "Friday to Sunday pricing for celebration weekends",
    description: "Classic Rs. 5,500, Signature Rs. 6,500, and Premium Luxe Rs. 7,500 per person per day with stay, meals, services, lawn access, and venue usage.",
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
      "Unlimited Music Hours, 24x7 Pool Access, Zero Sound License Required, Full Venue Access, and a private estate designed for complete celebration flow.",
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
] as const;

export const awardCards = [
  {
    title: "Advance & Booking Terms",
    subtitle: "50% advance to block dates, remaining 50% before check-in, with rescheduling subject to availability",
    image: "/images/DSC08807.avif",
  },
  {
    title: "Rules & Regulations",
    subtitle: "Guest ID mandatory, outside catering not allowed, and vendors require prior approval",
    image: "/images/DSC08812.avif",
  },
  {
    title: "Check-In / Payment Terms",
    subtitle: "Packages are based on final headcount, check-in is 2:00 PM, and check-out is 11:00 AM",
    image: "/images/DSC08820.avif",
  },
] as const;

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
] as const;