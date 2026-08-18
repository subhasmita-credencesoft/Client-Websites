import { Attraction, Distance, LandmarkCluster } from '@/types';

export const DISTANCES: Distance[] = [
  {
    destination: 'Biju Patnaik International Airport (Bhubaneswar)',
    distance: '~18 km',
    drivingTime: '30–35 mins',
  },
  {
    destination: 'Bhubaneswar Railway Station',
    distance: '~15 km',
    drivingTime: '25–30 mins',
  },
  {
    destination: 'Cuttack Railway Station',
    distance: '~16 km',
    drivingTime: '25–30 mins',
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
  {
    destination: 'Ocean World Water Park',
    distance: '~9.5 km',
    drivingTime: '15–20 mins',
  },
  {
    destination: 'State Botanical Garden',
    distance: '~11.9 km',
    drivingTime: '20–25 mins',
  },
];

export const ATTRACTIONS: Attraction[] = [
  {
    name: 'Nandankanan Zoological Park',
    distance: '~14 km',
    drivingTime: '20 mins',
    description:
      'One of India\'s finest zoos and botanical gardens — a great half-day outing for families staying with us.',
  },
  {
    name: 'Barabati Stadium (Cuttack)',
    distance: '~18 km',
    drivingTime: '30 mins',
    description:
      'Cuttack\'s iconic cricket and events stadium — convenient for match-day travel and large public functions.',
  },
  {
    name: 'Ocean World Water Park',
    distance: '~9.5 km',
    drivingTime: '15–20 mins',
    description:
      'A popular amusement and water park located about 9.5 km away, ideal for family outings.',
  },
  {
    name: 'State Botanical Garden',
    distance: '~11.9 km',
    drivingTime: '20–25 mins',
    description:
      'A sprawling nature reserve with diverse flora located roughly 11.9 km away.',
  },
  {
    name: 'Local Temples',
    distance: 'Within 1 km',
    drivingTime: '2–5 mins',
    description:
      'Historic spots like Maa Rautanee Pitha and Shree Shree Lakheswara Mahadev Peeth sit within a 1-kilometer radius.',
  },
  {
    name: 'Cuttack City Landmarks',
    distance: '~14–15 km',
    drivingTime: '25–30 mins',
    description:
      'Historic sites like Barabati Fort and the Mahanadi River Ghats are roughly 14–15 km north down the highway.',
  },
  {
    name: 'Bhubaneswar Heritage',
    distance: '~15 km',
    drivingTime: '20–30 mins',
    description:
      'Temple city attractions like the Lingaraja Temple and Ekamra Kanan are accessible via a 20-30 minute drive south.',
  },
];

export const GETTING_HERE = {
  title: 'Getting Here',
  intro:
    'We sit right on National Highway 16 at Phulnakhara — the perfect midpoint between Bhubaneswar and Cuttack.',
  steps: [
    {
      title: 'From Bhubaneswar',
      image: '/bhubaneswR.png',
      description:
        'Take NH-16 toward Cuttack. Cross the Phulnakhara flyover and exit immediately after the flyover. The resort entrance is on the left.',
    },
    {
      title: 'From Cuttack',
      image: '/cuttack.png',
      description:
        'Take NH-16 toward Bhubaneswar. About 2 km before the Phulnakhara flyover, the resort entrance is on the right.',
    },
    {
      title: 'From Biju Patnaik International Airport',
      image: '/BijuPatnaikInternationalAirport.png',
      description:
        '~18 km via NH-16 — roughly 30 to 35 minutes. Pre-booked airport pickup is available on request.',
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

export const NEARBY_LANDMARKS: LandmarkCluster[] = [
  {
    id: 'healthcare',
    icon: 'solar:hospital-bold',
    title: 'Healthcare & Hospitals',
    description:
      'Patient attendants and visitors stay minutes away from major hospitals — SUM Hospital is virtually next door on NH-16.',
    landmarks: [
      {
        name: 'IMS & SUM Hospital Campus II (Phulnakhara)',
        distance: '~1 km',
        drivingTime: '1–2 mins',
      },
      {
        name: 'HCG Panda Cancer Hospital (Cuttack)',
        distance: '~6 km',
        drivingTime: '10–15 mins',
      },
      {
        name: 'Nuabanta hospital cluster',
        distance: '~4 km',
        drivingTime: '5–10 mins',
      },
    ],
  },
  {
    id: 'education',
    icon: 'solar:book-bold',
    title: 'Education & Institutions',
    description:
      'A short drive from the region\'s leading schools and colleges — ideal for exam-season, open-day and alumni visits.',
    landmarks: [
      {
        name: 'Eastern Academy of Science & Technology (EAST)',
        distance: '~3 km',
        drivingTime: '3–5 mins',
      },
      {
        name: 'DPS Kalinga (Adhalia)',
        distance: '~3 km',
        drivingTime: '5–8 mins',
      },
      {
        name: 'St. Xavier\'s High School, Phulnakhara',
        distance: '~2 km',
        drivingTime: '4–6 mins',
      },
      {
        name: 'Bapuji Bidya Pitha, Phulnakhara',
        distance: '~1 km',
        drivingTime: '2–4 mins',
      },
    ],
  },
  {
    id: 'temples',
    icon: 'solar:altar-bold',
    title: 'Local Temples & Heritage',
    description:
      'Historic temples within a 1-kilometer radius — Maa Rautanee Pitha and Shree Shree Lakheswara Mahadev Peeth are walking distance.',
    landmarks: [
      {
        name: 'Maa Rautanee Pitha',
        distance: 'Within 1 km',
        drivingTime: '2–5 mins',
      },
      {
        name: 'Shree Shree Lakheswara Mahadev Peeth',
        distance: 'Within 1 km',
        drivingTime: '2–5 mins',
      },
    ],
  },
  {
    id: 'shopping',
    icon: 'solar:shopping-bag-bold',
    title: 'Shopping & Lifestyle',
    description:
      'From highway-side sweet shops to a full city mall, shopping and leisure are within easy reach of the resort.',
    landmarks: [
      {
        name: 'Esplanade One Mall, Bhubaneswar',
        distance: '~11 km',
        drivingTime: '15–25 mins',
      },
      {
        name: 'Kuakhai River (NH-16)',
        distance: '~1 km',
        drivingTime: '2–5 mins',
      },
      {
        name: 'Pahala — famous rasagola hub',
        distance: '~3 km',
        drivingTime: '5–8 mins',
      },
    ],
  },
  {
    id: 'heritage',
    icon: 'solar:castle-bold',
    title: 'Cuttack & Bhubaneswar Heritage',
    description:
      'Historic landmarks in both twin cities — Barabati Fort, Mahanadi River Ghats, Lingaraja Temple and Ekamra Kanan.',
    landmarks: [
      {
        name: 'Barabati Fort, Cuttack',
        distance: '~14–15 km',
        drivingTime: '25–30 mins',
      },
      {
        name: 'Mahanadi River Ghats, Cuttack',
        distance: '~14–15 km',
        drivingTime: '25–30 mins',
      },
      {
        name: 'Lingaraja Temple, Bhubaneswar',
        distance: '~15 km',
        drivingTime: '25–30 mins',
      },
      {
        name: 'Ekamra Kanan Botanical Garden',
        distance: '~12 km',
        drivingTime: '20–25 mins',
      },
    ],
  },
  {
    id: 'transport',
    icon: 'solar:bus-bold',
    title: 'Transport & Connectivity',
    description:
      'Right on National Highway 16 — the perfect midpoint between Bhubaneswar and Cuttack for out-of-town guests.',
    landmarks: [
      {
        name: 'NH-16 (Bhubaneswar–Cuttack Highway)',
        distance: 'On-site',
        drivingTime: 'Adjacent',
      },
      {
        name: 'Bhubaneswar city centre',
        distance: '~15 km',
        drivingTime: '25–30 mins',
      },
      {
        name: 'Cuttack city centre',
        distance: '~16 km',
        drivingTime: '25–30 mins',
      },
    ],
  },
];
