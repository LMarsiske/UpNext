"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import "@/styles/globals.css";
import placeholder from "../../assets/images/placeholder.png";
import { debounce } from "lodash";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useModalStore } from "@/stores/modal";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useItemStoreSelectors } from "@/stores/item";
import { useBackdropStoreSelectors } from "@/stores/backdrop";
import { SearchResultProps } from "@/types/search";
import { useUserStore } from "@/stores/user";
import useMediaQueries from "@/lib/hooks/useMediaQueries";
import Shave from "./shave";
import ImageWithFallback from "./image-with-fallback";

export const SearchResult = ({
  index,
  id,
  type,
  title,
  poster,
  summary,
  network,
  platforms,
  genres,
  inList,
  listId,
  itemId,
  addToList,
  deleteFromList,
}: SearchResultProps) => {
  const [user] = useUserStore((store) => [store.user]);
  const { openModal } = useModalStore.getState();
  const openDrawer = useDrawerStoreSelectors.use.openDrawer();
  const setItemForFetch = useItemStoreSelectors.use.setItemForFetch();
  const setStringifiedItem = useItemStoreSelectors.use.setStringifiedItem();
  const openBackdrop = useBackdropStoreSelectors.use.openBackdrop();
  const closeBackdrop = useBackdropStoreSelectors.use.closeBackdrop();
  const { isMobile } = useMediaQueries();

  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    setMaxHeight(isMobile ? 48 : 96);
  }, [isMobile]);

  const handleAddRemove = (
    event: MouseEvent<HTMLButtonElement>,
    action: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (!user) return;
    if (action === "add") {
      if (user.lists.length === 1) {
        addToList(
          user.lists[0].id,
          JSON.stringify({
            apiId: id,
            type,
            title,
            poster,
            summary,
            network,
            platforms,
            genres,
          })
        );
        return;
      }
      openBackdrop();
    } else if (action === "remove") {
      deleteFromList(itemId!);
    }
  };

  const handleItemClick = async () => {
    setItemForFetch(id, type);
    setStringifiedItem(
      JSON.stringify({
        apiId: id,
        type,
        title,
        poster,
        summary,
        network,
        platforms,
        genres,
      })
    );

    if (isMobile) {
      openDrawer("BOTTOM", "MORE_INFO");
    } else {
      openModal("MORE_INFO");
    }
  };

  return (
    <div
      className="flex w-full max-w-col items-stretch my-2 md:my-4 rounded-xl bg-fog dark:bg-davy z-20"
      onClick={handleItemClick}
    >
      <div className="shrink-0 rounded-l-xl w-[67px] md:w-[101px]">
        <ImageWithFallback
          src={poster || placeholder}
          fallback={placeholder}
          alt={
            poster
              ? `A poster for the ${type} ${title}`
              : "A placeholder poster for a search result"
          }
          fallbackAlt="A placeholder poster for a search result"
          classNames="rounded-l-xl w-auto h-full"
          width={101}
          height={150}
        />
      </div>
      <div className="flex p-2 md:p-4 w-full">
        <div className="flex flex-col align-top grow">
          <Shave
            maxHeight={30}
            element="h2"
            classNames="text-xl font-bold mb-2"
          >
            {title}
          </Shave>

          <Shave
            maxHeight={maxHeight}
            element="p"
            classNames="leading-tight grow"
          >
            {summary || "No summary available"}
          </Shave>
        </div>
        <div className="flex items-end ml-2 md:ml-4">
          {user && (
            <>
              <div className={"dropdown dropdown-end"}>
                <label tabIndex={0}>
                  {inList ? (
                    <button
                      onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement?.blur();
                          closeBackdrop();
                        }
                        handleAddRemove(event, "remove");
                      }}
                    >
                      <BookmarkIcon className="text-hollywood-cerise" />
                    </button>
                  ) : (
                    <button
                      onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        handleAddRemove(event, "add");
                      }}
                    >
                      <BookmarkBorderIcon className=" text-floro-cyan z-30" />
                    </button>
                  )}
                </label>
                {user?.lists?.length > 1 && (
                  <ul
                    tabIndex={0}
                    className={`mt-2 z-[51] p-2 menu dropdown-content bg-fog rounded-box min-w-fit shadow-neon`}
                  >
                    {user &&
                      user.lists.map((list) => (
                        <li key={list.id}>
                          <button
                            className="text-xl text-gunmetal"
                            onClick={(event: MouseEvent<HTMLButtonElement>) => {
                              event.stopPropagation();
                              event.preventDefault();
                              addToList(
                                list.id,
                                JSON.stringify({
                                  apiId: id,
                                  type,
                                  title,
                                  poster,
                                  summary,
                                  network,
                                  platforms,
                                  genres,
                                })
                              );
                              if (
                                document.activeElement instanceof HTMLElement
                              ) {
                                document.activeElement?.blur();
                                closeBackdrop();
                              }
                            }}
                          >
                            {list.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
