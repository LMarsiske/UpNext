"use client";

import Logo from "../logo";
import { useTheme } from "next-themes";
// import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import Container from "../container";
import { useSession } from "next-auth/react";

import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";
import type { User } from "@/types/user";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  // const session = {
  //   user: {
  //     id: "",
  //   },
  // };

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-15">
      <Container>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />
          {/* Auth */}
          {session ? (
            <AuthHeader user={session.user as User} />
          ) : (
            <NonAuthHeader />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
