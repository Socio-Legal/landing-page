/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/libro-de-socios", destination: "/partners-book" },
      { source: "/planes-de-incentivos", destination: "/incentive-plans" },
      { source: "/juntas-consejos", destination: "/shareholder-meetings" },
      { source: "/simulador", destination: "/operation-drafts" },
      { source: "/recursos", destination: "/resources" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sttok.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.sttok.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.magicui.design",
        port: "",
        pathname: "/companies/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/ably/ghost/prod/**",
      },
    ],
  },
};

export default nextConfig;
