import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";
import { Movie, TVShow, Game } from "@/types/item";

interface ItemState {
  item: TVShow | Movie | Game | null;
  setItem: (item: TVShow | Movie | Game | null) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  item: null,
  setItem: (item) => set({ item }),
}));

export const useItemStoreSelectors = createSelectors(useItemStore);
