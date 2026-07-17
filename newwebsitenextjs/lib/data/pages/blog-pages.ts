export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  publishDate: string;
  category: string;
  content: Array<{
    heading?: string;
    body: string;
  }>;
  relatedLinks: Array<{ label: string; href: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "destination-wedding-checklist-karjat",
    title: "Complete Destination Wedding Checklist for Karjat",
    excerpt:
      "A practical planning guide for couples booking a destination wedding at The Mountain Resort in Karjat, covering dates, packages, vendor coordination, and guest travel.",
    heroImage: "https://bookonelocal.in/cdn/DSC08846.avif",
    publishDate: "2026-07-01",
    category: "Wedding Planning",
    content: [
      {
        heading: "Why Karjat is an excellent choice for your destination wedding",
        body: "Karjat combines natural mountain beauty, cooler climate, and easy accessibility from Mumbai and Pune, making it one of the most practical destination wedding locations in Maharashtra. For couples who want a scenic celebration without the logistical challenges of more remote hill stations, Karjat offers the perfect balance of destination atmosphere and guest convenience.",
      },
      {
        heading: "Start with your dates and guest count",
        body: "The first step in any destination wedding plan is locking your preferred dates and estimating your guest count. Weekday weddings at The Mountain offer stronger value with Classic packages starting at Rs. 4,500 per person, while weekend celebrations begin at Rs. 5,500 per person. Early booking ensures better date availability, especially during peak wedding season.",
      },
      {
        heading: "Choose the right package tier",
        body: "The Mountain offers three package tiers: Classic, Signature, and Premium Luxe. Classic includes stay, five meals, and venue access. Signature adds two extra starters and an additional gravy in lunch and dinner. Premium Luxe includes everything in Signature plus two live cooking counters. Choose based on your hosting style, guest expectations, and celebration scale.",
      },
      {
        heading: "Plan your wedding function flow",
        body: "The Mountain has dedicated spaces for Haldi, Mehendi, Sangeet, Cocktail Night, wedding ceremonies, and receptions. Work with the event team to map each function to the appropriate venue zone, plan decor themes, and create a timeline that gives guests comfortable movement between celebrations without feeling rushed.",
      },
      {
        heading: "Coordinate guest travel and accommodation",
        body: "With five room categories from Standard Rooms to a private Bungalow, The Mountain can accommodate wedding guests, host families, and premium visitors on-site. Share Google Maps navigation with the venue name to help guests arriving from Mumbai (approximately 2 to 3 hours), Pune (approximately 2 to 2.5 hours), and other cities.",
      },
      {
        heading: "Confirm vendor arrangements",
        body: "Decorators, photographers, and other external vendors require prior venue approval at The Mountain. Coordinate early with the event team to ensure smooth vendor onboarding, setup timing, and integration with the overall celebration timeline.",
      },
    ],
    relatedLinks: [
      { label: "View Wedding Packages", href: "/offers" },
      { label: "Get Wedding Proposal", href: "/quotation" },
      { label: "Explore Venue Spaces", href: "/wedding-lawns" },
    ],
  },
  {
    slug: "weekend-getaway-guide-karjat",
    title: "Your Weekend Getaway Guide to Karjat",
    excerpt:
      "Everything you need to know about planning a short mountain break at The Mountain Resort, from travel tips to room selection and dining highlights.",
    heroImage: "https://bookonelocal.in/cdn/DSC08853.avif",
    publishDate: "2026-06-15",
    category: "Travel & Leisure",
    content: [
      {
        heading: "Why Karjat makes the perfect short-break destination",
        body: "Located just 2 to 3 hours from Mumbai and 2 to 2.5 hours from Pune, Karjat offers a genuine mountain escape without the long travel times associated with more distant hill stations. The cooler climate, green landscapes, and calm atmosphere create a refreshing change from city life.",
      },
      {
        heading: "What to expect at The Mountain Resort",
        body: "The Mountain Resort in Karjat, By Redwings is a 7-acre private estate with luxury room categories, five daily meals included in stay packages, 24x7 pool access, and scenic mountain views. The private-estate model means you enjoy exclusivity, comfort, and a genuinely resort-like experience rather than a basic room booking.",
      },
      {
        heading: "Room options for weekend stays",
        body: "Choose from Standard Rooms for couples seeking comfort, Cliff View Rooms for a scenic upgrade, Family Rooms for group stays, Glass Jacuzzi Rooms for a special occasion, or the private Bungalow for larger family groups. Stay-and-meals packages start at Rs. 3,000 per person, making it an affordable luxury escape.",
      },
      {
        heading: "Dining during your stay",
        body: "Every package includes five curated meals: lunch, hi-tea, starters, dinner, and breakfast. The Signature and Premium Luxe tiers offer expanded dining with additional starters, gravies, and live cooking counters. With all meals on-site, you can focus entirely on relaxing and enjoying the mountain atmosphere.",
      },
      {
        heading: "Making the most of your weekend",
        body: "Spend your mornings with mountain views, enjoy 24x7 pool access during the day, explore the scenic estate grounds, and unwind with curated dining in the evening. The private-estate atmosphere means no crowds, no noise, and a genuinely peaceful mountain experience.",
      },
    ],
    relatedLinks: [
      { label: "Book Weekend Stay", href: "/booking" },
      { label: "View Room Categories", href: "/cliff-room" },
      { label: "Explore Packages", href: "/offers" },
    ],
  },
  {
    slug: "why-private-estate-weddings-beat-hotels",
    title: "Why Private Estate Weddings Beat Hotel Venues",
    excerpt:
      "Discover why more couples are choosing private-estate venues like The Mountain Resort over conventional hotel wedding spaces for their destination celebrations.",
    heroImage: "https://bookonelocal.in/cdn/DSC08831.avif",
    publishDate: "2026-06-01",
    category: "Wedding Insights",
    content: [
      {
        heading: "The difference between a hotel venue and a private estate",
        body: "Hotel venues often share space with regular guests, have time restrictions on music and events, and require coordination with other bookings happening simultaneously. A private estate like The Mountain Resort gives you exclusive control of the entire property, meaning every space, every moment, and every detail belongs to your celebration alone.",
      },
      {
        heading: "Full-estate exclusivity transforms the wedding experience",
        body: "When you book The Mountain, the entire 7-acre estate is yours. No shared lobbies, no overlapping events, no stranger noise bleeding into your sangeet. Guests move freely between rooms, dining areas, celebration zones, and poolside spaces with a sense of privacy and belonging that hotels rarely deliver.",
      },
      {
        heading: "Multiple celebration zones in one connected property",
        body: "Private estates naturally support multi-function wedding itineraries. At The Mountain, Haldi happens on one lawn, Mehendi in another zone, Sangeet in the evening setting, Cocktail Night poolside, and the wedding ceremony in its own scenic space. Each function feels distinct while remaining part of one seamless celebration.",
      },
      {
        heading: "No sound restrictions, no license headaches",
        body: "Many hotel venues impose music curfews and require separate sound licenses for events. The Mountain offers unlimited music hours with zero sound license requirement, giving your celebration the freedom to flow naturally from afternoon rituals to late-night dancing without interruption.",
      },
      {
        heading: "Better value through bundled hospitality",
        body: "Hotel venues often separate room charges, meal costs, venue fees, and service charges into multiple invoices. The Mountain bundles stay, five daily meals, venue access, and hospitality into one clear per-person daily rate. This makes budgeting simpler and eliminates surprise charges on the final bill.",
      },
    ],
    relatedLinks: [
      { label: "Explore The Mountain Estate", href: "/mountain-view-destination" },
      { label: "View Wedding Packages", href: "/offers" },
      { label: "Key Advantages", href: "/key-advantages" },
    ],
  },
];

export const blogPostSlugs = blogPosts.map((post) => post.slug);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
