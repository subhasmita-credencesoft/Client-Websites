export type DetailPage = {
  slug: string;
  title: string;
  subtitle: string;
  introTitle: string;
  introBody: string;
  heroImage: string;
  facts?: Array<{
    label: string;
    value: string;
  }>;
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
  facts?: DetailPage["facts"];
  cards: DetailPage["cards"];
  galleryTabs: string[];
  galleryImage: string;
  galleryImages?: DetailPage["galleryImages"];
  galleryVideos?: DetailPage["galleryVideos"];
  packageComparison?: DetailPage["packageComparison"];
};

const standardPackageComparison = {
  weekday: {
    title: "Weekday | Monday to Thursday",
    rows: [
      { package: "Classic", price: "Rs. 4,500", includes: "Stay, venue access, and 5 curated meal services" },
      { package: "Signature", price: "Rs. 5,500", includes: "Classic inclusions plus 2 additional starters and 1 extra gravy in lunch and dinner" },
      { package: "Premium Luxe", price: "Rs. 6,500", includes: "Signature inclusions plus 2 live counters" },
    ],
  },
  weekend: {
    title: "Weekend | Friday to Sunday",
    rows: [
      { package: "Classic", price: "Rs. 5,500", includes: "Stay, venue access, and 5 curated meal services" },
      { package: "Signature", price: "Rs. 6,500", includes: "Classic inclusions plus 2 additional starters and 1 extra gravy in lunch and dinner" },
      { package: "Premium Luxe", price: "Rs. 7,500", includes: "Signature inclusions plus 2 live counters" },
    ],
  },
  meals: {
    title: "Hospitality Inclusions",
    items: [
      "Lunch - Roti, 2 Sabji, Dal, Rice, Salad, Papad & Pickle",
      "Hi-Tea - Tea or coffee with 2 snacks",
      "Starters - 2 Starters",
      "Dinner - Roti, 2 Sabji, Dal, Rice, Salad, Papad & Pickle",
      "Breakfast - Tea or coffee with 2 dishes",
    ],
    note:
      "Additional items and hospitality upgrades can be customised as per preference and charged separately on a per-person, per-day basis.",
  },
} satisfies NonNullable<DetailPage["packageComparison"]>;

const standardRoomCards = [
  {
    label: "ROOM TYPE",
    title: "Standard Room",
    description: "A refined and comfortable stay for wedding guests who value ease, warmth, and a smooth arrival into the celebration weekend.",
    image: "https://bookonelocal.in/cdn/DSC08717.avif",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Wedding Guests",
    description: "Well suited for friends and family who want a practical premium room with stay and meals aligned to the event itinerary.",
    image: "https://bookonelocal.in/cdn/DSC08720.avif",
  },
] satisfies DetailPage["cards"];

const cliffRoomCards = [
  {
    label: "ROOM TYPE",
    title: "Cliff View Room",
    description: "A scenic premium room with a stronger destination feel, natural views, and a more elevated stay experience for guests.",
    image: "https://bookonelocal.in/cdn/2026-04-02-073101502-DSC08801.jpg",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Close Family",
    description: "A strong fit for close family members or premium guest hosting where the room should feel more scenic and memorable.",
    image: "https://bookonelocal.in/cdn/2026-04-02-073125239-DSC08769.jpg",
  },
] satisfies DetailPage["cards"];

const familyRoomCards = [
  {
    label: "ROOM TYPE",
    title: "Family Room",
    description: "A spacious stay category designed for group comfort, shared family movement, and easier hosting during multi-function wedding itineraries.",
    image: "https://bookonelocal.in/cdn/DSC08812.avif",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Groups",
    description: "Best suited for families and group stays who want to remain together through Haldi, Sangeet, ceremony, and reception flow.",
    image: "https://bookonelocal.in/cdn/DSC08820.avif",
  },
] satisfies DetailPage["cards"];

const classicCottageCards = [
  {
    label: "ROOM TYPE",
    title: "Glass Jacuzi Room",
    description: "A distinctive room category with a premium jacuzzi-led setup and a more private-feeling stay mood inside the property.",
    image: "https://bookonelocal.in/cdn/2026-04-02-082005702-DSC08852.jpg",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Special Guests",
    description: "A strong choice for guests who should enjoy a more elevated and distinctive accommodation experience during the stay.",
    image: "https://bookonelocal.in/cdn/2026-04-02-082011274-DSC08839.jpg",
  },
] satisfies DetailPage["cards"];

const bungalowCards = [
  {
    label: "ROOM TYPE",
    title: "Bunglow",
    description: "A large-format premium stay designed for host families, longer stays, and guests who need more private space on-site.",
    image: "https://bookonelocal.in/cdn/2026-04-02-081456220-DSC08807.jpg",
  },
  {
    label: "WEDDING HOSTING ROLE",
    title: "Ideal For Hosts",
    description: "Perfect for key family members or hosts who need privacy, more room to settle in, and stronger on-property comfort.",
    image: "https://bookonelocal.in/cdn/2026-04-02-081502983-DSC08806.jpg",
  },
] satisfies DetailPage["cards"];

