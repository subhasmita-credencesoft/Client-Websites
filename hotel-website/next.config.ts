import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo2.wpopal.com",
        pathname: "/amoja/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
