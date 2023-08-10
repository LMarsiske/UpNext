"use client";

import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { SearchResult } from "./components/search-results";
import { useLazyQuery, useMutation } from "@apollo/client";
import "@/styles/globals.css";
import SearchResultSkeletons from "./components/search-result-skeletons";

import { flatten, sortBy } from "lodash";
import { useSession } from "next-auth/react";
import type { User } from "@/types/user";
import type { GraphSearchResult } from "@/types/search";
import {
  ADDITEMTOLIST,
  DELETEITEMFROMLIST,
  GETUSER,
  SEARCH,
  GETIGDBAUTHTOKEN,
} from "@/lib/queries";
import { useUserStore } from "@/stores/user";
import { AnimatePresence, motion, Variants } from "framer-motion";
import ScrollContainer from "./components/scroll-container";

const inputVariants = {
  up: {
    y: 0,
    transition: {
      delay: 0.15,
      duration: 0.35,
      ease: "easeInOut",
    },
  },
  down: {
    y: "25dvh",
    transition: {
      delay: 0.15,
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

const HomePage = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [results, setResults] = useState<GraphSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [
    search,
    { loading: searchLoading, data: searchData, error: searchError },
  ] = useLazyQuery(SEARCH);
  const [getUser] = useLazyQuery(GETUSER);
  const [getIgdbAuthToken] = useLazyQuery(GETIGDBAUTHTOKEN);
  const [addItemToList] = useMutation(ADDITEMTOLIST);
  const [removeItemFromList] = useMutation(DELETEITEMFROMLIST);
  const [user, setUser, igdbAuthToken, setIgdbAuthToken] = useUserStore(
    (store) => [
      store.user,
      store.setUser,
      store.igdbAuthToken,
      store.setIgdbAuthToken,
    ]
  );

  useEffect(() => {
    if (searchData && input) {
      const { searchGames, searchMovies, searchTV } = searchData;
      let results = sortBy(
        flatten([...searchGames, ...searchMovies, ...searchTV]),
        "title"
      );
      if (user && user.allItems) {
        results = results.map((result) => {
          const item = user.allItems!.find((item) => item.apiId === result.id);
          return {
            ...result,
            inList: !!item,
            listId: item?.listId,
            itemId: item?.id,
          };
        });
      }
      setResults(results);
    }
  }, [searchData, searchError, user]);

  useEffect(() => {
    const getUserData = async () => {
      if (!session || !session.user || !session.user.id) {
        setUser(null);
        return;
      }

      const uid = session.user.id;
      const res = await getUser({ variables: { id: uid } });

      if (res.data) {
        let data: User = res.data.getUserWithListsWithItems;
        parseUserData(data);
      }
    };

    getUserData();
  }, [session]);

  useEffect(() => {
    console.log(results);
    console.log(results.length > 0);
    console.log(searchLoading);
  }, [results, searchLoading]);

  const parseUserData = (data: User) => {
    if (!data?.lists) {
      setUser({ ...data });
      return;
    }
    let allItems = flatten(data.lists.map((list) => list.items));
    setUser({ ...data, allItems });
  };

  const query = useCallback(
    debounce((q: string) => {
      search({ variables: { q } });
    }, 150),
    []
  );

  const handleChange = async ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput(value);
    if (value) query(value);

    if (!value) {
      query.cancel();
      setResults([]);
    }
  };

  const addItem = async (listId: string, contents: string) => {
    try {
      const newItem = await addItemToList({
        variables: { id: listId, contents: contents },
      });
      if (user) {
        setUser({
          ...user,
          allItems: [...user.allItems!, newItem.data.addItemToList],
        });
      }
      let addedItem = newItem.data.addItemToList;
      let newResults = results.map((result) => {
        if (result.id === addedItem.apiId) {
          return {
            ...result,
            inList: true,
            listId: addedItem.listId,
            itemId: addedItem.id,
          };
        }
        return result;
      });
      setResults(newResults);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await removeItemFromList({ variables: { id: itemId } });
      if (user) {
        setUser({
          ...user,
          allItems: user.allItems!.filter((item) => item.id !== itemId),
        });
      }
      let newResults = results.map((result) => {
        if (result.itemId === itemId) {
          return {
            ...result,
            inList: false,
            listId: null,
            itemId: null,
          };
        }
        return result;
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-between h-[calc(100dvh-4rem)] md:h-[calc(100dvh-6rem)] lg:h-[calc(100dvh-6rem)]">
        <AnimatePresence initial={false}>
          <motion.div
            variants={inputVariants}
            initial="down"
            animate={searchLoading || results.length > 0 ? "up" : "down"}
            className="w-full flex flex-col items-center justify-center grow-1"
            key="search-input"
          >
            <h1 className="text-4xl mb-2">What&apos;s on next?</h1>

            <input
              type="text"
              value={input}
              onChange={handleChange}
              className="input input-bordered text-xl md:text-2xl lg:text-3xl bg-fog dark:bg-davy text-gunmetal dark:text-snow dark:border-none h-9 md:h-10 lg:h-12 w-full md:w-4/5 lg:w-full lg:max-w-col mb-2"
              placeholder="Search for a movie, TV show, or video game"
            />
          </motion.div>

          {searchLoading && input && (
            <motion.div
              key="search-skeleton"
              initial={{
                y: 0,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.35,
                delay: 0.2,
              }}
              exit={{
                y: 0,
                opacity: 0,
              }}
              className="w-full"
            >
              <SearchResultSkeletons />
            </motion.div>
          )}
          {!searchLoading && input && results.length > 0 && (
            <motion.div
              key="search-results"
              initial={{
                y: 0,
                opacity: 0,
                height: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                height: "auto",
              }}
              transition={{
                staggerChildren: 0.3,
                delay: 0.2,
              }}
            >
              <ScrollContainer>
                {results.map((result, index) => (
                  <SearchResult
                    key={result.id || index}
                    addToList={addItem}
                    deleteFromList={removeItem}
                    {...result}
                    index={index}
                  />
                ))}
              </ScrollContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};
export default HomePage;