const detailPageSeeds: DetailSeed[] = [
  {
    slug: "standard-room",
    title: "Standard Room",
    subtitle: "A refined stay for wedding guests who want comfort, convenience, and seamless participation across the celebration.",
    introTitle: "STAY EXPERIENCE",
    introBody:
      "Standard Room accommodation at The Mountain is designed for guest comfort with a room tariff of Rs. 5,000 and a stay-plus-all-meals package at Rs. 3,000 per person, making it a dependable choice for destination weddings and hosted family stays.",
    heroImage: "https://bookonelocal.in/cdn/DSC08717.avif",
    facts: [
      { label: "Room Tariff", value: "Rs. 5,000" },
      { label: "Stay + Meals", value: "Rs. 3,000 per person" },
      { label: "Ideal For", value: "Wedding guests and couples" },
      { label: "Booking Fit", value: "Short stays and celebration weekends" },
    ],
    cards: standardRoomCards,
    galleryTabs: ["Exterior", "Standard Room", "Guest Stay"],
    galleryImage: "https://bookonelocal.in/cdn/DSC08720.avif",
    galleryImages: [
      "https://bookonelocal.in/cdn/DSC08717.avif",
      "https://bookonelocal.in/cdn/DSC08720.avif",
      "https://bookonelocal.in/cdn/DSC08753.avif",
      "https://bookonelocal.in/cdn/DSC08745.avif",
      "https://bookonelocal.in/cdn/DSC08749.avif",
      "https://bookonelocal.in/cdn/DSC08798.avif",
      "https://bookonelocal.in/cdn/DSC08796.avif",
    ],
  },
  {
    slug: "cliff-room",
    title: "Cliff View Room",
    subtitle: "A scenic premium stay for guests who want privacy, mountain ambience, and a more elevated destination experience.",
    introTitle: "STAY EXPERIENCE",
    introBody:
      "Cliff View Room accommodation at The Mountain is designed for guests who want scenic ambience, a stronger sense of privacy, and a room tariff of Rs. 6,500 for a more premium stay category.",
    heroImage: "https://bookonelocal.in/cdn/2026-04-02-073101502-DSC08801.jpg",
    facts: [
      { label: "Room Tariff", value: "Rs. 6,500" },
      { label: "Occupancy", value: "1 to 3 Guests" },
      { label: "Inventory", value: "10 Rooms" },
      { label: "Booking Fit", value: "Scenic premium stays" },
    ],
    cards: cliffRoomCards,
    galleryTabs: ["Exterior", "Cliff View Room", "Premium Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2026-04-02-073125239-DSC08769.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2026-04-02-073101502-DSC08801.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-073125239-DSC08769.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-073130079-DSC08773.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-073140896-DSC08783.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-073149577-DSC08786.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-073155446-DSC08787.jpg",
    ],
  },
  {
    slug: "family-room",
    title: "Family Room",
    subtitle: "A spacious family stay designed for group comfort, togetherness, and easier guest hosting during wedding weekends.",
    introTitle: "STAY EXPERIENCE",
    introBody:
      "Family Room stays at The Mountain support group accommodation with a room tariff of Rs. 10,000, helping families stay together more comfortably through leisure or celebration travel.",
    heroImage: "https://bookonelocal.in/cdn/2026-04-02-081007160-DSC08828.jpg",
    facts: [
      { label: "Room Tariff", value: "Rs. 10,000" },
      { label: "Occupancy", value: "1 to 3 Guests" },
      { label: "Inventory", value: "2 Rooms" },
      { label: "Booking Fit", value: "Families and group stays" },
    ],
    cards: familyRoomCards,
    galleryTabs: ["Exterior", "Family Room", "Guest Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2026-04-02-081020140-DSC08812.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2026-04-02-081007160-DSC08828.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081013076-6.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081020140-DSC08812.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081027429-7.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081036007-DSC08815.jpg",
    ],
  },
  {
    slug: "glass-cottage",
    title: "Glass Jacuzi Room",
    subtitle: "A premium room stay with privacy, jacuzzi-led character, and a more distinctive destination atmosphere.",
    introTitle: "STAY EXPERIENCE",
    introBody:
      "Glass Jacuzi Room accommodation provides a more private and premium stay option with a room tariff of Rs. 2,000 for guests who want a distinctive room category.",
    heroImage: "https://bookonelocal.in/cdn/2026-04-02-082005702-DSC08852.jpg",
    facts: [
      { label: "Room Tariff", value: "Rs. 2,000" },
      { label: "Occupancy", value: "1 to 4 Guests" },
      { label: "Inventory", value: "1 Room" },
      { label: "Booking Fit", value: "Distinctive premium escape" },
    ],
    cards: classicCottageCards,
    galleryTabs: ["Exterior", "Glass Jacuzi Room", "Guest Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2026-04-02-082011274-DSC08839.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2026-04-02-082005702-DSC08852.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-082011274-DSC08839.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-082021393-DSC08848.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-082026384-DSC08850.jpg",
    ],
  },
  {
    slug: "bungalow",
    title: "Bunglow",
    subtitle: "A spacious premium bungalow for host families, longer stays, and guests who need more privacy within the estate.",
    introTitle: "STAY EXPERIENCE",
    introBody:
      "Bunglow accommodation at The Mountain is ideal for guests who need spacious premium furnished stays with a room tariff of Rs. 20,000 and a more private on-property setup.",
    heroImage: "https://bookonelocal.in/cdn/2026-04-02-081456220-DSC08807.jpg",
    facts: [
      { label: "Room Tariff", value: "Rs. 20,000" },
      { label: "Occupancy", value: "2 to 4 Guests" },
      { label: "Inventory", value: "1 Unit" },
      { label: "Booking Fit", value: "Longer private stays" },
    ],
    cards: bungalowCards,
    galleryTabs: ["Exterior", "Bunglow", "Premium Stay"],
    galleryImage: "https://bookonelocal.in/cdn/2026-04-02-081502983-DSC08806.jpg",
    galleryImages: [
      "https://bookonelocal.in/cdn/2026-04-02-081456220-DSC08807.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081502983-DSC08806.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081512105-DSC08805.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081516517-DSC08808.jpg",
    ],
  },
  {
    slug: "classic-package",
    title: "Classic Package",
    subtitle: "A refined bundled starting point for destination weddings with stay, meals, and venue access aligned beautifully.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Classic Package is the base wedding package at The Mountain, created for families who want stay, meals, services, and venue access simplified into one clear and elegant plan.",
    heroImage: "https://bookonelocal.in/cdn/DSC08846.avif",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Hosting",
        description: "Classic\nRs. 4,500 per person\nStay + 5 curated meals + venue access",
        image: "https://bookonelocal.in/cdn/DSC08846.avif",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Hosting",
        description: "Classic\nRs. 5,500 per person\nStay + 5 curated meals + venue access",
        image: "https://bookonelocal.in/cdn/DSC08837.avif",
      },
    ],
    galleryTabs: ["Meals", "Stay", "Pricing"],
    galleryImage: "https://bookonelocal.in/cdn/DSC08831.avif",
    packageComparison: standardPackageComparison,
  },
  {
    slug: "signature-package",
    title: "Signature Package",
    subtitle: "A richer destination wedding package with added starters and fuller meal depth for more generous family hosting.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Signature Package builds on the Classic Package by adding 2 extra starters and 1 extra gravy in lunch and dinner for a fuller hospitality experience across wedding functions.",
    heroImage: "https://bookonelocal.in/cdn/DSC08853.avif",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Hosting",
        description:
          "Signature\nRs. 5,500 per person\nClassic + 2 extra starters + 1 extra gravy in lunch and dinner",
        image: "https://bookonelocal.in/cdn/DSC08853.avif",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Hosting",
        description:
          "Signature\nRs. 6,500 per person\nClassic + 2 extra starters + 1 extra gravy in lunch and dinner",
        image: "https://bookonelocal.in/cdn/DSC08836.avif",
      },
    ],
    galleryTabs: ["Hospitality", "Dining", "Pricing"],
    galleryImage: "https://bookonelocal.in/cdn/DSC08820.avif",
    packageComparison: standardPackageComparison,
  },
  {
    slug: "premium-luxo-package",
    title: "Premium Luxe Package",
    subtitle: "An elevated destination wedding package with live counters, expanded dining presence, and a stronger premium-hosting feel.",
    introTitle: "PACKAGE DETAILS",
    introBody:
      "The Premium Luxe Package is the top package tier at The Mountain and includes Signature-level hospitality plus two live counters for celebrations that call for a more premium dining presence.",
    heroImage: "https://bookonelocal.in/cdn/DSC08849.avif",
    cards: [
      {
        label: "WEEKDAY OFFER",
        title: "Weekday Hosting",
        description: "Premium Luxe\nRs. 6,500 per person\nSignature package + 2 live counters",
        image: "https://bookonelocal.in/cdn/DSC08849.avif",
      },
      {
        label: "WEEKEND OFFER",
        title: "Weekend Hosting",
        description: "Premium Luxe\nRs. 7,500 per person\nSignature package + 2 live counters",
        image: "https://bookonelocal.in/cdn/DSC08831.avif",
      },
    ],
    galleryTabs: ["Premium", "Hospitality", "Pricing"],
    galleryImage: "https://bookonelocal.in/cdn/DSC08807.avif",
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
      facts: page.facts,
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

