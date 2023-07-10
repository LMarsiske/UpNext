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
        {list.items.map((item: SearchResultProps) => {
          return (
            <>
              <WatchlistItem key={item.id} {...item} />
              <WatchlistItem key={`${item.id}123`} {...item} />
            </>
          );
        })}
      </div>
      <div className="w-1/4 h-full border border-fog">This is the sidebar</div>
    </div>
  );
};

export default TabContainer;
