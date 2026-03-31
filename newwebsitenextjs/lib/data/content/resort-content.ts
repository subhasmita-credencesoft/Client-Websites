export const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Story", href: "#story", id: "story" },
  { label: "Signature", href: "#signature", id: "signature" },
  { label: "Experiences", href: "#experiences", id: "experiences" },
  { label: "Reserve", href: "#reserve", id: "reserve" },
];

export const homeSectionContent = {
  siteHeader: {
    logoLines: ["The Mountain", "Karjat"],
    primaryCta: "Book now",
  },
  hero: {
    title: "Your Dream Wedding in the Lap of Nature",
    subtitle:
      "Celebrate Love at The Mountain, Karjat, a private destination wedding estate set across 7 acres of green beauty and scenic mountain calm.",
    description:
      "A luxurious, private, and fully equipped venue where families can host every function, stay together, dine together, and celebrate together in one unforgettable destination.",
    primaryCta: "BOOK NOW",
    secondaryCta: "EXPLORE WEDDING PACKAGES",
  },
  about: {
    title: "WHERE NATURE MEETS CELEBRATION",
    highlight:
      "Green Beauty in 7 Acres | A private destination wedding and event venue designed for families, rituals, and celebration weekends.",
    body:
      "Thank you for considering The Mountain, Karjat as your venue for creating unforgettable memories. Surrounded by lush greenery and mountain views, the estate brings together spacious lawns, multiple stay options, complete hospitality services, and venue-led wedding planning in one place. It is designed for couples, families, and planners who want the ease of hosting Haldi, Mehendi, Sangeet, Cocktail, Wedding Ceremony, and Reception in one destination.",
    cta: "DISCOVER THE DESTINATION",
    awardTitle: "Private estate. Scenic backdrop. One celebration destination.",
    awardSubtitle: "Stay, meals, venue access, and hospitality curated for premium wedding hosting",
  },
  media: {
    eyebrow: "Wedding Celebrations",
    title: "From intimate rituals to grand receptions, every celebration finds its place here",
    description:
      "The Mountain, Karjat is built for Haldi, Mehendi, Sangeet, Cocktail Night, Wedding Ceremony, Reception, and staycation-style family wedding weekends. The venue experience is designed so families can move through every event without losing the warmth of staying together in one estate.",
    cta: "EXPLORE WEDDING SPACES",
  },
  gastronomy: {
    title: "DELIGHTFUL CULINARY EXPERIENCE",
    subtitle: "Curated meals that support the full celebration journey, from welcome gatherings to farewell breakfast",
    description:
      "Packages include Lunch, Hi-Tea, Starters, Dinner, and Breakfast, creating a more convenient and better coordinated hospitality experience for wedding families. Additional items can be customised as per preference and charged separately on a per-person, per-day basis.",
    highlights: [
      "Lunch: Roti, 2 Sabji, Dal, Rice, Salad, Papad & Pickle",
      "Hi-Tea: Tea/Coffee & 2 Snacks",
      "Starters: 2 Starters",
      "Dinner: Roti, 2 Sabji, Dal, Rice, Salad, Papad & Pickle",
      "Breakfast: Tea/Coffee & 2 Dishes",
    ],
  },
  parallax: {
    eyebrow: "Venue Highlights",
    title: "A scenic private estate designed for wedding weekends, family gatherings, and celebration flow",
    description:
      "Spread across 7 acres of lush green natural landscape, The Mountain, Karjat offers spacious lawns, multiple event spaces, scenic mountain surroundings, private estate comfort, and natural ambience that feels cinematic even before the first decor element arrives.",
    images: [
      {
        src: "/images/DSC08831.avif",
        alt: "Mountain valley",
      },
      {
        src: "/images/DSC08849.avif",
        alt: "Pool deck",
      },
      {
        src: "/images/DSC08769.avif",
        alt: "Luxury room",
      },
      {
        src: "/images/DSC08853.avif",
        alt: "Forest trail",
      },
    ],
  },
  experiences: {
    eyebrow: "Key Advantages",
    title: "Why families choose to host everything in one destination",
    description:
      "Unlimited Music Hours, 24×7 Pool Access, Zero Sound License Required, Full Venue Access, and a private estate setting make The Mountain ideal for intimate weddings, multi-function family celebrations, and scenic celebration weekends.",
  },
  reservation: {
    eyebrow: "Wedding Quote",
    title: "Tell us about your celebration and we will guide the right package direction",
    description:
      "Share your event type, dates, guest count, selected package, and total stay requirement. Our team will help you understand availability, bundled package fit, and the right next step toward your quotation.",
    cta: "REQUEST A WEDDING QUOTE",
  },
  offers: {
    title: "WEDDING PACKAGES DESIGNED TO MAKE PLANNING CLEARER",
    subtitle: "Choose between weekday and weekend pricing, then explore the hospitality depth of each package tier",
    tabs: ["WEEKDAY", "WEEKEND"],
  },
  logos: {
    eyebrow: "Contact",
    title: "Connect with The Mountain, Karjat",
    description: "For quotation and package details, reach us through phone, Instagram, or our official website.",
    items: [
      {
        label: "Call Us",
        value: "+91 9833866655",
        href: "tel:+919833866655",
      },
      {
        label: "Alternate Number",
        value: "+91 9892011179",
        href: "tel:+919892011179",
      },
      {
        label: "Instagram",
        value: "instagram.com/themountain.karjat",
        href: "https://instagram.com/themountain.karjat",
      },
      {
        label: "Website",
        value: "www.themountainresorts.com",
        href: "https://www.themountainresorts.com",
      },
    ],
  },
  townships: {
    title: "STAY & ACCOMMODATION DETAILS",
    subtitle: "Multiple premium stay options available with modern amenities and comfortable furnishing",
    cardLabel: "ALL PROPERTIES PREMIUM, FURNISHED, WELL-MAINTAINED",
    roomTypes: [
      {
        title: "Standard Room",
        tariff: "Room Tariff Rs. 5,000/-",
        package: "Per Person Package (Stay + All Meals) Rs. 3,000/-",
      },
      {
        title: "Cliff Room",
        tariff: "Room Tariff Rs. 6,500/-",
        package: "Per Person Package (Stay + All Meals) Rs. 3,500/-",
      },
      {
        title: "Family Room",
        tariff: "Room Tariff Rs. 20,000/-",
        package: "Per Person Package (Stay + All Meals) Rs. 2,500/-",
      },
      {
        title: "Glass Cottage",
        tariff: "Room Tariff Rs. 12,000/-",
        package: "Per Person Package (Stay + All Meals) Rs. 7,500/-",
      },
      {
        title: "Bungalow",
        tariff: "Bungalow Tariff Rs. 25,000/-",
        package: "Per Person Package (Stay + All Meals) Rs. 3,500/-",
      },
    ],
  },
  awards: {
    title: "RULES, TERMS & BOOKING CLARITY",
    subtitle: "Clear policies help families plan with confidence before they send the final inquiry",
    cta: "VIEW FULL TERMS",
  },
  horizontalJourney: {
    prefix: "Package",
  },
  featureSplit: {
    ctaFallback: "VIEW DETAILS",
  },
} as const;

