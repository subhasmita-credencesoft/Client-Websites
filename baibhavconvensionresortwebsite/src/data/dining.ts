import { CateringOption, DiningHighlight } from '@/types';

export const RESTAURANT = {
  name: 'Fusion bites ',
  concept:
    'A multi-cuisine restaurant serving authentic regional Odia delicacies alongside popular North Indian, South Indian, and Continental fare  from sunrise thalis to slow dinners.',
  hours: '7:00 AM – 10:30 PM',
  specialties: [
    'Local coastal seafood dishes',
    'Traditional Odia thalis',
    'Signature tandoori appetizers',
    'Fresh breakfast counter with daily specials',
  ],
  highlights: [
    {
      title: 'Local Odia Specialties',
      description: 'Handed-down recipes, coastal seafood, and traditional thalis served fresh daily.',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&fit=crop',
    },
    {
      title: 'North & South Indian',
      description: 'Rich gravies, dosas, and regional curries prepared by experienced master chefs.',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80&fit=crop',
    },
    {
      title: 'Continental & Café Favorites',
      description: 'Pastas, grills, sandwiches, and barista-style coffee through the day.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop',
    },
    {
      title: 'Room Service',
      description: 'A complete room service menu available 24/7 for in-room dining.',
      image: '/images/roomservice.png',
    },
  ] as DiningHighlight[],
};

export const CATERING = {
  description:
    'Food is the heart of every great event. Our banquet culinary team offers customizable menu templates suited to your palate and budget  from traditional rituals to modern live counters.',
  options: [
    {
      title: 'Traditional Pure-Veg / Satvik Menus',
      description: 'Prepared with strict dietary standards for traditional rituals and ceremonies.',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80&fit=crop',
    },
    {
      title: 'Multi-Cuisine Buffet Counters',
      description: 'Live chaat stalls, tandoori stations, Chinese wok counters, and artisanal dessert displays.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80&fit=crop',
    },
    {
      title: 'Custom Dietary Requirements',
      description: 'Special options available for Jain, vegan, and gluten-free diets upon request.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&fit=crop',
    },
  ] as CateringOption[],
};

export const DINING_SECTION = {
  title: 'Exceptional Flavors, Masterfully Crafted',
  subtitle:
    'From intimate dinners to banquets catering to thousands, our culinary team delivers excellence on every plate.',
};
