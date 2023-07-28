import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";

interface BackdropState {
  isBackdropOpen: boolean;
  openBackdrop: () => void;
  closeBackdrop: () => void;
}

export const useBackdropStore = create<BackdropState>((set) => ({
  isBackdropOpen: false,
  openBackdrop: () => {
    document.body.style.overflow = "hidden";
    return set(() => ({ isBackdropOpen: true }));
  },
  closeBackdrop: () => {
    document.body.style.overflow = "auto";
    return set(() => ({ isBackdropOpen: false }));
  },
}));

export const useBackdropStoreSelectors = createSelectors(useBackdropStore);
