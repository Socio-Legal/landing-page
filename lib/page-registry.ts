import type { ComponentType } from "react";

import PageHome from "@/app/(landing)/page";
import PageAbogados from "@/app/solutions/lawyers/page";
import PageAvisoLegal from "@/app/(legal)/disclaimer/page";
import PageEmpresas from "@/app/solutions/companies/page";
import PageInversores from "@/app/solutions/investors/page";
import PageJuntasConsejos from "@/app/(product)/shareholder-meetings/page";
import PageLibroDeSocios from "@/app/(product)/partners-book/page";
import PageMercadoSecundario from "@/app/(product)/secondary-market/page";
import PagePlanesDeIncentivos from "@/app/(product)/incentive-plans/page";
import PagePoliticaSeguridad from "@/app/(legal)/security/page";
import PagePortalDelInversor from "@/app/solutions/investors-dashboard/page";
import PagePrecios from "@/app/pricing/page";
import PagePrivacidad from "@/app/(legal)/privacy/page";
import PageProducto from "@/app/(product)/product/page";
import PageRecursos from "@/app/resources/page";
import PageSimulador from "@/app/(product)/operation-drafts/page";
import PageSobreNosotros from "@/app/sobre-nosotros/page";
import PageStartups from "@/app/solutions/startups/page";
import PageSttokVsExcel from "@/app/sttok-vs-excel/page";
import PageTestimonios from "@/app/testimonials/page";
import type { Locale } from "@/lib/locales";

/**
 * Registro de paginas con version en varios idiomas.
 *
 * La clave es SIEMPRE la ruta publica castellana, la misma que usa ROUTE_MAP.
 * Cada entrada declara el componente —compartido entre idiomas, el contenido
 * lo resuelve la instancia i18n del layout raiz— y la metadata propia de cada
 * idioma no castellano.
 *
 * Generado la primera vez desde los layouts de app/en/**, que es donde vivia
 * esta metadata repetida en 20 archivos. A partir de aqui se edita a mano:
 * añadir un idioma a una pagina es añadir una clave en "meta".
 */
export type PageMeta = {
  title: string;
  description: string;
  keywords?: string;
};

export type PageEntry = {
  Component: ComponentType;
  meta: Partial<Record<Locale, PageMeta>>;
  /** Emite la ficha SoftwareApplication del producto Sttok, con sus planes. */
  softwareApplication?: boolean;
  /**
   * Pagina de un modulo de producto: emite ademas su propia ficha
   * SoftwareApplication, atada a la del producto con isPartOf.
   */
  productModule?: boolean;
};

