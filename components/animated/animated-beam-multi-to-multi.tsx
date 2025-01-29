"use client";

import React, { FC, forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Icons as SttokIcons } from "@/components/icons";
import { Icons } from "./icons";
import { beamDefault } from "@/config/beams";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-1 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

type AnimatedBeamMultiToMultiProps = {
  className?: string;
  icons?: React.ReactNode[];
};

const defaultIcons = beamDefault;

export const AnimatedBeamMultiToMulti: FC<AnimatedBeamMultiToMultiProps> = ({
  className,
  icons = defaultIcons,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[240px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>{icons[5]}</Circle>
          <Circle ref={div5Ref}>{icons[2]}</Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>{icons[3]}</Circle>
          <Circle ref={div4Ref} className="size-16 p-3">
            {icons[1]}
          </Circle>
          <Circle ref={div6Ref}>{icons[4]}</Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>{icons[2]}</Circle>
          <Circle ref={div7Ref}>{icons[5]}</Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
};
