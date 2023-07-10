import type { list, Item } from "@prisma/client";

export interface ListWithItems extends list {
  items: Item[];
}
