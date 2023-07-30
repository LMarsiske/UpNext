import { useMediaQuery } from "@uidotdev/usehooks";

const useMediaQueries = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isDesktopLarge = useMediaQuery("(min-width: 1216px)");
  const isDesktopWide = useMediaQuery("(min-width: 1408px)");
  const isDesktopHD = useMediaQuery("(min-width: 1536px)");
  const isDesktopFullHD = useMediaQuery("(min-width: 1920px)");
  const isDesktop4K = useMediaQuery("(min-width: 2560px)");
  const isDesktopUltraWide = useMediaQuery("(min-width: 3440px)");

  return {
    isMobile,
    isTablet,
    isDesktop,
    isDesktopLarge,
    isDesktopWide,
    isDesktopHD,
    isDesktopFullHD,
    isDesktop4K,
    isDesktopUltraWide,
  };
};

export default useMediaQueries;
