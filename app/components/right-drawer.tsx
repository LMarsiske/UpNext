"use client";
import React, { useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useModalStoreSelectors } from "@/stores/modal";
import styles from "@/styles/neon.module.css";

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

const RightDrawer = () => {
  const isDrawerOpen = useDrawerStoreSelectors.use.isRightDrawerOpen();
  const closeDrawer = useDrawerStoreSelectors.use.closeDrawer();
  const setIsBackdropOpen = useModalStoreSelectors.use.setIsBackdropOpen();

  useEffect(() => {
    console.log(isDrawerOpen);
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "100%",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className={`fixed bg-snow dark:bg-davy text-gunmetal dark:text-snow  top-0 right-0 w-2/4 h-screen p-5 z-[51] ${styles.neon}`}
        >
          <button
            onClick={() => {
              console.log("closing");
              closeDrawer("RIGHT");
              setIsBackdropOpen(false);
            }}
            className="bg-white text-black h-8 w-8 block mb-2 rounded-full"
          >
            &times;
          </button>
          Right Drawer!
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RightDrawer;
