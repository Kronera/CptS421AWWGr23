import type { NextConfig } from "next";

const isCI = process.env.CI === "true";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: isCI,
  },
  typescript: {
    ignoreBuildErrors: isCI,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;