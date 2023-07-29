import Link from "next/link";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";

const DrawerNonAuthMenu = () => {
  const router = useRouter();
  const closeDrawer = useDrawerStoreSelectors.use.closeDrawer();
  const openDrawer = useDrawerStoreSelectors.use.openDrawer();
  return (
    <div className="flex flex-col w-full h-full mt-4">
      <button
        onClick={() => {
          router.push("/");
          closeDrawer("RIGHT");
        }}
        className="text-xl text-left text-gunmetal dark:text-snow mb-6"
      >
        <SearchIcon className="text-gunmetal dark:text-snow mr-2" />
        Discover
      </button>

      <button
        onClick={() => {
          closeDrawer("RIGHT", false);
          openDrawer("BOTTOM", "AUTH", false);
        }}
        className="text-xl text-left text-gunmetal dark:text-snow"
      >
        <LoginIcon className="text-gunmetal dark:text-snow mr-2" />
        Sign In
      </button>
    </div>
  );
};

export default DrawerNonAuthMenu;
