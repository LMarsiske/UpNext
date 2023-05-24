import { useMemo } from "react";

interface ButtonProps {
  /**
   * Size of the button component
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label?: string;
  /**
   * Does the button have an outline or a background color?
   */
  outline?: boolean;
  /**
   * Extra way to control whether or not to render in dark mode. Should only be used to make storybooking easier
   */
  isDark?: string;
  /**
   * Required click handler
   */
  onClick: () => void;
}

/**
 * Sub-functions for computing various button classes in tailwindcss
 */

const getSizeClasses = (size: string) => {
  switch (size) {
    case "small": {
      return "px-4 py-2.5";
    }
    case "large": {
      return "px-6 py-3";
    }
    default: {
      return "px-5 py-2.5";
    }
  }
};

const getTypeClasses = (isOutlined: boolean, isDark: string) => {
  if (isDark) {
    return isOutlined
      ? "text-slate-700 bg-transparent border-teal-700 dark:text-white dark:border-white"
      : "text-white bg-pink-600 border-pink-600 dark:bg-teal-700 dark:border-teal-700";
  }
  isOutlined
    ? "text-slate-700 bg-transparent border-teal-700 dark:text-white dark:border-white"
    : "text-white bg-pink-600 border-pink-600 dark:bg-teal-700 dark:border-teal-700";
};

const BASE_BUTTON_CLASSES =
  "cursor-pointer rounded-full border-2 font-bold leading-none inline-block";

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  size = "medium",
  label = "Submit",
  outline = false,
  isDark = "",
  onClick,
}: ButtonProps) => {
  const computedClasses = useMemo(() => {
    const modeClass = getTypeClasses(outline, isDark);
    const sizeClass = getSizeClasses(size);

    return [modeClass, sizeClass].join(" ");
  }, [outline, size, isDark]);
  return (
    <button
      className={`${BASE_BUTTON_CLASSES} ${computedClasses}`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
