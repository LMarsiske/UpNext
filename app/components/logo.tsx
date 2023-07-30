"use client";
import Image from "next/image";
import Link from "next/link";
import LogoDark from "@/assets/images/Logo_Dark.svg";
import LogoLight from "@/assets/images/Logo_Light.svg";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link href="/">
      <Image
        height={48}
        priority={true}
        src={theme === "dark" ? LogoLight : LogoDark}
        alt="UpNext Logo"
        className="h-8 md:h-19 w-fit border border-hollywood-cerise rounded-xl"
      />
    </Link>
  );
};

export default Logo;
