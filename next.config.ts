import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: '/blog',
  assetPrefix: "/blog",
  trailingSlash: true,
};

export default nextConfig;
