const assetPath = (path) => encodeURI(path)

export const contactDetails = {
  id: 3529,
  name: 'Rama Hindustani',
  address: 'RR23+HC, Tonk Road, Pratap Nagar, Jaipur, Rajasthan 302033, India',
  phone: '+91 63767 07091',
  email: 'hotelramahindustani@gmail.com',
  whatsApp: '+91 63767 07091',
  manager: 'Saurabh Kumar Thakuriya',
  addressParts: {
    country: 'India',
    streetNumber: 'RR23+HC',
    streetName: 'Tonk Road',
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
  front: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Front -pic-4.avif',
  frontAlt: 'https://bookonelocal.in/cdn/2026-04-09-063841996-image_2.jpg',
  reception: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Reception-pic-14.jpg'),
  receptionAlt: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Front -pic-4.avif',
  restaurant: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Restaurant-pic-17.jpg'),
  standardRoom: 'https://bookonelocal.in/cdn/2026-04-09-063839628-image_0.jpg',
  deluxeRoom: 'https://bookonelocal.in/cdn/2026-04-09-063840295-image_0.jpg',
  superiorRoom: 'https://bookonelocal.in/cdn/2026-04-09-063840991-image_0.jpg',
  economyRoom: 'https://bookonelocal.in/cdn/2026-04-09-063839132-image_0.jpg',
  bathroom: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-BathRoom pic-45.jpg'),
  rooftop: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-roof top-for events-pic-19.jpg'),
  liftLobby: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Galary-lift-pic-24.jpg'),
  gym: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Gym-pic-12.jpg'),
  funZone: assetPath('/hotel-ramahindustani-image/Fun Zone1.jpg'),
  funZoneAlt: assetPath('/hotel-ramahindustani-image/Fun zone2.jpg'),
}

export const galleryImages = [
  // { src: assetPath('/hotel-ramahindustani-image/Hotel Rama Hindustani and Rama Rasoi front 2.avif'), alt: 'Hotel Rama Hindustani front exterior' },
  // { src: assetPath('/hotel-ramahindustani-image/Hotel Rama Hindustani and Rama Rasoi front 2.jpg'), alt: 'Hotel Rama Hindustani front exterior daytime' },
  // { src: assetPath('/hotel-ramahindustani-image/Hotel Rama Hindustani front 3.avif'), alt: 'Hotel Rama Hindustani building view' },
  { src: assetPath('/hotel-ramahindustani-image/Hotel Rama Hindustani front 3.jpg'), alt: 'Hotel Rama Hindustani building exterior' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Front -pic-4.avif'), alt: 'Hotel Rama Hindustani entrance view' },
  // { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Front -pic-4.jpg'), alt: 'Hotel Rama Hindustani property front' },
  { src: assetPath('/hotel-ramahindustani-image/Hotel Rama Hindustani Reception Area 1.jpg'), alt: 'Reception area' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Reception-pic-14.jpg'), alt: 'Reception lobby' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Restaurant-pic-17.jpg'), alt: 'Restaurant seating area' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-roof top-for events-pic-19.jpg'), alt: 'Rooftop event area' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Galary-lift-pic-24.jpg'), alt: 'Lift lobby' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-galary-pic-27.jpg'), alt: 'Hotel gallery space' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Gym-pic-12.jpg'), alt: 'Gym area' },
  { src: assetPath('/hotel-ramahindustani-image/Fun Zone1.jpg'), alt: 'Fun zone area one' },
  { src: assetPath('/hotel-ramahindustani-image/Fun zone2.jpg'), alt: 'Fun zone area two' },
  { src: assetPath('/hotel-ramahindustani-image/Fun Zone3.jpg'), alt: 'Fun zone area three' },
  { src: assetPath('/hotel-ramahindustani-image/Fun Zone4.jpg'), alt: 'Fun zone area four' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Economy room-pic-22.jpg'), alt: 'Economy room one' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Economy Room-pic-37.jpg'), alt: 'Economy room two' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Economy Room-pic-42.jpg'), alt: 'Economy room three' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Standard room -pic-23.jpg'), alt: 'Standard room one' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur- standard room-pic-46.jpg'), alt: 'Standard room two' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Deluxe room-pic-28.jpg'), alt: 'Deluxe room one' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Delux room-pic-41.jpg'), alt: 'Deluxe room two' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Deluxe Room-pic-40.jpg'), alt: 'Deluxe room three' },
  { src: assetPath('/hotel-ramahindustani-image/Super Deluxe room with fridge.jpg'), alt: 'Superior room one' },
  { src: assetPath('/hotel-ramahindustani-image/Super Delux Room with Fridge 1.jpg'), alt: 'Superior room two' },
  { src: assetPath('/hotel-ramahindustani-image/Super Deluxe room with Fridge 2.jpg'), alt: 'Superior room three' },
  { src: assetPath('/hotel-ramahindustani-image/Super Deluxe room with fridge 4.jpg'), alt: 'Superior room four' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-BathRoom-pic-44.jpg'), alt: 'Bathroom one' },
  { src: assetPath('/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-BathRoom pic-45.jpg'), alt: 'Bathroom two' },
]

