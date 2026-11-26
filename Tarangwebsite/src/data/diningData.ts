export interface MenuItem {
  name: string;
  category: 'Seafood Specials' | 'Authentic Thalis' | 'Non-Veg Delicacies' | 'Vegetarian Classics' | 'Breakfast & Snacks' | 'Beverages';
  description: string;
  price?: string;
  isSpecial?: boolean;
  isSpicy?: boolean;
  image?: string;
}

export const DINING_DATA = {
  restaurantName: 'Tarangan In-House Rasoi & Cafe',
  tagline: 'Authentic Maharashtrian Konkani Coastal Culinary Tradition',
  description:
    'Our kitchen celebrates the rich, time-honored culinary heritage of coastal Alibag. Prepared with fresh daily catch from local fishermen and stone-ground Malvani spices, each dish promises unforgettable home-style warmth and authentic Konkani flavors.',
  chefNote:
    'From our crisp semolina-crusted Surmai to piping hot Solkadhi and hand-kneaded Bhakris, every meal is prepared fresh on order with pure coastal coconut and aromatic roasted spices.',
  categories: [
    'Seafood Specials',
    'Authentic Thalis',
    'Non-Veg Delicacies',
    'Vegetarian Classics',
    'Breakfast & Snacks',
    'Beverages',
  ],
  specialties: [
    {
      name: 'Special Surmai Rava Fry Thali',
      category: 'Seafood Specials' as const,
      description:
        'Fresh Kingfish steak marinated in coastal spices, coated in golden semolina and shallow fried. Served with coconut curry, steamed rice, chapatis/bhakri, and chilled Solkadhi.',
      isSpecial: true,
      image: '/images/dining/surmai-rava-fry.jpg',
    },
    {
      name: 'Fresh Pomfret (Paplet) Masala Fry',
      category: 'Seafood Specials' as const,
      description:
        'Whole fresh pomfret infused with tangy Kokum, ginger-garlic paste, and roasted Malvani masala, pan-fried to crisp perfection.',
      isSpecial: true,
      image: '/images/dining/pomfret-fry-plate.jpg',
    },
    {
      name: 'Grand Konkani Seafood Thali (Prawns & Fish)',
      category: 'Authentic Thalis' as const,
      description:
        'A royal coastal feast featuring authentic fish curry, fried fish, dry seafood kismoor/jawla, fragrant rice, fresh bhakri, and digestive Solkadhi.',
      isSpecial: true,
      image: '/images/dining/konkani-fish-thali.jpg',
    },
    {
      name: 'Surmai Masala Thali with Solkadhi',
      category: 'Authentic Thalis' as const,
      description:
        'Thick cut Surmai simmered in rich roasted coconut and onion gravy, paired with hot Bhakri, fresh onions, lemon, and cool coconut Solkadhi.',
      isSpecial: true,
      image: '/images/dining/surmai-thali.jpg',
    },
    {
      name: 'Authentic Maharashtrian Veg Thali',
      category: 'Vegetarian Classics' as const,
      description:
        'Hearty village spread of Pithla Bhakri, sprouted matki usal, dal fry, steamed rice, crisp papad, salad, and signature spicy thecha.',
      isSpecial: false,
      image: '/images/dining/veg-thali.jpg',
    },
    {
      name: 'Special Deluxe Veg Feast Thali',
      category: 'Vegetarian Classics' as const,
      description:
        'Traditional vegetarian thali featuring seasonal sabzi, dal tadka, fresh chapati, fragrant jeera rice, sweet gulab jamun, and curd.',
      isSpecial: true,
      image: '/images/dining/veg-thali-flatlay.jpg',
    },
  ],
  timings: {
    breakfast: '08:00 AM – 10:30 AM',
    lunch: '12:30 PM – 03:30 PM',
    eveningSnacks: '05:00 PM – 07:00 PM',
    dinner: '08:00 PM – 11:00 PM',
  },
};
