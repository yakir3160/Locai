
import HomeIcon from "@/src/assets/icons/home-smile-svgrepo-com.svg";
import Link from "next/link";

export const Logo = () => {
  return (
    <div>
      <div className="bg-gradient-ai text-transparent bg-clip-text logo ">
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


