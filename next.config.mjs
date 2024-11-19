import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    API_URL: "https://galaxy.patrickdev.me",
    NEXTAUTH_SECRET: "28087d7e0010b9179fb5687b2031dc481a4455cb",
  },
};

export default nextConfig;
