"use client";

import React, { FC } from "react";
import toast, { Toaster } from "react-hot-toast";

import SectionHeader from "../section-header";
import { LucideReactIcons } from "./lucide-react";
import { blurStyle02 } from "../styles/blur-styles";

type IconProps = {
  icon: [string, any];
};

const copyToClipboard = async (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (err) {
    console.error(err);
  }
};

const Icon: FC<IconProps> = ({ icon }) => {
  const IconName = icon[0];
  const IconSVG = icon[1];

  const handleClick = (name: string) => {
    copyToClipboard(name);
    toast.success(`Copiado: "${name}"`, {
      style: {
        borderRadius: "8px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div
      className="flex flex-col items-center w-16 h-16 span-hidden-on-hover py-2 rounded-md"
      onClick={() => handleClick(IconName)}
    >
      {IconSVG}
      <span className="text-xs text-center mt-2 text-ellipsis">{IconName}</span>
    </div>
  );
};

const ResourcesIcons = () => {
  const totalIcons = Object.keys(LucideReactIcons).length;

  return (
    <section
      id="resources-icons"
      className="bg-backgroundbrand"
      style={blurStyle02}
    >
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <SectionHeader
          title="Íconos"
          description={`Librería lucide-react (${totalIcons} íconos). Haz clic en un ícono para copiar su nombre.`}
        />

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {Object.entries(LucideReactIcons).map((icon, index) => (
            <Icon key={index} icon={icon} />
          ))}
        </div>

        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </section>
  );
};

export default ResourcesIcons;
