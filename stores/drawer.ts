import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";

interface DrawerState {
  isDrawerOpen: boolean;
  drawerContent: string;
  setIsDrawerOpen: (isOpen: boolean) => void;
  setDrawerContent: (content: string) => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isDrawerOpen: false,
  drawerContent: "",
  setIsDrawerOpen: (isOpen) => set(() => ({ isDrawerOpen: isOpen })),
  setDrawerContent: (content) => set(() => ({ drawerContent: content })),
}));

export const useDrawerStoreSelectors = createSelectors(useDrawerStore);
