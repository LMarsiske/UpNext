"use client";

import Logo from "../logo";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import AuthHeader from "./auth-header";
import NonAuthHeader from "./non-auth-header";
import type { User } from "@/types/user";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-12 w-full px-4 py-4 flex justify-between items-center">
      <Logo />
      {session ? <AuthHeader user={session.user as User} /> : <NonAuthHeader />}
    </header>
  );
};

export default Header;
