import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
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
    title: "Sttok ya disponible en AWS Marketplace",
    text: "Descubre la nueva forma de gestionar tu sociedad",
    link: routes.APP,
  },
  header: [
    {
      trigger: "Producto",
      content: {
        main: {
          icon: "Stars",
          title: "Digital y Automatizado",
          description: "Aprovecha la automatización digital para tu sociedad.",
          href: routes.PRODUCT,
        },
        items: [
          {
            href: routes.PRODUCT_PARTNERS_BOOK,
            title: "Socios",
            description:
              "Captable, Libro de Socios oficial, %, acceso de los socios",
          },
          {
            href: routes.PRODUCT_INCENTIVE_PLANS,
            title: "Planes de Incentivos",
            description:
              "Phantoms, stock options, acceso empleados, vesting, etc",
          },
          {
            href: routes.PRODUCT_SHAREHOLDER_MEETINGS,
            title: "Juntas y Consejos",
            description:
              "Convocatoria digital, delegaciones, votaciones, firma de documentos, etc",
          },
          {
            href: routes.PRODUCT_OPERATION_DRAFTS,
            title: "Simulador de Operaciones",
            description:
              "Cálculo de rondas, ampliaciones, notas convertibles, etc",
          },
        ],
      },
    },
    {
      trigger: "Soluciones",
      content: {
        items: [
          {
            href: routes.SOLUTIONS_COMPANIES,
            title: "Empresa y Grupos Societarios",
            description:
              "Digitaliza la gestión societaria de la Sociedad: Libro de socios, Juntas de Accionistas, Documentación Societaria, Apoderados, etc.",
          },
          {
            href: routes.SOLUTIONS_LAWYERS,
            title: "Abogados",
            description:
              "Optimiza tu tiempo con la gestión digital de sociedades. Ahorra tiempo y evita errores. Automatiza tareas manuales e incrementa la productividad.",
          },
          {
            href: routes.SOLUTIONS_STARTUPS,
            title: "Startups",
            description:
              "Captable, Planes de Incentivos, Simulador de ampliaciones, notas convertibles, juntas de accionistas, sindicación de socios, etc.",
          },
          {
            href: routes.SOLUTIONS_INVESTORS_DASHBOARD,
            title: "Portal del Inversor",
            description:
              "Da acceso a tus inversores acceso a una plataforma donde dispondrán de toda la informacion que les quieras facilitar.",
          },
          {
            href: routes.SOLUTIONS_INVESTORS,
            title: "Inversores",
            description:
              "Acceso desde una única plataforma a los datos de sociedades participadas. Información real sin utilizar excels desactualizados.",
          },
        ],
      },
    },
    {
      href: routes.TESTIMONIALS,
      label: "Testimonios",
    },
    {
      href: routes.PRICING,
      label: "Precios",
    },
  ],
  cta: [
    {
      text: "Iniciar sesión",
      link: "/login",
      variant: "ghost",
      className: "",
      hasIcon: false,
    },
    {
      text: "Solicitar demo",
      link: routes.APP_CALENDLY,
      variant: "default",
      className: "w-full sm:w-auto text-background flex gap-2",
      hasIcon: false,
      blankPage: true,
    },
  ],
  footer: {
    menu: [
      // TODO: update footer links
      [
        { id: 0, title: "Producto", url: routes.PRODUCT, isHeader: true },
        { id: 1, title: "Libro de Socios", url: routes.PRODUCT_PARTNERS_BOOK },
        {
          id: 2,
          title: "Planes de Incentivos",
          url: routes.PRODUCT_INCENTIVE_PLANS,
        },
        {
          id: 3,
          title: "Simulador Operaciones",
          url: routes.PRODUCT_OPERATION_DRAFTS,
        },
        {
          id: 4,
          title: "Juntas y Consejos",
          url: routes.PRODUCT_SHAREHOLDER_MEETINGS,
        },
      ],
      [
        { id: 5, title: "Soluciones", url: routes.SOLUTIONS, isHeader: true },
        {
          id: 6,
          title: "Empresa y Grupos Societarios",
          url: routes.SOLUTIONS_COMPANIES,
        },
        { id: 7, title: "Abogados", url: routes.SOLUTIONS_LAWYERS },
        {
          id: 8,
          title: "Portal del Inversor",
          url: routes.SOLUTIONS_INVESTORS_DASHBOARD,
        },
        { id: 9, title: "Inversores", url: routes.SOLUTIONS_INVESTORS },
      ],
      [
        { id: 10, title: "Otros", url: "", isHeader: true },
        { id: 11, title: "Testimonios", url: routes.TESTIMONIALS },
        { id: 12, title: "Precios", url: routes.PRICING },
      ],
      [
        // TODO: create legal pages
        { id: 13, title: "Legal", url: "#", isHeader: true },
        {
          id: 14,
          title: "Aviso Legal y CGC",
          url: "https://www.sttok.com/aviso-legal/",
        },
        {
          id: 15,
          title: "Privacidad y Cookies",
          url: "https://www.sttok.com/privacidad/",
        },
        {
          id: 16,
          title: "Política de Seguridad",
          url: "https://www.sttok.com/politica-seguridad/",
        },
      ],
    ],
    logos: [
      "https://www.sttok.com/images/logo-gdpr-compliant.png",
      "https://www.sttok.com/images/logo-iso-27001.png",
      "https://www.sttok.com/images/logo-ssl.png",
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
