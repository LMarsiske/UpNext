"use client";

import Logo from "./logo";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import Container from "./container";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
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
    <header className="h-15 shadow-sm dark:border-gray-700">
      <Container>
        <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Logo />

          <div className="flex items-center space-x-4">
            {session ? (
              <button
                className="text-gray-900 dark:text-gray-100"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="text-gray-900 dark:text-gray-100"
                onClick={() => router.push("/api/auth/signin")}
              >
                Sign In
              </button>
            )}
            {renderThemeChanger()}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
