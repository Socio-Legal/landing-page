import { AnimatedBeamMultiToMulti } from "./animated-beam-multi-to-multi";
import { AnimatedBeamMultiToSingle } from "./animated-beam-multi-to-single";
import { AnimatedBeamSingleToMulti } from "./animated-beam-single-to-multi";
import { AnimatedCard4 } from "./animated-card-4";
import { AnimatedCloud } from "./animated-cloud";

export const AnimatedBeams = {
  AnimatedBeam01: (
    <AnimatedBeamSingleToMulti className="border-0 p-0 h-[240px] mb-16 md:shadow-none" />
  ),
  AnimatedBeam02: (
    <AnimatedBeamMultiToSingle className="border-0 p-0 h-[240px] mb-16 md:shadow-none" />
  ),
  AnimatedBeam03: (
    <AnimatedBeamMultiToMulti className="border-0 p-0 h-[240px] mb-16 md:shadow-none" />
  ),
  AnimatedCloud: <AnimatedCloud />,
  AnimatedCard4: <AnimatedCard4 />,
};

export const getAnimatedBeam = (name: keyof typeof AnimatedBeams) => {
  return AnimatedBeams[name];
};
