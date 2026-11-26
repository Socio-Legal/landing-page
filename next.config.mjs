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
  "/comunicaciones-y-firma": "/communications-signatures",
  "/simulador": "/operation-drafts",
  "/mercado-secundario": "/secondary-market",
  // Soluciones
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
};

/**
 * Landings SEO de una sola pagina que duplicaban paginas principales. Se
 * retiraron; cada slug redirige a la pagina que cubre el mismo tema.
 */
const LANDINGS_RETIRADAS = {
  "/software-de-libro-de-socios": "/libro-de-socios",
  "/software-de-captable": "/libro-de-socios",
  "/software-de-gestion-de-captable": "/libro-de-socios",
  "/software-de-juntas-de-accionistas": "/juntas-consejos",
  "/junta-de-accionistas-digital": "/juntas-consejos",
  "/simulador-de-ampliacion-de-capital": "/simulador",
  "/secundario": "/mercado-secundario",
  "/grupos-societarios": "/soluciones/grupos-de-sociedades",
  "/consejos-de-administracion": "/soluciones/secretaria-del-consejo",
  "/documentacion-societaria": "/producto",
  // Nunca fue una pagina: la seguridad vive en la politica de seguridad.
  "/seguridad": "/politica-seguridad",
  // Ficha retirada: la app no proyecta la votacion en la sala.
  "/funcionalidades/proyeccion-en-la-sala": "/funcionalidades/voto-electronico-en-juntas",
  "/funcionalidades/mayorias-y-derecho-de-separacion": "/funcionalidades/mayorias-y-quorum-reforzados",
};

/**
 * app/solutions/ sigue sin page.tsx: /solutions es solo un prefijo de ruta de
 * las cinco paginas de soluciones, no una URL. La seccion castellana vive en
 * app/soluciones/, que es una carpeta real sin rewrite detras.
 */
const SIN_PAGINA = ["/solutions"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Metadata sin streaming para todas las peticiones. Con streaming (por
   * defecto desde Next 15.2, salvo para los bots de htmlLimitedBots), Next
   * abre dos límites de Suspense vacíos en cada página y React los completa
   * con un script en línea que contiene la cadena "/$"; Googlebot la toma por
   * una URL y la reporta como 404 (Search Console, nov-2026). El renderizado
   * sigue siendo dinámico: solo cambia que el <head> sale completo de entrada.
   */
  htmlLimitedBots: /.*/,
  /**
   * La barra final la quita middleware.ts (308, como Next), pero DESPUES de
   * las redirecciones de URLs antiguas: la de Next va antes que todas y
   * encadenaba dos saltos en las URLs del blog, que acaban en «/».
   */
  skipTrailingSlashRedirect: true,
  /**
   * La Captura de los MDX lee con fs los PNG de public/funcionalidades, y el
   * trazado de archivos mete por eso todo public/ en cada función: unos 250 MB,
   * el límite de Vercel. En tiempo de ejecución solo se leen esos PNG; vídeos,
   * imágenes Open Graph y heroes los sirve la CDN.
   */
  outputFileTracingExcludes: {
    "/**": ["./public/animaciones/**/*", "./public/og/**/*", "./public/hero/**/*"],
  },
  /**
   * Las animaciones no llevan hash en el nombre: un día fresco en el navegador
   * y una semana sirviendo la copia guardada mientras se revalida. Sin esto
   * salen con max-age=0 y cada visita vuelve a preguntar por ellas. Para que
   * un vídeo regrabado no siga saliendo viejo, VideoTema les añade ?v=<huella>
   * (lib/animaciones-version.json, que regenera `pnpm build`).
   */
  async headers() {
    return [
      {
        source: "/:carpeta(animaciones|og)/:archivo*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  async redirects() {
    const redirecciones = [
      {
        // Landing heredada de la colaboracion con SeedRocket, la aceleradora.
        // El contenido equivalente hoy es la pagina de soluciones para
        // startups; la home no lo era.
        source: "/seedrocket.html",
        destination: "/startups",
        statusCode: 301,
      },
      // La web antigua servia la portada tambien como /index.html, y Google
      // la sigue pidiendo (404 en Search Console, nov-2026).
      { source: "/index.html", destination: "/", statusCode: 301 },
      // El resto de paginas de la web antigua iban en <slug>.html; el blog
      // todavia enlaza /privacidad.html (404 en Search Console, nov-2026).
      // Va despues de /index.html y /seedrocket.html, que tienen destino propio.
      { source: "/:slug([a-z0-9-]+).html", destination: "/:slug", statusCode: 301 },
      // Los articulos del blog (www.sttok.com/recursos/<slug> y todo
      // blog.sttok.com) los redirige middleware.ts: lib/blog-redirecciones.ts.
      // Casos de exito retirados. Apuntan al indice de casos, que es el
      // contenido equivalente mas cercano: la home no lo es, y un 301 a la
      // home para una pagina retirada es un soft 404.
      // Va ANTES de la regla generica /testimonials/:client para que no
      // encadene dos saltos.
      {
        source: "/testimonios/:client(Yaba|yaba|YABA|Banktrack|banktrack|DerechoCom|derechocom)",
        destination: "/testimonios",
        statusCode: 301,
      },
      {
        source: "/testimonials/:client(Yaba|yaba|YABA|Banktrack|banktrack|DerechoCom|derechocom)",
        destination: "/testimonios",
        statusCode: 301,
      },
      // Landings SEO retiradas: cada una 301 a la pagina principal de su tema.
      ...Object.entries(LANDINGS_RETIRADAS).map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301,
      })),
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
    // blog.sttok.com lo resuelve entero el middleware con un solo 301 a www.
    // Sin esta condicion, una regla de aqui (p. ej. /:slug.html) saltaria
    // antes en ese host y encadenaria dos redirecciones.
    return redirecciones.map((r) => ({
      ...r,
      missing: [{ type: "host", value: "blog\\.sttok\\.com" }],
    }));
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
