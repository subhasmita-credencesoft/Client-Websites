const img = (name) => `/hotel-ramahindustani-image/${name}`

export const contactDetails = {
  id: 3529,
  name: 'Hotel Rama Hindustani',
  tagline: 'Where Comfort Meets Tradition',
  shortDescription: 'Experience comfort, affordability, and warm Indian hospitality in the heart of Jaipur.',
  address: 'Indian Bank, 34-B1-B2, Haldighati Marg, Tonk Rd, Sector 5, Pratap Nagar, Jaipur, Rajasthan 302033',
  phone: '+91 63767 07091',
  email: 'hotelramahindustani@gmail.com',
  whatsApp: '+91 63767 07091',
  manager: 'Saurabh Kumar Thakuriya',
  addressParts: {
    country: 'India',
    streetNumber: '34-B1-B2',
    streetName: 'Haldighati Marg',
    locality: 'Pratap Nagar',
    city: 'Jaipur',
  },
}

export const bookingRoomOptions = [
  'Economy Double Room',
  'Standard Double Room',
  'Deluxe Room',
  'Superior Double Room',
]

export const hotelImages = {
  front: img('hotel-rama-hindustani-jaipur-front-pic-4.avif'),
  frontJpg: img('hotel-rama-hindustani-jaipur-front-pic-4.jpg'),
  frontAlt: img('hotel-rama-hindustani-jaipur-front-pic-4.avif'),
  reception: img('hotel-rama-hindustani-jaipur-reception-pic-14.jpg'),
  restaurant: img('hotel-rama-hindustani-jaipur-restaurant-pic-17.jpg'),
  standardRoom: img('hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg'),
  deluxeRoom: img('hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg'),
  superiorRoom: img('super-deluxe-room-with-fridge.jpg'),
  economyRoom: img('hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg'),
  bathroom: img('hotel-rama-hindustani-jaipur-bathroom-pic-45.jpg'),
  rooftop: img('hotel-rama-hindustani-jaipur-roof-top-for-events-pic-19.jpg'),
  liftLobby: img('hotel-rama-hindustani-jaipur-galary-lift-pic-24.jpg'),
  gym: img('hotel-rama-hindustani-jaipur-gym-pic-12.jpg'),
  funZone: img('fun-zone1.jpg'),
  funZoneAlt: img('fun-zone2.jpg'),
  exteriorWide: img('hotel-rama-hindustani-and-rama-rasoi-front-2.jpg'),
  exteriorFront: img('hotel-rama-hindustani-front-3.jpg'),
  receptionArea: img('hotel-rama-hindustani-reception-area-1.jpg'),
}

export const experiences = [
  {
    id: 1,
    title: 'Luxury Rooms',
    description: 'Elegantly designed spaces with modern amenities for a restful stay.',
    icon: 'Bed',
    gradient: 'from-amber-100/40 to-yellow-50/40',
  },
  {
    id: 2,
    title: 'Traditional Dining',
    description: 'Authentic Indian cuisine crafted with time-honored recipes and fresh ingredients.',
    icon: 'UtensilsCrossed',
    gradient: 'from-orange-100/40 to-red-50/40',
  },
  {
    id: 3,
    title: 'Cultural Experiences',
    description: 'Immerse yourself in the vibrant arts, crafts, and traditions of Rajasthan.',
    icon: 'Palette',
    gradient: 'from-purple-100/40 to-pink-50/40',
  },
  {
    id: 4,
    title: 'Wellness & Relaxation',
    description: 'Rejuvenate with our gym facilities and peaceful atmosphere.',
    icon: 'Sparkles',
    gradient: 'from-emerald-100/40 to-teal-50/40',
  },
  {
    id: 5,
    title: 'Events & Celebrations',
    description: 'Host memorable gatherings on our beautiful rooftop venue.',
    icon: 'PartyPopper',
    gradient: 'from-blue-100/40 to-indigo-50/40',
  },
  {
    id: 6,
    title: 'Personalized Service',
    description: 'Dedicated staff ensuring every moment of your stay is exceptional.',
    icon: 'Heart',
    gradient: 'from-rose-100/40 to-red-50/40',
  },
]

