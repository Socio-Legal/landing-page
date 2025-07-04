import { routes } from "./routes";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Sttok",
  description: "Automate your workflow with AI",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["SaaS", "Template", "Next.js", "React", "Tailwind CSS"],
  links: {
    email: "info@sttok.com",
  },
  banner: {
    enabled: false,
    title: "banner.title",
    text: "banner.description",
    link: routes.APP,
  },

  header: [
    {
      trigger: "menu.Product",
      href: routes.PRODUCT,
      content: {
        main: {
          icon: "Stars",
          title: "menu.ProductTitle",
          description: "menu.ProductDescription",
          href: routes.PRODUCT,
        },
        items: [
          {
            href: routes.PRODUCT_PARTNERS_BOOK,
            title: "menu.PartnersTitle",
            description: "menu.Partnersdescription",
          },
          {
            href: routes.PRODUCT_INCENTIVE_PLANS,
            title: "menu.PlansTitle",
            description: "menu.PlansDescription",
          },
          {
            href: routes.PRODUCT_SHAREHOLDER_MEETINGS,
            title: "menu.BoardsTitle",
            description: "menu.BoardsDescription",
          },
          {
            href: routes.PRODUCT_OPERATION_DRAFTS,
            title: "menu.DraftsTitle",
            description: "menu.DraftsDescription",
          },
        ],
      },
    },
    {
      trigger: "menu.Solutions",
      href: routes.SOLUTIONS,
      content: {
        items: [
          {
            href: routes.SOLUTIONS_COMPANIES,
            title: "menu.CompaniesTitle",
            description: "menu.CompaniesDescription",
          },
          {
            href: routes.SOLUTIONS_LAWYERS,
            title: "menu.LawyersTitle",
            description: "menu.LawyersDescription",
          },
          {
            href: routes.SOLUTIONS_STARTUPS,
            title: "menu.StartupsTitle",
            description: "menu.StartupsDescription",
          },
          {
            href: routes.SOLUTIONS_INVESTORS_DASHBOARD,
            title: "menu.InvestorPortalTitle",
            description: "menu.InvestorPortalDescription",
          },
          {
            href: routes.SOLUTIONS_INVESTORS,
            title: "menu.InvestorsTitle",
            description: "menu.InvestorsDescription",
          },
        ],
      },
    },
    {
      href: routes.TESTIMONIALS,
      label: "menu.Testimonials",
    },
    {
      href: routes.PRICING,
      label: "menu.Pricing",
    },
  ],
  cta: [
    {
      text: "cta.login",
      link: routes.APP_LOGIN,
      variant: "ghost",
      className: "",
      hasIcon: false,
    },
    {
      text: "cta.demo",
      link: routes.APP_CALENDLY,
      variant: "default",
      className: "w-full sm:w-auto text-background flex gap-2",
      hasIcon: false,
      blankPage: true,
    },
  ],
  footer: {
    menu: [
      [
        { id: 0, title: "menu.Product", url: routes.PRODUCT, isHeader: true },
        {
          id: 1,
          title: "menu.PartnersTitle",
          url: routes.PRODUCT_PARTNERS_BOOK,
          alt: "Software para Libro de socios",
        },
        {
          id: 2,
          title: "menu.PlansTitle",
          url: routes.PRODUCT_INCENTIVE_PLANS,
          alt: "Software para Planes de incentivos",
        },
        {
          id: 3,
          title: "menu.DraftsTitle",
          url: routes.PRODUCT_OPERATION_DRAFTS,
          alt: "Software para Simulador de operaciones",
        },
        {
          id: 4,
          title: "menu.BoardsTitle",
          url: routes.PRODUCT_SHAREHOLDER_MEETINGS,
          alt: "Software para Juntas de consejos",
        },
      ],
      [
        {
          id: 5,
          title: "menu.SolutionsTitle",
          url: routes.SOLUTIONS,
          isHeader: true,
        },
        {
          id: 6,
          title: "menu.CompaniesTitle",
          url: routes.SOLUTIONS_COMPANIES,
          alt: "Software para Empresas",
        },
        {
          id: 7,
          title: "menu.LawyersTitle",
          url: routes.SOLUTIONS_LAWYERS,
          alt: "Software para Abogados",
        },
        {
          id: 8,
          title: "menu.InvestorPortalTitle",
          url: routes.SOLUTIONS_INVESTORS_DASHBOARD,
          alt: "Software para Portal del inversor",
        },
        {
          id: 9,
          title: "menu.InvestorsTitle",
          url: routes.SOLUTIONS_INVESTORS,
          alt: "Software para Inversores",
        },
      ],
      [
        { id: 10, title: "menu.Others", url: "", isHeader: true },
        {
          id: 11,
          title: "menu.Testimonials",
          url: routes.TESTIMONIALS,
          alt: "Testimonios y casos de éxito",
        },
        { id: 12, title: "menu.Pricing", url: routes.PRICING },
        {
          id: 121,
          title: "menu.Resources",
          url: routes.APP_BLOG,
        },
      ],
      [
        // TODO: create legal pages
        { id: 13, title: "menu.Legal", url: "#", isHeader: true },
        {
          id: 14,
          title: "menu.LegalWarning",
          url: routes.LEGAL_DISCLAIMER,
          alt: "Aviso legal",
        },
        {
          id: 15,
          title: "menu.Privacy",
          url: routes.LEGAL_PRIVACY_COOKIES,
          alt: "Política de privacidad y cookies",
        },
        {
          id: 16,
          title: "menu.Security",
          url: routes.LEGAL_SECURITY_POLICY,
          alt: "Política de seguridad",
        },
      ],
    ],
    logos: [
      "/logo-gdpr-compliant.png",
      "/logo-iso-27001.png",
      "/logo-ssl.png",
      "/logo-bureau-veritas.png",
    ],
    social: [
      {
        icon: "LinkedIn",
        url: "https://www.linkedin.com/company/sttok/",
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
