import {
  notificationsIncentivePlan,
  notificationsShareholderMeeting,
} from "@/config/notifications";

import { AnimatedBeamMultiToMulti } from "./animated-beam-multi-to-multi";
import { AnimatedBeamMultiToSingle } from "./animated-beam-multi-to-single";
import { AnimatedBeamSingleToMulti } from "./animated-beam-single-to-multi";
import { AnimatedCard3 } from "./animated-card-3";
import { AnimatedCard4 } from "./animated-card-4";
import { AnimatedCard9 } from "./animated-card-9";
import { AnimatedCloud } from "./animated-cloud";
import { AnimatedDocScanner } from "./animated-doc-scanner";

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
  AnimatedCard3: <AnimatedCard3 />,
  AnimatedCard4: <AnimatedCard4 />,
  AnimatedCard9: <AnimatedCard9 />,
  AnimatedCard9_IncentivePlan: (
    <AnimatedCard9 notifications={notificationsIncentivePlan} />
  ),
  AnimatedCard9_ShareholderMeeting: (
    <AnimatedCard9 notifications={notificationsShareholderMeeting} />
  ),
  AnimatedDocScanner: <AnimatedDocScanner />,
};

export const getAnimatedBeam = (name: keyof typeof AnimatedBeams) => {
  return AnimatedBeams[name];
};
