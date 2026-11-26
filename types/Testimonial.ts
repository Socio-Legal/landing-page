export type Testimonial = {
  name: string;
  role: string;
  img?: string;
  /** Logo de la empresa (clave de clientLogos) cuando no hay foto ni icono. */
  logo?: string;
  description: string;
  stars?: number;
  /**
   * Caso de cliente: el texto no es una cita del cliente, así que va sin
   * comillas y enlaza a su página de testimonio.
   */
  href?: string;
  linkText?: string;
};
