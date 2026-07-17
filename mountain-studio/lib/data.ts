import {
  ChefHat,
  Dumbbell,
  Martini,
  Shell,
  Sparkles,
  TreePine,
  Waves,
  Wifi,
} from "lucide-react";
import type {
  Activity,
  Amenity,
  CorporateHighlight,
  NavLink,
  PicnicPackage,
  Restaurant,
  Room,
  Testimonial,
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
  { image: "/mountain-studio/gallery-04.jpeg", category: "Exterior", title: "Scenic garden-facing lawn" },
  { image: "/mountain-studio/gallery-05.jpeg", category: "Events", title: "Function detail frame" },
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
  { label: "Picnic", href: "/picnic" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Activities", href: "/activities" },
  { label: "Nearby tour", href: "/nearby-attractions" },
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
      "Designed for comfort, this room features modern facilities and a cozy ambiance for a pleasant stay in Goa.",
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
    slug: "swimming-pool",
    icon: Waves,
    title: "Swimming Pool",
    description: "A clean, well-maintained pool area for relaxation and leisure during your stay.",
    hours: "8:00 AM - 9:00 PM",
    image: imageSet.pool
  },
  {
    slug: "free-wifi",
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "Complimentary Wi-Fi access throughout the property for staying connected.",
    hours: "24 Hours",
    image: imageSet.lobby
  },
  {
    slug: "in-house-dining",
    icon: ChefHat,
    title: "In-House Dining",
    description: "On-site dining options serving breakfast, lunch, and dinner with a varied menu.",
    hours: "7:00 AM - 11:00 PM",
    image: imageSet.dining
  },
  {
    slug: "garden-lawn",
    icon: TreePine,
    title: "Garden Lawn",
    description: "Open green spaces around the property for morning walks, relaxation, and events.",
    hours: "Sunrise - Sunset",
    image: imageSet.exterior
  },
  {
    slug: "fitness-area",
    icon: Dumbbell,
    title: "Fitness Area",
    description: "Basic fitness equipment available for guests who want to stay active during their visit.",
    hours: "6:00 AM - 9:00 PM",
    image: imageSet.pool
  },
  {
    slug: "bar-lounge",
    icon: Martini,
    title: "Bar & Lounge",
    description: "A relaxed bar area for evening drinks, cocktails, and casual socializing.",
    hours: "5:00 PM - 11:00 PM",
    image: imageSet.lobby
  },
  {
    slug: "event-space",
    icon: Sparkles,
    title: "Event Space",
    description: "Indoor and outdoor areas available for private parties, celebrations, and small gatherings.",
    hours: "On request",
    image: imageSet.ballroom
  },
  {
    slug: "parking",
    icon: Shell,
    title: "Free Parking",
    description: "Complimentary on-site parking for guests arriving by private vehicle.",
    hours: "24 Hours",
    image: imageSet.exterior
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Sanjana Kulkarni",
    country: "India",
    rating: 5,
    quote: "From the moment we arrived, everything felt thoughtfully curated. The ambiance, service, and comfort were truly exceptional.",
    avatar: imageSet.roomOne,
    flag: "\ud83c\uddee\ud83c\uddf3"
  },
  {
    name: "Rahul Chatterjee",
    country: "India",
    rating: 5,
    quote: "A perfect blend of luxury and warmth. The hospitality made our short getaway feel incredibly special.",
    avatar: imageSet.exterior,
    flag: "\ud83c\uddee\ud83c\uddf3"
  },
  {
    name: "Divya Reddy",
    country: "India",
    rating: 5,
    quote: "The dining experience was outstanding. Every dish felt crafted with care and authentic flavors.",
    avatar: imageSet.dining,
    flag: "\ud83c\uddee\ud83c\uddf3"
  },
  {
    name: "Kunal Bansal",
    country: "India",
    rating: 4,
    quote: "Elegant yet relaxing. The private dinner arrangement and serene surroundings made it unforgettable.",
    avatar: imageSet.pool,
    flag: "\ud83c\uddee\ud83c\uddf3"
  },
  {
    name: "Pooja Saxena",
    country: "India",
    rating: 5,
    quote: "Our anniversary celebration here was magical. The team added thoughtful touches that made it truly memorable.",
    avatar: imageSet.spa,
    flag: "\ud83c\uddee\ud83c\uddf3"
  },
  {
    name: "Nikhil Pawar",
    country: "India",
    rating: 5,
    quote: "The design, the atmosphere, and the attention to detail make this place stand out from anywhere else.",
    avatar: imageSet.lobby,
    flag: "\ud83c\uddee\ud83c\uddf3"
  },
  {
    name: "Aishwarya Menon",
    country: "India",
    rating: 5,
    quote: "Calm, luxurious, and perfectly managed. The pool and garden area alone is worth visiting again.",
    avatar: imageSet.roomThree,
    flag: "\ud83c\uddee\ud83c\uddf3"
  },
  {
    name: "Harsh Vardhan",
    country: "India",
    rating: 5,
    quote: "We came for a family celebration and left with unforgettable memories. Truly personalized service.",
    avatar: imageSet.ballroom,
    flag: "\ud83c\uddee\ud83c\uddf3"
  }
];

