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
    description: "Room tariff Rs. 5,000 with per person package pricing at Rs. 3,000 including stay and all meals.",
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
    description: "Room tariff Rs. 6,500 with per person package pricing at Rs. 3,500 including stay and all meals.",
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
    description: "Room tariff Rs. 20,000 with per person package pricing at Rs. 2,500 including stay and all meals.",
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
    description: "Room tariff Rs. 12,000 with per person package pricing at Rs. 7,500 including stay and all meals.",
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
    description: "Bungalow tariff Rs. 25,000 with per person package pricing at Rs. 3,500 including stay and all meals.",
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
    subtitle: "Room tariff Rs. 5,000 and per person package Rs. 3,000 with stay and all meals.",
    introTitle: "STAY DETAILS",
    introBody:
      "Standard Room accommodation at The Mountain is designed for practical comfort with a room tariff of Rs. 5,000 and a stay plus all meals package at Rs. 3,000 per person.",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=80",
    cards: standardRoomCards,
    galleryTabs: ["Exterior", "Standard Room", "Guest Stay"],
    galleryImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "luxury-resort",
    title: "Cliff Room",
    subtitle: "Room tariff Rs. 6,500 and per person package Rs. 3,500 with stay and all meals.",
    introTitle: "STAY DETAILS",
    introBody:
      "Cliff Room accommodation at The Mountain is designed for guests who want scenic ambience with a room tariff of Rs. 6,500 and a stay plus all meals package at Rs. 3,500 per person.",
    heroImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2200&q=80",
    cards: cliffRoomCards,
    galleryTabs: ["Exterior", "Cliff Room", "Premium Stay"],
    galleryImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "camp-della-resort-room",
    title: "Family Room",
    subtitle: "Room tariff Rs. 20,000 and per person package Rs. 2,500 with stay and all meals.",
    introTitle: "STAY DETAILS",
    introBody:
      "Family Room stays at The Mountain support group and family accommodation with a room tariff of Rs. 20,000 and a stay plus all meals package at Rs. 2,500 per person.",
    heroImage: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=2200&q=80",
    cards: familyRoomCards,
    galleryTabs: ["Exterior", "Family Room", "Guest Stay"],
    galleryImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "adventure-resort",
    title: "Glass Cottage",
    subtitle: "Room tariff Rs. 12,000 and per person package Rs. 7,500 with stay and all meals.",
    introTitle: "STAY DETAILS",
    introBody:
      "Glass Cottage accommodation provides a more private stay option with a room tariff of Rs. 12,000 and a stay plus all meals package at Rs. 7,500 per person.",
    heroImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=2200&q=80",
    cards: classicCottageCards,
    galleryTabs: ["Exterior", "Glass Cottage", "Guest Stay"],
    galleryImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "della-enclave-villa-rooms",
    title: "Bungalow",
    subtitle: "Bungalow tariff Rs. 25,000 and per person package Rs. 3,500 with stay and all meals.",
    introTitle: "STAY DETAILS",
    introBody:
      "Bungalow accommodation at The Mountain is ideal for guests who need spacious premium furnished stays with a bungalow tariff of Rs. 25,000 and a stay plus all meals package at Rs. 3,500 per person.",
    heroImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=2200&q=80",
    cards: bungalowCards,
    galleryTabs: ["Exterior", "Bungalow", "Premium Stay"],
    galleryImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "della-data-resort",
    title: "Premium Stay",
    subtitle: "All properties are premium, furnished, and well-maintained for destination wedding guests.",
    introTitle: "STAY DETAILS",
    introBody:
      "All available guest properties at The Mountain are prepared for comfortable accommodation across weddings, rituals, family stays, and event functions.",
    heroImage: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=2200&q=80",
    cards: bungalowCards,
    galleryTabs: ["Exterior", "Premium Stay", "Guest Stay"],
    galleryImage: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "della-suites",
    title: "Quotation & Package Details",
    subtitle: "Selected package, dates, guest count, and stay duration determine the final quotation estimate.",
    introTitle: "QUOTATION SUMMARY",
    introBody:
      "The Mountain quotation is based on selected package, total guests, weekday or weekend booking, and required stay duration for the event.",
    heroImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "PACKAGE",
        title: "Weekday Package",
        description: "Monday to Thursday package options include Classic at Rs. 4,500, Signature at Rs. 5,500, and Premium Luxe at Rs. 6,500 per person.",
        image: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "PACKAGE",
        title: "Weekend Package",
        description: "Friday to Sunday package options include Classic at Rs. 5,500, Signature at Rs. 6,500, and Premium Luxe at Rs. 7,500 per person.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Weekday", "Weekend", "Summary"],
    galleryImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "cafe24",
    title: "Meals Includes",
    subtitle: "Lunch, hi-tea, starters, dinner, breakfast, venue access, and live counters as per package.",
    introTitle: "MEALS",
    introBody:
      "Meals at The Mountain are package-led and may include roti, sabji, dal, rice, salad, papad, pickle, hi-tea, starters, breakfast, tea, coffee, and live counters.",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "MEAL",
        title: "Lunch & Hi-Tea",
        description: "Lunch includes roti, 2 sabji, dal, rice, salad, papad, and pickle, while hi-tea includes tea or coffee with 2 snacks.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "MEAL",
        title: "Dinner & Breakfast",
        description: "Dinner includes roti, 2 sabji, dal, rice, salad, papad, and pickle, while breakfast includes tea or coffee with 2 dishes.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Lunch", "Dinner", "Hospitality"],
    galleryImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "villa-bistro",
    title: "Mountain View Destination",
    subtitle: "7 acres of green landscape, scenic views, natural beauty, and a destination backdrop for celebrations.",
    introTitle: "VENUE HIGHLIGHTS",
    introBody:
      "The Mountain offers scenic mountain surroundings, green natural landscape, spacious lawns, and beautiful photography-ready destination ambience for wedding events.",
    heroImage: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "VENUE",
        title: "Scenic Valley-Facing Ambience",
        description: "Scenic surroundings create a strong backdrop for wedding photography and immersive guest experiences.",
        image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "VENUE",
        title: "Beautiful Destination Setting",
        description: "The property blends natural views and open event-ready space for memorable ceremonies and hospitality planning.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Scenic Views", "Lawns", "Destination"],
    galleryImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "key-advantages",
    title: "Key Advantages",
    subtitle: "Unlimited music hours, full venue access, private estate comfort, and wedding-ready destination flexibility.",
    introTitle: "KEY ADVANTAGES",
    introBody:
      "The Mountain, Karjat is designed for destination weddings with unlimited music hours, 24x7 pool access, zero sound license requirement, full venue control, private estate privacy, and spaces ideal for all wedding functions.",
    heroImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "ADVANTAGE",
        title: "Unlimited Music Hours",
        description: "Enjoy music anytime on the lawn within property limits, giving wedding celebrations more flexibility and energy.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "ADVANTAGE",
        title: "24x7 Pool Access",
        description: "Take a dip or unwind whenever you like, with pool access adding leisure value to the destination wedding stay.",
        image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "ADVANTAGE",
        title: "Full Venue & Private Estate Access",
        description: "The entire property is exclusively yours for the event, supporting privacy, smooth event flow, and full celebration control.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "ADVANTAGE",
        title: "Perfect For All Wedding Events",
        description: "Ideal for sangeet, haldi, mehendi, cocktails, receptions, and pool plus rain dance celebrations with scenic backdrops.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Music", "Pool Access", "Venue Access", "Wedding Events"],
    galleryImage: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "rules",
    title: "Rules & Regulations",
    subtitle: "Guest ID, vendor approval, property limits, and responsible usage guidelines for event stays.",
    introTitle: "RULES",
    introBody:
      "Government ID is mandatory for staying guests, outside catering is not allowed in package bookings, property damage is chargeable, vendors require prior approval, loud music must remain within property limits, smoking is allowed only in designated areas, and lost belongings remain the guest's responsibility.",
    heroImage: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "RULES",
        title: "Guest & Vendor Policy",
        description: "Staying guests require valid ID, outside catering is not allowed in package bookings, and decorators or vendors need prior property approval before execution.",
        image: "https://images.unsplash.com/photo-1578808534343-171f6908071a?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "RULES",
        title: "Property Terms",
        description: "Property damage is chargeable, loud music must remain within limits, smoking is only in designated areas, and guest belongings remain under guest responsibility.",
        image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Rules", "Policies", "Terms"],
    galleryImage: "https://images.unsplash.com/photo-1578808534343-171f6908071a?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "check-in",
    title: "Check-In / Payment Terms",
    subtitle: "50% advance to block dates with check-in, check-out, and headcount-based billing terms.",
    introTitle: "PAYMENT TERMS",
    introBody:
      "Check-in time is 2 PM, check-out time is 11 AM, 50% advance is required to block dates, the remaining 50% is due before check-in, packages are calculated on the final headcount, and the advance is non-refundable though dates may be rescheduled subject to availability.",
    heroImage: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "TERMS",
        title: "Check-In Details",
        description: "Check-in starts at 2 PM and check-out is at 11 AM to support smooth operational planning during multi-day destination events.",
        image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "TERMS",
        title: "Advance & Billing",
        description: "50% advance blocks the date, remaining payment is due before check-in, final billing depends on headcount, and date changes remain subject to availability.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Check-In", "Payment", "Booking"],
    galleryImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "quotation",
    title: "Quotation & Final Estimate",
    subtitle: "Selected package, guest count, dates, and stay duration determine the final quotation at The Mountain, Karjat.",
    introTitle: "QUOTATION SUMMARY",
    introBody:
      "The final quotation is prepared based on event type, venue selection, booking dates, selected package, total guests, weekday or weekend booking, and the stay required for the celebration.",
    heroImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "QUOTATION",
        title: "Selected Package & Event Type",
        description: "Event type: Wedding. Venue: The Mountain, Karjat. Final costing depends on whether the selected package is Classic, Signature, or Premium Luxo.",
        image: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "QUOTATION",
        title: "Dates, Guests & Stay",
        description: "Dates, total guests, weekday or weekend booking, and the total stay required all directly influence the final quotation estimate.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "QUOTATION",
        title: "Billing Basis",
        description: "Packages are calculated per person per day, inclusive of stay, meals, services, lawn access, and venue usage, with final billing based on the confirmed headcount.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "QUOTATION",
        title: "Booking Note",
        description: "50% advance is required to block dates. Remaining payment terms, headcount confirmation, and schedule alignment are finalized before check-in.",
        image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Package", "Guests", "Estimate", "Booking"],
    galleryImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "salaam-manekshaw",
    title: "Private Event Spaces",
    subtitle: "Dedicated areas for ceremonies, rituals, cocktails, reception, and family events.",
    introTitle: "EVENT SPACES",
    introBody:
      "The Mountain includes private event spaces suited for sangeet, haldi, mehendi, cocktails, reception, and other destination wedding celebrations.",
    heroImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "SPACE",
        title: "Dedicated Ceremony Areas",
        description: "Large lawns and event-ready zones support rituals, guest gathering flow, and destination wedding execution.",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "SPACE",
        title: "Reception & Cocktail Spaces",
        description: "The venue is suited for multiple functions from haldi and mehendi to cocktails and reception gatherings.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Ceremonies", "Cocktails", "Reception"],
    galleryImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "sky-garden",
    title: "Contact Details",
    subtitle: "Connect with The Mountain, Karjat for destination wedding package details.",
    introTitle: "CONTACT",
    introBody:
      "For quotation and package details, contact The Mountain, Karjat on +91 9833866655 or 9892011179, visit instagram.com/themountain.karjat, or browse www.themountainresorts.com.",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "CONTACT",
        title: "Phone & Instagram",
        description: "+91 9833866655 | 9892011179 | instagram.com/themountain.karjat",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "CONTACT",
        title: "Website & Venue",
        description: "www.themountainresorts.com | The Mountain, Karjat destination wedding venue",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Contact", "Venue", "Reach Us"],
    galleryImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "weddings",
    title: "The Mountain Weddings",
    subtitle: "Quotation, package details, stay options, venue highlights, and hospitality for destination weddings.",
    introTitle: "WEDDINGS",
    introBody:
      "The Mountain, Karjat is a destination wedding and event venue spread across 7 acres of green beauty with stay, meals, services, and venue usage included in curated packages.",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "PACKAGE",
        title: "Wedding Packages",
        description: "Classic, Signature, and Premium Luxo options are available for weekday and weekend destination wedding bookings.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "VENUE",
        title: "Venue & Hospitality",
        description: "The property includes scenic lawns, guest stays, meal planning, and flexible event zones for celebrations.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Packages", "Venue", "Wedding Stay"],
    galleryImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "della-corporate-events",
    title: "Corporate Events",
    subtitle: "Private venue infrastructure and stay support for offsites, conferences, and business gatherings.",
    introTitle: "EVENTS",
    introBody:
      "The Mountain also supports corporate events with private venue access, stay options, hospitality service, and structured event planning.",
    heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "EVENT",
        title: "Venue Infrastructure",
        description: "The estate supports business meets and private gatherings with flexible indoor and outdoor event zones.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "EVENT",
        title: "Stay & Hospitality",
        description: "Guest stay, meals, and venue access can be aligned for multi-day conferences and team experiences.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Corporate", "Venue", "Stay"],
    galleryImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "adventure-park",
    title: "Adventure Experiences",
    subtitle: "Outdoor activity moments and leisure zones that complement destination stays.",
    introTitle: "EXPERIENCES",
    introBody:
      "Beyond destination weddings, The Mountain experience can include leisure, poolside moments, and scenic outdoor environments for guests.",
    heroImage: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "EXPERIENCE",
        title: "Outdoor Moments",
        description: "Open-air spaces and scenic surroundings support guests looking for leisure beyond formal event schedules.",
        image: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "EXPERIENCE",
        title: "Poolside Leisure",
        description: "Pool and rain dance access help shape relaxed destination event experiences for guests.",
        image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Outdoors", "Poolside", "Scenic"],
    galleryImage: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "della-entertainment",
    title: "Celebration Experiences",
    subtitle: "Cocktails, music, and social moments designed around destination event energy.",
    introTitle: "CELEBRATIONS",
    introBody:
      "The Mountain is suited for social wedding functions including cocktails, music celebrations, and family events in a private scenic setting.",
    heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "EVENT",
        title: "Cocktail Moments",
        description: "Poolside and open-air spaces create a strong atmosphere for vibrant wedding celebration events.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "EVENT",
        title: "Music & Energy",
        description: "Unlimited music hours and private venue access support immersive destination event experiences.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Cocktail", "Music", "Celebration"],
    galleryImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "spa",
    title: "Guest Comfort",
    subtitle: "Relaxed stay experiences that support multi-day destination events.",
    introTitle: "COMFORT",
    introBody:
      "The Mountain prioritizes guest comfort across furnished rooms, spacious stays, scenic surroundings, and package-based hospitality planning.",
    heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "COMFORT",
        title: "Premium Furnishing",
        description: "Rooms and stay zones are designed to support smooth guest experience across the event schedule.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "COMFORT",
        title: "Private Property Feel",
        description: "Spacious estate planning helps guests feel relaxed and comfortable during longer bookings.",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Comfort", "Stay", "Relaxed"],
    galleryImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "della-experiences",
    title: "The Mountain Experiences",
    subtitle: "Stay, meals, venue, hospitality, and scenic celebration moments in one destination.",
    introTitle: "EXPERIENCES",
    introBody:
      "The Mountain experience brings together destination wedding planning, guest accommodation, scenic surroundings, and event-friendly hospitality in one property.",
    heroImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "EXPERIENCE",
        title: "Destination Stay",
        description: "Stay options, venue access, and meals work together to create a well-coordinated guest journey.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "EXPERIENCE",
        title: "Celebration Property",
        description: "The estate supports weddings, private functions, cocktails, and family events in a scenic destination setting.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Stay", "Venue", "Celebration"],
    galleryImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "weekday-package",
    title: "Weekday Package",
    subtitle: "Monday to Thursday pricing for destination wedding celebrations at The Mountain, Karjat.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "Weekday package pricing is structured for Monday to Thursday bookings with Classic at Rs. 4,500, Signature at Rs. 5,500, and Premium Luxe at Rs. 6,500 per person per day.",
    heroImage: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "WEEKDAY",
        title: "Classic Package",
        description: "Rs. 4,500 per person including 5 meals, stay, and venue access.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "WEEKDAY",
        title: "Signature Package",
        description: "Rs. 5,500 per person including Classic package benefits, extra 2 starters, and 1 gravy extra each in lunch and dinner.",
        image: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "WEEKDAY",
        title: "Premium Luxe Package",
        description: "Rs. 6,500 per person including Signature package benefits and 2 live counters.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Classic", "Signature", "Premium Luxe"],
    galleryImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "weekend-package",
    title: "Weekend Package",
    subtitle: "Friday to Sunday pricing designed for peak wedding dates and destination celebrations.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "Weekend package pricing applies to Friday to Sunday bookings with Classic at Rs. 5,500, Signature at Rs. 6,500, and Premium Luxe at Rs. 7,500 per person per day.",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "WEEKEND",
        title: "Classic Package",
        description: "Rs. 5,500 per person including 5 meals, stay, and venue access.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "WEEKEND",
        title: "Signature Package",
        description: "Rs. 6,500 per person including Classic package benefits, extra 2 starters, and 1 gravy extra each in lunch and dinner.",
        image: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "WEEKEND",
        title: "Premium Luxe Package",
        description: "Rs. 7,500 per person including Signature package benefits and 2 live counters.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Classic", "Signature", "Premium Luxe"],
    galleryImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=80",
  },
  {
    slug: "classic-package",
    title: "Classic Package",
    subtitle: "Core destination wedding package with stay, meals, and venue access.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Classic Package is the base wedding package at The Mountain and is structured for guests who need stay, meals, services, and venue access in one plan.",
    heroImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Offer",
        description: "Classic\nRs. 4,500\n5 Meals + Stay + Venue Access",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Offer",
        description: "Classic\nRs. 5,500\n5 Meals + Stay + Venue Access",
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Meals", "Stay", "Pricing"],
    galleryImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80",
    packageComparison: standardPackageComparison,
  },
  {
    slug: "signature-package",
    title: "Signature Package",
    subtitle: "Enhanced destination wedding package with extra starters and live counter support.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Signature Package builds on the Classic Package by adding extra 2 starters and 1 gravy extra each in lunch and dinner for fuller event hospitality.",
    heroImage: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Offer",
        description:
          "Signature\nRs. 5,500\nClassic Package + Extra 2 Starter + 1 Gravy extra each in Lunch and Dinner",
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Offer",
        description:
          "Signature\nRs. 6,500\nClassic Package + Extra 2 Starter + 1 Gravy extra each in Lunch and Dinner",
        image: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Hospitality", "Dining", "Pricing"],
    galleryImage: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=2200&q=80",
    packageComparison: standardPackageComparison,
  },
  {
    slug: "premium-luxo-package",
    title: "Premium Luxe Package",
    subtitle: "Premium destination wedding package with expanded dining and live counter inclusions.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Premium Luxe Package is the top package tier at The Mountain and includes Signature-level hospitality plus two live counters.",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Offer",
        description:
          "Premium Luxe\nRs. 6,500\nSignature Package + 2 Live Counters",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Offer",
        description:
          "Premium Luxe\nRs. 7,500\nSignature Package + 2 Live Counters",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Premium", "Hospitality", "Pricing"],
    galleryImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=80",
    packageComparison: standardPackageComparison,
  },
  {
    slug: "offers",
    title: "Packages & Offers",
    subtitle: "Weekday and weekend wedding package options for destination celebrations at The Mountain.",
    introTitle: "PACKAGES",
    introBody:
      "The Mountain packages are structured around weekday and weekend bookings with Classic, Signature, and Premium Luxo options including stay, meals, services, and venue usage.",
    heroImage: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=2200&q=80",
    cards: [
      {
        label: "PACKAGE",
        title: "Classic & Signature",
        description: "Core package tiers designed around destination event stays and meal inclusions.",
        image: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=1600&q=80",
      },
      {
        label: "PACKAGE",
        title: "Premium Luxo",
        description: "Enhanced package option for guests looking for premium event hospitality and inclusions.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    galleryTabs: ["Weekday", "Weekend", "Packages"],
    galleryImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=80",
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
