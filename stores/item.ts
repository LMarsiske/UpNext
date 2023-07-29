import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";
import { Movie, TVShow, Game } from "@/types/item";

interface ItemState {
  itemId: string | number | null;
  itemType: string;
  item: TVShow | Movie | Game | null;
  stringifiedItem: string;
  setItem: (item: TVShow | Movie | Game | null) => void;
  setItemForFetch: (itemId: string | number | null, itemType: string) => void;
  setStringifiedItem: (stringifiedItem: string) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  itemId: "",
  itemType: "",
  item: null,
  stringifiedItem: "",
  setItem: (item) => set({ item }),
  setItemForFetch: (itemId, itemType) => set({ itemId, itemType }),
  setStringifiedItem: (stringifiedItem) => set({ stringifiedItem }),
}));

export const useItemStoreSelectors = createSelectors(useItemStore);
