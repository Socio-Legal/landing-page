import Image from "next/image";

import Icon01 from "@/public/icon-01.svg";
import Icon02 from "@/public/icon-02.svg";
import Icon03 from "@/public/icon-03.svg";
import Icon04 from "@/public/icon-04.svg";
import Icon05 from "@/public/icon-05.svg";
import Icon06 from "@/public/icon-06.svg";
import Icon07 from "@/public/icon-07.svg";
import Icon08 from "@/public/icon-08.svg";
import IconTitle from "@/public/icon-title.svg";

import "./features-section.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ChevronRight } from "lucide-react";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  rotate?: boolean;
}

const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  rotate = false,
}) => (
  <div className="w-full sm:w-1/2 lg:w-1/3">
    <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
      <span
        className={`features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 ${
          rotate ? "rotate-180" : "undefined"
        }`}
      ></span>
      <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
        <Image src={icon} alt="icon" width={32} height={32} />
      </span>
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      <p className="font-medium">{description}</p>
    </div>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Icon01,
      title: "Libro de Socios (Captable)",
      description:
        "Libro de socios digital para gestionar el equity. Actualizado sin errores.",
    },
    {
      icon: Icon02,
      title: "Planes de Incentivos",
      description:
        "La forma más profesional de crear y mantener todo tipo de planes.",
    },
    {
      icon: Icon03,
      title: "Simulador de Operaciones",
      description:
        "Calcula todo tipo de operaciones con los datos reales actualizados.",
    },
    {
      icon: Icon04,
      title: "Juntas Accionistas",
      description:
        "Gestiona las juntas: Convocatoria, delegaciones, votos, etc.",
    },
    {
      icon: Icon05,
      title: "Ofertas de Compra",
      description:
        "Gestiona y ejecuta operaciones de secundario. Tender offers.",
    },
    {
      icon: Icon06,
      title: "Documentación Societaria",
      description:
        "Genera documentos, escrituras, certificados o actas en segundos.",
    },
    {
      icon: Icon07,
      title: "Grupos de Sociedades",
      description: "Todas las sociedades bajo un sistema digital de gestión.",
    },
    {
      icon: Icon08,
      title: "Consejos de Administración",
      description:
        "Gestiona digitalmente la convocatoria, delegaciones, votos, etc.",
    },
  ];

  return (
    <section
      id="features-section"
      className="scroll-mt-17 overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5 bg-dark"
    >
      <div className="mx-auto max-w-[1222px] px-4 sm:px-8 xl:px-0">
        <div className="wow fadeInUp relative z-10 mb-16 text-center">
          <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Image src={IconTitle} alt="icon" width={16} height={16} />
            <span className="hero-subtitle-text"> Software completo </span>
          </span>
          <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
            Funcionalidades para gestión societaria
          </h2>
          <p className="mx-auto max-w-[714px] font-medium text-white/70">
            Reunimos todas las funcionalidades para gestionar digitalmente
            sociedades. Dispondrás de los datos e información exacta y siempre
            actualizada.
          </p>
          <Link
            href="#"
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "outline",
              }),
              "group mt-4 rounded-[2rem] px-6"
            )}
          >
            Ver funcionalidades
            <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="relative">
          <div className="features-row-border absolute left-1/2 top-1/2 hidden h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:left-1/4 lg:block lg:-translate-x-1/3"></div>
          <div className="features-row-border absolute right-1/2 top-1/2 hidden h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:right-[8.3%] lg:block"></div>
          <div className="flex flex-wrap justify-center">
            {features.map((feature, index) => (
              <>
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
                  <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
                    <span
                      className={`features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 ${
                        index >= 3 ? "rotate-180" : "undefined"
                      }`}
                    ></span>
                    <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                      <Image
                        src={feature.icon}
                        alt="icon"
                        width={32}
                        height={32}
                      />
                    </span>
                    <h3 className="mb-4 text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="font-medium text-white/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {index % 3 === 2 && (
                  <div className="features-row-border h-[1px] w-full"></div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