export const aboutPageContent = {
  hero: {
    eyebrow: "About The Mountain, Karjat",
    title: "More than a stay, The Mountain is a private destination wedding and event estate for shared celebrations",
    description:
      "Set against scenic mountain surroundings in Karjat, The Mountain brings together premium stays, event spaces, curated hospitality, and a private-estate atmosphere designed for weddings, family functions, and elevated celebration weekends.",
    image: "/images/DSC08763.avif",
  },
  story: {
    eyebrow: "Our Story",
    title: "Built to feel like a complete destination where families can celebrate every moment together",
    paragraphs: [
      "Spread across seven acres of green landscape, The Mountain is shaped around privacy, comfort, and celebration. Couples and families experience scenic views, open-air spaces, multiple stay categories, and event-ready zones that work beautifully for intimate rituals and larger wedding functions alike.",
      "From guest stays and curated meals to venue flow and hospitality coordination, the property is designed to keep everything in one place. That makes it easier to host Haldi, Mehendi, Sangeet, Cocktail Night, Wedding Ceremony, and Reception without splitting the celebration across scattered venues.",
    ],
    quote:
      "A scenic destination where families can stay together, dine together, and celebrate every function in one estate.",
    image: "/images/DSC08831.avif",
  },
  stats: [
    { value: "7 Acres", label: "Private green destination estate" },
    { value: "5 Stay Types", label: "Rooms, cottages, and bungalow options" },
    { value: "24x7", label: "Pool access and relaxed destination rhythm" },
    { value: "All-in-One", label: "Stay, meals, venue access, and hosting support" },
  ],
  pillars: {
    eyebrow: "What Defines The Experience",
    title: "The destination elements that shape every celebration at The Mountain",
    items: [
      {
        title: "Scenic Destination Setting",
        description:
          "Mountain-facing views, open-air lawns, landscaped pockets, and a calm private-estate atmosphere create a striking backdrop for rituals, portraits, and celebration weekends.",
        image: "/images/DSC08849.avif",
      },
      {
        title: "Flexible Guest Stay Options",
        description:
          "Standard rooms, cliff rooms, family rooms, glass cottages, and bungalow stays make it easier to host mixed guest groups with comfort, privacy, and wedding-weekend convenience.",
        image: "/images/DSC08769.avif",
      },
      {
        title: "Celebration-Ready Hospitality",
        description:
          "Meals, venue access, stay planning, guest movement, and event support are aligned to help families manage private functions and destination gatherings smoothly.",
        image: "/images/DSC08853.avif",
      },
    ],
  },
  ethos: {
    eyebrow: "Our Ethos",
    title: "Hospitality that makes destination wedding hosting feel warmer, smoother, and more personal",
    description:
      "At The Mountain, we focus on experiences that feel intentional from arrival to departure. Design, comfort, landscape, food, and service are brought together to create celebrations that feel elevated without losing warmth.",
    cards: [
      {
        title: "Purposeful Hospitality",
        body: "Every guest touchpoint is designed to feel attentive, personal, and smoothly managed.",
      },
      {
        title: "Design With Atmosphere",
        body: "Rooms, lawns, poolside zones, and event spaces are shaped to feel memorable in both use and appearance.",
      },
      {
        title: "Complete Destination Thinking",
        body: "Stay, meals, event flow, and venue planning are treated as one connected experience rather than separate bookings.",
      },
    ],
  },
  founder: {
    eyebrow: "A Message",
    title: "The vision behind The Mountain is simple: create a place families remember for the feeling of celebrating together",
    body:
      "The Mountain was imagined as a destination where scenery, stays, hospitality, and celebrations could all live in one cohesive environment. That idea continues to shape the venue today through every room category, every event zone, and every guest experience created on the property.",
    signature: "The Mountain, Karjat",
    image: "/images/DSC08846.avif",
  },
  journey: {
    eyebrow: "Journey",
    title: "How the destination experience comes together across the property",
    items: [
      {
        year: "01",
        title: "Arrival Into A Scenic Estate",
        body: "Guests enter into a mountain-facing destination with landscaped open spaces and a strong sense of privacy.",
      },
      {
        year: "02",
        title: "Premium Stay Choices",
        body: "Multiple accommodation categories support families, groups, wedding guests, and longer-stay comfort.",
      },
      {
        year: "03",
        title: "Celebration-Ready Venues",
        body: "Lawns, event spaces, and poolside settings create flexibility for rituals, gatherings, and social occasions.",
      },
      {
        year: "04",
        title: "Curated Hospitality",
        body: "Meals, planning support, and venue flow are aligned to make the overall experience feel seamless.",
      },
    ],
  },
  hosting: {
    eyebrow: "Ideal For",
    title: "Designed for destination weddings, multi-function celebrations, and family-led hosting",
    description:
      "The property works well for hosts who want a venue that supports celebration energy and overnight comfort in the same place. Spacious lawns, stay inventory, curated package options, and private-estate character allow each event to feel intentional rather than standard.",
    bullets: [
      "Destination weddings and multi-function celebrations",
      "Intimate weddings and full family gatherings",
      "Birthdays, anniversaries, and private milestone events",
      "Relaxed celebration weekends with family and friends",
    ],
    image: "/images/DSC08837.avif",
  },
  impact: {
    eyebrow: "Responsible Growth",
    title: "A destination experience shaped with care for people, property, and long-term value",
    description:
      "The Mountain is built around experiences that respect the destination itself. That means thoughtful upkeep, guest discipline, well-maintained stay areas, and a hospitality approach that values lasting quality over temporary spectacle.",
    bullets: [
      "Well-maintained stay inventory and venue spaces",
      "Private-estate atmosphere with controlled guest flow",
      "Curated event planning over overcrowded execution",
      "A hospitality-first approach to every celebration",
    ],
    image: "/images/DSC08849.avif",
  },
  cta: {
    eyebrow: "Plan With Us",
    title: "See the spaces, compare package options, and start your wedding enquiry",
    description:
      "Explore guest stay categories, venue highlights, and package details, then connect with the team for availability and quotation support.",
  },
} as const;

