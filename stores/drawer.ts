import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";
import { useBackdropStore } from "./backdrop";
import { use } from "react";

interface DrawerState {
  isRightDrawerOpen: boolean;
  rightDrawerContent: string;
  isBottomDrawerOpen: boolean;
  bottomDrawerContent: string;
  openDrawer: (drawer: string, content: string, openBackdrop?: boolean) => void;
  closeDrawer: (drawer: string, closeBackdrop?: boolean) => void;
  closeAllDrawers: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isRightDrawerOpen: false,
  rightDrawerContent: "",
  isBottomDrawerOpen: false,
  bottomDrawerContent: "",
  openDrawer: (drawer, content, openBackdrop = true) => {
    if (openBackdrop) useBackdropStore.getState().openBackdrop();

    if (drawer === "RIGHT") {
      set(() => ({ isRightDrawerOpen: true, rightDrawerContent: content }));
    } else if (drawer === "BOTTOM") {
      set(() => ({ isBottomDrawerOpen: true, bottomDrawerContent: content }));
    }
  },
  closeDrawer: (drawer, closeBackdrop = true) => {
    if (closeBackdrop) useBackdropStore.getState().closeBackdrop();

    if (drawer === "RIGHT") {
      set(() => ({ isRightDrawerOpen: false }));
    } else if (drawer === "BOTTOM") {
      set(() => ({ isBottomDrawerOpen: false }));
    }
  },
  closeAllDrawers: () => {
    useBackdropStore.getState().closeBackdrop();
    set(() => ({ isRightDrawerOpen: false, isBottomDrawerOpen: false }));
  },
}));

export const useDrawerStoreSelectors = createSelectors(useDrawerStore);
