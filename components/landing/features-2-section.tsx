/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./features-2-section.css";

import BigIcon from "@/public/big-icon.svg";
import Icon05 from "@/public/icon-05.svg";
import Icon07 from "@/public/icon-07.svg";
import IconTitle from "@/public/icon-title.svg";
import Shape01 from "@/public/shape-01.png";
import Shape02 from "@/public/shape-02.svg";
import Shape03 from "@/public/shape-03.svg";
import Shape04 from "@/public/shape-04.svg";
import Shape05 from "@/public/shape-05.svg";
import Blur03 from "@/public/blur-03.svg";
import Blur04 from "@/public/blur-04.svg";
import Blur05 from "@/public/blur-05.svg";
import Blur06 from "@/public/blur-06.svg";
import Blur07 from "@/public/blur-07.svg";
import Blur08 from "@/public/blur-08.svg";
import Blur09 from "@/public/blur-09.svg";
import Blur11 from "@/public/blur-11.svg";
import Blur12 from "@/public/blur-12.svg";

const FeaturesSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <section className="pt-12">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-8 sm:grid-cols-12">
          <div className="sm:col-span-12">
            <MainFeature mousePosition={mousePosition} />
          </div>
          <div className="sm:col-span-6">
            <FeatureBox
              icon={Icon05}
              index={1}
              title="Abogados"
              description="Para Abogados que gestionan Sociedades, Secretarias de Consejos, Ampliaciones, Juntas o Consejos, etc. Podrás dar un servicio profesional a tus clientes y evitar errores. No tendrás que utilizar excels desactualizados y ahorrarás más del 50% de tiempo."
              mousePosition={mousePosition}
            />
          </div>
          <div className="sm:col-span-6">
            <FeatureBox
              icon={Icon07}
              index={2}
              title="Startups"
              description="Ideal para startups e inversores. Accede al detalle de socios, nº de participaciones, % FD y ND, etc. Planifica diferentes escenarios de rondas, ampliaciones y notas convertibles con datos y % exactos. Administra planes de incentivos para los empleados."
              mousePosition={mousePosition}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureBoxProps {
  icon: string;
  index: number;
  title: string;
  description: string;
  mousePosition: { x: number; y: number };
}

const MainFeature: React.FC<{ mousePosition: { x: number; y: number } }> = ({
  mousePosition,
}) => {
  return (
    <div
      className="relative feature-box"
      style={
        {
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
        } as React.CSSProperties
      }
    >
      <div className="features-box-border relative rounded-3xl">
        <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
          <div className="relative z-20 flex items-center justify-between">
            <div className="w-full max-w-[477px]">
              <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                <Image src={IconTitle.src} alt="icon" width={16} height={16} />
                <span className="hero-subtitle-text">
                  ¿Quién utiliza Sttok?
                </span>
              </span>
              <h3 className="mb-4 text-heading-4 font-bold text-white">
                Empresas y Grupo de Sociedades
              </h3>
              <p className="mb-10 font-medium">
                Gestiona digitalmente sociedades o grupos empresariales. Libro
                de socio digital actualizado. Gestión digital de Juntas y
                Consejos. Generación automática de actas, certificados,
                convocatorias, delegaciones, etc. Evita errores y ahorra tiempo.
              </p>
              <Link
                href="/#"
                className="features-button-gradient relative inline-flex items-center gap-1 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
              >
                Ver más
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
            <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
              <Image src={BigIcon.src} alt="icon" layout="fill" />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 -mx-28 overflow-hidden">
            {/* <span className="absolute bottom-0 right-0">
              <Image src={Shape01} alt="shape" width={282} height={226} />
            </span> */}
            <span className="absolute left-0 top-0 aspect-[1170/192] w-full">
              <Image src={Shape02.src} alt="shape" layout="fill" />
            </span>
            <span className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2">
              <Image
                src={Blur03.src}
                alt="blur"
                layout="fill"
                className="max-w-none"
              />
            </span>
            <span className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2">
              <Image
                src={Blur04.src}
                alt="blur"
                layout="fill"
                className="max-w-none"
              />
            </span>
            <span className="absolute bottom-0 left-1/2 aspect-[530/270] w-full max-w-[530px] -translate-x-1/2">
              <Image
                src={Blur05.src}
                alt="blur"
                layout="fill"
                className="max-w-none"
              />
            </span>
            <span className="absolute right-0 top-0 aspect-[580/430] w-full max-w-[580px]">
              <Image
                src={Shape03.src}
                alt="shape"
                layout="fill"
                className="max-w-none"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureBox: React.FC<FeatureBoxProps> = ({
  icon,
  index,
  title,
  description,
  mousePosition,
}) => {
  return (
    <div
      className="relative feature-box"
      style={
        {
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
        } as React.CSSProperties
      }
    >
      <div className="features-box-border relative rounded-3xl">
        <div className="box-hover box-hover-small relative overflow-hidden rounded-3xl px-11 pb-14 pt-12">
          <div className="relative z-20">
            <span className="icon-border relative mx-auto mb-12 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
              <Image src={icon} alt="icon" width={32} height={32} />
            </span>
            <h3 className="mb-4 text-heading-6 font-semibold text-white">
              {title}
            </h3>
            <p className="font-medium">{description}</p>
          </div>

          {index % 2 !== 0 ? (
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <span
                className="absolute bottom-0 left-0 h-full w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Blur06.src})` }}
              ></span>
              <span
                className="absolute bottom-0 left-0 h-full w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Blur07.src})` }}
              ></span>

              <span className="absolute right-[16%] top-[16%]">
                <img
                  alt="shape"
                  loading="lazy"
                  width="250"
                  height="135"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src={Shape04.src}
                />
              </span>
              <span className="absolute bottom-0 left-0 aspect-[521/335] w-full max-w-[521px]">
                <img
                  alt="blur"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="max-w-none"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: "transparent",
                  }}
                  src={Blur08.src}
                />
              </span>
              <span className="absolute bottom-0 left-0 aspect-[287/256] w-full max-w-[287px]">
                <img
                  alt="blur"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="max-w-none"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: "transparent",
                  }}
                  src={Blur09.src}
                />
              </span>
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <span className="absolute right-[14%] top-[17%]">
                <img
                  alt="shape"
                  loading="lazy"
                  width="178"
                  height="102"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src={Shape05.src}
                />
              </span>
              <span className="absolute bottom-0 left-0 h-full w-full bg-[url(/images/blur/blur-10.svg)] bg-cover bg-center bg-no-repeat"></span>
              <span className="absolute right-0 top-0 aspect-[394/336] w-full max-w-[394px]">
                <img
                  alt="blur"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="max-w-none"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: "transparent",
                  }}
                  src={Blur11.src}
                />
              </span>
              <span className="absolute right-0 top-0">
                <img
                  alt="blur"
                  loading="lazy"
                  width="160"
                  height="303"
                  decoding="async"
                  data-nimg="1"
                  className="max-w-none"
                  style={{ color: "transparent" }}
                  src={Blur12.src}
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
