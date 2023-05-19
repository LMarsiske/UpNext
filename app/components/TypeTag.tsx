import MovieTag from "@/assets/images/movie-tag.svg";
import TVTag from "@/assets/images/tv-tag.svg";
import GameTag from "@/assets/images/game-tag.svg";
import Image from "next/image";

interface TagProps {
  /**
   * Type of media of the result this tag will sit on top of
   */
  type?: string | undefined;
}

/**
 * Sub-functions for computing various button classes in tailwindcss
 */

// const getSizeClasses = (size: string) => {
//   switch (size) {
//     case "small": {
//       return "px-4 py-2.5";
//     }
//     case "large": {
//       return "px-6 py-3";
//     }
//     default: {
//       return "px-5 py-2.5";
//     }
//   }
// };

// const getTypeClasses = (isOutlined: boolean, isDark: string) => {
//   if (isDark) {
//     return isOutlined
//       ? "text-slate-700 bg-transparent border-teal-700 dark:text-white dark:border-white"
//       : "text-white bg-pink-600 border-pink-600 dark:bg-teal-700 dark:border-teal-700";
//   }
//   isOutlined
//     ? "text-slate-700 bg-transparent border-teal-700 dark:text-white dark:border-white"
//     : "text-white bg-pink-600 border-pink-600 dark:bg-teal-700 dark:border-teal-700";
// };

// const BASE_BUTTON_CLASSES =
//   "cursor-pointer rounded-full border-2 font-bold leading-none inline-block";

/**
 * Primary UI component for user interaction
 */
export const TypeTag = ({ type }: TagProps) => {
  //   const computedClasses = useMemo(() => {
  //     const modeClass = getTypeClasses(outline, isDark);
  //     const sizeClass = getSizeClasses(size);

  //     return [modeClass, sizeClass].join(" ");
  //   }, [outline, size]);
  let src;
  switch (type) {
    case "movie": {
      src = MovieTag;
      break;
    }
    case "tv": {
      src = TVTag;
      break;
    }
    case "game": {
      src = GameTag;
      break;
    }
    default: {
      src = MovieTag;
      break;
    }
  }

  return (
    <Image
      src={src}
      alt="A purple corner tag"
      className="absolute top-0 right-0 -z-10"
    />
  );
};
