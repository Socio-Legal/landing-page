import Andbank from "@/public/logo-andbank.png";
import Banktrack from "@/public/logo-banktrack.png";
import Barkibu from "@/public/logo-barkibu.png";
import Broseta from "@/public/logo-broseta.png";
import Caballero from "@/public/logo-caballero1830.png";
import Cabiedes from "@/public/logo-cabiedespartners.png";
import Criptan from "@/public/logo-criptan.png";
import DealCar from "@/public/logo-dealcar.png";
import Deale from "@/public/logo-deale.png";
import DerechoCom from "@/public/logo-derechocom.png";
import Factorial from "@/public/logo-factorial.png";
import Horizm from "@/public/logo-horizm.png";
import Incapto from "@/public/logo-incapto.png";
import Keybotic from "@/public/logo-keybotic.png";
import LegalPigeon from "@/public/logo-legalpigeon.png";
import LetsLaw from "@/public/logo-letslaw.png";
import Mailtrack from "@/public/logo-mailtrack.png";
import MasterChef from "@/public/logo-masterchefworld.png";
import MyInvestor from "@/public/logo-myinvestor.png";
import PldSpace from "@/public/logo-pldspace.png";
import Psonrie from "@/public/logo-psonrie.png";
import Pwc from "@/public/logo-pwc.png";
import Shakers from "@/public/logo-shakers.png";
import Taxdown from "@/public/logo-taxdown.png";
import Yaba from "@/public/logo-yaba.png";

type ClientLogo = keyof typeof clientLogos | string;

export const clientLogos = {
  Andbank: Andbank,
  Banktrack: Banktrack,
  Barkibu: Barkibu,
  Broseta: Broseta,
  Caballero: Caballero,
  Cabiedes: Cabiedes,
  Criptan: Criptan,
  DealCar: DealCar,
  Deale: Deale,
  DerechoCom: DerechoCom,
  Factorial: Factorial,
  Horizm: Horizm,
  Incapto: Incapto,
  Keybotic: Keybotic,
  LegalPigeon: LegalPigeon,
  LetsLaw: LetsLaw,
  Mailtrack: Mailtrack,
  MasterChef: MasterChef,
  MyInvestor: MyInvestor,
  PldSpace: PldSpace,
  Psonrie: Psonrie,
  Pwc: Pwc,
  Shakers: Shakers,
  Taxdown: Taxdown,
  Yaba: Yaba,
};

export const getClientLogo = (logo: ClientLogo) => {
  if (Object.keys(clientLogos).includes(logo)) {
    return clientLogos[logo as keyof typeof clientLogos];
  }
  return `https://cdn.magicui.design/companies/${logo}.svg`;
};
