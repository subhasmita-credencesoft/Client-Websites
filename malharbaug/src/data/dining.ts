import { MenuCategory } from '@/types';

export interface DiningDishImage {
  src: string;
  alt: string;
  title: string;
  category: string;
}

export const diningGalleryImages: DiningDishImage[] = [
  {
    src: '/dining/fishthali.jpeg',
    alt: 'Authentic Konkan Fish Thali with Surmai, Pomfret, coastal fish curry, steamed rice, and Solkadhi at Malhar Baug Resort Alibaug',
    title: 'Fish Thali',
    category: 'Seafood',
  },
  {
    src: '/dining/vegthali.jpeg',
    alt: 'Special Maharashtrian Veg Thali with fresh seasonal vegetables, dal, rice, hot chapatis, and sweet at Malhar Baug Resort',
    title: 'Veg Thali',
    category: 'Thali',
  },
  {
    src: '/dining/chickensukha.jpeg',
    alt: 'Authentic coastal Chicken Sukha cooked in roasted coconut and aromatic spices at Malhar Baug Resort',
    title: 'Chicken Sukha',
    category: 'Non-Vegetarian',
  },
  {
    src: '/dining/chana koliwada.jpeg',
    alt: 'Crispy spicy Chana Koliwada starter served fresh at Malhar Baug garden restaurant',
    title: 'Chana Koliwada',
    category: 'Snacks',
  },
  {
    src: '/dining/Kanda& Bhaji.jpeg',
    alt: 'Crispy hot golden Kanda Bhaji (onion pakoda) served fresh with chutney at Malhar Baug Resort garden restaurant',
    title: 'Kanda Bhaji',
    category: 'Snacks',
  },
  {
    src: '/dining/potatopakoda.jpeg',
    alt: 'Crispy golden Batata Bhaji (Aloo Bhajiya) served hot with spicy mint and tamarind chutneys',
    title: 'Batata Bhaji',
    category: 'Snacks',
  },
  {
    src: '/dining/Crispy Starters & Snacks.jpeg',
    alt: 'Crispy hot starters and evening snacks served at Malhar Baug garden restaurant',
    title: 'Crispy Starters & Snacks',
    category: 'Snacks',
  },
  {
    src: '/dining/Poha.jpeg',
    alt: 'Freshly prepared traditional Maharashtrian Kanda Poha garnished with fresh coriander, roasted peanuts, and lemon at Malhar Baug Resort',
    title: 'Kanda Poha',
    category: 'Breakfast',
  },
  {
    src: '/dining/misalpaw.png',
    alt: 'Authentic spicy Maharashtrian Misal Pav served with fresh pav, farsan, chopped onions, and lemon at Malhar Baug Resort',
    title: 'Misal Pav',
    category: 'Breakfast',
  },
  {
    src: '/dining/Anda Bhurji and Pav.jpeg',
    alt: 'Authentic spiced Maharashtrian Anda Bhurji served with hot buttered pav, chopped onions, and lemon at Malhar Baug Resort',
    title: 'Anda Bhurji & Pav',
    category: 'Breakfast',
  },
  {
    src: '/dining/upma.jpeg',
    alt: 'Freshly prepared traditional South Indian and Maharashtrian Upma with curry leaves and mustard seeds',
    title: 'Upma',
    category: 'Breakfast',
  },
  {
    src: '/dininghero2.jpeg',
    alt: 'Garden restaurant seating and dining ambiance at Malhar Baug Resort Alibaug',
    title: 'Restaurant & Dining Lawn',
    category: 'Ambiance',
  },
];

