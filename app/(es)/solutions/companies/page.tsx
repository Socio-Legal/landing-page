"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a este perfil.
const SELECCION = {
  "socios": [
    "Libro de socios oficial",
    "Registro de operaciones",
    "Cargas sobre participaciones",
    "Certificados de titularidad y de valor",
    "Portal del accionista",
    "Ficha del socio"
  ],
  "juntas": [
    "Convocatoria",
    "Asistencia y quórum",
    "Delegación de voto con firma",
    "Acta automática"
  ],
  "consejo": [
    "Convocar el consejo",
    "Acta y certificación",
    "Cargos con vigencia"
  ],
  "comunicaciones": [
    "Comunicaciones certificadas",
    "Certificado de envío"
  ],
  "firma": [
    "Firma electrónica",
    "Todas las firmas de un clic",
    "Archivo automático"
  ],
  "documentos": [
    "Repositorio de documentos",
    "Legalización del libro registro"
  ],
  "apoderados": [
    "Apoderados y poderes",
    "Comisiones del consejo"
  ],
  "grupos": [
    "Portada multisociedad",
    "Participadas",
    "Diagrama del grupo",
    "Titular real",
    "Sociedades que son socias de otras",
    "Permisos por sociedad"
  ]
};

const Page = () => (
  <ModulePage
    ns="solutions-companies-page"
    modulos={Object.keys(SELECCION)}
    seleccion={SELECCION}
  />
);

export default Page;
