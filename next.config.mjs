/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow images from https://www.sttok.com
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sttok.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
