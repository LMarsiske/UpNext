import type { list, Item } from "@prisma/client";
import type { List } from "@prisma/client";
import { ListWithItems } from "./list";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  lists: ListWithItems[];
  allItems?: Item[];
}

// export interface UserWithLists extends User {
//   lists?: list[];
// }

// export interface UserWithListsWithItems extends User {
//   lists: ListWithItems[];
// }

// interface UserWithFlattenedItems extends UserWithListsWithItems {
//   allItems?: item[];
// }
