import type { list, Item } from "@prisma/client";
import type { List } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithLists extends User {
  lists: list[];
}

export interface UserWithListsWithItems extends User {
  lists: ListWithItems[];
}

interface ListWithItems extends list {
  items: Item[];
}
