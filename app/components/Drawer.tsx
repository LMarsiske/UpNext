import React from "react";
import { SwipeableDrawer } from "@mui/material";
import { useDrawerStoreSelectors } from "@/stores/drawer";

interface DrawerProps {
  children: React.ReactNode;
}

const Drawer = ({ children }: DrawerProps) => {
  const isDrawerOpen = useDrawerStoreSelectors.use.isDrawerOpen();
  const setIsDrawerOpen = useDrawerStoreSelectors.use.setIsDrawerOpen();

  return (
    <div
      className={`fixed overflow-hidden z-10 bg-gunmetal bg-opacity-75 inset-0 transform ease-in-out
        ${
          isDrawerOpen
            ? " transition-opacity opacity-100 duration-350 translate-x-0  "
            : " transition-all opacity-500 translate-x-full"
        }`}
    >
      <section
        className={`w-screen max-w-md right-0 absolute bg-fog dark:bg-davy text-gunmetal dark:text-snow h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform 
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <article className="relative w-screen max-w-md pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setIsDrawerOpen(false);
        }}
      ></section>
    </div>
  );
};

export default Drawer;
