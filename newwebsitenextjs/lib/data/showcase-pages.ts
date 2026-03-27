export const weddingsPageData = {
  breadcrumb: "Weddings",
  intro: {
    title: "Finest Luxury Destination Wedding Resort in India",
    subtitle: "Welcome to The Mountain Weddings where Love, Luxury, and Legacy come together.",
    paragraphs: [
      "A wedding is not just a celebration; it is a beautiful journey of love, emotions, and unforgettable moments.",
      "Together, let us create extraordinary weddings where every detail is carefully curated and every moment is cherished for a lifetime.",
    ],
  },
  heroSlides: [
    "/images/DSC08853.avif",
    "/images/DSC08717.avif",
    "/images/DSC08720.avif",
  ],
  venueImages: [
    "/images/DSC08758.avif",
    "/images/DSC08759.avif",
    "/images/DSC08763.avif",
    "/images/DSC08769.avif",
  ],
  weddingGallery: [
    "/images/DSC08801.avif",
    "/images/DSC08802.avif",
    "/images/DSC08807.avif",
    "/images/DSC08812.avif",
  ],
  dreamSection: {
    title: ["Plan Your Dream", "Destination Wedding"],
    description: "Designing dreams amidst luxury, crafting your perfect wedding at The Mountain Resorts.",
    cta: "ENQUIRE NOW",
  },
  destinationSection: {
    title: "The Perfect Wedding Destination",
    description:
      "From intimate celebratory events, to grand luxe weddings for 2000+ guests, The Mountain Resorts offers breathtaking thematic setups and venues.",
  },
  venuesSection: {
    title: "Venues Gallery",
    description:
      "The Mountain Resorts offers a variety of stunning venues for every occasion, from intimate gatherings to grand celebrations.",
    cta: "EXPLORE VENUES",
  },
  packageBanner: {
    text: "We offer special bridal & spa packages for the entire family & large groups",
    cta: "ENQUIRE NOW",
  },
  gallerySection: {
    title: "Wedding Gallery",
    tabs: {
      image: "Image Gallery",
      video: "Video Gallery",
    },
  },
  awards: [
    {
      badge: "WS",
      badgeClassName: "rounded-full bg-[#f22f84] text-white",
      title: "Wedding Sutra Best Destination Wedding Venue 2021",
    },
    {
      badge: "WOW",
      badgeClassName: "rounded-2xl border-4 border-[#cf9f46] text-[#cf9f46]",
      title: "Wow Awards By Hospitality Horizon 2024",
    },
  ],
} as const;

export const corporateEventsPageData = {
  hero: {
    image: "/images/DSC08820.avif",
    title: "The Mountain Resorts, The MICE Destination loved by India's Top 700+ Corporates",
    subtitle: "Plan your upcoming event, conference, or meeting at The Mountain Resorts",
  },
  intro: {
    title: "Plan Your Events and Conferences at The Mountain Resorts:\nIndia's Premier Corporate Outbound Destination",
    body:
      "Discover the ultimate venue for MICE events and conferences at The Mountain Resorts. Spread across scenic hills, our luxury destination is crafted for leadership meets, high-impact conferences, team offsites, and corporate celebrations. We blend hospitality, infrastructure, and execution excellence so your delegates and teams experience memorable business events.",
  },
  featureSection: {
    title: ["Best Destination for", "Corporate outing"],
    body: [
      "Spectacular rooms and suites, adventure activities, and premium event infrastructure designed to host impactful corporate experiences.",
      "Make your next MICE event extraordinary at The Mountain Resorts, where luxury meets strategy.",
    ],
    cta: "ENQUIRE NOW",
    image: "/images/DSC08836.avif",
  },
  whyCards: [
    {
      title: "800+ corporate clients",
      image: "/images/DSC08849.avif",
    },
    {
      title: "Experience of 5000+ Corporate Events",
      image: "/images/DSC08831.avif",
    },
    {
      title: "11 Stately indoor venues",
      image: "/images/DSC08837.avif",
    },
    {
      title: "12 Outdoor venues",
      image: "/images/DSC08846.avif",
    },
  ],
  venueImages: [
    "/images/DSC08853.avif",
    "/images/DSC08717.avif",
    "/images/DSC08720.avif",
    "/images/DSC08758.avif",
    "/images/DSC08759.avif",
    "/images/DSC08763.avif",
    "/images/DSC08769.avif",
    "/images/DSC08801.avif",
  ],
  venuesSection: {
    title: "Explore our Venues",
    cta: "EXPLORE VENUES",
  },
  testimonial: {
    label: "Testimonial Videos",
    title: "Axis Bank",
    image: "/images/DSC08802.avif",
  },
  clientLogos: ["CEAT", "AXIS BANK", "Reliance", "Cadbury", "Mahindra"],
} as const;

