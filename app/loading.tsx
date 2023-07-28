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
          className="flex justify-between items-center w-2/3 h-8"
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

// "use client";
// import { motion } from "framer-motion";
// import React from "react";

// const LoadingDot = {
//   display: "block",
//   width: "2rem",
//   height: "2rem",
//   backgroundColor: "black",
//   borderRadius: "50%",
// };

// const LoadingContainer = {
//   width: "10rem",
//   height: "5rem",
//   display: "flex",
//   justifyContent: "space-around",
// };

// const ContainerVariants = {
//   initial: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
//   animate: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const DotVariants = {
//   initial: {
//     y: "0%",
//   },
//   animate: {
//     y: "100%",
//   },
// };

// const DotTransition = {
//   duration: 0.6,
//   ease: "easeInOut",
//   repeat: Infinity,
//   repeatType: "reverse" as const,
// };

// export default function Loading() {
//   return (
//     <div
//       style={{
//         paddingTop: "5rem",
//         width: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <motion.div
//         style={LoadingContainer}
//         variants={ContainerVariants}
//         initial="initial"
//         animate="animate"
//       >
//         <motion.span
//           style={LoadingDot}
//           variants={DotVariants}
//           transition={DotTransition}
//         />
//         <motion.span
//           style={LoadingDot}
//           variants={DotVariants}
//           transition={DotTransition}
//         />
//         <motion.span
//           style={LoadingDot}
//           variants={DotVariants}
//           transition={DotTransition}
//         />
//       </motion.div>
//     </div>
//   );
// }
