import {
  Bath,
  Bell,
  ChefHat,
  Dumbbell,
  Martini,
  Plane,
  Shell,
  Sparkles,
  Waves,
  Wine
} from "lucide-react";
import type {
  Activity,
  Amenity,
  CorporateHighlight,
  EventType,
  NavLink,
  Offer,
  PicnicPackage,
  Restaurant,
  Room,
  TeamMember,
  Testimonial,
  TimelineMilestone,
  Treatment
} from "@/types";

export const imageSet = {
  homeHero: "/mountain-studio/hero-main.jpeg",
  exterior: "/mountain-studio/hero-secondary.jpeg",
  roomOne: "/mountain-studio/gallery-03.jpeg",
  roomTwo: "/mountain-studio/gallery-10.jpeg",
  roomThree: "/mountain-studio/room-three.jpeg",
  pool: "/mountain-studio/gallery-06.jpeg",
  spa: "/mountain-studio/gallery-07.jpeg",
  dining: "/mountain-studio/gallery-09.jpeg",
  lobby: "/mountain-studio/gallery-12.jpeg",
  ballroom: "/mountain-studio/gallery-11.jpeg"
};

export const bookingEngineUrl = "https://bookone.io/Redwings-Studio?bookingEngine=true";

export const studioGallery = [
  { image: imageSet.homeHero, category: "Exterior", title: "Redwings Studio main arrival view" },
  { image: imageSet.exterior, category: "Exterior", title: "Redwings Studio secondary hero view" },
  { image: imageSet.roomOne, category: "Studios", title: "Studio apartment interior" },
  { image: imageSet.roomTwo, category: "Studios", title: "Goa stay room styling" },
  { image: imageSet.roomThree, category: "Studios", title: "Comfort-led studio suite" },
  { image: imageSet.pool, category: "Amenities", title: "Leisure and poolside atmosphere" },
  { image: imageSet.spa, category: "Interiors", title: "Interior detailing and decor" },
  { image: imageSet.dining, category: "Exterior", title: "Outdoor resort setting" },
  { image: imageSet.lobby, category: "Interiors", title: "Arrival and common-area styling" },
  { image: imageSet.ballroom, category: "Events", title: "Event and gathering backdrop" },
  { image: "/mountain-studio/gallery-01.jpeg", category: "Exterior", title: "Green estate pathway" },
  { image: "/mountain-studio/gallery-02.jpeg", category: "Events", title: "Celebration setup moment" },
  { image: "/mountain-studio/gallery-03.jpeg", category: "Studios", title: "Guest room composition" },
  { image: "/mountain-studio/gallery-04.jpeg", category: "Exterior", title: "Scenic mountain-facing lawn" },
  { image: "/mountain-studio/gallery-05.jpeg", category: "Events", title: "Wedding detail frame" },
  { image: "/mountain-studio/gallery-06.jpeg", category: "Amenities", title: "Pool and leisure corner" },
  { image: "/mountain-studio/gallery-07.jpeg", category: "Interiors", title: "Interior decor detail" },
  { image: "/mountain-studio/gallery-08.jpeg", category: "Events", title: "Function atmosphere" },
  { image: "/mountain-studio/gallery-09.jpeg", category: "Exterior", title: "Open landscape perspective" },
  { image: "/mountain-studio/gallery-10.jpeg", category: "Studios", title: "Stay experience view" },
  { image: "/mountain-studio/gallery-11.jpeg", category: "Events", title: "Celebration-ready backdrop" },
  { image: "/mountain-studio/gallery-12.jpeg", category: "Interiors", title: "Studio styling corner" }
] as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  // { label: "Tariff", href: "/tariff" },
  // { label: "Dining", href: "/dining" },
  // { label: "Spa", href: "/spa" },
  { label: "Picnic", href: "/picnic" },
  { label: "gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Activities", href: "/activities" },
  { label: "About", href: "/about" }
];