export const menuCategories: MenuCategory[] = [
  // ── BREAKFAST ─────────────────────────────────────────────────────────────
  {
    title: 'Breakfast',
    icon: 'solar:cup-hot-bold',
    sections: [
      {
        heading: 'Breakfast',
        items: [
          { name: 'Poha', price: 70 },
          { name: 'Upma', price: 70 },
          { name: 'Sweet Sheera', price: 100 },
          { name: 'Misal Pav', price: 120 },
          { name: 'Usal Pav', price: 100 },
          { name: 'Bhurji Pav', price: 100 },
          { name: 'Omlet Pav', price: 100 },
          { name: 'Half Fry Omlet', price: 80 },
          { name: 'Boil Egg', price: 100 },
          { name: 'Onion Bhaji', price: 80 },
          { name: 'Potato Bhaji', price: 80 },
          { name: 'Bread Butter', price: 50 },
          { name: 'Bread Jam', price: 50 },
          { name: 'Masala Maggi', price: 80 },
          { name: 'Vegetable Maggi', price: 100 },
        ],
      },
    ],
  },

  // ── LUNCH ─────────────────────────────────────────────────────────────────
  {
    title: 'Lunch',
    icon: 'solar:sun-bold',
    sections: [
      {
        heading: 'Veg Thali',
        items: [
          { name: 'Veg Thali', price: 250 },
          { name: 'Paneer Thali', price: 350 },
          { name: 'Veg Kolhapuri Thali', price: 350 },
        ],
      },
      {
        heading: 'Non-Veg Thali',
        items: [
          { name: 'Chicken Thali' },
          { name: 'Egg Thali' },
          { name: 'Prawns Thali' },
          { name: 'Surmai Thali' },
          { name: 'Pomfret Thali' },
          { name: 'Bangada Thali' },
          { name: 'Bombil Thali' },
          { name: 'Crab Thali' },
        ],
      },
    ],
  },

  // ── DINNER ────────────────────────────────────────────────────────────────
  {
    title: 'Dinner',
    icon: 'solar:moon-bold',
    sections: [
      {
        heading: 'Veg Thali',
        items: [
          { name: 'Veg Thali', price: 250 },
          { name: 'Paneer Thali', price: 350 },
          { name: 'Veg Kolhapuri Thali', price: 350 },
        ],
      },
      {
        heading: 'Non-Veg Thali',
        items: [
          { name: 'Chicken Thali' },
          { name: 'Egg Thali' },
          { name: 'Prawns Thali' },
          { name: 'Surmai Thali' },
          { name: 'Pomfret Thali' },
          { name: 'Bangada Thali' },
          { name: 'Bombil Thali' },
          { name: 'Crab Thali' },
        ],
      },
      {
        heading: 'Rice',
        items: [
          { name: 'Steam Rice', price: 80 },
          { name: 'Jeera Rice', price: '100–140' },
          { name: 'Dal Khichdi', price: 200 },
          { name: 'Dal Khichdi Tadka', price: 230 },
          { name: 'Veg Biryani', price: 300 },
          { name: 'Paneer Biryani', price: 400 },
          { name: 'Veg Pulav', price: 300 },
          { name: 'Bundi Raita', price: 60 },
        ],
      },
      {
        heading: 'Fasting Menu',
        items: [
          { name: 'Sabudana Khichadi', price: 100 },
          { name: 'Sabudana Wada', price: 100 },
          { name: 'French Fries', price: 100 },
          { name: 'French Fries Peri Peri', price: 150 },
          { name: 'Curd Rice', price: 90 },
          { name: 'Modak', price: 25 },
        ],
      },
    ],
  },

  // ── SNACKS & STARTERS ─────────────────────────────────────────────────────
  {
    title: 'Snacks & Starters',
    icon: 'solar:dish-bold',
    sections: [
      {
        heading: 'Veg Starters',
        items: [
          { name: 'Green Salad', price: 100 },
          { name: 'Tomato Onion Salad', price: 80 },
          { name: 'Fry Papad', price: 40 },
          { name: 'Roasted Papad', price: 40 },
          { name: 'Masala Papad', price: 70 },
          { name: 'Cheese Pakoda', price: 250 },
          { name: 'Paneer Pakoda', price: 250 },
          { name: 'Paneer Chilly', price: 250 },
          { name: 'Veg Chilly', price: 250 },
          { name: 'Veg Manchurian', price: 250 },
          { name: 'Paneer 65', price: 250 },
          { name: 'Chinese Bhel', price: 150 },
        ],
      },
      {
        heading: 'Non-Veg Starters',
        items: [
          { name: 'Chiken Chilly', price: 250 },
          { name: 'Chicken Crispy', price: 250 },
          { name: 'Chicken 65', price: 250 },
          { name: 'Chicken Lollipop', price: 280 },
          { name: 'Chicken Lollipop Sukha', price: 500 },
          { name: 'Chicken Sukha', price: 400 },
          { name: 'Chicken Pakoda (Bone)', price: 250 },
          { name: 'Chicken Pakoda (Boneless)', price: 300 },
          { name: 'Chicken Manchurian', price: 250 },
          { name: 'Chicken Tawa Fry (Boneless)', price: 400 },
          { name: 'Chicken Koliwada', price: 250 },
          { name: 'Boil Egg Tawa Fry', price: 120 },
          { name: 'Egg Chilly', price: 250 },
        ],
      },
      {
        heading: 'Fish Starters (Seasonable)',
        items: [
          { name: 'Prawns Fry' },
          { name: 'Surmai Fry' },
          { name: 'Pomfret Fry' },
          { name: 'Bangada Fry' },
          { name: 'Bombli Fry' },
          { name: 'Sukhat Fry' },
          { name: 'Fish Platter', price: 1999 },
        ],
      },
    ],
  },

  // ── NON-VEGETARIAN ────────────────────────────────────────────────────────
  {
    title: 'Non-Vegetarian',
    icon: 'solar:bowl-spoon-bold',
    sections: [
      {
        heading: 'Main Course – Non-Veg',
        items: [
          { name: 'Chicken Masala', price: 250 },
          { name: 'Chicken Kadhai', price: 280 },
          { name: 'Butter Chicken Masala', price: 300 },
          { name: 'Chicken Curry', price: 180 },
          { name: 'Chicken Khima', price: 200 },
          { name: 'Egg Masala', price: 200 },
          { name: 'Egg Curry', price: 180 },
          { name: 'Egg Handi', price: 400 },
          { name: 'Chicken Handi', price: 600 },
          { name: 'Chi Malvani Handi', price: 600 },
          { name: 'Chicken Agri Handi', price: 600 },
        ],
      },
    ],
  },

  // ── SEAFOOD SPECIALS ──────────────────────────────────────────────────────
  {
    title: 'Seafood Specials',
    icon: 'solar:water-bold',
    sections: [
      {
        heading: 'Seasonable – Seafood',
        items: [
          { name: 'Prawns Curry / Masala' },
          { name: 'Promfret Curry / Masala' },
          { name: 'Surmai Curry / Masala' },
          { name: 'Bangada Curry / Masala' },
          { name: 'Bombil Curry / Masala' },
          { name: 'Crab Curry / Masala' },
          { name: 'Kalve Fry / Masala' },
        ],
      },
      {
        heading: 'Non-Veg Thali',
        items: [
          { name: 'Chicken Thali' },
          { name: 'Egg Thali' },
          { name: 'Prawns Thali' },
          { name: 'Surmai Thali' },
          { name: 'Pomfret Thali' },
          { name: 'Bangada Thali' },
          { name: 'Bombil Thali' },
          { name: 'Crab Thali' },
        ],
      },
    ],
  },

  // ── VEGETARIAN ────────────────────────────────────────────────────────────
  {
    title: 'Vegetarian',
    icon: 'solar:leaf-bold',
    sections: [
      {
        heading: 'Veg Main Course',
        items: [
          { name: 'Paneer Masala', price: 280 },
          { name: 'Paneer Kolhapuri', price: 220 },
          { name: 'Paneer Tikka Masala', price: 300 },
          { name: 'Paneer Handi', price: 400 },
          { name: 'Paneer Burji', price: 220 },
          { name: 'Mix Veg', price: 150 },
          { name: 'Mix Veg Handi', price: 300 },
          { name: 'Veg Kolhapuri', price: 200 },
          { name: 'Aloo Mutter', price: 160 },
          { name: 'Aloo Jeera', price: 120 },
          { name: 'Chole Masala', price: 180 },
          { name: 'Kaju Masala', price: 300 },
          { name: 'Baingan Masala', price: 220 },
          { name: 'Mushroom Masala', price: 350 },
          { name: 'Dal Fry', price: 100 },
          { name: 'Dal Tadka', price: 150 },
        ],
      },
      {
        heading: 'Veg Thali',
        items: [
          { name: 'Veg Thali', price: 250 },
          { name: 'Paneer Thali', price: 350 },
          { name: 'Veg Kolhapuri Thali', price: 350 },
        ],
      },
    ],
  },

  // ── CHINESE ───────────────────────────────────────────────────────────────
  {
    title: 'Chinese',
    icon: 'solar:noodles-bold',
    sections: [
      {
        heading: 'Main Course – Chinese',
        items: [
          { name: 'Chicken Fried Rice', price: 220 },
        ],
      },
      {
        heading: 'Veg Chinese Starters',
        items: [
          { name: 'Veg Manchurian', price: 250 },
          { name: 'Veg Chilly', price: 250 },
          { name: 'Chinese Bhel', price: 150 },
          { name: 'Paneer Chilly', price: 250 },
        ],
      },
      {
        heading: 'Non-Veg Chinese Starters',
        items: [
          { name: 'Chicken Manchurian', price: 250 },
          { name: 'Chiken Chilly', price: 250 },
        ],
      },
    ],
  },

  // ── BEVERAGES ─────────────────────────────────────────────────────────────
  {
    title: 'Beverages',
    icon: 'solar:cup-bold',
    sections: [
      {
        heading: 'Beverages',
        items: [
          { name: 'Tea', price: 20 },
          { name: 'Black Tea', price: 15 },
          { name: 'Coffee', price: 30 },
          { name: 'Black Coffee', price: 25 },
          { name: 'Green Tea', price: 60 },
          { name: 'Lemon Tea', price: 40 },
          { name: 'Milk', price: 50 },
          { name: 'Mineral Water', price: 20 },
          { name: 'Lemon Water', price: 40 },
          { name: 'Thumps Up', price: 50 },
          { name: 'Sprite', price: 50 },
          { name: 'Soda', price: 35 },
          { name: 'Maaza', price: 50 },
          { name: 'Butter Milk', price: 50 },
          { name: 'Solkadi', price: 70 },
        ],
      },
    ],
  },

  // ── DESSERTS ──────────────────────────────────────────────────────────────
  {
    title: 'Desserts',
    icon: 'solar:ice-cream-bold',
    sections: [
      {
        heading: 'Fasting & Sweet',
        items: [
          { name: 'Modak', price: 25 },
          { name: 'Curd Rice', price: 90 },
          { name: 'Sabudana Khichadi', price: 100 },
          { name: 'Sweet Sheera', price: 100 },
        ],
      },
    ],
  },
];

export const diningDescription =
  'Experience authentic Maharashtrian flavors along with coastal seafood and multi-cuisine specialties prepared using fresh, locally sourced ingredients. Our garden restaurant offers freshly prepared Fish Thali, Veg Thali, Chicken Sukha, Kanda Poha, Misal Pav, Anda Bhurji & Pav, Chana Koliwada, Kanda Bhaji, Batata Bhaji, Upma, and seasonal coastal delicacies that celebrate the rich culinary culture of Alibaug and Konkan.';
