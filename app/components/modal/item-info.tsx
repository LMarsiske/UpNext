"use client";
import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useItemStore } from "@/stores/item";
import { useUserStore } from "@/stores/user";
import { useToastStoreSelectors } from "@/stores/toast";
import { useModalStoreSelectors } from "@/stores/modal";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GETMOVIE,
  GETSHOW,
  GETGAME,
  ADDITEMTOLIST,
  DELETEITEMFROMLIST,
} from "@/lib/queries";
import type { Movie, TVShow, Game } from "@/types/item";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ModalItemInfoSkeleton from "./item-info-skeleton";
import ImageWithFallback from "../image-with-fallback";
import placeholder from "@/assets/images/placeholder.png";

const ItemInfo = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [inList, setInList] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const [getMovie] = useLazyQuery(GETMOVIE);
  const [getShow] = useLazyQuery(GETSHOW);
  const [getGame] = useLazyQuery(GETGAME);
  const [addItemToList] = useMutation(ADDITEMTOLIST);
  const [removeItemFromList] = useMutation(DELETEITEMFROMLIST);
  const { id, type, item, setItem, stringifiedItem } = useItemStore(
    (state) => ({
      id: state.itemId,
      type: state.itemType,
      item: state.item,
      setItem: state.setItem,
      stringifiedItem: state.stringifiedItem,
    })
  );
  const [user, setUser] = useUserStore((store) => [store.user, store.setUser]);
  const openToast = useToastStoreSelectors.use.openToast();
  const closeModal = useModalStoreSelectors.use.closeModal();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
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
            if (response.data.getGame) {
              setItem(response.data.getGame as Game);
            }
            break;
        }
        if (
          user?.allItems?.filter((i) => i.apiId === id && i.type === type)
            .length === 1
        ) {
          setInList(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, []);

  const addItem = async () => {
    try {
      if (!stringifiedItem) return;

      const newItem = await addItemToList({
        variables: { id: selectedList, contents: stringifiedItem },
      });
      if (user) {
        setUser({
          ...user,
          allItems: [...user.allItems!, newItem.data.addItemToList],
        });
      }
      let addedItem = newItem.data.addItemToList;
      if (!addedItem) {
        openToast("Something went wrong", "error");

        return;
      }
      closeModal();
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const removeItem = async () => {
    try {
      let itemId = user?.allItems?.find(
        (i) => i.apiId === id && i.type === type
      )?.id;
      if (!itemId) return;
      await removeItemFromList({ variables: { id: itemId } });
      if (user) {
        setUser({
          ...user,
          allItems: user.allItems!.filter((item) => item.id !== itemId),
        });
      }

      closeModal();
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <hr className="border-gunmetal dark:border-snow mb-4" />
      {loading && <ModalItemInfoSkeleton />}
      {item && (
        <>
          <AnimatePresence>
            {showLists && (
              <motion.div
                initial={{ x: "500%" }}
                animate={{ x: 0 }}
                exit={{ x: "500%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="flex flex-col min-h-[300px] items-start"
              >
                <button
                  className="mb-2"
                  onClick={() => {
                    setSelectedList("");
                    setShowLists(false);
                  }}
                >
                  <ArrowBackIosIcon />
                  Back
                </button>
                <h1 className="text-2xl font-bold mb-4">
                  Which list would you like to add this to?
                </h1>
                {user && user.lists && user.lists.length > 1 && (
                  <ul className="w-full max-h-[500px] overflow-y-auto mb-4">
                    {user &&
                      user.lists.map((list) => (
                        <li
                          key={list.id}
                          className={`w-full text-xl text-gunmetal dark:text-snow bg-fog dark:bg-davy rounded-xl mb-2 h-10 p-2 flex items-center ${
                            list.id === selectedList
                              ? "border-2 border-hollywood-cerise"
                              : ""
                          }`}
                        >
                          <button
                            className="w-full text-left"
                            onClick={() => setSelectedList(list.id)}
                          >
                            {list.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
                <button
                  className="bg-hollywood-cerise  text-snow rounded-xl px-4 py-2 w-full text-2xl disabled:bg-fog disabled:text-davy disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors duration-350 ease-in-out"
                  disabled={!selectedList}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    if (!selectedList) return;

                    e.stopPropagation();
                    e.preventDefault();
                    if (!inList) addItem();
                    else removeItem();
                  }}
                >
                  {inList ? "Remove from list" : "Add to list"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {!showLists && (
              <motion.div
                initial={{ x: "-500%" }}
                animate={{ x: 0 }}
                exit={{ x: "-500%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                ref={boxRef}
                className="flex flex-col lg:text-lg"
              >
                <div
                  className={`flex flex-col mb-2 overflow-auto max-h-[50dvh] lg:scrollbar-thin lg:scrollbar-thumb-rounded-xl lg:scrollbar-track-transparent lg:scrollbar-thumb-fog dark:lg:scrollbar-thumb-davy lg:pr-2`}
                >
                  <div className="mb-2">
                    <ImageWithFallback
                      src={item?.poster || placeholder}
                      fallback={placeholder}
                      alt={
                        item?.poster
                          ? `A poster for the ${item?.type} ${item?.type}`
                          : "A placeholder poster for a search result"
                      }
                      fallbackAlt="A placeholder poster for a search result"
                      classNames="w-[120px] h-[172px] float-left mr-4"
                      width={101}
                      height={150}
                    />

                    <p>{item!.summary || "No summary available"}</p>
                  </div>

                  {item && item.cast && (
                    <div className="mb-2">
                      <h2 className="text-gunmetal dark:text-snow font-bold lg:text-xl">
                        Cast
                      </h2>
                      <hr className="border-gunmetal dark:border-snow mt-1 mb-2" />
                      {item!.cast.length > 0 ? (
                        <ul>
                          {item!.cast.map((actor, index) => {
                            return (
                              <li key={index}>
                                {actor.character} - {actor.name}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p>No cast found</p>
                      )}
                    </div>
                  )}
                  {item?.providers && (
                    <div className="mb-2">
                      <h2 className="text-gunmetal dark:text-snow font-bold lg:text-xl">
                        Streaming
                      </h2>
                      <hr className="border-gunmetal dark:border-snow mt-1 mb-2" />
                      <div className="flex">
                        {item.providers.length > 0 ? (
                          item!.providers!.map((platform, index) => {
                            return (
                              <img
                                key={index}
                                src={platform.logo}
                                width={36}
                                height={36}
                                alt={`${platform.name} logo`}
                                className="mr-2"
                              />
                            );
                          })
                        ) : (
                          <p>Not available on any streaming services</p>
                        )}
                      </div>
                    </div>
                  )}
                  {item?.platforms && (
                    <>
                      <hr className="border-fog my-2" />
                      <div>
                        <h2 className="text-gunmetal dark:text-snow font-bold lg:text-xl">
                          Platforms
                        </h2>
                        <ul>
                          {item!.platforms!.map((platform, index) => {
                            return (
                              <li key={index} className="mr-2 text-lg">
                                {platform}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
                {user && (
                  <button
                    className={`bg-${
                      inList ? "sky-blue" : "hollywood-cerise"
                    } text-gunmetal rounded-xl px-4 py-2 w-full text-2xl flex justify-center items-center`}
                    onClick={() => {
                      if (!inList) setShowLists(true);
                      else removeItem();
                    }}
                  >
                    {inList ? "Remove from list" : "Add to list"}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default ItemInfo;
