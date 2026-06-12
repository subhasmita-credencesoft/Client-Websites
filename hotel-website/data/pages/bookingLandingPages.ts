export type BookingLandingPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroVideo?: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  introEyebrow: string;
  introTitle: string;
  introCopy: string;
  highlights: Array<{
    title: string;
    description: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
  gallery: Array<{
    image: string;
    title: string;
    copy: string;
  }>;
  packagesTitle: string;
  packagesSubtitle: string;
  packageOptions: Array<{
    name: string;
    audience: string;
    description: string;
    includes: string[];
  }>;
  planningTitle: string;
  planningCopy: string;
  planningPoints: string[];
  planningImage: string;
  experienceFlow?: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: Array<{
      time: string;
      title: string;
      description: string;
    }>;
  };
  activityShowcase?: {
    eyebrow: string;
    title: string;
    copy: string;
    features: Array<{
      title: string;
      description: string;
      image: string;
    }>;
  };
  memoryWall?: {
    eyebrow: string;
    title: string;
    copy: string;
    images: Array<{
      image: string;
      alt: string;
    }>;
  };
  venueCapacities?: Array<{
    name: string;
    capacity: string;
    area: string;
    features?: string;
  }>;
  bookingCtaEyebrow: string;
  bookingCtaTitle: string;
  bookingCtaCopy: string;
  bookingButtonLabel: string;
  bookingButtonHref: string;
  secondaryBookingButtonLabel?: string;
  secondaryBookingButtonHref?: string;
  showIntroButton?: boolean;
  showAtmosphereSection?: boolean;
  showSummarySection?: boolean;
  showPlanningSection?: boolean;
  showMemoryWall?: boolean;
};

