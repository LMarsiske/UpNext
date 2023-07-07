import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }
  interface Session {
    expires: string | undefined;
    token: string | undefined;
    id: string | undefined;
    user?: User & { id: string | undefined };
  }
}
