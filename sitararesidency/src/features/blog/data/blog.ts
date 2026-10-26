import type { CardItem, DetailContent } from '@/shared/types/content';
import { business } from '@/core/config/business';

export interface BlogArticle extends CardItem {
  category: string;
  date: string;
  content: readonly string[];
  takeaways?: readonly string[];
}

export const journalCards: (CardItem & { category: string; date: string })[] = [
  {
    slug: 'navi-mumbai-travel-guide',
    title: 'A Local’s Guide to Navi Mumbai & Kalamboli',
    eyebrow: 'Destination Guide',
    category: 'Local Guide',
    description:
      'From lush parks and iconic waterfronts to expressway connectivity and shopping, explore the best of Kalamboli and Navi Mumbai.',
    image: '/sitaraabout.avif',
    meta: '6 min read',
    date: 'October 2026',
  },
  {
    slug: 'corporate-stay-kalamboli-panvel',
    title: 'Why Kalamboli is the Strategic Choice for Corporate Travellers',
    eyebrow: 'Business & Corporate Travel',
    category: 'Corporate Stay',
    description:
      'Discover how strategic highway proximity, high-speed Wi-Fi, and 24/7 business amenities make Hotel Sitara Residency the preferred corporate address.',
    image: '/Hotel Sitara Residency Kalamboli Reception (3).avif',
    meta: '5 min read',
    date: 'October 2026',
  },
  {
    slug: 'panvel-weekend-getaways',
    title: 'Top Weekend Getaways & Scenic Escapes Near Panvel',
    eyebrow: 'Weekend Excursions',
    category: 'Sightseeing & Nature',
    description:
      'From the birdwatching trails of Karnala Sanctuary to historic hill fortresses, explore picturesque weekend destinations near Hotel Sitara Residency.',
    image: '/Hotel Sitara Residency Kalamboli Reception (7).avif',
    meta: '7 min read',
    date: 'October 2026',
  },
  {
    slug: 'navi-mumbai-international-airport-guide',
    title: 'Navi Mumbai International Airport (NMIA): The Complete Transit Guide',
    eyebrow: 'Airport Corridor & Transit',
    category: 'Transit & Airport',
    description:
      'Navigating the new Navi Mumbai International Airport corridor: flight transit tips, proximity advantages, and comfortable stays in Kalamboli.',
    image: '/Hotel Sitara Residency Kalamboli Reception (5).avif',
    meta: '5 min read',
    date: 'October 2026',
  },
];

