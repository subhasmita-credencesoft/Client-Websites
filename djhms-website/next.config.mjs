/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — generates an `out/` folder deployable to any static host.
  // API routes (/api/contact, /api/careers) are excluded from the export;
  // forms will need an external SMTP service or serverless function on the host.
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // next/image optimisation is not available for static exports — use
    // unoptimized so <SmartImage> falls back to the raw Unsplash CDN URLs.
    unoptimized: true,
  },
  typescript: {
    // Verified separately via `npm run typecheck`
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
