import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/allorders',
        destination: '/myorders',
        permanent:true
      }
    ]
  }
};

export default nextConfig;
