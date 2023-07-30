"use client";

import Logo from "../logo";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import AuthHeader from "./auth-header";
import NonAuthHeader from "./non-auth-header";
import type { User } from "@/types/user";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-12 md:h-16 lg:h-fit w-full lg:w-[70%] lg:min-w-[calc(1024px-3rem)] lg:max-w-[84rem] 2col:max-w-col2 px-6 py-2 lg:p-4 lg:mx-auto flex justify-between items-center">
      <Logo />
      {session ? <AuthHeader user={session.user as User} /> : <NonAuthHeader />}
    </header>
  );
};

export default Header;
