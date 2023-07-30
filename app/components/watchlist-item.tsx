import { useState, useEffect } from "react";
import { MouseEvent } from "react";
import "@/styles/globals.css";
import ImageWithFallback from "./image-with-fallback";
import Shave from "./shave";
import placeholder from "../../assets/images/placeholder.png";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useUserSelectors } from "@/stores/user";
import { useModalStoreSelectors } from "@/stores/modal";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useItemStoreSelectors } from "@/stores/item";
import { useMutation } from "@apollo/client";
import { DELETEITEMFROMLIST } from "@/lib/queries";
import type { WatchListItem } from "@/types/item";
import useMediaQueries from "@/lib/hooks/useMediaQueries";

const WatchlistItem = ({
  id,
  type,
  title,
  poster,
  summary,
  apiId,
  listId,
}: WatchListItem) => {
  const { isMobile } = useMediaQueries();
  const user = useUserSelectors.use.user();
  const setUser = useUserSelectors.use.setUser();
  const openModal = useModalStoreSelectors.use.openModal();
  const openDrawer = useDrawerStoreSelectors.use.openDrawer();
  const setItemForFetch = useItemStoreSelectors.use.setItemForFetch();
  const [removeItemFromList] = useMutation(DELETEITEMFROMLIST);

  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    console.log(isMobile);
    setMaxHeight(isMobile ? 48 : 80);
  }, [isMobile]);

  const handleItemClick = async () => {
    setItemForFetch(apiId, type);
    if (isMobile) {
      openDrawer("BOTTOM", "MORE_INFO");
    } else {
      openModal("MORE_INFO");
    }
  };

  const removeItem = async () => {
    try {
      console.log(id);
      await removeItemFromList({ variables: { id: id } });
      if (user) {
        setUser({
          ...user,
          allItems: user.allItems!.filter((item) => item.id !== id),
          lists: user.lists!.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                items: list.items!.filter((item) => item.id !== id),
              };
            }
            return list;
          }),
        });
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div
      className="flex w-full items-stretch mb-2 md:mb-4 rounded-xl bg-fog dark:bg-davy z-20"
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
      <div className="flex p-4 w-full">
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
            <div className={"dropdown dropdown-end "}>
              <label tabIndex={0}>
                <button
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    event.stopPropagation();
                    removeItem();
                  }}
                >
                  <BookmarkIcon className="text-hollywood-cerise" />
                </button>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
