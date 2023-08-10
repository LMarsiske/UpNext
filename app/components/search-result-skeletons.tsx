import { motion, Variant, AnimatePresence } from "framer-motion";
import ScrollContainer from "./scroll-container";

// const variants: Variant = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
// };

const SearchResultSkeletons = () => (
  <ScrollContainer>
    <AnimatePresence>
      <div className="w-full animate-pulse flex-row items-center justify-center space-x-1">
        <motion.div
          initial={{
            y: 0,
            opacity: 0,
            height: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            height: "auto",
          }}
          transition={{
            staggerChildren: 0.3,
          }}
          className="w-full flex flex-col space-y-2"
        >
          <div className="h-[100px] md:h-[151px] w-full rounded-md bg-gray-300 "></div>
          <div className="h-[100px] md:h-[151px] w-full rounded-md bg-gray-300 "></div>
          <div className="h-[100px] md:h-[151px] w-full rounded-md bg-gray-300 "></div>
          <div className="h-[100px] md:h-[151px] w-full rounded-md bg-gray-300 "></div>
          <div className="h-[100px] md:h-[151px] w-full rounded-md bg-gray-300 "></div>
          <div className="h-[100px] md:h-[151px] w-full rounded-md bg-gray-300 "></div>
          <div className="h-[100px] md:h-[151px] w-full rounded-md bg-gray-300 "></div>
          <div className="h-[100px] md:h-[151px] w-full rounded-md bg-gray-300 "></div>
        </motion.div>
      </div>
    </AnimatePresence>
  </ScrollContainer>
);

export default SearchResultSkeletons;
