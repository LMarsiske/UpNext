import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";

interface ToastState {
  message: string;
  type: "success" | "error" | "warning" | "info" | "";
  setMessage: (message: string) => void;
  setType: (type: "success" | "error" | "warning" | "info" | "") => void;
  openToast: (
    message: string,
    type: "success" | "error" | "warning" | "info" | ""
  ) => void;
  closeToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  type: "",
  setMessage: (message) => set(() => ({ message })),
  setType: (type) => set(() => ({ type })),
  openToast: (message, type) => {
    setTimeout(() => set(() => ({ message: "", type: "" })), 3000);

    return set(() => ({ message, type }));
  },
  closeToast: () => set(() => ({ message: "", type: "" })),
}));

export const useToastStoreSelectors = createSelectors(useToastStore);
