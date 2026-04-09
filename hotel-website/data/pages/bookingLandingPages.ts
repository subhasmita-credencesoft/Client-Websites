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
  introTitle: "One-day picnic experiences built for energy, movement, and memorable daytime celebrations.",
  introCopy:
    "Enjoy a full one-day picnic at UK's Resort with spacious lawns, water fun, rain dance, buffet meals, and relaxed group time for families, schools, and celebrations.",
  highlights: [
    {
      title: "Full-day picnic fun",
      description: "Spend the day enjoying open lawns, poolside fun, group games, meal breaks, and photo moments in one lively resort setting.",
    },
    {
      title: "Activities for all ages",
      description: "Families, school groups, and friends can enjoy water attractions, play areas, wide open spaces, and easy social movement throughout the day.",
    },
    {
      title: "Easy group outing choice",
      description: "The picnic options are simple to understand, making it easier to choose the right day outing for your group and book quickly.",
    },
  ],
  stats: [
    { value: "1 Day", label: "Complete event rhythm" },
    { value: "6+ Acres", label: "Open activity space" },
    { value: "All Ages", label: "Play, food, and photo moments" },
  ],
  gallery: [
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
      title: "A day outing that starts with open lawns and easy energy",
      copy: "Start the day with fresh open space, greenery, and a relaxed picnic atmosphere that works well for families and larger groups.",
    },
    {
      image: "https://bookonelocal.in/cdn/picnic1.jpg",
      title: "Play zones, food breaks, and shared group moments",
      copy: "Enjoy a balanced day with games, water fun, meal breaks, and comfortable spaces where groups can gather and unwind together.",
    },
    {
      image: "children7.avif",
      title: "Photo-friendly memories through the day",
      copy: "From birthdays to school outings, every picnic day brings plenty of cheerful group moments and memorable photos.",
    },
  ],
  experienceFlow: {
    eyebrow: "One Day Flow",
    title: "Show guests how the day unfolds from arrival to sunset.",
    copy:
      "A one-day picnic feels better when guests know how the day moves from arrival and activities to lunch, snacks, and a relaxed departure.",
    steps: [
      {
        time: "09:30 AM",
        title: "Arrival and welcome start",
        description: "Guests check in, settle into the lawns, and ease into the resort atmosphere with the group together from the start.",
      },
      {
        time: "11:00 AM",
        title: "Activities and open play",
        description: "Water attractions, open spaces, and family-friendly movement zones build the energetic middle of the day.",
      },
      {
        time: "01:30 PM",
        title: "Lunch and social downtime",
        description: "A structured meal break gives school groups, families, and celebration guests time to reset comfortably.",
      },
      {
        time: "04:30 PM",
        title: "Photos, snacks, and final moments",
        description: "The day closes with memory-making, light refreshments, and a relaxed wrap-up before departure.",
      },
    ],
  },
  activityShowcase: {
    eyebrow: "Activity Highlights",
    title: "Built around one-day fun, group movement, and easy celebration energy.",
    copy:
      "The picnic experience includes the fun guests actually come for: water play, lawn time, shared meals, and group-friendly spaces.",
    features: [
      {
        title: "Water play and rain-dance excitement",
        description: "Perfect for groups who want a more active and playful daytime experience with high visual energy.",
        image: "children5.avif",
      },
      {
        title: "Lawns for games, mingling, and open-air comfort",
        description: "Wide green areas support family hangouts, school supervision, and event-style movement without feeling crowded.",
        image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
      },
      {
        title: "Dining breaks that make the day feel complete",
        description: "Meal moments help turn a simple visit into a full one-day outing with a better rhythm for all age groups.",
        image: "din2.avif",
      },
    ],
  },
  memoryWall: {
    eyebrow: "Event Gallery",
    title: "More images so the picnic page feels alive, social, and celebration-ready.",
    copy:
      "These picnic moments show the energy of group outings, family fun, and celebration-ready spaces before guests move to booking.",
    images: [
      { image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif", alt: "Picnic lawn at UK's Resort" },
      { image: "children7.avif", alt: "Picnic gathering and open activity area" },
      { image: "children3.avif", alt: "Group picnic photo at the resort" },
      { image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif", alt: "Open resort environment for daytime events" },
    ],
  },
  packagesTitle: "Picnic options presented with more energy and easier comparison.",
  packagesSubtitle:
    "Choose the picnic option that best fits your family outing, school trip, or daytime celebration.",
  packageOptions: [
    {
      name: "Family Day Picnic",
      audience: "Families and small social groups",
      description: "A relaxed format with shared dining, open play zones, and an easy flow for guests who want a low-friction resort day.",
      includes: ["Welcome refreshment", "Lunch buffet", "Lawn access", "Family-friendly zones"],
    },
    {
      name: "School or College Outing",
      audience: "Student groups and coordinators",
      description: "Structured for larger movement plans with clear meal flow, easy supervision, and enough room for group energy.",
      includes: ["Group entry support", "Meal planning", "Wide activity space", "Coordinator-friendly layout"],
    },
    {
      name: "Celebration Picnic",
      audience: "Birthdays and special gatherings",
      description: "Built for daytime celebrations that need atmosphere, scenic photo spots, and enough flexibility for custom moments.",
      includes: ["Reserved setup support", "Snack add-ons", "Photo-ready spaces", "Flexible celebration pacing"],
    },
  ],
  planningTitle: "Designed to feel fun before guests even arrive.",
  planningCopy:
    "From open lawns and water activities to buffet meals and group-friendly spaces, the picnic details make planning the day easier and more exciting.",
  planningPoints: [
    "Ideal for one-day family picnics, school outings, social gatherings, and birthday celebrations.",
    "Includes space for games, dining breaks, photos, and relaxed time together.",
    "Move directly to booking once you choose the picnic plan that fits your group.",
  ],
  planningImage: "https://bookonelocal.in/cdn/picnic1.jpg",
  bookingCtaEyebrow: "Book Direct",
  bookingCtaTitle: "Ready for a fun day out?",
  bookingCtaCopy:
    "Move directly into the booking engine to check availability and continue your one-day picnic reservation without an extra inquiry step.",
  bookingButtonLabel: "Book Picnic",
  bookingButtonHref: "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true",
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
  introTitle: "Corporate stays and team bookings presented with more clarity and confidence.",
  introCopy:
    "UK's Resort is well suited for corporate stays, team outings, conferences, training programs, and business events. Guests can review the stay options, event suitability, and booking details in one clear flow.",
  highlights: [
    {
      title: "Suitable for business groups",
      description: "The resort works well for company stays, meetings, conferences, launches, and team gatherings that need both comfort and open space.",
    },
    {
      title: "Easy package comparison",
      description: "Corporate stay and event options are easier to compare, helping coordinators choose the right format without confusion.",
    },
    {
      title: "Direct booking path",
      description: "Once the requirement is clear, guests can move directly from review to booking without extra back-and-forth.",
    },
  ],
  stats: [
    { value: "Corporate", label: "Business stay options" },
    { value: "Retreat + Stay", label: "Work and relaxation balance" },
    { value: "Direct", label: "Simple booking path" },
  ],
  gallery: [
    {
      image: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
      title: "A polished first impression for company bookings",
      copy: "The resort offers a professional first impression for company stays, leadership visits, conferences, and business gatherings.",
    },
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
      title: "A calm setting for focused work and stay comfort",
      copy: "Ideal for offsites, strategy meetings, and business stays that need a calm setting along with comfortable accommodation.",
    },
    {
      image: "https://bookonelocal.in/cdn/conference3-1.jpg",
      title: "Suitable for conferences and team gatherings",
      copy: "Conference spaces and event support make the resort suitable for meetings, launches, presentations, and team programs.",
    },
  ],
  packagesTitle: "Corporate formats that are easier to compare and plan.",
  packagesSubtitle:
    "Choose the corporate stay or event format that best matches your team size, business purpose, and schedule.",
  packageOptions: [
    {
      name: "Leadership Retreat",
      audience: "Senior teams and decision makers",
      description: "A focused format for strategy sessions, leadership alignment, and overnight stays that require comfort and privacy.",
      includes: ["Priority stay planning", "Meeting-room coordination", "Dining support", "Executive arrival flow"],
    },
    {
      name: "Team Offsite",
      audience: "Departments and mid-size groups",
      description: "Ideal for workshops, team bonding, and structured stays that mix productive work blocks with shared downtime.",
      includes: ["Group stay support", "Schedule-friendly meals", "Activity guidance", "Flexible pacing"],
    },
    {
      name: "Conference or Launch Event",
      audience: "Large business gatherings",
      description: "Built for presentations, training sessions, launches, and other large business formats that require smooth guest flow.",
      includes: ["Venue planning", "Guest coordination", "Hospitality support", "Custom event structure"],
    },
  ],
  planningTitle: "Made to simplify the planning journey for company bookings.",
  planningCopy:
    "Corporate guests usually need clear details before confirming a stay or event. This section helps teams review the essentials and move forward with confidence.",
  planningPoints: [
    "Use this page for corporate stays, retreats, conferences, launches, offsites, and room-block bookings.",
    "Review stay formats, event suitability, and included support in one place.",
    "Move to booking once your team selects the format that fits best.",
  ],
  planningImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
  bookingCtaEyebrow: "Book Direct",
  bookingCtaTitle: "Ready to plan your corporate stay?",
  bookingCtaCopy:
    "Proceed directly to the booking engine for live availability and continue with your corporate stay or event booking.",
  bookingButtonLabel: "Book Corporate Stay",
  bookingButtonHref: "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true",
};
