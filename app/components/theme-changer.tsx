"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";

const ThemeChanger = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex flex-col items-center">
      <input
        type="radio"
        name="theme"
        id="light"
        value="light"
        checked={currentTheme === "light"}
        onChange={() => setTheme("light")}
        className="radio"
      />
      <label htmlFor="light" className="cursor-pointer">
        <LightModeIcon /> Light Mode
      </label>
      <input
        type="radio"
        name="theme"
        id="system"
        value="system"
        checked={currentTheme === "system"}
        onChange={() => setTheme("system")}
        className="radio"
      />
      <label htmlFor="system" className="cursor-pointer">
        <SettingsSystemDaydreamIcon /> System
      </label>
      <input
        type="radio"
        name="theme"
        id="dark"
        value="dark"
        checked={currentTheme === "dark"}
        onChange={() => setTheme("dark")}
        className="radio"
      />
      <label htmlFor="dark" className="cursor-pointer">
        <DarkModeIcon /> Dark Mode
      </label>
    </div>
  );
};

export default ThemeChanger;
