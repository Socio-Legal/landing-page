/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Products
      { source: "/libro-de-socios", destination: "/partners-book" },
      { source: "/planes-de-incentivos", destination: "/incentive-plans" },
      { source: "/juntas-consejos", destination: "/shareholder-meetings" },
      { source: "/simulador", destination: "/operation-drafts" },
      // Solutions
      { source: "/soluciones", destination: "/solutions" },
      { source: "/soluciones/empresas", destination: "/solutions/companies" },
      { source: "/soluciones/abogados", destination: "/solutions/lawyers" },
      { source: "/soluciones/startups", destination: "/solutions/startups" },
      { source: "/soluciones/inversores", destination: "/solutions/investors" },
      {
        source: "/soluciones/portal-del-inversor",
        destination: "/solutions/investors-dashboard",
      },
      // Resources
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
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
