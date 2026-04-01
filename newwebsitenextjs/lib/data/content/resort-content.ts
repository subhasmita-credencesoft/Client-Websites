export const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#story", id: "story" },
  { label: "Rooms", href: "#signature", id: "signature" },
  { label: "Amenities", href: "#experiences", id: "experiences" },
  { label: "Reserve", href: "#reserve", id: "reserve" },
];

export const homeSectionContent = {
  siteHeader: {
    logoLines: ["Hotel Redwings", "Castle"],
    primaryCta: "Book now",
  },
  hero: {
    title: "Comfortable Hotel Stay in Panvel with Elegant Rooms and Easy City Access",
    primaryCta: "BOOK NOW",
    secondaryCta: "EXPLORE ROOM TYPES",
  },
  about: {
    title: "WHERE COMFORT MEETS CONVENIENCE",
    highlight:
      "Panvel location | Stylish rooms | Quick access to city, rail, and expressway connections.",
    body:
      "Hotel Redwings Castle is designed for guests who want a dependable hotel stay with upgraded room choices, helpful service, and a location that makes Panvel movement easier. Whether the visit is for work, family travel, transit, or a weekend plan, the property brings together practical comfort, polished interiors, and attentive hospitality in one place.",
    cta: "DISCOVER THE HOTEL",
    awardTitle: "Elegant rooms. Central access. Dependable hospitality.",
    awardSubtitle: "Stay comfort, room choice, and service support designed around guest convenience",
  },
  media: {
    eyebrow: "Hotel Highlights",
    title: "From premium suites to comfortable standard stays, every room is designed for a smoother Panvel visit",
    description:
      "Hotel Redwings Castle combines room variety, accessible location, and reliable hospitality. Guests can choose from Maharaja Suite Room, Supreme Room, Luxury Room, Deluxe Room, and Standard Room based on their trip style, comfort needs, and budget.",
    cta: "EXPLORE ROOM DETAILS",
  },
  gastronomy: {
    title: "COMFORT-LED HOSPITALITY EXPERIENCE",
    subtitle: "Key in-room comforts and service support that help guests settle in with ease",
    description:
      "Across the room categories, guests benefit from essentials such as air-conditioning, room service, Wi-Fi in selected categories, television access, housekeeping support, luggage assistance, and hotel service touchpoints that keep the stay practical and comfortable.",
    highlights: [
      "Air-conditioned rooms across the hotel",
      "Room service support",
      "Wi-Fi available in select room categories",
      "Television in premium room categories",
      "Housekeeping and luggage support",
    ],
  },
  parallax: {
    eyebrow: "Property Highlights",
    title: "A city hotel layout built for room comfort, accessibility, and flexible guest needs",
    description:
      "From suite-style stays to value-oriented rooms, Hotel Redwings Castle supports different travel plans inside one hotel environment. Its Panvel location, clean room inventory, and practical services make it useful for solo travelers, couples, families, and working professionals.",
    images: [
      {
        src: "https://bookonelocal.in/cdn/2025-06-24-092820440-5.jpg",
        alt: "Hotel Redwings Castle exterior",
      },
      {
        src: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
        alt: "Maharaja suite room interior",
      },
      {
        src: "https://bookonelocal.in/cdn/2025-06-24-094826961-26.jpg",
        alt: "Luxury room interior",
      },
      {
        src: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
        alt: "Deluxe room interior",
      },
    ],
  },
  experiences: {
    eyebrow: "Why Stay Here",
    title: "Why guests choose Hotel Redwings Castle in Panvel",
    description:
      "The hotel offers polished room options, practical amenities, quick access to Panvel station and major roads, and a comfortable environment for both short city stays and longer work-led visits.",
  },
  reservation: {
    eyebrow: "Room Booking",
    title: "Share your travel dates and room preference to plan the right stay",
    description:
      "Choose your check-in, check-out, guest count, room category, and preferred plan direction. The Hotel Redwings Castle team can then guide the best room option and availability support for your visit.",
    cta: "REQUEST BOOKING SUPPORT",
  },
  offers: {
    title: "ROOM TYPES DESIGNED FOR DIFFERENT STAY NEEDS",
    subtitle: "Compare room categories from Standard and Deluxe stays to Luxury, Supreme, and Maharaja Suite comfort",
    tabs: ["FEATURED", "PREMIUM"],
  },
  logos: {
    eyebrow: "Contact",
    title: "Connect with Hotel Redwings Castle",
    description: "For room bookings, stay support, and hotel information, reach us by phone, WhatsApp, or direct enquiry.",
    items: [
      {
        label: "Call Us",
        value: "+91 9930022229",
        href: "tel:+919930022229",
      },
      {
        label: "WhatsApp",
        value: "+91 9930022229",
        href: "https://wa.me/919930022229",
      },
      {
        label: "Email",
        value: "info@redwingscatlegmailcom",
        href: "mailto:info@redwingscatlegmailcom",
      },
      {
        label: "Location",
        value: "Panvel, Maharashtra",
        href: "https://maps.google.com/?q=Hotel+Redwings+Castle+Panvel",
      },
    ],
  },
  townships: {
    title: "ROOM & STAY DETAILS",
    subtitle: "Five room categories designed for different budgets, trip styles, and comfort expectations",
    cardLabel: "PANVEL HOTEL STAYS, WELL-MAINTAINED, ACCESSIBLE, AND COMFORT-LED",
    roomTypes: [
      {
        title: "Standard Room",
        tariff: "Room Tariff Rs. 2,750/-",
        package: "Budget-friendly stay for solo travellers and couples",
      },
      {
        title: "Deluxe Room",
        tariff: "Room Tariff Rs. 3,300/-",
        package: "Cozy stay with upgraded comfort and modern furnishing",
      },
      {
        title: "Luxury Room",
        tariff: "Room Tariff Rs. 3,850/-",
        package: "Balanced premium comfort for leisure or business stays",
      },
      {
        title: "Supreme Room",
        tariff: "Room Tariff Rs. 6,050/-",
        package: "Stylish room with added comfort and stronger amenity mix",
      },
      {
        title: "Maharaja Suite Room",
        tariff: "Room Tariff Rs. 8,250/-",
        package: "Top-category suite stay with spacious luxury feel",
      },
    ],
  },
  awards: {
    title: "CHECK-IN, TERMS & BOOKING CLARITY",
    subtitle: "Important stay notes, room guidance, and booking support details before arrival",
    cta: "VIEW FULL DETAILS",
  },
  horizontalJourney: {
    prefix: "Room Plan",
  },
  featureSplit: {
    ctaFallback: "VIEW DETAILS",
  },
} as const;

