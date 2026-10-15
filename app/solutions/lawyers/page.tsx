"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a este perfil.
const SELECCION = {
  "grupos": [
    "Todas las sociedades en una portada",
    "Trabajos en varias sociedades",
    "Colecciones de sociedades",
    "Permisos por sociedad"
  ],
  "socios": [
    "Libro de socios oficial",
    "Lectura de escrituras con IA",
    "Transmisiones",
    "Certificados de titularidad y de valor"
  ],
  "juntas": [
    "Convocatoria",
    "Delegación de voto con firma",
    "Acta automática",
    "Certificación de acuerdos"
  ],
  "consejo": [
    "Convocar el consejo",
    "Acta y certificación",
    "Cargos con vigencia",
    "Apoderados y poderes"
  ],
  "simulador": [
    "Ampliación de capital",
    "Compraventa",
    "Operaciones encadenadas",
    "Borradores de documentos"
  ],
  "documentos": [
    "Libros de actas",
    "Legalización del libro registro",
    "Reglas de la sociedad",
    "Firma electrónica"
  ]
};

const Page = () => (
  <ModulePage
    ns="solutions-lawyers-page"
    modulos={Object.keys(SELECCION)}
    seleccion={SELECCION}
  />
);

export default Page;
