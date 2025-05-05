/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  env: {
    NEXT_PUBLIC_IGNORE_BUILD_ERROR: 'true',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true,
  },
  async rewrites() {
    return [
      {
        source: '/quiz/:path*',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
