"use client";
import { motion, AnimatePresence } from "framer-motion";
import LoadingDot from "./components/loading-dot";

const BackdropVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.75,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse" as const,
};

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gunmetal bg-opacity-70 z-50 flex justify-center items-center"
        variants={BackdropVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="flex justify-between items-center w-2/3 max-w-[400px] h-8"
          variants={ContainerVariants}
          initial="initial"
          animate="animate"
        >
          <LoadingDot
            color="hollywood-cerise"
            variants={DotVariants}
            transition={DotTransition}
          />
          <LoadingDot
            color="electric-violet"
            variants={DotVariants}
            transition={DotTransition}
          />
          <LoadingDot
            color="electric-indigo"
            variants={DotVariants}
            transition={DotTransition}
            // className="bg-electric-indigo"
          />
          <LoadingDot
            color="sky-blue"
            variants={DotVariants}
            transition={DotTransition}
            // className="bg-sky-blue"
          />
          <LoadingDot
            color="floro-cyan"
            variants={DotVariants}
            transition={DotTransition}
            // className="bg-floro-cyan"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Loading;
