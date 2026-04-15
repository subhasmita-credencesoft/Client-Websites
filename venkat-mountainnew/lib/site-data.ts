export type NavItem = {
  label: string;
  href: string;
};

export type RoomDetail = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  summary: string;
  description: string[];
  heroImage: string;
  gallery: string[];
  tariff: number;
  packagePrice: number;
  weekendPackagePrice: number;
  capacity: string;
  perfectFor: string;
  size: string;
  bedding: string;
  roomSpecs: string[];
  amenities: string[];
  idealFor: { title: string; description: string }[];
  highlightPoints: string[];
};

export type PackagePlan = {
  slug: string;
  name: string;
  description: string;
  weekdayPrice: number;
  weekendPrice: number;
  inclusions: string[];
  upgrades?: string[];
};

export const siteMeta = {
  name: "The Mountain by Redwings",
  tagline: "Green Beauty in 7 Acres",
  subline: "Destination Wedding & Event Venue",
  location: "Karjat, Maharashtra",
  bookingEngineHref: "https://bookone.io/the-mountain-by-redwings?bookingEngine=true",
  phone: "+91 98338 66655",
  phoneHref: "tel:+919833866655",
  altPhone: "+91 98920 11179",
  altPhoneHref: "tel:+919892011179",
  email: "events@themountainbyredwings.com",
  hours: "Monday - Sunday, 9:00 AM - 7:00 PM",
  address: "The Mountain by Redwings, Karjat, Maharashtra",
  instagram: "instagram.com/themountain.karjat",
  instagramHref: "https://instagram.com/themountain.karjat",
  website: "themountainresorts.com",
  websiteHref: "https://themountainresorts.com",
};

export const imageCatalog = {
  stayRoom01: "https://bookonelocal.in/cdn/DSC08717.avif",
  stayRoom02: "https://bookonelocal.in/cdn/DSC08720.avif",
  bungalow: "https://bookonelocal.in/cdn/DSC08758.avif",
  stayEstate: "https://bookonelocal.in/cdn/DSC08759.avif",
  mountainView01: "https://bookonelocal.in/cdn/DSC08763.avif",
  cliffRoom: "https://bookonelocal.in/cdn/DSC08769.avif",
  weddingZone: "https://bookonelocal.in/cdn/DSC08801.avif",
  glassCottage: "https://bookonelocal.in/cdn/DSC08802.avif",
  estateCorner: "https://bookonelocal.in/cdn/DSC08807.avif",
  familyRoom: "https://bookonelocal.in/cdn/DSC08812.avif",
  eventSpace: "https://bookonelocal.in/cdn/DSC08820.avif",
  weddingLawn01: "https://bookonelocal.in/cdn/DSC08831.avif",
  celebrationSpace: "https://bookonelocal.in/cdn/DSC08836.avif",
  mountainView02: "https://bookonelocal.in/cdn/DSC08837.avif",
  poolside01: "https://bookonelocal.in/cdn/DSC08846.avif",
  poolside02: "https://bookonelocal.in/cdn/DSC08849.avif",
  weddingLawn02: "https://bookonelocal.in/cdn/DSC08853.avif",
} as const;

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rooms & Stay", href: "/rooms" },
  { label: "Packages", href: "/offers" },
  { label: "Wedding Venues", href: "/wedding-lawns" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rules", href: "/rules" },
  { label: "Contact", href: "/contact" },
];

