"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a este perfil.
const SELECCION = {
  "grupos": [
    "Participadas",
    "Diagrama del grupo",
    "Comparar fechas",
    "Cuentas depositadas"
  ],
  "participadas": [
    "Ficha del accionista",
    "Detalle de la participación",
    "Documentación y escrituras"
  ],
  "socios": [
    "Clases de acciones",
    "Acreedores y notas convertibles",
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
