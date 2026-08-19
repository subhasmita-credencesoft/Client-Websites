import type { Service } from '@/types';

const ICONS = 'https://www.hhickp.com/assets/images/icons';

export const SERVICES: Service[] = [
  { icon: `${ICONS}/restaurant02.png`, label: 'Restaurant', invert: true },
  { icon: `${ICONS}/wifi.png`, label: 'Wifi', invert: false },
  { icon: `${ICONS}/rent.png`, label: 'Car rental', invert: true },
  { icon: `${ICONS}/room.png`, label: 'Clean well equipped rooms', invert: true },
  { icon: `${ICONS}/black.png`, label: 'Self drive scooty', invert: true },
  { icon: `${ICONS}/gym.png`, label: 'Gym', invert: true },
];
