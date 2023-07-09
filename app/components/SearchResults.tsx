import "@/styles/globals.css";
import Image from "next/image";
import placeholder from "../../assets/images/placeholder.png";
import { TypeTag } from "./TypeTag";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { SearchResultProps } from "@/types/search";

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
        {inList ? (
          <MinusCircleIcon
            onClick={() => deleteFromList(itemId!)}
            className="text-red-600 z-30"
          />
        ) : (
          <PlusCircleIcon
            onClick={() =>
              addToList(
                "cljsw1l5t000pvqelkheqrugd",
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
              )
            }
            className=" text-green-600 z-30"
          />
        )}
      </div>
    </div>
  );
};
