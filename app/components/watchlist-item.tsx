import "@/styles/globals.css";
import Image from "next/image";
import placeholder from "../../assets/images/placeholder.png";

import { SearchResultProps } from "@/types/search";
import { useModalStoreSelectors } from "@/stores/modal";
import { useItemStoreSelectors } from "@/stores/item";
import { useLazyQuery } from "@apollo/client";
import { GETMOVIE, GETSHOW, GETGAME } from "@/lib/queries";
import type { Movie, TVShow, Game, WatchListItem } from "@/types/item";

const truncate = (str: string) =>
  str.length > 250 ? `${str.substring(0, 247)}...` : str;

const WatchlistItem = ({
  id,
  type,
  title,
  poster,
  summary,
  network,
  platforms,
  genres,
  listId,
  apiId,
}: WatchListItem) => {
  const openModal = useModalStoreSelectors.use.openModal();
  const setItem = useItemStoreSelectors.use.setItem();
  const [getMovie] = useLazyQuery(GETMOVIE);
  const [getShow] = useLazyQuery(GETSHOW);
  const [getGame] = useLazyQuery(GETGAME);

  const handleItemClick = async () => {
    try {
      let response;
      switch (type) {
        case "movie":
          response = await getMovie({
            variables: {
              id: apiId,
            },
          });
          if (response.data.getMovie) {
            setItem(response.data.getMovie as Movie);
          }
          break;
        case "tv":
          response = await getShow({
            variables: {
              id: apiId,
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
              id: apiId,
            },
          });
          console.log(response);
          if (response.data.getGame) {
            setItem(response.data.getGame as Game);
          }
          break;
      }
      openModal("MORE_INFO");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative" onClick={handleItemClick}>
      <div className="flex w-[calc(100%-.25rem)] mb-2 rounded-xl border-2 border-orange-600 z-20">
        <Image
          src={poster || placeholder}
          alt={
            poster
              ? `A poster for the TV show ${title}`
              : "A placeholder poster for a TV show"
          }
          width={142}
          height={200}
          className="rounded-l-xl"
        />
        <div className="flex flex-col ml-4 h-full justify-between prose dark:prose-invert">
          <h2 className="text-2xl">{title}</h2>
          <p>{summary ? truncate(summary) : "No summary available"}</p>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
