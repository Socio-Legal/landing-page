import { routes } from "../routes";

export const metadata = {
  title: "Software Captable para Startups", // ej., "Nombre del Producto"
  description:
    "Soluciones de captable, planes incentivos y mucho más para tu startup", // ej., "Una breve descripción del producto o servicio"
  keywords: "startup, sttok, captable, phantoms, incentivos, beneficiarios ", // ej., "palabra_clave1, palabra_clave2, palabra_clave3"
};

export const hero = {
  title: "Solución para Startups", // ej., "Título Principal del Producto"
  description:
    "Gestión digital de Startups. Céntrate en hacer crecer la empresa y utiliza Sttok para cálculos de rondas, planes de incentivos, libro de socios, juntas, etc…", // ej., "Una descripción convincente del principal beneficio de tu producto"
  button: {
    text: "Solicitar Demo", // Texto del botón
    link: routes.APP_CALENDLY,
  },
  image: {
    light: "/hero/hero-solutions-startups.png", // ej., "https://ejemplo.com/imagen-hero-clara.jpg"
    dark: "/hero/hero-solutions-startups.png", // ej., "https://ejemplo.com/imagen-hero-oscura.jpg"
  },
};

export const clients = {
  title: "Confian en Sttok", // ej., "Nuestros Clientes de Confianza"
  clients: [
    "Factorial",
    "PldSpace",
    "Taxdown",
    "MyInvestor",
    "Shakers",
    "Barkibu",
    "Yaba",
    "Banktrack",
  ], // Lista de clientes
};

export const features = {
  title: "Todas las Características", // Título de la sección de características
  description:
    "Explora las características que hacen de Sttok una herramienta esencial para startups.", // Descripción de las características
  items: [
    {
      icon: "Icon01", // Ícono de la característica 1
      title: "Libro de Socios Oficial", // Título de la característica 1
      description:
        "Gestiona y actualiza fácilmente el libro de socios de tu startup.", // Descripción de la característica 1
    },
    {
      icon: "Icon02", // Ícono de la característica 2
      title: "Planes de Incentivos", // Título de la característica 2
      description:
        "Administra stock options y phantoms, y da acceso a los empleados a sus incentivos.", // Descripción de la característica 2
    },
    {
      icon: "Icon03", // Ícono de la característica 3
      title: "Juntas y Consejos", // Título de la característica 3
      description:
        "Automatiza la gestión de juntas de accionistas y consejos con votación digital y proxy.", // Descripción de la característica 3
    },
    {
      icon: "Icon04", // Ícono de la característica 4
      title: "Simulador de Operaciones", // Título de la característica 4
      description:
        "Calcula rondas de financiación y ampliaciones de capital con precisión y rapidez.", // Descripción de la característica 4
    },
    {
      icon: "Icon05", // ej., "Icon5"
      title: "Acceso a los socios", // ej., "Característica 5"
      description: "Si quieres puedes dar acceso profesional a tus inversores", // ej., "Descripción detallada de la característica 5"
    },
    {
      icon: "Icon06", // ej., "Icon6"
      title: "Sindicación", // ej., "Característica 6"
      description:
        "Configura la sindiación de forma fácil para simplificar la gestión de tu empresa", // ej., "Descripción detallada de la característica 6"
    },
  ],
};

export const testimonials = {
  title: "", // ej., "Lo que Dicen Nuestros Clientes"
  description: "", // ej., "Lee testimonios de clientes satisfechos"
  items: [
    {
      name: "Lucía Bouzá",
      role: "Head of Legal & Compliance | Factorial",
      img: "/logo-factorial-mini.png",
      description:
        "Sttok nos permite tener toda la información de socios y planes de incentivos centralizada y actualizada. Nos facilita la gestión de juntas y la relación con los inversores.",
      stars: 5,
    },
    {
      name: "Gerard Garcia",
      role: "CEO | Deale",
      img: "/logo-deale-mini.png",
      description:
        "Sttok nos permite gestionar de forma efectiva planes de incentivos para empleados, libro de socios, simulación de operaciones y juntas de accionistas.",
      stars: 5,
    },
    {
      name: "Johan Longo",
      role: "Contract Manager | PLD Space",
      img: "/logo-pldspace-mini.png",
      description:
        "Sttok nos sirve para poder tener organizada toda la información sobre socios, junas y planes de incentivos de nuestra empresa. Nos facilita la gestión del captable y la relación con los inversores.",
      stars: 5,
    },
    {
      name: "Nacho González",
      role: "CEO y Fundador | Banktrack",
      img: "/logo-banktrack-mini.png",
      description:
        "Ahora con Sttok puedes realizar simulaciones de ampliaciones o notas convertibles. Además también gestionamos las phantoms de nuestro equipo fácilmente. Finalmente como inversor tengo organizadas mis participadas y conozco claramente qué es lo que tengo.",
      stars: 5,
    },
  ],
};
