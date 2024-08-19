/* eslint-disable @next/next/no-img-element */
import "@/components/ui/stars.css";
import "./planet-stars-section.css";

import Blur13 from "@/public/blur-13.svg";
import Blur14 from "@/public/blur-14.svg";
import Blur15 from "@/public/blur-15.svg";
import IconTitle from "@/public/icon-title.svg";

const PlanetStarsSection = () => {
  console.log("lll");

  return (
    <section
      id="pricing"
      className="relative z-20 scroll-mt-17 overflow-hidden pt-24 lg:pt-28 xl:pt-32"
    >
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="relative top-18">
          <div className="pointer-events-none absolute inset-0 -z-10 -my-56 overflow-hidden">
            <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[925px] -translate-x-1/2">
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
                src={Blur13.src}
              />
            </div>
            <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[778px] -translate-x-1/2">
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
                src={Blur14.src}
              />
            </div>
            <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[584px] -translate-x-1/2">
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
                src={Blur15.src}
              />
            </div>
          </div>
          <div className="pricing-circle absolute left-1/2 top-0 h-[830px] w-full max-w-[830px] -translate-x-1/2 rounded-full bg-black"></div>

          <div className="absolute -top-30 left-1/2 -z-1 h-60 w-full max-w-[482px] -translate-x-1/2 overflow-hidden">
            <div className="stars"></div>
            <div className="stars2"></div>
          </div>
        </div>

        <div className="relative -z-1 flex justify-center gap-7">
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        </div>

        <div>
          <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
            <div className="wow fadeInUp relative z-10 mb-16 text-center">
              <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                <img
                  alt="icon"
                  loading="lazy"
                  width="16"
                  height="16"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src={IconTitle.src}
                />
                <span className="hero-subtitle-text">Precios</span>
              </span>
              <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
                Planes a tu medida
              </h2>
              <p className="mx-auto max-w-[714px] font-medium">
                Ahorra tiempo automatizando tareas manuales, evita errores,
                dispón de datos siempre actualizados.{" "}
                <strong>Aporta valor</strong> a todos los stakeholders.
              </p>
            </div>

            {/* <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="wow fadeInUp pricing-item-border relative z-20 overflow-hidden rounded-3xl bg-dark px-8 pb-10 pt-12.5 xl:px-10">
                <span className="absolute right-9 top-9">
                  <img
                    alt="icon"
                    width="44"
                    height="44"
                    src="./images/pricing/pricing-icon-01.svg"
                  />
                </span>
                <h3 className="mb-5.5 text-heading-6 font-semibold text-white">
                  Starter
                </h3>
                <div className="flex items-center gap-3.5">
                  <h2 className="pricing-gradient-text text-custom-1 font-bold">
                    $100
                  </h2>
                  <p className="font-medium">
                    /month <br />
                    (billed annually)
                  </p>
                </div>
                <div className="pricing-gradient-divider my-10 h-[1px] w-full"></div>
                <ul className="flex flex-col gap-4">
                  {[
                    "Subscription with levels",
                    "Advanced features included",
                    "Shared workspaces & tools",
                    "Premium versions functionality",
                    "Customizing the outputs",
                    "Priority customer support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-5">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_67_11301)">
                          <path
                            d="M24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24C19.1274 24 24.5 18.6274 24.5 12Z"
                            fill="url(#paint0_linear_67_11301)"
                            fillOpacity="0.08"
                          />
                          <g filter="url(#filter0_d_67_11301)">
                            <path
                              d="M12.5 9L15.5 12L12.5 15L9.5 12L12.5 9Z"
                              fill="#F3EEFF"
                            />
                          </g>
                          <path
                            d="M24 12C24 5.64873 18.8513 0.5 12.5 0.5C6.14873 0.5 1 5.64873 1 12C1 18.3513 6.14873 23.5 12.5 23.5C18.8513 23.5 24 18.3513 24 12Z"
                            stroke="#F3EEFF"
                            strokeOpacity="0.06"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_67_11301"
                            x="3.5"
                            y="3"
                            width="18"
                            height="18"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="3" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_67_11301"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_67_11301"
                              result="shape"
                            />
                          </filter>
                          <linearGradient
                            id="paint0_linear_67_11301"
                            x1="12.5"
                            y1="0"
                            x2="12.5"
                            y2="24"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F3EEFF" stopOpacity="0" />
                            <stop offset="1" stopColor="#F3EEFF" />
                          </linearGradient>
                          <clipPath id="clip0_67_11301">
                            <rect width="25" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  aria-label="Get the plan button"
                  className="pricing-button-gradient relative mt-11 flex w-full items-center justify-center gap-1.5 rounded-lg p-3 font-medium text-white transition-all duration-300 ease-in-out hover:shadow-button"
                >
                  Get the plan
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.8992 7.5999L9.72422 2.3499C9.49922 2.1249 9.14922 2.1249 8.92422 2.3499C8.69922 2.5749 8.69922 2.9249 8.92422 3.1499L13.1242 7.4249H2.49922C2.19922 7.4249 1.94922 7.6749 1.94922 7.9749C1.94922 8.2749 2.19922 8.5499 2.49922 8.5499H13.1742L8.92422 12.8749C8.69922 13.0999 8.69922 13.4499 8.92422 13.6749C9.02422 13.7749 9.17422 13.8249 9.32422 13.8249C9.47422 13.8249 9.62422 13.7749 9.72422 13.6499L14.8992 8.3999C15.1242 8.1749 15.1242 7.8249 14.8992 7.5999Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <p className="mt-4 text-center text-sm">
                  No extra hidden charge
                </p>
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <span className="absolute bottom-0 left-0 -z-1 aspect-[370/553] w-full">
                    <img
                      alt="blur"
                      src="/images/blur/blur-16.svg"
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
                    />
                  </span>
                  <span className="absolute left-0 top-0 -z-1 aspect-[370/350] w-full">
                    <img
                      alt="blur"
                      src="/images/blur/blur-17.svg"
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
                    />
                  </span>
                </div>
              </div>
              <div className="wow fadeInUp pricing-item-border relative z-20 overflow-hidden rounded-3xl bg-dark px-8 pb-10 pt-12.5 xl:px-10">
                <span className="absolute right-9 top-9">
                  <img
                    alt="icon"
                    width="44"
                    height="44"
                    src="./images/pricing/pricing-icon-02.svg"
                  />
                </span>
                <h3 className="mb-5.5 text-heading-6 font-semibold text-white">
                  Medium
                </h3>
                <div className="flex items-center gap-3.5">
                  <h2 className="pricing-gradient-text text-custom-1 font-bold">
                    $200
                  </h2>
                  <p className="font-medium">
                    /month <br />
                    (billed annually)
                  </p>
                </div>
                <div className="pricing-gradient-divider my-10 h-[1px] w-full"></div>
                <ul className="flex flex-col gap-4">
                  {[
                    "Subscription with levels",
                    "Advanced features included",
                    "Shared workspaces & tools",
                    "Premium versions functionality",
                    "Customizing the outputs",
                    "Priority customer support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-5">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_67_11301)">
                          <path
                            d="M24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24C19.1274 24 24.5 18.6274 24.5 12Z"
                            fill="url(#paint0_linear_67_11301)"
                            fillOpacity="0.08"
                          />
                          <g filter="url(#filter0_d_67_11301)">
                            <path
                              d="M12.5 9L15.5 12L12.5 15L9.5 12L12.5 9Z"
                              fill="#F3EEFF"
                            />
                          </g>
                          <path
                            d="M24 12C24 5.64873 18.8513 0.5 12.5 0.5C6.14873 0.5 1 5.64873 1 12C1 18.3513 6.14873 23.5 12.5 23.5C18.8513 23.5 24 18.3513 24 12Z"
                            stroke="#F3EEFF"
                            strokeOpacity="0.06"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_67_11301"
                            x="3.5"
                            y="3"
                            width="18"
                            height="18"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="3" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_67_11301"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_67_11301"
                              result="shape"
                            />
                          </filter>
                          <linearGradient
                            id="paint0_linear_67_11301"
                            x1="12.5"
                            y1="0"
                            x2="12.5"
                            y2="24"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F3EEFF" stopOpacity="0" />
                            <stop offset="1" stopColor="#F3EEFF" />
                          </linearGradient>
                          <clipPath id="clip0_67_11301">
                            <rect width="25" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  aria-label="Get the plan button"
                  className="pricing-button-gradient relative mt-11 flex w-full items-center justify-center gap-1.5 rounded-lg p-3 font-medium text-white transition-all duration-300 ease-in-out hover:shadow-button"
                >
                  Get the plan
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.8992 7.5999L9.72422 2.3499C9.49922 2.1249 9.14922 2.1249 8.92422 2.3499C8.69922 2.5749 8.69922 2.9249 8.92422 3.1499L13.1242 7.4249H2.49922C2.19922 7.4249 1.94922 7.6749 1.94922 7.9749C1.94922 8.2749 2.19922 8.5499 2.49922 8.5499H13.1742L8.92422 12.8749C8.69922 13.0999 8.69922 13.4499 8.92422 13.6749C9.02422 13.7749 9.17422 13.8249 9.32422 13.8249C9.47422 13.8249 9.62422 13.7749 9.72422 13.6499L14.8992 8.3999C15.1242 8.1749 15.1242 7.8249 14.8992 7.5999Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <p className="mt-4 text-center text-sm">
                  No extra hidden charge
                </p>
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <span className="absolute bottom-0 left-0 -z-1 aspect-[370/553] w-full">
                    <img
                      alt="blur"
                      src="/images/blur/blur-16.svg"
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
                    />
                  </span>
                  <span className="absolute left-0 top-0 -z-1 aspect-[370/350] w-full">
                    <img
                      alt="blur"
                      src="/images/blur/blur-17.svg"
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
                    />
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanetStarsSection;
