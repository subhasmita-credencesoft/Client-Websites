/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fully static site: no server, API or environment variables needed.
  // `npm run build` writes the deployable site to ./out
  output: "export",
  trailingSlash: true,
  images: {
    // Images come from the Unsplash CDN. The loader requests the right width
    // directly from Unsplash, so no image server is needed. See lib/images/loader.ts
    loader: "custom",
    loaderFile: "./lib/images/loader.ts",
  },
};

export default nextConfig;
