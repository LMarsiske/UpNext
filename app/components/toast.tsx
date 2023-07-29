"use client";
import { useToastStoreSelectors } from "@/stores/toast";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const Toast = () => {
  const toastMessage = useToastStoreSelectors.use.message();
  const toastType = useToastStoreSelectors.use.type();

  return (
    <AnimatePresence>
      {toastMessage && toastType && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="toast toast-center z-[100]"
        >
          <div className={`alert alert-${toastType}`}>
            <span className="text-lg">{toastMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
