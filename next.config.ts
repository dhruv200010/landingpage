import type { NextConfig } from 'next';
import type { Header } from 'next/dist/lib/load-custom-routes';

const securityHeaders: Header[] = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://*.hotjar.com https://*.hotjar.io;
      connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com;
      img-src 'self' data: https://*.hotjar.com;
      style-src 'self' 'unsafe-inline' https://*.hotjar.com;
      frame-src https://*.hotjar.com;
      worker-src 'self' blob: https://*.hotjar.com;
      object-src 'none';
    `.replace(/\s{2,}/g, ' ').trim(),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // applies to all routes
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