export const offersPageData = {
  heroImage: "/images/DSC08807.avif",
  hero: {
    title: "PACKAGE OPTIONS",
    subtitle: "AT THE MOUNTAIN, KARJAT.",
  },
  intro: {
    breadcrumb: "Offers",
    title: "Explore weekday, weekend, and package-wise wedding pricing at The Mountain",
    description:
      "Our destination wedding packages are structured around weekday and weekend plans with Classic, Signature, and Premium Luxe options including 5 meals, stay, venue access, meal upgrades, and live counter support.",
    cta: "ENQUIRE NOW",
  },
  offers: [
    {
      id: "weekday",
      title: "WEEKDAY PACKAGE",
      image: "/images/DSC08812.avif",
      description:
        "Monday to Thursday pricing with package-wise per person costing for destination wedding celebrations.",
      bullets: [
        "Classic Package: Rs. 4,500 per person",
        "Signature Package: Rs. 5,500 per person",
        "Premium Luxe Package: Rs. 6,500 per person",
        "Classic includes 5 meals + stay + venue access",
        "Signature includes Classic package + extra 2 starters + 1 gravy extra each in lunch and dinner",
        "Premium Luxe includes Signature package + 2 live counters",
      ],
    },
    {
      id: "weekend",
      title: "WEEKEND PACKAGE",
      image: "/images/DSC08820.avif",
      description:
        "Friday to Sunday pricing for peak celebration dates with upgraded package-wise per person rates.",
      bullets: [
        "Classic Package: Rs. 5,500 per person",
        "Signature Package: Rs. 6,500 per person",
        "Premium Luxe Package: Rs. 7,500 per person",
        "Classic includes 5 meals + stay + venue access",
        "Signature includes Classic package + extra 2 starters + 1 gravy extra each in lunch and dinner",
        "Premium Luxe includes Signature package + 2 live counters",
      ],
    },
    {
      id: "classic",
      title: "CLASSIC PACKAGE",
      image: "/images/DSC08836.avif",
      description:
        "Core wedding package covering 5 meals, stay, venue access, and essential event hospitality.",
      bullets: [
        "5 meals + stay + venue access",
        "Weekday price: Rs. 4,500 per person",
        "Weekend price: Rs. 5,500 per person",
      ],
    },
    {
      id: "signature",
      title: "SIGNATURE PACKAGE",
      image: "/images/DSC08849.avif",
      description:
        "Enhanced wedding package with the Classic base plus upgraded meal inclusions for fuller guest hospitality.",
      bullets: [
        "Classic package + extra 2 starters",
        "1 gravy extra each in lunch and dinner",
        "Weekday price: Rs. 5,500 per person | Weekend price: Rs. 6,500 per person",
      ],
    },
    {
      id: "premium-luxo",
      title: "PREMIUM LUXE PACKAGE",
      image: "/images/DSC08831.avif",
      description:
        "Premium package tier for destination celebrations with Signature inclusions plus 2 live counters.",
      bullets: [
        "Signature package + 2 live counters",
        "Weekday price: Rs. 6,500 per person",
        "Weekend price: Rs. 7,500 per person",
      ],
    },
  ],
  contactLine:
    "Price per person includes lunch, hi-tea, starters, dinner, and breakfast. Additional items can be customized as per preference and are charged separately on a per-person, per-day basis.",
} as const;

