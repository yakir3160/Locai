import type { SVGProps } from 'react';
import HomeIcon from "@/src/assets/icons/home-smile-svgrepo-com.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <div className="bg-gradient-ai text-transparent bg-clip-text logo fixed left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-8 px-10 py-8">
        <Link href="/" className="flex flex-row justify-normal items-center gap-2">
          <span className="text-4xl font-bold">locai</span>
          <HomeIcon className="size-9 fill-[url(#logo-gradient)] " />
        </Link>
        <svg className="size-0 logo">
          <linearGradient id="logo-gradient">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </svg>
      </div>
    </div>
  );
};

export default Logo;
