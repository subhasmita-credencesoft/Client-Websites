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
    src: '/dining/kanda bhaji.jpeg',
    alt: 'Crispy hot golden Kanda Bhaji (onion pakoda) served fresh at Malhar Baug Resort garden restaurant',
    title: 'Kanda Bhaji',
    category: 'Snacks',
  },
  {
    src: '/dining/potatopakoda.jpeg',
    alt: 'Crispy golden Potato Pakoda (Aloo Bhajiya) served hot with spicy mint and tamarind chutneys',
    title: 'Potato Pakoda',
    category: 'Snacks',
  },
  {
    src: '/dining/Crispy Starters & Snacks.jpeg',
    alt: 'Crispy hot starters and evening snacks served at Malhar Baug garden restaurant',
    title: 'Crispy Starters & Snacks',
    category: 'Snacks',
  },
  {
    src: '/dining/upma.jpeg',
    alt: 'Freshly prepared traditional South Indian and Maharashtrian Upma with curry leaves and mustard seeds',
    title: 'Upma',
    category: 'Breakfast',
  },
  {
    src: '/dining/misalpaw.png',
    alt: 'Authentic spicy Maharashtrian Misal Pav served with fresh pav, farsan, chopped onions, and lemon at Malhar Baug Resort',
    title: 'Misal Pav',
    category: 'Breakfast',
  },
  {
    src: '/dininghero2.jpeg',
    alt: 'Garden restaurant seating and dining ambiance at Malhar Baug Resort Alibaug',
    title: 'Restaurant & Dining Lawn',
    category: 'Ambiance',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-30 at 3.51.18 PM (1).jpeg',
    alt: 'Serene garden restaurant ambiance at Malhar Baug Resort Alibaug',
    title: 'Garden Dining Ambiance',
    category: 'Ambiance',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-30 at 3.51.18 PM (2).jpeg',
    alt: 'Fresh morning breakfast and buffet spread at Malhar Baug Resort',
    title: 'Breakfast & Dining Setup',
    category: 'Breakfast',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-30 at 3.51.19 PM.jpeg',
    alt: 'Evening dinner table and food spread at Malhar Baug garden restaurant',
    title: 'Evening Garden Dinner',
    category: 'Dinner',
  },
];

export const menuCategories: MenuCategory[] = [
  {
    title: 'Breakfast',
    items: ['Misal Pav', 'Upma', 'Poha', 'Idli-Sambar', 'Aloo Paratha', 'Masala Dosa', 'Bread Omelette', 'Cereal & Fruits', 'Tea & Coffee'],
  },
  {
    title: 'Lunch',
    items: ['Fish Thali', 'Veg Thali', 'Chicken Thali', 'Chicken Sukha', 'Dal Khichdi', 'Paneer Butter Masala', 'Steamed Rice', 'Roti/Naan'],
  },
  {
    title: 'Dinner',
    items: ['Special Fish Thali', 'Special Veg Thali', 'Chicken Sukha & Curry', 'Mutton Curry', 'Veg Biryani', 'Chicken Biryani', 'Dal Tadka', 'Salad'],
  },
  {
    title: 'Snacks & Starters',
    items: ['Misal Pav', 'Chana Koliwada', 'Kanda Bhaji', 'Potato Pakoda', 'Crispy Starters & Snacks', 'Samosa', 'Vada Pav', 'French Fries', 'Sandwich'],
  },
  {
    title: 'Non-Vegetarian',
    items: ['Chicken Sukha', 'Chicken Kolhapuri', 'Egg Curry', 'Fish Fry', 'Prawn Curry', 'Chicken Tandoori', 'Mutton Sukka', 'Bombil Fry'],
  },
  {
    title: 'Seafood Specials',
    items: ['Fish Thali (Surmai / Pomfret)', 'Prawns Koliwada', 'Bombil Rawa Fry', 'Crab Masala', 'Fish Curry', 'Prawns Biryani', 'Lobster (Seasonal)', 'Solkadhi'],
  },
  {
    title: 'Vegetarian',
    items: ['Veg Thali', 'Chana Koliwada', 'Veg Kolhapuri', 'Bhindi Masala', 'Baingan Bharta', 'Mushroom Masala', 'Aloo Gobi', 'Dal Fry'],
  },
  {
    title: 'Chinese',
    items: ['Veg Manchurian', 'Chicken Manchurian', 'Fried Rice', 'Noodles', 'Chilli Chicken', 'Gobi Manchurian', 'Schezwan Rice', 'Spring Rolls'],
  },
  {
    title: 'Beverages',
    items: ['Solkadhi', 'Fresh Lime Soda', 'Buttermilk', 'Lassi', 'Cold Drinks', 'Fresh Juice', 'Coconut Water', 'Tea & Coffee'],
  },
  {
    title: 'Desserts',
    items: ['Gulab Jamun', 'Shrikhand', 'Ice Cream', 'Kheer', 'Fruit Salad', 'Basundi', 'Modak (Seasonal)', 'Halwa'],
  },
];

export const diningDescription =
  'Experience authentic Maharashtrian flavors along with coastal seafood and multi-cuisine specialties prepared using fresh, locally sourced ingredients. Our garden restaurant offers freshly prepared Fish Thali, Veg Thali, Chicken Sukha, Misal Pav, Chana Koliwada, Kanda Bhaji, Potato Pakoda, Upma, and seasonal coastal delicacies that celebrate the rich culinary culture of Alibaug and Konkan.';
