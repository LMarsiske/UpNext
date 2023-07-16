import React, { useEffect } from "react";
import Image from "next/image";
import { useItemStore } from "@/stores/item";

const ItemInfo = () => {
  const [item, setItem] = useItemStore((store) => [store.item, store.setItem]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <div className="flex">
      <img
        src={item!.poster!}
        alt={item!.title!}
        height={400}
        width={284}
        className="object-cover h-[400px]"
      />
      <div className="flex flex-col ml-4">
        <h1 className="text-2xl mb-4">
          {item!.title} ({item!.release_year})
        </h1>
        <hr className="border-fog my-2" />
        <p className="text-lg">{item!.summary}</p>

        {item && item.cast && (
          <>
            <hr className="border-fog my-2" />
            <div>
              <h2 className="text-xl mb-2">Cast</h2>
              <ul>
                {item!.cast.map((actor, index) => {
                  return (
                    <li key={index} className="text-lg">
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
              <h2 className="text-xl mb-2">Streaming</h2>
              <div className="flex">
                {item!.providers!.map((platform, index) => {
                  return (
                    <Image
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
              <h2 className="text-xl mb-2">Platforms</h2>
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
    </div>
  );
};

export default ItemInfo;
