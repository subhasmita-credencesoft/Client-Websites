export type HomeEventPanel = {
  id: string;
  title: string;
  subtitle: string;
  copy: string;
  image: string;
  mobileImage?: string;
  href: string;
  mapHref?: string;
  cta: string;
  accentColor: string;
};

export const HOME_EVENT_PANELS: HomeEventPanel[] = [
  {
    id: "wedding",
    title: "UK RESORT WEDDINGS",
    subtitle: "Destination Wedding Experiences",
    copy: "Say 'I do' amidst breathtaking mountain vistas with curated mehndi, sangeet, wedding ceremonies, and grand receptions crafted to perfection.",
    image: "https://bookonelocal.in/cdn/wedding4-1.jpg",
    mobileImage: "/images/wedding-image.jpg",
    href: "/weddings",
    mapHref:
      "https://www.google.co.in/maps/place/UK'S+RESORT/@18.817145,73.3046891,3a,90y,82.75h,75.21t/data=!3m7!1e1!3m5!1sEqXPpiFcSuYAAAQvxYn65A!2e0!3e2!7i13312!8i6656!4m5!3m4!1s0x3be7fd68dbb32757:0x45a268bbfa521ef0!8m2!3d18.8171404!4d73.3046807!6m1!1e1?shorturl=1",
    cta: "Discover Weddings",
    accentColor: "#c9a96e",
  },
  {
    id: "corporate",
    title: "UK RESORT CORPORATE",
    subtitle: "Conferences, Offsites & Team Retreats",
    copy: "From strategy summits to annual offsites, we deliver AV-ready spaces, banquet planning, curated menus, and seamless event operations.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_4025.JPG",
    mobileImage: "/images/restaurant6.jpg",
    href: "/experiences",
    mapHref:
      "https://www.google.co.in/maps/@18.8172029,73.3043333,3a,90y,29.8h,79.33t/data=!3m6!1e1!3m4!1skETcL7QTVdIAAAQvxYhZaw!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
    cta: "Discover Corporate",
    accentColor: "#8eb8c2",
  },
  {
    id: "picnic",
    title: "UK RESORT PICNICS",
    subtitle: "Family & Group Experiences",
    copy: "Enjoy one-day and overnight picnics with poolside fun, lawn games, music, and buffet experiences designed for all age groups.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
    mobileImage: "/images/Water-Park-13.jpg",
    href: "/experiences",
    mapHref:
      "https://www.google.co.in/maps/@18.8171679,73.3047501,3a,75y,251.92h,87.85t/data=!3m6!1e1!3m4!1spkBtZmeTSZ4AAAQvxYuH3Q!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
    cta: "Discover Picnic",
    accentColor: "#a8c08a",
  },
  {
    id: "kids",
    title: "UK RESORT KIDS AREA",
    subtitle: "Play, Learn & Explore",
    copy: "Dedicated kid-friendly zones and activity-led experiences keep little guests engaged while families relax and celebrate.",
    image: "https://bookonelocal.in/cdn/kids3.JPG",
    mobileImage: "/images/we6-img2.jpg",
    href: "/experiences",
    mapHref:
      "https://www.google.co.in/maps/@18.8171575,73.3046448,3a,90y,119.21h,85.89t/data=!3m7!1e1!3m5!1s2c65xsf3YxUAAAQvxYn66g!2e0!3e2!7i13312!8i6656!6m1!1e1?shorturl=1",
    cta: "Discover Kids Area",
    accentColor: "#e8b87a",
  },
];
