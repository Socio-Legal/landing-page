"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a este perfil.
const SELECCION = {
  "grupos": [
    "Portada multisociedad",
    "Trabajos en varias sociedades",
    "Colecciones de sociedades",
    "Permisos por sociedad"
  ],
  "socios": [
    "Libro de socios oficial",
    "Lectura de escrituras con IA",
    "Registro de operaciones",
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
    "Cargos con vigencia"
  ],
  "apoderados": [
    "Apoderados y poderes",
    "Comisiones del consejo"
  ],
  "simulador": [
    "Ampliación de capital",
    "Reducción de capital",
    "Compraventa",
    "Operaciones encadenadas",
    "Borradores de documentos"
  ],
  "documentos": [
    "Libros de actas",
    "Legalización del libro registro",
    "Reglas de la sociedad"
  ],
  "firma": [
    "Firma electrónica",
    "Todas las firmas de un clic"
  ],
  "clientes": [
    "Para clientes exigentes y digitales",
    "Acceso del cliente, opcional",
    "Acceso de los socios del cliente, opcional",
    "Con el logo del despacho, opcional"
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