export const homepageHighlights = [
  'Comfortable & Spacious Rooms',
  'Free Wi-Fi',
  '24/7 Front Desk',
  'Family-Friendly Stay',
  'Affordable Pricing',
]

export const rooms = [
  {
    id: 8602,
    name: 'Economy Double Room',
    image: 'https://bookonelocal.in/cdn/2026-04-09-063839132-image_0.jpg',
    gallery: [
      'https://bookonelocal.in/cdn/2026-04-09-063839132-image_0.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063839263-image_1.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063839371-image_2.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063839474-image_3.jpg',
    ],
    description: 'A budget-friendly option for two guests, offering essential amenities for a comfortable stay.',
    features: ['Wifi', 'Flat TV', 'Room Service', 'Geyser', '24 Hours Room Service', 'Hand Sanitizer'],
    price: 'From Rs. 1,155 / night',
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 2,
  },
  {
    id: 8603,
    name: 'Standard Double Room',
    image: 'https://bookonelocal.in/cdn/2026-04-09-063839628-image_0.jpg',
    gallery: [
      'https://bookonelocal.in/cdn/2026-04-09-063839628-image_0.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063839731-image_1.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063839832-image_2.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063839934-image_3.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063840035-image_4.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063840139-image_5.jpg',
    ],
    description: 'A comfortable room designed for two guests with standard amenities ensuring a pleasant stay.',
    features: ['Wifi', 'Flat TV', 'Room Service', 'Geyser', '24 Hours Room Service', 'Hand Sanitizer'],
    price: 'From Rs. 1,365 / night',
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 6,
  },
  {
    id: 8604,
    name: 'Deluxe Room',
    image: 'https://bookonelocal.in/cdn/2026-04-09-063840295-image_0.jpg',
    gallery: [
      'https://bookonelocal.in/cdn/2026-04-09-063840295-image_0.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063840397-image_1.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063840501-image_2.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063840624-image_3.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063840731-image_4.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063840838-image_5.jpg',
    ],
    description: 'A more spacious and well-appointed room offering enhanced comfort and additional amenities for a luxurious stay.',
    features: ['Wifi', 'Flat TV', 'Room Service', 'Geyser', '24 Hours Room Service', 'Hand Sanitizer'],
    price: 'From Rs. 1,680 / night',
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 4,
  },
  {
    id: 8605,
    name: 'Superior Double Room',
    image: 'https://bookonelocal.in/cdn/2026-04-09-063840991-image_0.jpg',
    gallery: [
      'https://bookonelocal.in/cdn/2026-04-09-063840991-image_0.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063841109-image_1.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063841226-image_2.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063841336-image_3.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063841464-image_4.jpg',
      'https://bookonelocal.in/cdn/2026-04-09-063841575-image_5.jpg',
    ],
    description: 'A premium room with superior amenities and features for an enhanced and luxurious experience.',
    features: ['Wifi', 'Flat TV', 'Room Service', 'Geyser', '24 Hours Room Service', 'Hand Sanitizer'],
    price: 'From Rs. 2,940 / night',
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 1,
  },
]

export const services = [
  'Free Wi-Fi',
  'Free Parking',
  '24/7 Front Desk',
  'Room Service',
  'Laundry Service',
  'Air Conditioning',
  'Power Backup',
]

export const reviews = [
  'Staff, room, amenities, food everything was perfect.',
  'Delicious homely food at great prices.',
  'Clean rooms and excellent service.',
]

export const locationPoints = [
  'Railway Station',
  'Airport',
  'Tourist attractions',
  'Shopping areas',
]