export const rooms: Room[] = [
  {
    slug: "budget-double-room",
    name: "Budget Double Room",
    type: "Budget Room",
    size: 280,
    beds: "1 Double Bed",
    price: 1950,
    rating: 4.6,
    guests: 2,
    view: "Resort View",
    floor: "Studio Wing",
    code: "RWS-8615",
    badges: ["Budget Stay", "Best Value"],
    description:
      "Perfect for budget travelers, this room offers essential amenities and a comfortable space for a relaxing stay at Redwings Studio.",
    highlights: ["Comfortable studio layout", "Easy access to resort common areas", "Good fit for short Goa stays"],
    includes: ["Direct booking support", "Private bathroom", "Balcony or sit-out access"],
    images: [
      "https://bookonelocal.in/cdn/2026-04-13-121856321-image_0.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121856445-image_1.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121856658-image_3.jpg"
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"]
  },
  {
    slug: "standard-room",
    name: "Standard Room",
    type: "Standard Room",
    size: 320,
    beds: "1 Double Bed",
    price: 2100,
    rating: 4.7,
    guests: 2,
    view: "Courtyard View",
    floor: "Studio Wing",
    code: "RWS-8616",
    badges: ["Standard", "Popular Choice"],
    description:
      "Designed for comfort, this room features modern facilities and a cozy ambiance for a pleasant stay in  Goa.",
    highlights: ["Comfort-led room design", "Useful for couples or friends", "Simple stay planning"],
    includes: ["Direct support on call", "Private bathroom", "Essential in-room comforts"],
    images: [
      "https://bookonelocal.in/cdn/2026-04-13-121857444-image_0.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121857550-image_1.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121858594-image_8.jpg"
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"]
  },
  {
    slug: "superior-king-room",
    name: "Superior King Room",
    type: "Superior Room",
    size: 360,
    beds: "1 King Bed",
    price: 2500,
    rating: 4.8,
    guests: 2,
    view: "Resort View",
    floor: "Studio Wing",
    code: "RWS-8617",
    badges: ["King Room", "Recommended"],
    description:
      "A spacious room with a king-size bed and premium amenities, ideal for a more comfortable and elevated stay experience.",
    highlights: ["King-size comfort", "More spacious layout", "Better suited for longer stays"],
    includes: ["Direct reservation guidance", "Private bathroom", "Comfort-focused interior setup"],
    images: [
      "https://bookonelocal.in/cdn/2026-04-13-121858910-image_0.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121859019-image_1.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121859126-image_2.jpg"
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"]
  },
  {
    slug: "standard-room-pool-access",
    name: "Standard Room Pool Access",
    type: "Pool Access Room",
    size: 340,
    beds: "1 Double Bed",
    price: 2521,
    rating: 4.8,
    guests: 2,
    view: "Pool Access",
    floor: "Poolside Wing",
    code: "RWS-8618",
    badges: ["Pool Access", "Guest Favorite"],
    description:
      "Enjoy direct pool access from this stylish room, ideal for guests who want convenience, leisure, and a resort-style stay feel.",
    highlights: ["Direct pool access", "Convenient common-area connection", "Relaxed Goa stay mood"],
    includes: ["Direct booking support", "Private bathroom", "Easy poolside movement"],
    images: [
      "https://bookonelocal.in/cdn/2026-04-13-121900099-image_0.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121900218-image_1.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121900566-image_4.jpg"
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"]
  },
  {
    slug: "superior-pool-view",
    name: "Superior Pool View",
    type: "Pool View Room",
    size: 380,
    beds: "1 Double Bed",
    price: 3003,
    rating: 4.9,
    guests: 2,
    view: "Pool View",
    floor: "Upper Studio Wing",
    code: "RWS-8619",
    badges: ["Pool View", "Premium Stay"],
    description:
      "A room with excellent views of the pool, suited for guests who want a brighter resort outlook with added comfort.",
    highlights: ["Pool-facing outlook", "Higher-category stay feel", "Strong fit for couples"],
    includes: ["Direct booking support", "Private bathroom", "Comfortable studio layout"],
    images: [
      "https://bookonelocal.in/cdn/2026-04-13-121901060-image_0.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121901442-image_3.jpg",
      "https://bookonelocal.in/cdn/2026-04-13-121902097-image_8.jpg"
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"]
  }
];

export const amenities: Amenity[] = [
  {
    slug: "infinity-pool",
    icon: Waves,
    title: "Infinity Pool",
    description: "Sun-drenched cabanas, underwater soundscapes, and skyline-facing loungers create an all-day ritual of calm.",
    hours: "6:00 AM - 10:00 PM",
    image: imageSet.pool
  },
  {
    slug: "mountain-spa",
    icon: Sparkles,
    title: "Mountain Spa",
    description: "A sensorial sanctuary offering thermal journeys, bespoke bodywork, and deeply restorative wellness rituals.",
    hours: "9:00 AM - 9:00 PM",
    image: imageSet.spa
  },
  {
    slug: "grand-kitchen",
    icon: ChefHat,
    title: "The Grand Kitchen",
    description: "A vibrant culinary atelier where seasonal tasting menus meet live-fire craft and polished service.",
    hours: "7:00 AM - 11:30 PM",
    image: imageSet.dining
  },
  {
    slug: "concierge",
    icon: Bell,
    title: "Concierge",
    description: "From local sightseeing plans to curated itineraries, our team shapes stays around personal preferences.",
    hours: "24 Hours",
    image: imageSet.lobby
  },
  {
    slug: "helipad",
    icon: Plane,
    title: "Helipad",
    description: "Seamless arrivals and travel coordination for guests who value privacy, speed, and elevated logistics.",
    hours: "By appointment",
    image: imageSet.exterior
  },
  {
    slug: "garden-lawn",
    icon: Shell,
    title: "Garden Lawn",
    description: "Open green spaces, attentive service, and golden-hour dining curated for resident guests and celebrations.",
    hours: "Sunrise - Sunset",
    image: imageSet.exterior
  },
  {
    slug: "fitness-studio",
    icon: Dumbbell,
    title: "Fitness Studio",
    description: "State-of-the-art movement and recovery spaces with private coaching, infrared stretching, and hill views.",
    hours: "24 Hours",
    image: imageSet.pool
  },
  {
    slug: "library-lounge",
    icon: Wine,
    title: "Library Lounge",
    description: "A moody retreat for slow afternoons, rare books, tea service, and an intimate evening lounge experience.",
    hours: "11:00 AM - 12:00 AM",
    image: imageSet.lobby
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Sanjana Kulkarni",
    country: "India",
    rating: 5,
    quote: "From the moment we arrived, everything felt thoughtfully curated. The ambiance, service, and comfort were truly exceptional.",
    avatar: imageSet.roomOne,
    flag: "🇮🇳"
  },
  {
    name: "Rahul Chatterjee",
    country: "India",
    rating: 5,
    quote: "A perfect blend of luxury and warmth. The hospitality made our short getaway feel incredibly special.",
    avatar: imageSet.exterior,
    flag: "🇮🇳"
  },
  {
    name: "Divya Reddy",
    country: "India",
    rating: 5,
    quote: "The dining experience was outstanding. Every dish felt crafted with care and authentic flavors.",
    avatar: imageSet.dining,
    flag: "🇮🇳"
  },
  {
    name: "Kunal Bansal",
    country: "India",
    rating: 4,
    quote: "Elegant yet relaxing. The private dinner arrangement and serene surroundings made it unforgettable.",
    avatar: imageSet.pool,
    flag: "🇮🇳"
  },
  {
    name: "Pooja Saxena",
    country: "India",
    rating: 5,
    quote: "Our anniversary celebration here was magical. The team added thoughtful touches that made it truly memorable.",
    avatar: imageSet.spa,
    flag: "🇮🇳"
  },
  {
    name: "Nikhil Pawar",
    country: "India",
    rating: 5,
    quote: "The design, the atmosphere, and the attention to detail make this place stand out from anywhere else.",
    avatar: imageSet.lobby,
    flag: "🇮🇳"
  },
  {
    name: "Aishwarya Menon",
    country: "India",
    rating: 5,
    quote: "Calm, luxurious, and perfectly managed. The spa experience alone is worth visiting again.",
    avatar: imageSet.roomThree,
    flag: "🇮🇳"
  },
  {
    name: "Harsh Vardhan",
    country: "India",
    rating: 5,
    quote: "We came for a family celebration and left with unforgettable memories. Truly personalized service.",
    avatar: imageSet.ballroom,
    flag: "🇮🇳"
  }
];

export const offers: Offer[] = [
  {
    title: "Moonlit Escape",
    image: imageSet.roomThree,
    validUntil: "2026-12-31T23:59:59",
    price: "From $1,480",
    badge: "Limited Time",
    category: "Romantic",
    description: "Two nights in a signature suite with a spa ritual, welcome refreshments, and a private dinner setup."
  },
  {
    title: "Family Atelier Weekend",
    image: imageSet.roomTwo,
    validUntil: "2026-11-15T23:59:59",
    price: "From $1,120",
    badge: "Best Value",
    category: "Family",
    description: "Second room at reduced rate, daily breakfast, and family concierge planning."
  },
  {
    title: "Executive Stay Elevated",
    image: imageSet.lobby,
    validUntil: "2026-10-10T23:59:59",
    price: "From $780",
    badge: "Exclusive",
    category: "Business",
    description: "Transfer assistance, pressing service, breakfast, and boardroom credits."
  },
  {
    title: "Golden Season Retreat",
    image: imageSet.exterior,
    validUntil: "2026-09-20T23:59:59",
    price: "From $960",
    badge: "Seasonal",
    category: "Seasonal",
    description: "Three-night stay with nature experiences, spa access, and a curated dining experience."
  },
  {
    title: "Wellness Reawakening",
    image: imageSet.spa,
    validUntil: "2026-08-01T23:59:59",
    price: "From $1,290",
    badge: "Exclusive",
    category: "Seasonal",
    description: "Daily treatments, nutrition consultation, hydrotherapy journey, and a calming suite experience."
  },
  {
    title: "Celebration Suite Society",
    image: imageSet.ballroom,
    validUntil: "2026-12-01T23:59:59",
    price: "From $2,240",
    badge: "Limited Time",
    category: "Romantic",
    description: "Penthouse stay paired with private dining, floral styling, and celebration concierge."
  }
];

export const restaurants: Restaurant[] = [
  {
    name: "The Grand Table",
    cuisine: "Modern Fine Dining",
    hours: "6:00 PM - 11:00 PM",
    description: "A refined dining destination where regional produce, live-fire craft, and warm service shape a memorable evening.",
    image: imageSet.dining,
    gallery: [imageSet.dining, imageSet.lobby, imageSet.ballroom],
    menuItems: [
      { name: "Oyster Leaf", description: "Citrus granita and pearl tapioca", price: "$24", course: "Starter" },
      { name: "Charred Lobster", description: "Saffron butter and fennel ash", price: "$48", course: "Main" },
      { name: "Cacao Souffle", description: "Gold leaf and Tahitian vanilla", price: "$21", course: "Dessert" },
      { name: "Mountain Studio Signature", description: "Chef's seasonal degustation", price: "$145", course: "Signature" }
    ]
  },
  {
    name: "Mountain Terrace",
    cuisine: "Mediterranean All-Day Dining",
    hours: "7:00 AM - 10:30 PM",
    description: "A light-filled terrace for breakfast, long lunches, and sunset high tea with fresh air and garden herbs.",
    image: imageSet.pool,
    gallery: [imageSet.pool, imageSet.exterior, imageSet.dining],
    menuItems: [
      { name: "Burrata & Citrus", description: "Burnt honey and pistachio crumb", price: "$18", course: "Starter" },
      { name: "Wood-Fired Branzino", description: "Olive tapenade and grilled lemon", price: "$34", course: "Main" },
      { name: "Olive Oil Cake", description: "Whipped mascarpone and berries", price: "$15", course: "Dessert" },
      { name: "Terrace Mezze", description: "Chef-curated seasonal spread", price: "$29", course: "Signature" }
    ]
  },
  {
    name: "Cellar Bar",
    cuisine: "Cocktails & Rare Spirits",
    hours: "5:00 PM - 1:00 AM",
    description: "A moody late-night bar with velvet textures, rare pours, live jazz sessions, and cocktails built with precision.",
    image: imageSet.lobby,
    gallery: [imageSet.lobby, imageSet.ballroom, imageSet.dining],
    menuItems: [
      { name: "Truffle Arancini", description: "Black garlic aioli", price: "$16", course: "Starter" },
      { name: "Aged Short Rib Sliders", description: "Caramelized onion and smoked cheddar", price: "$24", course: "Main" },
      { name: "Burnt Basque Cheesecake", description: "Sherry caramel", price: "$14", course: "Dessert" },
      { name: "Gold Standard", description: "House cocktail with saffron gin", price: "$22", course: "Signature" }
    ]
  }
];

export const treatments: Treatment[] = [
  {
    name: "Swedish Massage",
    duration: "60 min",
    price: "$180",
    description: "Long, flowing strokes ease tension while restoring circulation and deep calm.",
    image: imageSet.spa
  },
  {
    name: "Hot Stone",
    duration: "75 min",
    price: "$220",
    description: "Warm volcanic stones melt muscular stress and invite deeper release.",
    image: imageSet.pool
  },
  {
    name: "Facial",
    duration: "50 min",
    price: "$160",
    description: "A brightening ritual tailored to restore radiance, hydration, and tone.",
    image: imageSet.roomOne
  },
  {
    name: "Body Wrap",
    duration: "80 min",
    price: "$210",
    description: "A mineral-rich cocoon treatment designed to nourish and soften the skin.",
    image: imageSet.exterior
  },
  {
    name: "Hydrotherapy",
    duration: "45 min",
    price: "$140",
    description: "A warm-cool circuit to invigorate the senses and improve recovery.",
    image: imageSet.pool
  },
  {
    name: "Meditation",
    duration: "40 min",
    price: "$95",
    description: "Guided breathwork and sound healing for mental clarity and relaxation.",
    image: imageSet.lobby
  }
];

export const events: EventType[] = [
  {
    name: "Weddings",
    description: "Grand celebration setups and intimate outdoor vows shaped with dedicated event artistry.",
    image: imageSet.ballroom,
    capacity: "Up to 450 guests",
    packages: [
      {
        name: "Intimate",
        description: "Elegant ceremony styling, private dining, and dedicated planning.",
        price: "From $8,000",
        features: ["Ceremony styling", "Welcome toast", "Junior suite stay"]
      },
      {
        name: "Classic",
        description: "Full ballroom celebration with curated menu and guestroom block support.",
        price: "From $18,500",
        features: ["Ballroom setup", "Custom menu", "Guestroom block"]
      },
      {
        name: "Grand",
        description: "A destination-level celebration with welcome events and after-party production.",
        price: "From $32,000",
        features: ["Multi-day planning", "Production design", "Penthouse stay"]
      }
    ]
  },
  {
    name: "Conferences & MICE",
    description: "Flexible venues, polished technical support, and elevated hospitality for high-stakes gatherings.",
    image: imageSet.lobby,
    capacity: "Up to 600 delegates",
    packages: [
      {
        name: "Half-Day",
        description: "Morning or afternoon meeting package with AV and premium breaks.",
        price: "From $65 / guest",
        features: ["AV setup", "Coffee break", "Wi-Fi"]
      },
      {
        name: "Full-Day",
        description: "A full business day supported by curated catering and breakout rooms.",
        price: "From $120 / guest",
        features: ["Lunch", "Breakout rooms", "AV technician"]
      },
      {
        name: "Multi-Day",
        description: "Residential conferences with room blocks, transport, and concierge management.",
        price: "Custom proposal",
        features: ["Room block", "Transport", "Conference concierge"]
      }
    ]
  },
  {
    name: "Private Celebrations",
    description: "Birthdays, galas, and milestone dinners elevated with cinematic settings and attentive service.",
    image: imageSet.exterior,
    capacity: "20 to 300 guests",
    packages: [
      {
        name: "Salon Dinner",
        description: "A polished private dinner for milestone moments and close circles.",
        price: "From $3,800",
        features: ["Private salon", "Three-course menu", "Sommelier pairing"]
      },
      {
        name: "Garden Soiree",
        description: "An outdoor celebration with floral styling and live music staging.",
        price: "From $7,900",
        features: ["Garden venue", "Live music", "Custom decor"]
      },
      {
        name: "Mountain Studio Gala",
        description: "A full-scale event experience with thoughtful design and guest management.",
        price: "From $15,500",
        features: ["Production design", "Event host", "Arrival choreography"]
      }
    ]
  }
];

export const team: TeamMember[] = [
  {
    name: "Elise Marlowe",
    title: "General Manager",
    bio: "Elise leads the hotel with a focus on intuitive hospitality, design detail, and experiences that feel quietly unforgettable.",
    image: imageSet.lobby
  },
  {
    name: "Mateo Ricci",
    title: "Head Chef",
    bio: "Mateo's menus balance regional produce, modern craft, and precise restraint across every dining concept in the house.",
    image: imageSet.dining
  },
  {
    name: "Nadia Sorel",
    title: "Spa Director",
    bio: "Nadia curates wellbeing journeys that blend bodywork, sensory design, and the restorative tempo of ritual.",
    image: imageSet.spa
  },
  {
    name: "Jonah Vale",
    title: "Chief Concierge",
    bio: "Jonah shapes itineraries, private arrivals, and rare access experiences with warmth, precision, and local insight.",
    image: imageSet.exterior
  }
];

export const timeline: TimelineMilestone[] = [
  {
    year: "1923",
    title: "Founded",
    description: "The property began as a scenic retreat in Karjat, designed for restful stays, family gatherings, and nature-led escapes."
  },
  {
    year: "1956",
    title: "First Expansion",
    description: "A new guest wing and grand salon established the hotel as a destination for society gatherings."
  },
  {
    year: "1989",
    title: "Restoration",
    description: "A sensitive renovation preserved the propertyâ€™s character while renewing its guest experience."
  },
  {
    year: "2005",
    title: "Spa Opening",
    description: "The spa introduced a wellness philosophy centered on ritual, restoration, and sensory calm."
  },
  {
    year: "2018",
    title: "Dining Recognition",
    description: "The signature restaurant earned praise for a dining experience rooted in seasonality, craft, and warm hospitality."
  },
  {
    year: "2024",
    title: "Relaunch",
    description: "A bold relaunch reintroduced the hotel with cinematic interiors, new suites, and immersive guest programming."
  }
];

export const activities: Activity[] = [
  {
    title: "Sunrise Nature Walk",
    duration: "2 hours",
    image: imageSet.exterior,
    description: "A guided morning nature walk with breakfast baskets, fresh mountain air, and a peaceful golden-hour start."
  },
  {
    title: "Chef-Led Market Walk",
    duration: "3 hours",
    image: imageSet.dining,
    description: "Explore seasonal produce, regional ingredients, and culinary stories before returning for a tasting lunch."
  },
  {
    title: " Valley Tour",
    duration: "45 min",
    image: imageSet.homeHero,
    description: "A scenic perspective on the hills, waterfalls, and green surroundings that make Karjat such a memorable escape."
  },
  {
    title: "Wellness by Water",
    duration: "90 min",
    image: imageSet.pool,
    description: "Guided breathwork, hydrotherapy, and restorative movement designed to reset both body and pace."
  },
  {
    title: "Resort Art Trail",
    duration: "2 hours",
    image: imageSet.lobby,
    description: "A guided journey through the resort's art, corners, and design details with stories from the property."
  },
  // {
  //   title: "Moonlit Beach Cinema",
  //   duration: "Evening",
  //   image: imageSet.ballroom,
  //   description: "Private screening setup on the sand with candlelight dining, plush throws, and bespoke menus."
  // }
];

export const picnicPackages: PicnicPackage[] = [
  {
    title: "Garden Picnic",
    subtitle: "Among olive trees and linen canopies",
    image: imageSet.exterior,
    inclusions: ["Seasonal grazing menu", "Champagne service", "Live acoustic duo"]
  },
  {
    title: "Clifftop Sunset Picnic",
    subtitle: "A dramatic golden-hour setup by the sea",
    image: imageSet.homeHero,
    inclusions: ["Private butler", "Photographer on request", "Signature dessert cart"]
  },
  {
    title: "Family Day Picnic",
    subtitle: "Relaxed luxury with activities for all ages",
    image: imageSet.pool,
    inclusions: ["Kids adventure pack", "Chef-prepared lunch", "Outdoor games curation"]
  }
];

export const corporateHighlights: CorporateHighlight[] = [
  {
    title: "Boardroom Precision",
    description: "Executive-grade meeting suites with seamless AV, privacy, and concierge-managed timing.",
    stat: "8 private rooms"
  },
  {
    title: "Immersive Summits",
    description: "Hybrid-ready plenary spaces with staging, branding support, and elegant guest movement design.",
    stat: "600 delegate capacity"
  },
  {
    title: "Residential Retreats",
    description: "Strategy retreats combining suites, dining, wellness, and off-site programming in one itinerary.",
    stat: "3-day planning support"
  }
];
