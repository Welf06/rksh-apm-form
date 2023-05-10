/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/styles/:path*',
        destination: '/src/styles/:path*',
      },
    ];
  },
}

module.exports = nextConfig
