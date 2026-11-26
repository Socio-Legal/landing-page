"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a este perfil.
const SELECCION = {
  "socios": [
    "Portal del accionista",
    "Certificados de titularidad y de valor",
    "Ficha del socio"
  ],
  "juntas": [
    "Vista del socio",
    "Delegación de voto con firma",
    "Asistencia y quórum",
    "Convocatoria"
  ],
  "comunicaciones": [
    "Comunicaciones certificadas",
    "Remitente propio"
  ],
  "firma": [
    "Firma electrónica",
    "Todas las firmas de un clic"
  ],
  "documentos": [
    "Documentos de cada socio"
  ],
  "plataforma": [
    "Personalización",
    "Roles",
    "Usuarios y permisos",
    "Inicio de sesión con Google y Microsoft"
  ]
};

const Page = () => (
  <ModulePage
    ns="solutions-investors-dashboard-page"
    modulos={Object.keys(SELECCION)}
    seleccion={SELECCION}
  />
);

export default Page;
