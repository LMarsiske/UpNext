import React, { Fragment } from "react";
import classes from "@/styles/TabContainer.module.css";
import type { ListWithItems } from "@/types/list";
import WatchlistItem from "./WatchlistItem";
import { SearchResultProps } from "@/types/search";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { WatchListItem } from "@/types/item";
import { item } from "@prisma/client";

interface TabContainerProps {
  list: ListWithItems;
}

const TabContainer = ({ list }: TabContainerProps) => {
  console.log(list);
  return (
    <div className={classes.tabContainer}>
      <div className={classes.itemContainer}>
        {list &&
          list.items &&
          list.items.length > 0 &&
          list.items.map((item: WatchListItem, index: number) => {
            return (
              <Fragment key={index}>
                <WatchlistItem key={item.id} {...item} />
                <WatchlistItem key={`${item.id}-123`} {...item} />
              </Fragment>
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
    </div>
  );
};

export default TabContainer;
