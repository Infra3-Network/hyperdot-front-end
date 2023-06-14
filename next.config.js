/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/apis/:path*',
  //       destination: 'http://127.0.0.1:3000/:path*'
  //     }
  //   ]
  // }
};

module.exports = nextConfig;
