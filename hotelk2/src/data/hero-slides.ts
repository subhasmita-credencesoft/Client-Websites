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
    image: '/homehero2.png',
    alt: 'Hotel K2, Chakradharpur',
    captionLabel: 'Contact Us',
    captionHref: '/#contact',
    interval: 2000,
  },
  {
    image: '/homehero3.png',
    alt: 'Hotel K2, Chakradharpur',
    captionLabel: 'Our Gallery',
    captionHref: '/#gallery',
    interval: 3000,
  },
];
