import {
  User,
  // UserWithFlattenedItems,
  // UserWithLists,
  // UserWithListsWithItems,
} from "@/types/user";
import createSelectors from "@/lib/createSelectors";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "upnext-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserSelectors = createSelectors(useUserStore);
