"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a este perfil.
const SELECCION = {
  "socios": [
    "Portal del accionista",
    "Certificados de titularidad y de valor",
    "Ficha del socio",
    "Equity Story"
  ],
  "juntas": [
    "Vista del socio",
    "Delegación de voto con firma",
    "Voto anticipado",
    "Convocatoria"
  ],
  "documentos": [
    "Comunicaciones certificadas",
    "Repositorio de documentos",
    "Firma electrónica",
    "Remitente propio"
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
