export type DetailPage = {
  slug: string;
  title: string;
  subtitle: string;
  introTitle: string;
  introBody: string;
  heroImage: string;
  cards: Array<{
    label: string;
    title: string;
    description: string;
    image: string;
  }>;
  galleryTabs: string[];
  galleryImage: string;
  galleryImages?: string[];
  galleryVideos?: string[];
  packageComparison?: {
    weekday: {
      title: string;
      rows: Array<{
        package: string;
        price: string;
        includes: string;
      }>;
    };
    weekend: {
      title: string;
      rows: Array<{
        package: string;
        price: string;
        includes: string;
      }>;
    };
    meals: {
      title: string;
      items: string[];
      note: string;
    };
  };
};

type DetailSeed = {
  slug: string;
  title: string;
  subtitle: string;
  introTitle: string;
  introBody: string;
  heroImage: string;
  cards: DetailPage["cards"];
  galleryTabs: string[];
  galleryImage: string;
  galleryImages?: DetailPage["galleryImages"];
  galleryVideos?: DetailPage["galleryVideos"];
  packageComparison?: DetailPage["packageComparison"];
};

const standardPackageComparison = {
  weekday: {
    title: "Weekday - Monday to Thursday",
    rows: [
      { package: "Classic", price: "Rs. 4,500", includes: "5 Meals + Stay + Venue Access" },
      { package: "Signature", price: "Rs. 5,500", includes: "Classic Package + Extra 2 Starter + 1 Gravy extra each in Lunch and Dinner" },
      { package: "Premium Luxe", price: "Rs. 6,500", includes: "Signature Package + 2 Live Counters" },
    ],
  },
  weekend: {
    title: "Weekend - Friday to Sunday",
    rows: [
      { package: "Classic", price: "Rs. 5,500", includes: "5 Meals + Stay + Venue Access" },
      { package: "Signature", price: "Rs. 6,500", includes: "Classic Package + Extra 2 Starter + 1 Gravy extra each in Lunch and Dinner" },
      { package: "Premium Luxe", price: "Rs. 7,500", includes: "Signature Package + 2 Live Counters" },
    ],
  },
  meals: {
    title: "Meals Includes",
    items: [
      "Lunch - Roti, 2 Sabji, Dal, Rice, Salad, Papad & Pickle",
      "Hi-Tea - Tea/Coffee & 2 Snacks",
      "Starters - 2 Starters",
      "Dinner - Roti, 2 Sabji, Dal, Rice, Salad, Papad & Pickle",
      "Breakfast - Tea/Coffee & 2 Dishes",
    ],
    note:
      "Note: Additional items can be customised as per your preference and will be charged separately on a per-person, per-day basis.",
  },
} satisfies NonNullable<DetailPage["packageComparison"]>;

const standardRoomCards = [
  {
    label: "ROOM TYPE",
    title: "Standard Room",
    description: "Comfortable premium room designed for practical stays with modern essentials and a relaxed guest experience.",
    image: "/images/DSC08717.avif  ",
  },
  {
    label: "INCLUSION",
    title: "Package Includes",
    description: "Per person package includes stay and all meals, making the Standard Room a practical and value-led option for guests.",
    image: "/images/DSC08720.avif",
  },
] satisfies DetailPage["cards"];

const cliffRoomCards = [
  {
    label: "ROOM TYPE",
    title: "Cliff Room",
    description: "Scenic premium room offering added privacy, calm ambience, and a more elevated stay experience.",
    image: "/images/DSC08769.avif",
  },
  {
    label: "INCLUSION",
    title: "Premium Stay Benefits",
    description: "Cliff Room stays combine scenic ambience with a stay plus all meals package suited for premium guest accommodation.",
    image: "/images/DSC08801.avif",
  },
] satisfies DetailPage["cards"];

const familyRoomCards = [
  {
    label: "ROOM TYPE",
    title: "Family Room",
    description: "Spacious family-friendly accommodation planned for group comfort, convenience, and easy event stays.",
    image: "/images/DSC08812.avif",
  },
  {
    label: "INCLUSION",
    title: "Wedding Guest Comfort",
    description: "Family-friendly room planning supports group accommodation with a stay plus all meals package for event-day convenience.",
    image: "/images/DSC08820.avif",
  },
] satisfies DetailPage["cards"];

