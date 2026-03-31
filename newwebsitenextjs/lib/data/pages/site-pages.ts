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
    description: "A comfortable, well-kept stay option for wedding guests who value ease, warmth, and a smooth arrival into the celebration weekend.",
    image: "/images/DSC08717.avif",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Family Guests",
    description: "Well suited for friends and family who need a practical premium room with stay and all meals bundled into the event plan.",
    image: "/images/DSC08720.avif",
  },
] satisfies DetailPage["cards"];

const cliffRoomCards = [
  {
    label: "ROOM TYPE",
    title: "Cliff Room",
    description: "A scenic premium room with a calmer, more elevated feel for guests who want privacy, ambience, and a stronger sense of destination.",
    image: "/images/DSC08769.avif",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Close Family",
    description: "A strong fit for close family members or premium guest hosting where the stay experience should feel more scenic and special.",
    image: "/images/DSC08801.avif",
  },
] satisfies DetailPage["cards"];

const familyRoomCards = [
  {
    label: "ROOM TYPE",
    title: "Family Room",
    description: "A spacious stay category designed for group comfort, shared family movement, and easier hosting during multi-function wedding itineraries.",
    image: "/images/DSC08812.avif",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Groups",
    description: "Best suited for families and group stays who want to remain together through Haldi, Sangeet, ceremony, and reception flow.",
    image: "/images/DSC08820.avif",
  },
] satisfies DetailPage["cards"];

const classicCottageCards = [
  {
    label: "ROOM TYPE",
    title: "Glass Cottage",
    description: "A more distinctive cottage stay with private character, modern styling, and a premium atmosphere within the estate.",
    image: "/images/DSC08802.avif",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Special Guests",
    description: "A strong choice for guests who should enjoy a more elevated accommodation experience during the celebration weekend.",
    image: "/images/DSC08807.avif",
  },
] satisfies DetailPage["cards"];

const bungalowCards = [
  {
    label: "ROOM TYPE",
    title: "Bungalow",
    description: "A large-format premium bungalow designed for host families, longer stays, and guests who need more private space on-site.",
    image: "/images/DSC08758.avif",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Hosts",
    description: "Perfect for key family members or hosts who need privacy, more room to settle in, and better on-property convenience.",
    image: "/images/DSC08759.avif",
  },
] satisfies DetailPage["cards"];

