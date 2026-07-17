import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: process.cwd(),
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    unoptimized: true,
    deviceSizes: [360, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    qualities: [72, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo2.wpopal.com",
        pathname: "/amoja/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "bookonelocal.in",
        pathname: "/cdn/**",
      },
    ],
  },
};

export default nextConfig;
