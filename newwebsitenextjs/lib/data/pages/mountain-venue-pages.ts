export type MountainVenuePageData = {
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  cards: Array<{
    label: string;
    title: string;
    description: string;
    image: string;
  }>;
  highlights: {
    title: string;
    items: string[];
  };
  gallery: {
    title: string;
    images: Array<{
      src: string;
      alt: string;
    }>;
  };
  experienceJourney: Array<{
    title: string;
    body: string;
    image: string;
  }>;
  cinematicBand: {
    title: string;
    body: string;
    image: string;
    tags: string[];
  };
  extraSections: Array<{
    title: string;
    body: string;
  }>;
  summary: {
    title: string;
    body: string;
  };
};

export const mountainViewDestinationPageData: MountainVenuePageData = {
  slug: "mountain-view-destination",
  hero: {
    title: "Property Highlights",
    subtitle: "A Panvel hotel setting with accessible location, polished rooms, and practical comfort for daily travel needs.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092820440-5.jpg",
  },
  stats: [
    { value: "5", label: "Room categories" },
    { value: "22", label: "Total rooms" },
    { value: "1.2 Km", label: "From Panvel station" },
    { value: "24x7", label: "Room service support" },
  ],
  intro: {
    eyebrow: "Property View",
    title: "A hotel designed around room comfort, practical amenities, and Panvel convenience",
    body:
      "Hotel Redwings Castle combines approachable luxury with useful day-to-day hotel support. The property works well for guests looking for cleaner room choice, better stay clarity, and easier movement across Panvel.",
  },
  cards: [
    {
      label: "HIGHLIGHT",
      title: "Accessible Panvel Address",
      description: "The hotel is positioned near major city links, helping guests move more easily across Panvel and nearby routes.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
    },
    {
      label: "HIGHLIGHT",
      title: "Five Room Categories",
      description: "The room mix supports multiple budgets and comfort needs inside one hotel property.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
    },
    {
      label: "HIGHLIGHT",
      title: "Useful Hotel Services",
      description: "Wi-Fi, room service, parking, housekeeping, and power backup make the stay more dependable.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
    },
    {
      label: "HIGHLIGHT",
      title: "Comfort-Led Stay Design",
      description: "Rooms and service flow are designed to feel easy to use instead of overly complicated or resort-like.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
    },
  ],
  highlights: {
    title: "Key property strengths",
    items: [
      "Panvel city access",
      "Room variety from Standard to Maharaja Suite",
      "Wi-Fi and room service support",
      "Parking, housekeeping, and luggage assistance",
      "Suitable for business, family, and transit stays",
    ],
  },
  gallery: {
    title: "Property Gallery",
    images: [
      { src: "https://bookonelocal.in/cdn/2025-06-24-092820440-5.jpg", alt: "Hotel exterior" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-092828011-2.jpg", alt: "Hotel frontage" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-092831095-3.jpg", alt: "Property area" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg", alt: "Hotel service atmosphere" },
    ],
  },
  experienceJourney: [
    {
      title: "Arrive into a practical city-stay setup",
      body: "The property is designed to make city stays feel straightforward, accessible, and comfortable right from arrival.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092834179-1.jpg",
    },
    {
      title: "Choose the room category that fits",
      body: "Room selection is flexible enough for value stays, premium comfort, or a stronger suite experience.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg",
    },
    {
      title: "Stay with the services that matter",
      body: "Useful hotel support creates a more practical guest experience instead of a feature-heavy but less functional one.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095145740-23.jpg",
    },
  ],
  cinematicBand: {
    title: "A Panvel hotel that balances comfort, access, and service clarity",
    body: "For guests who want room quality, useful support, and an address that works well for city movement, Hotel Redwings Castle offers a dependable stay direction.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
    tags: ["Panvel", "Hotel Stay", "Room Variety", "City Access"],
  },
  extraSections: [
    {
      title: "Useful for multiple stay types",
      body: "The hotel is flexible enough for business visits, family trips, couples, and quick transit bookings.",
    },
    {
      title: "Designed around practical comfort",
      body: "The property focuses on room quality and service continuity rather than only decorative positioning.",
    },
  ],
  summary: {
    title: "The strongest property highlights are the ones guests actually use",
    body: "At Hotel Redwings Castle, room variety, service support, and accessible location together create the practical value of the stay.",
  },
};

export const privateEventSpacesPageData: MountainVenuePageData = {
  slug: "private-event-spaces",
  hero: {
    title: "Why Guests Stay Here",
    subtitle: "A look at why Hotel Redwings Castle works for business travel, family visits, and premium short stays in Panvel.",
    image: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
  },
  stats: [
    { value: "Business", label: "Work-friendly stays" },
    { value: "Family", label: "Comfort-led travel" },
    { value: "Transit", label: "Useful overnight stays" },
    { value: "Premium", label: "Suite comfort available" },
  ],
  intro: {
    eyebrow: "Why Stay",
    title: "A hotel that works for different guest journeys instead of just one stay style",
    body:
      "The property supports working professionals, couples, family visitors, and premium city guests through a broad room mix and a more practical hotel service setup.",
  },
  cards: [
    {
      label: "WHY STAY",
      title: "Business-Friendly Comfort",
      description: "Wi-Fi, room service, and accessible location help working travelers keep the stay simple and efficient.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
    },
    {
      label: "WHY STAY",
      title: "Family Stay Ease",
      description: "Different room categories make it easier for family groups to choose the right comfort level and tariff range.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094807016-15.jpg",
    },
    {
      label: "WHY STAY",
      title: "Transit Convenience",
      description: "The Panvel location supports guests who need a convenient stopover or short city stay with less travel friction.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
    },
    {
      label: "WHY STAY",
      title: "Premium Upgrade Option",
      description: "Guests who want more can scale up into Luxury, Supreme, or Maharaja Suite categories without leaving the same property.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
    },
  ],
  highlights: {
    title: "Good fit for",
    items: [
      "Business travellers",
      "Couples and family stays",
      "Transit and overnight bookings",
      "Premium room seekers",
      "Guests wanting Panvel convenience",
    ],
  },
  gallery: {
    title: "Stay Views",
    images: [
      { src: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg", alt: "Deluxe room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg", alt: "Luxury room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg", alt: "Supreme room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg", alt: "Maharaja suite" },
    ],
  },
  experienceJourney: [
    {
      title: "Choose the right stay tier",
      body: "Room selection becomes easier when each category clearly serves a different comfort level.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg",
    },
    {
      title: "Enjoy service-led convenience",
      body: "Room service, housekeeping, and support features reduce friction during the stay.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092853092-22.jpg",
    },
    {
      title: "Move through Panvel more easily",
      body: "Location access helps the hotel stay practical for both short and longer travel plans.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
    },
  ],
  cinematicBand: {
    title: "A better hotel stay often comes from room choice plus service support",
    body: "Hotel Redwings Castle stands out by combining both instead of relying on only one side of the experience.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095124999-4.jpg",
    tags: ["Business Stay", "Family Stay", "Transit", "Premium Rooms"],
  },
  extraSections: [
    {
      title: "Not only for one guest type",
      body: "The property supports different types of travellers through a broader and clearer room inventory.",
    },
    {
      title: "Stronger flexibility inside one hotel",
      body: "Guests can stay within one property even when their comfort expectations vary significantly.",
    },
  ],
  summary: {
    title: "The right hotel is the one that fits more than one travel need well",
    body: "Hotel Redwings Castle gives guests room choice, service convenience, and location access in one balanced stay experience.",
  },
};

export const weddingLawnsPageData: MountainVenuePageData = {
  slug: "wedding-lawns",
  hero: {
    title: "Room Collection Highlights",
    subtitle: "A closer look at the room inventory that shapes the Hotel Redwings Castle guest experience.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
  },
  stats: [
    { value: "4", label: "Standard rooms" },
    { value: "7", label: "Deluxe rooms" },
    { value: "8", label: "Luxury rooms" },
    { value: "3", label: "Premium rooms + suite" },
  ],
  intro: {
    eyebrow: "Room Collection",
    title: "A stay inventory built to serve both value seekers and premium guests",
    body:
      "The property includes Standard Room, Deluxe Room, Luxury Room, Supreme Room, and Maharaja Suite Room categories, giving the hotel a room ladder that serves multiple guest preferences.",
  },
  cards: [
    {
      label: "ROOM",
      title: "Standard Room",
      description: "The most budget-friendly category for guests who want essentials and comfort at the lowest tariff.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095052417-28.jpg",
    },
    {
      label: "ROOM",
      title: "Deluxe Room",
      description: "A comfortable mid-tier room with modern furnishing and a peaceful stay environment.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094807016-15.jpg",
    },
    {
      label: "ROOM",
      title: "Luxury & Supreme",
      description: "Premium categories that improve room presence, comfort, and the overall stay feel.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
    },
    {
      label: "ROOM",
      title: "Maharaja Suite",
      description: "The top room category for guests who want the strongest suite-style experience in the hotel.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
    },
  ],
  highlights: {
    title: "Room inventory strengths",
    items: [
      "Budget to premium room ladder",
      "Useful room count across categories",
      "Comfort-led tariff progression",
      "Better booking flexibility",
      "Polished premium suite option",
    ],
  },
  gallery: {
    title: "Room Gallery",
    images: [
      { src: "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg", alt: "Standard room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg", alt: "Deluxe room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg", alt: "Luxury room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg", alt: "Maharaja suite room" },
    ],
  },
  experienceJourney: [
    {
      title: "Start with the budget that fits",
      body: "The room ladder helps guests begin their decision from tariff comfort instead of confusion.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095108957-15.jpg",
    },
    {
      title: "Upgrade only when needed",
      body: "Guests can move into higher categories for more comfort without leaving the property ecosystem.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094939625-29.jpg",
    },
    {
      title: "Book with better clarity",
      body: "A clearer room structure helps the hotel guide guests faster toward the right booking choice.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
    },
  ],
  cinematicBand: {
    title: "Five room categories create a fuller stay offering inside one hotel",
    body: "That room diversity is one of the strongest assets of Hotel Redwings Castle for both value and premium travellers.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095145740-23.jpg",
    tags: ["Standard", "Deluxe", "Luxury", "Suite"],
  },
  extraSections: [
    {
      title: "A broader hotel than single-category competitors",
      body: "The inventory mix helps the property serve more guest types without forcing everyone into one pricing tier.",
    },
    {
      title: "Useful for repeat stays",
      body: "Guests can shift categories across visits depending on budget, trip purpose, and room preference.",
    },
  ],
  summary: {
    title: "The room collection is one of the clearest strengths of the property",
    body: "Hotel Redwings Castle can serve more travel styles well because its room inventory is both varied and easy to understand.",
  },
};

export const poolsideCelebrationsPageData: MountainVenuePageData = {
  slug: "poolside-celebrations",
  hero: {
    title: "Premium Stay Experience",
    subtitle: "How the hotel’s premium categories create a stronger room experience for guests who want more comfort and space.",
    image: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
  },
  stats: [
    { value: "Luxury", label: "Premium entry room" },
    { value: "Supreme", label: "Upgraded comfort" },
    { value: "Suite", label: "Top stay category" },
    { value: "Rs. 8,250", label: "Suite starting tariff" },
  ],
  intro: {
    eyebrow: "Premium Comfort",
    title: "A stronger room experience for guests who want more than the basics",
    body:
      "Luxury Room, Supreme Room, and Maharaja Suite Room together define the premium side of Hotel Redwings Castle. These categories are useful for longer stays, comfort-led bookings, and guests who want more polished interiors.",
  },
  cards: [
    {
      label: "PREMIUM",
      title: "Luxury Room",
      description: "A more refined room than the base categories, suited to guests who want upgraded comfort at a moderate premium.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
    },
    {
      label: "PREMIUM",
      title: "Supreme Room",
      description: "A stylish room tier with a stronger comfort feel and better room presence for city stays.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094939625-29.jpg",
    },
    {
      label: "PREMIUM",
      title: "Maharaja Suite Room",
      description: "The hotel’s most elevated room category, designed around elegant decor and spacious interiors.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
    },
    {
      label: "PREMIUM",
      title: "Premium Booking Flexibility",
      description: "Guests can choose how far they want to scale comfort without leaving the same hotel property.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
    },
  ],
  highlights: {
    title: "Premium room advantages",
    items: [
      "Stronger room interiors",
      "Better amenity mix",
      "More spacious comfort",
      "Useful for premium city stays",
      "Suite option for top-category booking",
    ],
  },
  gallery: {
    title: "Premium Room Gallery",
    images: [
      { src: "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg", alt: "Luxury room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg", alt: "Supreme room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg", alt: "Maharaja suite room" },
      { src: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg", alt: "Premium suite detail" },
    ],
  },
  experienceJourney: [
    {
      title: "Step into a more polished room setting",
      body: "Premium categories help the stay feel stronger in both comfort and overall room impression.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
    },
    {
      title: "Enjoy higher room comfort",
      body: "Upgraded categories support guests who spend more time in-room or simply want a better hotel feel.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
    },
    {
      title: "Choose the suite when only the top category fits",
      body: "Maharaja Suite Room provides the most elevated stay option in the property’s current room mix.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
    },
  ],
  cinematicBand: {
    title: "Premium room categories give the hotel stronger booking flexibility",
    body: "They help Hotel Redwings Castle serve both everyday city stays and guests who want a more elevated hospitality feel.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
    tags: ["Luxury Room", "Supreme Room", "Maharaja Suite", "Premium Stay"],
  },
  extraSections: [
    {
      title: "Not every guest wants the same room experience",
      body: "Premium room tiers allow the hotel to serve a wider and more nuanced guest profile than only standard inventory could support.",
    },
    {
      title: "Useful for repeat business and upgraded leisure stays",
      body: "Guests can return to the same property while choosing a stronger room category when their trip calls for more comfort.",
    },
  ],
  summary: {
    title: "Premium room depth makes the overall hotel offer stronger",
    body: "Luxury, Supreme, and Maharaja Suite stays give Hotel Redwings Castle a more complete and competitive stay ladder.",
  },
};