export const picnicLandingPageContent: BookingLandingPageContent = {
  heroTitle: "Picnic",
  heroSubtitle:
    "Plan vibrant day outings with lawns, family-friendly activities, and buffet dining.",
  heroImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
  heroVideo: "https://bookonelocal.in/cdn/Picnic.mp4",
  path: "/picnic",

  metaTitle: "Picnic & Day Outings at UK's Resort Khopoli",
  metaDescription:
    "Plan family picnics, school outings, and group day trips at UK's Resort Khopoli with water fun, buffet meals, and open lawns near Mumbai.",
  metaImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",

  introEyebrow: "Day Outings",
  introTitle:
    "A full day out, done right.",
  introCopy:
    "UK's Resort has been hosting day picnics for families, schools, birthday groups, and social clubs from Mumbai and Pune for years. Set across 85,000 sq ft of greenery in the Sahyadri foothills, a picnic day here has a natural rhythm to it - morning arrivals, water activities through the heat of the day, a proper sit-down buffet lunch, and a slow wind-down in the late afternoon before the drive home.",

  highlights: [
    {
      title: "What's included",
      description:
        "Your picnic day covers Water Fun & Play access, rain dance, open lawn games, a hearty buffet lunch, and all-day use of the resort's outdoor spaces. Just show up - we handle the rest.",
    },
    {
      title: "Activities & energy",
      description:
        "Spend the day at the pool, join the rain dance, challenge each other to lawn games, or simply find a shaded corner and unwind. There's always something happening - and always somewhere quiet if you need it.",
    },
    {
      title: "Groups of all kinds",
      description:
        "Whether you're a family of six or a school group of two hundred, we're set up for it. Organised seating, dedicated group spaces, and a team that's done this hundreds of times.",
    },
  ],

  stats: [
    { value: "1 Day", label: "Everything from 9am to 6pm" },
    { value: "6 lakhs sq. ft", label: "Lawns, pool, play zones" },
    { value: "All Ages", label: "Toddlers to grandparents" },
  ],

  gallery: [
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
      title: "Water Fun & Play Fun",
      copy:
        "Water slides, splash zones, and rain dance energy keep the middle of the day lively and memorable.",
    },
    {
      image: "children7.avif",
      title: "Family & Group Moments",
      copy:
        "Families, school groups, and social outings all find their own rhythm across the lawns and shaded spaces.",
    },
    {
      image: "https://bookonelocal.in/cdn/picnic1.jpg",
      title: "Buffet & Open Spaces",
      copy:
        "A proper buffet lunch, open grounds, and room to spread out make the day feel easy instead of rushed.",
    },
  ],

  experienceFlow: {
    eyebrow: "One Day Flow",
    title: "A complete day of fun and relaxation",
    copy:
      "From arrival to departure, the picnic experience is structured for maximum enjoyment.",
    steps: [
      {
        time: "09:30 AM",
        title: "Arrival & welcome",
        description:
          "Guests arrive, settle in, and begin exploring the resort and activity areas.",
      },
      {
        time: "11:00 AM",
        title: "Water Fun & Play & activities",
        description:
          "Enjoy water slides, rain dance, zorbing, and various fun activities.",
      },
      {
        time: "01:30 PM",
        title: "Lunch break",
        description:
          "Relax and recharge with a delicious buffet meal and social time.",
      },
      {
        time: "04:30 PM",
        title: "Games & wrap-up",
        description:
          "Enjoy indoor games, outdoor sports, and capture final memories.",
      },
    ],
  },

  activityShowcase: {
    eyebrow: "Activity Highlights",
    title: "Exciting activities for a complete picnic experience",
    copy:
      "Explore a wide range of activities designed for fun, relaxation, and group enjoyment.",
    features: [
      {
        title: "Water Fun & Play",
        description:
          "Slide into pure merriment with exciting water rides, cool pools, and relaxing deck areas.",
        image: "children5.avif",
      },
      {
        title: "Kids Play Area",
        description:
          "A fun-filled zone with exciting slides, swings, games, and safe play activities designed for children to enjoy and explore.",
        image: "children6.avif",
      },
      {
        title: "Water Zorbing",
        description:
          "Experience the thrill of walking on water with exciting zorbing activities.",
        image: "children7.avif",
      },
      // {
      //   title: "Indoor Games",
      //   description:
      //     "Play table tennis, badminton, chess, and carrom with friends and family.",
      //   image: "indoor.avif",
      // },
      // {
      //   title: "Kids Park",
      //   description:
      //     "A dedicated play zone for toddlers and children with swings and open space.",
      //   image: "kids.avif",
      // },
      // {
      //   title: "Rock Climbing",
      //   description:
      //     "Boost confidence and enjoy the thrill of climbing in a safe environment.",
      //   image: "rock.avif",
      // },
      {
        title: "Outdoor Games",
        description:
          "Enjoy cricket, football, and volleyball in open evening spaces.",
        image: "sports5.avif",
      },
      // {
      //   title: "Paintball",
      //   description:
      //     "A fun and competitive activity suitable for both beginners and experienced players.",
      //   image: "paintball.avif",
      // },
      {
        title: "Special Occasions",
        description:
          "Celebrate birthdays and gatherings with music, food, and lively ambiance.",
        image: "din2.avif",
      },
      // {
      //   title: "Dance Floor",
      //   description:
      //     "Enjoy foot-tapping music and let loose on the dance floor.",
      //   image: "dance.avif",
      // },
    ],
  },

  memoryWall: {
    eyebrow: "Event Gallery",
    title: "Captured picnic moments",
    copy:
      "Explore real moments from group outings, celebrations, and family fun.",
    images: [
      {
        image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
        alt: "Water Fun & Play",
      },
      { image: "children7.avif", alt: "Kids playing" },
      { image: "children3.avif", alt: "Group fun" },
      {
        image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
        alt: "Resort lawn",
      },
    ],
  },

  packagesTitle: "Choose your picnic plan",
  packagesSubtitle:
    "Flexible options for families, schools, and celebrations.",

  packageOptions: [
    {
      name: "Family Picnic",
      audience: "Families",
      description:
        "Relaxed outing with Water Fun & Play access, games, and dining.",
      includes: [
        "Water Fun & Play",
        "Lunch buffet",
        // "Indoor games",
        // "Kids park",
      ],
    },
    {
      name: "School Picnic",
      audience: "Students",
      description:
        "Structured and safe outing with group-friendly activities.",
      includes: [
        "Group activities",
        "Meals",
        "Large open space",
        "Coordinator support",
      ],
    },
    {
      name: "Celebration Picnic",
      audience: "Events",
      description:
        "Perfect for birthdays and gatherings with music and food.",
      includes: [
        "Decoration support",
        "Dance floor",
        "Food options",
        "Activity access",
      ],
    },
  ],

  planningTitle: "Plan your picnic day",
  planningCopy:
    "Picnic packages are available for groups of all sizes. WhatsApp us with your group size and preferred date. We'll send you a customised package with pricing within a few hours.",
  planningPoints: [],
  planningImage: "https://bookonelocal.in/cdn/picnic1.jpg",

  bookingCtaEyebrow: "Enquire Now",
  bookingCtaTitle: "Ready for a fun day out?",
  bookingCtaCopy:
    "Picnic packages are available for groups of all sizes. WhatsApp us your group size and preferred date, and we’ll send pricing and availability within a few hours.",
  bookingButtonLabel: "WhatsApp to Enquire",
  bookingButtonHref:
    "https://wa.me/919822012343?text=Hi%2C%20I%20want%20to%20plan%20a%20picnic%20day%20at%20UK%27s%20Resort.%20Please%20share%20package%20details.",
  secondaryBookingButtonLabel: "Book Online",
  secondaryBookingButtonHref:
    "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true",
  showIntroButton: false,
  showAtmosphereSection: false,
  showSummarySection: false,
  showPlanningSection: true,
  showMemoryWall: true,
};