export const roomDetails: RoomDetail[] = [
  {
    slug: "standard-room",
    name: "Standard Room",
    shortName: "Standard",
    category: "Guest Accommodation",
    tagline: "Comfortable stay planning for wedding guests and family groups.",
    summary:
      "A practical and polished room category for guests who want convenience, comfort, and quick movement between stays, meals, and functions.",
    description: [
      "The Standard Room is built for destination wedding guest comfort, with clean layouts, attached bath, and dependable in-room essentials for smooth multi-day stays.",
      "It works well for invited guests, elder family members, and room blocks that need value, consistency, and easy access to the estate's celebration zones.",
    ],
    heroImage: imageCatalog.stayRoom01,
    gallery: [imageCatalog.stayRoom01, imageCatalog.stayRoom02, imageCatalog.stayEstate, imageCatalog.mountainView01],
    tariff: 7000,
    packagePrice: 4500,
    weekendPackagePrice: 5500,
    capacity: "2 Guests",
    perfectFor: "Wedding guests, families, short leisure stays",
    size: "300 sq. ft.",
    bedding: "Queen Bed",
    roomSpecs: ["Attached bathroom", "Air conditioning", "Wardrobe storage", "Hot water"],
    amenities: ["WiFi", "Television", "Room service", "Tea coffee setup", "Housekeeping", "Parking access"],
    idealFor: [
      {
        title: "Wedding Guests",
        description: "A strong fit for room blocks that need comfort, value, and easy stay coordination.",
      },
      {
        title: "Family Stays",
        description: "Useful for families attending multiple ceremonies across a two or three day celebration.",
      },
      {
        title: "Short Getaways",
        description: "A dependable option for guests extending their Karjat stay beyond the wedding.",
      },
    ],
    highlightPoints: ["Comfort-first layouts", "Easy access to event areas", "Balanced tariff for group bookings"],
  },
  {
    slug: "cliff-room",
    name: "Cliff Room",
    shortName: "Cliff",
    category: "Premium View Stay",
    tagline: "A more elevated room choice for close family and key invitees.",
    summary:
      "Designed as an upgraded stay tier for hosts, premium guests, and those who should experience a slightly more special rooming profile.",
    description: [
      "The Cliff Room offers a more premium accommodation feel with a stronger sense of privacy, room quality, and celebratory comfort.",
      "It is especially suitable for close family, VIP invitees, and core wedding members who need a room category that feels a step above the standard guest stay.",
    ],
    heroImage: imageCatalog.cliffRoom,
    gallery: [imageCatalog.cliffRoom, imageCatalog.mountainView01, imageCatalog.mountainView02, imageCatalog.estateCorner],
    tariff: 9000,
    packagePrice: 5000,
    weekendPackagePrice: 6000,
    capacity: "2 Guests",
    perfectFor: "VIP guests, couple stays, close family",
    size: "360 sq. ft.",
    bedding: "King Bed",
    roomSpecs: ["Enhanced interiors", "Premium bath fittings", "Lounge seating", "Better privacy"],
    amenities: ["WiFi", "Television", "Air conditioning", "Luxury linens", "Room service", "Housekeeping"],
    idealFor: [
      {
        title: "Parents & Close Family",
        description: "Useful when immediate family or senior hosts need a more premium stay tier.",
      },
      {
        title: "VIP Invitees",
        description: "Works well for premium guest allotments during destination weddings and receptions.",
      },
      {
        title: "Couple Extensions",
        description: "A more relaxed room profile for post-event unwinding or pre-wedding stays.",
      },
    ],
    highlightPoints: ["Premium guest positioning", "More private feel", "Good fit for key wedding members"],
  },
  {
    slug: "family-room",
    name: "Family Room",
    shortName: "Family",
    category: "Large Format Stay",
    tagline: "Spacious accommodation for families attending the full celebration schedule.",
    summary:
      "The Family Room helps large groups stay together more comfortably while remaining connected to the event flow across the estate.",
    description: [
      "This room format is planned for larger family clusters and guests who want to stay together through haldi, mehendi, sangeet, and reception events.",
      "It makes wedding logistics easier by reducing split rooming while giving enough space for luggage, children, elders, and longer-duration stays.",
    ],
    heroImage: imageCatalog.familyRoom,
    gallery: [imageCatalog.familyRoom, imageCatalog.stayRoom02, imageCatalog.stayEstate, imageCatalog.estateCorner],
    tariff: 12000,
    packagePrice: 4500,
    weekendPackagePrice: 5500,
    capacity: "4 Guests",
    perfectFor: "Families, group bookings, long wedding weekends",
    size: "480 sq. ft.",
    bedding: "King + Extra Bedding",
    roomSpecs: ["Larger floor plan", "Family seating zone", "Flexible bedding", "Storage for longer stays"],
    amenities: ["WiFi", "Television", "Air conditioning", "Hot water", "Housekeeping", "Room service"],
    idealFor: [
      {
        title: "Families with Children",
        description: "Keeps parents and children in one comfortable space during the wedding stay.",
      },
      {
        title: "Extended Family",
        description: "Useful for family members arriving together and moving through every event on the schedule.",
      },
      {
        title: "Multi-Day Celebrations",
        description: "A practical fit when room comfort needs to support a full destination wedding itinerary.",
      },
    ],
    highlightPoints: ["Built for group convenience", "Helpful for longer stays", "Simplifies family rooming"],
  },
  {
    slug: "glass-cottage",
    name: "Signature Cottage",
    shortName: "Cottage",
    category: "Signature Stay",
    tagline: "A more exclusive accommodation pick for memorable wedding moments.",
    summary:
      "A standout stay option for the couple, premium invitees, or guests who want a more distinctive room experience within the estate.",
    description: [
      "The Signature Cottage is positioned as one of the more memorable stay options on the property, suitable for the wedding couple, close family, or premium hosted guests.",
      "Its role in the stay mix is to bring a more exclusive feel to the accommodation plan while still keeping guests connected to the event journey and estate services.",
    ],
    heroImage: imageCatalog.glassCottage,
    gallery: [imageCatalog.glassCottage, imageCatalog.weddingZone, imageCatalog.estateCorner, imageCatalog.mountainView01],
    tariff: 15000,
    packagePrice: 6500,
    weekendPackagePrice: 7500,
    capacity: "2 Guests",
    perfectFor: "The couple, special guests, premium rooming",
    size: "420 sq. ft.",
    bedding: "King Bed",
    roomSpecs: ["Upgraded room profile", "Premium furnishing", "Event-friendly access", "Privacy-oriented layout"],
    amenities: ["WiFi", "Air conditioning", "Television", "Room service", "Premium toiletries", "Housekeeping"],
    idealFor: [
      {
        title: "Wedding Couple",
        description: "A more premium and memorable stay for the central wedding experience.",
      },
      {
        title: "Celebration Hosts",
        description: "Useful when lead hosts need a room that feels elevated and less standard.",
      },
      {
        title: "Premium Guests",
        description: "An easy upgrade path for guests who should receive a stronger hospitality impression.",
      },
    ],
    highlightPoints: ["More exclusive room feel", "Good for premium hosting", "Supports special-stay moments"],
  },
  {
    slug: "bungalow",
    name: "Private Bungalow",
    shortName: "Bungalow",
    category: "Group Residence",
    tagline: "A private group stay solution for hosts and larger family circles.",
    summary:
      "The Private Bungalow works as a self-contained stay base for host families, planners, or core wedding groups who want more privacy and coordination ease.",
    description: [
      "The bungalow format is especially useful for the wedding side that needs extra privacy, better gathering space, and smoother internal coordination during the event.",
      "If the guest count exceeds 140 people, an additional nearby 10 BHK property can also be arranged at extra cost to support overflow accommodation planning.",
    ],
    heroImage: imageCatalog.bungalow,
    gallery: [imageCatalog.bungalow, imageCatalog.stayEstate, imageCatalog.eventSpace, imageCatalog.weddingLawn01],
    tariff: 25000,
    packagePrice: 6500,
    weekendPackagePrice: 7500,
    capacity: "6 Guests",
    perfectFor: "Host families, bridal parties, premium groups",
    size: "1000 sq. ft.",
    bedding: "Multiple Bedrooms",
    roomSpecs: ["Private gathering area", "Multiple sleeping spaces", "Extra privacy", "Better family coordination"],
    amenities: ["WiFi", "Television", "Room service", "Private seating", "Hot water", "Air conditioning"],
    idealFor: [
      {
        title: "Bride & Groom Families",
        description: "Makes coordination easier by keeping the core family group together in one stay unit.",
      },
      {
        title: "Bridal Parties",
        description: "Helpful for makeup teams, outfit changes, and pre-function coordination.",
      },
      {
        title: "Host Operations",
        description: "A strong base for planners or hosts who need extra privacy and more room to work from.",
      },
    ],
    highlightPoints: ["Most private stay option", "Useful for host families", "Supports large-format event logistics"],
  },
];

