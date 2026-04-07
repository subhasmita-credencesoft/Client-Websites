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
  introTitle: "A more lively picnic page with the same polished rhythm as the rest of the site.",
  introCopy:
    "This page is designed for families, school groups, and social circles who want clarity before arrival and an exciting sense of place while browsing. The content leads quickly from inspiration to package comparison and then straight into booking.",
  highlights: [
    {
      title: "Open-air freedom",
      description: "Large green grounds, leisure corners, and easy movement across the resort make the outing feel expansive from the first glance.",
    },
    {
      title: "Group-friendly planning",
      description: "The layout helps guests compare formats quickly, whether they are planning a small family day or a larger celebration group.",
    },
    {
      title: "Faster conversion",
      description: "Instead of a slow inquiry path, the page closes with a direct booking action so guests can move immediately into the booking engine.",
    },
  ],
  stats: [
    { value: "6+ Acres", label: "Open picnic-ready space" },
    { value: "All-Day", label: "Flexible outing rhythm" },
    { value: "Family First", label: "Dining and leisure mix" },
  ],
  gallery: [
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
      title: "Wide lawns and open energy",
      copy: "The first impression is spacious, social, and easy for mixed-age groups to enjoy together.",
    },
    {
      image: "https://bookonelocal.in/cdn/picnic1.jpg",
      title: "Food, play, and celebration",
      copy: "Packages can flex between casual family time, organized outings, and more festive daytime gatherings.",
    },
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG",
      title: "Photo-friendly resort moments",
      copy: "The atmosphere supports everything from simple getaways to memory-making group celebrations.",
    },
  ],
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
    "The upgraded structure gives picnic bookings a stronger emotional pull while keeping planning practical. Guests can quickly understand the vibe, the package differences, and the next step without digging through form-heavy layouts.",
  planningPoints: [
    "Use this page for family picnics, school outings, social gatherings, and daytime celebrations.",
    "Keep the visual rhythm lively with layered cards, stronger spacing, and motion that reveals rather than distracts.",
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
    "Present offsites, leadership retreats, and team stays with a sharper premium feel, clearer package structure, and a direct booking path.",
  heroImage: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
  heroVideo: "https://bookonelocal.in/cdn/Curtains_opening_revealing_202603191629.mp4",
  path: "/corporate",
  metaTitle: "Corporate Booking",
  metaDescription:
    "Book corporate stays, offsites, and business retreats at UK's Resort, Khopoli with a stronger premium presentation and direct booking access.",
  metaImage: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
  introEyebrow: "Business Stays",
  introTitle: "A more elevated corporate page built for confidence, speed, and stronger first impressions.",
  introCopy:
    "The page positions UK&apos;s Resort as a destination for focused planning, premium team experiences, and business hospitality. It keeps the shared brand language intact while giving corporate guests a more refined and decision-oriented journey.",
  highlights: [
    {
      title: "Executive presentation",
      description: "The structure feels more premium and composed, helping leadership teams trust the venue before they even begin the booking flow.",
    },
    {
      title: "Clear package comparison",
      description: "Organized cards make it easier for coordinators to compare retreat, offsite, and event formats without visual clutter.",
    },
    {
      title: "Direct action path",
      description: "Guests who are ready to proceed can move from review to booking in one clean step instead of waiting on a separate inquiry loop.",
    },
  ],
  stats: [
    { value: "Premium", label: "Business-led presentation" },
    { value: "Retreat + Stay", label: "Work and downtime balance" },
    { value: "Direct", label: "Faster booking action" },
  ],
  gallery: [
    {
      image: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
      title: "A stronger corporate first impression",
      copy: "The page now opens with a more premium visual rhythm that better matches executive browsing expectations.",
    },
    {
      image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
      title: "Retreat-ready atmosphere",
      copy: "Suitable for leadership sessions, offsites, planning workshops, and business stays that need focus and comfort.",
    },
    {
      image: "https://bookonelocal.in/cdn/conference3-1.jpg",
      title: "Clearer event positioning",
      copy: "Corporate packages are framed to help planners evaluate fit quickly without losing the hospitality feel.",
    },
  ],
  packagesTitle: "Corporate formats that read faster and feel more premium.",
  packagesSubtitle:
    "Each package is framed to help planners quickly understand audience fit, event character, and included support.",
  packageOptions: [
    {
      name: "Leadership Retreat",
      audience: "Senior teams and decision makers",
      description: "A quieter premium format for strategy sessions, executive alignment, and high-comfort overnight planning.",
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
      description: "Built for presentations, training sessions, launches, and other business formats that require smoother guest movement.",
      includes: ["Venue planning", "Guest coordination", "Hospitality support", "Custom event structure"],
    },
  ],
  planningTitle: "Made to reduce hesitation during business planning.",
  planningCopy:
    "Corporate guests typically scan for clarity, trust, and ease of next action. This upgraded page keeps those signals strong through balanced spacing, richer visual contrast, and motion that supports reading rather than competing with it.",
  planningPoints: [
    "Use this page for retreats, offsites, business meetings, launches, and room-block stays.",
    "Keep copy concise and premium so coordinators can scan quickly while leadership teams still feel a strong brand presence.",
    "Close with a direct booking action when the user has already seen enough to decide.",
  ],
  planningImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
  bookingCtaEyebrow: "Book Direct",
  bookingCtaTitle: "Ready to plan your corporate stay?",
  bookingCtaCopy:
    "Proceed directly to the booking engine for live availability and the next booking step without returning to a slower manual inquiry flow.",
  bookingButtonLabel: "Book Corporate Stay",
  bookingButtonHref: "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true",
};
