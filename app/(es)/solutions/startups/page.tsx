"use client";

import ModulePage from "@/components/product/module-page";

// Por módulo, las funcionalidades del catálogo que importan a una scale-up.
const SELECCION = {
  "socios": [
    "Libro de socios oficial",
    "Clases de acciones",
    "Acreedores y notas convertibles",
    "Certificados de titularidad y de valor",
    "Portal del accionista",
    "Equity Story"
  ],
  "incentivos": [
    "Phantom shares y stock options",
    "Cartas de invitación en bloque",
    "Vesting y cliff",
    "Tender offers",
    "Fully diluted y cap table",
    "Portal del beneficiario"
  ],
  "simulador": [
    "Ampliación de capital",
    "Nota convertible",
    "Operaciones encadenadas",
    "Cascada de liquidación",
    "Borradores de documentos"
  ],
  "secundario": [
    "Lo activa la sociedad",
    "Ofertas de compra y de venta",
    "Validación, KYC y contratos"
  ],
  "juntas": [
    "Convocatoria",
    "Delegación de voto con firma",
    "Voto anticipado",
    "Acta automática"
  ]
};

// Primero las scale-ups y las empresas tecnológicas.
const LOGOS = {
  primary: [
    "Factorial",
    "Multiverse",
    "PldSpace",
    "Semidynamics",
    "Taxdown",
    "MyInvestor",
    "Axa",
    "Andbank",
    "Osborne",
  ],
  secondary: [
    "Fanalca",
    "Caballero",
    "DerechoCom",
    "Shakers",
    "Cabiedes",
    "LegalPigeon",
    "Banktrack",
    "Barkibu",
    "Sade",
  ],
} as const;

const Page = () => (
  <ModulePage
    ns="solutions-startups-page"
    modulos={Object.keys(SELECCION)}
    seleccion={SELECCION}
    logos={{ primary: [...LOGOS.primary], secondary: [...LOGOS.secondary] }}
  />
);

export default Page;
