"use client";
import React, { useRef, MouseEvent } from "react";
import "@/styles/globals.css";
import placeholder from "../../assets/images/placeholder.png";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useModalStore } from "@/stores/modal";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useItemStoreSelectors } from "@/stores/item";
import { useLazyQuery } from "@apollo/client";
import { GETMOVIE, GETSHOW, GETGAME } from "@/lib/queries";
import { SearchResultProps } from "@/types/search";
import type { Movie, TVShow, Game } from "@/types/item";
import { useUserSelectors } from "@/stores/user";
import Shave from "./shave";
import ImageWithFallback from "./image-with-fallback";
import styles from "@/styles/neon.module.css";

const truncate = (str: string) =>
  str.length > 250 ? `${str.substring(0, 247)}...` : str;

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
}: // removeItem,
SearchResultProps) => {
  const user = useUserSelectors.use.user();
  const { setIsModalOpen, setModalContent, setIsBackdropOpen } =
    useModalStore.getState();
  const openDrawer = useDrawerStoreSelectors.use.openDrawer();
  const setItem = useItemStoreSelectors.use.setItem();

  const [getMovie] = useLazyQuery(GETMOVIE);
  const [getShow] = useLazyQuery(GETSHOW);
  const [getGame] = useLazyQuery(GETGAME);

  const boxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
      setIsBackdropOpen(true);
    } else if (action === "remove") {
      deleteFromList(itemId!);
    }
  };

  const handleItemClick = async () => {
    try {
      let response;
      switch (type) {
        case "movie":
          response = await getMovie({
            variables: {
              id: id,
            },
          });
          if (response.data.getMovie) {
            setItem(response.data.getMovie as Movie);
          }
          break;
        case "tv":
          response = await getShow({
            variables: {
              id: id,
            },
          });
          console.log(response);
          if (response.data.getTV) {
            setItem(response.data.getTV as TVShow);
          }
          break;
        case "game":
          response = await getGame({
            variables: {
              id: id,
            },
          });
          console.log(response);
          if (response.data.getGame) {
            setItem(response.data.getGame as Game);
          }
          break;
      }
      setIsBackdropOpen(true);
      openDrawer("BOTTOM", "");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      ref={boxRef}
      className="flex w-full my-2 rounded-xl bg-fog dark:bg-davy z-20"
      onClick={handleItemClick}
    >
      <div className="shrink-0 rounded-l-xl w-[67px]">
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
      <div className="flex flex-col p-2 w-full h-full justify-between">
        <Shave maxHeight={30} element="h2" classNames="text-xl font-bold mb-2">
          {title}
        </Shave>
        <div className="flex w-full h-full">
          <Shave maxHeight={48} element="p" classNames="leading-tight grow">
            {summary ? truncate(summary) : "No summary available"}
          </Shave>
          {user && (
            <div className={"dropdown dropdown-end"}>
              <label tabIndex={0}>
                {inList ? (
                  <button
                    onClick={(event: MouseEvent<HTMLButtonElement>) =>
                      handleAddRemove(event, "remove")
                    }
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
              {user && user.lists && user.lists.length > 1 && (
                <ul
                  tabIndex={0}
                  className={`mt-2 z-[51] p-2 shadow menu  dropdown-content bg-fog rounded-box min-w-fit ${styles.neon}`}
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
                          }}
                        >
                          {list.name}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
