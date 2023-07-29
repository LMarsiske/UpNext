import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";

interface ToastState {
  message: string;
  type: "success" | "error" | "warning" | "info" | "";
  setMessage: (message: string) => void;
  setType: (type: "success" | "error" | "warning" | "info" | "") => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  type: "",
  setMessage: (message) => set(() => ({ message })),
  setType: (type) => set(() => ({ type })),
}));

export const useToastStoreSelectors = createSelectors(useToastStore);
