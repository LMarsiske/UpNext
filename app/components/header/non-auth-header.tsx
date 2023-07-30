import React from "react";
import Link from "next/link";
import { useModalStoreSelectors } from "@/stores/modal";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import MenuIcon from "@mui/icons-material/Menu";

const NonAuthHeader: React.FC = () => {
  const openModal = useModalStoreSelectors.use.openModal();
  const openDrawer = useDrawerStoreSelectors.use.openDrawer();
  return (
    <>
      <div className="hidden md:flex items-center space-x-4 text-3xl">
        <Link href="/">Discover</Link>
        <button
          onClick={() => {
            openModal("AUTH");
          }}
        >
          Sign In
        </button>
      </div>
      <button
        onClick={() => {
          openDrawer("RIGHT", "NON_AUTH_MENU");
        }}
        className="md:hidden"
      >
        <MenuIcon fontSize="large" className="text-gunmetal dark:text-snow" />
      </button>
    </>
  );
};

export default NonAuthHeader;
