/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'upload-server.northeurope.cloudapp.azure.com',
        port: '',
        pathname: '/uploads/**',
      },
      
    ],
  },
};

export default nextConfig;
