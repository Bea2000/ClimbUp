import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
        has: [{ type: 'cookie', key: 'next-auth.session-token' }],
      },
      {
        source: '/login',
        destination: '/dashboard',
        permanent: false,
        has: [{ type: 'cookie', key: 'next-auth.session-token' }],
      },
    ];
  },
};

export default nextConfig;
