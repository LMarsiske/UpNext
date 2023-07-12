import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import { User } from "@/types/user";
import { signOut } from "next-auth/react";
// import {
//   UserIcon,
//   ArrowLeftOnRectangleIcon,
// } from "@heroicons/react/24/outline";

const AuthHeader = ({ user }: { user: User }) => {
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
          className="mt-2 z-[1] p-2 shadow menu  dropdown-content bg-fog rounded-box w-52"
        >
          <li>
            <Link
              href={`/profile/${user.id}`}
              className="text-xl text-gunmetal"
            >
              {/* <UserIcon className="color-gunmetal w-5 h-5" /> */}
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-xl text-gunmetal"
              onClick={() => signOut()}
            >
              {/* <ArrowLeftOnRectangleIcon className="color-gunmetal w-5 h-5" /> */}
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthHeader;
