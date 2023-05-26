import "@/styles/globals.css";
import Image from "next/image";
import placeholder from "../../assets/images/placeholder.png";
import { TypeTag } from "./TypeTag";

interface SearchResultProps {
  id: number;
  type: string;
  title: string;
  poster: string;
  summary: string;
  network: string;
  platforms: string[];
  genres: string[];
}

const strip = (html: string) => {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText;
};

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
}: SearchResultProps) => {
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
      </div>
    </div>
  );
};
