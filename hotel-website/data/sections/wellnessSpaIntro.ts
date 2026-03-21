export const WELLNESS_SPA_IMAGES = [
  "https://bookonelocal.in/cdn/pic2.jpeg",
  "https://bookonelocal.in/cdn/pic3.jpeg",
  "https://bookonelocal.in/cdn/pic4.jpeg",
  "https://bookonelocal.in/cdn/pic5.jpeg",
  "https://bookonelocal.in/cdn/pic6.jpeg",
  "https://bookonelocal.in/cdn/pic7.jpeg",
  "https://bookonelocal.in/cdn/pic8.jpeg",
  "https://bookonelocal.in/cdn/pic9.jpeg",
  "https://bookonelocal.in/cdn/pic10.jpeg",
  "https://bookonelocal.in/cdn/pic11.jpeg",
  "https://bookonelocal.in/cdn/pic12.jpeg",
] as const;

export type WellnessTourOption = {
  label: string;
  url: string;
  icon: "pool" | "kids" | "entry";
};

export const WELLNESS_TOUR_OPTIONS: WellnessTourOption[] = [
  {
    label: "Swimming Pool",
    url: "https://www.google.co.in/maps/@18.8171609,73.3046823,3a,75y,204.63h,85.09t/data=!3m8!1e1!3m6!1s2KDH2H1qz_8AAAQvxYlBkw!2e0!3e2!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.909999999999997%26panoid%3D2KDH2H1qz_8AAAQvxYlBkw%26yaw%3D204.63!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    icon: "pool",
  },
  {
    label: "Kids Area",
    url: "https://www.google.co.in/maps/@18.8171404,73.3046851,3a,90y,257.14h,79.61t/data=!3m7!1e1!3m5!1sluO7GcaMtf0AAAQvxYhZag!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D10.39%26panoid%3DluO7GcaMtf0AAAQvxYhZag%26yaw%3D257.14!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    icon: "kids",
  },
  {
    label: "Entry Area",
    url: "https://www.google.co.in/maps/@18.8170906,73.3046748,3a,75y,33.35h,71.78t/data=!3m8!1e1!3m6!1sYoNiEUaVO9gAAAQvxYhZZw!2e0!3e2!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D18.22%26panoid%3DYoNiEUaVO9gAAAQvxYhZZw%26yaw%3D33.35!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    icon: "entry",
  },
];
