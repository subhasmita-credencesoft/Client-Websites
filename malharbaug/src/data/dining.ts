import { MenuCategory } from '@/types';

export interface DiningDishImage {
  src: string;
  alt: string;
  title: string;
  category: string;
}

export const diningGalleryImages: DiningDishImage[] = [
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 10.07.16 AM.jpeg',
    alt: 'Authentic Maharashtrian Konkan thali with fresh coastal specialties at Malhar Baug Resort Alibaug',
    title: 'Authentic Konkan Thali',
    category: 'Thali',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 10.07.17 AM.jpeg',
    alt: 'Freshly prepared coastal seafood dish at Malhar Baug Resort restaurant Alibaug',
    title: 'Coastal Seafood Special',
    category: 'Seafood',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 10.07.18 AM (1).jpeg',
    alt: 'Traditional Alibaug fish fry seasoned with local Konkan spices',
    title: 'Crispy Fish Fry',
    category: 'Seafood',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 10.07.18 AM.jpeg',
    alt: 'Home-style Indian vegetable curry with aromatic rice at Malhar Baug Resort',
    title: 'Home-Style Veg Delicacy',
    category: 'Vegetarian',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 10.07.19 AM.jpeg',
    alt: 'Special non-vegetarian chicken preparation cooked in traditional coastal gravy',
    title: 'Chicken Sukka & Curry',
    category: 'Non-Vegetarian',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 10.07.21 AM (1).jpeg',
    alt: 'Crispy hot starters served fresh at Malhar Baug garden restaurant',
    title: 'Crispy Starters & Snacks',
    category: 'Snacks',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 10.07.21 AM.jpeg',
    alt: 'Tandoori and starter delicacies at Malhar Baug Resort restaurant',
    title: 'Tandoori & Starters',
    category: 'Starters',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 10.07.22 AM.jpeg',
    alt: 'Complete family dinner spread at Malhar Baug Resort restaurant near Nagaon Beach',
    title: 'Family Feast Spread',
    category: 'Dinner',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-29 at 7.23.06 PM.jpeg',
    alt: 'Evening dinner table and food spread at Malhar Baug garden restaurant',
    title: 'Evening Garden Dinner',
    category: 'Dinner',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-30 at 3.51.18 PM (1).jpeg',
    alt: 'Fresh morning breakfast spread with tea at Malhar Baug Resort Alibaug',
    title: 'Morning Breakfast Spread',
    category: 'Breakfast',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-30 at 3.51.18 PM (2).jpeg',
    alt: 'Traditional Konkan breakfast specialties prepared fresh every morning',
    title: 'Fresh Konkan Breakfast',
    category: 'Breakfast',
  },
  {
    src: '/dining/WhatsApp Image 2026-10-30 at 3.51.19 PM.jpeg',
    alt: 'Refreshing local drinks and dessert accompaniment at Malhar Baug Resort',
    title: 'Special Refreshments & Sweets',
    category: 'Beverages',
  },
];

export const menuCategories: MenuCategory[] = [
  {
    title: 'Breakfast',
    items: ['Poha', 'Upma', 'Idli-Sambar', 'Aloo Paratha', 'Masala Dosa', 'Bread Omelette', 'Cereal & Fruits', 'Tea & Coffee'],
  },
  {
    title: 'Lunch',
    items: ['Vegetable Thali', 'Chicken Thali', 'Fish Thali', 'Dal Khichdi', 'Paneer Butter Masala', 'Chicken Curry', 'Steamed Rice', 'Roti/Naan'],
  },
  {
    title: 'Dinner',
    items: ['Special Veg Thali', 'Special Non-Veg Thali', 'Seafood Special', 'Mutton Curry', 'Veg Biryani', 'Chicken Biryani', 'Dal Tadka', ' Salad'],
  },
  {
    title: 'Vegetarian',
    items: ['Veg Kolhapuri', 'Bhindi Masala', 'Baingan Bharta', 'Mushroom Masala', 'Aloo Gobi', 'Mix Veg', 'Dal Fry', 'Veg Pulao'],
  },
  {
    title: 'Non-Vegetarian',
    items: ['Chicken Kolhapuri', 'Egg Curry', 'Fish Fry', 'Prawn Curry', 'Chicken Tandoori', 'Mutton Sukka', 'Bombil Fry', 'Sukka Chicken'],
  },
  {
    title: 'Seafood',
    items: ['Suranam Fry', 'Prawns Koliwada', 'Bombil Rawa Fry', 'Crab Masala', 'Fish Curry', 'Prawns Biryani', 'Lobster (Seasonal)', 'Clam Sukka'],
  },
  {
    title: 'Chinese',
    items: ['Veg Manchurian', 'Chicken Manchurian', 'Fried Rice', 'Noodles', 'Chilli Chicken', 'Gobi Manchurian', 'Schezwan Rice', 'Spring Rolls'],
  },
  {
    title: 'Snacks',
    items: ['Samosa', 'Vada Pav', 'Bhel Puri', 'Pani Puri', 'French Fries', 'Onion Rings', 'Sandwich', 'Pakoras'],
  },
  {
    title: 'Beverages',
    items: ['Fresh Lime Soda', 'Buttermilk', 'Lassi', 'Cold Drinks', 'Fresh Juice', 'Coconut Water', 'Tea', 'Coffee'],
  },
  {
    title: 'Desserts',
    items: ['Gulab Jamun', 'Shrikhand', 'Ice Cream', 'Kheer', 'Fruit Salad', 'Basundi', 'Modak (Seasonal)', 'Halwa'],
  },
];

export const diningDescription =
  'Experience authentic Maharashtrian flavors along with Indian and seasonal specialties prepared using fresh, locally sourced ingredients. Our multi-cuisine restaurant offers a delightful culinary journey with a menu that celebrates the rich food culture of the Konkan region alongside popular Indian and Chinese dishes.';
