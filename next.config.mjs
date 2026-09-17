/**
 * Slug publico castellano -> carpeta interna de app/ (con nombre en ingles).
 *
 * De este unico mapa salen DOS cosas, para que no puedan desincronizarse:
 *  - el rewrite  /libro-de-socios -> /partners-book   (sirve la pagina)
 *  - el 301      /partners-book   -> /libro-de-socios (mata el duplicado)
 *
 * Sin el 301, la carpeta interna es tambien una URL publica que devuelve 200
 * con el mismo contenido que su equivalente castellana: 28 duplicados
 * sostenidos solo por el canonical.
 *
 * Las rutas /en/** NO entran aqui: son las URLs inglesas publicas y se sirven
 * directamente desde app/en/**, sin rewrite y sin redireccion.
 */
const ES_TO_FOLDER = {
  // Producto
  "/producto": "/product",
  "/libro-de-socios": "/partners-book",
  "/planes-de-incentivos": "/incentive-plans",
  "/juntas-consejos": "/shareholder-meetings",
  "/simulador": "/operation-drafts",
  "/mercado-secundario": "/secondary-market",
  // Soluciones
  "/soluciones": "/solutions",
  "/empresas": "/solutions/companies",
  "/abogados": "/solutions/lawyers",
  "/startups": "/solutions/startups",
  "/inversores": "/solutions/investors",
  "/portal-del-inversor": "/solutions/investors-dashboard",
  // Testimonios
  "/testimonios": "/testimonials",
  // Precios
  "/precios": "/pricing",
  // Recursos
  "/recursos": "/resources",
  // Legales
  "/aviso-legal": "/disclaimer",
  "/privacidad": "/privacy",
  "/politica-seguridad": "/security",
  // Landings SEO
  "/software-de-libro-de-socios": "/software-partner-book",
  "/software-de-juntas-de-accionistas": "/software-shareholder-meetings",
  "/software-de-gestion-de-captable": "/software-captable-management",
  "/software-de-captable": "/software-captable",
  "/simulador-de-ampliacion-de-capital": "/capital-increase-simulator",
  "/secundario": "/secondary",
  "/junta-de-accionistas-digital": "/digital-shareholder-meetings",
  "/grupos-societarios": "/corporate-groups",
  "/documentacion-societaria": "/corporate-documentation",
  "/consejos-de-administracion": "/board-of-directors",
};

/**
 * /solutions no llega a ser un duplicado: app/solutions/ no tiene page.tsx, asi
 * que devuelve 404. Redirigirlo a /soluciones seria un 301 hacia otro 404.
 */
const SIN_PAGINA = ["/solutions"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/seedrocket.html",
        destination: "/",
        permanent: true,
      },
      // Caso de exito retirado. Va ANTES de la regla generica
      // /testimonials/:client para que no encadene dos saltos.
      {
        source: "/testimonios/:client(Yaba|yaba|YABA)",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/testimonials/:client(Yaba|yaba|YABA)",
        destination: "/",
        statusCode: 301,
      },
      // Carpeta interna -> slug publico castellano. 301 explicito (no
      // `permanent: true`, que en Next emite 308).
      ...Object.entries(ES_TO_FOLDER)
        .filter(([, folder]) => !SIN_PAGINA.includes(folder))
        .map(([es, folder]) => ({
          source: folder,
          destination: es,
          statusCode: 301,
        })),
      {
        source: "/testimonials/:client",
        destination: "/testimonios/:client",
        statusCode: 301,
      },
    ];
  },

  async rewrites() {
    return [
      ...Object.entries(ES_TO_FOLDER).map(([es, folder]) => ({
        source: es,
        destination: folder,
      })),
      { source: "/testimonios/:client", destination: "/testimonials/:client" },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
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
