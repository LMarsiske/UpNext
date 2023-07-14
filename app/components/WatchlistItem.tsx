import "@/styles/globals.css";
import Image from "next/image";
import placeholder from "../../assets/images/placeholder.png";
import { TypeTag } from "./TypeTag";
import { SearchResultProps } from "@/types/search";
import { useModalStoreSelectors } from "@/stores/modal";
import { useItemStoreSelectors } from "@/stores/item";
import { useLazyQuery } from "@apollo/client";
import { GETMOVIE } from "@/lib/queries";
import type { Movie } from "@/types/item";
import { item } from "@prisma/client";

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
}: item) => {
  const setIsModalOpen = useModalStoreSelectors.use.setIsModalOpen();
  const setModalContent = useModalStoreSelectors.use.setModalContent();
  const setItem = useItemStoreSelectors.use.setItem();
  const [getMovie] = useLazyQuery(GETMOVIE);

  const handleItemClick = async () => {
    try {
      const response = await getMovie({
        variables: {
          id: apiId,
        },
      });
      if (response.data.getMovie) {
        setItem(response.data.getMovie as Movie);
      }
      setIsModalOpen(true);
      setModalContent("MORE_INFO");
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
        <TypeTag type={type} />
        <div className="flex flex-col ml-4 h-full justify-between prose dark:prose-invert">
          <h2 className="text-2xl">{title}</h2>
          <p>{summary ? truncate(summary) : "No summary available"}</p>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
