import Link from "next/link";
import { useSession } from "next-auth/react";
import Avatar from "../avatar";
import Shave from "../shave";
import { User } from "@/types/user";
import { signOut } from "next-auth/react";
import { useUserSelectors } from "@/stores/user";
import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

const DrawerAuthMenu = () => {
  const setUser = useUserSelectors.use.setUser();
  const { data: session, status } = useSession();
  const user = session?.user as User;

  return (
    <div className="flex flex-col w-full h-full mt-4">
      <div className="flex flex-nowrap w-full overflow-hidden">
        <Avatar name={user.name} icon={user.image} />
        <Shave
          maxHeight={0}
          classNames="text-gunmetal dark:text-snow ml-0.5 w-[calc(100%-1.625rem)]]"
          element="p"
        >
          {user?.email}
        </Shave>
      </div>
      <hr className="border-gunmetal dark:border-snow mt-2 mb-6" />
      <Link href="/" className="text-xl text-gunmetal dark:text-snow mb-6">
        <SearchIcon className="text-gunmetal dark:text-snow mr-2" />
        Discover
      </Link>
      <Link href="/lists" className="text-xl text-gunmetal dark:text-snow mb-6">
        <BookmarksIcon className="text-gunmetal dark:text-snow mr-2" />
        Lists
      </Link>
      <Link
        href={`/profile/${user.id}`}
        className="text-xl text-gunmetal dark:text-snow mb-6"
      >
        <ManageAccountsIcon className="text-gunmetal dark:text-snow mr-2" />
        Profile
      </Link>
      <Link
        href="#"
        className="text-xl text-gunmetal dark:text-snow"
        onClick={() => {
          signOut({ callbackUrl: "/" });
          setUser(null);
        }}
      >
        <LogoutIcon className="text-gunmetal dark:text-snow mr-2" />
        Logout
      </Link>
    </div>
  );
};

export default DrawerAuthMenu;
