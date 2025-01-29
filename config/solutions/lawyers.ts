import { routes } from "../routes";

export const metadata = {
  title: "Sttok para Abogados", // ej., "Nombre del Producto"
  description:
    "Software gestión sociedades para Abogados. Sttok te permite gestionar el libro de socios, planes de incentivos, juntas de accionistas, consejos de administración, etc.", // ej., "Una breve descripción del producto o servicio"
  keywords:
    "gestión societaria, abogados, captable, libro de socios, planes de incentivos, juntas de accionistas, consejos, testimonios", // ej., "palabra_clave1, palabra_clave2, palabra_clave3"
};

export const hero = {
  title: "Solución para Abogados", // ej., "Título Principal del Producto"
  description:
    "Con Sttok digitalizas la gestión de sociedades incrementando el número de sociedades que gestiona un abogado, ahorrando tiempo y evitando errores. Sttok te permite dar un mejor servicio a los clientes ganando tiempo y aportando valor.", // ej., "Una descripción convincente del principal beneficio de tu producto"
  button: {
    text: "Solicitar Demo", // ej., "Comenzar"
    link: routes.APP_CALENDLY,
  },
  image: {
    light: "/hero/hero-solutions-abogados.png", // ej., "https://ejemplo.com/imagen-hero-clara.jpg"
    dark: "/hero/hero-solutions-abogados.png", // ej., "https://ejemplo.com/imagen-hero-oscura.jpg"
  },
};

export const clients = {
  title: "Los abogados de estas empresas y despachos utilizan Sttok", // ej., "Nuestros Clientes de Confianza"
  clients: [
    "Multiverse",
    "DerechoCom",
    "LetsLaw",
    "Factorial",
    "PldSpace",
    "LegalPigeon",
  ], // ej., ["Cliente1", "Cliente2", "Cliente3"]
};

export const features = {
  title: "Funcionalidades Clave para Abogados", // ej., "Todas las Características"
  description:
    "Sttok permite a los abogados digitalizar la gestión de sociedades, optimizando tareas como el libro de socios, juntas de accionistas, Consejos o planes de incentivos.", // ej., "Explora todas las características que hacen único a nuestro producto"
  items: [
    {
      icon: "Icon01", // ej., "Icon1"
      title: "Libro de Socios", // ej., "Característica 1"
      description:
        "Gestiona digitalmente el libro de socios de manera eficiente y sin errores.", // ej., "Descripción detallada de la característica 1"
    },
    {
      icon: "Icon02", // ej., "Icon3"
      title: "Simulador de Operaciones", // ej., "Característica 3"
      description:
        "Realiza cálculos exactos para operaciones societarias en pocos minutos.", // ej., "Descripción detallada de la característica 3"
    },
    {
      icon: "Icon03", // ej., "Icon2"
      title: "Planes de Incentivos", // ej., "Característica 2"
      description:
        "Automatiza la gestión de stock options y otros planes de incentivos.", // ej., "Descripción detallada de la característica 2"
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
  ],
};

export const testimonials = {
  title: "Lo que Dicen Nuestros Clientes", // ej., "Lo que Dicen Nuestros Clientes"
  description: "Empresas que ya han mejorado su gestión societaria con Sttok.", // ej., "Lee testimonios de clientes satisfechos"
  items: [
    {
      name: "Patricia Manca", // ej., "María García"
      role: "Socia responsable de NewLaw, PwC", // ej., "CTO de Empresa B"
      description:
        "Sttok nos ayuda en la gestión digital de sociedades, facilitando la automatización de procesos críticos como juntas, captables y planes de incentivos.", // ej., "La experiencia positiva de María García con nuestro servicio"
      stars: 5, // ej., 5
    },
    {
      name: "Jose María Baños", // ej., "Roberto Rodríguez"
      role: "Abogado Socio, LetsLaw", // ej., "Fundador de Startup C"
      img: "/logo-letslaw-mini.png", // ej., "https://ejemplo.com/roberto-rodriguez.jpg"
      description:
        "Sttok ha automatizado gran parte de la gestión de sociedades, permitiéndonos ofrecer un mejor servicio a nuestros clientes.", // ej., "Cómo nuestro producto ayudó a crecer la startup de Roberto Rodríguez"
      stars: 5, // ej., 5
    },
  ],
};
