import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'bookonelocal.in' },
      { protocol: 'https', hostname: 'api.thehotelmate.co' },
    ],
  },
};

export default nextConfig;
