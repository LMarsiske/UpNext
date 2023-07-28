"use client";
import React, { MouseEvent } from "react";
import { useModalStoreSelectors } from "@/stores/modal";
import { useDrawerStoreSelectors } from "@/stores/drawer";

const BackDrop = () => {
  const isOpen = useModalStoreSelectors.use.isBackdropOpen();
  const setIsOpen = useModalStoreSelectors.use.setIsBackdropOpen();
  const closeDrawers = useDrawerStoreSelectors.use.closeAllDrawers();
  return (
    <div
      className={`fixed inset-0 bg-gunmetal bg-opacity-70 z-50 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
        closeDrawers();
      }}
    />
  );
};

export default BackDrop;
