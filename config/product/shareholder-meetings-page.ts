import { routes } from "../routes";

export const metadata = {
  title: "Juntas y Consejos", // ej., "Nombre del Producto"
  description:
    "Gestiona juntas y consejos de administración de manera eficiente con Sttok, incluyendo convocatorias, delegaciones, votos y actas.", // ej., "Una breve descripción del producto o servicio"
  keywords:
    "juntas de socios, consejos de administración, gestión digital de juntas, convocatorias, delegaciones de voto, actas digitales", // ej., "palabra_clave1, palabra_clave2, palabra_clave3"
};

export const hero = {
  title: "Juntas y Consejos", // ej., "Título Principal del Producto"
  description:
    "En Sttok, entendemos la importancia de las juntas y consejos para el buen funcionamiento y toma de decisiones en una empresa. Con Sttok podrás convocar, gestionar delegaciones, votaciones y generar las actas y certificados de forma digital y en pocos minutos.", // ej., "Una descripción convincente del principal beneficio de tu producto"
  button: {
    text: "Gestiona tu Junta", // ej., "Comenzar"
    link: routes.APP_DEMO, // ej., "/registro"
  },
  image: {
    light: "/hero/hero-product-juntas-consejos.png", // ej., "https://ejemplo.com/imagen-hero-clara.jpg"
    dark: "/hero/hero-product-juntas-consejos.png", // ej., "https://ejemplo.com/imagen-hero-oscura.jpg"
  },
};

export const topFeatures = {
  title: "Características Principales", // ej., "Características Principales"
  description:
    "Optimiza la gestión de juntas y consejos con herramientas que simplifican cada paso del proceso.", // ej., "Descubre lo que hace destacar a nuestro producto"
  items: [
    {
      title: "Convocatoria Digital", // ej., "Característica 1"
      description:
        "Envía convocatorias digitales con toda la información necesaria a tus accionistas y consejeros en un clic.", // ej., "Descripción de la característica 1"
      icon: "", // ej., "Utilizar este o Animation"
      animation: "AnimatedBeam01_ShareholderMeeting", // ej., "Utilizar este o Icon"
      image: "", // Imagen para la característica 1
    },
    {
      // TODO: update icons left and avatars right
      title: "Gestión de Votos y Delegaciones", // ej., "Característica 2"
      description:
        "Permite a los accionistas delegar sus votos y gestionar las votaciones de manera segura y transparente.", // ej., "Descripción de la característica 2"
      icon: "", // ej., "Utilizar este o Animation"
      animation: "AnimatedBeam03", // ej., "Utilizar este o Icon"
      image: "", // Imagen para la característica 2
    },
    {
      title: "Generación Automática de Actas", // ej., "Característica 3"
      description:
        "Crea actas de reuniones y certificados de acuerdos de manera automática y en pocos minutos.", // ej., "Descripción de la característica 3"
      icon: "", // ej., "Utilizar este o Animation"
      animation: "AnimatedDocScanner", // ej., "Utilizar este o Icon"
      image: "", // Imagen para la característica 3
    },
  ],
};

export const clients = {
  title: "CLIENTES QUE UTILIZAN EL LIBRO DE SOCIOS",
  clients: [
    "Factorial",
    "Shakers",
    "Yaba",
    "Taxdown",
    "PldSpace",
    "MyInvestor",
    "Broseta",
    "Barkibu",
    "DealCar",
  ],
};

export const features = {
  title: "Todas las Características", // ej., "Todas las Características"
  description:
    "Explora todas las características que hacen único a nuestro producto.", // ej., "Explora todas las características que hacen único a nuestro producto"
  items: [
    {
      icon: "Icon01", // ej., "Icon1"
      title: "Convocatoria de Juntas", // ej., "Característica 1"
      description:
        "Crea y envía convocatorias de juntas a accionistas y consejeros de forma digital, con todos los detalles relevantes.", // ej., "Descripción detallada de la característica 1"
    },
    {
      icon: "Icon02", // ej., "Icon2"
      title: "Delegaciones Digitales de Voto ", // ej., "Característica 2"
      description:
        "Facilita la delegación de votos de forma segura, permitiendo a los socios representar sus intereses en las reuniones.", // ej., "Descripción detallada de la característica 2"
    },
    {
      icon: "Icon03", // ej., "Icon3"
      title: "Votaciones Electrónicas", // ej., "Característica 3"
      description:
        "Gestiona votaciones de acuerdos con total transparencia y eficiencia, garantizando resultados en tiempo real.", // ej., "Descripción detallada de la característica 3"
    },
    {
      icon: "Icon04", // ej., "Icon4"
      title: "Actas Automáticas", // ej., "Característica 4"
      description:
        "Genera actas y certificados de acuerdos al finalizar cada reunión, ahorrando tiempo y eliminando errores.", // ej., "Descripción detallada de la característica 4"
    },
    {
      icon: "Icon05", // ej., "Icon5"
      title: "Certificaciones", // ej., "Característica 5"
      description:
        "Generación automática de certificaciones de convocatoria, delegaciones y votaciones.", // ej., "Descripción detallada de la característica 5"
    },
    {
      icon: "Icon06", // ej., "Icon6"
      title: "Historial de Reuniones", // ej., "Característica 6"
      description:
        "Accede al historial completo de todas las reuniones y acuerdos anteriores, todo almacenado en la nube.", // ej., "Descripción detallada de la característica 6"
    },
  ],
};

export const testimonials = {
  title: "Lo que Dicen Nuestros Clientes", // ej., "Lo que Dicen Nuestros Clientes"
  description:
    "Lee testimonios de clientes satisfechos que usan Sttok para Juntas o Consejos.", // ej., "Lee testimonios de clientes satisfechos"
  items: [
    {
      name: "Johan Longo",
      role: "Contract Manager | PLD Space",
      img: "https://www.sttok.com/images/logos/logo-pld-mini.png",
      description:
        "Sttok nos sirve para poder tener organizada toda la información sobre socios, junas y planes de incentivos de nuestra empresa. Nos facilita la gestión del captable y la relación con los inversores.",
      stars: 5,
    },
    {
      name: "Lucía Bouzá",
      role: "Head of Legal & Compliance | Factorial",
      img: "https://www.sttok.com/images/logos/logo-factorial-mini.png",
      description:
        "Sttok nos permite tener toda la información de socios y planes de incentivos centralizada y actualizada. Nos facilita la gestión de juntas y la relación con los inversores.",
      stars: 5,
    },
    {
      name: "Oriol Miralbell", // ej., "María García"
      role: "CEO | Legalpigeon", // ej., "CTO de Empresa B"
      img: "https://www.sttok.com/images/logos/logo-legalpigeon-mini.png", // ej., "https://ejemplo.com/maria-garcia.jpg"
      description:
        "Sttok te permite calcular valoraciones, rondas de inversión y simulaciones fácilmente. La interfaz de la aplicación es sencilla e intuitiva, lo que  te permite tomar decisiones de manera más ágil y eficaz.",
      stars: 4, // ej., 4
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
