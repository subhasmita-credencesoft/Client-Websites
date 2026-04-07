export type ResortIntroHighlight = {
  title: string;
  icon: "waves" | "tent" | "dumbbell" | "gamepad" | "utensils" | "tree";
};

export type ResortIntroValue = {
  title: string;
  text: string;
};

export type ResortIntroSlide = {
  src: string;
  alt: string;
};

export const RESORT_INTRO_HIGHLIGHTS: ResortIntroHighlight[] = [
  { title: "Water Park & Swimming Pool with Rain Dance", icon: "waves" },
  { title: "Adventure Activities - Archery, Zorbing, Wall Climbing & more", icon: "tent" },
  { title: "Fully Furnished Gym with Sophisticated Equipment", icon: "dumbbell" },
  { title: "Indoor Games - Table Tennis, Badminton & Carom", icon: "gamepad" },
  { title: "Multi-cuisine Restaurant & Dining Experience", icon: "utensils" },
  { title: "Outdoor Sports & Exclusively Designed Kid's Park", icon: "tree" },
];

export const RESORT_INTRO_VALUES: ResortIntroValue[] = [
  { title: "Vision", text: "To serve all our guests with a personal touch, making them feel on top of the world." },
  { title: "Mission", text: "To be the first choice of our guests." },
];

export const RESORT_INTRO_SLIDES: ResortIntroSlide[] = [
  { src: "/uk.avif", alt: "Resort aerial view" },
  { src: "/uk1.avif", alt: "Resort leisure area" },
  { src: "/uk2.avif", alt: "Resort landscape" },
];

export const RESORT_INTRO_TITLE =
  "The Name That Redefines Hospitality Par-Excellence In The Lush Green Landscape At Khopoli.";

export const RESORT_INTRO_AUTO_SLIDE_MS = 3500;
