import { siteConfig } from "@/config/site-config";
import Link from "next/link";
import { FC } from "react";

export const SiteBanner: FC = () => {
  const { title, text, link } = siteConfig.banner;

  return (
    <div className="relative top-0 bg-[#4f62ff] text-background py-3 md:py-0 cursor-pointer">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href={link}
          target="_blank"
          className="text-center text-sm leading-loose text-muted-background"
        >
          ✨<span className="font-bold"> {title} - </span> {text} ✨
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
};
