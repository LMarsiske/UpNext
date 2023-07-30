import React from "react";
import classes from "@/styles/tab-container.module.css";
import type { ListWithItems } from "@/types/list";
import WatchlistItem from "./watchlist-item";
import { WatchListItem } from "@/types/item";

interface TabContainerProps {
  list: ListWithItems;
  index: number;
  setIndex: (idx: number) => void;
}

const TabContainer = ({ list, index, setIndex }: TabContainerProps) => {
  return (
    <div className="overflow-auto md:ml-4 md:w-3/4 h-[calc(100%-4rem)] md:h-full lg:scrollbar-thin lg:scrollbar-thumb-rounded-xl lg:scrollbar-track-transparent lg:scrollbar-thumb-fog dark:lg:scrollbar-thumb-davy lg:pr-2">
      {list &&
        list.items &&
        list.items.length > 0 &&
        list.items.map((item: WatchListItem, index: number) => {
          return <WatchlistItem key={`${item.id}-${index}`} {...item} />;
        })}
      {!list ||
        !list.items ||
        (list.items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl mb-4 text-center">No items in this list</h2>
            <p className="text-2xl text-center">
              Add some items to get started
            </p>
          </div>
        ))}
    </div>
  );
};

export default TabContainer;
