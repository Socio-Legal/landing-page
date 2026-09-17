import { FC } from "react";

/**
 * Emite un bloque de datos estructurados en el HTML del servidor. Se usa
 * desde Server Components (layouts y pages), nunca desde cliente, para que
 * el JSON-LD viaje en la primera respuesta y lo lea cualquier crawler.
 */
const JsonLd: FC<{ data: object }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
