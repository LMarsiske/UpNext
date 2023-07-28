import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";
import { Movie, TVShow, Game } from "@/types/item";

interface ItemState {
  itemId: string | number;
  itemType: string;
  item: TVShow | Movie | Game | null;
  setItem: (item: TVShow | Movie | Game | null) => void;
  setItemForFetch: (itemId: string | number, itemType: string) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  itemId: "",
  itemType: "",
  item: null,
  setItem: (item) => set({ item }),
  setItemForFetch: (itemId, itemType) => set({ itemId, itemType }),
}));

export const useItemStoreSelectors = createSelectors(useItemStore);