export const aboutPageContent = {
  hero: {
    eyebrow: "About Hotel Redwings Castle",
    title: "More than a transit stay, Hotel Redwings Castle is a comfortable Panvel hotel designed for practical luxury and everyday convenience",
    description:
      "Set in Panvel near key road links and city touchpoints, Hotel Redwings Castle offers guests a reliable stay experience through polished rooms, smooth service, and room categories that fit different budgets and travel styles.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092834179-1.jpg",
  },
  story: {
    eyebrow: "Our Story",
    title: "Built to make city stays feel easier, calmer, and more comfortable for every guest",
    paragraphs: [
      "Hotel Redwings Castle brings together approachable luxury and useful convenience in one Panvel address. Guests can choose room categories that suit their trip needs, from Standard and Deluxe stays to Luxury, Supreme, and Maharaja Suite experiences.",
      "The property is positioned for guests who want better room comfort, direct service access, and a hotel environment that works well for city travel, business movement, overnight stops, and family visits.",
    ],
    quote:
      "A Panvel hotel designed around room comfort, location convenience, and warm hospitality.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
  },
  stats: [
    { value: "5", label: "Room categories available" },
    { value: "22", label: "Total room inventory" },
    { value: "24x7", label: "Room service support" },
    { value: "1.2 Km", label: "From Panvel Railway Station" },
  ],
  pillars: {
    eyebrow: "What Defines The Stay",
    title: "The hotel strengths that shape every guest experience at Hotel Redwings Castle",
    items: [
      {
        title: "Room Choice For Different Budgets",
        description:
          "Standard, Deluxe, Luxury, Supreme, and Maharaja Suite options make it easier for guests to select a stay that matches their budget, comfort expectation, and trip purpose.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
      },
      {
        title: "Comfort-Led In-Room Amenities",
        description:
          "Air-conditioning, room service, Wi-Fi in select categories, TV, and housekeeping support keep the room experience practical and polished.",
        image: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
      },
      {
        title: "Accessible Panvel Location",
        description:
          "The hotel is well placed for guests moving through Panvel, nearby rail connections, Orion Mall access, and the Mumbai Pune Expressway corridor.",
        image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
      },
    ],
  },
  ethos: {
    eyebrow: "Our Ethos",
    title: "Hospitality that keeps the stay polished, practical, and dependable from arrival to departure",
    description:
      "At Hotel Redwings Castle, the focus is on comfortable rooms, clear service support, and a stay flow that feels welcoming instead of complicated. The goal is to make every trip easier, whether it is short, business-led, or family-focused.",
    cards: [
      {
        title: "Practical Comfort",
        body: "Rooms are designed to support rest, convenience, and a smoother city-stay rhythm.",
      },
      {
        title: "Warm Service",
        body: "Helpful hotel support, room service, and guest assistance are treated as core parts of the experience.",
      },
      {
        title: "Location Ease",
        body: "Quick access to road and rail links helps guests move in and out of Panvel with less friction.",
      },
    ],
  },
  founder: {
    eyebrow: "A Message",
    title: "The vision behind Hotel Redwings Castle is simple: deliver comfortable stays with better room choice and dependable hospitality",
    body:
      "Hotel Redwings Castle is shaped around practical luxury. Every room category, service touchpoint, and hospitality feature is meant to give travelers a smoother experience, whether they arrive for business, transit, or a family visit.",
    signature: "Hotel Redwings Castle, Panvel",
    image: "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
  },
  journey: {
    eyebrow: "Guest Journey",
    title: "How the stay experience comes together across room selection, service, and location convenience",
    items: [
      {
        year: "01",
        title: "Choose The Right Room Category",
        body: "Guests can match their stay to comfort level and budget through five room categories inside one hotel.",
      },
      {
        year: "02",
        title: "Settle Into A Comfortable Stay",
        body: "Air-conditioning, service support, and well-designed interiors help the room feel easy to use and relaxing.",
      },
      {
        year: "03",
        title: "Stay Connected To Panvel Access Points",
        body: "The location helps guests stay close to city movement, transport links, and important Panvel routes.",
      },
      {
        year: "04",
        title: "Leave With A Smooth Hospitality Experience",
        body: "The overall goal is a clean, reliable, and comfortable hotel stay that guests remember for convenience and service quality.",
      },
    ],
  },
  hosting: {
    eyebrow: "Ideal For",
    title: "Designed for business trips, family stays, city travel, and premium short-stay comfort",
    description:
      "Hotel Redwings Castle works well for solo travelers, couples, families, corporate guests, and anyone looking for a dependable Panvel stay with multiple room options and accessible location benefits.",
    bullets: [
      "Business and work-led city stays",
      "Family and couple stays in Panvel",
      "Transit and overnight comfort near transport links",
      "Guests who want upgraded room categories inside one hotel",
    ],
    image: "https://bookonelocal.in/cdn/2025-06-24-095022974-24.jpg",
  },
  impact: {
    eyebrow: "Stay Value",
    title: "A hotel experience shaped around comfort, room flexibility, and dependable guest support",
    description:
      "The value of Hotel Redwings Castle comes from how it combines room choice, essential amenities, accessible location, and service continuity in one stay experience.",
    bullets: [
      "Five room categories for varied guest needs",
      "Wi-Fi, room service, and housekeeping support",
      "Accessible Panvel address near key travel links",
      "Comfort-first hotel environment for repeatable stays",
    ],
    image: "https://bookonelocal.in/cdn/2025-06-24-095145740-23.jpg",
  },
  cta: {
    eyebrow: "Plan With Us",
    title: "See the room categories, compare stay options, and reach out for booking support",
    description:
      "Explore room details, hotel services, and property highlights, then connect with the team for availability and room booking assistance.",
  },
} as const;

