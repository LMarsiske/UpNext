"use client";
import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useItemStore } from "@/stores/item";
import { useUserSelectors } from "@/stores/user";
import { useLazyQuery } from "@apollo/client";
import { GETMOVIE, GETSHOW, GETGAME } from "@/lib/queries";
import type { Movie, TVShow, Game } from "@/types/item";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BottomDrawerItemInfo = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [loading, setLoading] = useState(false);
  const [inList, setInList] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const [getMovie] = useLazyQuery(GETMOVIE);
  const [getShow] = useLazyQuery(GETSHOW);
  const [getGame] = useLazyQuery(GETGAME);
  const { id, type, item, setItem } = useItemStore((state) => ({
    id: state.itemId,
    type: state.itemType,
    item: state.item,
    setItem: state.setItem,
  }));
  const user = useUserSelectors.use.user();
  const setUser = useUserSelectors.use.setUser();

  useEffect(() => {
    console.log(showLists);
  }, [showLists]);

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
        if (user?.allItems?.filter((item) => item.id === id).length === 1) {
          setInList(true);
        }
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, []);
  return (
    <>
      {loading && <div>Loading...</div>}
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
                  <ul className="w-full max-h-[500px] overflow-scroll mb-4">
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
                  className={`bg-hollywood-cerise
                   text-gunmetal  disabled:bg-fog disabled:text-davy dark:disabled:bg-davy dark:disabled:text-snow rounded-xl px-4 py-2 w-full text-2xl flex justify-center items-center transition-colors duration-350 ease-in-out`}
                  disabled={!selectedList}
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
                className="flex flex-col"
              >
                <h1 ref={titleRef} className="text-2xl font-bold">
                  {item!.title} ({item!.release_year})
                </h1>
                <hr className="border-gunmetal dark:border-snow my-2" />
                <div
                  className={`flex flex-col mb-2 overflow-scroll max-h-[320px]`}
                >
                  <div className="mb-2">
                    <img
                      src={item!.poster!}
                      alt={item!.title!}
                      height={172}
                      width={120}
                      className="w-[120px] h-[172px] float-left mr-4"
                    />

                    <p>{item!.summary}</p>
                  </div>

                  {item && item.cast && (
                    <div className="mb-2">
                      <h2 className="text-gunmetal dark:text-snow font-bold">
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
                      <h2 className="text-gunmetal dark:text-snow font-bold">
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
                        <h2 className="mb-2">Platforms</h2>
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
                    onClick={() => setShowLists(true)}
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

export default BottomDrawerItemInfo;
