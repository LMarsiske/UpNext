import React, { MouseEvent } from "react";
import "@/styles/globals.css";
import Image from "next/image";
import placeholder from "../../assets/images/placeholder.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { TypeTag } from "./TypeTag";
import { useModalStoreSelectors } from "@/stores/modal";
import { useItemStoreSelectors } from "@/stores/item";
import { useLazyQuery } from "@apollo/client";
import { GETMOVIE, GETSHOW, GETGAME } from "@/lib/queries";
import { SearchResultProps } from "@/types/search";
import type { Movie, TVShow, Game } from "@/types/item";
import { useUserSelectors } from "@/stores/user";

const truncate = (str: string) =>
  str.length > 250 ? `${str.substring(0, 247)}...` : str;

export const SearchResult = ({
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
  const setIsModalOpen = useModalStoreSelectors.use.setIsModalOpen();
  const setModalContent = useModalStoreSelectors.use.setModalContent();
  const setItem = useItemStoreSelectors.use.setItem();

  const [getMovie] = useLazyQuery(GETMOVIE);
  const [getShow] = useLazyQuery(GETSHOW);
  const [getGame] = useLazyQuery(GETGAME);

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
      setIsModalOpen(true);
      setModalContent("MORE_INFO");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative" onClick={handleItemClick}>
      <div className="flex w-full my-2 rounded-xl border-2 border-orange-600 z-20">
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
        <TypeTag type={type} />
        <div className="flex flex-col ml-4 h-full justify-between prose dark:prose-invert">
          <h2 className="text-2xl">{title}</h2>
          <p>{summary ? truncate(summary) : "No summary available"}</p>
        </div>
        {user && (
          <div
            className={
              user && user.lists.length > 1 ? "dropdown dropdown-right" : ""
            }
          >
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              {inList ? (
                <button
                  onClick={(event: MouseEvent<HTMLButtonElement>) =>
                    handleAddRemove(event, "remove")
                  }
                >
                  <RemoveCircleOutlineIcon className="text-hollywood-cerise" />
                </button>
              ) : (
                <button
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    handleAddRemove(event, "add");
                  }}
                >
                  <AddCircleOutlineIcon className=" text-floro-cyan z-30" />
                </button>
              )}
            </label>
            <ul
              tabIndex={0}
              className="mt-2 z-[1] p-2 shadow menu  dropdown-content bg-fog rounded-box min-w-fit"
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
          </div>
        )}
      </div>
    </div>
  );
};
{
  /* <div className="dropdown dropdown-end">
  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
    <Avatar name={user.name} icon={user.image} />
  </label>
  <ul
    tabIndex={0}
    className="mt-2 z-[1] p-2 shadow menu  dropdown-content bg-fog rounded-box w-52"
  >
    <li>
      <Link href={`/profile/${user.id}`} className="text-xl text-gunmetal">
        <ManageAccountsIcon />
        Profile
      </Link>
    </li>
    <li>
      <Link
        href="#"
        className="text-xl text-gunmetal"
        onClick={() => {
          signOut({ callbackUrl: "/" });
          setUser(null);
        }}
      >
        <LogoutIcon />
        Logout
      </Link>
    </li>
  </ul>
</div>; */
}
