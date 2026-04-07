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
  "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true";

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
export const WEDDINGS_CELEBRATION_TITLE_LINES = ["One page for events,", "play, and adventure"] as const;
export const WEDDINGS_CELEBRATION_INTRO =
  "Plan birthdays, family outings, school visits, social get-togethers, and active group days with open lawns, dining breaks, water fun, play zones, and event-friendly spaces that keep the full day exciting.";

export const WEDDINGS_CELEBRATION_BLOCKS: WeddingsCelebrationBlock[] = [
  {
    id: "events",
    layout: "media-left",
    mediaImage: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
    mediaAlt: "Open resort event space",
    cardTitle: "Day events & celebration spaces",
    cardParagraphs: [
      "From birthdays and reunions to launch gatherings and day celebrations, the resort gives every event a stronger sense of arrival, space, and festive energy.",
    ],
    highlightLabel: "Best For",
    highlights: ["Birthdays", "Launch events", "Family celebrations"],
    enquiryHref: WEDDINGS_BOOKING_ENGINE_URL,
    virtualTourKey: "events",
    virtualTourAriaLabel: "Take a virtual tour of event venue",
  },
  {
    id: "picnic",
    layout: "media-right",
    mediaImage: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
    mediaAlt: "Family picnic grounds",
    cardTitle: "Family picnic & play day",
    cardParagraphs: [
      "This experience is shaped for one-day outings where families, schools, and mixed-age groups can move easily between lawns, meal breaks, and activity zones.",
    ],
    highlightLabel: "Includes",
    highlights: ["Open lawns", "Kids play", "Relaxed group pacing"],
    enquiryHref: WEDDINGS_BOOKING_ENGINE_URL,
    virtualTourKey: "picnic",
    virtualTourAriaLabel: "Take a virtual tour of picnic area",
  },
  {
    id: "sports",
    layout: "media-left",
    mediaImage: "https://bookonelocal.in/cdn/outdoor-image.jpg",
    mediaAlt: "Sports activities at resort",
    cardTitle: "Adventure sports & activity grounds",
    cardParagraphs: [
      "Sprawling grounds support cricket, football, badminton, throw ball, and other group activities that make the outing feel active from start to finish.",
    ],
    highlightLabel: "Activities",
    highlights: ["Cricket", "Football", "Outdoor games"],
    enquiryHref: WEDDINGS_BOOKING_ENGINE_URL,
    virtualTourKey: "sports",
    virtualTourAriaLabel: "Take a virtual tour of sports area",
  },
  {
    id: "corporate",
    layout: "media-right",
    mediaImage: "https://bookonelocal.in/cdn/conference3-1.jpg",
    mediaAlt: "Corporate event and team outing space",
    cardTitle: "Corporate outings & team event areas",
    cardParagraphs: [
      "The page now gives corporate groups their own clearer place in the story, showing that the resort works for offsites, team days, launches, and activity-based company gatherings too.",
    ],
    highlightLabel: "Ideal For",
    highlights: ["Team offsites", "Launches", "Corporate outings"],
    enquiryHref: WEDDINGS_BOOKING_ENGINE_URL,
    virtualTourKey: "corporate",
    virtualTourAriaLabel: "Take a virtual tour of corporate event area",
  },
];
