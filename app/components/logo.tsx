"use client";
import Image from "next/image";
import Link from "next/link";
import LogoDark from "@/assets/images/Logo_Dark.svg";
import LogoLight from "@/assets/images/Logo_Light.svg";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();
  console.log(theme);

  return (
    <Link href="/">
      <Image
        priority={true}
        src={theme === "dark" ? LogoLight : LogoDark}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