const detailPageSeeds: DetailSeed[] = [
  {
    slug: "garden-villa-resort",
    title: "Standard Room",
    subtitle: "A practical premium stay for wedding guests who need comfort, convenience, and seamless participation across the celebration.",
    introTitle: "STAY DETAILS",
    introBody:
      "Standard Room accommodation at The Mountain is designed for practical guest comfort with a room tariff of Rs. 5,000 and a stay plus all meals package at Rs. 3,000 per person, making it a dependable choice for family-led destination celebrations.",
    heroImage: "/images/DSC08717.avif",
    cards: standardRoomCards,
    galleryTabs: ["Exterior", "Standard Room", "Guest Stay"],
    galleryImage: "/images/DSC08720.avif",
    galleryImages: [
      "/images/DSC08717.avif",
      "/images/DSC08720.avif",
      "/images/DSC08753.avif",
      "/images/DSC08745.avif",
      "/images/DSC08749.avif",
      "/images/DSC08798.avif",
      "/images/DSC08796.avif",
    ],
  },
  {
    slug: "luxury-resort",
    title: "Cliff Room",
    subtitle: "A scenic premium stay for guests who want privacy, mountain ambience, and a more elevated destination-wedding experience.",
    introTitle: "STAY DETAILS",
    introBody:
      "Cliff Room accommodation at The Mountain is designed for guests who want scenic ambience, a stronger sense of privacy, and a room tariff of Rs. 6,500 with a stay plus all meals package at Rs. 3,500 per person.",
    heroImage: "/images/DSC08769.avif",
    cards: cliffRoomCards,
    galleryTabs: ["Exterior", "Cliff Room", "Premium Stay"],
    galleryImage: "/images/DSC08801.avif",
    galleryImages: [
      "/images/DSC08769.avif",
      "/images/DSC08801.avif",
      "/images/DSC08798.avif",
      "/images/DSC08796.avif",
      "/images/DSC08790.avif",
      "/images/DSC08792.avif",
    ],
  },
  {
    slug: "camp-della-resort-room",
    title: "Family Room",
    subtitle: "A spacious family stay designed for group comfort, togetherness, and easier guest hosting during wedding weekends.",
    introTitle: "STAY DETAILS",
    introBody:
      "Family Room stays at The Mountain support group accommodation with a room tariff of Rs. 20,000 and a stay plus all meals package at Rs. 2,500 per person, helping families stay together more comfortably through multi-event celebrations.",
    heroImage: "/images/DSC08812.avif",
    cards: familyRoomCards,
    galleryTabs: ["Exterior", "Family Room", "Guest Stay"],
    galleryImage: "/images/DSC08820.avif",
    galleryImages: [
      "/images/DSC08812.avif",
      "/images/DSC08820.avif",
      "/images/DSC08822.avif",
      "/images/DSC08824.avif",
      "/images/DSC08827.avif",
    ],
  },
  {
    slug: "adventure-resort",
    title: "Glass Cottage",
    subtitle: "A premium cottage stay with privacy, design character, and a more distinctive destination-wedding atmosphere.",
    introTitle: "STAY DETAILS",
    introBody:
      "Glass Cottage accommodation provides a more private and premium stay option with a room tariff of Rs. 12,000 and a stay plus all meals package at Rs. 7,500 per person.",
    heroImage: "/images/DSC08802.avif",
    cards: classicCottageCards,
    galleryTabs: ["Exterior", "Glass Cottage", "Guest Stay"],
    galleryImage: "/images/DSC08807.avif",
  },
  {
    slug: "della-enclave-villa-rooms",
    title: "Bungalow",
    subtitle: "A spacious premium bungalow for host families, longer stays, and guests who need more privacy within the estate.",
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
    title: "Wedding Hospitality Inclusions",
    subtitle: "Lunch, hi-tea, starters, dinner, breakfast, venue access, and live counters are structured to support full celebration flow.",
    introTitle: "MEALS",
    introBody:
      "Hospitality at The Mountain is package-led and designed to support destination wedding hosting through coordinated meals, guest convenience, and smoother family planning across the day.",
    heroImage: "/images/DSC08758.avif",
    cards: [
      {
        label: "MEAL",
        title: "Lunch & Hi-Tea",
        description: "Lunch includes roti, 2 sabji, dal, rice, salad, papad, and pickle, while hi-tea includes tea or coffee with 2 snacks to keep the celebration moving comfortably between functions.",
        image: "/images/DSC08759.avif",
      },
      {
        label: "MEAL",
        title: "Dinner & Breakfast",
        description: "Dinner includes roti, 2 sabji, dal, rice, salad, papad, and pickle, while breakfast includes tea or coffee with 2 dishes for an easy start to the next event day.",
        image: "/images/DSC08763.avif",
      },
    ],
    galleryTabs: ["Lunch", "Dinner", "Hospitality"],
    galleryImage: "/images/DSC08769.avif",
  },
  {
    slug: "classic-package",
    title: "Classic Package",
    subtitle: "A clear bundled starting point for destination weddings with stay, meals, and venue access included.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Classic Package is the base wedding package at The Mountain and is structured for families who want stay, meals, services, and venue access simplified into one clear plan.",
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
    subtitle: "A richer destination wedding package with added starters and stronger meal depth for family celebrations.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Signature Package builds on the Classic Package by adding extra 2 starters and 1 gravy extra each in lunch and dinner for a fuller hospitality experience across wedding functions.",
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
    subtitle: "An elevated destination wedding package with expanded dining, live counters, and a stronger premium-hosting feel.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Premium Luxe Package is the top package tier at The Mountain and includes Signature-level hospitality plus two live counters for celebrations that call for a more premium dining presence.",
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
