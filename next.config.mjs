/** @type {import('next').NextConfig} */
const repoName = 'resi-build-1';
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: isProduction ? 'export' : undefined,
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}/` : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig