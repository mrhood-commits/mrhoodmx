/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimizaciones adicionales
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
