import { useMediaQuery } from "@uidotdev/usehooks";

const useMediaQueries = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return { isMobile, isTablet, isDesktop };
};

export default useMediaQueries;
