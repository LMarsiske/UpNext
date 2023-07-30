import Link from "next/link";
import React from "react";
import Avatar from "../avatar";
import { User } from "@/types/user";
import { signOut } from "next-auth/react";
// import { useUserSelectors } from "@/stores/user";
import { useUserStore } from "@/stores/user";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const AuthHeader = ({ user }: { user: User }) => {
  // const setUser = useUserSelectors.use.setUser();
  const [setUser] = useUserStore((store) => [store.setUser]);
  const openDrawer = useDrawerStoreSelectors.use.openDrawer();
  return (
    <>
      <div className="hidden md:flex items-center space-x-4 text-3xl">
        <Link href="/">Discover</Link>
        <Link href="/lists">Lists</Link>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar bg-transparent hover:bg-transparent focus:bg-transparent shadow-none hover:shadow-none focus:shadow-none"
          >
            <Avatar name={user.name} icon={user.image} />
          </label>
          <ul
            tabIndex={0}
            className="mt-2 z-[1] p-2 shadow menu  dropdown-content bg-fog dark:bg-davy rounded-box w-60"
          >
            <li aria-disabled>
              <p className="text-xl text-gunmetal dark:text-snow">
                {user.email}
              </p>
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
      <button
        onClick={() => {
          openDrawer("RIGHT", "AUTH_MENU");
        }}
        className="md:hidden"
      >
        <MenuIcon fontSize="large" className="text-gunmetal dark:text-snow" />
      </button>
    </>
  );
};

export default AuthHeader;
