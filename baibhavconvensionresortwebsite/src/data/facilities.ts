import { Facility } from '@/types';

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`;

export const FACILITIES: Facility[] = [
  {
    icon: 'solar:parking-square-bold',
    title: 'Parking for 200+ Vehicles',
    description:
      'Dedicated parking for over 200 cars plus dedicated bus bays  critical for large weddings and corporate events, with valet capability.',
    image: unsplash('1506521781263-d8422e82f27a'),
  },
  {
    icon: 'solar:plug-circle-bold',
    title: 'Full Power Backup',
    description:
      'Complete generator backup across halls, lawns, and rooms so your event or stay is never interrupted.',
    image: unsplash('1558494949-ef010cbdcc31'),
  },
  {
    icon: 'solar:shield-user-bold',
    title: '24/7 Security',
    description:
      'Round-the-clock trained security, CCTV coverage, and controlled entry points for guest safety and event assets.',
    image: unsplash('1557597774-9d273605dfa9'),
  },
  {
    icon: 'solar:swimming-bold',
    title: 'Swimming Pool & Lawns',
    description:
      'A landscaped pool area and open lawns for pre-event functions, leisure, and photo sessions.',
    image: unsplash('1520250497591-112f2f40a3f4'),
  },
  {
    icon: 'solar:bus-bold',
    title: 'Driver Rest Areas',
    description:
      'Comfortable rest areas for drivers and bus crews  a thoughtful touch appreciated by every wedding group.',
    image: unsplash('1570125909232-eb263c188f7e'),
  },
  {
    icon: 'solar:wifi-router-bold',
    title: 'High-Speed Wi-Fi',
    description:
      'Dedicated high-speed internet in rooms and a separate event-grade network for conferences and attendees.',
    image: unsplash('1593642632823-8f785ba67e45'),
  },
  {
    icon: 'solar:bell-bold',
    title: '24/7 Front Desk & Room Service',
    description:
      'Round-the-clock reception, concierge, and room service to support late arrivals and early check-outs.',
    image: unsplash('1564501049412-61c2a3083791'),
  },
  {
    icon: 'solar:dishwasher-bold',
    title: 'In-House Kitchen & Catering',
    description:
      'A full in-house kitchen producing on-site catering for every meal  breakfast buffets to banquet banquets.',
    image: unsplash('1556910103-1c02745aae4d'),
  },
];
