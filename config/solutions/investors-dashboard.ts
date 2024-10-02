import { routes } from "../routes";

export const metadata = {
  title: "Portal del Inversor", // ej., "Nombre del Producto"
  description:
    "Descubre las soluciones que ofrecemos para los inversores y empresas para dar acceso a sus accionistas", // ej., "Una breve descripción del producto o servicio"
  keywords:
    "inversores, participadas, cartera, captable, gestión documental, simulador de operaciones, portal del inversor", // ej., "palabra_clave1, palabra_clave2, palabra_clave3"
};

export const hero = {
  title: "Portal para inversores", // ej., "Título Principal del Producto"
  description:
    "Da acceso a tus inversores a un portal único con toda su información detallada. Dispondrán de su ficha de socio personalizada, número de participaciones y % exacto. Integra el Portal del Inversor con el diseño e imagen de la web de la empresa.", // ej., "Una descripción convincente del principal beneficio de tu producto"
  button: {
    text: "Solicitar Demo", // ej., "Comenzar"
    link: routes.APP_CALENDLY,
  },
  image: {
    light: "", // ej., "https://ejemplo.com/imagen-hero-clara.jpg"
    dark: "", // ej., "https://ejemplo.com/imagen-hero-oscura.jpg"
  },
};

export const clients = {
  title: "Empresas que confían en nosotros", // ej., "Nuestros Clientes de Confianza"
  clients: [
    "PldSpace",
    "Factorial",
    "MyInvestor",
    "Deale",
    "Yaba",
    "Taxdown",
    "Caballero",
    "Andbank",
  ], // ej., ["Cliente1", "Cliente2", "Cliente3"]
};

export const features = {
  title: "Principales Funcionalidades para Inversores", // ej., "Todas las Características"
  description:
    "Sttok ofrece un portal personalizado para inversores, proporcionando acceso a la cartera de participadas con datos actualizados y exactos.", // ej., "Explora todas las características que hacen único a nuestro producto"
  items: [
    {
      icon: "Icon01", // ej., "Icon1"
      title: "Acceso a los socios", // ej., "Característica 1"
      description:
        "Consulta los datos del captable, escrituras y otras documentaciones clave en tiempo real.", // ej., "Descripción detallada de la característica 1"
    },
    {
      icon: "Icon02", // ej., "Icon2"
      title: "Ficha del Socio", // ej., "Característica 2"
      description:
        "Cada socio tendrá acceso a su ficha con sus documentos y certificados.", // ej., "Descripción detallada de la característica 2"
    },
    {
      icon: "Icon03", // ej., "Icon3"
      title: "Integración con tu web", // ej., "Característica 3"
      description:
        "Integra el portal del inversor con tu imagen, colores, logoos, etc.", // ej., "Descripción detallada de la característica 3"
    },
  ],
};

export const testimonials = {
  title: "Lo que Dicen Nuestros Inversores", // ej., "Lo que Dicen Nuestros Clientes"
  description: "Inversores que ya han mejorado su gestión con Sttok.", // ej., "Lee testimonios de clientes satisfechos"
  items: [
    {
      name: "Lucía Bauza", // ej., "Juan Pérez"
      role: "Head of Legal & Compliance, Factorial", // ej., "CEO de Empresa A"
      img: "", // ej., "https://ejemplo.com/juan-perez.jpg"
      description:
        "Sttok nos ayudó a digitalizar el proceso de creación y firma de documentos para los planes de incentivos.", // ej., "Un testimonio brillante de Juan Pérez sobre nuestro producto"
      stars: 5, // ej., 5
    },
    {
      name: "Gerard Garcia",
      role: "CEO | Deale",
      img: "https://www.sttok.com/images/logos/logo-deale-mini.png",
      description:
        "Sttok nos permite gestionar de forma efectiva planes de incentivos para empleados, libro de socios, simulación de operaciones y juntas de accionistas.",
      stars: 5,
    },
    {
      name: "Johan Longo",
      role: "Contract Manager | PLD Space",
      img: "https://www.sttok.com/images/logos/logo-pld-mini.png",
      description:
        "Sttok nos sirve para poder tener organizada toda la información sobre socios, junas y planes de incentivos de nuestra empresa. Nos facilita la gestión del captable y la relación con los inversores.",
      stars: 5,
    },
    {
      name: "Nacho González",
      role: "CEO y Fundador | Banktrack",
      img: "https://www.sttok.com/images/logos/logo-banktrack-mini.png",
      description:
        "Ahora con Sttok puedes realizar simulaciones de ampliaciones o notas convertibles. Además también gestionamos las phantoms de nuestro equipo fácilmente. Finalmente como inversor tengo organizadas mis participadas y conozco claramente qué es lo que tengo.",
      stars: 5,
    },
  ],
};
