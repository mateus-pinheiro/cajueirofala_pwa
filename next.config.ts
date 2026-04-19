import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
};

const config = process.env.NODE_ENV === "production"
  ? withPWA({
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: false,
    })(nextConfig)
  : nextConfig;

export default config;