export const blogArticlesMap: Record<string, DetailContent & { category: string; date: string; takeaways: string[] }> = {
  'navi-mumbai-travel-guide': {
    title: 'A Local’s Guide to Navi Mumbai & Kalamboli',
    eyebrow: 'Destination Guide',
    category: 'Local Guide',
    date: 'October 2026',
    intro:
      'Navi Mumbai has evolved into one of the most vibrant urban corridors in Western India. With wide boulevards, excellent infrastructure, and seamless highway access, Kalamboli stands proudly at the crossroads of this dynamic region.',
    paragraphs: [
      'For guests staying at Hotel Sitara Residency, exploring the area is effortless. A short 10-minute drive takes you to Kharghar, home to the breathtaking Central Park — one of Asia’s largest urban parks — featuring amphitheaters, walking tracks, and expansive botanical gardens. Adjacent lies the Kharghar Valley Golf Course, set against the scenic backdrop of the Sahyadri hills.',
      'Architecture enthusiasts should not miss Utsav Chowk, an iconic Greco-Roman style monument in Kharghar illuminated brilliantly at night, and the majestic ISKCON Temple at Kharghar hills offering a tranquil retreat from urban life.',
      'When it comes to shopping and dining, Seawoods Grand Central Mall in Nerul and Little World Mall in Kharghar offer international retail brands, multiplexes, and fine dining. For authentic Maharashtrian cuisine and coastal delicacies, local eateries around Panvel and Kalamboli serve mouthwatering misal pav, fresh seafood thalis, and Malvani preparations.',
      'Whether you are visiting for a weekend getaway or a prolonged business trip, our front desk at Hotel Sitara Residency is delighted to arrange local cabs, suggest itineraries, and ensure your stay is comfortable and memorable.',
    ],
    image: '/sitaraabout.avif',
    facts: [
      'Location: Kalamboli, Navi Mumbai',
      'Read Time: 6 min read',
      'Best Time to Visit: Year-round (Monsoon & Winter ideal)',
      `Hospitality: ${business.name}`,
    ],
    takeaways: [
      'Central Park Kharghar is just 10 mins from Hotel Sitara Residency.',
      'Direct highway access to Mumbai, Pune, and Thane without inner-city jams.',
      '24/7 concierge assistance available for local travel and cab bookings.',
    ],
  },
  'corporate-stay-kalamboli-panvel': {
    title: 'Why Kalamboli is the Strategic Choice for Corporate Travellers',
    eyebrow: 'Business & Corporate Travel',
    category: 'Corporate Stay',
    date: 'October 2026',
    intro:
      'In modern business travel, location and efficiency are paramount. Kalamboli has emerged as a premier logistics, industrial, and commercial powerhouse in Navi Mumbai, anchored by the massive Kalamboli Warehousing Complex (KWC), the Steel Market, and close proximity to the Taloja MIDC industrial corridor.',
    paragraphs: [
      'Hotel Sitara Residency provides business executives and corporate teams with the perfect balance of professional convenience and personal rest. Situated at Riddhi Arcade, just minutes from the Mumbai-Pune Expressway entrance, corporate guests bypass inner-city traffic bottlenecks and enjoy seamless transit.',
      'Our rooms are thoughtfully equipped for the modern professional. High-speed complimentary Wi-Fi, ergonomic in-room desks, power backup that ensures uninterrupted laptop and smartphone charging, and 43" Smart TVs allow you to transition effortlessly between work and relaxation.',
      'We also cater to corporate travel coordinators with streamlined GST invoicing, flexible check-in and check-out arrangements, and dedicated on-site parking for company vehicles and taxis.',
      'For team bookings, corporate tariffs, and long-stay agreements, our reservations desk is available 24/7 at +91 74004 32396 / +91 74004 32397.',
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (3).avif',
    facts: [
      'Hub: Kalamboli Warehousing Complex (KWC)',
      'Read Time: 5 min read',
      'Services: High-Speed Wi-Fi, 24/7 Power Backup, GST Billing',
      `Direct Booking: ${business.phones.primaryDisplay}`,
    ],
    takeaways: [
      'Direct expressway ramp access — reach Panvel, Belapur & Taloja in minutes.',
      'Dedicated workspaces and 100% generator power backup in all rooms.',
      'Corporate corporate discounts and official GST invoices provided promptly.',
    ],
  },
  'panvel-weekend-getaways': {
    title: 'Top Weekend Getaways & Scenic Escapes Near Panvel',
    eyebrow: 'Weekend Excursions',
    category: 'Sightseeing & Nature',
    date: 'October 2026',
    intro:
      'Nestled at the base of the Western Ghats, the Panvel and Kalamboli region serves as the starting point for some of Maharashtra’s most rewarding nature trails, historical monuments, and scenic drives.',
    paragraphs: [
      'Just 15 km south of our hotel along NH 66 lies the Karnala Bird Sanctuary. Home to over 222 species of native and migratory birds, this verdant forest reserve is a haven for ornithologists, families, and nature lovers. For adventure seekers, the trek up to the 12th-century Karnala Fort offers panoramic 360-degree views of the surrounding valley.',
      'Another iconic destination nearby is Gadeshwar Dam, situated amidst rolling green hills near Panvel. During the monsoon and winter months, the reservoir overflows into picturesque streams and waterfalls, making it an idyllic spot for peaceful morning walks and family picnics.',
      'History buffs can also visit the historic Ballaleshwar Temple at Pali or take a scenic drive up to Matheran — Asia’s only automobile-free hill station — located just 35 km from Hotel Sitara Residency.',
      'After a full day of trekking and exploration, return to the crisp air conditioning, hot shower, and comforting room service at Hotel Sitara Residency for a deeply relaxing night’s sleep.',
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (7).avif',
    facts: [
      'Attractions: Karnala Sanctuary, Gadeshwar Dam, Matheran',
      'Read Time: 7 min read',
      'Ideal For: Trekkers, Nature Enthusiasts, Families',
      `Base Camp: ${business.name}`,
    ],
    takeaways: [
      'Karnala Sanctuary & Fort is a quick 20-minute drive from the hotel.',
      'Matheran hill station is easily accessible via Neral from Panvel.',
      'Complimentary secure parking provided for your road-trip vehicles.',
    ],
  },
  'navi-mumbai-international-airport-guide': {
    title: 'Navi Mumbai International Airport (NMIA): The Complete Transit Guide',
    eyebrow: 'Airport Corridor & Transit',
    category: 'Transit & Airport',
    date: 'October 2026',
    intro:
      'The development of the Navi Mumbai International Airport (NMIA) in the Ulwe-Panvel belt marks a historic milestone in Western India’s aviation infrastructure. Designed to handle over 60 million passengers annually, the airport dramatically streamlines transit for travellers across Mumbai, Pune, and Konkan.',
    paragraphs: [
      'Hotel Sitara Residency in Kalamboli is situated along the primary northern approach corridor to the airport, placing guests just 15 minutes away from passenger terminals via direct signal-free arterial expressways.',
      'For air travellers with early morning departures or late-night arrivals, staying in Kalamboli eliminates the unpredictable traffic of central Mumbai. You can sleep peacefully, enjoy freshly prepared meals, and reach the airport security gate in minutes.',
      'Our 24-hour reception desk provides instant wake-up calls, airport taxi coordination, and flexible luggage holding, ensuring transit guests enjoy zero stress during flight connections.',
      'Whether you are a flight crew member, business flyer, or vacationing family, Hotel Sitara Residency is proud to be your trusted hospitality partner on the airport corridor.',
    ],
    image: '/Hotel Sitara Residency Kalamboli Reception (5).avif',
    facts: [
      'Airport Distance: ~15 mins via expressway link',
      'Read Time: 5 min read',
      'Transit Amenities: 24/7 Front Desk, Wake-up Calls, Cab Assistance',
      `Reservation: ${business.website}`,
    ],
    takeaways: [
      'Closest premium accommodation corridor to the upcoming NMIA terminals.',
      'Round-the-clock check-in and wake-up calls tailored for air travellers.',
      'Stress-free alternative to congested downtown Mumbai airport routes.',
    ],
  },
};

export const blogFallback: DetailContent = {
  title: 'A note from Hotel Sitara Residency',
  eyebrow: 'The Sitara Journal',
  intro: 'Helpful notes and local tips about Kalamboli and Navi Mumbai.',
  paragraphs: [
    'Whether you are in Kalamboli for a business meeting, a family gathering, or a highway transit stay, our team is always on hand with local recommendations, driving directions, and genuine hospitality.',
    'We regularly update this journal with useful neighbourhood tips, upcoming developments, and sightseeing guides to make your travel smoother and more rewarding.',
  ],
  image: '/sitaraabout.avif',
  facts: [`From ${business.name}`, 'Kalamboli, Navi Mumbai', '5 min read', 'Updated Seasonally'],
};
