import { User } from "@/types/user";
import createSelectors from "@/lib/createSelectors";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
  igdbAuthToken: string;
  setIgdbAuthToken: (token: string) => void;
  currentListIndex: number | null;
  setCurrentListIndex: (index: number | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      igdbAuthToken: "",
      setIgdbAuthToken: (token) => set({ igdbAuthToken: token }),
      currentListIndex: 1,
      setCurrentListIndex: (index) => set({ currentListIndex: index }),
    }),
    {
      name: "upnext-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserSelectors = createSelectors(useUserStore);
