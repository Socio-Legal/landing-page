"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a este perfil.
const SELECCION = {
  "participadas": [
    "Detalle de la participación",
    "Ficha del accionista",
    "Participadas",
    "Diagrama del grupo",
    "Documentación y escrituras"
  ],
  "socios": [
    "Libro de socios oficial",
    "Clases de acciones",
    "Registro de operaciones",
    "Certificados de titularidad y de valor"
  ],
  "simulador": [
    "Ampliación de capital",
    "Nota convertible",
    "Operaciones encadenadas",
    "Cascada de liquidación"
  ],
  "firma": [
    "Firma electrónica",
    "Todas las firmas de un clic"
  ],
  "vehiculos": [
    "SPV (special purpose vehicle)",
    "SICAV",
    "SICC",
    "SCR",
    "Sociedades de inversión inmobiliaria",
    "Crowdfunding y SPV con muchos accionistas"
  ]
};

const Page = () => (
  <ModulePage
    ns="solutions-investors-page"
    modulos={Object.keys(SELECCION)}
    seleccion={SELECCION}
  />
);

export default Page;
