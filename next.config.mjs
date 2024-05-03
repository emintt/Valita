/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/valita',
  assetPrefix: '/valita',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      
    ],
  },
};

export default nextConfig;
