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
  bookingCtaEyebrow: string;
  bookingCtaTitle: string;
  bookingCtaCopy: string;
  bookingButtonLabel: string;
  bookingButtonHref: string;
};

export const picnicLandingPageContent: BookingLandingPageContent = {
  heroTitle: "Picnic",
  heroSubtitle:
    "Plan vibrant day outings with lawns, family-friendly activities, buffet dining, and a booking flow that feels as relaxed as the day itself.",
  heroImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
  heroVideo: "https://bookonelocal.in/cdn/Picnic.mp4",
  path: "/picnic",

  metaTitle: "Picnic",
  metaDescription:
    "Book scenic picnic experiences at UK's Resort, Khopoli with open spaces, dining, and direct booking access.",
  metaImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",

  introEyebrow: "Day Outings",
  introTitle:
    "One-day picnic experiences built for energy, movement, and memorable daytime celebrations.",
  introCopy:
    "Enjoy a full one-day picnic at UK's Resort with water park fun, rain dance, indoor games, lawns, and activities for all age groups.",

  highlights: [
    {
      title: "Water park & splash fun",
      description:
        "Slide into excitement with water rides, cool pools, and relaxing deck areas for all age groups.",
    },
    {
      title: "Activities for everyone",
      description:
        "From kids park to indoor games and adventure activities, there's something engaging for every guest.",
    },
    {
      title: "Perfect for celebrations",
      description:
        "Celebrate birthdays, gatherings, and special occasions with music, food, and vibrant spaces.",
    },
  ],

  stats: [
    { value: "1 Day", label: "Complete experience" },
    { value: "10+ Activities", label: "Fun for all ages" },
    { value: "All Ages", label: "Family-friendly outing" },
  ],

  gallery: [
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
      title: "Water Park Fun",
      copy:
        "Splash into cool waters, enjoy slides, and relax by the poolside for a refreshing day.",
    },
    {
      image: "children7.avif",
      title: "Kids & Family Moments",
      copy:
        "Kids enjoy dedicated play areas while families relax and spend quality time together.",
    },
    {
      image: "https://bookonelocal.in/cdn/picnic1.jpg",
      title: "Games & Group Activities",
      copy:
        "Indoor and outdoor games bring energy and excitement to your picnic experience.",
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
        title: "Water park & activities",
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
        title: "Water Park",
        description:
          "Slide into pure merriment with exciting water rides, cool pools, and relaxing deck areas.",
        image: "children5.avif",
      },
      {
        title: "Rain Dance",
        description:
          "Enjoy nonstop sprinkling water, music, and high-energy rain dance fun.",
        image: "children3.avif",
      },
      {
        title: "Water Zorbing",
        description:
          "Experience the thrill of walking on water with exciting zorbing activities.",
        image: "children7.avif",
      },
      {
        title: "Indoor Games",
        description:
          "Play table tennis, badminton, chess, and carrom with friends and family.",
        image: "indoor.avif",
      },
      {
        title: "Kids Park",
        description:
          "A dedicated play zone for toddlers and children with swings and open space.",
        image: "kids.avif",
      },
      {
        title: "Rock Climbing",
        description:
          "Boost confidence and enjoy the thrill of climbing in a safe environment.",
        image: "rock.avif",
      },
      {
        title: "Outdoor Games",
        description:
          "Enjoy cricket, football, and volleyball in open evening spaces.",
        image: "outdoor.avif",
      },
      {
        title: "Paintball",
        description:
          "A fun and competitive activity suitable for both beginners and experienced players.",
        image: "paintball.avif",
      },
      {
        title: "Special Occasions",
        description:
          "Celebrate birthdays and gatherings with music, food, and lively ambiance.",
        image: "din2.avif",
      },
      {
        title: "Dance Floor",
        description:
          "Enjoy foot-tapping music and let loose on the dance floor.",
        image: "dance.avif",
      },
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
        alt: "Water park",
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
        "Relaxed outing with water park access, games, and dining.",
      includes: [
        "Water park",
        "Lunch buffet",
        "Indoor games",
        "Kids park",
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

  planningTitle: "Everything planned for a perfect day",
  planningCopy:
    "Enjoy a seamless experience with activities, meals, and relaxation built into one day.",
  planningPoints: [
    "Water park, rain dance, and adventure activities included",
    "Indoor and outdoor games for all age groups",
    "Perfect for families, schools, and celebrations",
  ],
  planningImage: "https://bookonelocal.in/cdn/picnic1.jpg",

  bookingCtaEyebrow: "Book Now",
  bookingCtaTitle: "Ready for your picnic?",
  bookingCtaCopy:
    "Check availability and book your one-day picnic experience instantly.",
  bookingButtonLabel: "Book Picnic",
  bookingButtonHref:
    "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true",
};

export const corporateLandingPageContent: BookingLandingPageContent = {
  heroTitle: "Corporate Booking",
  heroSubtitle:
    "Plan corporate stays, team offsites, conferences, and business gatherings at UK's Resort with comfort, space, and direct booking support.",
  heroImage: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
  heroVideo: "https://bookonelocal.in/cdn/Corporate-Page-VIdeo.mp4",
  path: "/corporate",

  metaTitle: "Corporate Booking",
  metaDescription:
    "Book corporate stays, offsites, retreats, and business gatherings at UK's Resort, Khopoli with clear package details and direct booking access.",
  metaImage: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",

  introEyebrow: "Business Stays",
  introTitle:
    "Corporate stays and team bookings designed for productivity and comfort.",
  introCopy:
    "UK's Resort is ideal for corporate stays, offsites, conferences, and team-building programs with a balance of workspaces, open areas, and relaxation zones.",

  highlights: [
    {
      title: "Business-ready environment",
      description:
        "Perfect for meetings, conferences, and corporate gatherings with a professional setting.",
    },
    {
      title: "Work + relaxation balance",
      description:
        "Combine productive sessions with leisure activities, open lawns, and comfortable stays.",
    },
    {
      title: "Easy group coordination",
      description:
        "Simplified planning for team sizes of all scales with clear packages and smooth flow.",
    },
  ],

  stats: [
    { value: "50+ Guests", label: "Group capacity" },
    { value: "Stay + Event", label: "Complete experience" },
    { value: "All-in-One", label: "Work & leisure" },
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
        image: "outdoor.avif",
      },
      {
        title: "Dining & Catering",
        description:
          "Buffet and customized meal options to suit corporate schedules.",
        image: "din2.avif",
      },
      {
        title: "Outdoor Lawns",
        description:
          "Open spaces for informal meetings, networking, and relaxation.",
        image: "lawn.avif",
      },
      {
        title: "Recreational Activities",
        description:
          "Indoor and outdoor games to balance work with relaxation.",
        image: "indoor.avif",
      },
      {
        title: "Evening Gatherings",
        description:
          "Perfect spaces for informal events, celebrations, or team dinners.",
        image: "dance.avif",
      },
    ],
  },

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

  planningTitle: "Simplified planning for corporate bookings",
  planningCopy:
    "Everything from stay to event coordination is structured for easy planning and execution.",
  planningPoints: [
    "Suitable for offsites, conferences, training programs, and retreats",
    "Includes stay, dining, and activity planning",
    "Designed for smooth coordination and booking flow",
  ],
  planningImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",

  bookingCtaEyebrow: "Book Direct",
  bookingCtaTitle: "Ready to plan your corporate event?",
  bookingCtaCopy:
    "Check availability and proceed with your corporate booking seamlessly.",
  bookingButtonLabel: "Book Corporate Stay",
  bookingButtonHref:
    "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true",
};
