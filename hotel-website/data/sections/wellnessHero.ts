export type WellnessHeroSlide = {
  id: string;
  label: string;
  headline: string;
  image: string;
  href: string;
};

export const WELLNESS_HERO_SLIDES: WellnessHeroSlide[] = [
  {
    id: "refresh",
    label: "Conference",
    headline: "Inspiring spaces for meetings & corporate events",
    image: "/conference.avif",
    href: "https://www.google.co.in/maps/@18.8172029,73.3043333,3a,90y,29.8h,79.33t/data=!3m6!1e1!3m4!1skETcL7QTVdIAAAQvxYhZaw!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
  },
  {
    id: "relax",
    label: "Picnic",
    headline: "Enjoy peaceful outdoor picnics in scenic surroundings",
    image: "/corporate2.avif",
    href: "https://www.google.co.in/maps/@18.8171575,73.3046448,3a,90y,119.21h,85.89t/data=!3m8!1e1!3m6!1s2c65xsf3YxUAAAQvxYn66g!2e0!3e2!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.109999999999999%26panoid%3D2c65xsf3YxUAAAQvxYn66g%26yaw%3D119.21!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: "renew",
    label: "corporate event",
    headline: "Explore our resort from the comfort of your home",
    image: "/event--corp.avif",
    href: "https://www.google.co.in/maps/@18.8171712,73.3046889,3a,75y,204.45h,83.59t/data=!3m6!1e1!3m4!1sXJbldbTZ-54AAAQvxYVCgA!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
  },
];

export const WELLNESS_HERO_HOVER_DELAY_MS = 4000;
