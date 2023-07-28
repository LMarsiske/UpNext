"use client";
import React, { useEffect, useState, useRef } from "react";
import { useItemStore } from "@/stores/item";
import { useUserSelectors } from "@/stores/user";
import { useLazyQuery } from "@apollo/client";
import { GETMOVIE, GETSHOW, GETGAME } from "@/lib/queries";
import type { Movie, TVShow, Game } from "@/types/item";

const BottomDrawerItemInfo = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [loading, setLoading] = useState(false);
  const [inList, setInList] = useState(false);
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, []);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {item && (
        <div className="flex flex-col overflow-y-scroll">
          <h1 ref={titleRef} className="text-2xl font-bold">
            {item!.title} ({item!.release_year})
          </h1>
          <hr className="border-gunmetal dark:border-snow my-2" />
          <div className={`flex flex-col mb-2`}>
            <div>
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
              <>
                <div>
                  <h2 className="mb-2">Cast</h2>
                  <ul>
                    {item!.cast.map((actor, index) => {
                      return (
                        <li key={index}>
                          {actor.character} - {actor.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
            {item?.providers && (
              <>
                <hr className="border-fog my-2" />
                <div>
                  <h2 className="mb-2">Streaming</h2>
                  <div className="flex">
                    {item!.providers!.map((platform, index) => {
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
                    })}
                  </div>
                </div>
              </>
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
          <button
            className={`bg-${
              inList ? "sky-blue" : "hollywood-cerise"
            } text-gunmetal rounded-xl px-4 py-2 w-full text-2xl flex justify-center items-center`}
            //   type="submit"
            //   onClick={() => signIn(provider.id)}
          >
            {inList ? "Remove from list" : "Add to list"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BottomDrawerItemInfo;
