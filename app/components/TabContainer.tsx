import React from "react";
import classes from "@/styles/TabContainer.module.css";
import type { ListWithItems } from "@/types/list";
import WatchlistItem from "./WatchlistItem";
import { item } from "@prisma/client";
import { GraphSearchResult, SearchResultProps } from "@/types/search";

interface TabContainerProps {
  index: number;
  list: ListWithItems;
}

const TabContainer = ({ index, list }: TabContainerProps) => {
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
            </div>
          ))}
      </div>
      <div className="w-1/4 h-full border border-fog dark:border-davy border-opacity-50 rounded-xl bg-fog dark:bg-davy">
        This is the sidebar
      </div>
    </div>
  );
};

export default TabContainer;
