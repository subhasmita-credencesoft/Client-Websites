import { Attraction, Distance } from '@/types';

export const DISTANCES: Distance[] = [
  {
    destination: 'Biju Patnaik International Airport (Bhubaneswar)',
    distance: '~18 km',
    drivingTime: '30\u201335 mins',
  },
  {
    destination: 'Bhubaneswar Railway Station',
    distance: '~15 km',
    drivingTime: '25\u201330 mins',
  },
  {
    destination: 'Cuttack Railway Station',
    distance: '~16 km',
    drivingTime: '25\u201330 mins',
  },
  {
    destination: 'Nandankanan Zoological Park',
    distance: '~14 km',
    drivingTime: '20 mins',
  },
  {
    destination: 'Barabati Stadium (Cuttack)',
    distance: '~18 km',
    drivingTime: '30 mins',
  },
];

export const ATTRACTIONS: Attraction[] = [
  {
    name: 'Nandankanan Zoological Park',
    distance: '~14 km',
    drivingTime: '20 mins',
    description:
      'One of India s finest zoos and botanical gardens  a great half-day outing for families staying with us.',
  },
  {
    name: 'Puri & Konark Connectivity',
    distance: '~90 km to Puri',
    drivingTime: '2 hrs',
    description:
      'Drive on from our NH-16 location to the Jagannath Temple in Puri or the Sun Temple at Konark for a full coastal circuit.',
  },
  {
    name: 'Local Temples & Heritage',
    distance: 'Within 15\u201320 km',
    drivingTime: '20\u201330 mins',
    description:
      'Temples across Bhubaneswar and Cuttack including Lingaraj, Mukteshwar, and Cuttack\u2019s old town heritage precincts.',
  },
  {
    name: 'Barabati Stadium (Cuttack)',
    distance: '~18 km',
    drivingTime: '30 mins',
    description:
      'Cuttack\u2019s iconic cricket and events stadium  convenient for match-day travel and large public functions.',
  },
];

export const GETTING_HERE = {
  title: 'Getting Here',
  intro:
    'We sit right on National Highway 16 at Phulnakhara  the perfect midpoint between Bhubaneswar and Cuttack.',
  steps: [
    {
      title: 'From Bhubaneswar',
      image: '/newedit/Entrance Pathway.avif',
      description:
        'Take NH-16 toward Cuttack. Cross the Phulnakhara flyover and exit immediately after the flyover. The resort entrance is on the left.',
    },
    {
      title: 'From Cuttack',
      image: '/newedit/gate front.avif',
      description:
        'Take NH-16 toward Bhubaneswar. About 2 km before the Phulnakhara flyover, the resort entrance is on the right.',
    },
    {
      title: 'From Biju Patnaik International Airport',
      image: '/newedit/Our Building.avif',
      description:
        '~18 km via NH-16  roughly 30 to 35 minutes. Pre-booked airport pickup is available on request.',
    },
  ],
};

export const WHY_LOCATION = [
  {
    title: 'No City Traffic Bottlenecks',
    description:
      'Guests coming from both Cuttack and Bhubaneswar can reach the resort without getting stuck in dense inner-city traffic.',
  },
  {
    title: 'Easy Bus & Highway Connectivity',
    description:
      'Located right along National Highway 16, making transit simple for out-of-town wedding attendees and delegates.',
  },
];