export const restaurants: Restaurant[] = [
  {
    name: "The Garden Restaurant",
    cuisine: "Goan & Indian",
    hours: "7:00 AM - 11:00 PM",
    description: "A relaxed dining space serving Goan, Indian, and continental dishes with fresh ingredients and warm service.",
    image: imageSet.dining,
    gallery: [imageSet.dining, imageSet.lobby, imageSet.ballroom],
    menuItems: [
      { name: "Goan Fish Curry", description: "Fresh pomfret in coconut-based curry with rice", price: "\u20b9350", course: "Main" },
      { name: "Butter Chicken", description: "Creamy tomato-based curry with tender chicken", price: "\u20b9280", course: "Main" },
      { name: "Masala Dosa", description: "Crispy rice crepe with spiced potato filling", price: "\u20b9150", course: "Starter" },
      { name: "Gulab Jamun", description: "Warm milk-solid dumplings in rose-flavored syrup", price: "\u20b9120", course: "Dessert" }
    ]
  },
  {
    name: "Poolside Cafe",
    cuisine: "Casual All-Day Dining",
    hours: "8:00 AM - 10:00 PM",
    description: "Light meals, snacks, and refreshments served poolside for a casual dining experience between swims.",
    image: imageSet.pool,
    gallery: [imageSet.pool, imageSet.exterior, imageSet.dining],
    menuItems: [
      { name: "Veg Sandwich", description: "Grilled sandwich with fresh vegetables and cheese", price: "\u20b9180", course: "Starter" },
      { name: "Chicken Pizza", description: "Wood-fired pizza with tandoori chicken toppings", price: "\u20b9250", course: "Main" },
      { name: "Fresh Lime Soda", description: "Refreshing lime drink with soda", price: "\u20b980", course: "Starter" },
      { name: "Chocolate Brownie", description: "Warm brownie with vanilla ice cream", price: "\u20b9150", course: "Dessert" }
    ]
  },
  {
    name: "Bar & Lounge",
    cuisine: "Cocktails & Beverages",
    hours: "5:00 PM - 11:00 PM",
    description: "A relaxed evening space with cocktails, mocktails, and a curated selection of spirits for unwinding.",
    image: imageSet.lobby,
    gallery: [imageSet.lobby, imageSet.ballroom, imageSet.dining],
    menuItems: [
      { name: "Goan Feni Cocktail", description: "Local feni with lime and spices", price: "\u20b9250", course: "Signature" },
      { name: "Mango Lassi", description: "Creamy yogurt-based mango drink", price: "\u20b9120", course: "Starter" },
      { name: "Chicken Tikka Platter", description: "Grilled chicken tikka with mint chutney", price: "\u20b9320", course: "Starter" },
      { name: "Masala Chai", description: "Traditional Indian spiced tea", price: "\u20b960", course: "Starter" }
    ]
  }
];

export const activities: Activity[] = [
  {
    title: "Beach Visit",
    duration: "Half day",
    image: imageSet.exterior,
    description: "Head to nearby Baga Beach or Calangute Beach for a classic North Goa beach day experience."
  },
  {
    title: "Market Walk",
    duration: "2 hours",
    image: imageSet.dining,
    description: "Explore the Arpora Saturday Night Market or Anjuna Flea Market for local shopping and street food."
  },
  {
    title: "Poolside Relaxation",
    duration: "Flexible",
    image: imageSet.pool,
    description: "Unwind by the pool with a relaxed afternoon of sun, water, and resort leisure."
  },
  {
    title: "Sunset Viewing",
    duration: "1 hour",
    image: imageSet.homeHero,
    description: "Catch the sunset from the property or take a short ride to a beach viewpoint for golden-hour views."
  },
  {
    title: "Local Temple Visit",
    duration: "1.5 hours",
    image: imageSet.lobby,
    description: "Visit the nearby Chapora Fort or local temples for a cultural walk through North Goa heritage."
  },
  {
    title: "Water Sports",
    duration: "2 hours",
    image: imageSet.pool,
    description: "Enjoy parasailing, jet-skiing, and banana rides at Baga or Calangute beach during your stay."
  }
];

export const picnicPackages: PicnicPackage[] = [
  {
    title: "Garden Picnic",
    subtitle: "Relaxed outdoor dining in the resort garden",
    image: imageSet.exterior,
    inclusions: ["Freshly prepared snack menu", "Seating and shade setup", "Soft drink service"]
  },
  {
    title: "Poolside Gathering",
    subtitle: "A casual group setup near the pool area",
    image: imageSet.homeHero,
    inclusions: ["Pool access during event", "Light refreshment spread", "Music and seating"]
  },
  {
    title: "Family Day Picnic",
    subtitle: "Relaxed luxury with activities for all ages",
    image: imageSet.pool,
    inclusions: ["Kids activity corner", "Chef-prepared lunch", "Outdoor games setup"]
  }
];

export const corporateHighlights: CorporateHighlight[] = [
  {
    title: "Private Meeting Rooms",
    description: "Dedicated indoor spaces for board meetings, training sessions, and team discussions.",
    stat: "Multiple rooms available"
  },
  {
    title: "Group Accommodation",
    description: "Block bookings for corporate teams with direct coordination and flexible check-in support.",
    stat: "Up to 20 rooms"
  },
  {
    title: "Event Coordination",
    description: "On-ground support for team-building days, annual meets, and corporate social events.",
    stat: "Tailored planning"
  }
];
