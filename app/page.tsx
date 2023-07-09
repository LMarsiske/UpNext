"use client";

import React, { useState, useCallback, useEffect } from "react";
import { debounce, set } from "lodash";
import { SearchResult } from "./components/SearchResults";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import "@/styles/globals.css";
import SearchResultSkeletons from "./components/SearchResultSkeletons";

import { flatten, sortBy } from "lodash";
import { useSession } from "next-auth/react";
import type { item } from "@prisma/client";
import type { UserWithListsWithItems } from "@/types/user";
import type { GraphSearchResult } from "@/types/search";
import {
  ADDITEMTOLIST,
  DELETEITEMFROMLIST,
  GETUSER,
  SEARCH,
} from "@/lib/queries";

interface UserWithFlattenedItems extends UserWithListsWithItems {
  allItems: item[];
}

const HomePage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserWithFlattenedItems | null>(null);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<GraphSearchResult[]>([]);

  const [
    search,
    { loading: searchLoading, data: searchData, error: searchError },
  ] = useLazyQuery(SEARCH);
  const [getUser] = useLazyQuery(GETUSER);
  const [addItemToList] = useMutation(ADDITEMTOLIST);
  const [removeItemFromList] = useMutation(DELETEITEMFROMLIST);

  useEffect(() => {
    if (searchData) {
      const { searchGames, searchMovies, searchTV } = searchData;
      let results = sortBy(
        flatten([...searchGames, ...searchMovies, ...searchTV]),
        "title"
      );
      if (user) {
        console.log("trying to mark items already in list");
        results = results.map((result) => {
          const item = user.allItems.find((item) => item.apiId === result.id);
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
  }, [searchData, user]);

  useEffect(() => {
    const getUserData = async () => {
      if (!session || !session.user || !session.user.id) {
        setUser(null);
        return;
      }

      if (user) return;

      const uid = session.user.id;
      const res = await getUser({ variables: { id: uid } });
      console.log(res);
      if (res.data) {
        let data: UserWithListsWithItems = res.data.getUserWithListsWithItems;
        parseUserData(data);
      }
    };
    getUserData();
  }, [session]);

  const markSavedItems = (results: GraphSearchResult[]) => {
    if (!user) return results;

    return results.map((result) => {
      const item = user.allItems.find(
        (item) => item.apiId === result.id?.toString()
      );
      return {
        ...result,
        inList: !!item,
        listId: item?.listId,
        itemId: item?.id,
      };
    });
  };

  const parseUserData = (data: UserWithListsWithItems) => {
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
  };

  const getUserData = async () => {
    const res = await getUser({ variables: { id: session?.user?.id } });
    if (res.data) {
      let data: UserWithListsWithItems = res.data.getUserWithListsWithItems;
      return data;
    }
  };

  const addItem = async (listId: string, contents: string) => {
    try {
      const newItem = await addItemToList({
        variables: { id: listId, contents: contents },
      });
      console.log(newItem);
      if (user) {
        setUser({
          ...user,
          allItems: [...user.allItems, newItem.data.addItemToList],
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
          allItems: user.allItems.filter((item) => item.id !== itemId),
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
    // let userData = await getUserData();
    // if (!userData) return;
    // parseUserData(userData);
    // let newResults = markSavedItems(results);
    // setResults(newResults);
  };

  return (
    <main className="flex flex-col items-center mt-8">
      <h1 className="text-4xl">Search TV Shows</h1>
      <div className="flex">
        <input
          className="text-xl"
          type="text"
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="w-8/12">
        {searchLoading ? (
          <SearchResultSkeletons />
        ) : (
          results.map((result, index) => (
            <SearchResult
              key={result.id || index}
              addToList={addItem}
              deleteFromList={removeItem}
              {...result}
            />
          ))
        )}
      </div>
    </main>
  );
};
export default HomePage;
