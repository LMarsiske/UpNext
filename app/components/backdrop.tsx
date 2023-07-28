"use client";
import React, { MouseEvent } from "react";
import { useModalStoreSelectors } from "@/stores/modal";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useBackdropStoreSelectors } from "@/stores/backdrop";

const BackDrop = () => {
  const isOpen = useBackdropStoreSelectors.use.isBackdropOpen();
  const closeDrawers = useDrawerStoreSelectors.use.closeAllDrawers();
  return (
    <div
      className={`fixed inset-0 bg-gunmetal bg-opacity-70 z-50 overscroll-none overflow-auto ${
        isOpen ? "" : "hidden"
      }`}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        closeDrawers();
      }}
    />
  );
};

export default BackDrop;
