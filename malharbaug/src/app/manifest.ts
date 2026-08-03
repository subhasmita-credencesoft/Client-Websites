import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Malhar Baug Resort Alibaug',
    short_name: 'MalharBaug',
    description: 'Luxury resort near Nagaon Beach, Alibaug',
    icons: [
      {
        src: '/malharlogo.jpeg',
        sizes: '1254x1254',
        type: 'image/jpeg',
      },
    ],
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2d8f2d',
  };
}
