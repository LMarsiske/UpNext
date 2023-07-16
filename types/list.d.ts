import type { list, Item } from "@prisma/client";
import type { user } from "./user";

export interface ListWithItems extends list {
  items: Item[];
  sharedWith: user[];
}
