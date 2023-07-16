import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import { User } from "@/types/user";
import { signOut } from "next-auth/react";
import { useUserSelectors } from "@/stores/user";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

const AuthHeader = ({ user }: { user: User }) => {
  const setUser = useUserSelectors.use.setUser();
  return (
    <div className="flex items-center space-x-4 text-2xl">
      <Link href="/">Discover</Link>
      <Link href="/lists">Lists</Link>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <Avatar name={user.name} icon={user.image} />
        </label>
        <ul
          tabIndex={0}
          className="mt-2 z-[1] p-2 shadow menu  dropdown-content bg-fog dark:bg-davy rounded-box w-60"
        >
          <li aria-disabled>
            <p className="text-xl text-gunmetal dark:text-snow">{user.email}</p>
          </li>
          <li>
            <Link
              href={`/profile/${user.id}`}
              className="text-xl text-gunmetal dark:text-snow"
            >
              <ManageAccountsIcon className="text-gunmetal dark:text-snow" />
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-xl text-gunmetal dark:text-snow"
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setUser(null);
              }}
            >
              <LogoutIcon className="text-gunmetal dark:text-snow" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthHeader;
