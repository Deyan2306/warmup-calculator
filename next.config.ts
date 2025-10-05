import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagcdn.com"],
  },
};

export default nextConfig;