export const corporateLandingPageContent: BookingLandingPageContent = {
  heroTitle: "Corporate Booking",
  heroSubtitle:
    "Plan corporate stays, team offsites, conferences, and business gatherings at UK's Resort with comfort, space, and direct enquiry support.",
  heroImage: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
  heroVideo: "https://bookonelocal.in/cdn/Corporate-Page-VIdeo.mp4",
  path: "/corporate",

  metaTitle: "Corporate Offsites & Conference Venue Near Mumbai — UK's Resort, Khopoli",
  metaDescription:
    "Plan conferences, offsites, team retreats, and training programs at UK's Resort Khopoli near Mumbai with rooms, dining, and event spaces in one venue.",
  metaImage: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",

  introEyebrow: "Business Stays",
  introTitle:
    "Corporate offsites and conferences without the logistics headache.",
  introCopy:
    "UK's Resort has hosted corporate groups from Mumbai, Pune, and across Maharashtra for over a decade - from leadership retreats to large team conferences. What makes it work for companies is the combination: comfortable accommodation, event-ready spaces, Delicious Food , and enough outdoor space for your team to actually decompress.",

  highlights: [
    {
      title: "Conference & meeting spaces",
      description:
        "Conference halls, banquet spaces, and lawns support presentations, training sessions, day conferences, launches, and business events in one property.",
    },
    {
      title: "Block accommodation for your team",
      description:
        "Book rooms for your entire group in one venue with meals, stay coordination, and less back-and-forth during planning.",
    },
    {
      title: "Team building & downtime",
      description:
        "Between sessions, teams can use the pool, lawns, Water Fun & Play, and activity zones for the kind of unstructured time that actually builds teams.",
    },
  ],

  stats: [
    { value: "Corporate", label: "Conferences, offsites & training programs" },
    { value: "Retreat + Stay", label: "Rooms, meals & activities in one venue" },
    { value: "Direct", label: "WhatsApp or call for a fast quote" },
  ],

  gallery: [
    {
      image: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
      title: "Professional corporate setting",
      copy:
        "A polished environment that creates a strong first impression for business events and stays.",
    },
    {
      image: "https://bookonelocal.in/cdn/conference3-1.jpg",
      title: "Conference and meeting spaces",
      copy:
        "Well-suited for presentations, training sessions, and large team discussions.",
    },
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
      title: "Relaxed outdoor spaces",
      copy:
        "Open lawns and calm surroundings for informal discussions and team bonding.",
    },
  ],

  experienceFlow: {
    eyebrow: "Corporate Flow",
    title: "A structured corporate stay experience",
    copy:
      "From arrival to wrap-up, every stage is designed for smooth coordination and productivity.",
    steps: [
      {
        time: "10:00 AM",
        title: "Arrival & check-in",
        description:
          "Teams arrive, settle into rooms, and prepare for scheduled sessions.",
      },
      {
        time: "11:30 AM",
        title: "Meetings & sessions",
        description:
          "Conference rooms and event spaces support presentations, workshops, and discussions.",
      },
      {
        time: "02:00 PM",
        title: "Lunch & networking",
        description:
          "Buffet meals offer a break for relaxation and informal team interaction.",
      },
      {
        time: "05:00 PM",
        title: "Team activities",
        description:
          "Outdoor games and bonding activities create engagement beyond work sessions.",
      },
    ],
  },

  activityShowcase: {
    eyebrow: "Corporate Features",
    title: "Everything needed for a successful corporate event",
    copy:
      "A mix of professional infrastructure and leisure options ensures a balanced corporate experience.",
    features: [
      {
        title: "Conference Facilities",
        description:
          "Spacious and well-equipped areas for meetings, presentations, and training sessions.",
        image: "conference.avif",
      },
      {
        title: "Team Building Activities",
        description:
          "Engaging activities designed to improve collaboration and team bonding.",
        image: "event--corp.avif",
      },
      {
        title: "Dining & Catering",
        description:
          "Buffet and customized meal options to suit corporate schedules.",
        image: "din3.avif",
      },
      {
        title: "Outdoor Lawns",
        description:
          "Open spaces for informal meetings, networking, and relaxation.",
        image: "sports3.avif",
      },
      {
        title: "Recreational Activities",
        description:
          "Indoor and outdoor games to balance work with relaxation.",
        image: "sports2.avif",
      },
      // {
      //   title: "Evening Gatherings",
      //   description:
      //     "Perfect spaces for informal events, celebrations, or team dinners.",
      //   image: "dance.avif",
      // },
    ],
  },

  venueCapacities: [
    { name: "Utsav Banquet", capacity: "250 Guests", area: "2500 sq ft", features: "AC" },
    { name: "Utsav Lawn", capacity: "400 Guests", area: "5000 sq ft" },
    { name: "Sanskriti Banquet", capacity: "40 Guests", area: "1200 sq ft", features: "AC" },
    { name: "Sanskriti Lawn", capacity: "200 Guests", area: "2500 sq ft" },
    { name: "Pool Side Lawns", capacity: "200 Guests", area: "1500 sq ft" },
    { name: "Lounge", capacity: "40 Guests", area: "600 sq ft" },
  ],

  packagesTitle: "Corporate formats designed for different business needs.",
  packagesSubtitle:
    "Choose the format that matches your team size, objective, and schedule.",

  packageOptions: [
    {
      name: "Leadership Retreat",
      audience: "Senior management",
      description:
        "Focused environment for strategy planning, decision-making, and executive stays.",
      includes: [
        "Premium rooms",
        "Meeting space",
        "Dining support",
        "Private coordination",
      ],
    },
    {
      name: "Team Offsite",
      audience: "Departments & teams",
      description:
        "Balanced mix of work sessions and team-building activities.",
      includes: [
        "Group stay",
        "Meals",
        "Activities",
        "Flexible schedule",
      ],
    },
    {
      name: "Conference / Event",
      audience: "Large corporate groups",
      description:
        "Ideal for seminars, launches, and large-scale business events.",
      includes: [
        "Event space",
        "Guest management",
        "Food service",
        "Custom setup",
      ],
    },
  ],

  planningTitle: "Tell us about your event",
  planningCopy:
    "Share your group size, preferred dates, and the type of event. We'll send you a tailored package with pricing within a few hours. No forms, no waiting. Just WhatsApp or call.",
  planningPoints: [],
  planningImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",

  bookingCtaEyebrow: "Enquire Now",
  bookingCtaTitle: "Tell us about your event",
  bookingCtaCopy:
    "Share your group size, preferred dates, and event type. We'll send a tailored package and pricing within a few hours.",
  bookingButtonLabel: "WhatsApp to Enquire",
  bookingButtonHref:
    "https://wa.me/919822012343?text=Hi%2C%20I%20want%20to%20plan%20a%20corporate%20event%20at%20UK%27s%20Resort.%20Please%20share%20package%20details.",
  secondaryBookingButtonLabel: "Email Us",
  secondaryBookingButtonHref: "mailto:info@uksresort.com",
  showIntroButton: false,
  showAtmosphereSection: false,
  showSummarySection: false,
  showPlanningSection: true,
  showMemoryWall: false,
};
