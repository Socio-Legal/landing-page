import Image from "next/image";

import Factorial from "@/public/logo-factorial.png";
import Yaba from "@/public/logo-yaba.png";
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

const companies = [
  "Factorial",
  "Yaba",
  "Mailtrack",
  "Broseta",
  "DerechoCom",
  "Taxdown",
  "Deale",
  "PldSpace",
  "Keybotic",
  "MyInvestor",
  "Shakers",
  "Caballero",
  "MasterChef",
  "Cabiedes",
  "Incapto",
  "LegalPigeon",
  "Criptan",
  "Horizm",
  "Psonrie",
  "Pwc",
];

const localImages = {
  Factorial,
  Yaba,
  Mailtrack,
  Broseta,
  DerechoCom,
  Taxdown,
  Deale,
  PldSpace,
  Keybotic,
  MyInvestor,
  Shakers,
  Caballero,
  MasterChef,
  Cabiedes,
  Incapto,
  LegalPigeon,
  Criptan,
  Horizm,
  Psonrie,
  Pwc,
};

const getLogo = (logo: keyof typeof localImages) => {
  if (Object.keys(localImages).includes(logo)) {
    return localImages[logo];
  }

  return `https://cdn.magicui.design/companies/${logo}.svg`;
};

export default function ClientSection() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            ALGUNOS DE NUESTROS CLIENTES
          </h3>
          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 xl:grid-cols-6 xl:gap-4">
              {companies.map((logo, index) => (
                <div
                  key={index}
                  className={`h-10 w-40 px-2 dark:brightness-0 dark:invert mb-8
                    ${
                      companies.length % 6 === 2 &&
                      index >= companies.length - 2
                        ? index === companies.length - 2
                          ? "xl:col-start-3"
                          : "xl:col-start-4"
                        : ""
                    }
                  `}
                >
                  <Image
                    src={getLogo(logo as keyof typeof localImages)}
                    alt={logo}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
            {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full bg-gradient-to-t from-white from-20% dark:from-black"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
