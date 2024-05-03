/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/app',
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
