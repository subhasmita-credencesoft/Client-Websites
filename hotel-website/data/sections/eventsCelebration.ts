export const WEDDINGS_CELEBRATION_MAP_LINKS = {
  events:
    "https://www.google.co.in/maps/place/UK'S+RESORT/@18.817145,73.3046891,3a,90y,82.75h,75.21t/data=!3m7!1e1!3m5!1sEqXPpiFcSuYAAAQvxYn65A!2e0!3e2!7i13312!8i6656!4m5!3m4!1s0x3be7fd68dbb32757:0x45a268bbfa521ef0!8m2!3d18.8171404!4d73.3046807!6m1!1e1?shorturl=1",
  picnic:
    "https://www.google.co.in/maps/@18.8171575,73.3046448,3a,90y,119.21h,85.89t/data=!3m7!1e1!3m5!1s2c65xsf3YxUAAAQvxYn66g!2e0!3e2!7i13312!8i6656!6m1!1e1?shorturl=1",
  sports:
    "https://www.google.co.in/maps/@18.8171712,73.3046889,3a,75y,204.45h,83.59t/data=!3m6!1e1!3m4!1sXJbldbTZ-54AAAQvxYVCgA!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
  corporate:
    "https://www.google.co.in/maps/@18.8172029,73.3043333,3a,90y,29.8h,79.33t/data=!3m6!1e1!3m4!1skETcL7QTVdIAAAQvxYhZaw!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
} as const;

export const WEDDINGS_BOOKING_ENGINE_URL =
  "https://wa.me/918779814559?text=Hi%2C%20I%20am%20looking%20to%20plan%20a%20wedding%2Fevent%20at%20UK%27s%20Resort.%20Please%20share%20details.";

export type WeddingsCelebrationBlock = {
  id: string;
  layout: "media-left" | "media-right";
  mediaImage: string;
  mediaAlt: string;
  cardTitle: string;
  cardParagraphs: string[];
  highlightLabel: string;
  highlights: string[];
  enquiryHref: string;
  virtualTourKey: keyof typeof WEDDINGS_CELEBRATION_MAP_LINKS;
  virtualTourAriaLabel: string;
};

export const WEDDINGS_CELEBRATION_KICKER = "Event Destinations";
export const WEDDINGS_CELEBRATION_TITLE_LINES = ["What a day here", "looks like"] as const;
export const WEDDINGS_CELEBRATION_INTRO =
  "UK's Resort is built for full days - not just an activity or two. From the moment your group arrives, there's water fun, sports grounds, open lawns, a kids' zone, and proper sit-down meals to fill the hours naturally. Families pace it slow. Schools run it structured. Birthday groups do whatever they want. The space adapts.";

export const WEDDINGS_CELEBRATION_BLOCKS: WeddingsCelebrationBlock[] = [
   {
    id: "corporate",
    layout: "media-right",
    mediaImage: "https://bookonelocal.in/cdn/conference3-1.jpg",
    mediaAlt: "Corporate event and team outing space",
    cardTitle: "Corporate Team Days",
    cardParagraphs: [
      "Mix structured activities with open downtime. Cricket on the lawn in the morning, a working lunch, and team games in the afternoon - the kind of day that actually gets people talking to each other.",
    ],
    highlightLabel: "Ideal For",
    highlights: ["Offsites", "Training days", "Team outings"],
    enquiryHref: "https://wa.me/919822012343?text=Hi%2C%20I%20want%20a%20group%20quote%20for%20a%20corporate%20team%20day%20at%20UK%27s%20Resort.",
    virtualTourKey: "corporate",
    virtualTourAriaLabel: "Take a virtual tour of corporate event area",
  },
  {
    id: "events",
    layout: "media-left",
    mediaImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
    mediaAlt: "Open resort event space",
    cardTitle: "Birthdays & Celebrations",
    cardParagraphs: [
      "Mark it properly. UK's Resort handles birthday setups, decoration space, group dining, and open grounds for games so you show up and celebrate, not manage logistics. Available for groups of 20 and above.",
    ],
    highlightLabel: "Best For",
    highlights: [ "Group dining", "1000+ guests"],
    enquiryHref: WEDDINGS_BOOKING_ENGINE_URL,
    virtualTourKey: "events",
    virtualTourAriaLabel: "Take a virtual tour of event venue",
  },
  {
    id: "picnic",
    layout: "media-right",
    mediaImage: "/children5.avif",
    mediaAlt: "Family picnic grounds",
    cardTitle: "Family & School Outings",
    cardParagraphs: [
      "A full day for every age - toddlers to grandparents. Lawn games, water play, a dedicated kids' zone, and a buffet lunch that keeps everyone happy and on schedule.",
    ],
    highlightLabel: "Includes",
    highlights: ["Kids zone", "Buffet lunch", "All-age outing"],
    enquiryHref: WEDDINGS_BOOKING_ENGINE_URL,
    virtualTourKey: "picnic",
    virtualTourAriaLabel: "Take a virtual tour of picnic area",
  },
  {
    id: "sports",
    layout: "media-left",
    mediaImage: "https://bookonelocal.in/cdn/outdoor-image.jpg",
    mediaAlt: "Sports activities at resort",
    cardTitle: "Adventure & Sports",
    cardParagraphs: [
      "Cricket, football, badminton, throwball - plus water slides, rain dance, and a splash pool. If your group needs to move, burn energy, and come back tired-happy, this is the day for them.",
    ],
    highlightLabel: "Activities",
    highlights: ["Cricket", "Football", "Water fun"],
    enquiryHref: "https://wa.me/919822012343?text=Hi%2C%20please%20share%20the%20activities%20list%20for%20UK%27s%20Resort.",
    virtualTourKey: "sports",
    virtualTourAriaLabel: "Take a virtual tour of sports area",
  },
 
];
