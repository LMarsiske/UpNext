"use client";
import React, { useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import styles from "@/styles/neon.module.css";
import CloseIcon from "@mui/icons-material/Close";
import DrawerAuthMenu from "./drawer/auth-menu";
import DrawerNonAuthMenu from "./drawer/non-auth-menu";

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
  const drawerContent = useDrawerStoreSelectors.use.rightDrawerContent();

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
          className={`fixed flex flex-col align-bottom rounded-l-xl bg-snow dark:bg-davy text-gunmetal dark:text-snow  top-0 right-0 w-2/4 h-screen px-4 py-2 z-[51] ${styles.neon}`}
        >
          <button
            onClick={() => {
              console.log("closing");
              closeDrawer("RIGHT");
            }}
            className="text-right"
          >
            <CloseIcon
              fontSize="large"
              className="text-gunmetal dark:text-snow"
            />
          </button>
          {drawerContent === "AUTH_MENU" && <DrawerAuthMenu />}
          {drawerContent === "NON_AUTH_MENU" && <DrawerNonAuthMenu />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RightDrawer;
