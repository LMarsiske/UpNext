import React from "react";
import classes from "@/styles/TabContainer.module.css";
import type { ListWithItems } from "@/types/list";
import WatchlistItem from "./WatchlistItem";
import { SearchResultProps } from "@/types/search";
import { useDrawerStoreSelectors } from "@/stores/drawer";

interface TabContainerProps {
  list: ListWithItems;
}

const TabContainer = ({ list }: TabContainerProps) => {
  const setIsDrawerOpen = useDrawerStoreSelectors.use.setIsDrawerOpen();
  console.log(list);
  return (
    <div className={classes.tabContainer}>
      <div className={classes.itemContainer}>
        {list &&
          list.items &&
          list.items.length > 0 &&
          list.items.map((item: SearchResultProps) => {
            return (
              <>
                <WatchlistItem key={item.id} {...item} />
                <WatchlistItem key={`${item.id}123`} {...item} />
              </>
            );
          })}
        {!list ||
          !list.items ||
          (list.items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-5xl mb-4">No items in this list</h2>
              <p className="text-2xl">Add some items to get started</p>
              <button onClick={() => setIsDrawerOpen(true)}>Open Drawer</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TabContainer;
