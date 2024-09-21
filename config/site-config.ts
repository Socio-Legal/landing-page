import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Sttok",
  description: "Automate your workflow with AI",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["SaaS", "Template", "Next.js", "React", "Tailwind CSS"],
  links: {
    email: "info@sttok.com",
  },
  header: [
    {
      trigger: "Producto",
      content: {
        main: {
          icon: "Stars",
          title: "Digital y Automatizado",
          description: "Aprovecha la automatización digital para tu sociedad.",
          href: "#",
        },
        items: [
          {
            href: "https://www.sttok.com/libro-de-socios/",
            title: "Socios",
            description:
              "Captable, Libro de Socios oficial, %, acceso de los socios",
          },
          {
            href: "https://www.sttok.com/libro-de-socios/",
            title: "Planes de Incentivos",
            description:
              "Phantoms, stock options, acceso empleados, vesting, etc",
          },
          {
            href: "https://www.sttok.com/libro-de-socios/",
            title: "Juntas y Consejos",
            description:
              "Convocatoria digital, delegaciones, votaciones, firma de documentos, etc",
          },
          {
            href: "https://www.sttok.com/libro-de-socios/",
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
            href: "https://www.sttok.com/landing/empresas/",
            title: "Empresa y Grupos Societarios",
            description:
              "Digitaliza la gestión societaria de la Sociedad: Libro de socios, Juntas de Accionistas, Documentación Societaria, Apoderados, etc.",
          },
          {
            href: "https://www.sttok.com/landing/abogados/",
            title: "Abogados",
            description:
              "Optimiza tu tiempo con la gestión digital de sociedades. Ahorra tiempo y evita errores. Automatiza tareas manuales e incrementa la productividad.",
          },
          {
            href: "https://www.sttok.com/landing/startups/",
            title: "Startups",
            description:
              "Captable, Planes de Incentivos, Simulador de ampliaciones, notas convertibles, juntas de accionistas, sindicación de socios, etc.",
          },
          {
            href: "https://www.sttok.com/landing/portal-del-inversor/",
            title: "Portal del Inversor",
            description:
              "Da acceso a tus inversores acceso a una plataforma donde dispondrán de toda la informacion que les quieras facilitar.",
          },
          {
            href: "https://www.sttok.com/landing/inversores/",
            title: "Inversores",
            description:
              "Acceso desde una única plataforma a los datos de sociedades participadas. Información real sin utilizar excels desactualizados.",
          },
        ],
      },
    },
    {
      href: "/testimonios",
      label: "Testimonios",
    },
  ],
  cta: [
    {
      text: "Iniciar sesión",
      link: "/login",
      variant: "ghost",
      className: "",
    },
    {
      text: "Solicitar demo",
      link: "/signup",
      variant: "default",
      className: "w-full sm:w-auto text-background flex gap-2",
    },
  ],
  footer: {
    menu: [
      [
        { id: 0, title: "Producto", url: "#", isHeader: true },
        { id: 1, title: "Libro de Socios", url: "#" },
        { id: 2, title: "Planes de Incentivos", url: "#" },
        { id: 3, title: "Simulador Operaciones", url: "#" },
        { id: 4, title: "Juntas y Consejos", url: "#" },
      ],
      [
        { id: 5, title: "Soluciones", url: "#", isHeader: true },
        { id: 6, title: "Empresa y Grupos Societarios", url: "#" },
        { id: 7, title: "Abogados", url: "#" },
        { id: 8, title: "Portal del Inversor", url: "#" },
        { id: 9, title: "Inversores", url: "#" },
      ],
      [
        { id: 10, title: "Otros", url: "#", isHeader: true },
        { id: 11, title: "Testimonios", url: "#" },
        { id: 12, title: "Precios", url: "#" },
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