export const storytellingBlocks = [
  {
    title: "Celebrate Every Event In One Estate",
    description:
      "From Haldi and Mehendi to Sangeet, Cocktail Night, Wedding Ceremony, and Reception, The Mountain creates a single destination where every event feels connected, scenic, and easier for families to host.",
    image:
      "/images/DSC08837.avif",
  },
  {
    title: "Scenic Privacy With Celebration Flow",
    description:
      "The atmosphere here feels naturally cinematic: green views, open-air lawns, private estate calm, poolside energy, and event-ready zones that work beautifully for rituals, photographs, and evening celebrations.",
    image:
      "/images/DSC08849.avif",
  },
  {
    title: "Built For Confident Planning",
    description:
      "50% advance is required to block dates, packages are based on final headcount, outside catering is not allowed in package bookings, and decorators or vendors require prior approval for smooth event coordination.",
    image:
      "/images/DSC08846.avif",
  },
];

export const horizontalPanels = [
  {
    title: "Classic Package",
    subtitle: "A clear bundled starting point for elegant destination celebrations with stay, meals, and venue access included.",
    bullets: [
      "Weekday Offer: Rs. 4,500 per person",
      "Weekend Offer: Rs. 5,500 per person",
      "Includes 5 meals + stay + venue access",
    ],
    image: "/images/DSC08846.avif",
  },
  {
    title: "Signature Package",
    subtitle: "A richer wedding-hosting package with stronger food depth for families who want a fuller guest experience.",
    bullets: [
      "Weekday Offer: Rs. 5,500 per person",
      "Weekend Offer: Rs. 6,500 per person",
      "Classic Package + extra 2 starters + 1 gravy extra each in lunch and dinner",
    ],
    image: "/images/DSC08853.avif",
  },
  {
    title: "Premium Luxe Package",
    subtitle: "An elevated hospitality format for celebration weekends that call for premium service and added dining theatre.",
    bullets: [
      "Weekday Offer: Rs. 6,500 per person",
      "Weekend Offer: Rs. 7,500 per person",
      "Signature Package + 2 live counters",
    ],
    image: "/images/DSC08849.avif",
  },
];

export const experienceCards = [
  {
    title: "Unlimited Music Hours",
    description: "Keep the celebration energy alive across Sangeet, Cocktail Night, and Reception without the usual restrictive wedding-venue interruptions.",
    image: "/images/DSC08849.avif",
  },
  {
    title: "24x7 Pool Access",
    description: "Poolside moments add leisure, fun, and destination charm to wedding weekends, family arrivals, and in-between celebration hours.",
    image: "/images/DSC08769.avif",
  },
  {
    title: "Private Estate Experience",
    description: "Stay together, dine together, and celebrate together in one scenic estate with dedicated zones for rituals, music, hosting, and family time.",
    image: "/images/DSC08831.avif",
  },
];
