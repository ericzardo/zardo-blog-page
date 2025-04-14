import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: "/blog",
  assetPrefix: "/blog/",
};

export default nextConfig;
