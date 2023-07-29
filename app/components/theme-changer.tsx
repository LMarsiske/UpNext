"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import styles from "@/styles/radio.module.css";

const ThemeChanger = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex flex-col items-start">
      <div className="form-control flex flex-row my-4">
        <input
          type="radio"
          name="theme"
          id="light"
          value="light"
          checked={currentTheme === "light"}
          onChange={() => setTheme("light")}
          className="radio mr-4 dark:border-snow"
        />
        <label htmlFor="light" className="cursor-pointer">
          <LightModeIcon /> Light Mode
        </label>
      </div>
      <div className="form-control flex flex-row my-4">
        <input
          type="radio"
          name="theme"
          id="dark"
          value="dark"
          checked={currentTheme === "dark"}
          onChange={() => setTheme("dark")}
          className="radio mr-4 dark:border-snow"
        />
        <label htmlFor="dark" className="cursor-pointer">
          <DarkModeIcon /> Dark Mode
        </label>
      </div>
    </div>
    // <>
    //   <div className="form-control">
    //     <label className="label cursor-pointer">
    //       <input
    //         type="radio"
    //         name="radio-10"
    //         className="radio border-fog checked:bg-red-500 checked:border-red-500 checked:shadow-transparent"
    //         checked
    //       />
    //       <span className="label-text">Red pill</span>
    //     </label>
    //   </div>
    //   <div className="form-control">
    //     <label className="label cursor-pointer">
    //       <input
    //         type="radio"
    //         name="radio-10"
    //         className="radio border-fog checked:bg-blue-500 checked:border-blue-500 checked:shadow-transparent"
    //         checked
    //       />
    //       <span className="label-text">Blue pill</span>
    //     </label>
    //   </div>
    //   <div className="form-control">
    //     <label className="label cursor-pointer">
    //       <input
    //         type="radio"
    //         name="radio-10"
    //         className="radio border-fog checked:bg-blue-500  checked:border-blue-500 shadow-[0 0 0 4px #4d4f53 inset,0 0 0 4px #4d4f53 inset]"
    //         checked
    //       />
    //       <span className="label-text">Blue pill</span>
    //     </label>
    //   </div>
    // </>
  );
};

export default ThemeChanger;
