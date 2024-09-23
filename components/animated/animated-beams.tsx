import { AnimatedBeamMultiToMulti } from "./animated-beam-multi-to-multi";
import { AnimatedBeamMultiToSingle } from "./animated-beam-multi-to-single";
import { AnimatedBeamSingleToMulti } from "./animated-beam-single-to-multi";

export const AnimatedBeams = {
  AnimatedBeam01: (
    <AnimatedBeamSingleToMulti className="border-0 p-0 h-[240px] mb-16" />
  ),
  AnimatedBeam02: (
    <AnimatedBeamMultiToSingle className="border-0 p-0 h-[240px] mb-16" />
  ),
  AnimatedBeam03: (
    <AnimatedBeamMultiToMulti className="border-0 p-0 h-[240px] mb-16" />
  ),
};

export const getAnimatedBeam = (name: keyof typeof AnimatedBeams) => {
  return AnimatedBeams[name];
};
