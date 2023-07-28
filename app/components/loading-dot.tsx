import { Variants, motion } from "framer-motion";

interface LoadingDotProps {
  color: string;
  variants: Variants;
  transition: any;
}

const LoadingDot = ({ color, variants, transition }: LoadingDotProps) => (
  <motion.span
    className={`block w-10 h-10 rounded-full bg-${color} z-[51]`}
    variants={variants}
    transition={transition}
  />
);

export default LoadingDot;
