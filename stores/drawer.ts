import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";

interface DrawerState {
  isRightDrawerOpen: boolean;
  rightDrawerContent: string;
  isBottomDrawerOpen: boolean;
  bottomDrawerContent: string;
  openDrawer: (drawer: string, content: string) => void;
  closeDrawer: (drawer: string) => void;
  closeAllDrawers: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isRightDrawerOpen: false,
  rightDrawerContent: "",
  isBottomDrawerOpen: false,
  bottomDrawerContent: "",
  openDrawer: (drawer, content) => {
    if (drawer === "RIGHT") {
      set(() => ({ isRightDrawerOpen: true, rightDrawerContent: content }));
    } else if (drawer === "BOTTOM") {
      set(() => ({ isBottomDrawerOpen: true, bottomDrawerContent: content }));
    }
  },
  closeDrawer: (drawer) => {
    console.log("closeDrawer: ", drawer);
    if (drawer === "RIGHT") {
      set(() => ({ isRightDrawerOpen: false }));
    } else if (drawer === "BOTTOM") {
      set(() => ({ isBottomDrawerOpen: false }));
    }
  },
  closeAllDrawers: () => {
    set(() => ({ isRightDrawerOpen: false, isBottomDrawerOpen: false }));
  },
}));

export const useDrawerStoreSelectors = createSelectors(useDrawerStore);
