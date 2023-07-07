import { BoltIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "../../assets/images/Logo.svg";

const Logo = () => {
  return (
    <Link legacyBehavior href="/">
      <Image src={LogoImg} alt="Logo" />
    </Link>
  );
};

export default Logo;