export const storytellingBlocks = [
  {
    title: "Room Categories For Every Stay Type",
    description:
      "From Standard and Deluxe rooms to Luxury, Supreme, and Maharaja Suite categories, the hotel gives guests the flexibility to choose the right comfort level for each visit.",
    image: "https://bookonelocal.in/cdn/2025-06-24-094807016-15.jpg",
  },
  {
    title: "Panvel Convenience With Better Comfort",
    description:
      "Near Orion Mall, New Panvel Bridge, and the Mumbai Pune Expressway, the location helps guests balance easy movement with a calmer hotel environment.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092853092-22.jpg",
  },
  {
    title: "Service Support That Keeps The Stay Smooth",
    description:
      "Wi-Fi, room service, housekeeping, parking, power backup, and luggage support help guests focus on their travel instead of basic hotel friction points.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095124999-4.jpg",
  },
];

export const horizontalPanels = [
  {
    title: "Standard & Deluxe Stays",
    subtitle: "Value-oriented room choices for guests who want clean comfort and practical hotel access in Panvel.",
    bullets: [
      "Standard Room from Rs. 2,750",
      "Deluxe Room from Rs. 3,300",
      "Good fit for short stays and budget-conscious travel",
    ],
    image: "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg",
  },
  {
    title: "Luxury & Supreme Comfort",
    subtitle: "Balanced premium options for guests who want stronger room comfort and a more polished stay environment.",
    bullets: [
      "Luxury Room from Rs. 3,850",
      "Supreme Room from Rs. 6,050",
      "Well suited for work trips and comfort-led stays",
    ],
    image: "https://bookonelocal.in/cdn/2025-06-24-094930729-24.jpg",
  },
  {
    title: "Maharaja Suite Experience",
    subtitle: "The top room category for guests who want spacious interiors and a more elevated hotel stay.",
    bullets: [
      "Maharaja Suite Room from Rs. 8,250",
      "Ideal for premium stays and special visits",
      "Royal comfort with stronger privacy and room presence",
    ],
    image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
  },
];

export const experienceCards = [
  {
    title: "Room Variety",
    description: "Choose from five room categories based on budget, comfort, and trip purpose.",
    image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
  },
  {
    title: "Service Convenience",
    description: "Room service, housekeeping, luggage support, and useful hotel amenities help the stay feel easier.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092828011-2.jpg",
  },
  {
    title: "Accessible Panvel Stay",
    description: "Rail, road, mall, and airport connectivity make the hotel convenient for many travel plans.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
  },
];
