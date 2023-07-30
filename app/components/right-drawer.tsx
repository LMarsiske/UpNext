"use client";
import React, { useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import CloseIcon from "@mui/icons-material/Close";
import DrawerAuthMenu from "./drawer/auth-menu";
import DrawerNonAuthMenu from "./drawer/non-auth-menu";
import RightDrawerListOptions from "./drawer/right-list-options";

const RightDrawer = () => {
  const isDrawerOpen = useDrawerStoreSelectors.use.isRightDrawerOpen();
  const closeDrawer = useDrawerStoreSelectors.use.closeDrawer();
  const drawerContent = useDrawerStoreSelectors.use.rightDrawerContent();

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
          className={`fixed flex flex-col align-bottom rounded-l-xl bg-snow dark:bg-davy text-gunmetal dark:text-snow  top-0 right-0 w-2/4 md:w-[45%] max-w-[450px] h-[100dvh] px-4 py-2 z-[51] shadow-neon`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {drawerContent === "LIST_OPTIONS" && "List Options"}
            </h1>
            <button
              onClick={() => {
                closeDrawer("RIGHT");
              }}
              className="text-right"
            >
              <CloseIcon
                fontSize="large"
                className="text-gunmetal dark:text-snow"
              />
            </button>
          </div>
          {drawerContent === "AUTH_MENU" && <DrawerAuthMenu />}
          {drawerContent === "NON_AUTH_MENU" && <DrawerNonAuthMenu />}
          {drawerContent === "LIST_OPTIONS" && <RightDrawerListOptions />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RightDrawer;