export const adventureParkPageData = {
  hero: {
    image: "/images/DSC08837.avif",
    title: "THE MOUNTAIN ADVENTURE PARK",
  },
  intro: {
    breadcrumb: "Adventure Park",
    title: "THE PIONEERS OF INDIA'S LARGEST EXTREME ADVENTURE PARK",
    description:
      "Born from a passion for adventure, The Mountain Adventure Park became a signature destination for adrenaline lovers, corporates, and families.",
  },
  highlight: {
    title: "The Mountain Pickleball",
    lines: ["All you fellow Pickleball lovers", "Get on the latest trend"],
    image: "/images/DSC08846.avif",
    cta: "Book Now",
  },
  overview: {
    body:
      "Fully back-end integrated, The Mountain Adventure is a thrilling getaway destination for families and friends. The sprawling park offers bungee jumping, swoop swing, India's longest flying fox, dirt biking, ATV tracks, and more, backed by a passionate team and robust operations.",
    image: "/images/DSC08853.avif",
    cta: "EXPLORE",
  },
  activitiesTitle: "70+ Extreme Adventure Activities",
  activitiesDescription:
    "Feel the adrenaline rush while experiencing signature mind-blowing activities, making The Mountain Adventure one of the best adventure parks in India.",
  activityCards: [
    {
      title: "The Mountain Pickleball",
      subtitle: "",
      image: "/images/DSC08717.avif",
    },
    {
      title: "The Mountain Bungee",
      subtitle: "(150 ft.)",
      image: "/images/DSC08720.avif",
    },
    {
      title: "The Mountain Swoop Swing",
      subtitle: "",
      image: "/images/DSC08758.avif",
    },
    {
      title: "India's Longest Flying Fox",
      subtitle: "(1250 ft.)",
      image: "/images/DSC08759.avif",
    },
    {
      title: "ATV & Motocross Dirt Bike Riding Track",
      subtitle: "",
      image: "/images/DSC08763.avif",
    },
    {
      title: "Sky Cycling",
      subtitle: "",
      image: "/images/DSC08769.avif",
    },
  ],
  galleryTitle: "Adventure Gallery",
  galleryImages: [
    "/images/DSC08801.avif",
    "/images/DSC08802.avif",
    "/images/DSC08807.avif",
    "/images/DSC08812.avif",
  ],
  testimonialImages: [
    "/images/DSC08820.avif",
    "/images/DSC08836.avif",
  ],
} as const;

export const entertainmentPageData = {
  heroImage: "/images/DSC08849.avif",
  intro: {
    breadcrumb: "The Mountain Entertainment",
    title: "Welcome to India's Iconic Entertainment Destination",
    paragraphs: [
      "Step into a realm of extraordinary live performances where every evening is crafted to captivate your senses with music, choreography, and immersive stage experiences.",
      "From Vegas inspired spectacles to Bollywood extravaganzas and curated culinary pairings, The Mountain Entertainment transforms nightlife into unforgettable luxury moments.",
    ],
  },
  latestShowsTitle: "Our Latest Shows",
  latestShowsDescription:
    "Join us for opulent evenings of unparalleled entertainment with a curated selection of shows and genres.",
  showCards: [
    {
      title: "The Vegas Show",
      subtitle: "At Cafe 24, 5 days a week",
      description:
        "Step into a world of grand Broadway style live acts, exotic dance sequences, and high-energy stage performances paired with curated dining.",
      cta: "LEARN MORE",
      image: "/images/DSC08831.avif",
    },
    {
      title: "Bollywood Night",
      subtitle: "At Parsi Dhaba, 3 days a week",
      description:
        "Experience the vibrant spirit of Bollywood with cinematic dance, live entertainment, premium food experiences, and unforgettable music nights.",
      cta: "COMING SOON",
      image: "/images/DSC08837.avif",
    },
  ],
  reservationCta: "CALL NOW FOR RESERVATIONS",
  skyGarden: {
    title: "The Mountain Sky Garden",
    description:
      "Elevate your evenings with a one-of-a-kind sky dining concept featuring curated menus, immersive ambience, and panoramic night views designed for unforgettable luxury entertainment.",
    cta: "LEARN MORE",
    image: "/images/DSC08846.avif",
  },
  fullBleed: {
    title: "India's Iconic Entertainment Destination Awaits You",
    image: "/images/DSC08853.avif",
  },
  gallery: {
    title: "Gallery",
    tabs: {
      gallery: "IMAGE GALLERY",
      media: "VIDEOS & TESTIMONIALS",
    },
    galleryImages: [
      "/images/DSC08717.avif",
      "/images/DSC08720.avif",
      "/images/DSC08758.avif",
      "/images/DSC08759.avif",
    ],
    mediaImages: [
      "/images/DSC08763.avif",
      "/images/DSC08769.avif",
      "/images/DSC08801.avif",
      "/images/DSC08802.avif",
    ],
  },
  contact: [
    {
      title: "Find us",
      value: "Kunegaon Lonavala,\nMaharashtra 410401, India",
    },
    {
      title: "Call us",
      value: "7030164000",
    },
    {
      title: "Mail us",
      value: "guestexperiencemanager@themountainresorts.com",
    },
    {
      title: "Get in touch",
      value: "Contact Us",
    },
  ],
} as const;

