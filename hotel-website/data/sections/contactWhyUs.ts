export type ContactBenefit = {
  title: string;
  description: string;
  icon: "amenities" | "rooms" | "location" | "concierge" | "packages" | "value";
};

export const CONTACT_BENEFITS: ContactBenefit[] = [
  {
    title: "World-Class Amenities",
    description:
      "Immerse yourself in elegance with top-notch live music performances and exceptional service.",
    icon: "amenities",
  },
  {
    title: "Luxurious Rooms",
    description:
      "Whether you are seeking total time-out or an improvement in general health, wellbeing or fitness.",
    icon: "rooms",
  },
  {
    title: "Gorgeous Location",
    description:
      "Immerse yourself in elegance with top-notch live music performances and exceptional service.",
    icon: "location",
  },
  {
    title: "Dedicated Concierge",
    description:
      "Whether you are seeking total time-out or an improvement in general health, wellbeing or fitness.",
    icon: "concierge",
  },
  {
    title: "Packages & Tours",
    description:
      "Immerse yourself in elegance with top-notch live music performances and exceptional service.",
    icon: "packages",
  },
  {
    title: "Exceptional Value",
    description:
      "Whether you are seeking total time-out or an improvement in general health, wellbeing or fitness.",
    icon: "value",
  },
];