export const galleryImages = [
  { src: img('hotel-rama-hindustani-front-3.jpg'), alt: 'Hotel Rama Hindustani exterior front view in Pratap Nagar Jaipur', category: 'Exterior' },
  { src: img('hotel-rama-hindustani-jaipur-front-pic-4.avif'), alt: 'Hotel Rama Hindustani main entrance and facade', category: 'Exterior' },
  { src: img('hotel-rama-hindustani-reception-area-1.jpg'), alt: 'Hotel Rama Hindustani reception area with seating', category: 'Interior' },
  { src: img('hotel-rama-hindustani-jaipur-reception-pic-14.jpg'), alt: 'Hotel Rama Hindustani lobby and reception desk', category: 'Interior' },
  { src: img('hotel-rama-hindustani-jaipur-restaurant-pic-17.jpg'), alt: 'Rama Rasoi vegetarian restaurant at Hotel Rama Hindustani', category: 'Dining' },
  { src: img('hotel-rama-hindustani-jaipur-roof-top-for-events-pic-19.jpg'), alt: 'Hotel Rama Hindustani rooftop venue for events and celebrations', category: 'Events' },
  { src: img('hotel-rama-hindustani-jaipur-galary-lift-pic-24.jpg'), alt: 'Hotel Rama Hindustani lift lobby interior', category: 'Interior' },
  { src: img('hotel-rama-hindustani-jaipur-galary-pic-27.jpg'), alt: 'Hotel Rama Hindustani interior gallery corridor', category: 'Interior' },
  { src: img('hotel-rama-hindustani-jaipur-gym-pic-12.jpg'), alt: 'Hotel Rama Hindustani gym and fitness facility', category: 'Amenities' },
  { src: img('fun-zone1.jpg'), alt: 'Hotel Rama Hindustani fun zone and games area for children', category: 'Amenities' },
  { src: img('fun-zone2.jpg'), alt: 'Hotel Rama Hindustani indoor fun zone and recreation area', category: 'Amenities' },
  { src: img('fun-zone3.jpg'), alt: 'Hotel Rama Hindustani kids play area and activity zone', category: 'Amenities' },
  { src: img('fun-zone4.jpg'), alt: 'Hotel Rama Hindustani game room and entertainment area', category: 'Amenities' },
  { src: img('hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg'), alt: 'Hotel Rama Hindustani economy double room interior', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-economy-room-pic-37.jpg'), alt: 'Hotel Rama Hindustani economy room with bed and amenities', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-economy-room-pic-42.jpg'), alt: 'Hotel Rama Hindustani budget double room view', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg'), alt: 'Hotel Rama Hindustani standard double room interior', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-standard-room-pic-46.jpg'), alt: 'Hotel Rama Hindustani standard room with modern furnishings', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg'), alt: 'Hotel Rama Hindustani deluxe room with premium bedding', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-delux-room-pic-41.jpg'), alt: 'Hotel Rama Hindustani deluxe room interior view', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-deluxe-room-pic-40.jpg'), alt: 'Hotel Rama Hindustani spacious deluxe room', category: 'Rooms' },
  { src: img('super-deluxe-room-with-fridge.jpg'), alt: 'Hotel Rama Hindustani superior double room with mini fridge', category: 'Rooms' },
  { src: img('super-delux-room-with-fridge-1.jpg'), alt: 'Hotel Rama Hindustani superior room interior with refrigerator', category: 'Rooms' },
  { src: img('super-deluxe-room-with-fridge-2.jpg'), alt: 'Hotel Rama Hindustani superior double room with modern amenities', category: 'Rooms' },
  { src: img('super-deluxe-room-with-fridge-4.jpg'), alt: 'Hotel Rama Hindustani premium superior room with fridge', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-bathroom-pic-44.jpg'), alt: 'Hotel Rama Hindustani bathroom with modern fixtures', category: 'Rooms' },
  { src: img('hotel-rama-hindustani-jaipur-bathroom-pic-45.jpg'), alt: 'Hotel Rama Hindustani clean and modern bathroom', category: 'Rooms' },
]

export const homepageHighlights = [
  'Comfortable & Spacious Rooms',
  'Free Wi-Fi',
  '24/7 Front Desk',
  'Family-Friendly Stay',
  'Affordable Pricing',
]

function roomSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export const rooms = [
  {
    id: 8602,
    slug: roomSlug('Economy Double Room'),
    name: 'Economy Double Room',
    image: img('hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg'),
    gallery: [
      img('hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg'),
      img('hotel-rama-hindustani-jaipur-economy-room-pic-37.jpg'),
      img('hotel-rama-hindustani-jaipur-economy-room-pic-42.jpg'),
    ],
    description: 'Our Economy Double Room is the perfect choice for budget-conscious travelers seeking a clean, comfortable, and affordable stay in Jaipur. This cozy room comfortably accommodates 2 guests and comes equipped with all the essentials — free high-speed WiFi, a flat-screen TV with satellite channels, air conditioning, a geyser for hot water, and 24/7 room service. The room features comfortable bedding, fresh linens, and attached bathroom with modern fixtures. Located in Pratap Nagar, just 3 km from Sanganer Railway Station and 5 km from Jaipur International Airport, this room offers excellent connectivity to major tourist attractions like Hawa Mahal, City Palace, and Amber Fort. Whether you are visiting Jaipur for business, pilgrimage, or leisure, the Economy Double Room provides a peaceful retreat after a day of exploration. Complimentary parking and power backup are included. Perfect for solo travelers, couples, and small families looking for a value-for-money hotel near Pratap Nagar Jaipur.',
    features: ['WiFi', 'Flat TV', 'Room Service', 'Geyser', 'AC'],
    price: '1,155',
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 2,
  },
  {
    id: 8603,
    slug: roomSlug('Standard Double Room'),
    name: 'Standard Double Room',
    image: img('hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg'),
    gallery: [
      img('hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg'),
      img('hotel-rama-hindustani-jaipur-standard-room-pic-46.jpg'),
    ],
    description: 'Our Standard Double Room offers a comfortable and well-appointed space designed for couples, families, and business travelers visiting Jaipur. This room accommodates 2 to 4 guests and features a plush double bed with premium linens, air conditioning, free WiFi, a flat-screen LED TV with cable channels, a geyser for instant hot water, and 24/7 room service. The room is thoughtfully designed with warm lighting, clean interiors, and an attached bathroom with modern fittings. Enjoy complimentary parking and uninterrupted power supply during your stay. Situated on Haldighati Marg in Pratap Nagar, the hotel is just minutes away from Jaipur International Airport (5 km), Sanganer Railway Station (3 km), and popular attractions including World Trade Park (6 km), Chokhi Dhani (8 km), and JECC Convention Centre (4 km). Our dedicated staff ensures a warm and personalized experience, making your Jaipur visit truly memorable. Ideal for weekend getaways, family vacations, and corporate stays in Jaipur.',
    features: ['WiFi', 'Flat TV', 'Room Service', 'Geyser', 'AC'],
    price: '1,365',
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 6,
  },
  {
    id: 8604,
    slug: roomSlug('Deluxe Room'),
    name: 'Deluxe Room',
    image: img('hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg'),
    gallery: [
      img('hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg'),
      img('hotel-rama-hindustani-jaipur-delux-room-pic-41.jpg'),
      img('hotel-rama-hindustani-jaipur-deluxe-room-pic-40.jpg'),
    ],
    description: 'Step into our Deluxe Room and experience an elevated level of comfort and sophistication in the heart of Jaipur. This spacious room accommodates 2 to 4 guests and features premium bedding with soft pillows and high-thread-count linens for a restful sleep. Enjoy free high-speed WiFi, a large flat-screen LED TV, air conditioning, a geyser, and 24/7 room service. The room boasts elegant interiors with modern decor, ample natural light, and an attached bathroom with premium fixtures and complimentary toiletries. Additional amenities include a work desk for business travelers, individual climate control, and blackout curtains for undisturbed rest. Located on Haldighati Marg in Pratap Nagar, the hotel provides easy access to Jaipur International Airport (5 km), Sanganer Railway Station (3 km), and major tourist destinations like Hawa Mahal, Nahargarh Fort, and Jal Mahal. Complimentary parking and power backup are included. The Deluxe Room is perfect for families, couples, and business professionals seeking a premium yet affordable hotel experience in Jaipur.',
    features: ['WiFi', 'Flat TV', 'Room Service', 'Geyser', 'AC', 'Premium Bedding'],
    price: '1,680',
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 4,
  },
  {
    id: 8605,
    slug: roomSlug('Superior Double Room'),
    name: 'Superior Double Room',
    image: img('super-deluxe-room-with-fridge.jpg'),
    gallery: [
      img('super-deluxe-room-with-fridge.jpg'),
      img('super-delux-room-with-fridge-1.jpg'),
      img('super-deluxe-room-with-fridge-2.jpg'),
      img('super-deluxe-room-with-fridge-4.jpg'),
    ],
    description: 'Our Superior Double Room is the crown jewel of Hotel Rama Hindustani, offering the ultimate in luxury and convenience for discerning travelers. This premium room accommodates 2 to 4 guests and features top-tier amenities including a personal mini refrigerator, premium bedding with luxury linens and pillows, free high-speed WiFi, a large flat-screen LED TV with cable channels, air conditioning, a geyser, and 24/7 room service. The room is elegantly designed with modern interiors, a spacious layout, elegant lighting, and an attached bathroom with premium fixtures, hot and cold water, and complimentary toiletries. Additional touches include a work desk, individual climate control, blackout curtains, ample wardrobe space, and a refreshment area with the mini fridge for your convenience. Located on Haldighati Marg in Pratap Nagar, just 5 km from Jaipur International Airport and 3 km from Sanganer Railway Station, this room offers unparalleled access to Jaipur\'s top attractions — Hawa Mahal, City Palace, Amber Fort, Nahargarh Fort, and World Trade Park. Complimentary parking, power backup, and laundry service are included. The Superior Double Room is the ideal choice for honeymooners, special occasions, families, and business travelers who want the best hotel experience in Jaipur.',
    features: ['WiFi', 'Flat TV', 'Room Service', 'Geyser', 'AC', 'Mini Fridge', 'Premium Bedding'],
    price: '2,940',
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 1,
  },
]

