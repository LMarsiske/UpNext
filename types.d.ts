import type { DefaultUser } from "next-auth";
import type { list, Item } from "@prisma/client";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }
  interface Session {
    expires: string | undefined;
    token: string | undefined;
    id: string | undefined;
    user?: SessionUser;
  }

  export interface SessionUser extends User {
    id: string | undefined;
  }
}

declare module "lists" {
  export interface ListWithItems extends list {
    items: Item[];
  }
}
