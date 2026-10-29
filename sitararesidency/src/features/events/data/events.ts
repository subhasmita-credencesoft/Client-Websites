import { business } from '@/core/config/business';

export interface EventSpace {
  id: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  detailedOverview: string[];
  image: string;
  gallery: string[];
  area: string;
  dimensions: string;
  ceilingHeight: string;
  naturalLight: boolean;
  capacities: {
    theatre: number;
    classroom: number;
    uShape: number;
    cluster: number;
    floating: number;
    boardroom?: number;
  };
  features: string[];
  techSpecs: { label: string; value: string }[];
  cateringOptions: { category: string; items: string[] }[];
  idealFor: string[];
}

export interface HostedFunction {
  id: string;
  title: string;
  eyebrow: string;
  category: 'social' | 'corporate' | 'ceremony';
  categoryLabel: string;
  badge: string;
  description: string;
  guestCapacity: string;
  recommendedVenues: { name: string; slug: string }[];
  image: string;
  highlights: string[];
  cateringNotes: string;
}

export interface EventPackage {
  title: string;
  eyebrow: string;
  priceNote: string;
  description: string;
  inclusions: string[];
  recommendedFor: string;
}

export const eventsCopy = {
  eyebrow: `Events & Banquets · ${business.name}`,
  heading: 'Host Distinctive Meetings & Celebrations in Kalamboli',
  intro:
    'Strategically situated near the Mumbai-Pune Expressway, Kalamboli Steel Market, and the Navi Mumbai International Airport corridor, Hotel Sitara Residency provides versatile conference halls, executive boardrooms, and customizable banquet spaces backed by seamless hospitality, advanced AV technology, and bespoke catering.',
  heroImage: '/Hotel Sitara Residency Kalamboli Reception (5).avif',
};