export const services = [
  { name: 'Free Wi-Fi', description: 'Stay connected with complimentary high-speed internet throughout the property.' },
  { name: 'Free Parking', description: 'Convenient on-site parking available for all guests at no extra charge.' },
  { name: '24/7 Front Desk', description: 'Our friendly staff is available around the clock to assist with any needs.' },
  { name: 'Room Service', description: 'Enjoy delicious meals delivered right to your room at your convenience.' },
  { name: 'Laundry Service', description: 'Keep your wardrobe fresh with our prompt and affordable laundry services.' },
  { name: 'Air Conditioning', description: 'All rooms are equipped with modern air conditioning for your comfort.' },
  { name: 'Power Backup', description: 'Uninterrupted power supply ensures a hassle-free stay at all times.' },
  { name: 'Restaurant', description: 'Savor authentic Indian cuisine at our on-site restaurant, Rama Rasoi.' },
]

export const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    text: 'Staff, room, amenities, food — everything was perfect. The hospitality reminded me of home.',
  },
  {
    name: 'Rahul Verma',
    location: 'Delhi, India',
    rating: 5,
    text: 'Delicious homely food at great prices. The location is very convenient for exploring Jaipur.',
  },
  {
    name: 'Ananya Gupta',
    location: 'Kolkata, India',
    rating: 4,
    text: 'Clean rooms and excellent service. The staff went above and beyond to make our stay comfortable.',
  },
  {
    name: 'Vikram Singh',
    location: 'Pune, India',
    rating: 5,
    text: 'Great value for money. The rooms are spacious and well-maintained. Will definitely return.',
  },
]

export const locationPoints = [
  'Railway Station',
  'Airport',
  'Tourist attractions',
  'Shopping areas',
]

export const storyBlocks = [
  {
    year: 'Our Promise',
    title: 'Warm Indian Hospitality',
    text: 'Hotel Rama Hindustani is dedicated to providing guests with a comfortable and memorable stay. Located near key attractions and transport hubs, we ensure easy accessibility and convenience.',
  },
  {
    year: 'Our Standard',
    title: 'Clean & Comfortable',
    text: 'Our hotel is known for clean and well-maintained rooms, friendly and professional staff, delicious homely food, and a peaceful and secure environment.',
  },
  {
    year: 'Our Mission',
    title: 'Your Home Away From Home',
    text: 'Whether you are visiting Jaipur for business or leisure, we aim to make your stay relaxing, practical, and enjoyable.',
  },
]
