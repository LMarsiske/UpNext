"use client";

import Logo from "../logo";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import Container from "../container";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";
import type { User } from "@/types/user";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-10 h-10 text-yellow-500 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-10 h-10 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

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
