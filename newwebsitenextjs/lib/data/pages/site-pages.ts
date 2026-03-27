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
    image: "/images/DSC08717.avif",
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
        description: "Premium Luxe\nRs. 6,500\nSignature Package + 2 Live Counters",
        image: "/images/DSC08849.avif",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Offer",
        description: "Premium Luxe\nRs. 7,500\nSignature Package + 2 Live Counters",
        image: "/images/DSC08831.avif",
      },
    ],
    galleryTabs: ["Premium", "Hospitality", "Pricing"],
    galleryImage: "/images/DSC08807.avif",
    packageComparison: standardPackageComparison,
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
