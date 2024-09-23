import { LinkedInLogoIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Icons } from "./icons";

import Blur02 from "@/public/blur-02.svg";
import { siteConfig } from "@/config/site-config";

interface Icon {
  icon: JSX.Element;
  url: string;
}

interface FooterLink {
  id: number;
  title: string;
  url: string;
  isHeader?: boolean;
}

const FooterIcons = {
  LinkedIn: <LinkedInLogoIcon className="h-6 w-6" />,
};

const icons: Icon[] = siteConfig.footer.social.map((social) => ({
  icon: FooterIcons[social.icon as keyof typeof FooterIcons],
  url: social.url,
}));

const footerLinks: FooterLink[][] = siteConfig.footer.menu;
const securityLogos: string[] = siteConfig.footer.logos;

const footerStyle = {
  backgroundImage: `url(${Blur02.src})`,
  backgroundSize: "cover",
  backgroundPosition: "bottom",
};

export function SiteFooter() {
  return (
    <footer
      className="px-7 md:px-10 bg-white dark:bg-black"
      style={footerStyle}
    >
      <div className="flex flex-col py-10 md:flex-row md:items-center md:justify-between container">
        <div className="flex flex-col items-start justify-start gap-y-5">
          <a href="#" className="flex items-center gap-x-2.5">
            <Icons.logo className="w-auto h-[30px]" />
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white hidden">
              Sttok
            </h1>
          </a>
          <p className="tracking-tight text-neutral-900 dark:text-white">
            Software de Gestión de Sociedades
          </p>
          <p className="text-sm tracking-tight text-neutral-500 dark:text-neutral-400 sm:text-center">
            Todos los derechos reservados.
          </p>
        </div>

        <div className="pt-5 md:w-1/2">
          <div className="flex items-start justify-between gap-x-3 lg:pl-10">
            {footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-2">
                {column.map((link) => (
                  <li
                    key={link.id}
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium text-neutral-400 duration-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    {link.isHeader ? (
                      <h2 className="text-sm font-semibold uppercase text-black dark:text-white">
                        {link.title}
                      </h2>
                    ) : (
                      <a href={link.url}>{link.title}</a>
                    )}
                    <ChevronRightIcon className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-y-10 border-t border-dashed py-10 md:flex-row md:items-center container">
        <div className="flex items-center gap-x-4">
          {securityLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="security"
              className="w-auto h-12"
            />
          ))}
        </div>

        <div className="flex items-center gap-x-4">
          {icons.map((icon, index) => (
            <a
              key={index}
              href={icon.url}
              className="text-xl text-neutral-500 hover:text-neutral-900 hover:dark:text-white"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
