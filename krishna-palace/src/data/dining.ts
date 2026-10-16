import type { DiningOutlet } from '@/types/hotel';

export const diningOutlets: DiningOutlet[] = [
  {
    slug: 'fiesta',
    name: 'Fiesta',
    badge: 'All-Day Dining',
    type: 'All-Day Dining Restaurant',
    positioning: 'Breakfast, lunch & dinner',
    tagline: 'Flavours from morning to evening.',
    description: 'A welcoming all-day dining destination serving a variety of flavours in a relaxed hotel setting, perfect for breakfast, lunch and dinner.',
    extendedDescription: [
      'Fiesta offers a comfortable setting where hotel guests and travellers gather from early morning through the evening.',
      'Enjoy wholesome breakfast selections including authentic South Indian staples alongside Indian and multi-cuisine lunch and dinner favourites.',
      'Whether you are setting out for an early exploration of Hampi or returning for an unhurried dinner, Fiesta provides warm hospitality and familiar comfort.'
    ],
    image: '/compressed_FOC00545.jpg',
    alt: 'Multi-cuisine restaurant dining room at Hotel Krishna Palace',
    category: 'All-Day Dining Restaurant',
    cuisine: 'Indian & Regional Multi-Cuisine',
    features: [
      'Breakfast, lunch & dinner service',
      'South Indian breakfast specialties',
      'Comforting Indian & regional dishes',
      'Spacious indoor dining room',
      'Ideal for hotel guests & families'
    ]
  },
  {
    slug: 'madira',
    name: 'Madira The Bar',
    badge: 'Bar & Lounge',
    type: 'Bar & Fine Dining',
    positioning: 'Drinks + dining',
    tagline: 'Refined drinks and Indian favourites.',
    description: 'An elegant bar experience at Hotel Krishna Palace, bringing together refined ambience, refreshing beverages and a selection of Indian culinary favourites.',
    extendedDescription: [
      'Established in 2008, Madira The Bar is the hotel’s dedicated lounge outlet offering a quiet, sophisticated atmosphere to unwind.',
      'Pair fine bar selections and refreshing concoctions with savoury North Indian appetizers and culinary classics.',
      'With warm wood-paneled interiors and attentive service, it is the ideal destination for evening conversation and calm relaxation.'
    ],
    image: '/compressed_FOC00707_converted.jpg',
    alt: 'The hotel’s warm wood-paneled bar at Madira',
    hours: '10:00 AM – 11:00 PM (Monday – Sunday)',
    category: 'Bar / Fine Dining',
    cuisine: 'North Indian & Bar Selections',
    costForTwo: '₹1,650 approx. for two',
    features: [
      'Refined bar & lounge setting',
      'North Indian fine-dining selections',
      'Full spirits & beverage service',
      'Operating hours: 10:00 AM – 11:00 PM',
      'Digital & major card payments accepted'
    ],
    note: 'Beverage and menu selections are served at the venue. Please contact the hotel directly for specific requests or reservations.'
  }
];
