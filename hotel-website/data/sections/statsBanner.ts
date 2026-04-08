export type StatsBannerItem = {
  value: number;
  suffix: string;
  label: string;
};

export const STATS_BANNER_ITEMS: StatsBannerItem[] = [
  { value: 524, suffix: "", label: "luxury rooms" },
  { value: 74, suffix: "k", label: "guests" },
  { value: 1.8, suffix: "k", label: "five star ratings" },
  { value: 2.5, suffix: "m", label: "served breakfast" },
];

export const STATS_BANNER_BG_IMAGE =
  "/uk2.avif";
