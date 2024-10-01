import Factorial from "@/public/logo-factorial.png";
import Yaba from "@/public/logo-yaba.png";
import Banktrack from "@/public/logo-banktrack.png";
import Andbank from "@/public/logo-andbank.png";
import Mailtrack from "@/public/logo-mailtrack.png";
import Broseta from "@/public/logo-broseta.png";
import DerechoCom from "@/public/logo-derechocom.png";
import Taxdown from "@/public/logo-taxdown.png";
import Deale from "@/public/logo-deale.png";
import PldSpace from "@/public/logo-pldspace.png";
import Keybotic from "@/public/logo-keybotic.png";
import MyInvestor from "@/public/logo-myinvestor.png";
import Shakers from "@/public/logo-shakers.png";
import Caballero from "@/public/logo-caballero1830.png";
import MasterChef from "@/public/logo-masterchefworld.png";
import Cabiedes from "@/public/logo-cabiedespartners.png";
import Incapto from "@/public/logo-incapto.png";
import LegalPigeon from "@/public/logo-legalpigeon.png";
import Criptan from "@/public/logo-criptan.png";
import Horizm from "@/public/logo-horizm.png";
import Psonrie from "@/public/logo-psonrie.png";
import Pwc from "@/public/logo-pwc.png";

type ClientLogo = keyof typeof clientLogos | string;

export const clientLogos = {
  Factorial: Factorial,
  Yaba: Yaba,
  Banktrack: Banktrack,
  Andbank: Andbank,
  Mailtrack: Mailtrack,
  Broseta: Broseta,
  DerechoCom: DerechoCom,
  Taxdown: Taxdown,
  Deale: Deale,
  PldSpace: PldSpace,
  Keybotic: Keybotic,
  MyInvestor: MyInvestor,
  Shakers: Shakers,
  Caballero: Caballero,
  MasterChef: MasterChef,
  Cabiedes: Cabiedes,
  Incapto: Incapto,
  LegalPigeon: LegalPigeon,
  Criptan: Criptan,
  Horizm: Horizm,
  Psonrie: Psonrie,
  Pwc: Pwc,
};

export const getClientLogo = (logo: ClientLogo) => {
  if (Object.keys(clientLogos).includes(logo)) {
    return clientLogos[logo as keyof typeof clientLogos];
  }
  return `https://cdn.magicui.design/companies/${logo}.svg`;
};
