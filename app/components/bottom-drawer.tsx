"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import styles from "@/styles/neon.module.css";
import CloseIcon from "@mui/icons-material/Close";
import BottomDrawerAuthForm from "./drawer/auth-form";
import BottomDrawerItemInfo from "./drawer/item-info";

const BottomDrawer = () => {
  const isDrawerOpen = useDrawerStoreSelectors.use.isBottomDrawerOpen();
  const closeDrawer = useDrawerStoreSelectors.use.closeDrawer();
  const drawerContent = useDrawerStoreSelectors.use.bottomDrawerContent();

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
          className="flex flex-col items-end fixed left-0 right-0 bottom-0 w-full h-fit max-h-[66%] z-[51]"
        >
          <button
            onClick={() => {
              console.log("closing");
              closeDrawer("BOTTOM");
            }}
            className="bg-snow dark:bg-davy h-8 w-8 mb-2 mr-4 rounded-full flex justify-center items-center"
          >
            <CloseIcon className="text-gunmetal dark:text-snow" />
          </button>
          <div
            className={`w-full h-full rounded-t-xl bg-snow dark:bg-davy text-gunmetal dark:text-snow p-4 ${styles.neon}`}
          >
            {drawerContent === "AUTH" && <BottomDrawerAuthForm />}

            {drawerContent === "MORE_INFO" && <BottomDrawerItemInfo />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomDrawer;