export const experiencesPageData = {
  heroSlides: [
    {
      image: "/images/DSC08807.avif",
      thumb: "/images/DSC08812.avif",
    },
    {
      image: "/images/DSC08820.avif",
      thumb: "/images/DSC08836.avif",
    },
    {
      image: "/images/DSC08849.avif",
      thumb: "/images/DSC08831.avif",
    },
    {
      image: "/images/DSC08837.avif",
      thumb: "/images/DSC08846.avif",
    },
  ],
  intro: {
    breadcrumb: "The Mountain Experience",
    title: "INDIA'S NO 1 EXPERIENTIAL HOSPITALITY CAPITAL",
    description:
      "Immerse yourself in specially curated one of a kind experiences and create memories that will last you a lifetime.",
    featureImage: "/images/DSC08853.avif",
    splitTitle:
      "A luxurious stay at The Mountain Resorts goes beyond the conventional offerings of lavish stay and superlative cuisine.",
    splitBody:
      "\"Experiential Hospitality\" is the ethos at the property, translated into distinctly different offerings that leave a lasting impression. Indulge in the highest echelons of hospitality and encapsulate them through personalized experiences across categories for unforgettable moments with your loved ones.",
  },
  founderSection: {
    title: "50+ BESPOKE EXPERIENCES TO CHERISH",
    quote: [
      "Come discover 50+ unique and exciting experiences at The Mountain, inspired by global travel across luxury, lifestyle, adventure and hospitality.",
      "I hope you enjoy them as much as we have, while curating each experience in order to make every moment memorable at The Mountain.",
    ],
    author: "The Mountain Team",
    role: "Chairman & Managing Director",
    image: "/images/DSC08717.avif",
  },
  experiencesIntro: {
    lead:
      "Our signature experiences are on par with global standards, bringing the very finest that hospitality has to offer for discerning guests.",
    body:
      "Whether you are looking to serenade your loved ones with a picturesque picnic or indulge in a family experience followed by uplifting signature cocktails, our curated offerings ensure there is something for everyone.",
    title: "50+ EXPERIENCES",
  },
  experienceCards: [
    {
      title: "Experiences that Thrill",
      description: "Feel the adrenaline rush and indulge in thrilling experiences to ensure a fun filled day ahead.",
      image: "/images/DSC08720.avif",
    },
    {
      title: "Signature Spa Therapies",
      description:
        "Relax and rejuvenate at our 24-hour spa and indulge in luxurious special therapies by expert therapists.",
      image: "/images/DSC08758.avif",
    },
    {
      title: "Signature Culinary",
      description:
        "Discover culinary experiences designed to tantalize your taste buds and celebrate flavors from across the world.",
      image: "/images/DSC08759.avif",
    },
  ],
} as const;
