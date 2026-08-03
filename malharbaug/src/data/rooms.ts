import { Room } from '@/types';

export const rooms: Room[] = [
  {
    id: 'luxury-deluxe',
    title: 'Luxury Deluxe Room',
    slug: 'luxury-deluxe',
    tagline: 'Ideal for couples and small families',
    description:
      'Experience comfort and elegance in our Luxury Deluxe Rooms. Designed with modern interiors and warm tones, each room offers a king-sized bed, premium bathroom, smart TV, high-speed WiFi, and a beautiful garden view. Perfect for couples seeking a romantic getaway or small families looking for a cozy retreat.',
    price: '₹4,500/night',
    capacity: '2 Adults + 1 Child',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800',
    ],
    amenities: [
      'King Bed',
      'Air Conditioning',
      'Smart TV',
      'High-Speed WiFi',
      'Premium Bathroom',
      'Garden View',
      'Room Service',
      'Tea/Coffee Maker',
      'Mini Fridge',
      'In-room Safe',
    ],
  },
  {
    id: 'family-suite',
    title: 'Family Suite',
    slug: 'family-suite',
    tagline: 'Perfect for larger families',
    description:
      'Our Family Suites offer generous space with multiple beds, a large living area, and a private balcony overlooking the lush gardens. Equipped with modern amenities including air conditioning, smart TV, and a modern bathroom, these suites provide the perfect home away from home for families vacationing together.',
    price: '₹7,500/night',
    capacity: '4 Adults + 2 Children',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800',
    ],
    amenities: [
      'Multiple Beds',
      'Large Living Area',
      'Air Conditioning',
      'Modern Bathroom',
      'Balcony',
      'Smart TV',
      'Wardrobe',
      'Mini Bar',
      'Sitting Area',
      'Room Service',
    ],
  },
  {
    id: 'private-villa',
    title: 'Private Villa',
    slug: 'private-villa',
    tagline: 'Best for celebrations and group vacations',
    description:
      'Our Private Villas offer the ultimate luxury experience with multiple bedrooms, a private living room, dining area, and direct garden access. Featuring premium interiors, spacious bathrooms, and exclusive amenities, the villa is perfect for group getaways, family reunions, and special celebrations.',
    price: '₹15,000/night',
    capacity: '8 Adults + 4 Children',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    ],
    amenities: [
      'Multiple Bedrooms',
      'Private Living Room',
      'Dining Area',
      'Garden Access',
      'Premium Interiors',
      'Spacious Bathrooms',
      'Private Terrace',
      'Outdoor Seating',
      'Personal Butler',
      'VIP Amenities',
    ],
  },
];

export const roomAmenitiesList = [
  { icon: 'solar:bed-bold', title: 'King Bed', description: 'Premium comfort bedding' },
  { icon: 'solar:snowflake-bold', title: 'Air Conditioning', description: 'Individual room control' },
  { icon: 'solar:tv-bold', title: 'Smart TV', description: 'Entertainment on demand' },
  { icon: 'solar:wi-fi-router-bold', title: 'Free WiFi', description: 'High-speed internet' },
  { icon: 'solar:bath-bold', title: 'Premium Bathroom', description: 'Modern fixtures & toiletries' },
  { icon: 'solar:leaf-bold', title: 'Garden View', description: 'Scenic natural views' },
  { icon: 'solar:bell-bold', title: 'Room Service', description: '24x7 assistance' },
  { icon: 'solar:cup-hot-bold', title: 'Tea/Coffee', description: 'In-room refreshments' },
];
