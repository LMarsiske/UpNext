import "@/styles/globals.css";
import Image from "next/image";
import placeholder from "../../assets/images/placeholder.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { TypeTag } from "./TypeTag";

import { SearchResultProps } from "@/types/search";
import { useUserSelectors } from "@/stores/user";
import { SyntheticEvent } from "react";

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
  const handleItemClick = (action: string) => {
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

  return (
    <div className="relative">
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
                <button onClick={() => handleItemClick("remove")}>
                  <RemoveCircleOutlineIcon className="text-hollywood-cerise" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleItemClick("add");
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
                      onClick={() => {
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
