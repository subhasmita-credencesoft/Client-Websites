/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

module.exports = nextConfig;
