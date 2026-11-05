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
  "socios": [
    "Ficha del socio",
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
  "secundario": [
    "Ofertas de compra y de venta",
    "Listado de ofertas",
    "Validación, KYC y contratos"
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
