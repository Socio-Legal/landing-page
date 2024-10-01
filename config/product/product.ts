import { items } from "../landing/features-section";

export const metadata = {
  title: "Producto", // ej., "Nombre del Producto"
  description:
    "Todos los datos y documentación societaria actualizada en un único sitio. Gestiona socios, inversores, planes de incentivos, simulación de operaciones, juntas de accionistas, consejos, actas y escrituras en pocos minutos.", // ej., "Una breve descripción del producto o servicio"
  keywords:
    "planes de incentivos, phantoms, opciones sobre acciones, compensación flexible, gestión de incentivos, vesting", // ej., "palabra_clave1, palabra_clave2, palabra_clave3"
};

export const hero = {
  title: "Producto", // ej., "Título Principal del Producto"
  description:
    "Todos los datos y documentación societaria actualizada en un único sitio. Gestiona socios, inversores, planes de incentivos, simulación de operaciones, juntas de accionistas, consejos, actas y escrituras en pocos minutos.", // ej., "Una descripción convincente del principal beneficio de tu producto"
  button: {
    text: "Prueba ahora", // ej., "Comenzar"
    link: "/registro", // ej., "/registro" // TODO: connect to Hero section -> Demo Sttok login
  },
  image: {
    light:
      "https://www.sttok.com/wp-content/uploads/2023/11/Screenshot_39-768x730.png", // ej., "https://ejemplo.com/imagen-hero-clara.jpg"
    dark: "https://www.sttok.com/wp-content/uploads/2023/11/Screenshot_39-768x730.png", // ej., "https://ejemplo.com/imagen-hero-oscura.jpg"
  },
};

export const features = items; // TODO: open links of those with data
