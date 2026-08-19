import type { Service } from '@/types';

const ICONS = 'https://www.hhickp.com/assets/images/icons';

export const SERVICES: Service[] = [
  { icon: `${ICONS}/restaurant02.png`, label: 'Restaurant', invert: true },
  { icon: `${ICONS}/wifi.png`, label: 'Wifi', invert: false },
  { icon: `${ICONS}/rent.png`, label: 'Car rental', invert: true },
  { icon: `${ICONS}/room.png`, label: 'Clean well equipped rooms', invert: true },
  { icon: `${ICONS}/black.png`, label: 'Self drive scooty', invert: true },
  { icon: `${ICONS}/gym.png`, label: 'Gym', invert: true },
  {
    icon: '',
    label: 'Family Saloon',
    invert: true,
    svgIcon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  },
  {
    icon: '',
    label: 'Dining Space & Kitchen',
    invert: true,
    svgIcon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
  },
  {
    icon: '',
    label: 'ATM',
    invert: true,
    svgIcon: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
  },
];
