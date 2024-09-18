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
    email: "support@acme.ai",
    twitter: "https://twitter.com/magicuidesign",
    discord: "https://discord.gg/87p2vpsat5",
    github: "https://github.com/magicuidesign/magicui",
    instagram: "https://instagram.com/magicuidesign/",
  },
  header: [
    {
      trigger: "Producto",
      content: {
        // main: {
        //   icon: <Icons.logo className="h-6 w-6" />,
        //   title: "AI-Powered Automation",
        //   description: "Streamline your workflow with intelligent automation.",
        //   href: "#",
        // },
        items: [
          {
            href: "https://www.sttok.com/libro-de-socios/",
            title: "Libro Oficial",
            description: "Mantenimiento del libro oficial de socios",
          },
          {
            href: "https://www.sttok.com/libro-de-socios/",
            title: "Datos Actualizados",
            description: "Acceso a información actualizada de los socios",
          },
          {
            href: "https://www.sttok.com/libro-de-socios/",
            title: "% Non Diluted y FD actualizados",
            description: "Porcentajes actualizados de participación",
          },
          {
            href: "https://www.sttok.com/libro-de-socios/",
            title: "Acceso de los socios",
            description: "Portal de acceso para los accionistas",
          },
          {
            href: "https://www.sttok.com/planes-de-incentivos/",
            title: "Phantoms y Stock Options",
            description: "Administración de opciones sobre acciones y phantoms",
          },
          {
            href: "https://www.sttok.com/planes-de-incentivos/",
            title: "Acceso para empleados",
            description:
              "Portal de acceso para empleados a sus planes de incentivos",
          },
          {
            href: "https://www.sttok.com/planes-de-incentivos/",
            title: "Vesting automatizado",
            description: "Sistema de consolidación automática de opciones",
          },
          {
            href: "https://www.sttok.com/simulador/",
            title: "Cálculo automático rondas",
            description:
              "Herramienta para calcular automáticamente rondas de financiación",
          },
          {
            href: "https://www.sttok.com/simulador/",
            title: "Múltiples escenarios",
            description:
              "Creación y comparación de diferentes escenarios financieros",
          },
          {
            href: "https://www.sttok.com/simulador/",
            title: "Ampliaciones capital",
            description: "Simulación de ampliaciones de capital",
          },
          {
            href: "https://www.sttok.com/simulador/",
            title: "Datos y % exactos",
            description: "Cálculos precisos de datos y porcentajes",
          },
          {
            href: "https://www.sttok.com/juntas-consejos/",
            title: "Convocatoria digital",
            description:
              "Sistema de convocatorias digitales para juntas y consejos",
          },
          {
            href: "https://www.sttok.com/juntas-consejos/",
            title: "Delegación / proxy",
            description: "Gestión de delegaciones y representaciones",
          },
          {
            href: "https://www.sttok.com/juntas-consejos/",
            title: "Votación digital",
            description:
              "Sistema de votación electrónica para juntas y consejos",
          },
          {
            href: "https://www.sttok.com/juntas-consejos/",
            title: "Documentación automática",
            description:
              "Generación automática de documentación para juntas y consejos",
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
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "$19",
      period: "month",
      yearlyPrice: "$16",
      features: [
        "1 User",
        "5GB Storage",
        "Basic Support",
        "Limited API Access",
        "Standard Analytics",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: "Subscribe",
      isPopular: false,
    },
    {
      name: "PRO",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "5 Users",
        "50GB Storage",
        "Priority Support",
        "Full API Access",
        "Advanced Analytics",
      ],
      description: "Ideal for growing businesses and teams",
      buttonText: "Subscribe",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "500GB Storage",
        "24/7 Premium Support",
        "Custom Integrations",
        "AI-Powered Insights",
      ],
      description: "For large-scale operations and high-volume users",
      buttonText: "Subscribe",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is acme.ai?",
      answer: (
        <span>
          acme.ai is a platform that helps you build and manage your AI-powered
          applications. It provides tools and services to streamline the
          development and deployment of AI solutions.
        </span>
      ),
    },
    {
      question: "How can I get started with acme.ai?",
      answer: (
        <span>
          You can get started with acme.ai by signing up for an account on our
          website, creating a new project, and following our quick-start guide.
          We also offer tutorials and documentation to help you along the way.
        </span>
      ),
    },
    {
      question: "What types of AI models does acme.ai support?",
      answer: (
        <span>
          acme.ai supports a wide range of AI models, including but not limited
          to natural language processing, computer vision, and predictive
          analytics. We continuously update our platform to support the latest
          AI technologies.
        </span>
      ),
    },
    {
      question: "Is acme.ai suitable for beginners in AI development?",
      answer: (
        <span>
          Yes, acme.ai is designed to be user-friendly for both beginners and
          experienced developers. We offer intuitive interfaces, pre-built
          templates, and extensive learning resources to help users of all skill
          levels create AI-powered applications.
        </span>
      ),
    },
    {
      question: "What kind of support does acme.ai provide?",
      answer: (
        <span>
          acme.ai provides comprehensive support including documentation, video
          tutorials, a community forum, and dedicated customer support. We also
          offer premium support plans for enterprises with more complex needs.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
