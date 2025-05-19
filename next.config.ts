import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '/**',
      }
    ],
  }
};

export default nextConfig;
