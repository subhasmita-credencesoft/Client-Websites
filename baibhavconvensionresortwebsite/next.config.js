/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Allow building into a separate directory (e.g. while the dev server is running).
  distDir: process.env.NEXT_DIST_DIR || '.next',
  ...(isProd && {
    output: 'export',
  }),
  images: {
    unoptimized: isProd,
    remotePatterns: [
      { protocol: 'https', hostname: 'hoirqrkdgbmvpwutwuwj.supabase.co' },
      { protocol: 'https', hostname: 'bookonelocal.in' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

module.exports = nextConfig;