const classicCottageCards = [
  {
    label: "ROOM TYPE",
    title: "Glass Cottage",
    description: "Private cottage-style stay with a quieter atmosphere, more exclusivity, and a distinctive room experience.",
    image: "/images/DSC08802.avif",
  },
  {
    label: "INCLUSION",
    title: "Private Cottage Stay",
    description: "Glass Cottage stays offer a more private accommodation choice with stay and all meals included in the package.",
    image: "/images/DSC08807.avif",
  },
] satisfies DetailPage["cards"];

const bungalowCards = [
  {
    label: "ROOM TYPE",
    title: "Bungalow",
    description: "Large premium bungalow stay ideal for families and groups who need more space and longer-stay comfort.",
    image: "/images/DSC08758.avif",
  },
  {
    label: "INCLUSION",
    title: "Spacious Premium Stay",
    description: "Best suited for families or groups needing larger furnished accommodation with stay and all meals included in the package.",
    image: "/images/DSC08759.avif",
  },
] satisfies DetailPage["cards"];

const detailPageSeeds: DetailSeed[] = [
  {
    slug: "garden-villa-resort",
    title: "Standard Room",
    subtitle: "Comfortable premium room accommodation with modern essentials for relaxed guest stays.",
    introTitle: "STAY DETAILS",
    introBody:
      "Standard Room accommodation at The Mountain is designed for practical comfort with a room tariff of Rs. 5,000 and a stay plus all meals package at Rs. 3,000 per person.",
    heroImage: "/images/DSC08717.avif",
    cards: standardRoomCards,
    galleryTabs: ["Exterior", "Standard Room", "Guest Stay"],
    galleryImage: "/images/DSC08720.avif",
  },
  {
    slug: "luxury-resort",
    title: "Cliff Room",
    subtitle: "Scenic premium room stay designed for guests who prefer added privacy and ambience.",
    introTitle: "STAY DETAILS",
    introBody:
      "Cliff Room accommodation at The Mountain is designed for guests who want scenic ambience with a room tariff of Rs. 6,500 and a stay plus all meals package at Rs. 3,500 per person.",
    heroImage: "/images/DSC08769.avif",
    cards: cliffRoomCards,
    galleryTabs: ["Exterior", "Cliff Room", "Premium Stay"],
    galleryImage: "/images/DSC08801.avif",
  },
  {
    slug: "camp-della-resort-room",
    title: "Family Room",
    subtitle: "Spacious family-oriented accommodation suited for group stays and event guest comfort.",
    introTitle: "STAY DETAILS",
    introBody:
      "Family Room stays at The Mountain support group and family accommodation with a room tariff of Rs. 20,000 and a stay plus all meals package at Rs. 2,500 per person.",
    heroImage: "/images/DSC08812.avif",
    cards: familyRoomCards,
    galleryTabs: ["Exterior", "Family Room", "Guest Stay"],
    galleryImage: "/images/DSC08820.avif",
  },
  {
    slug: "adventure-resort",
    title: "Glass Cottage",
    subtitle: "Private cottage-style stay experience with a quieter, more exclusive accommodation feel.",
    introTitle: "STAY DETAILS",
    introBody:
      "Glass Cottage accommodation provides a more private stay option with a room tariff of Rs. 12,000 and a stay plus all meals package at Rs. 7,500 per person.",
    heroImage: "/images/DSC08802.avif",
    cards: classicCottageCards,
    galleryTabs: ["Exterior", "Glass Cottage", "Guest Stay"],
    galleryImage: "/images/DSC08807.avif",
  },
  {
    slug: "della-enclave-villa-rooms",
    title: "Bungalow",
    subtitle: "Large premium bungalow accommodation created for families, groups, and longer private stays.",
    introTitle: "STAY DETAILS",
    introBody:
      "Bungalow accommodation at The Mountain is ideal for guests who need spacious premium furnished stays with a bungalow tariff of Rs. 25,000 and a stay plus all meals package at Rs. 3,500 per person.",
    heroImage: "/images/DSC08758.avif",
    cards: bungalowCards,
    galleryTabs: ["Exterior", "Bungalow", "Premium Stay"],
    galleryImage: "/images/DSC08759.avif",
  },
  {
    slug: "della-data-resort",
    title: "Premium Stay",
    subtitle: "A curated overview of furnished premium stay options prepared for destination event guests.",
    introTitle: "STAY DETAILS",
    introBody:
      "All available guest properties at The Mountain are prepared for comfortable accommodation across weddings, rituals, family stays, and event functions.",
    heroImage: "/images/DSC08831.avif",
    cards: bungalowCards,
    galleryTabs: ["Exterior", "Premium Stay", "Guest Stay"],
    galleryImage: "/images/DSC08837.avif",
  },
  {
    slug: "della-suites",
    title: "Quotation & Package Details",
    subtitle: "Selected package, dates, guest count, and stay duration determine the final quotation estimate.",
    introTitle: "QUOTATION SUMMARY",
    introBody:
      "The Mountain quotation is based on selected package, total guests, weekday or weekend booking, and required stay duration for the event.",
    heroImage: "/images/DSC08846.avif",
    cards: [
      {
        label: "PACKAGE",
        title: "Weekday Package",
        description: "Monday to Thursday package options include Classic at Rs. 4,500, Signature at Rs. 5,500, and Premium Luxe at Rs. 6,500 per person.",
        image: "/images/DSC08853.avif",
      },
      {
        label: "PACKAGE",
        title: "Weekend Package",
        description: "Friday to Sunday package options include Classic at Rs. 5,500, Signature at Rs. 6,500, and Premium Luxe at Rs. 7,500 per person.",
        image: "/images/DSC08717.avif",
      },
    ],
    galleryTabs: ["Weekday", "Weekend", "Summary"],
    galleryImage: "/images/DSC08720.avif",
  },
  {
    slug: "cafe24",
    title: "Meals Includes",
    subtitle: "Lunch, hi-tea, starters, dinner, breakfast, venue access, and live counters as per package.",
    introTitle: "MEALS",
    introBody:
      "Meals at The Mountain are package-led and may include roti, sabji, dal, rice, salad, papad, pickle, hi-tea, starters, breakfast, tea, coffee, and live counters.",
    heroImage: "/images/DSC08758.avif",
    cards: [
      {
        label: "MEAL",
        title: "Lunch & Hi-Tea",
        description: "Lunch includes roti, 2 sabji, dal, rice, salad, papad, and pickle, while hi-tea includes tea or coffee with 2 snacks.",
        image: "/images/DSC08759.avif",
      },
      {
        label: "MEAL",
        title: "Dinner & Breakfast",
        description: "Dinner includes roti, 2 sabji, dal, rice, salad, papad, and pickle, while breakfast includes tea or coffee with 2 dishes.",
        image: "/images/DSC08763.avif",
      },
    ],
    galleryTabs: ["Lunch", "Dinner", "Hospitality"],
    galleryImage: "/images/DSC08769.avif",
  },
  {
    slug: "villa-bistro",
    title: "Mountain View Destination",
    subtitle: "7 acres of green landscape, scenic views, natural beauty, and a destination backdrop for celebrations.",
    introTitle: "VENUE HIGHLIGHTS",
    introBody:
      "The Mountain offers scenic mountain surroundings, green natural landscape, spacious lawns, and beautiful photography-ready destination ambience for wedding events.",
    heroImage: "/images/DSC08801.avif",
    cards: [
      {
        label: "VENUE",
        title: "Scenic Valley-Facing Ambience",
        description: "Scenic surroundings create a strong backdrop for wedding photography and immersive guest experiences.",
        image: "/images/DSC08802.avif",
      },
      {
        label: "VENUE",
        title: "Beautiful Destination Setting",
        description: "The property blends natural views and open event-ready space for memorable ceremonies and hospitality planning.",
        image: "/images/DSC08807.avif",
      },
    ],
    galleryTabs: ["Scenic Views", "Lawns", "Destination"],
    galleryImage: "/images/DSC08812.avif",
  },
  {
    slug: "key-advantages",
    title: "Key Advantages",
    subtitle: "Unlimited music hours, full venue access, private estate comfort, and wedding-ready destination flexibility.",
    introTitle: "KEY ADVANTAGES",
    introBody:
      "The Mountain, Karjat is designed for destination weddings with unlimited music hours, 24x7 pool access, zero sound license requirement, full venue control, private estate privacy, and spaces ideal for all wedding functions.",
    heroImage: "/images/DSC08820.avif",
    cards: [
      {
        label: "ADVANTAGE",
        title: "Unlimited Music Hours",
        description: "Enjoy music anytime on the lawn within property limits, giving wedding celebrations more flexibility and energy.",
        image: "/images/DSC08836.avif",
      },
      {
        label: "ADVANTAGE",
        title: "24x7 Pool Access",
        description: "Take a dip or unwind whenever you like, with pool access adding leisure value to the destination wedding stay.",
        image: "/images/DSC08849.avif",
      },
      {
        label: "ADVANTAGE",
        title: "Full Venue & Private Estate Access",
        description: "The entire property is exclusively yours for the event, supporting privacy, smooth event flow, and full celebration control.",
        image: "/images/DSC08831.avif",
      },
      {
        label: "ADVANTAGE",
        title: "Perfect For All Wedding Events",
        description: "Ideal for sangeet, haldi, mehendi, cocktails, receptions, and pool plus rain dance celebrations with scenic backdrops.",
        image: "/images/DSC08837.avif",
      },
    ],
    galleryTabs: ["Music", "Pool Access", "Venue Access", "Wedding Events"],
    galleryImage: "/images/DSC08846.avif",
  },
  {
    slug: "rules",
    title: "Rules & Regulations",
    subtitle: "Guest ID, vendor approval, property limits, and responsible usage guidelines for event stays.",
    introTitle: "RULES",
    introBody:
      "Government ID is mandatory for staying guests, outside catering is not allowed in package bookings, property damage is chargeable, vendors require prior approval, loud music must remain within property limits, smoking is allowed only in designated areas, and lost belongings remain the guest's responsibility.",
    heroImage: "/images/DSC08853.avif",
    cards: [
      {
        label: "RULES",
        title: "Guest & Vendor Policy",
        description: "Staying guests require valid ID, outside catering is not allowed in package bookings, and decorators or vendors need prior property approval before execution.",
        image: "/images/DSC08717.avif",
      },
      {
        label: "RULES",
        title: "Property Terms",
        description: "Property damage is chargeable, loud music must remain within limits, smoking is only in designated areas, and guest belongings remain under guest responsibility.",
        image: "/images/DSC08720.avif",
      },
    ],
    galleryTabs: ["Rules", "Policies", "Terms"],
    galleryImage: "/images/DSC08758.avif",
  },
  {
    slug: "check-in",
    title: "Check-In / Payment Terms",
    subtitle: "50% advance to block dates with check-in, check-out, and headcount-based billing terms.",
    introTitle: "PAYMENT TERMS",
    introBody:
      "Check-in time is 2 PM, check-out time is 11 AM, 50% advance is required to block dates, the remaining 50% is due before check-in, packages are calculated on the final headcount, and the advance is non-refundable though dates may be rescheduled subject to availability.",
    heroImage: "/images/DSC08759.avif",
    cards: [
      {
        label: "TERMS",
        title: "Check-In Details",
        description: "Check-in starts at 2 PM and check-out is at 11 AM to support smooth operational planning during multi-day destination events.",
        image: "/images/DSC08763.avif",
      },
      {
        label: "TERMS",
        title: "Advance & Billing",
        description: "50% advance blocks the date, remaining payment is due before check-in, final billing depends on headcount, and date changes remain subject to availability.",
        image: "/images/DSC08769.avif",
      },
    ],
    galleryTabs: ["Check-In", "Payment", "Booking"],
    galleryImage: "/images/DSC08801.avif",
  },
  {
    slug: "quotation",
    title: "Quotation & Final Estimate",
    subtitle: "Selected package, guest count, dates, and stay duration determine the final quotation at The Mountain, Karjat.",
    introTitle: "QUOTATION SUMMARY",
    introBody:
      "The final quotation is prepared based on event type, venue selection, booking dates, selected package, total guests, weekday or weekend booking, and the stay required for the celebration.",
    heroImage: "/images/DSC08802.avif",
    cards: [
      {
        label: "QUOTATION",
        title: "Selected Package & Event Type",
        description: "Event type: Wedding. Venue: The Mountain, Karjat. Final costing depends on whether the selected package is Classic, Signature, or Premium Luxo.",
        image: "/images/DSC08807.avif",
      },
      {
        label: "QUOTATION",
        title: "Dates, Guests & Stay",
        description: "Dates, total guests, weekday or weekend booking, and the total stay required all directly influence the final quotation estimate.",
        image: "/images/DSC08812.avif",
      },
      {
        label: "QUOTATION",
        title: "Billing Basis",
        description: "Packages are calculated per person per day, inclusive of stay, meals, services, lawn access, and venue usage, with final billing based on the confirmed headcount.",
        image: "/images/DSC08820.avif",
      },
      {
        label: "QUOTATION",
        title: "Booking Note",
        description: "50% advance is required to block dates. Remaining payment terms, headcount confirmation, and schedule alignment are finalized before check-in.",
        image: "/images/DSC08836.avif",
      },
    ],
    galleryTabs: ["Package", "Guests", "Estimate", "Booking"],
    galleryImage: "/images/DSC08849.avif",
  },
  {
    slug: "salaam-manekshaw",
    title: "Private Event Spaces",
    subtitle: "Dedicated areas for ceremonies, rituals, cocktails, reception, and family events.",
    introTitle: "EVENT SPACES",
    introBody:
      "The Mountain includes private event spaces suited for sangeet, haldi, mehendi, cocktails, reception, and other destination wedding celebrations.",
    heroImage: "/images/DSC08831.avif",
    cards: [
      {
        label: "SPACE",
        title: "Dedicated Ceremony Areas",
        description: "Large lawns and event-ready zones support rituals, guest gathering flow, and destination wedding execution.",
        image: "/images/DSC08837.avif",
      },
      {
        label: "SPACE",
        title: "Reception & Cocktail Spaces",
        description: "The venue is suited for multiple functions from haldi and mehendi to cocktails and reception gatherings.",
        image: "/images/DSC08846.avif",
      },
    ],
    galleryTabs: ["Ceremonies", "Cocktails", "Reception"],
    galleryImage: "/images/DSC08853.avif",
  },
  {
    slug: "sky-garden",
    title: "Contact Details",
    subtitle: "Connect with The Mountain, Karjat for destination wedding package details.",
    introTitle: "CONTACT",
    introBody:
      "For quotation and package details, contact The Mountain, Karjat on +91 9833866655 or 9892011179, visit instagram.com/themountain.karjat, or browse www.themountainresorts.com.",
    heroImage: "/images/DSC08717.avif",
    cards: [
      {
        label: "CONTACT",
        title: "Phone & Instagram",
        description: "+91 9833866655 | 9892011179 | instagram.com/themountain.karjat",
        image: "/images/DSC08720.avif",
      },
      {
        label: "CONTACT",
        title: "Website & Venue",
        description: "www.themountainresorts.com | The Mountain, Karjat destination wedding venue",
        image: "/images/DSC08758.avif",
      },
    ],
    galleryTabs: ["Contact", "Venue", "Reach Us"],
    galleryImage: "/images/DSC08759.avif",
  },
  {
    slug: "weddings",
    title: "The Mountain Weddings",
    subtitle: "Quotation, package details, stay options, venue highlights, and hospitality for destination weddings.",
    introTitle: "WEDDINGS",
    introBody:
      "The Mountain, Karjat is a destination wedding and event venue spread across 7 acres of green beauty with stay, meals, services, and venue usage included in curated packages.",
    heroImage: "/images/DSC08763.avif",
    cards: [
      {
        label: "PACKAGE",
        title: "Wedding Packages",
        description: "Classic, Signature, and Premium Luxo options are available for weekday and weekend destination wedding bookings.",
        image: "/images/DSC08769.avif",
      },
      {
        label: "VENUE",
        title: "Venue & Hospitality",
        description: "The property includes scenic lawns, guest stays, meal planning, and flexible event zones for celebrations.",
        image: "/images/DSC08801.avif",
      },
    ],
    galleryTabs: ["Packages", "Venue", "Wedding Stay"],
    galleryImage: "/images/DSC08802.avif",
  },
  {
    slug: "della-corporate-events",
    title: "Corporate Events",
    subtitle: "Private venue infrastructure and stay support for offsites, conferences, and business gatherings.",
    introTitle: "EVENTS",
    introBody:
      "The Mountain also supports corporate events with private venue access, stay options, hospitality service, and structured event planning.",
    heroImage: "/images/DSC08807.avif",
    cards: [
      {
        label: "EVENT",
        title: "Venue Infrastructure",
        description: "The estate supports business meets and private gatherings with flexible indoor and outdoor event zones.",
        image: "/images/DSC08812.avif",
      },
      {
        label: "EVENT",
        title: "Stay & Hospitality",
        description: "Guest stay, meals, and venue access can be aligned for multi-day conferences and team experiences.",
        image: "/images/DSC08820.avif",
      },
    ],
    galleryTabs: ["Corporate", "Venue", "Stay"],
    galleryImage: "/images/DSC08836.avif",
  },
  {
    slug: "adventure-park",
    title: "Adventure Experiences",
    subtitle: "Outdoor activity moments and leisure zones that complement destination stays.",
    introTitle: "EXPERIENCES",
    introBody:
      "Beyond destination weddings, The Mountain experience can include leisure, poolside moments, and scenic outdoor environments for guests.",
    heroImage: "/images/DSC08849.avif",
    cards: [
      {
        label: "EXPERIENCE",
        title: "Outdoor Moments",
        description: "Open-air spaces and scenic surroundings support guests looking for leisure beyond formal event schedules.",
        image: "/images/DSC08831.avif",
      },
      {
        label: "EXPERIENCE",
        title: "Poolside Leisure",
        description: "Pool and rain dance access help shape relaxed destination event experiences for guests.",
        image: "/images/DSC08837.avif",
      },
    ],
    galleryTabs: ["Outdoors", "Poolside", "Scenic"],
    galleryImage: "/images/DSC08846.avif",
  },
  {
    slug: "della-entertainment",
    title: "Celebration Experiences",
    subtitle: "Cocktails, music, and social moments designed around destination event energy.",
    introTitle: "CELEBRATIONS",
    introBody:
      "The Mountain is suited for social wedding functions including cocktails, music celebrations, and family events in a private scenic setting.",
    heroImage: "/images/DSC08853.avif",
    cards: [
      {
        label: "EVENT",
        title: "Cocktail Moments",
        description: "Poolside and open-air spaces create a strong atmosphere for vibrant wedding celebration events.",
        image: "/images/DSC08717.avif",
      },
      {
        label: "EVENT",
        title: "Music & Energy",
        description: "Unlimited music hours and private venue access support immersive destination event experiences.",
        image: "/images/DSC08720.avif",
      },
    ],
    galleryTabs: ["Cocktail", "Music", "Celebration"],
    galleryImage: "/images/DSC08758.avif",
  },
  {
    slug: "spa",
    title: "Guest Comfort",
    subtitle: "Relaxed stay experiences that support multi-day destination events.",
    introTitle: "COMFORT",
    introBody:
      "The Mountain prioritizes guest comfort across furnished rooms, spacious stays, scenic surroundings, and package-based hospitality planning.",
    heroImage: "/images/DSC08759.avif",
    cards: [
      {
        label: "COMFORT",
        title: "Premium Furnishing",
        description: "Rooms and stay zones are designed to support smooth guest experience across the event schedule.",
        image: "/images/DSC08763.avif",
      },
      {
        label: "COMFORT",
        title: "Private Property Feel",
        description: "Spacious estate planning helps guests feel relaxed and comfortable during longer bookings.",
        image: "/images/DSC08769.avif",
      },
    ],
    galleryTabs: ["Comfort", "Stay", "Relaxed"],
    galleryImage: "/images/DSC08801.avif",
  },
  {
    slug: "della-experiences",
    title: "The Mountain Experiences",
    subtitle: "Stay, meals, venue, hospitality, and scenic celebration moments in one destination.",
    introTitle: "EXPERIENCES",
    introBody:
      "The Mountain experience brings together destination wedding planning, guest accommodation, scenic surroundings, and event-friendly hospitality in one property.",
    heroImage: "/images/DSC08802.avif",
    cards: [
      {
        label: "EXPERIENCE",
        title: "Destination Stay",
        description: "Stay options, venue access, and meals work together to create a well-coordinated guest journey.",
        image: "/images/DSC08807.avif",
      },
      {
        label: "EXPERIENCE",
        title: "Celebration Property",
        description: "The estate supports weddings, private functions, cocktails, and family events in a scenic destination setting.",
        image: "/images/DSC08812.avif",
      },
    ],
    galleryTabs: ["Stay", "Venue", "Celebration"],
    galleryImage: "/images/DSC08820.avif",
  },
  {
    slug: "weekday-package",
    title: "Weekday Package",
    subtitle: "Monday to Thursday pricing for destination wedding celebrations at The Mountain, Karjat.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "Weekday package pricing is structured for Monday to Thursday bookings with Classic at Rs. 4,500, Signature at Rs. 5,500, and Premium Luxe at Rs. 6,500 per person per day.",
    heroImage: "/images/DSC08846.avif",
    cards: [
      {
        label: "WEEKDAY",
        title: "Classic Package",
        description: "Rs. 4,500 per person including 5 meals, stay, and venue access.",
        image: "/images/DSC08846.avif",
      },
      {
        label: "WEEKDAY",
        title: "Signature Package",
        description: "Rs. 5,500 per person including Classic package benefits, extra 2 starters, and 1 gravy extra each in lunch and dinner.",
        image: "/images/DSC08853.avif",
      },
      {
        label: "WEEKDAY",
        title: "Premium Luxe Package",
        description: "Rs. 6,500 per person including Signature package benefits and 2 live counters.",
        image: "/images/DSC08849.avif",
      },
    ],
    galleryTabs: ["Classic", "Signature", "Premium Luxe"],
    galleryImage: "/images/DSC08837.avif",
  },
  {
    slug: "weekend-package",
    title: "Weekend Package",
    subtitle: "Friday to Sunday pricing designed for peak wedding dates and destination celebrations.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "Weekend package pricing applies to Friday to Sunday bookings with Classic at Rs. 5,500, Signature at Rs. 6,500, and Premium Luxe at Rs. 7,500 per person per day.",
    heroImage: "/images/DSC08849.avif",
    cards: [
      {
        label: "WEEKEND",
        title: "Classic Package",
        description: "Rs. 5,500 per person including 5 meals, stay, and venue access.",
        image: "/images/DSC08846.avif",
      },
      {
        label: "WEEKEND",
        title: "Signature Package",
        description: "Rs. 6,500 per person including Classic package benefits, extra 2 starters, and 1 gravy extra each in lunch and dinner.",
        image: "/images/DSC08853.avif",
      },
      {
        label: "WEEKEND",
        title: "Premium Luxe Package",
        description: "Rs. 7,500 per person including Signature package benefits and 2 live counters.",
        image: "/images/DSC08849.avif",
      },
    ],
    galleryTabs: ["Classic", "Signature", "Premium Luxe"],
    galleryImage: "/images/DSC08831.avif",
  },
  {
    slug: "classic-package",
    title: "Classic Package",
    subtitle: "Core destination wedding package with stay, meals, and venue access.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Classic Package is the base wedding package at The Mountain and is structured for guests who need stay, meals, services, and venue access in one plan.",
    heroImage: "/images/DSC08846.avif",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Offer",
        description: "Classic\nRs. 4,500\n5 Meals + Stay + Venue Access",
        image: "/images/DSC08846.avif",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Offer",
        description: "Classic\nRs. 5,500\n5 Meals + Stay + Venue Access",
        image: "/images/DSC08837.avif",
      },
    ],
    galleryTabs: ["Meals", "Stay", "Pricing"],
    galleryImage: "/images/DSC08831.avif",
    packageComparison: standardPackageComparison,
  },
  {
    slug: "signature-package",
    title: "Signature Package",
    subtitle: "Enhanced destination wedding package with extra starters and live counter support.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Signature Package builds on the Classic Package by adding extra 2 starters and 1 gravy extra each in lunch and dinner for fuller event hospitality.",
    heroImage: "/images/DSC08853.avif",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Offer",
        description:
          "Signature\nRs. 5,500\nClassic Package + Extra 2 Starter + 1 Gravy extra each in Lunch and Dinner",
        image: "/images/DSC08853.avif",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Offer",
        description:
          "Signature\nRs. 6,500\nClassic Package + Extra 2 Starter + 1 Gravy extra each in Lunch and Dinner",
        image: "/images/DSC08836.avif",
      },
    ],
    galleryTabs: ["Hospitality", "Dining", "Pricing"],
    galleryImage: "/images/DSC08820.avif",
    packageComparison: standardPackageComparison,
  },
  {
    slug: "premium-luxo-package",
    title: "Premium Luxe Package",
    subtitle: "Premium destination wedding package with expanded dining and live counter inclusions.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Premium Luxe Package is the top package tier at The Mountain and includes Signature-level hospitality plus two live counters.",
    heroImage: "/images/DSC08849.avif",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Offer",
        description:
          "Premium Luxe\nRs. 6,500\nSignature Package + 2 Live Counters",
        image: "/images/DSC08849.avif",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Offer",
        description:
          "Premium Luxe\nRs. 7,500\nSignature Package + 2 Live Counters",
        image: "/images/DSC08831.avif",
      },
    ],
    galleryTabs: ["Premium", "Hospitality", "Pricing"],
    galleryImage: "/images/DSC08807.avif",
    packageComparison: standardPackageComparison,
  },
  {
    slug: "offers",
    title: "Packages & Offers",
    subtitle: "Weekday and weekend wedding package options for destination celebrations at The Mountain.",
    introTitle: "PACKAGES",
    introBody:
      "The Mountain packages are structured around weekday and weekend bookings with Classic, Signature, and Premium Luxo options including stay, meals, services, and venue usage.",
    heroImage: "/images/DSC08836.avif",
    cards: [
      {
        label: "PACKAGE",
        title: "Classic & Signature",
        description: "Core package tiers designed around destination event stays and meal inclusions.",
        image: "/images/DSC08849.avif",
      },
      {
        label: "PACKAGE",
        title: "Premium Luxo",
        description: "Enhanced package option for guests looking for premium event hospitality and inclusions.",
        image: "/images/DSC08831.avif",
      },
    ],
    galleryTabs: ["Weekday", "Weekend", "Packages"],
    galleryImage: "/images/DSC08837.avif",
  },
] satisfies DetailSeed[];

export const detailPages: Record<string, DetailPage> = Object.fromEntries(
  detailPageSeeds.map((page) => [
    page.slug,
    {
      slug: page.slug,
      title: page.title,
      subtitle: page.subtitle,
      introTitle: page.introTitle,
      introBody: page.introBody,
      heroImage: page.heroImage,
      cards: page.cards,
      galleryTabs: page.galleryTabs,
      galleryImage: page.galleryImage,
      galleryImages: page.galleryImages,
      galleryVideos: page.galleryVideos,
      packageComparison: page.packageComparison,
    } satisfies DetailPage,
  ]),
) as Record<string, DetailPage>;

export const detailPageSlugs = detailPageSeeds.map((seed) => seed.slug);

export function getDetailPage(slug: string) {
  return detailPages[slug];
}