export const packages: PackagePlan[] = [
  {
    slug: "classic",
    name: "Classic Celebration",
    description: "A clean all-inclusive wedding package built for comfortable destination celebrations.",
    weekdayPrice: 4500,
    weekendPrice: 5500,
    inclusions: [
      "Stay accommodation",
      "Breakfast, hi-tea, lunch, starters, and dinner",
      "Lawn access and venue usage",
      "Unlimited music hours on the lawn",
      "24x7 pool access",
      "Private estate access",
      "Parking and hospitality support",
    ],
  },
  {
    slug: "signature",
    name: "Signature Wedding",
    description: "A richer meal plan and stronger guest service layer for larger hosted events.",
    weekdayPrice: 5500,
    weekendPrice: 6500,
    inclusions: [
      "Everything in Classic Celebration",
      "Additional starters and menu enhancements",
      "Improved meal variety across lunch and dinner",
      "Dedicated celebration coordination support",
      "Flexible rooming assistance",
    ],
  },
  {
    slug: "premium-luxe",
    name: "Premium Luxe",
    description: "A fuller premium format for couples planning a more elevated destination wedding experience.",
    weekdayPrice: 6500,
    weekendPrice: 7500,
    inclusions: [
      "Everything in Signature Wedding",
      "Live counters on request",
      "Premium food presentation",
      "Higher-touch host coordination",
      "Late checkout support subject to availability",
    ],
  },
];

