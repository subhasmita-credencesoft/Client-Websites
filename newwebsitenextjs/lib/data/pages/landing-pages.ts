export type LandingPageData = {
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  cards: Array<{
    label: string;
    title: string;
    description: string;
    image: string;
  }>;
  highlights: {
    title: string;
    items: string[];
  };
  extraSections?: Array<{
    title: string;
    body: string;
  }>;
  summary: {
    title: string;
    body: string;
  };
  cta?: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

export const relatedLandingPages: Record<string, Array<{ label: string; href: string }>> = {
  "luxury-resort-karjat": [
    { label: "Destination Wedding in Karjat", href: "/destination-wedding-karjat" },
    { label: "Resort Near Mumbai", href: "/resort-near-mumbai" },
    { label: "Weekend Getaway in Karjat", href: "/weekend-getaway-karjat" },
    { label: "Corporate Retreat in Karjat", href: "/corporate-retreat-karjat" },
    { label: "Family Resort in Karjat", href: "/family-resort-karjat" },
  ],
  "destination-wedding-karjat": [
    { label: "Luxury Resort in Karjat", href: "/luxury-resort-karjat" },
    { label: "Resort Near Mumbai", href: "/resort-near-mumbai" },
    { label: "Weekend Getaway in Karjat", href: "/weekend-getaway-karjat" },
    { label: "Corporate Retreat in Karjat", href: "/corporate-retreat-karjat" },
    { label: "Family Resort in Karjat", href: "/family-resort-karjat" },
  ],
  "resort-near-mumbai": [
    { label: "Luxury Resort in Karjat", href: "/luxury-resort-karjat" },
    { label: "Destination Wedding in Karjat", href: "/destination-wedding-karjat" },
    { label: "Weekend Getaway in Karjat", href: "/weekend-getaway-karjat" },
    { label: "Corporate Retreat in Karjat", href: "/corporate-retreat-karjat" },
    { label: "Family Resort in Karjat", href: "/family-resort-karjat" },
  ],
  "weekend-getaway-karjat": [
    { label: "Luxury Resort in Karjat", href: "/luxury-resort-karjat" },
    { label: "Destination Wedding in Karjat", href: "/destination-wedding-karjat" },
    { label: "Resort Near Mumbai", href: "/resort-near-mumbai" },
    { label: "Corporate Retreat in Karjat", href: "/corporate-retreat-karjat" },
    { label: "Family Resort in Karjat", href: "/family-resort-karjat" },
  ],
  "corporate-retreat-karjat": [
    { label: "Luxury Resort in Karjat", href: "/luxury-resort-karjat" },
    { label: "Destination Wedding in Karjat", href: "/destination-wedding-karjat" },
    { label: "Resort Near Mumbai", href: "/resort-near-mumbai" },
    { label: "Weekend Getaway in Karjat", href: "/weekend-getaway-karjat" },
    { label: "Family Resort in Karjat", href: "/family-resort-karjat" },
  ],
  "family-resort-karjat": [
    { label: "Luxury Resort in Karjat", href: "/luxury-resort-karjat" },
    { label: "Destination Wedding in Karjat", href: "/destination-wedding-karjat" },
    { label: "Resort Near Mumbai", href: "/resort-near-mumbai" },
    { label: "Weekend Getaway in Karjat", href: "/weekend-getaway-karjat" },
    { label: "Corporate Retreat in Karjat", href: "/corporate-retreat-karjat" },
  ],
};

export const landingPages: Record<string, LandingPageData> = {
  "luxury-resort-karjat": {
    slug: "luxury-resort-karjat",
    hero: {
      title: "Luxury Resort in Karjat",
      subtitle:
        "A 7-acre private estate with scenic mountain views, curated wedding packages, luxury stays, and destination hospitality designed for celebrations near Mumbai and Pune.",
      image: "https://bookonelocal.in/cdn/DSC08831.avif",
    },
    intro: {
      eyebrow: "Luxury Destination Resort",
      title:
        "The Mountain Resort in Karjat offers a private luxury destination experience with mountain-facing venues, curated stays, and wedding-ready hospitality",
      body: "Nestled in the Sahyadri foothills, The Mountain Resort in Karjat, By Redwings is a 7-acre private estate designed for couples and families who want a luxury destination wedding and stay experience without the overwhelm of a large commercial hotel. From scenic mountain views and open celebration lawns to curated packages and round-the-clock pool access, every detail is planned to make your destination feel private, elegant, and celebration-ready from arrival to departure.",
    },
    cards: [
      {
        label: "LUXURY STAY",
        title: "Five Premium Room Categories",
        description:
          "Choose from Standard Rooms, Cliff View Rooms, Family Rooms, Glass Jacuzzi Rooms, and a private Bungalow, each designed for comfort, privacy, and a stronger destination atmosphere.",
        image: "https://bookonelocal.in/cdn/DSC08801.jpg",
      },
      {
        label: "DINING",
        title: "Curated Multi-Meal Hospitality",
        description:
          "Every package includes five curated meal services daily, with Signature and Premium Luxe tiers offering expanded starters, additional gravies, and live cooking counters.",
        image: "https://bookonelocal.in/cdn/DSC08831.avif",
      },
      {
        label: "CELEBRATION VENUES",
        title: "Private Estate Wedding Lawns",
        description:
          "Open-air lawns, poolside celebration zones, and private event spaces designed for Haldi, Mehendi, Sangeet, Cocktail Night, and reception-style gatherings.",
        image: "https://bookonelocal.in/cdn/DSC08837.avif",
      },
      {
        label: "EXPERIENCE",
        title: "Scenic Mountain Surroundings",
        description:
          "Lush greenery, valley views, and natural mountain backdrops create a cinematic destination setting for ceremonies, couple portraits, and celebration photography.",
        image: "https://bookonelocal.in/cdn/DSC08849.avif",
      },
    ],
    highlights: {
      title: "What makes this resort stand out",
      items: [
        "7 acres of private green estate with mountain-facing views",
        "5 luxury room types from Rs. 2,000 to Rs. 20,000",
        "Unlimited music hours with zero sound license requirement",
        "24x7 pool access and rain dance zone",
        "Wedding packages from Rs. 4,500 per person including stay and meals",
        "Approx. 2 to 3 hours from Mumbai and Pune by road",
        "Exclusive full-estate booking for complete celebration privacy",
      ],
    },
    extraSections: [
      {
        title: "Why Karjat works as a luxury wedding destination",
        body: "Karjat offers the perfect balance of natural beauty, easy accessibility from Mumbai and Pune, and a calmer destination atmosphere compared to larger hill stations. The Mountain Resort uses this setting to create a luxury estate experience where families can stay, dine, and celebrate together without the complexity of coordinating between multiple venues.",
      },
      {
        title: "A resort designed for celebration, not just accommodation",
        body: "Unlike standard hotel stays, The Mountain is purpose-built for destination weddings and multi-day celebrations. Every space from the lawns to the dining areas, poolside zones, and room categories is planned to support wedding itineraries, guest movement, and a smoother hosting experience for families.",
      },
      {
        title: "Curated packages that simplify luxury planning",
        body: "Classic, Signature, and Premium Luxe packages bundle stay, meals, venue access, and hospitality into one clear booking structure. This helps families understand costs upfront and plan with more confidence compared to itemised hotel billing.",
      },
      {
        title: "Photography and visual storytelling built into the venue",
        body: "Mountain views, natural greenery, open sky compositions, and scenic corners throughout the estate give couples and photographers a destination setting that looks premium without needing heavy staging or artificial backdrops.",
      },
    ],
    summary: {
      title: "A luxury resort where every detail serves the celebration",
      body: "From the moment guests arrive to the final farewell, The Mountain Resort in Karjat brings together luxury stays, curated dining, scenic venues, and private-estate hospitality into one seamless destination wedding experience.",
    },
    cta: {
      primary: { label: "Check Availability", href: "/booking" },
      secondary: { label: "Contact The Team", href: "/contact" },
    },
  },

  "destination-wedding-karjat": {
    slug: "destination-wedding-karjat",
    hero: {
      title: "Destination Wedding in Karjat",
      subtitle:
        "A private 7-acre estate with mountain views, wedding lawns, curated packages, and all-in-one celebration hosting for couples and families.",
      image: "https://bookonelocal.in/cdn/DSC08846.avif",
    },
    intro: {
      eyebrow: "Destination Wedding Venue",
      title:
        "Plan a destination wedding in Karjat with scenic venues, bundled packages, and private estate exclusivity at The Mountain Resort",
      body: "The Mountain Resort in Karjat, By Redwings is a private destination wedding venue designed for couples who want mountain-facing celebration spaces, curated stay-and-dine packages, and the exclusivity of a full-estate booking. From Haldi and Mehendi to Sangeet, Cocktail Night, wedding ceremonies, and receptions, every function can be hosted within one connected destination property with luxury rooms, multi-meal hospitality, and the scenic beauty of the Sahyadri foothills as your backdrop.",
    },
    cards: [
      {
        label: "VENUE",
        title: "Private Wedding Lawns",
        description:
          "Open-air lawns designed for traditional ceremonies, varmala setups, sangeet performances, and reception-style celebrations with mountain-facing backdrops and comfortable guest flow.",
        image: "https://bookonelocal.in/cdn/DSC08837.avif",
      },
      {
        label: "STAY",
        title: "On-Site Guest Accommodation",
        description:
          "Five room categories accommodate wedding guests, host families, and premium visitors with seamless access to celebration zones, dining areas, and poolside leisure throughout the event.",
        image: "https://bookonelocal.in/cdn/DSC08812.avif",
      },
      {
        label: "DINING",
        title: "All-Inclusive Meal Packages",
        description:
          "Stay, five daily meals, venue access, and hospitality bundled into Classic, Signature, and Premium Luxe formats with per-person pricing that simplifies wedding budgeting.",
        image: "https://bookonelocal.in/cdn/DSC08853.avif",
      },
      {
        label: "FLOW",
        title: "Multi-Function Celebration Spaces",
        description:
          "Dedicated zones for Haldi, Mehendi, Sangeet, cocktails, and receptions ensure each wedding function has its own energy, setup, and smooth guest movement across the estate.",
        image: "https://bookonelocal.in/cdn/DSC08849.avif",
      },
    ],
    highlights: {
      title: "Destination wedding essentials at The Mountain",
      items: [
        "Full-estate exclusive booking with no shared event traffic",
        "Unlimited music hours and zero sound license requirement",
        "Wedding packages from Rs. 4,500 per person on weekdays",
        "Multiple venue zones for different celebration functions",
        "24x7 pool access for wedding groups and guests",
        "Photography-ready mountain and greenery backdrops",
        "Approx. 2 to 3 hours from Mumbai, convenient for wedding guests",
      ],
    },
    extraSections: [
      {
        title: "How destination wedding packages work at The Mountain",
        body: "Packages are calculated per person per day and include stay, five curated meals, venue access, and hospitality. Choose Classic for a strong starting point, Signature for expanded dining depth, or Premium Luxe for live counters and elevated presentation. Weekday and weekend pricing provides flexibility for different celebration dates.",
      },
      {
        title: "What makes Karjat a smart destination wedding choice",
        body: "Karjat combines natural beauty, cooler climate, and easier guest travel compared to more remote hill stations. Its proximity to Mumbai and Pune means wedding guests arrive more comfortably, while the mountain setting creates a destination atmosphere that feels removed from the city without being difficult to reach.",
      },
      {
        title: "How the venue supports multi-day wedding itineraries",
        body: "Because stay, dining, venues, and leisure are all on-site, The Mountain supports smooth multi-day wedding itineraries where families can host functions, meals, and guest gatherings without moving between separate locations. This helps event planners, photographers, and hosting families manage the celebration with less logistical stress.",
      },
      {
        title: "Booking and confirmation process",
        body: "A 50% advance secures your preferred dates. The remaining balance is completed before check-in after headcount confirmation. Final billing is aligned to the confirmed guest list, and date rescheduling remains subject to availability.",
      },
    ],
    summary: {
      title: "A destination wedding venue built for family celebration",
      body: "The Mountain Resort in Karjat gives couples a private estate with mountain beauty, wedding-ready venues, bundled hospitality, and the full-estate exclusivity that makes destination celebrations feel truly personal and memorable.",
    },
    cta: {
      primary: { label: "Get Wedding Proposal", href: "/quotation" },
      secondary: { label: "View Wedding Packages", href: "/offers" },
    },
  },

  "resort-near-mumbai": {
    slug: "resort-near-mumbai",
    hero: {
      title: "Resort Near Mumbai",
      subtitle:
        "A private mountain resort approx. 2 to 3 hours from Mumbai with wedding venues, luxury stays, curated packages, and scenic celebration spaces.",
      image: "https://bookonelocal.in/cdn/DSC08769.avif",
    },
    intro: {
      eyebrow: "Mumbai to Karjat",
      title:
        "The closest private mountain resort for destination weddings, weekend stays, and celebration hosting near Mumbai",
      body: "Located in Karjat, approximately 2 to 3 hours from Mumbai by road, The Mountain Resort in Karjat, By Redwings is the nearest private mountain resort offering full-estate wedding hosting, luxury stays, and curated celebration packages. For Mumbai-based families planning destination weddings, weekend getaways, or group stays, The Mountain provides a scenic mountain escape without the long travel times of more remote destinations. Guests arriving from Mumbai, Navi Mumbai, Thane, and surrounding areas reach the estate comfortably in a single road trip.",
    },
    cards: [
      {
        label: "ACCESS",
        title: "Easy Mumbai Connectivity",
        description:
          "Approximately 2 to 3 hours from Mumbai depending on traffic, making it one of the closest private mountain resorts for wedding guests, families, and weekend travellers from the city.",
        image: "https://bookonelocal.in/cdn/DSC08831.avif",
      },
      {
        label: "STAY",
        title: "Luxury Accommodation Near Mumbai",
        description:
          "Five room categories from Standard Rooms to a private Bungalow provide comfortable on-site stays so Mumbai guests can enjoy a destination experience without extended travel.",
        image: "https://bookonelocal.in/cdn/DSC08801.jpg",
      },
      {
        label: "CELEBRATION",
        title: "Destination Wedding Venue",
        description:
          "Private wedding lawns, poolside celebration zones, and curated wedding packages make The Mountain a convenient destination wedding venue for Mumbai-based couples and families.",
        image: "https://bookonelocal.in/cdn/DSC08837.avif",
      },
      {
        label: "WEEKEND",
        title: "Weekend Getaway Destination",
        description:
          "Mountain views, poolside leisure, scenic walks, and a calm resort atmosphere create an ideal short-break destination for Mumbai residents seeking a quick nature escape.",
        image: "https://bookonelocal.in/cdn/DSC08849.avif",
      },
    ],
    highlights: {
      title: "Why Mumbai guests choose The Mountain",
      items: [
        "Approx. 2 to 3 hours from Mumbai by road",
        "One of the closest private mountain resorts to the city",
        "Ideal for Mumbai-based destination wedding planning",
        "Full-estate exclusive booking for private celebrations",
        "Wedding packages from Rs. 4,500 per person",
        "24x7 pool access and unlimited music hours",
        "Easy for wedding guests, planners, and vendors to travel",
      ],
    },
    extraSections: [
      {
        title: "Travel convenience for Mumbai wedding guests",
        body: "Because Karjat is within comfortable driving distance of Mumbai, wedding guests face less travel fatigue and more celebration time. The resort team can share Google Maps navigation with the venue name, helping guests plan the most efficient route from their pickup points across Mumbai, Navi Mumbai, and Thane.",
      },
      {
        title: "Perfect for Mumbai families planning destination weddings",
        body: "For Mumbai couples who want the beauty of a mountain destination without the logistics of far-flung locations, The Mountain offers the ideal balance. Guests arrive easily, celebrations unfold across private venues, and the estate feel makes the wedding genuinely memorable without requiring extensive travel planning.",
      },
      {
        title: "Weekend stays and short breaks from the city",
        body: "Beyond weddings, The Mountain is an excellent choice for weekend getaways, family reunions, corporate retreats, and short nature breaks. The mountain setting, poolside leisure, and curated meal packages give Mumbai residents a refreshing escape without the commitment of a long holiday.",
      },
    ],
    summary: {
      title: "The nearest mountain resort for Mumbai celebrations",
      body: "With easy road connectivity, private-estate exclusivity, and celebration-ready hospitality, The Mountain Resort in Karjat is the closest luxury mountain destination for Mumbai families planning weddings, stays, and group events.",
    },
    cta: {
      primary: { label: "Check Availability", href: "/booking" },
      secondary: { label: "Contact The Team", href: "/contact" },
    },
  },

  "weekend-getaway-karjat": {
    slug: "weekend-getaway-karjat",
    hero: {
      title: "Weekend Getaway in Karjat",
      subtitle:
        "A scenic mountain resort with poolside leisure, luxury stays, curated dining, and a calm private-estate atmosphere for short breaks near Mumbai and Pune.",
      image: "https://bookonelocal.in/cdn/DSC08853.avif",
    },
    intro: {
      eyebrow: "Weekend Escape",
      title:
        "A weekend getaway destination in Karjat with mountain views, poolside leisure, and curated stay-and-dine packages",
      body: "The Mountain Resort in Karjat, By Redwings offers an ideal weekend getaway for couples, families, and small groups seeking a quick escape from Mumbai or Pune. With luxury room categories, five daily meals included in stay packages, 24x7 pool access, scenic mountain views, and a private-estate atmosphere, The Mountain turns a short break into a refreshing destination experience without the complexity of longer holiday planning.",
    },
    cards: [
      {
        label: "STAY",
        title: "Curated Weekend Stays",
        description:
          "Choose from five room categories with stay-and-meals packages starting at Rs. 3,000 per person, giving couples and families a comfortable mountain base for short breaks.",
        image: "https://bookonelocal.in/cdn/DSC08801.jpg",
      },
      {
        label: "LEISURE",
        title: "24x7 Pool Access",
        description:
          "Unlimited pool access throughout your stay, with a rain dance zone and mountain-facing poolside setting that adds leisure and relaxation to your weekend itinerary.",
        image: "https://bookonelocal.in/cdn/DSC08849.avif",
      },
      {
        label: "DINING",
        title: "Five Daily Meals Included",
        description:
          "Every stay package includes lunch, hi-tea, starters, dinner, and breakfast, giving guests a complete dining experience without hunting for external restaurants.",
        image: "https://bookonelocal.in/cdn/DSC08831.avif",
      },
      {
        label: "SCENERY",
        title: "Mountain & Valley Views",
        description:
          "Lush green landscapes, mountain backdrops, and open-air settings create a calm, nature-connected atmosphere ideal for unwinding and recharging over the weekend.",
        image: "https://bookonelocal.in/cdn/DSC08837.avif",
      },
    ],
    highlights: {
      title: "Weekend getaway essentials",
      items: [
        "Approx. 2 to 3 hours from Mumbai, 2 to 2.5 hours from Pune",
        "Stay-and-meals packages from Rs. 3,000 per person",
        "24x7 pool access and rain dance zone",
        "Scenic mountain views and open-air leisure",
        "Five curated meals daily in every package",
        "Private-estate atmosphere with no crowd or noise",
        "Ideal for couples, families, and small group weekends",
      ],
    },
    extraSections: [
      {
        title: "What makes a weekend at The Mountain different",
        body: "Unlike standard city hotels or crowded resorts, The Mountain gives weekend guests a private-estate atmosphere with mountain views, open spaces, curated dining, and poolside leisure. The experience feels genuinely removed from the city even though travel time is short.",
      },
      {
        title: "Ideal for quick nature breaks and couple escapes",
        body: "Couples and small families looking for a two-night break find The Mountain especially appealing. The combination of scenic surroundings, comfortable rooms, included meals, and poolside relaxation creates a complete weekend experience without needing to plan activities outside the property.",
      },
      {
        title: "Group weekends and friend getaways",
        body: "The Mountain also works beautifully for friend groups, small reunions, and casual celebration weekends. The estate setting, dining packages, and leisure options give groups a shared destination experience with the privacy and comfort of a dedicated venue.",
      },
    ],
    summary: {
      title: "A weekend that actually feels like an escape",
      body: "Mountain views, poolside leisure, curated dining, and a private-estate atmosphere make The Mountain Resort in Karjat the perfect short-break destination for couples, families, and groups from Mumbai and Pune.",
    },
    cta: {
      primary: { label: "Book Weekend Stay", href: "/booking" },
      secondary: { label: "View Packages", href: "/offers" },
    },
  },

  "corporate-retreat-karjat": {
    slug: "corporate-retreat-karjat",
    hero: {
      title: "Corporate Retreat in Karjat",
      subtitle:
        "A private mountain resort with event spaces, group stays, curated dining, and scenic surroundings designed for corporate off-sites, team retreats, and business gatherings.",
      image: "https://bookonelocal.in/cdn/DSC08846.avif",
    },
    intro: {
      eyebrow: "Corporate Off-Site Venue",
      title:
        "Host your next corporate retreat at a private mountain resort with event-ready spaces and group hospitality in Karjat",
      body: "The Mountain Resort in Karjat, By Redwings offers a private-estate setting ideal for corporate off-sites, team-building retreats, leadership gatherings, and business celebration events. With multiple event zones, group accommodation across five room categories, curated dining packages, and a scenic mountain environment that naturally encourages focus and connection, The Mountain provides a professional yet refreshing alternative to conventional conference hotels.",
    },
    cards: [
      {
        label: "VENUE",
        title: "Flexible Event Spaces",
        description:
          "Open lawns, private function areas, and indoor-capable zones support presentations, workshops, team activities, and corporate celebration formats with professional setup flexibility.",
        image: "https://bookonelocal.in/cdn/DSC08837.avif",
      },
      {
        label: "STAY",
        title: "Group Accommodation",
        description:
          "Five room categories from Standard Rooms to the Bungalow provide comfortable on-site stays for leadership teams, department groups, and full-company retreats.",
        image: "https://bookonelocal.in/cdn/DSC08812.avif",
      },
      {
        label: "DINING",
        title: "Curated Group Dining",
        description:
          "Multi-meal packages with breakfast, lunch, hi-tea, starters, and dinner simplify group meal planning, keeping teams nourished and focused throughout the retreat.",
        image: "https://bookonelocal.in/cdn/DSC08831.avif",
      },
      {
        label: "ATMOSPHERE",
        title: "Scenic Mountain Setting",
        description:
          "Mountain views, open greenery, and a calm private-estate environment create a naturally inspiring backdrop that helps teams disconnect from routine and reconnect with each other.",
        image: "https://bookonelocal.in/cdn/DSC08849.avif",
      },
    ],
    highlights: {
      title: "Why teams choose The Mountain for corporate retreats",
      items: [
        "Private-estate exclusivity for focused team gatherings",
        "Multiple event zones for workshops, activities, and sessions",
        "Group stay packages with on-site accommodation and dining",
        "Scenic mountain setting that inspires creativity and focus",
        "24x7 pool access and leisure for team bonding",
        "Approx. 2 to 3 hours from Mumbai for easy team travel",
        "Unlimited music hours for corporate celebration evenings",
      ],
    },
    extraSections: [
      {
        title: "What types of corporate events work at The Mountain",
        body: "The Mountain hosts leadership retreats, department off-sites, team-building weekends, product launch celebrations, annual corporate gatherings, and business milestone events. The flexible venue layout accommodates everything from intimate board meetings to full-team outdoor activities.",
      },
      {
        title: "How group booking works for corporate events",
        body: "Contact the team with your preferred dates, expected headcount, event format, and accommodation requirements. The team will prepare a tailored proposal covering venue access, stay arrangements, dining packages, and any additional setup needs for your corporate retreat.",
      },
      {
        title: "Team-building in a mountain environment",
        body: "The natural surroundings, open lawns, poolside zones, and scenic backdrops at The Mountain naturally support team-building activities, outdoor games, group photography sessions, and collaborative experiences that feel more genuine than indoor conference settings.",
      },
    ],
    summary: {
      title: "A corporate retreat that feels genuinely refreshing",
      body: "Private-estate exclusivity, scenic mountain views, group hospitality, and flexible event spaces make The Mountain Resort in Karjat an inspiring and practical choice for corporate off-sites and team retreats.",
    },
    cta: {
      primary: { label: "Request Corporate Proposal", href: "/quotation" },
      secondary: { label: "Contact The Team", href: "/contact" },
    },
  },

  "family-resort-karjat": {
    slug: "family-resort-karjat",
    hero: {
      title: "Family Resort in Karjat",
      subtitle:
        "A private mountain resort with family-friendly rooms, group dining, poolside leisure, and a safe estate environment for family holidays and celebrations.",
      image: "https://bookonelocal.in/cdn/DSC08828.jpg",
    },
    intro: {
      eyebrow: "Family Destination",
      title:
        "A family-friendly mountain resort in Karjat with group stays, curated dining, poolside fun, and celebration-ready spaces",
      body: "The Mountain Resort in Karjat, By Redwings is designed for families who want a safe, comfortable, and scenic destination for holidays, reunions, milestone celebrations, and multi-day gatherings. With Family Rooms and a Bungalow for larger groups, curated meal packages that cover all daily dining needs, 24x7 pool access, open play areas, and a private-estate environment, The Mountain creates a family destination experience where parents relax, children play, and everyone enjoys the mountain atmosphere together.",
    },
    cards: [
      {
        label: "STAY",
        title: "Family-Friendly Accommodation",
        description:
          "Family Rooms designed for group comfort and a private Bungalow for host families provide space, privacy, and easy on-site movement for families travelling together.",
        image: "https://bookonelocal.in/cdn/DSC08820.avif",
      },
      {
        label: "DINING",
        title: "All-Inclusive Family Dining",
        description:
          "Five daily meals included in every stay package mean parents don't need to plan or search for restaurants, making the family holiday more relaxed and enjoyable.",
        image: "https://bookonelocal.in/cdn/DSC08831.avif",
      },
      {
        label: "LEISURE",
        title: "Poolside & Open Spaces",
        description:
          "24x7 pool access, rain dance zone, open lawns, and scenic mountain surroundings give families plenty of space for children to play and adults to unwind.",
        image: "https://bookonelocal.in/cdn/DSC08849.avif",
      },
      {
        label: "SAFETY",
        title: "Private Estate Security",
        description:
          "A full-estate exclusive booking ensures families enjoy complete privacy, controlled access, and a secure environment where children and guests feel safe throughout the stay.",
        image: "https://bookonelocal.in/cdn/DSC08812.avif",
      },
    ],
    highlights: {
      title: "Family resort essentials at The Mountain",
      items: [
        "Family Rooms and Bungalow for group stays",
        "Five curated meals daily in every package",
        "24x7 pool access and rain dance zone",
        "Private-estate environment with controlled access",
        "Open green spaces for children and family activities",
        "Stay packages from Rs. 3,000 per person",
        "Approx. 2 to 3 hours from Mumbai for easy family travel",
      ],
    },
    extraSections: [
      {
        title: "Why families choose The Mountain over standard hotels",
        body: "Unlike commercial hotels, The Mountain offers a private-estate atmosphere where families control the entire property during their stay. Children have open spaces to play, meals are included in the package, pool access is unlimited, and the mountain setting creates genuine holiday memories rather than just a room booking.",
      },
      {
        title: "Multi-generational family gatherings and reunions",
        body: "The variety of room categories, from Standard Rooms to the Bungalow, allows multi-generational families to stay together while maintaining individual comfort. Grandparents, parents, and children all find suitable accommodation within the same estate.",
      },
      {
        title: "Family celebrations and milestone events",
        body: "Beyond holidays, The Mountain hosts birthday celebrations, anniversary gatherings, family reunions, and intimate milestone events. The venue spaces, dining packages, and private-estate exclusivity make it easy to celebrate together without the complexity of external venue bookings.",
      },
    ],
    summary: {
      title: "A family resort where every member enjoys the stay",
      body: "Mountain views, poolside leisure, curated dining, and a safe private-estate environment make The Mountain Resort in Karjat a family destination where holidays feel relaxed, joyful, and genuinely memorable.",
    },
    cta: {
      primary: { label: "Book Family Stay", href: "/booking" },
      secondary: { label: "Contact The Team", href: "/contact" },
    },
  },
};

export const landingPageSlugs = Object.keys(landingPages);

export function getLandingPage(slug: string) {
  return landingPages[slug];
}
