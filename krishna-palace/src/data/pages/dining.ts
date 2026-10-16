import { hotel } from '@/data/site';
import { diningOutlets } from '@/data/dining';
import type { ShowcaseContent } from '@/data/pages/banquet';

export const diningQuickNav = [
  { index: '01', label: 'Fiesta All-Day', href: '#fiesta' },
  { index: '02', label: 'Madira The Bar', href: '#madira' },
];

const fiesta = diningOutlets.find((outlet) => outlet.slug === 'fiesta')!;
const madira = diningOutlets.find((outlet) => outlet.slug === 'madira')!;

export const diningShowcases: ShowcaseContent[] = [
  {
    id: 'fiesta',
    number: '01',
    image: fiesta.image,
    imageAlt: fiesta.alt,
    badge: fiesta.badge,
    eyebrow: fiesta.positioning,
    tagline: fiesta.tagline,
    title: 'The Morning Table to Comforting Suppers.',
    description:
      'Fiesta is the hotel’s vibrant culinary heart. Start your day with steaming South Indian breakfast staples such as rasam and sambar-vada, or linger over satisfying Indian and multi-cuisine preparations for lunch and dinner in a bright, welcoming hall.',
    meta: [
      { label: 'Service', value: 'Breakfast, Lunch & Dinner' },
      { label: 'Cuisine', value: 'South Indian & Multi-Cuisine' },
      { label: 'Atmosphere', value: 'Relaxed & Family Friendly' },
      { label: 'Location', value: 'Main Lobby Level' },
    ],
    actions: [
      { href: '/dining/fiesta/', label: 'Explore Fiesta' },
      { href: `tel:${hotel.phoneHref}`, label: 'Reserve table', outline: true },
    ],
  },
  {
    id: 'madira',
    reverse: true,
    number: '02',
    image: madira.image,
    imageAlt: madira.alt,
    badge: madira.badge,
    eyebrow: madira.positioning,
    tagline: madira.tagline,
    title: 'An Unhurried Pour Since 2008.',
    description:
      'Madira The Bar offers a sanctuary of refined calm. Rich wood-paneled walls and warm ambient lighting set the tone for fine spirits, refreshing beverages, and savoury North Indian delicacies prepared with culinary precision.',
    meta: [
      { label: 'Operating Hours', value: '10:00 AM – 11:00 PM (Daily)' },
      { label: 'Category', value: 'Bar & Fine Dining Lounge' },
      { label: 'Average Cost', value: '₹1,650 approx. for two' },
      { label: 'Payments', value: 'Visa, Mastercard, RuPay & Cash' },
    ],
    actions: [
      { href: '/dining/madira/', label: 'Explore Madira The Bar' },
      { href: `tel:${hotel.phoneHref}`, label: 'Enquire for seating', outline: true },
    ],
  },
];

export const diningTimeline = [
  {
    time: '07:00 – 10:30',
    period: 'Morning · Fiesta',
    title: 'Morning Awakenings',
    body: 'South Indian breakfast classics, fresh filter coffee, hot dosas, and nourishing continental options before early site visits.',
    link: { href: '/dining/fiesta/', label: 'Visit Fiesta' },
  },
  {
    time: '10:00 – 23:00',
    period: 'All Day · Madira The Bar',
    title: 'Refined Hospitality',
    body: 'An unhurried lounge retreat with North Indian savouries, fine spirits, and attentive service in quiet comfort.',
    link: { href: '/dining/madira/', label: 'Visit Madira' },
  },
];

export const diningPillars = [
  {
    kicker: 'Authentic Flavours',
    title: 'Regional & Multi-Cuisine',
    body: 'From age-old South Indian griddle recipes to robust North Indian gravies and tandoor grills, our kitchens honour authentic tastes without shortcuts.',
  },
  {
    kicker: 'Distinct Venues',
    title: 'Two Spaces to Choose',
    body: 'Whether you seek the family-friendly ease of Fiesta or the quiet intimacy of Madira The Bar.',
  },
  {
    kicker: 'Thoughtful Service',
    title: 'Hosapete’s Warmth',
    body: 'Established hospitality tailored to travellers returning from Hampi, local family gatherings, business meets, and celebratory dinners.',
  },
];
