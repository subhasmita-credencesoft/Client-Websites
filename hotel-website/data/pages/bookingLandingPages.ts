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
  heroVideo: "https://bookonelocal.in/cdn/Create_a_cinematic_202603191807.mp4",
  path: "/picnic",
  metaTitle: "Picnic",
  metaDescription:
    "Book scenic picnic experiences at UK's Resort, Khopoli with open spaces, dining, and direct booking access.",
  metaImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
  introEyebrow: "Day Outings",
  introTitle: "One-day picnic experiences built for energy, movement, and memorable daytime celebrations.",
  introCopy:
    "The picnic page now leans fully into one-day outings, activity-led group moments, and quick visual planning. It gives families, schools, and celebration groups a clearer sense of the full day before sending them directly into booking.",
  highlights: [
    {
      title: "One-day event focus",
      description: "Every section now supports the rhythm of a full picnic day, from arrival energy and meal breaks to play zones and group memories.",
    },
    {
      title: "Activity-first storytelling",
      description: "Guests can now scan open lawns, water fun, play spaces, and celebration-friendly corners through more image-led sections.",
    },
    {
      title: "Cleaner decision flow",
      description: "The upgraded page keeps the direct booking action simple while making the day experience feel fuller and more exciting.",
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
      copy: "From the first look, the page now communicates space, movement, and a more festive day-out atmosphere for families and groups.",
    },
    {
      image: "https://bookonelocal.in/cdn/picnic1.jpg",
      title: "Play zones, food breaks, and shared group moments",
      copy: "The visual flow now balances activity and comfort so guests can picture a full picnic schedule instead of just a static package list.",
    },
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG",
      title: "Photo-friendly memories through the day",
      copy: "The page finishes the mood with celebration-ready imagery that feels ideal for birthdays, school outings, and social gatherings.",
    },
  ],
  experienceFlow: {
    eyebrow: "One Day Flow",
    title: "Show guests how the day unfolds from arrival to sunset.",
    copy:
      "This section makes the outing feel organized and exciting at the same time. It helps visitors imagine the full flow of a one-day event instead of guessing what happens after entry.",
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
      "The page now brings more attention to the kind of experiences guests actually come for during a picnic event, not just the booking step.",
    features: [
      {
        title: "Water play and rain-dance excitement",
        description: "Perfect for groups who want a more active and playful daytime experience with high visual energy.",
        image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG",
      },
      {
        title: "Lawns for games, mingling, and open-air comfort",
        description: "Wide green areas support family hangouts, school supervision, and event-style movement without feeling crowded.",
        image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
      },
      {
        title: "Dining breaks that make the day feel complete",
        description: "Meal moments help turn a simple visit into a full one-day outing with a better rhythm for all age groups.",
        image: "https://bookonelocal.in/cdn/picnic1.jpg",
      },
    ],
  },
  memoryWall: {
    eyebrow: "Event Gallery",
    title: "More images so the picnic page feels alive, social, and celebration-ready.",
    copy:
      "These extra frames help the page look more complete and give guests more confidence about the one-day outing experience before they book.",
    images: [
      { image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif", alt: "Picnic lawn at UK's Resort" },
      { image: "https://bookonelocal.in/cdn/picnic1.jpg", alt: "Picnic gathering and open activity area" },
      { image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG", alt: "Group picnic photo at the resort" },
      { image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif", alt: "Open resort environment for daytime events" },
    ],
  },
  packagesTitle: "Picnic options presented with more energy and easier comparison.",
  packagesSubtitle:
    "Each package keeps the same visual hierarchy while giving guests enough detail to choose confidently on mobile or desktop.",
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
    "The upgraded structure gives picnic bookings a stronger emotional pull while keeping planning practical. Guests can quickly understand the vibe, the activity mix, the package differences, and the next step without digging through form-heavy layouts.",
  planningPoints: [
    "Use this page for family picnics, school outings, social gatherings, and daytime celebrations.",
    "Keep the visual rhythm lively with layered cards, more photos, and motion that reveals rather than distracts.",
    "Send guests directly to booking when they are already ready to commit.",
  ],
  planningImage: "https://bookonelocal.in/cdn/picnic1.jpg",
  bookingCtaEyebrow: "Book Direct",
  bookingCtaTitle: "Ready for a fun day out?",
  bookingCtaCopy:
    "Move directly into the booking engine to check availability and continue your picnic reservation without an extra inquiry step.",
  bookingButtonLabel: "Book Picnic",
  bookingButtonHref: "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true",
};

export const corporateLandingPageContent: BookingLandingPageContent = {
  heroTitle: "Corporate Booking",
  heroSubtitle:
    "Plan corporate stays, team offsites, conferences, and business gatherings with a clearer view of the resort experience and booking path.",
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
    "UK's Resort offers a setting that works well for company stays, offsites, conferences, and team gatherings. This page helps planners understand the atmosphere, compare options, and move more easily toward the right booking choice.",
  highlights: [
    {
      title: "Clearer first impression",
      description: "The page now introduces the resort in a way that helps company planners quickly understand the style and suitability of the venue.",
    },
    {
      title: "Better package comparison",
      description: "Corporate formats are easier to compare, helping coordinators review the right stay or event option without extra guesswork.",
    },
    {
      title: "Simpler next step",
      description: "Guests who are ready can move from review to booking more directly instead of getting stuck in a slower planning loop.",
    },
  ],
  stats: [
    { value: "Corporate", label: "Business-ready stay formats" },
    { value: "Retreat + Stay", label: "Work and downtime balance" },
    { value: "Direct", label: "Clear booking path" },
  ],
  gallery: [
    {
      image: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
      title: "A polished first impression for company bookings",
      copy: "The opening presentation helps planners understand the tone of the resort before moving deeper into the booking flow.",
    },
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
      title: "A calm setting for focused work and stay comfort",
      copy: "Suitable for offsites, planning sessions, and business stays that need both comfort and a sense of structure.",
    },
    {
      image: "https://bookonelocal.in/cdn/conference3-1.jpg",
      title: "Suitable for conferences and team gatherings",
      copy: "The page supports planners looking for a venue that can handle meetings, launches, and company events with clarity.",
    },
  ],
  packagesTitle: "Corporate formats that are easier to compare and plan.",
  packagesSubtitle:
    "Each package helps planners quickly understand who it suits, what it includes, and how it may fit the event or stay requirement.",
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
    "Corporate guests usually need clarity, ease, and confidence before making a booking decision. This page is structured to help teams move through that process more comfortably.",
  planningPoints: [
    "Use this page for retreats, offsites, business meetings, launches, and room-block stays.",
    "Give coordinators enough detail to compare stay types, event fit, and included support.",
    "Keep the final booking action visible once the guest has seen enough to move ahead.",
  ],
  planningImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
  bookingCtaEyebrow: "Book Direct",
  bookingCtaTitle: "Ready to plan your corporate stay?",
  bookingCtaCopy:
    "Proceed directly to the booking engine for live availability and the next booking step without returning to a slower manual inquiry flow.",
  bookingButtonLabel: "Book Corporate Stay",
  bookingButtonHref: "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true",
};
