import type { ApiProperty } from '@/types';

export const fallbackProperty: ApiProperty = {
  id: 2970,
  name: 'Malhar Baug Resort',
  email: 'bookings@malharbaugresort.com',
  mobile: '+919035198520',
  whatsApp: '+919987552273',
  managerContactNo: '+919035198520',
  managerEmailAddress: 'manager@malharbaugresort.com',
  address: {
    streetNumber: 'H.No. 3116',
    streetName: 'Palhe, Nagaon',
    suburb: 'Palhe',
    city: 'Alibaug',
    state: 'Maharashtra',
    locality: 'Nagaon',
    postcode: '402204',
    country: 'India',
  },
  latitude: 18.6019,
  longitude: 72.9056,
  imageList: [
    { url: '/hero1.jpeg', mainImage: true },
    { url: '/hero2.jpeg' },
    { url: '/hero3.jpeg' },
    { url: '/dining/fishthali.jpeg' },
  ],
  propertyServicesList: [
    { id: 1, name: 'Swimming Pool' },
    { id: 2, name: 'Free WiFi' },
    { id: 3, name: 'Free Parking' },
    { id: 4, name: 'Konkan Restaurant' },
    { id: 5, name: 'Lush Green Gardens' },
    { id: 6, name: 'Kids Play Area' },
    { id: 7, name: 'Bonfire & BBQ on Request' },
    { id: 8, name: 'Power Backup' },
  ],
  roomList: [
    {
      id: 101,
      name: 'Super Deluxe Room',
      description:
        'Spacious, air-conditioned luxury room featuring plush king bedding, private balcony overlooking the greenery, modern en-suite bathroom, flat-screen TV, and tea/coffee maker. Ideal for couples and small families.',
      roomOnlyPrice: 4229,
      minimumOccupancy: 1,
      maximumOccupancy: 3,
      imageList: [
        { url: '/hero1.jpeg', mainImage: true },
        { url: '/hero2.jpeg' },
      ],
      roomFacilities: [
        { id: 10, name: 'Air Conditioning' },
        { id: 11, name: 'King Bed' },
        { id: 12, name: 'Garden View Balcony' },
        { id: 13, name: 'Attached Bathroom & Geyser' },
        { id: 14, name: 'LED TV' },
        { id: 15, name: 'Free WiFi' },
      ],
      ratesAndAvailabilityDtos: [
        { id: 1, price: 4229, noOfAvailable: 4 },
      ],
    },
    {
      id: 102,
      name: '2-Bedroom Hall Villa',
      description:
        'Ideal family sanctuary with two independent air-conditioned bedrooms, common sitting and dining hall, wide veranda overlooking gardens, and rapid pool access. Sleeps 4 adults and 2 children with comfort.',
      roomOnlyPrice: 7500,
      minimumOccupancy: 2,
      maximumOccupancy: 6,
      imageList: [
        { url: '/hero2.jpeg', mainImage: true },
        { url: '/hero3.jpeg' },
      ],
      roomFacilities: [
        { id: 20, name: '2 King Bedrooms' },
        { id: 21, name: 'Living Hall & Dining Area' },
        { id: 22, name: 'Air Conditioning in Both Rooms' },
        { id: 23, name: '2 En-Suite Bathrooms' },
        { id: 24, name: 'Garden Sit-Out Verandah' },
        { id: 25, name: 'Near Swimming Pool' },
      ],
      ratesAndAvailabilityDtos: [
        { id: 2, price: 7500, noOfAvailable: 2 },
      ],
    },
    {
      id: 103,
      name: '4-Bedroom Hall Villa',
      description:
        'Exclusive 4-BHK private luxury villa designed for large family get-togethers, corporate offsites, and celebration groups. Features four spacious bedrooms, massive central living room, private lawn, and dedicated parking.',
      roomOnlyPrice: 15000,
      minimumOccupancy: 8,
      maximumOccupancy: 16,
      imageList: [
        { url: '/hero3.jpeg', mainImage: true },
        { url: '/hero1.jpeg' },
        { url: '/hero2.jpeg' },
      ],
      roomFacilities: [
        { id: 30, name: '4 Master Bedrooms' },
        { id: 31, name: 'Spacious Central Hall' },
        { id: 32, name: 'Independent Private Lawn' },
        { id: 33, name: '4 Modern Bathrooms' },
        { id: 34, name: 'Power Backup & WiFi' },
        { id: 35, name: 'Dedicated Butler & Room Service' },
      ],
      ratesAndAvailabilityDtos: [
        { id: 3, price: 15000, noOfAvailable: 1 },
      ],
    },
  ],
};
