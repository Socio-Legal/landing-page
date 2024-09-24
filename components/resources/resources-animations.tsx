"use client";

import React, { FC } from "react";
import toast, { Toaster } from "react-hot-toast";

import SectionHeader from "../section-header";
import { AnimatedBeams } from "../animated/animated-beams";

type AnimationProps = {
  animation: [string, any];
};

const copyToClipboard = async (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (err) {
    console.error(err);
  }
};

const Animation: FC<AnimationProps> = ({ animation }) => {
  const AnimationName = animation[0];
  const AnimationSVG = animation[1];

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
      className="flex flex-col items-center p-8 rounded-md span-visible-on-hover"
      onClick={() => handleClick(AnimationName)}
      style={{ width: 400 }}
    >
      {AnimationSVG}
      <span className="text-xs text-center mt-2 text-ellipsis">
        {AnimationName}
      </span>
    </div>
  );
};

const ResourcesAnimations = () => {
  return (
    <section id="resources-animations" className="bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <SectionHeader
          title="Animaciones"
          description={`Librería magicui (https://magicui.design/). Haz clic en un ícono para copiar su nombre.`}
        />

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {Object.entries(AnimatedBeams).map((animation, index) => (
            <Animation key={index} animation={animation} />
          ))}
        </div>

        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </section>
  );
};

export default ResourcesAnimations;
