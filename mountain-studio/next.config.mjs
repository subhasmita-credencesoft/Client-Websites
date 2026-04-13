/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    scrollRestoration: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "bookonelocal.in"
      }
    ]
  }
};

export default nextConfig;
