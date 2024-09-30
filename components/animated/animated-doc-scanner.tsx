import React from "react";

type Props = {};

export const AnimatedDocScanner = (props: Props) => {
  return (
    <div className="relative h-full min-h-[500px] rounded-[20px] p-0 lg:col-span-1">
      <p className="absolute -top-20 left-1/2 hidden size-fit -translate-x-1/2 items-center justify-center object-contain lg:flex">
        {/* Step 1 */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-5 size-14"
        >
          <path
            d="M15.9441 15.8748C19.7179 15.0705 23.7632 14.8586 27.5765 15.5585C36.0702 17.1174 42.6422 22.0592 46.8543 29.5804C50.5526 36.1843 52.4659 44.153 52.3442 51.7058C52.3153 53.4997 51.9273 55.4879 51.2695 57.1085"
            stroke="black"
            stroke-opacity="0.65"
            stroke-width="1.40169"
            stroke-linecap="round"
          ></path>
          <path
            d="M42.5383 48.4746L50.5848 57.731C50.8387 58.0231 51.2814 58.0541 51.5735 57.8002L61.3588 49.2939"
            stroke="black"
            stroke-opacity="0.65"
            stroke-width="1.40169"
            stroke-linecap="round"
          ></path>
        </svg>
      </p>
      <div className="flex size-full flex-col items-center justify-between gap-y-3.5 p-5">
        {/* <p className="flex items-center justify-center text-xl font-semibold text-neutral-900 dark:text-white">
          Personalize
        </p> */}
        <div className="relative z-[1] mx-auto flex w-full max-w-[200px] flex-col items-start gap-y-2 rounded-[10px] bg-white p-2.5 shadow-[0_21px_44px_-32px_rgba(63,70,75,0.10),0_26px_30px_-23px_rgba(39,44,48,0.20),0_14px_40px_0_rgba(39,44,48,0.05),0_0_0_1px_rgba(39,44,48,0.08),0_4px_8px_0px_rgba(39,44,48,0.12)]">
          <div className="absolute left-1/2 top-1/2 z-[-1] size-[calc(100%+100px)] -translate-x-1/2 -translate-y-1/2 border-0 border-neutral-100 bg-gradient-to-b from-neutral-200/40 to-transparent">
            <div className="pointer-events-none absolute -left-0.5 -top-0.5 size-6 border-l-2 border-t-2 border-neutral-200"></div>
            <div className="pointer-events-none absolute -right-0.5 -top-0.5 size-6 border-r-2 border-t-2 border-neutral-200"></div>
            <div className="pointer-events-none absolute -bottom-0.5 -left-0.5 size-6 border-b-2 border-l-2 border-neutral-200"></div>
            <div className="pointer-events-none absolute -bottom-0.5 -right-0.5 size-6 border-b-2 border-r-2 border-neutral-200"></div>
          </div>
          <div className="relative aspect-[1/1.2142] w-full overflow-hidden rounded-md bg-gray-100">
            <div>
              <div
                className="absolute inset-x-0 top-0 z-[9999] h-14 w-full rounded-md border border-dashed border-[#6F44D1]/20 bg-gradient-to-b from-[#F5F1FF] via-transparent to-[#F0F5F8] [mask-image:linear-gradient(to_bottom,white,transparent)]"
                // style="will-change: transform; transform: translateY(148.854px);"
                style={{
                  willChange: "transform",
                  transform: "translateY(148.854px)",
                }}
              ></div>
              <div
                className="flex w-full flex-col gap-2 p-4"
                style={{
                  transform: "translateY(8.72822px)",
                  willChange: "transform",
                }}
              >
                <div className="h-1 w-1/2 rounded bg-gray-300"></div>
                <div className="h-1 w-2/3 rounded bg-gray-200"></div>
                <div className="h-1 w-2/3 rounded bg-gray-200"></div>
                <div className="h-10 w-full rounded bg-gray-200"></div>
                <div className="h-1 w-full rounded bg-gray-200"></div>
                <div className="h-1 w-5/6 rounded bg-gray-200"></div>
                <div className="h-1 w-full rounded bg-gray-200"></div>
                <div className="h-1 w-full rounded bg-gray-200"></div>
                <div className="h-1 w-1/2 rounded bg-gray-300"></div>
                <div className="h-1 w-2/3 rounded bg-gray-200"></div>
                <div className="h-1 w-2/3 rounded bg-gray-200"></div>
                <div className="h-10 w-full rounded bg-gray-200"></div>
                <div className="h-1 w-full rounded bg-gray-200"></div>
                <div className="h-1 w-5/6 rounded bg-gray-200"></div>
                <div className="h-1 w-full rounded bg-gray-200"></div>
                <div className="h-1 w-full rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex w-full items-start">
          <p className="text-base font-normal text-[#526068]">
            Train an AI agent that understands your ICP, differentiators and
            market landscape
          </p>
        </div> */}
      </div>
    </div>
  );
};
