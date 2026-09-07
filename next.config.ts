import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The portfolio has no server-only features and can be hosted as static files.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
