"use client";
import Image from "next/image";
import Link from "next/link";
import LogoDark from "@/assets/images/Logo_Dark.svg";
import LogoLight from "@/assets/images/Logo_Light.svg";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme, systemTheme } = useTheme();

  const colorTheme = theme === "system" ? systemTheme : theme;

  return (
    <Link href="/">
      <Image
        height={48}
        priority={true}
        src={colorTheme === "dark" ? LogoLight : LogoDark}
        alt="UpNext Logo"
        className="h-8 md:h-19 w-fit"
      />
    </Link>
  );
};

export default Logo;
