import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: process.cwd(),
  },

  images: {
    unoptimized: true,
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