export const hostedFunctions: HostedFunction[] = [
  {
    id: 'ring-ceremony',
    title: 'Ring Ceremony & Engagements (Sagai / Roka)',
    eyebrow: 'Pre-Wedding Celebrations',
    category: 'ceremony',
    categoryLabel: 'Pre-Wedding & Rings',
    badge: 'Popular for Couples & Families',
    description:
      'Begin your marital journey with an intimate, beautifully curated ring exchange ceremony. Our pillarless halls provide unobstructed views for all guests, custom stage backdrops, ceremonial ring-exchange lighting, and an exquisite festive dining spread.',
    guestCapacity: '30 to 75 Guests',
    recommendedVenues: [
      { name: 'The Grand Conference & Banquet Hall', slug: 'grand-hall' },
      { name: 'The Celebrations & Social Lounge', slug: 'celebrations-lounge' },
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (1).avif',
    highlights: [
      'Elevated ring exchange stage setup with customizable floral backdrops',
      'Ceremonial entrance arch & ambient festive spotlighting for photography',
      'Sound system for celebratory shehnai, bollywood, and ambient music',
      'Dedicated changing/freshen-up room for bride and groom families',
      'Lavish multi-cuisine vegetarian and non-vegetarian banquet buffet',
    ],
    cateringNotes: 'Welcome drinks, live starter counters, royal main course & traditional hot Indian sweets (Gulab Jamun, Moong Dal Halwa).',
  },
  {
    id: 'birthdays',
    title: 'Birthday Celebrations (All Ages & Kids Themes)',
    eyebrow: 'Milestone Celebrations',
    category: 'social',
    categoryLabel: 'Birthdays & Anniversaries',
    badge: 'Customizable Themes',
    description:
      'From 1st birthday milestone celebrations with whimsical cartoon and balloon themes to memorable 25th, 40th, 50th, and 60th jubilee birthdays. We coordinate customized theme backdrops, cake-cutting tables, fun party music, and delicious party feasts.',
    guestCapacity: '20 to 70 Guests',
    recommendedVenues: [
      { name: 'The Celebrations & Social Lounge', slug: 'celebrations-lounge' },
      { name: 'The Grand Banquet Hall', slug: 'grand-hall' },
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (7).avif',
    highlights: [
      'Customized theme balloon arches, character cutouts & neon photo-booth setup',
      'Dedicated illuminated cake table with ceremonial knife and sparklers',
      'Integrated Bluetooth & AUX party sound system for high-energy music',
      'Kid-friendly snack menus (french fries, mini sliders, cheese bites, pasta)',
      'Dedicated banquet service staff and prompt housekeeping support',
    ],
    cateringNotes: 'Mocktails, crispy starters, live chaat counters, Chinese & Indian main courses, and ice-cream sundaes.',
  },
  {
    id: 'corporate-meetings',
    title: 'Corporate Meetings, Seminars & Conferences',
    eyebrow: 'Executive Business',
    category: 'corporate',
    categoryLabel: 'Corporate & Conferences',
    badge: 'Expressway & Airport Corridor',
    description:
      'Engineered for Kalamboli Steel Market corporations, JNPT Port logistics firms, and NMIA corridor business delegations. Host high-impact dealer conferences, regional sales meetings, shareholder AGMs, and team development workshops.',
    guestCapacity: '15 to 65 Delegates',
    recommendedVenues: [
      { name: 'The Grand Conference Hall', slug: 'grand-hall' },
      { name: 'The Executive Boardroom', slug: 'executive-boardroom' },
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (5).avif',
    highlights: [
      '1080p full HD overhead digital projector with 120-inch motorized drop screen',
      'High-fidelity sound system with 2 wireless hand-mics and 1 lapel collar-mic',
      'Executive lectern/podium with reading lamp and stage spotlight',
      'Ultra-fast enterprise 100+ Mbps Wi-Fi for live teleconferencing and screen sharing',
      'Continuous 100% generator power backup for uninterrupted presentations',
    ],
    cateringNotes: 'Executive Day Delegate package with arrival welcome drink, mid-session tea/coffee with artisan cookies, and wholesome 3-course buffet lunch.',
  },
  {
    id: 'family-gatherings',
    title: 'Family Gatherings, Reunions & Anniversaries',
    eyebrow: 'Family Traditions',
    category: 'social',
    categoryLabel: 'Family Gatherings',
    badge: 'Cozy & Welcoming',
    description:
      'Bring generations together under one comfortable, climate-controlled roof. Perfect for golden/silver wedding anniversary banquets, post-retirement felicitations, holiday family reunions, and intimate religious get-togethers.',
    guestCapacity: '25 to 75 Guests',
    recommendedVenues: [
      { name: 'The Grand Banquet Hall', slug: 'grand-hall' },
      { name: 'The Celebrations Lounge', slug: 'celebrations-lounge' },
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (6).avif',
    highlights: [
      'Flexible dining layouts with comfortable banquet seating for seniors & children',
      'Projector setup available for nostalgic family photo slideshows & videos',
      'Private acoustic environment away from hotel lobby traffic',
      'Option to reserve adjoining hotel rooms for outstation family members',
      'Hassle-free parking right on property with elevator access',
    ],
    cateringNotes: 'Homestyle North Indian, Maharashtrian, and regional festive culinary spreads prepared to your exact family taste preferences.',
  },
  {
    id: 'baby-shower-namkaran',
    title: 'Baby Showers (Godh Bharai / Dohale Jevan) & Naming Ceremonies',
    eyebrow: 'Auspicious New Beginnings',
    category: 'ceremony',
    categoryLabel: 'Ceremonies & Rituals',
    badge: 'Traditional & Auspicious',
    description:
      'Honor new arrivals and expectant mothers with sacred, joyful ceremonies. From traditional Maharashtrian Dohale Jevan (with decorated wooden swing/jhula) and North Indian Godh Bharai to sacred Namkaran (naming ceremony) rituals.',
    guestCapacity: '25 to 60 Guests',
    recommendedVenues: [
      { name: 'The Celebrations & Social Lounge', slug: 'celebrations-lounge' },
      { name: 'The Grand Banquet Hall', slug: 'grand-hall' },
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (2).avif',
    highlights: [
      'Space for traditional decorated Jhula (swing) or cradle installation',
      'Traditional floral rangoli at venue entryway with diya accents',
      'Separate private seating arrangements for rituals and auspicious pooja',
      'Pure vegetarian satvik catering options prepared with festive hygiene',
      'Climate-controlled comfortable seating for mothers, elders, and infants',
    ],
    cateringNotes: 'Traditional auspicious festive menus, sweets (Peda, Kheer, Shrikhand), and soothing herbal refreshments.',
  },
  {
    id: 'pre-wedding-haldi-mehendi',
    title: 'Haldi, Mehendi & Sangeet Evenings',
    eyebrow: 'Festive Traditions',
    category: 'ceremony',
    categoryLabel: 'Pre-Wedding & Rings',
    badge: 'Festive Colors & Music',
    description:
      'Vibrant pre-wedding festivities filled with marigolds, music, and laughter. Host colorful daytime Haldi ceremonies, leisurely afternoon Mehendi sessions, or joyous family Sangeet nights in air-conditioned comfort.',
    guestCapacity: '30 to 70 Guests',
    recommendedVenues: [
      { name: 'The Grand Banquet Hall', slug: 'grand-hall' },
      { name: 'The Celebrations Lounge', slug: 'celebrations-lounge' },
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (1).avif',
    highlights: [
      'Yellow marigold and festive draping backdrop arrangements',
      'Low diwan seating & cushion corners for mehendi application artists',
      'Lively sound system ready for dhol beats and bollywood choreography',
      'Live chaat and savory finger-food stations kept active during henna sessions',
      'Dedicated changing suites available on the same floor',
    ],
    cateringNotes: 'Finger foods, street chaat (Pani Puri, Sev Puri, Dahi Vada), assorted kebabs, and refreshing mocktail coolers.',
  },
  {
    id: 'board-meetings',
    title: 'Executive Board Meetings & Leadership Offsites',
    eyebrow: 'Senior Leadership',
    category: 'corporate',
    categoryLabel: 'Corporate & Conferences',
    badge: 'Confidential & Ergonomic',
    description:
      'Confidential boardroom assemblies for corporate boards of directors, investor briefings, high-stakes vendor negotiations, and executive panel interviews. Designed for focused, distraction-free deliberations.',
    guestCapacity: '8 to 16 Delegates',
    recommendedVenues: [
      { name: 'The Executive Boardroom & Meeting Suite', slug: 'executive-boardroom' },
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (3).avif',
    highlights: [
      'Central mahogany conference table with high-back leather executive swivel chairs',
      '65" 4K UHD Smart presentation display with wireless casting and HDMI connectivity',
      'Polycom-style omnidirectional conference speakerphone for hybrid calls',
      'In-table universal power hubs and high-speed low-latency Wi-Fi',
      'Discreet, continuous hot tea, artisan coffee, and bottled mineral water service',
    ],
    cateringNotes: 'Gourmet executive snacks, dry-fruit cookies, and plated executive lunch platters served inside the suite.',
  },
  {
    id: 'residential-conferences',
    title: 'Residential Conferences & Outstation Delegations',
    eyebrow: 'Stay & Meet Packages',
    category: 'corporate',
    categoryLabel: 'Corporate & Conferences',
    badge: 'All-Inclusive Stay + Hall',
    description:
      'Multi-day corporate offsites, regional sales camps, and outstation family wedding guests combining meeting venue access with comfortable accommodation in our Executive and Triple Rooms.',
    guestCapacity: '15 to 40 Rooms / Up to 75 Guests',
    recommendedVenues: [
      { name: 'The Grand Conference Hall', slug: 'grand-hall' },
      { name: 'Executive Hotel Rooms & Suites', slug: 'grand-hall' },
    ],
    image: '/room.avif',
    highlights: [
      'Bundled hall reservation + discounted group hotel room tariffs',
      'Complimentary buffet breakfast, working lunches, and grand dinner spreads',
      'Express group check-in and prioritized room allocation for delegates',
      'Dedicated event relationship coordinator assigned to your group 24/7',
      'Complimentary on-site reserved parking for attendee vehicles and buses',
    ],
    cateringNotes: 'Full-board dining package: Morning breakfast buffet, mid-morning high tea, 3-course conference lunch, evening high tea, and dinner buffet.',
  },
];

export const eventSpaces: EventSpace[] = [
  {
    id: 'grand-hall',
    name: 'The Grand Conference & Banquet Hall',
    eyebrow: 'Multi-Functional Venue · Up to 75 Guests',
    tagline: 'A pillarless, climate-controlled venue engineered for impactful corporate conferences and milestone celebrations.',
    description:
      'A pillarless, fully climate-controlled hall customizable for corporate conferences, dealer meets, training workshops, and intimate family milestone functions. Equipped with stage-level audio-visual projection, flexible lighting, and direct banquet dining access.',
    detailedOverview: [
      'The Grand Conference & Banquet Hall at Hotel Sitara Residency is our flagship event destination in Kalamboli, Navi Mumbai. Designed with zero structural pillars to ensure completely unobstructed sightlines for all delegates, this space adapts effortlessly from a high-energy corporate seminar to an elegant evening celebration.',
      'Our dedicated banqueting team coordinates stage setups, podium placement, motorized drop-down projection, and cordless microphone acoustics. Flanked by an adjoining pre-function foyer and buffet dining area, attendees can move fluidly between working sessions and leisurely catered lunches.',
      'With full dual-unit air conditioning and automatic generator backup, your proceedings run without interruption from morning registration through evening wrap-up.',
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (1).avif',
    gallery: [
      '/Hotel Sitara Residency Kalamboli Reception (1).avif',
      '/Hotel Sitara Residency Kalamboli Reception (5).avif',
      '/Hotel Sitara Residency Kalamboli Reception (3).avif',
      '/Hotel Sitara Residency Kalamboli Reception (2).avif',
      '/Hotel Sitara Residency Kalamboli Reception (7).avif',
    ],
    area: '1,200 sq. ft.',
    dimensions: '40 ft x 30 ft',
    ceilingHeight: '10.5 ft',
    naturalLight: false,
    capacities: {
      theatre: 65,
      classroom: 40,
      uShape: 30,
      cluster: 36,
      floating: 75,
      boardroom: 28,
    },
    features: [
      'High-definition overhead digital projector & motorized screen',
      'Wireless handheld and lapel (collar) microphones with acoustic sound',
      'High-speed dedicated Wi-Fi network for seamless video calls & streaming',
      'Dual commercial climate control units for guest comfort',
      'Uninterrupted 100% generator power backup',
      'Stage podium with executive lectern and reading light',
      'Adjoining dedicated buffet dining area & refreshment counter',
    ],
    techSpecs: [
      { label: 'Display & Projection', value: '1080p Full HD Digital Projector with 120-inch Motorized Screen' },
      { label: 'Audio System', value: '4-Channel PA Sound System with 2 Cordless Mics & 1 Lapel Mic' },
      { label: 'Internet', value: 'High-Speed Dedicated 100+ Mbps Fiber Wi-Fi' },
      { label: 'Power Infrastructure', value: 'Dual 3-Phase Phase Backup with Auto-Switch Diesel Generators' },
      { label: 'Climate Control', value: 'Independent High-Capacity Multi-Split Air Conditioning' },
      { label: 'Lighting', value: 'Dimmable Warm/Cool LED Architectural Downlighting' },
    ],
    cateringOptions: [
      {
        category: 'Welcome & High-Tea Refreshments',
        items: [
          'Assorted Artisan Cookies, Veg Puff, Paneer Tikka Bites',
          'Freshly Brewed Masala Chai & South Indian Filter Coffee',
          'Seasonal Fresh Fruit Juices & Infused Mint Lemonade',
        ],
      },
      {
        category: 'Corporate Executive Lunch Buffet',
        items: [
          'Cream of Tomato / Sweet Corn Soup with Dinner Rolls',
          'Crispy Spring Rolls, Paneer Malai Tikka / Chicken Tikka Starters',
          'Dal Makhani / Dal Tadka, Paneer Butter Masala, Mixed Veg Curry',
          'Jeera Rice, Assorted Tandoori Rotis, Naans & Parathas',
          'Fresh Green Salad, Boondi Raita, Gulab Jamun with Ice Cream',
        ],
      },
    ],
    idealFor: [
      'Ring Ceremonies & Engagement Celebrations (Sagai / Roka)',
      'Birthday Celebrations (1st Birthday, 50th/60th Jubilee Parties)',
      'Annual Corporate Seminars & AGM Meetings',
      'Vendor & Dealer Conferences (Steel Market & JNPT Port logistics)',
      'Family Reunions, Baby Showers & Naming Ceremonies',
      'Haldi, Mehendi & Sangeet Celebrations',
    ],
  },
  {
    id: 'executive-boardroom',
    name: 'The Executive Boardroom & Meeting Suite',
    eyebrow: 'Executive Business · Up to 16 Delegates',
    tagline: 'Refined boardroom environment designed for decisive executive meetings and closed-door conferences.',
    description:
      'Tailored specifically for corporate delegations, senior leadership assemblies, vendor negotiations, and interviews. Furnished with ergonomic executive seating, central conferencing hub, writing stationery, and discreet beverage service.',
    detailedOverview: [
      'The Executive Boardroom at Hotel Sitara Residency provides a distraction-free, professional environment created for corporate decision-makers, senior management meetings, client presentations, and hybrid teleconferences.',
      'At its core is a polished executive mahogany conference table encircled by high-back ergonomic leather swivel chairs. A 65-inch 4K UHD smart presentation screen with both HDMI cable and wireless screen-casting connects seamlessly with laptops and mobile devices.',
      'Our staff provides non-intrusive, continuous hospitality including hot tea, artisanal coffee, and mineral water, ensuring meetings proceed with executive elegance.',
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (3).avif',
    gallery: [
      '/Hotel Sitara Residency Kalamboli Reception (3).avif',
      '/Hotel Sitara Residency Kalamboli Reception (5).avif',
      '/Hotel Sitara Residency Kalamboli Reception (1).avif',
      '/Hotel Sitara Residency Kalamboli Reception (6).avif',
    ],
    area: '450 sq. ft.',
    dimensions: '22 ft x 20 ft',
    ceilingHeight: '10 ft',
    naturalLight: true,
    capacities: {
      theatre: 20,
      classroom: 16,
      uShape: 14,
      cluster: 12,
      floating: 20,
      boardroom: 16,
    },
    features: [
      'Large 65-inch 4K UHD smart presentation display with HDMI / wireless cast',
      'High-clarity conference speakerphone for hybrid meetings',
      'Ergonomic high-back leather executive chairs with power hubs at each seat',
      'Whiteboard, flipchart, notepads, and executive stationery kits',
      'Continuous hot beverage (tea/coffee) and bottled mineral water service',
      'Acoustic sound-dampened walls for total meeting confidentiality',
    ],
    techSpecs: [
      { label: 'Display Screen', value: '65" 4K UHD Smart Display with Wireless Casting & HDMI' },
      { label: 'Conferencing', value: 'Polycom Style High-Clarity Omnidirectional Speakerphone' },
      { label: 'Internet', value: 'Dedicated High-Speed Dual-Band Wi-Fi (Low Latency)' },
      { label: 'Power & Charging', value: 'In-Table AC Universal Power Sockets & USB Ports' },
      { label: 'Presentation Tools', value: 'Magnetic Glass Whiteboard with Colored Dry-Erase Markers' },
    ],
    cateringOptions: [
      {
        category: 'Boardroom Beverage & Cookie Service',
        items: [
          'Fine Espresso, Cappuccino, Green Tea & Darjeeling Tea',
          'Gourmet Danish Pastries, Dry-Fruit Cookies & Energy Bars',
          'Chilled Premium Bottled Mineral Water on table',
        ],
      },
      {
        category: 'Plated Executive Working Lunch',
        items: [
          'Choice of Indian Thali (Paneer / Chicken / Mutton)',
          'Continental Platter with Pasta, Garlic Bread & Crisp Tossed Salad',
          'Choice of Fresh Cut Fruits or Warm Walnut Brownie',
        ],
      },
    ],
    idealFor: [
      'Board of Directors Meetings & Executive Deliberations',
      'High-Stakes Vendor Contract Negotiations',
      'Recruitment Interviews & Assessment Panels',
      'Confidential Legal & Financial Briefings',
      'Client Pitch Sessions & Strategy Workshops',
    ],
  },
  {
    id: 'celebrations-lounge',
    name: 'The Celebrations & Social Lounge',
    eyebrow: 'Social Gatherings · Up to 50 Guests',
    tagline: 'A warm, welcoming ambiance for birthday parties, anniversaries, and intimate family get-togethers.',
    description:
      'An inviting private setting suited for anniversary dinners, birthday celebrations, baby showers, engagement functions, and post-wedding gatherings. Customized decor themes, buffet dining setup, and ambient lighting create unforgettable moments.',
    detailedOverview: [
      'The Celebrations & Social Lounge at Hotel Sitara Residency is crafted for unforgettable personal milestones. Whether you are hosting an intimate birthday party, silver jubilee anniversary dinner, or private family get-together, this venue combines modern hospitality with cozy warmth.',
      'Our event decorators can customize themed balloon arches, floral backdrops, and photo booths. The flexible layout allows for a lively central celebration floor, comfortable lounge seating, and an expansive live buffet counter.',
      'Our culinary team works with organizers to curate personalized festive menus spanning authentic North Indian, regional Maharashtrian specialties, Chinese delights, and indulgent desserts.',
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (7).avif',
    gallery: [
      '/Hotel Sitara Residency Kalamboli Reception (7).avif',
      '/Hotel Sitara Residency Kalamboli Reception (6).avif',
      '/Hotel Sitara Residency Kalamboli Reception (2).avif',
      '/Hotel Sitara Residency Kalamboli Reception (1).avif',
    ],
    area: '900 sq. ft.',
    dimensions: '30 ft x 30 ft',
    ceilingHeight: '10 ft',
    naturalLight: true,
    capacities: {
      theatre: 45,
      classroom: 30,
      uShape: 24,
      cluster: 32,
      floating: 55,
      boardroom: 20,
    },
    features: [
      'Flexible party layout with dining tables and casual reception area',
      'Dedicated buffet counters for multi-cuisine lunch or dinner',
      'Ambient lighting and music sound system for celebrations',
      'Dedicated banquet service staff and coordinator on hand',
      'Custom cake-cutting table and celebration decoration assistance',
      'Spacious ground-floor access and elevator connectivity',
    ],
    techSpecs: [
      { label: 'Audio & Music', value: 'Bluetooth & AUX Integrated Party Sound System' },
      { label: 'Projection', value: 'Portable Projector & Screen for Family Photo Slideshows' },
      { label: 'Lighting', value: 'Customizable Warm Ambient Dimmable Lighting' },
      { label: 'Air Conditioning', value: 'High-Cooling Twin Split Climate Systems' },
      { label: 'Power Backup', value: '100% Automatic Generator Coverage' },
    ],
    cateringOptions: [
      {
        category: 'Party Starters & Mocktails',
        items: [
          'Virgin Mojito, Blue Lagoon, Mango Blast Mocktails',
          'Veg Manchurian, Hara Bhara Kebab, Chicken Tikka & Fish Finger bites',
        ],
      },
      {
        category: 'Celebration Grand Buffet',
        items: [
          'Shahi Paneer / Butter Chicken / Mutton Rogan Josh',
          'Veg Dum Biryani with Burani Raita & Salan',
          'Assorted Tandoori Breads (Butter Naan, Garlic Kulcha)',
          'Live Chaat Counter / Dosa Counter (available upon request)',
          'Hot Gulab Jamun with Rabdi, Vanilla Ice Cream with Chocolate Drizzle',
        ],
      },
    ],
    idealFor: [
      'Ring Ceremonies, Sagai & Roka Gatherings',
      'Milestone Birthday Celebrations & Kids Theme Parties',
      'Baby Showers (Godh Bharai / Dohale Jevan) & Namkaran',
      'Wedding Anniversaries & Family Get-Togethers',
      'Haldi & Mehendi Intimate Functions',
      'Private Festive Dinners & Cocktail Evenings',
    ],
  },
];

export function getEventSpace(slug: string): EventSpace | undefined {
  return eventSpaces.find((space) => space.id === slug);
}

export const eventPackages: EventPackage[] = [
  {
    title: 'Ring Ceremony & Pre-Wedding Gala',
    eyebrow: 'Engagements & Ceremonies',
    priceNote: 'Tailored celebratory packages',
    description:
      'Curated especially for ring exchange ceremonies, roka, and pre-wedding celebrations. Complete with stage setup, ambient spotlighting, sound, and a royal banquet spread.',
    inclusions: [
      'Private hall reservation with individual air conditioning and full generator backup',
      'Decorated ring exchange stage backdrop with warm spotlighting',
      'Welcome mocktails upon guest arrival with savory starter pass-arounds',
      'Lavish multi-course buffet lunch or dinner (Vegetarian & Non-Vegetarian options)',
      'Dedicated banquet service team and complimentary changing room for families',
    ],
    recommendedFor: 'Ring ceremonies, Sagai, Roka, Mehendi, Haldi functions',
  },
  {
    title: 'Birthday & Milestone Party Package',
    eyebrow: 'Birthdays & Social Celebrations',
    priceNote: 'Flexible per-guest pricing',
    description:
      'Everything you need for an unforgettable birthday bash — from 1st birthday kids themes to grand 50th/60th milestones. Stress-free fun for hosts and guests.',
    inclusions: [
      '4 to 5 hours exclusive venue access with party mood lighting',
      'Themed balloon decoration, backdrop and dedicated cake-cutting table',
      'Party music sound system with Bluetooth and AUX connectivity',
      'Starter appetizers, live counters, main course buffet, and dessert course',
      'Attentive staff to serve food, assist with cake cutting, and handle setup/cleanup',
    ],
    recommendedFor: 'Kids birthday parties, 18th/21st milestones, 50th/60th jubilees',
  },
  {
    title: 'Family Reunion & Anniversary Package',
    eyebrow: 'Family Traditions & Gatherings',
    priceNote: 'All-inclusive family packages',
    description:
      'A warm, dignified setting designed to celebrate milestone anniversaries, retirement functions, and joyous extended family reunions.',
    inclusions: [
      'Comfortable seating arrangements suited for all age groups (elders & kids)',
      'Projector and screen for family memories and nostalgia video slideshows',
      'Authentic regional and multi-cuisine buffet prepared to your family recipe preferences',
      'Dedicated banquet coordinator and priority parking for all attendee vehicles',
      'Option to reserve discounted guest rooms for outstation family members',
    ],
    recommendedFor: 'Silver/Golden anniversaries, family reunions, baby showers, Namkaran',
  },
  {
    title: 'Corporate Day Delegate (DDR)',
    eyebrow: 'Business & Conferences',
    priceNote: 'Customizable corporate packages',
    description:
      'A comprehensive single-day package designed to keep corporate sessions productive and frictionless from morning kickoff to evening wrap-up.',
    inclusions: [
      'Full-day or half-day hall reservation with AC and full AV setup',
      'Welcome drink upon arrival + mid-morning tea/coffee with artisan cookies',
      'Wholesome 3-course executive lunch buffet (Veg / Non-Veg options)',
      'Evening high tea with hot savory refreshments',
      'Conference pads, pens, presentation screen, and Wi-Fi for all attendees',
    ],
    recommendedFor: 'Board meetings, corporate training, dealer conferences, supplier meets',
  },
  {
    title: 'Residential Conference Package',
    eyebrow: 'Conferences with Overnight Stay',
    priceNote: 'Group room block discounts',
    description:
      'Seamless multi-day events pairing conference facilities with comfortable accommodation in our Executive and Triple Rooms.',
    inclusions: [
      'Exclusive hall access with standard audiovisual projection and sound',
      'Overnight stay in Executive Rooms / Suites with complimentary Wi-Fi',
      'Buffet breakfast, lunch, high tea, and lavish dinner spread included',
      '24/7 dedicated event manager and concierge support',
      'Complimentary on-site reserved parking for event vehicles',
    ],
    recommendedFor: 'Outstation delegations, multi-day seminars, executive retreats',
  },
];

export const eventFaqs = [
  {
    question: 'Can Hotel Sitara Residency host ring ceremonies, engagements, and pre-wedding functions?',
    answer:
      'Yes, absolutely! We regularly host ring ceremonies (Sagai / Roka), Haldi, Mehendi, and pre-wedding gatherings. Our team assists with stage backdrops, ceremonial spotlighting, sound setup for celebrations, bridal changing suites, and curated festive catering spreads for up to 75 guests.',
  },
  {
    question: 'Do you provide theme decorations and party setups for birthdays and anniversaries?',
    answer:
      'Yes! Whether you are planning a kids 1st birthday with theme balloons and characters or a sophisticated 50th/60th milestone birthday or silver anniversary, our banqueting team provides dedicated cake-cutting tables, balloon decor, photo-booth areas, and ambient party sound systems.',
  },
  {
    question: 'Can we host traditional family ceremonies like Baby Showers (Dohale Jevan / Godh Bharai) and Naming Ceremonies (Namkaran)?',
    answer:
      'Yes! We accommodate traditional ceremonies with space for a decorated floral Jhula (swing), pooja arrangements, traditional rangoli, and auspicious pure-vegetarian satvik or festive catering menus tailored to your family traditions.',
  },
  {
    question: 'What types of corporate business meetings and conferences can you accommodate?',
    answer:
      'We host executive board meetings, corporate seminars, dealer meets, employee training programs, vendor conferences, and recruitment drives. We provide high-definition projection, wireless microphones, enterprise high-speed Wi-Fi, conference stationery, and corporate day-delegate catering.',
  },
  {
    question: 'Where is Hotel Sitara Residency located for attendees travelling from Mumbai, Panvel, or Pune?',
    answer:
      'Hotel Sitara Residency is conveniently situated at Riddhi Arcade, Sector KWC, Kalamboli, Navi Mumbai. We are right off the Mumbai-Pune Expressway and Sion-Panvel Highway, approximately 10 minutes from Panvel Railway Station and close to the upcoming Navi Mumbai International Airport (NMIA), making travel easy for both local and outstation guests.',
  },
  {
    question: 'What is the maximum capacity for meetings and banquets at the hotel?',
    answer:
      'Our versatile hall spaces comfortably accommodate up to 70–75 guests in a floating or theatre layout, 40 guests in classroom style, and 30–36 guests in roundtable cluster seating. We also host intimate boardroom meetings for 8 to 16 delegates.',
  },
  {
    question: 'Do you provide in-house catering and audio-visual equipment?',
    answer:
      'Yes, we provide high-definition digital projection screens, wireless microphones, high-speed Wi-Fi, and complete sound support. Our in-house culinary team offers tailored breakfast, lunch, high-tea, and dinner menus with both vegetarian and non-vegetarian selections.',
  },
  {
    question: 'Can we book guest rooms together with the event hall for outstation attendees?',
    answer:
      'Yes! We offer bundled Residential Conference packages with special group room rates across our Executive Rooms, Executive Triple Rooms, and Executive Family Suites.',
  },
  {
    question: 'How do I check date availability and receive a customized quote for our function?',
    answer:
      'You can submit the event inquiry form on this page, call our reservations desk directly at +91 74004 32396 / +91 74004 32397, or reach our landlines at 022-4715 2396. Our banquet manager will respond promptly with date confirmation and a customized proposal.',
  },
];
