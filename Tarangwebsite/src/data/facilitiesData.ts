export interface Facility {
  id: string;
  name: string;
  category: 'Recreation' | 'Dining & Comfort' | 'Services' | 'Convenience';
  tagline: string;
  description: string;
  icon: string;
  image: string;
  details: string[];
}

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'outdoor-swimming-pool',
    name: 'Outdoor Swimming Pool & Sun Pergola',
    category: 'Recreation',
    tagline: 'Crystal-clear azure waters surrounded by coconut palms and fairy-lit pergola',
    description:
      'Our centerpiece swimming pool is filtered daily and maintained to the highest hygiene standards. Complete with wooden pergola, poolside deck, and evening ambient lighting, it is the favorite retreat for cooling off after the beach.',
    icon: 'Waves',
    image: '/images/facilities/pool-day.jpg',
    details: [
      'Operating Hours: 07:00 AM – 09:00 PM',
      'Daily automated filtration and PH balanced crystal waters',
      'Poolside deck with pergola shade and comfortable loungers',
      'Evening illuminated fairy-light ambiance for tranquil relaxation',
    ],
  },
  {
    id: 'kids-pool',
    name: "Dedicated Children's Splash Pool",
    category: 'Recreation',
    tagline: 'Safe, shallow water fun for toddlers and kids',
    description:
      'Adjacent to the main swimming pool, our shallow kids pool ensures that little ones can splash, play, and safely enjoy their vacation while parents relax comfortably on neighboring poolside seats.',
    icon: 'Smile',
    image: '/images/facilities/pool-pergola.jpg',
    details: [
      'Depth: 1.5 ft to 2 ft safe gradual slope for kids',
      'Non-slip tiles and perimeter safety ledge',
      'Swimming float rings available upon request',
    ],
  },
  {
    id: 'authentic-restaurant',
    name: 'In-House Maharashtrian & Seafood Dining Hall',
    category: 'Dining & Comfort',
    tagline: 'Home-style coastal seafood, fresh catch, and Konkani thalis',
    description:
      'Enjoy freshly cooked delicacies served in our airy open-sided dining hall or directly delivered to your cottage veranda. Savor genuine Surmai fry, Pomfret thali, and chilled Solkadhi.',
    icon: 'Utensils',
    image: '/images/dining/dining-hall.jpg',
    details: [
      'Breakfast, Lunch, High Tea, and Dinner service',
      'Authentic Konkani Surmai, Pomfret, Prawns & Pure Veg Thalis',
      'Direct cottage room service at no extra charge',
    ],
  },
  {
    id: 'coconut-lawn-garden',
    name: 'Lush Green Lawn & Lotus Pond Landscape',
    category: 'Recreation',
    tagline: 'Sprawling natural turf with heritage sculptures and lotus water features',
    description:
      'A verdant open lawn offering ample room for morning yoga, badminton, children running freely, or leisurely evening strolls amidst decorative brass and stone sculptures.',
    icon: 'Trees',
    image: '/images/facilities/lawn-lotus-pond.jpg',
    details: [
      'Natural lotus pond water feature with flowering pads',
      'Handcrafted heritage warrior and musician statues',
      'Ideal for small birthday setups and family reunions',
    ],
  },
  {
    id: 'evening-bonfire',
    name: 'Illuminated Night Lawn & Starlit Gatherings',
    category: 'Recreation',
    tagline: 'Warm ambiance under Alibag starlit skies',
    description:
      'Gather around on the manicured lawn on cool Konkani evenings. Perfect for sharing stories, enjoying music, warm tea, and coastal appetizers with friends and family.',
    icon: 'Flame',
    image: '/images/facilities/pool-aerial-night.jpg',
    details: [
      'Organized evening lighting and starlit open-air lawn ambiance',
      'Comfortable outdoor sitting areas and porch swings',
      'Authentic evening chai, snacks, and seafood starters',
    ],
  },
  {
    id: 'pet-friendly',
    name: 'Pet-Friendly Hospitality',
    category: 'Services',
    tagline: 'Bring your beloved four-legged companions along',
    description:
      'At Tarangan Resort, pets are considered family. Our open grounds and green pathways provide the ideal pet-friendly environment for your furry friends to run and relax.',
    icon: 'Heart',
    image: '/images/facilities/lawn-pathway.jpg',
    details: [
      'Open lawns and green pathways for pets to stretch and play',
      'Custom fresh pet meals on advance request',
      'Safe, enclosed gated resort property',
    ],
  },
  {
    id: 'power-backup-security',
    name: '24/7 Power Backup, Front Desk & Parking',
    category: 'Convenience',
    tagline: 'Seamless electricity backup, reception desk and secure parking',
    description:
      'Coastal power cuts will never disturb your leisure. Our generator backup ensures your AC, TV, Wi-Fi, and lights remain functional without interruption.',
    icon: 'ShieldCheck',
    image: '/images/facilities/reception-front.jpg',
    details: [
      'Reliable generator backup running round-the-clock',
      'Gated resort boundary with 24/7 staff support',
      'Secure, complimentary parking for guest cars & bikes',
    ],
  },
  {
    id: 'wellness-massage',
    name: 'Sunset Relaxation & Drone-View Serenity',
    category: 'Services',
    tagline: 'Peaceful coastal countryside vibes away from city chaos',
    description:
      'Nestled near Palhe along Sahan Bypass Road, enjoy true peace and bird song surrounded by betel nut groves and peaceful greenery.',
    icon: 'Sparkles',
    image: '/images/facilities/drone-sunset-aerial.jpg',
    details: [
      'Tranquil location just 4.1 km from Nagaon Beach',
      'Clean unpolluted air and panoramic greenery',
      'Traditional wooden swings (झोपाळा) on every cottage veranda',
    ],
  },
];