export const homeTestimonials = [
  {
    quote:
      "The private-estate feel and the green backdrop gave our wedding exactly the mood we wanted. Guests loved the comfort and the openness of the property.",
    name: "A Wedding Couple",
  },
  {
    quote:
      "It was easy to map haldi, sangeet, rooms, meals, and reception in one place. That clarity is a big advantage when planning a destination wedding.",
    name: "Event Planner",
  },
  {
    quote:
      "The stay, service, and venue flow felt well managed, and the property gave us the privacy we wanted for our full celebration.",
    name: "Family Host",
  },
];

export const faqItems = {
  offers: [
    {
      question: "What is included in the per person package?",
      answer:
        "Packages are structured per person per day and include stay, meals, services, lawn access, and venue usage.",
    },
    {
      question: "Can the menu be customized?",
      answer:
        "Yes. Additional starters, meal upgrades, live counters, and premium service enhancements can be discussed based on the event brief.",
    },
    {
      question: "Is the whole venue private for us?",
      answer:
        "Packages are planned around full venue access and private-estate style hosting so the property feels exclusively yours during the event.",
    },
    {
      question: "What if our guest count exceeds 140?",
      answer:
        "A nearby 10 BHK property is also available at additional cost to support larger group accommodation requirements.",
    },
  ],
  rules: [
    {
      question: "How much advance is required to block dates?",
      answer:
        "A 50% advance is required to confirm the booking, and the remaining 50% is due before check-in.",
    },
    {
      question: "Is the advance refundable?",
      answer:
        "The advance is non-refundable, but dates can be rescheduled subject to availability and operational approval.",
    },
    {
      question: "Are outside vendors allowed?",
      answer:
        "Decorators and approved vendors are allowed with prior approval so the property team can manage access and operations smoothly.",
    },
    {
      question: "Can we play music late at night?",
      answer:
        "Music is allowed on the lawn with strong flexibility and no separate sound license requirement, while all use should remain respectful within property limits.",
    },
  ],
  booking: [
    {
      question: "How is the final package cost calculated?",
      answer:
        "The final package cost is aligned to the confirmed guest count, selected package tier, and stay duration before arrival.",
    },
    {
      question: "How quickly will the team respond?",
      answer:
        "Most inquiries are answered during business hours, and wedding-related calls and event briefs are usually handled the same day.",
    },
    {
      question: "What should we share in our inquiry?",
      answer:
        "Preferred dates, guest count, event type, room needs, and any vendor or decor requirements are the most useful details to include.",
    },
  ],
};

export const galleryImages = [
  { src: imageCatalog.stayRoom01, category: "Stay Experiences", title: "Guest room prepared for wedding stay comfort" },
  { src: imageCatalog.stayRoom02, category: "Stay Experiences", title: "Stay details that support family hosting across celebration weekends" },
  { src: imageCatalog.bungalow, category: "Stay Experiences", title: "Premium bungalow stay for hosts or close family" },
  { src: imageCatalog.stayEstate, category: "Stay Experiences", title: "Accommodation that keeps wedding guests together in one estate" },
  { src: imageCatalog.mountainView01, category: "Mountain View Destination", title: "Mountain view destination" },
  { src: imageCatalog.cliffRoom, category: "Stay Experiences", title: "Cliff room stay with scenic destination atmosphere" },
  { src: imageCatalog.weddingZone, category: "Wedding Moments", title: "Private celebration zone within the estate" },
  { src: imageCatalog.glassCottage, category: "Stay Experiences", title: "Glass cottage stay for premium guest planning" },
  { src: imageCatalog.estateCorner, category: "Wedding Moments", title: "Elegant estate corner for family-led celebrations" },
  { src: imageCatalog.familyRoom, category: "Stay Experiences", title: "Family room interior for group accommodation" },
  { src: imageCatalog.eventSpace, category: "Wedding Moments", title: "Private event space for ceremonies and rituals" },
  { src: imageCatalog.weddingLawn01, category: "Wedding Lawns", title: "Wedding lawn and landscape ready for ceremonies" },
  { src: imageCatalog.celebrationSpace, category: "Wedding Moments", title: "Celebration space designed for event flow" },
  { src: imageCatalog.mountainView02, category: "Mountain View Destination", title: "Scenic lawn with mountain wedding ambience" },
  { src: imageCatalog.poolside01, category: "Poolside Celebrations", title: "Poolside celebration area for cocktail and leisure moments" },
  { src: imageCatalog.poolside02, category: "Poolside Celebrations", title: "Scenic poolside event setting with destination energy" },
  { src: imageCatalog.weddingLawn02, category: "Wedding Lawns", title: "Wedding lawns and event-ready private estate" },
];
