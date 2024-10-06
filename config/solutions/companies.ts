import { routes } from "../routes";

export const metadata = {
  title: "Empresas y Grupos de Sociedades - Sttok", // ej., "Nombre del Producto"
  description:
    "Software de gestión societaria para emrpesas y grupos de emp`resas. Libro de Socios, Juntas de accionistas, etc.", // ej., "Una breve descripción del producto o servicio"
  keywords:
    "Libro de socios, Empresa, grupo de empresas, junta de accionistas, planes de incentivos, consejo de administración", // ej., "palabra_clave1, palabra_clave2, palabra_clave3"
};

export const hero = {
  title: "Solución para Empresas y Grupos de Sociedades", // ej., "Título Principal del Producto"
  description:
    "Gestión digital de sociedades para Empresas y Grupos de Sociedades. Automatiza la gestión societaria.", // ej., "Una descripción convincente del principal beneficio de tu producto"
  button: {
    text: "Solicitar Demo", // ej., "Comenzar"
    link: routes.APP_CALENDLY,
  },
  image: {
    light: "/hero/hero-solutions-empresas-grupos-empresas.png", // ej., "https://ejemplo.com/imagen-hero-clara.jpg"
    dark: "/hero/hero-solutions-empresas-grupos-empresas.png", // ej., "https://ejemplo.com/imagen-hero-oscura.jpg"
  },
};

export const clients = {
  title: "Empresas que confían en nosotros", // ej., "Nuestros Clientes de Confianza"
  clients: [
    "PldSpace",
    "Factorial",
    "Broseta",
    "Caballero",
    "Taxdown",
    "Yaba",
    "Andbank",
    "MyInvestor",
  ], // ej., ["Cliente1", "Cliente2", "Cliente3"]
};

export const features = {
  title: "Principales Funcionalidades", // ej., "Todas las Características"
  description:
    "Sttok digitaliza la gestión societaria para Empresas y Grupos de Sociedades, optimizando tareas clave como la administración del libro de socios, juntas de accionistas, consejos y planes de incentivos.", // ej., "Explora todas las características que hacen único a nuestro producto"
  items: [
    {
      icon: "Icon01", // ej., "Icon1"
      title: "Libro de Socios", // ej., "Característica 1"
      description:
        "Gestiona el libro de socios con datos siempre actualizados y accesibles.", // ej., "Descripción detallada de la característica 1"
    },
    {
      icon: "Icon02", // ej., "Icon2"
      title: "Planes de Incentivos", // ej., "Característica 2"
      description:
        "Automatiza la creación y gestión de stock options y otros planes de incentivos.", // ej., "Descripción detallada de la característica 2"
    },
    {
      icon: "Icon03", // ej., "Icon3"
      title: "Simulador de Operaciones", // ej., "Característica 3"
      description:
        "Calcula ampliaciones de capital y escenarios de inversión con precisión.", // ej., "Descripción detallada de la característica 3"
    },
    {
      icon: "Icon04", // ej., "Icon4"
      title: "Juntas de Accionistas", // ej., "Característica 4"
      description:
        "Convoca, vota y gestiona digitalmente juntas de accionistas.", // ej., "Descripción detallada de la característica 4"
    },
    {
      icon: "Icon05", // ej., "Icon5"
      title: "Consejos de Administración", // ej., "Característica 5"
      description:
        "Gestiona digitalmente las reuniones y votaciones del Consejo.", // ej., "Descripción detallada de la característica 5"
    },
    {
      icon: "Icon06", // ej., "Icon6"
      title: "Documentación Societaria", // ej., "Característica 6"
      description:
        "Genera y administra actas, certificados y otros documentos de manera automática.", // ej., "Descripción detallada de la característica 6"
    },
    {
      icon: "Icon07", // ej., "Icon7"
      title: "Firma digital", // ej., "Característica 6"
      description:
        "Firma digital integrada para poder firmar documentos de manera automática.", // ej., "Descripción detallada de la característica 6"
    },
    {
      icon: "Icon08", // ej., "Icon8"
      title: "Acceso para los socios", // ej., "Característica 6"
      description:
        "Puedes dar acceso a los inversores para que puedan tener disponible la documentación e información societaria.", // ej., "Descripción detallada de la característica 6"
    },
    {
      icon: "Icon09", // ej., "Icon9"
      title: "Portal del Inversor", // ej., "Característica 6"
      description:
        "Sttok te ofrece la posibilidad de tener el Portal del Inversor completamente integrado en tu página web", // ej., "Descripción detallada de la característica 6"
    },
  ],
};

export const testimonials = {
  title: "Testimonios de Clientes", // ej., "Lo que Dicen Nuestros Clientes"
  description: "Empresas que ya han mejorado su gestión societaria con Sttok.", // ej., "Lee testimonios de clientes satisfechos"
  items: [
    {
      name: "Lucía Bauza", // ej., "Juan Pérez"
      role: "Head of Legal & Compliance, Factorial", // ej., "CEO de Empresa A"
      img: "https://www.sttok.com/images/logos/logo-factorial-mini.png", // ej., "https://ejemplo.com/juan-perez.jpg"
      description:
        "Sttok nos ha permitido digitalizar el proceso de creación y firma de documentos para nuestros planes de incentivos", // ej., "Un testimonio brillante de Juan Pérez sobre nuestro producto"
      stars: 5, // ej., 5
    },
    {
      name: "Toni de Weest", // ej., "Roberto Rodríguez"
      role: "Abogado Socio, Broseta", // ej., "Fundador de Startup C"
      img: "https://www.sttok.com/images/logos/logo-broseta-mini.png", // ej., "https://ejemplo.com/roberto-rodriguez.jpg"
      description:
        "Utilizamos Sttok para gestionar digitalmente libros de socios de forma eficiente evitando tareas manuales inecesarias.", // ej., "Cómo nuestro producto ayudó a crecer la startup de Roberto Rodríguez"
      stars: 5, // ej., 5
    },
    {
      name: "Amalia Riboldi", // ej., "Ana Martínez"
      role: "Head of People & Cultura, Yaba", // ej., "Directora de Marketing en Empresa D"
      img: "https://www.sttok.com/images/logos/logo-yaba-mini.png", // ej., "https://ejemplo.com/ana-martinez.jpg"
      description:
        "Sttok fue nuestra mejor opción para gestionar los planes de incentivos y la información societaria de los socios.", // ej., "Las opiniones de Ana Martínez sobre el impacto de nuestro producto"
      stars: 5, // ej., 5
    },
  ],
};
