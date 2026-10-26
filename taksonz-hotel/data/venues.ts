import { img } from "./images";

export interface Venue {
  slug: string;
  name: string;
  kind: "banquet" | "meeting";
  capacity: number;
  areaSqFt: number;
  image: string;
  description: string;
  suitableFor: string[];
}

export const venues: Venue[] = [
  {
    slug: "grand-banquet-hall",
    name: "Grand Banquet Hall",
    kind: "banquet",
    capacity: 350,
    areaSqFt: 5000,
    image: img("banquet-grand"),
    description: "Our largest space, planned for weddings, receptions and large celebrations.",
    suitableFor: ["Weddings", "Receptions", "Large celebrations"],
  },
  {
    slug: "royal-hall",
    name: "Royal Hall",
    kind: "banquet",
    capacity: 180,
    areaSqFt: 2500,
    image: img("banquet-royal"),
    description: "A versatile mid-sized hall for engagements, parties and corporate functions.",
    suitableFor: ["Engagements", "Social gatherings", "Corporate events"],
  },
  {
    slug: "board-room",
    name: "Board Room",
    kind: "meeting",
    capacity: 30,
    areaSqFt: 500,
    image: img("banquet-board"),
    description: "A private room for board meetings, interviews and small corporate sessions.",
    suitableFor: ["Board meetings", "Interviews", "Small workshops"],
  },
];

export const banquetVenues = venues.filter((v) => v.kind === "banquet");
export const meetingVenues = venues.filter((v) => v.kind === "meeting");
/** Meeting page lists the board room plus any hall suitable for corporate events. */
export const corporateVenues = [...meetingVenues, ...banquetVenues.filter((v) => v.suitableFor.includes("Corporate events"))];

export const eventTypes = ["Wedding", "Corporate event", "Social gathering", "Conference", "Other"] as const;
