"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a este perfil.
const SELECCION = {
  "socios": [
    "Libro de socios oficial",
    "Transmisiones",
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
    "Cargos con vigencia",
    "Apoderados y poderes"
  ],
  "grupos": [
    "Todas las sociedades en una portada",
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
