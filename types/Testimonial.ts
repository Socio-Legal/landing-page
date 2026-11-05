export type Testimonial = {
  name: string;
  role: string;
  img?: string;
  /** Logo de la empresa (clave de clientLogos) cuando no hay foto ni icono. */
  logo?: string;
  description: string;
  stars?: number;
};
