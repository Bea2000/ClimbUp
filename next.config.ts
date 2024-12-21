import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
        has: [{ type: 'cookie', key: 'token' }],
      },
      {
        source: '/',
        destination: '/login',
        permanent: false,
        missing: [{ type: 'cookie', key: 'token' }],
      },
    ];
  },
};

export default nextConfig;
