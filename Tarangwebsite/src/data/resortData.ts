export interface ResortDetails {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  rating: number;
  totalReviews: number;
  phone: string;
  formattedPhone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  website: string;
  address: {
    street: string;
    locality: string;
    city: string;
    district: string;
    state: string;
    postalCode: string;
    landmark: string;
    full: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    googleMapsLink: string;
    embedMapUrl: string;
  };
  policies: {
    checkInTime: string;
    checkOutTime: string;
    cancellation: string;
    petPolicy: string;
    smokingPolicy: string;
    childPolicy: string;
  };
  highlights: string[];
  social: {
    instagram: string;
    facebook: string;
    tripadvisor: string;
    makemytrip: string;
  };
}

export const RESORT_DATA: ResortDetails = {
  name: 'Tarangan Resort',
  legalName: 'The Tarangan Resort, Nagaon-Alibag',
  tagline: 'Lush Nature Retreat & Poolside Sanctuary in Nagaon, Alibaug',
  shortDescription:
    'Experience peaceful coastal bliss at Tarangan Resort, featuring air-conditioned deluxe boutique cottages and suites, a sparkling swimming pool, and authentic Maharashtrian Konkani seafood, just minutes from Nagaon Beach.',
  fullDescription:
    'Nestled along Sahan Bypass Road in the serene environs of Palhe, Nagaon, Tarangan Resort is a tranquil 3-star boutique haven amidst tropical coconut groves and betel nut orchards. Offering elegantly appointed air-conditioned deluxe cottages and suite accommodations overlooking our crystal-clear outdoor swimming pool, Tarangan is celebrated for warm Maharashtrian hospitality, mouth-watering coastal seafood thalis, and peaceful relaxation away from the bustling city.',
  rating: 4.7,
  totalReviews: 161,
  phone: '077568 38900',
  formattedPhone: '+91 77568 38900',
  whatsapp: '917756838900',
  whatsappMessage:
    'Hello Tarangan Resort! I would like to inquire about room availability and booking details.',
  email: 'taranganresort11@gmail.com',
  website: 'https://www.taranganresort.com',
  address: {
    street: 'Sahan Bypass Road, 188 Palhe Post Nagaon',
    locality: 'Palhe',
    city: 'Nagaon, Alibag',
    district: 'Raigad',
    state: 'Maharashtra',
    postalCode: '402204',
    landmark: 'Near Sahan Bypass & Nagaon High School Cross',
    full: 'Sahan Bypass Road, Palhe, Nagaon, Alibag, Maharashtra 402204, India',
    coordinates: {
      latitude: 18.5992,
      longitude: 72.9095,
    },
    googleMapsLink: 'https://maps.google.com/?q=Tarangan+Resort+Nagaon+Alibag',
    embedMapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.621539420847!2d72.90951174999999!3d18.5992224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be8709e4a3bfec7%3A0xe541940989f075d9!2sTarangan%20Resort!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },
  policies: {
    checkInTime: '12:00 PM',
    checkOutTime: '10:30 AM (Late checkout till 11:00 AM on request)',
    cancellation:
      'Free cancellation up to 72 hours prior to arrival. 50% retention for cancellations within 48 hours.',
    petPolicy: 'Pet-friendly resort! Well-mannered pets are welcome with prior notification.',
    smokingPolicy: 'Non-smoking indoor rooms. Designated outdoor smoking zones available.',
    childPolicy: 'Children under 6 stay free of charge using existing bedding.',
  },
  highlights: [
    'Crystal-Clear Outdoor Swimming Pool & Kids Pool',
    'Authentic Maharashtrian Konkani Seafood (Surmai, Pomfret, Prawns)',
    'Air-Conditioned Deluxe Cottages & Suites',
    '4.1 km from Water-Sports Hub Nagaon Beach',
    'Evening Bonfire, Lawn Sit-outs & Starlit Nights',
    'Pet-Friendly Green Haven with Free Parking',
    'Uninterrupted Power Backup & High-Speed Wi-Fi',
  ],
  social: {
    instagram: 'https://www.instagram.com/taranganresort_nagaon/',
    facebook: 'https://www.facebook.com/taranganresortnagaon/',
    tripadvisor:
      'https://www.tripadvisor.in/Hotel_Review-g26454155-d27484991-Reviews-The_Tarangan_Resort-Palhe_Raigad_District_Maharashtra.html',
    makemytrip: 'https://www.makemytrip.com/hotels/the_tarangan_resort-details-alibaug.html',
  },
};
