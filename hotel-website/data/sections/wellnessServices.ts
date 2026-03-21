export type WellnessServiceItem = {
  name: string;
  duration: string;
  price: string;
};

export const WELLNESS_PRIMARY_SERVICES: WellnessServiceItem[] = [
  { name: "Classic massage", duration: "40 min.", price: "$64" },
  { name: "Lava stone massage", duration: "60 min.", price: "$85" },
  { name: "Tranquillity therapy", duration: "90 min.", price: "$105" },
];

export const WELLNESS_EXOTIC_SERVICES: WellnessServiceItem[] = [
  { name: "Thai oil full body aroma massage", duration: "40 min.", price: "$64" },
  { name: "Thai traditional massage", duration: "60 min.", price: "$85" },
  { name: "Thai oil back massage", duration: "90 min.", price: "$105" },
];

export const WELLNESS_FACIAL_SERVICES: WellnessServiceItem[] = [
  { name: "Hydrating facial treatment", duration: "40 min.", price: "$64" },
  { name: "Lifting massage facial treatment", duration: "60 min.", price: "$85" },
  { name: "Cleansing facial treatment", duration: "90 min.", price: "$105" },
];

export const WELLNESS_TRADITIONAL_SERVICES: WellnessServiceItem[] = [
  { name: "Traditional full body", duration: "40 min.", price: "$64" },
  { name: "Traditional massage", duration: "60 min.", price: "$85" },
  { name: "Oil back massage", duration: "90 min.", price: "$105" },
];
