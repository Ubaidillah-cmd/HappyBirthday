import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false, // sembunyikan tombol "N" Next.js di mode development
};

export default nextConfig;
