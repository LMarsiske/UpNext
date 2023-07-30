/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["azo-sans-web", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "hollywood-cerise": "#e015ad",
        "electric-violet": "#9600ff",
        "electric-indigo": "#5d26e8",
        "sky-blue": "#00b8ff",
        "floro-cyan": "#0ceeea",
        gunmetal: "#232b2b",
        snow: "#fffafa",
        fog: "#dddbe4",
        davy: "#4d4f53",
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "overlayShow 350ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        neon: "0 0 8px 3px rgba(12, 238, 234, 0.3)",
      },
      spacing: {
        select: "var(--radix-select-trigger-width)",
        "select-item": "calc(var(--radix-select-trigger-width) - 0rem)",
        "select-height": "var(--radix-select-content-available-height)",
        160: "40rem",
        col: "640px",
        col2: "1304px",
        col3: "1968px",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3440px",
        "2col": "1862px",
        "3col": "2811px",
      },
      maxWidth: {
        col: "640px",
        col2: "1340px",
        col3: "1968px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
