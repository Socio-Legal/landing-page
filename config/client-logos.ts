import Axa from "@/public/logo-axa.png";
import Andbank from "@/public/logo-andbank.png";
import Banktrack from "@/public/logo-banktrack.png";
import Barkibu from "@/public/logo-barkibu.png";
import Broseta from "@/public/logo-broseta.png";
import Caballero from "@/public/logo-caballero1830.png";
import Cabiedes from "@/public/logo-cabiedespartners.png";
import Criptan from "@/public/logo-criptan.png";
import DerechoCom from "@/public/logo-derechocom.png";
import Factorial from "@/public/logo-factorial.png";
import Fanalca from "@/public/logo-fanalca.png";
import Gazelle from "@/public/logo-gazelle.png";
import Horizm from "@/public/logo-horizm.png";
import Keybotic from "@/public/logo-keybotic.png";
import LegalPigeon from "@/public/logo-legalpigeon.png";
import LetsLaw from "@/public/logo-letslaw.png";
import Multiverse from "@/public/logo-multiverse.svg";
import MyInvestor from "@/public/logo-myinvestor.png";
import Osborne from "@/public/logo-osborne.svg";
import PldSpace from "@/public/logo-pldspace.png";
import Psonrie from "@/public/logo-psonrie.png";
import Sade from "@/public/logo-sade.png";
import Shakers from "@/public/logo-shakers.png";
import Taxdown from "@/public/logo-taxdown.png";

type ClientLogo = keyof typeof clientLogos | string;

export const clientLogos = {
  Axa: Axa,
  Andbank: Andbank,
  Banktrack: Banktrack,
  Barkibu: Barkibu,
  Broseta: Broseta,
  Caballero: Caballero,
  Cabiedes: Cabiedes,
  Criptan: Criptan,
  DerechoCom: DerechoCom,
  Factorial: Factorial,
  Fanalca: Fanalca,
  Gazelle: Gazelle,
  Horizm: Horizm,
  Keybotic: Keybotic,
  LegalPigeon: LegalPigeon,
  LetsLaw: LetsLaw,
  MyInvestor: MyInvestor,
  Multiverse: Multiverse,
  Osborne: Osborne,
  PldSpace: PldSpace,
  Psonrie: Psonrie,
  Sade: Sade,
  Shakers: Shakers,
  Taxdown: Taxdown,
};

// Nombre comercial de cada cliente, para el texto alternativo del logo.
const clientNames: Partial<Record<keyof typeof clientLogos, string>> = {
  Axa: "AXA",
  Caballero: "Grupo Caballero",
  Cabiedes: "Cabiedes & Partners",
  DerechoCom: "Derecho.com",
  LegalPigeon: "Legal Pigeon",
  Multiverse: "Multiverse Computing",
  PldSpace: "PLD Space",
  Taxdown: "TaxDown",
};

export const getClientName = (logo: ClientLogo) =>
  clientNames[logo as keyof typeof clientLogos] ?? logo;

// Corrección óptica: logos en negrita y recortados al borde que, en la misma
// caja, pesan bastante más que el resto de la tira; y Multiverse, muy
// apaisado y de trazo fino, que se queda pequeño.
const logoScale: Partial<Record<keyof typeof clientLogos, number>> = {
  Barkibu: 0.75,
  // Gazelle: mas cuadrado (3:1) que el resto, se queda pequeno en la misma caja.
  Gazelle: 1.3,
  Multiverse: 1.2,
  Sade: 0.65,
};

export const getClientLogoScale = (logo: ClientLogo) =>
  logoScale[logo as keyof typeof clientLogos] ?? 1;

export const getClientLogo =(logo: ClientLogo) => {
  // Solo logos locales del repositorio: nada de CDNs externos.
  return clientLogos[logo as keyof typeof clientLogos]?.src ?? "";
};
