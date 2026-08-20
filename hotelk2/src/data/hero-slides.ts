export interface HeroSlide {
  image: string;
  alt: string;
  captionLabel: string;
  captionHref: string;
  /** Per-slide autoplay interval in ms (matches the live `data-bs-interval` values). */
  interval: number;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: '/homehero1.png',
    alt: 'Hotel K2 exterior, Chakradharpur',
    captionLabel: 'About Hotel K2',
    captionHref: '/#about',
    interval: 1000,
  },
  {
    image: '/conference/confresshall4.jpeg',
    alt: 'Conference Hall, Hotel K2',
    captionLabel: 'Our Gallery',
    captionHref: '/#gallery',
    interval: 2000,
  },
  {
    image: '/newimages/receptionmain.png',
    alt: 'Reception, Hotel K2',
    captionLabel: 'Contact Us',
    captionHref: '/#contact',
    interval: 3000,
  },
];
