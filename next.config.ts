import type { NextConfig } from 'next';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' blob: https://*.hotjar.com https://*.hotjar.io;
      connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com;
      img-src 'self' data: https://*.hotjar.com;
      style-src 'self' 'unsafe-inline' https://*.hotjar.com;
      frame-src https://*.hotjar.com;
      worker-src 'self' blob: https://*.hotjar.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim(),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
