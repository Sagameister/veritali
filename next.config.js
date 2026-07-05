/** @type {import('next').NextConfig} */
// Allows placeholder photos from Unsplash to load through Next.js.
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react/compiler-runtime": "react-compiler-runtime",
    };
    return config;
  },
};

module.exports = nextConfig;
