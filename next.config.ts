import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["jsoncrack-react"],
  env: {
    FORMATY_API_URL: process.env.FORMATY_API_URL,
    SITE_URL: process.env.SITE_URL,
  },
  webpack: (config) => {
    config.resolve.conditionNames = [
      "import",
      ...(config.resolve.conditionNames ?? []),
    ];
    return config;
  },
};

export default nextConfig;
