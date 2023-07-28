"use client";
import React, { useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useModalStoreSelectors } from "@/stores/modal";

const variants: Variants = {
  closed: {
    y: "100%",
    transition: {
      type: "spring",
      duration: 0.2,
    },
  },
  open: {
    y: 0,
    transition: {
      type: "spring",
      duration: 0.4,
    },
  },
};

const BottomDrawer = () => {
  const isDrawerOpen = useDrawerStoreSelectors.use.isBottomDrawerOpen();
  const closeDrawer = useDrawerStoreSelectors.use.closeDrawer();
  const setIsBackdropOpen = useModalStoreSelectors.use.setIsBackdropOpen();

  useEffect(() => {
    console.log(isDrawerOpen);
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{
            y: 0,
          }}
          exit={{
            y: "100%",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed bg-indigo-600 text-white shadow-lg left-0 right-0 bottom-0 w-full h-[50%] p-5 z-[51]"
        >
          <button
            onClick={() => {
              console.log("closing");
              closeDrawer("BOTTOM");
              setIsBackdropOpen(false);
            }}
            className="bg-white text-black h-8 w-8 block mb-2 rounded-full"
          >
            &times;
          </button>
          Bottom Drawer!
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomDrawer;
