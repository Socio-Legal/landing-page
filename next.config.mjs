import nextI18NextConfig from "./next-i18next.config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: nextI18NextConfig.i18n,

  async rewrites() {
    return [
      // Products
      { source: "/producto", destination: "/product" },
      { source: "/libro-de-socios", destination: "/partners-book" },
      { source: "/planes-de-incentivos", destination: "/incentive-plans" },
      { source: "/juntas-consejos", destination: "/shareholder-meetings" },
      { source: "/simulador", destination: "/operation-drafts" },
      // Solutions
      { source: "/soluciones", destination: "/solutions" },
      { source: "/empresas", destination: "/solutions/companies" },
      { source: "/abogados", destination: "/solutions/lawyers" },
      { source: "/startups", destination: "/solutions/startups" },
      { source: "/inversores", destination: "/solutions/investors" },
      {
        source: "/portal-del-inversor",
        destination: "/solutions/investors-dashboard",
      },
      // Testimonials
      { source: "/testimonios", destination: "/testimonials" },
      { source: "/testimonios/:client", destination: "/testimonials/:client" },
      // Pricing
      { source: "/precios", destination: "/pricing" },
      // Resources
      { source: "/recursos", destination: "/resources" },
      // Legal
      { source: "/aviso-legal", destination: "/disclaimer" },
      { source: "/privacidad", destination: "/privacy" },
      { source: "/politica-seguridad", destination: "/security" },
      // Empty pages
      {
        source: "/software-de-libro-de-socios",
        destination: "/software-partner-book",
      },
      {
        source: "/software-de-juntas-de-accionistas",
        destination: "/software-shareholder-meetings",
      },
      {
        source: "/software-de-gestion-de-captable",
        destination: "/software-captable-management",
      },
      { source: "/software-de-captable", destination: "/software-captable" },
      {
        source: "/simulador-de-ampliacion-de-capital",
        destination: "/capital-increase-simulator",
      },
      { source: "/secundario", destination: "/secondary" },
      {
        source: "/junta-de-accionistas-digital",
        destination: "/digital-shareholder-meetings",
      },
      { source: "/grupos-societarios", destination: "/corporate-groups" },
      {
        source: "/documentacion-societaria",
        destination: "/corporate-documentation",
      },
      {
        source: "/consejos-de-administracion",
        destination: "/board-of-directors",
      },
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
        pathname: "/**",
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
      {
        protocol: "https",
        hostname: "businesstalentgroup.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname: "/system/resources/previews/**",
      },
    ],
  },
};

export default nextConfig;