export const PAGE_REGISTRY: Record<string, PageEntry> = {
  "/": {
    Component: PageHome,
    meta: {
      en: {
        title: "Sttok — Corporate management software: cap table, meetings & incentives",
        description: "Corporate management software: shareholder registry (cap table), incentive plans, meetings, boards and operations simulator. ISO 27001 and GDPR. 250+ companies trust Sttok.",
        keywords:
          "corporate management software, shareholder registry, cap table, incentive plans, shareholder meetings, corporate governance, equity management",
      },
    },
    // La portada emitia la ficha de producto desde app/en/page.tsx, no desde
    // su layout, asi que no la recogio la extraccion inicial.
    softwareApplication: true,
  },
  "/abogados": {
    Component: PageAbogados,
    meta: {
      en: {
        title: "Shareholder registers, meetings and minutes for law firms and corporate advisers",
        description: "Every company the firm manages on one screen: shareholder registers and minute books, meetings, certificates and register legalisation, with permissions per company.",
      keywords: "corporate management, lawyers, captable, shareholder register, incentive plans, shareholder meetings, boards, testimonials",
      },
    },
  },
  "/aviso-legal": {
    Component: PageAvisoLegal,
    meta: {
      en: {
        title: "Legal Notice and General Terms and Conditions",
        description: "Legal notice for Sttok Barcelona, S.L.: site ownership, terms of use and intellectual property.",
      },
    },
  },
  "/empresas": {
    Component: PageEmpresas,
    meta: {
      en: {
        title: "Shareholder register, meetings and board for companies with many shareholders and groups",
        description: "Corporate records for every company in the group: register with encumbrances and co-owners, general meeting, board, officers with terms and beneficial owner, with permissions per company.",
      keywords: "Shareholder Register, Company, corporate group, shareholder meeting, incentive plans, board of directors",
      },
    },
  },
  "/inversores": {
    Component: PageInversores,
    meta: {
      en: {
        title: "Investee tracking for funds, family offices and holding companies",
        description: "Investees with their percentage and value, chain of control on any date, and simulation of capital increases, convertible notes and sales.",
      keywords: "investors, investees, portfolio, captable, shareholder register, investor",
      },
    },
  },
  "/juntas-consejos": {
    Component: PageJuntasConsejos,
    meta: {
      en: {
        title: "General meetings and board of directors: notice, voting and minutes",
        description: "Notice, signed proxies, early and live voting, quorum, minutes and certification for the general meeting and the board of directors.",
      keywords: "shareholder meetings, board meetings, digital meeting management, convocations, vote delegations, digital minutes",
      },
    },
    softwareApplication: true,
    productModule: true,
  },
  "/libro-de-socios": {
    Component: PageLibroDeSocios,
    meta: {
      en: {
        title: "Digital shareholder register: numbered share ranges, encumbrances and certificates",
        description: "Sttok keeps the shareholder register as the official record, with transfers by share range, encumbrances, co-owners and certificates, exportable for legalisation.",
      keywords: "Shareholder Register, Shareholders, Registry, Operations, Excel",
      },
    },
    softwareApplication: true,
    productModule: true,
  },
  "/mercado-secundario": {
    Component: PageMercadoSecundario,
    meta: {
      en: {
        title: "Secondary market for shares between shareholders",
        description: "Share sales between shareholders and purchase offers to several shareholders at once, recorded in the shareholder register with their documents. Add-on module.",
      keywords: "secondary market, share transfers, tender offer, liquidity",
      },
    },
    softwareApplication: true,
    productModule: true,
  },
  "/planes-de-incentivos": {
    Component: PagePlanesDeIncentivos,
    meta: {
      en: {
        title: "Incentive plans: phantom shares and stock options",
        description: "Pool approved by the general meeting, grants, vesting, invitation letters, beneficiary portal and tender offers, calculated on the actual shareholder register.",
      keywords: "incentive plans, phantoms, stock options, flexible compensation, incentive management, vesting",
      },
    },
    softwareApplication: true,
    productModule: true,
  },
  "/politica-seguridad": {
    Component: PagePoliticaSeguridad,
    meta: {
      en: {
        title: "Security Policy",
        description: "Sttok's Information Security Policy: ISO 27001 certification, GDPR compliance, encryption, European hosting and the confidentiality, integrity and availability of information.",
      },
    },
  },
  "/portal-del-inversor": {
    Component: PagePortalDelInversor,
    meta: {
      en: {
        title: "Investor portal: each shareholder's position, certificates and meetings",
        description: "Each shareholder and investor with their own access and the company's branding: their position, their certificates, the meeting and communications with proof of delivery.",
      keywords: "investors, investees, portfolio, captable, document management, operations simulator, investor portal",
      },
    },
  },
  "/precios": {
    Component: PagePrecios,
    meta: {
      en: {
        title: "Pricing — Sttok corporate management software",
        description: "Plans from €450 per company per year. Shareholder registry, incentive plans, meetings and boards. No implementation cost, setup in a few hours per company.",
      keywords: "corporate management pricing, cap table software pricing, shareholder registry software",
      },
    },
    softwareApplication: true,
  },
  "/privacidad": {
    Component: PagePrivacidad,
    meta: {
      en: {
        title: "Privacy and Cookies",
        description: "Sttok’s privacy policy: what data is processed, on what legal basis and how to exercise your rights.",
      },
    },
  },
  "/producto": {
    Component: PageProducto,
    meta: {
      en: {
        title: "Shareholder register, general meetings and board of directors",
        description: "Sttok keeps the shareholder register with numbered share ranges, runs general meetings and the board through to certified minutes, and manages incentive plans, company groups and their documents.",
      keywords: "shareholder register, share ledger, general meeting, board of directors, company groups, beneficial owner, incentive plans",
      },
    },
    softwareApplication: true,
  },
  "/recursos": {
    Component: PageRecursos,
    meta: {
      en: {
        title: "Corporate glossary — cap table, phantom shares, vesting and more",
        description: "The terms of corporate management explained in one sentence: cap table, shareholder registry, phantom shares, stock options, vesting, meetings, quorum, dilution and more.",
      keywords: "corporate glossary, what is a cap table, phantom shares, vesting, dilution",
      },
    },
  },
  "/simulador": {
    Component: PageSimulador,
    meta: {
      en: {
        title: "Corporate transaction simulator: capital increases, share sales and notes",
        description: "Simulate capital increases, reductions, share sales and convertible notes on the actual shareholder register, with liquidation waterfall and Word drafts.",
      keywords: "operations simulator, investment rounds, capital increases, convertible notes, corporate simulations",
      },
    },
    softwareApplication: true,
    productModule: true,
  },
  "/sobre-nosotros": {
    Component: PageSobreNosotros,
    meta: {
      en: {
        title: "About us — the team behind Sttok",
        description: "Sttok is built by a team with technical and legal backgrounds. Today it is the leading corporate management platform in the Spanish-speaking market: 250+ companies and €20bn in equity managed.",
      keywords: "about Sttok, Sttok team, corporate management company",
      },
    },
  },
  "/startups": {
    Component: PageStartups,
    meta: {
      en: {
        title: "Sttok for Startups",
        description: "Cap table solutions, incentive plans, and much more for your startup",
      keywords: "startup, sttok, captable, phantoms, incentives, beneficiaries",
      },
    },
  },
  "/sttok-vs-excel": {
    Component: PageSttokVsExcel,
    meta: {
      en: {
        title: "Sttok versus Excel — comparison for managing your cap table",
        description: "Shareholder registry in Excel or in corporate management software? An honest comparison: errors, versions, certificates, meetings, security, due diligence and cost.",
      keywords: "cap table excel, shareholder registry excel, excel alternative cap table",
      },
    },
  },
  "/testimonios": {
    Component: PageTestimonios,
    meta: {
      en: {
        title: "Testimonials and Success Stories",
        description: "Here you will find testimonials and success stories from our clients",
      keywords: "testimonials, success stories, clients, companies, businesses, success, satisfaction, recommendation",
      },
    },
  },
};
