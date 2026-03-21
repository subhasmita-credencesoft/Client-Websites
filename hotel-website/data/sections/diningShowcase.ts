export const DINING_VIRTUAL_TOUR_URL =
  "https://www.google.co.in/maps/@18.8171454,73.3046935,3a,75y,230.79h,90t/data=!3m8!1e1!3m6!1s9axrwQcgs_QAAAQvxYVCdQ!2e0!3e2!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3D9axrwQcgs_QAAAQvxYVCdQ%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D64.35467%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656?shorturl=1";

export type DiningShowcaseItem = {
  title: string;
  label: string;
  description: string;
  image: string;
  position: string;
};

export const DINING_SHOWCASE_ITEMS: DiningShowcaseItem[] = [
  {
    title: "UK's Resort Restaurant",
    label: "Restaurant Dining",
    description:
      "Enjoy a hearty lunch and a delectable dinner with delicious local cuisine and popular Indian favorites.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif",
    position: "center",
  },
  {
    title: "Traditional Cuisine Hall",
    label: "Indian | Mughlai | Chinese",
    description:
      "Choose from Indian, Mughlai, and Chinese delicacies served with warm hospitality for families and groups.",
    image: "https://bookonelocal.in/cdn/Copy-of-IMG_2927.avif",
    position: "center 42%",
  },
  {
    title: "Wedding Dining Hall",
    label: "Wedding Dining",
    description:
      "Celebrate wedding functions with curated dining menus, spacious seating, and festive service.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_2910.avif",
    position: "center 40%",
  },
  {
    title: "Outer Garden Dining",
    label: "Outdoor Dining",
    description:
      "Take your meals in a lush green open-air setting between Mumbai and Pune with a peaceful resort ambience.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_3968.avif",
    position: "center 32%",
  },
  {
    title: "Corporate & Group Dining",
    label: "Conference | Team Events",
    description:
      "Plan official getaways, conferences, and one-day trips with coordinated buffet spreads and full dining support.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_4025.JPG",
    position: "center 36%",
  },
];
