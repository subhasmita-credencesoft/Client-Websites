/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...(isProd && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    unoptimized: isProd,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'hoirqrkdgbmvpwutwuwj.supabase.co' },
      { protocol: 'https', hostname: 'bookonelocal.in' },
    ],
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

module.exports = nextConfig;
